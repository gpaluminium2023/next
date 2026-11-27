import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DirectContactLines } from "@/components/direct-contact-lines";
import { ProductHighlights } from "@/components/product-highlights";
import { blackFridayOffer } from "@/lib/promo";
import { siteIdentity } from "@/lib/site-identity";
import { roofingQuoteGuideSlug } from "@/lib/roofing-quote-guide";

const { name, discountLabel, startsLabel, example } = blackFridayOffer;

// No year in the title or copy on purpose: the campaign year and end date were
// not confirmed. Add them via lib/promo.ts once the owner confirms.
export const metadata: Metadata = {
  alternates: { canonical: blackFridayOffer.path },
  title: `Black Friday Roofing Deals: ${discountLabel} | ${siteIdentity.brandName}`,
  description: `${name} at ${siteIdentity.brandName}: ${discountLabel} from ${startsLabel}. On a ${example.purchaseDisplay} purchase you save ${example.discountDisplay}. Ask us about aluminium roofing sheets, Aluzinc long-span, transparent fiberglass sheets and Gerard roofing nails.`,
  openGraph: {
    title: `Black Friday: ${discountLabel} | ${siteIdentity.brandName}`,
    description: `${discountLabel} from ${startsLabel}. Save ${example.discountDisplay} on a ${example.purchaseDisplay} purchase.`,
    url: `${siteIdentity.siteUrl}${blackFridayOffer.path}`,
    type: "website",
  },
  // Once the offer is switched off the page stays reachable for old links but
  // drops out of search.
  ...(blackFridayOffer.enabled ? {} : { robots: { index: false, follow: true } }),
};

// Every answer restates a confirmed fact; nothing here may add terms.
const faqs = [
  {
    question: `How much is the ${name} discount?`,
    answer: `The ${name} discount is ${discountLabel}. For example, on a ${example.purchaseDisplay} purchase you save ${example.discountDisplay}.`,
  },
  {
    question: `When does the ${name} offer start?`,
    answer: `The offer starts on ${startsLabel}.`,
  },
  {
    question: "How do I get a Black Friday roofing quote?",
    answer: "Send the product name, quantity and delivery town to our team. For sheets, include the profile and lengths. For Gerard nails, give the carton count. Ask us to confirm which items qualify and your final price before paying.",
  },
  {
    question: `When does the ${name} offer end?`,
    answer:
      "The end date has not been announced yet. Call or WhatsApp us to confirm the offer is still running before you order.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function BlackFridayPage() {
  if (!blackFridayOffer.enabled) {
    return (
      <div className="min-h-screen bg-background">
        <section className="container mx-auto max-w-4xl px-4 py-16 md:py-20">
          <h1 className="font-heading mb-4 text-4xl font-bold uppercase md:text-5xl">
            {name} Offer Has Ended
          </h1>
          <p className="mb-6 text-muted-foreground">
            Thank you for your interest. See our current prices or contact us
            for a quote.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-sm bg-accent font-heading font-bold uppercase tracking-wide hover:bg-accent/90">
              <Link href="/pricing">View price list</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-sm font-heading font-bold uppercase tracking-wide">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="h-1 w-full bg-accent" />
        <div className="container mx-auto max-w-4xl px-4 py-16 md:py-20">
          <p className="font-heading mb-3 text-xs font-bold uppercase tracking-widest text-accent">
            {name} · from {startsLabel}
          </p>
          <h1 className="font-heading mb-4 text-balance text-4xl font-bold uppercase md:text-5xl lg:text-6xl">
            {name} Roofing Deals: {discountLabel}
          </h1>
          <p className="max-w-2xl text-base text-primary-foreground/80 md:text-lg">
            From {startsLabel}, {siteIdentity.brandName} is offering{" "}
            {discountLabel}. Talk to our team in Lagos to confirm your price
            before you pay.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-sm bg-accent font-heading font-bold uppercase tracking-wide hover:bg-accent/90"
            >
              <a href="#contact-lines">Contact us</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-sm border-primary-foreground/30 bg-transparent font-heading font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/pricing">View price list</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Worked example */}
      <section
        aria-labelledby="how-it-works-heading"
        className="bg-secondary py-12 md:py-16"
      >
        <div className="container mx-auto max-w-4xl px-4">
          <p className="font-heading mb-2 text-xs font-bold uppercase tracking-widest text-accent">
            How It Works
          </p>
          <h2
            id="how-it-works-heading"
            className="font-heading mb-6 text-2xl font-bold uppercase md:text-3xl"
          >
            What {discountLabel} Means for Your Order
          </h2>
          <dl className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-sm border border-border bg-card p-5">
              <dt className="text-sm text-muted-foreground">Example purchase</dt>
              <dd className="font-heading mt-1 text-3xl font-bold">
                {example.purchaseDisplay}
              </dd>
            </div>
            <div className="rounded-sm border border-border bg-card p-5">
              <dt className="text-sm text-muted-foreground">Discount</dt>
              <dd className="font-heading mt-1 text-3xl font-bold text-accent">
                {discountLabel}
              </dd>
            </div>
            <div className="rounded-sm border border-accent/40 bg-accent/5 p-5">
              <dt className="text-sm text-muted-foreground">You save</dt>
              <dd className="font-heading mt-1 text-3xl font-bold text-accent">
                {example.discountDisplay}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Products */}
      <section
        aria-labelledby="bf-products-heading"
        className="py-12 md:py-16"
      >
        <div className="container mx-auto max-w-4xl px-4">
          <p className="font-heading mb-2 text-xs font-bold uppercase tracking-widest text-accent">
            Our Range
          </p>
          <h2
            id="bf-products-heading"
            className="font-heading mb-3 text-2xl font-bold uppercase md:text-3xl"
          >
            Request a Black Friday Roofing Quote
          </h2>
          <p className="mb-6 text-sm text-muted-foreground md:text-base">
            Choose a product to start a WhatsApp enquiry. Add your quantities
            and delivery town so our team can check stock and confirm your savings.
          </p>
          <ProductHighlights campaignEnquiries />

          <p className="mt-6 text-sm text-muted-foreground">
            Comparing quotes for the same job?{" "}
            <Link href={`/blog/${roofingQuoteGuideSlug}`} className="font-semibold text-accent underline underline-offset-4">
              Read the Black Friday roofing buyer’s guide
            </Link>{" "}
            for a product checklist and a sample enquiry.
          </p>

          <div className="mt-6 rounded-sm border border-border bg-secondary p-5 sm:p-6">
            <h3 className="font-heading mb-2 text-xl font-bold uppercase">
              Market Standard &amp; Caliper Standard
            </h3>
            <p className="text-sm text-muted-foreground sm:text-base">
              At our Lagos branch, aluminium roofing sheets are offered as{" "}
              <strong className="text-foreground">market standard</strong> and{" "}
              <strong className="text-foreground">caliper standard</strong>.
              Caliper standard thickness can be checked with a vernier or
              digital caliper.
            </p>
          </div>

          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-accent/80"
          >
            See all products <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="bf-faq-heading"
        className="bg-secondary py-12 md:py-16"
      >
        <div className="container mx-auto max-w-4xl px-4">
          <h2
            id="bf-faq-heading"
            className="font-heading mb-6 text-2xl font-bold uppercase md:text-3xl"
          >
            {name} Questions
          </h2>
          <dl className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-sm border border-border bg-card p-5"
              >
                <dt className="font-heading text-lg font-bold">
                  {faq.question}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground md:text-base">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact-lines"
        aria-labelledby="bf-contact-heading"
        className="scroll-mt-24 py-12 md:py-16"
      >
        <div className="container mx-auto max-w-6xl px-4">
          <p className="font-heading mb-2 text-xs font-bold uppercase tracking-widest text-accent">
            Get in Touch
          </p>
          <h2
            id="bf-contact-heading"
            className="font-heading mb-6 text-2xl font-bold uppercase md:text-3xl"
          >
            Order or Ask About the Offer
          </h2>
          <DirectContactLines />
          <p className="mt-6 text-sm text-muted-foreground">
            More ways to reach us, including email and our factory address, are
            on the{" "}
            <Link
              href="/contact"
              className="font-semibold text-accent underline-offset-4 hover:underline"
            >
              contact page
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
