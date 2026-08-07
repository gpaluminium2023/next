import { NextRequest, NextResponse } from "next/server";

import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/prisma";
import { reviewSubmissionSchema } from "@/lib/reviews/schema";
import { sendAdminReviewNotice } from "@/lib/email/review-emails";

// GET /api/reviews — admin only. The moderation queue.
export async function GET(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const status = request.nextUrl.searchParams.get("status");
  const valid = ["PENDING", "APPROVED", "REJECTED"] as const;
  const filter = valid.find((value) => value === status);

  const reviews = await prisma.review.findMany({
    where: filter ? { status: filter } : {},
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: {
      product: { select: { name: true, slug: true } },
      order: { select: { reference: true } },
    },
  });

  return NextResponse.json(reviews);
}

// POST /api/reviews — public. Stores a customer-written review as PENDING.
// Nothing here can publish: only an admin PATCH to APPROVED does that.
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = reviewSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { authorName, authorLocation, submitterEmail, rating, title, productSlug, token } =
    parsed.data;
  const reviewBody = parsed.data.body;

  // Resolve the product first so a bad slug fails before anything is written.
  let productId: string | null = null;
  if (productSlug) {
    const product = await prisma.product.findUnique({
      where: { slug: productSlug },
      select: { id: true },
    });
    if (!product) {
      return NextResponse.json({ error: "Unknown product" }, { status: 400 });
    }
    productId = product.id;
  }

  // An invitation token is what lets a review be labelled "verified purchase".
  // Without a valid, unused, unexpired token the flag stays false.
  let invitation: { id: string; orderId: string } | null = null;
  if (token) {
    const found = await prisma.reviewInvitation.findUnique({
      where: { token },
      select: { id: true, orderId: true, usedAt: true, expiresAt: true },
    });
    if (found && !found.usedAt && found.expiresAt > new Date()) {
      invitation = { id: found.id, orderId: found.orderId };
    }
  }

  // One review per email per product, matching the spec's rate limit. Checked
  // rather than enforced by a unique index because productId is nullable.
  const duplicate = await prisma.review.findFirst({
    where: { submitterEmail, productId },
    select: { id: true },
  });
  if (duplicate) {
    return NextResponse.json(
      { error: "You've already reviewed this product. Thank you!" },
      { status: 409 },
    );
  }

  const review = await prisma.review.create({
    data: {
      rating,
      title: title || null,
      body: reviewBody,
      authorName,
      authorLocation: authorLocation || null,
      submitterEmail,
      source: "WEB_FORM",
      // Submitting the public form is itself the act of asking for the review
      // to be published — the form says so above the button.
      consentToPublish: true,
      status: "PENDING",
      productId,
      orderId: invitation?.orderId ?? null,
      verifiedPurchase: Boolean(invitation),
    },
  });

  if (invitation) {
    // Single-row update — the Neon HTTP adapter rejects multi-row writes.
    await prisma.reviewInvitation.update({
      where: { id: invitation.id },
      data: { usedAt: new Date(), reviewId: review.id },
    });
  }

  // Never let a mail failure lose a review the customer already wrote.
  void sendAdminReviewNotice(review.id).catch((err) =>
    console.error("Review saved but admin notice failed:", err),
  );

  return NextResponse.json({ ok: true, id: review.id }, { status: 201 });
}
