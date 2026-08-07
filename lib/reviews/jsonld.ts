import type { PublicReview, RatingSummary } from "@/lib/reviews/queries";

// ──────────────────────────────
// schema.org review markup
//
// The single rule this module exists to enforce: every star Google shows for
// this site must correspond to a real approved review row. Both builders
// return `undefined` — never a placeholder, never a default — when there is
// nothing real to describe, and callers spread the result so the key simply
// does not appear in the emitted JSON-LD.
//
// Google additionally requires that markup describe content actually visible
// on the page, so a page that spreads these must also render the reviews.
// ──────────────────────────────

export interface AggregateRatingNode {
  "@type": "AggregateRating";
  ratingValue: string;
  reviewCount: string;
  bestRating: "5";
  worstRating: "1";
}

export interface ReviewNode {
  "@type": "Review";
  author: { "@type": "Person"; name: string };
  reviewRating: {
    "@type": "Rating";
    ratingValue: string;
    bestRating: "5";
    worstRating: "1";
  };
  reviewBody: string;
  datePublished: string;
  name?: string;
}

/**
 * Returns `{ aggregateRating }` for spreading into a Product node, or `{}`
 * when there are no approved reviews. Google treats aggregateRating as a
 * recommended field: its absence is a warning, while a fabricated value is a
 * policy violation. Absence is always the correct answer for zero reviews.
 */
export function buildAggregateRating(
  summary: RatingSummary,
): { aggregateRating: AggregateRatingNode } | Record<string, never> {
  if (summary.count === 0 || summary.average === null) return {};

  return {
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: summary.average.toFixed(1),
      reviewCount: String(summary.count),
      bestRating: "5",
      worstRating: "1",
    },
  };
}

/**
 * Returns `{ review }` for spreading into a Product node, or `{}` when there
 * are no approved reviews. `limit` caps how many individual reviews are
 * serialised — the aggregate still counts every one.
 */
export function buildReviewNodes(
  reviews: PublicReview[],
  limit = 10,
): { review: ReviewNode[] } | Record<string, never> {
  if (reviews.length === 0) return {};

  const nodes = reviews.slice(0, limit).map((review): ReviewNode => {
    const published = review.publishedAt ?? review.createdAt;
    return {
      "@type": "Review",
      author: { "@type": "Person", name: review.authorName },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(review.rating),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: review.body,
      datePublished: published.toISOString().slice(0, 10),
      ...(review.title ? { name: review.title } : {}),
    };
  });

  return { review: nodes };
}
