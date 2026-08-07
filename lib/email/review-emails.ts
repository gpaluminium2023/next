import { randomBytes } from "crypto";

import { ADMIN_NOTIFICATION_EMAILS, EMAIL_FROM, getResendClient } from "@/lib/resend";
import { prisma } from "@/lib/prisma";
import ReviewRequestEmail from "@/emails/review-request";

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.godspromisealuminiumroofing.com";
}

// Same contract as lib/email/order-emails.ts: these never throw. A mail
// failure must not lose a review a customer already wrote, nor break the
// admin page that triggered an invitation.

const INVITATION_TTL_DAYS = 60;

export interface ReviewInviteResult {
  ok: boolean;
  reason?: string;
}

/**
 * Emails the buyer of a paid order a single-use link to review what they
 * bought. Only PAID/FULFILLED orders qualify — the token is what later marks
 * the review "verified purchase", so it must never be issued for an order
 * that was not actually paid for.
 */
export async function sendReviewRequestEmail(orderId: string): Promise<ReviewInviteResult> {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { select: { nameSnapshot: true } } },
  });

  if (!order) return { ok: false, reason: "Order not found" };
  if (order.status !== "PAID" && order.status !== "FULFILLED") {
    return { ok: false, reason: "Only paid or fulfilled orders can be invited to review" };
  }

  const existing = await prisma.reviewInvitation.findFirst({
    where: { orderId },
    select: { id: true, usedAt: true },
  });
  if (existing) {
    return {
      ok: false,
      reason: existing.usedAt
        ? "This customer has already reviewed this order"
        : "An invitation was already sent for this order",
    };
  }

  const resend = getResendClient();
  if (!resend) {
    console.warn("RESEND_API_KEY not configured — skipping review request email");
    return { ok: false, reason: "Email is not configured" };
  }

  const token = randomBytes(24).toString("base64url");
  const expiresAt = new Date(Date.now() + INVITATION_TTL_DAYS * 24 * 60 * 60 * 1000);

  const invitation = await prisma.reviewInvitation.create({
    data: {
      token,
      orderId: order.id,
      recipientEmail: order.customerEmail,
      recipientName: order.customerName,
      expiresAt,
    },
  });

  const itemNames = [...new Set(order.items.map((item) => item.nameSnapshot))];
  const itemSummary =
    itemNames.length === 0
      ? "roofing materials"
      : itemNames.length === 1
        ? itemNames[0]
        : `${itemNames.slice(0, -1).join(", ")} and ${itemNames[itemNames.length - 1]}`;

  try {
    const { error } = await resend.emails.send(
      {
        from: EMAIL_FROM,
        to: [order.customerEmail],
        subject: `How did your roofing order turn out? (${order.reference})`,
        react: ReviewRequestEmail({
          customerName: order.customerName,
          orderReference: order.reference,
          reviewUrl: `${getBaseUrl()}/reviews/submit?token=${token}`,
          itemSummary,
        }),
      },
      { idempotencyKey: `review-request/${order.reference}` },
    );

    if (error) {
      console.error("Failed to send review request email:", error);
      // Drop the token rather than leave a live invitation nobody received.
      await prisma.reviewInvitation.delete({ where: { id: invitation.id } });
      return { ok: false, reason: "Email provider rejected the message" };
    }
  } catch (err) {
    console.error("Failed to send review request email:", err);
    await prisma.reviewInvitation.delete({ where: { id: invitation.id } }).catch(() => {});
    return { ok: false, reason: "Email provider rejected the message" };
  }

  return { ok: true };
}

/** Tells the dealer a review is waiting in the moderation queue. */
export async function sendAdminReviewNotice(reviewId: string): Promise<void> {
  const resend = getResendClient();
  if (!resend) return;

  const review = await prisma.review.findUnique({
    where: { id: reviewId },
    include: { product: { select: { name: true } } },
  });
  if (!review) return;

  const subject = `New ${review.rating}-star review awaiting approval — ${review.authorName}`;
  const productLine = review.product ? `Product: ${review.product.name}` : "Product: (general)";

  try {
    const { error } = await resend.emails.send(
      {
        from: EMAIL_FROM,
        to: ADMIN_NOTIFICATION_EMAILS,
        subject,
        text: [
          `${review.authorName}${review.authorLocation ? ` — ${review.authorLocation}` : ""}`,
          `Rating: ${review.rating}/5`,
          productLine,
          review.verifiedPurchase ? "Verified purchase: yes" : "Verified purchase: no",
          "",
          review.title ? `"${review.title}"` : "",
          review.body,
          "",
          `Approve or reject: ${getBaseUrl()}/admin/reviews`,
          "",
          "Nothing is public until you approve it.",
        ]
          .filter(Boolean)
          .join("\n"),
      },
      { idempotencyKey: `review-notice/${review.id}` },
    );

    if (error) console.error("Failed to send admin review notice:", error);
  } catch (err) {
    console.error("Failed to send admin review notice:", err);
  }
}
