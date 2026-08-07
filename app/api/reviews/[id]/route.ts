import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{ id: string }>;
}

const moderationSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
  moderationNote: z.string().trim().max(500).optional(),
});

// PATCH /api/reviews/[id] — admin only. Approving is the only thing that
// makes a review public, and it is the only thing that moves the product's
// aggregateRating, so it is deliberately a human action with no auto-approve
// path anywhere in the codebase.
export async function PATCH(request: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = moderationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid moderation payload" }, { status: 400 });
  }
  const { status, moderationNote } = parsed.data;

  const existing = await prisma.review.findUnique({
    where: { id },
    select: { publishedAt: true, consentToPublish: true, product: { select: { slug: true } } },
  });
  if (!existing) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  // Belt and braces: an imported review that never recorded consent must not
  // become publishable by way of the moderation UI either.
  if (status === "APPROVED" && !existing.consentToPublish) {
    return NextResponse.json(
      {
        error:
          "This review has no recorded consent to publish. Confirm with the customer and re-import before approving.",
      },
      { status: 409 },
    );
  }

  const review = await prisma.review.update({
    where: { id },
    data: {
      status,
      moderationNote: moderationNote || null,
      // Stamp the first approval only, so re-approving doesn't reorder the list.
      publishedAt: status === "APPROVED" ? (existing.publishedAt ?? new Date()) : null,
    },
  });

  // Ratings are baked into statically-rendered pages, so refresh the ones
  // whose aggregateRating this approval just changed.
  revalidatePath("/reviews");
  revalidatePath("/products");
  revalidatePath("/products/stone-coated");
  if (existing.product?.slug) revalidatePath(`/store/${existing.product.slug}`);

  return NextResponse.json(review);
}

// DELETE /api/reviews/[id] — admin only. For spam and for the case that
// matters most: a customer asking to have their review taken down.
export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const existing = await prisma.review.findUnique({
    where: { id },
    select: { product: { select: { slug: true } } },
  });
  if (!existing) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  await prisma.review.delete({ where: { id } });

  revalidatePath("/reviews");
  revalidatePath("/products");
  revalidatePath("/products/stone-coated");
  if (existing.product?.slug) revalidatePath(`/store/${existing.product.slug}`);

  return NextResponse.json({ ok: true });
}
