import { BadgeCheck } from "lucide-react";

import { StarRating } from "@/components/reviews/star-rating";
import type { PublicReview } from "@/lib/reviews/queries";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: PublicReview;
  /** Hide the product line on pages that already scope to one product. */
  showProduct?: boolean;
  className?: string;
}

const dateFormatter = new Intl.DateTimeFormat("en-NG", {
  month: "long",
  year: "numeric",
});

export function ReviewCard({ review, showProduct = true, className }: ReviewCardProps) {
  const published = review.publishedAt ?? review.createdAt;

  return (
    <article className={cn("rounded-sm border border-border bg-card p-6", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <StarRating value={review.rating} />
          {review.title && (
            <h3 className="mt-2 font-heading text-sm font-bold uppercase tracking-wide">
              {review.title}
            </h3>
          )}
        </div>
        <time
          dateTime={published.toISOString()}
          className="shrink-0 text-xs text-muted-foreground"
        >
          {dateFormatter.format(published)}
        </time>
      </div>

      {/* Rendered as text, never as HTML — review bodies are untrusted input. */}
      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
        {review.body}
      </p>

      <footer className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        <span className="font-medium text-foreground">{review.authorName}</span>
        {review.authorLocation && (
          <span className="text-muted-foreground">· {review.authorLocation}</span>
        )}
        {review.verifiedPurchase && (
          <span className="inline-flex items-center gap-1 text-accent" title="Matched to an order in our system">
            <BadgeCheck className="h-3.5 w-3.5" />
            Verified purchase
          </span>
        )}
        {showProduct && review.product && (
          <span className="text-muted-foreground">· {review.product.name}</span>
        )}
      </footer>
    </article>
  );
}
