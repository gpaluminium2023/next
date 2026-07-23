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
// single-row create/update/delete work fine.)
export async function markOrderPaid({ reference, paystackId, channel, paidAt }: MarkOrderPaidInput) {
  try {
    const order = await prisma.order.update({
      where: { reference, status: "PENDING" },
      data: { status: "PAID", paystackId, channel, paidAt },
      include: { items: true },
    });
    // Whichever of callback/webhook wins this race is the sole sender, so
    // these run exactly once per order. Awaited (not fire-and-forget) since
    // a serverless instance can freeze right after the response is sent,
    // which would silently drop an unawaited email send. Both functions
    // swallow their own errors, so a Resend outage can't fail this call.
    await sendBuyerReceiptEmail(order);
    await sendAdminOrderNotice(order);
    return true;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return false; // already PAID/FULFILLED/CANCELLED — not an error
    }
    throw err;
  }
}
