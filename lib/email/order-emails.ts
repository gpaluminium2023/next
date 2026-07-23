import { ADMIN_NOTIFICATION_EMAIL, EMAIL_FROM, getResendClient } from "@/lib/resend";
import { generateReceiptPdfBuffer } from "@/lib/receipts/generate-receipt-pdf";
import { OrderReceiptEmail } from "@/emails/order-receipt";
import { AdminOrderNoticeEmail } from "@/emails/admin-order-notice";
import type { OrderWithItems } from "@/lib/store/order-types";

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
    const { error } = await resend.emails.send(
      {
        from: EMAIL_FROM,
        to: [ADMIN_NOTIFICATION_EMAIL],
        subject:
          order.source === "ROOF_CALCULATOR"
            ? `New estimate request — ${order.customerName}`
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
