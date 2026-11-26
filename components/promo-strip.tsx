import Link from "next/link";

import { blackFridayOffer } from "@/lib/promo";

/**
 * One-line Black Friday notice above the site header. Reads everything from
 * lib/promo.ts and renders nothing once the offer is switched off there.
 */
export function PromoStrip() {
  if (!blackFridayOffer.enabled) return null;

  return (
    <aside
      aria-label={`${blackFridayOffer.name} offer`}
      className="w-full bg-accent text-accent-foreground"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center text-sm sm:px-6 lg:px-8">
        <p>
          <span className="font-heading font-bold uppercase tracking-wide">
            {blackFridayOffer.name}: {blackFridayOffer.discountLabel}
          </span>{" "}
          from {blackFridayOffer.startsLabel}
        </p>
        <Link
          href={blackFridayOffer.path}
          className="font-semibold underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-foreground"
        >
          See the offer
        </Link>
      </div>
    </aside>
  );
}
