import Link from "next/link";
import { MessageCircle, Phone, ShoppingCart } from "lucide-react";

import { siteIdentity } from "@/lib/site-identity";
import { gerardNails, gerardNailsUrl, gerardNailsWhatsAppUrl } from "@/lib/nails-content";

type NailsOrderBoxProps = {
  /** Hide the "buy online" button on the store page, which has its own cart. */
  showStoreLink?: boolean;
};

/**
 * Price and the three ways to order Gerard nails. The point of every nails
 * page is a call, a WhatsApp message or a sale, so this sits next to every
 * video and answer rather than only at the bottom of the page.
 */
export function NailsOrderBox({ showStoreLink = true }: NailsOrderBoxProps) {
  return (
    <div className="rounded-sm border border-border bg-card p-5">
      <p className="font-heading text-xs font-bold uppercase tracking-widest text-accent">
        Wholesale price
      </p>
      <p className="mt-1 font-heading text-3xl font-bold">
        {gerardNails.priceDisplay}
        <span className="ml-1 text-base font-medium text-muted-foreground">
          / {gerardNails.cartonKg}kg carton
        </span>
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        {gerardNails.packsPerCarton} packs × {gerardNails.packKg}kg per carton · bulk discounts ·
        nationwide delivery
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <a
          href={gerardNailsWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-accent px-4 py-2.5 font-heading text-sm font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90"
        >
          <MessageCircle className="h-4 w-4" /> Order on WhatsApp
        </a>
        <a
          href={`tel:${siteIdentity.phoneE164}`}
          className="inline-flex items-center justify-center gap-2 rounded-sm border border-border px-4 py-2.5 font-heading text-sm font-bold uppercase tracking-wide hover:border-accent/60"
        >
          <Phone className="h-4 w-4" /> Call {siteIdentity.phoneDisplay}
        </a>
        {showStoreLink && (
          <Link
            href={gerardNailsUrl}
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-border px-4 py-2.5 font-heading text-sm font-bold uppercase tracking-wide hover:border-accent/60 sm:col-span-2"
          >
            <ShoppingCart className="h-4 w-4" /> Buy online
          </Link>
        )}
      </div>
    </div>
  );
}
