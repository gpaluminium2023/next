import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface StarRatingProps {
  /** 1–5. Fractional values render a partially filled star. */
  value: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Screen-reader label; defaults to "N out of 5 stars". */
  label?: string;
}

const SIZES = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
} as const;

// Display-only. The interactive input lives in review-form.tsx.
export function StarRating({ value, size = "md", className, label }: StarRatingProps) {
  const clamped = Math.max(0, Math.min(5, value));
  const starClass = SIZES[size];

  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={label ?? `${clamped} out of 5 stars`}
    >
      {[0, 1, 2, 3, 4].map((index) => {
        // Portion of this star that should be filled, 0–1.
        const fill = Math.max(0, Math.min(1, clamped - index));

        return (
          <span key={index} className="relative inline-block" aria-hidden="true">
            <Star className={cn(starClass, "text-muted-foreground/30")} />
            {fill > 0 && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star className={cn(starClass, "fill-accent text-accent")} />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
