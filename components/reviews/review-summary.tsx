import Link from "next/link";

import { StarRating } from "@/components/reviews/star-rating";
import type { RatingSummary } from "@/lib/reviews/queries";
import { cn } from "@/lib/utils";

interface ReviewSummaryProps {
  summary: RatingSummary;
  className?: string;
  /** Shown in place of the numbers when there are no reviews yet. */
  emptyHint?: string;
}

// Renders nothing but an honest prompt when count is 0. There is deliberately
// no "5.0" default and no "no reviews yet — 4.8 average across our range":
// what this component shows is what buildAggregateRating() will emit.
export function ReviewSummary({ summary, className, emptyHint }: ReviewSummaryProps) {
  if (summary.count === 0 || summary.average === null) {
    return (
      <div className={cn("text-sm text-muted-foreground", className)}>
        {emptyHint ?? "No reviews yet."}{" "}
        <Link href="/reviews/submit" className="text-accent underline-offset-4 hover:underline">
          Be the first to write one.
        </Link>
      </div>
    );
  }

  const maxCount = Math.max(...Object.values(summary.distribution));

  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8", className)}>
      <div className="shrink-0">
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-4xl font-bold leading-none">
            {summary.average.toFixed(1)}
          </span>
          <span className="text-sm text-muted-foreground">/ 5</span>
        </div>
        <StarRating value={summary.average} size="lg" className="mt-2" />
        <p className="mt-1.5 text-xs text-muted-foreground">
          {summary.count} {summary.count === 1 ? "review" : "reviews"}
        </p>
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        {([5, 4, 3, 2, 1] as const).map((bucket) => {
          const count = summary.distribution[bucket];
          const width = maxCount === 0 ? 0 : (count / maxCount) * 100;

          return (
            <div key={bucket} className="flex items-center gap-2 text-xs">
              <span className="w-3 text-right text-muted-foreground">{bucket}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-accent" style={{ width: `${width}%` }} />
              </div>
              <span className="w-6 text-right text-muted-foreground">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
