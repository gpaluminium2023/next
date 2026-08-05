import { ADMIN_NOTIFICATION_EMAILS, EMAIL_FROM, getResendClient } from "@/lib/resend";
import { generateReceiptPdfBuffer } from "@/lib/receipts/generate-receipt-pdf";
import { OrderReceiptEmail } from "@/emails/order-receipt";
import { AdminOrderNoticeEmail } from "@/emails/admin-order-notice";
import { BankTransferInstructionsEmail } from "@/emails/bank-transfer-instructions";
import type { OrderWithItems } from "@/lib/store/order-types";
import type { BankTransferSettings } from "@/lib/generated/prisma/client";

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.godspromisealuminiumroofing.com";
}

// Both senders below are intentionally non-throwing: a Resend outage or a
// missing API key must never block order/quote creation, checkout
// confirmation, or the webhook that relies on a 200 response.

export async function sendBuyerReceiptEmail(order: OrderWithItems): Promise<void> {
  const resend = getResendClient();
  if (!resend) {
    console.warn("RESEND_API_KEY not configured — skipping buyer receipt email");
    return;
  }

  const baseUrl = getBaseUrl();
  const isCalculator = order.source === "ROOF_CALCULATOR";

  try {
    const pdfBuffer = await generateReceiptPdfBuffer(order);

    const { error } = await resend.emails.send(
      {
        from: EMAIL_FROM,
        to: [order.customerEmail],
        subject: isCalculator
          ? `Your roof sheet estimate — ${order.reference}`
          : `Your payment receipt — ${order.reference}`,
        react: OrderReceiptEmail({ order, baseUrl }),
        attachments: [
          {
            filename: `${isCalculator ? "Estimate" : "Receipt"}-${order.reference}.pdf`,
            content: pdfBuffer,
          },
        ],
      },
      { idempotencyKey: `order-receipt/${order.reference}` },
    );

    if (error) console.error("Failed to send buyer receipt email:", error);
  } catch (err) {
    console.error("Failed to send buyer receipt email:", err);
  }
}

export async function sendAdminOrderNotice(order: OrderWithItems): Promise<void> {
  const resend = getResendClient();
  if (!resend) {
    console.warn("RESEND_API_KEY not configured — skipping admin order notice email");
    return;
  }

  const baseUrl = getBaseUrl();

  try {
    const isPendingBankTransfer = order.paymentMethod === "BANK_TRANSFER" && order.status === "PENDING";

    const { error } = await resend.emails.send(
      {
        from: EMAIL_FROM,
        to: ADMIN_NOTIFICATION_EMAILS,
        subject:
          order.source === "ROOF_CALCULATOR"
            ? `New estimate request — ${order.customerName}`
            : isPendingBankTransfer
              ? `New bank transfer order (awaiting payment) — ${order.customerName}`
              : `New paid order — ${order.customerName}`,
        react: AdminOrderNoticeEmail({ order, baseUrl }),
      },
      { idempotencyKey: `admin-order-notice/${order.reference}` },
    );

    if (error) console.error("Failed to send admin order notice email:", error);
  } catch (err) {
    console.error("Failed to send admin order notice email:", err);
  }
}

// Buyer-facing — sent when a customer places a BANK_TRANSFER order, i.e. at
// order creation rather than at payment (there's no webhook to fire this
// later, so the checkout route calls it directly).
export async function sendBankTransferInstructionsEmail(
  order: OrderWithItems,
  bankDetails: Pick<BankTransferSettings, "bankName" | "accountNumber" | "accountName" | "instructions">,
): Promise<void> {
  const resend = getResendClient();
  if (!resend) {
    console.warn("RESEND_API_KEY not configured — skipping bank transfer instructions email");
    return;
  }

  try {
    const { error } = await resend.emails.send(
      {
        from: EMAIL_FROM,
        to: [order.customerEmail],
        subject: `How to pay for your order — ${order.reference}`,
        react: BankTransferInstructionsEmail({ order, ...bankDetails }),
      },
      { idempotencyKey: `bank-transfer-instructions/${order.reference}` },
    );

    if (error) console.error("Failed to send bank transfer instructions email:", error);
  } catch (err) {
    console.error("Failed to send bank transfer instructions email:", err);
  }
}
