import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { productHighlights } from "@/lib/product-highlights";

/**
 * Text-only product cards (no photos have been supplied for these lines yet),
 * styled to sit beside the existing product cards on /products.
 */
export function ProductHighlights({
  headingLevel = "h3",
}: {
  /** Card heading level, so each page keeps a correct heading outline. */
  headingLevel?: "h2" | "h3";
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
        </li>
      ))}
    </ul>
  );
}
