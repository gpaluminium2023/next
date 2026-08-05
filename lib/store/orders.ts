import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { sendAdminOrderNotice, sendBuyerReceiptEmail } from "@/lib/email/order-emails";

// Paystack reference charset is restricted to [a-zA-Z0-9-=.]
export function generateOrderReference(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `GPA-${timestamp}-${random}`;
}

interface MarkOrderPaidInput {
  reference: string;
  paystackId: string;
  channel: string | null;
  paidAt: Date;
}

// Called from both the checkout callback page and the Paystack webhook —
// whichever arrives first wins. `update()` (not `updateMany`) with a compound
// `where` (unique `reference` + `status: "PENDING"`) compiles to a single
// conditional UPDATE, so the loser of the race matches zero rows and Prisma
// throws P2025 "record not found" — treated here as an idempotent no-op.
// (`updateMany`/`createMany` are avoided everywhere in the store: the Neon
// HTTP adapter used at runtime — lib/prisma.ts — rejects their implicit
// transaction with "Transactions are not supported in HTTP mode", while
// single-row create/update/delete work fine. For the same reason this must
// NOT add `include: { items: true }` to the update — Prisma compiles
// update-with-include into an interactive transaction, which throws that
// same error and prevents the UPDATE from ever committing.)
export async function markOrderPaid({ reference, paystackId, channel, paidAt }: MarkOrderPaidInput) {
  try {
    await prisma.order.update({
      where: { reference, status: "PENDING" },
      data: { status: "PAID", paystackId, channel, paidAt },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return false; // already PAID/FULFILLED/CANCELLED — not an error
    }
    throw err;
  }

  // Fetched separately (plain findUnique, no transaction) purely to build
  // the email payload — a failure here must never undo the PAID status above.
  try {
    const order = await prisma.order.findUnique({ where: { reference }, include: { items: true } });
    if (order) {
      await sendBuyerReceiptEmail(order);
      await sendAdminOrderNotice(order);
    }
  } catch (err) {
    console.error("Order marked PAID but receipt/notice emails failed:", err);
  }

  return true;
}

// Called from the confirm-payment route when the dealer or a staff member
// has manually verified a bank transfer landed in the real account. Same
// idempotent-update shape as markOrderPaid above (conditional `update`, P2025
// = no-op) and the same single-row-only constraint re: the Neon HTTP adapter.
export async function confirmBankTransferPayment(orderId: string) {
  try {
    await prisma.order.update({
      where: { id: orderId, status: "PENDING", paymentMethod: "BANK_TRANSFER" },
      data: { status: "PAID", channel: "bank_transfer", paidAt: new Date() },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return false; // not a pending bank-transfer order — nothing to confirm
    }
    throw err;
  }

  try {
    const order = await prisma.order.findUnique({ where: { id: orderId }, include: { items: true } });
    if (order) await sendBuyerReceiptEmail(order);
  } catch (err) {
    console.error("Order marked PAID but buyer receipt email failed:", err);
  }

  return true;
}
