import { prisma } from "@/lib/prisma";

// A review as it is safe to render publicly. Note what is absent:
// submitterEmail never leaves the server.
export interface PublicReview {
  id: string;
  rating: number;
  title: string | null;
  body: string;
  authorName: string;
  authorLocation: string | null;
  verifiedPurchase: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  product: { name: string; slug: string } | null;
}

export interface RatingSummary {
  /** Mean rating rounded to 1dp. Null when there is nothing to average. */
  average: number | null;
  count: number;
  /** Counts keyed 1–5, for the distribution bars. */
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

export const EMPTY_RATING_SUMMARY: RatingSummary = {
  average: null,
  count: 0,
  distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
};

const publicReviewSelect = {
  id: true,
  rating: true,
  title: true,
  body: true,
  authorName: true,
  authorLocation: true,
  verifiedPurchase: true,
  publishedAt: true,
  createdAt: true,
  product: { select: { name: true, slug: true } },
} as const;

/**
 * Approved reviews, newest first. `productSlug` narrows to one product;
 * omitting it returns every approved review including business-wide ones.
 */
export async function getApprovedReviews(options?: {
  productSlug?: string;
  limit?: number;
}): Promise<PublicReview[]> {
  const { productSlug, limit } = options ?? {};

  return prisma.review.findMany({
    where: {
      status: "APPROVED",
      ...(productSlug ? { product: { slug: productSlug } } : {}),
    },
    select: publicReviewSelect,
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    ...(limit ? { take: limit } : {}),
  });
}

function summarise(rows: { rating: number; _count: { rating: number } }[]): RatingSummary {
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<1 | 2 | 3 | 4 | 5, number>;
  let count = 0;
  let total = 0;

  for (const row of rows) {
    const bucket = row.rating as 1 | 2 | 3 | 4 | 5;
    if (bucket < 1 || bucket > 5) continue;
    distribution[bucket] = row._count.rating;
    count += row._count.rating;
    total += row.rating * row._count.rating;
  }

  return {
    average: count === 0 ? null : Math.round((total / count) * 10) / 10,
    count,
    distribution,
  };
}

/**
 * Rating summary for one product. Returns EMPTY_RATING_SUMMARY when the
 * product has no approved reviews — callers must treat that as "emit no
 * aggregateRating", never as a reason to substitute a default.
 */
export async function getProductRatingSummary(productSlug: string): Promise<RatingSummary> {
  const rows = await prisma.review.groupBy({
    by: ["rating"],
    where: { status: "APPROVED", product: { slug: productSlug } },
    _count: { rating: true },
  });

  return summarise(rows);
}

/** Rating summary across every approved review, for the /reviews page. */
export async function getSiteRatingSummary(): Promise<RatingSummary> {
  const rows = await prisma.review.groupBy({
    by: ["rating"],
    where: { status: "APPROVED" },
    _count: { rating: true },
  });

  return summarise(rows);
}

/** Per-product summaries in one round trip, keyed by product slug. */
export async function getRatingSummariesBySlug(): Promise<Record<string, RatingSummary>> {
  const rows = await prisma.review.groupBy({
    by: ["productId", "rating"],
    where: { status: "APPROVED", productId: { not: null } },
    _count: { rating: true },
  });

  const productIds = [...new Set(rows.map((row) => row.productId).filter((id): id is string => !!id))];
  if (productIds.length === 0) return {};

  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, slug: true },
  });
  const slugById = new Map(products.map((product) => [product.id, product.slug]));

  const grouped = new Map<string, { rating: number; _count: { rating: number } }[]>();
  for (const row of rows) {
    const slug = row.productId ? slugById.get(row.productId) : undefined;
    if (!slug) continue;
    const bucket = grouped.get(slug) ?? [];
    bucket.push({ rating: row.rating, _count: row._count });
    grouped.set(slug, bucket);
  }

  return Object.fromEntries([...grouped].map(([slug, bucket]) => [slug, summarise(bucket)]));
}
