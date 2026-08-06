import { BranchSelector } from "@/components/store/branch-selector";
import type { BranchSummary } from "@/lib/store/branch";

interface BranchBarProps {
  branches: BranchSummary[];
  active: BranchSummary | null;
}

const priceListFormatter = new Intl.DateTimeFormat("en-NG", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/**
 * Shows which branch's prices are on screen and lets the visitor change it.
 * Renders nothing when there is only one branch, so the store looks exactly as
 * it did before a second branch existed.
 */
export function BranchBar({ branches, active }: BranchBarProps) {
  if (branches.length < 2 || !active) return null;

  return (
    <div className="rounded-sm border border-border bg-card p-4 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <p className="font-heading text-xs font-bold uppercase tracking-widest text-accent">
          Showing {active.shortName} branch prices
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {active.addressLine}, {active.region} State
          {active.priceListDate
            ? ` · Price list updated ${priceListFormatter.format(active.priceListDate)}`
            : ""}
        </p>
        {active.note && <p className="mt-1 text-xs text-muted-foreground">{active.note}</p>}
      </div>
      <BranchSelector
        className="mt-3 sm:mt-0 sm:shrink-0"
        activeSlug={active.slug}
        branches={branches.map((b) => ({
          slug: b.slug,
          shortName: b.shortName,
          region: b.region,
        }))}
      />
    </div>
  );
}
