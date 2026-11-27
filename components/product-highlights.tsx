import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { productHighlights } from "@/lib/product-highlights";
import { blackFridayOffer } from "@/lib/promo";
import { siteIdentity } from "@/lib/site-identity";

/**
 * Text-only product cards (no photos have been supplied for these lines yet),
 * styled to sit beside the existing product cards on /products.
 */
export function ProductHighlights({
  headingLevel = "h3",
  campaignEnquiries = false,
}: {
  /** Card heading level, so each page keeps a correct heading outline. */
  headingLevel?: "h2" | "h3";
  campaignEnquiries?: boolean;
}) {
  const Heading = headingLevel;

  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {productHighlights.map((product) => (
        <li
          key={product.id}
          id={product.id}
          className="flex scroll-mt-24 flex-col rounded-sm border border-border bg-card p-5"
        >
          <Heading className="font-heading mb-2 text-xl font-bold uppercase">
            {product.name}
          </Heading>
          <p className="mb-4 text-sm text-muted-foreground sm:text-base">
            {product.summary}
          </p>
          {product.details.length > 0 ? (
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground marker:text-accent">
              {product.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          ) : null}
          {product.link ? (
            <Link
              href={product.link.href}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-accent/80"
            >
              {product.link.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
          {campaignEnquiries && blackFridayOffer.enabled && (
            <a
              href={`${siteIdentity.whatsappUrl}?text=${encodeURIComponent(`Hello, I’m asking about ${product.name} for Black Friday. ${product.quotePrompt} Please confirm availability, whether the offer applies, and the delivered price.`)}`}
              aria-label={`Ask for a Black Friday quote for ${product.name} on WhatsApp`}
              className="mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-4 text-sm font-bold text-accent underline-offset-4 hover:underline"
            >
              Ask for a quote on WhatsApp <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
