import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { RoofCalculator } from "@/components/roof-calculator/roof-calculator";
import { siteIdentity } from "@/lib/site-identity";
import { BranchBar } from "@/components/store/branch-bar";
import { listBranches, resolveBranch, loadBranchPrices, priceProduct } from "@/lib/store/branch";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/roof-calculator" },
  title: "Roof Sheet Calculator — Estimate Sheets & Cost Instantly | Gods Promise Aluminium",
  description:
    "Free roof sheet calculator for Lagos & Nigeria. Enter your roof shape and measurements to instantly estimate aluminium roofing sheets, ridges, gutters and total cost — with live pricing.",
  keywords: [
    "roof sheet calculator",
    "aluminium roofing sheet calculator Nigeria",
    "how many roofing sheets do I need",
    "roofing sheet cost calculator Lagos",
    "long span sheet calculator",
  ],
  openGraph: {
    title: "Free Roof Sheet Calculator | Gods Promise Aluminium",
    description:
      "Estimate how many aluminium roofing sheets your roof needs and get an instant cost estimate from our live price list.",
    url: `${siteIdentity.siteUrl}/roof-calculator`,
    type: "website",
    images: [
      {
        url: "/images/longspan.jpg",
        width: 1200,
        height: 630,
        alt: "Aluminium long span roofing sheets — Roof Sheet Calculator by Gods Promise Aluminium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Roof Sheet Calculator | Gods Promise Aluminium",
    description:
      "Estimate roofing sheets, accessories and cost instantly — a free tool from Gods Promise Aluminium.",
    images: ["/images/longspan.jpg"],
  },
};

const calculatorJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Roof Sheet Calculator",
  url: `${siteIdentity.siteUrl}/roof-calculator`,
  description:
    "Free calculator to estimate aluminium roofing sheets, ridges, gutters and material cost for gable, hip and hip-with-extension roofs.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (web browser)",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "NGN",
  },
  provider: {
    "@type": "Organization",
    name: siteIdentity.brandName,
    url: siteIdentity.siteUrl,
  },
};

const faqs = [
  {
    q: "How accurate is the roof sheet calculator?",
    a: "It gives a solid working estimate based on your roof shape, measurements and pitch, using the same waste and overlap allowances our team uses on site. Always confirm exact hip and valley cuts on site before placing a final order.",
  },
  {
    q: "Which roofing sheets can I calculate?",
    a: "The calculator currently covers our aluminium sheet range — Long Span, Step Tile and Metcopo — with live pricing from our current price list. For Gerard stone-coated tiles, contact us on WhatsApp for a manual estimate.",
  },
  {
    q: "Does it include ridges, gutters and other trim?",
    a: "Yes — ridge, hip and gutter lengths are worked out automatically from your roof shape and shown alongside your sheet count.",
  },
  {
    q: "Can I use it for hip roofs or roofs with an extension?",
    a: "Yes. Choose Gable, Hip, or Hip with Extension in step one and the calculator adjusts the area and cuts accordingly.",
  },
  {
    q: "Is the pricing up to date?",
    a: "Prices are pulled directly from our live store pricing — the same list used at checkout — so your estimate reflects current rates.",
  },
  {
    q: "Is this calculator free to use?",
    a: "Yes, completely free, with no sign-up required. Once you have your estimate you can send it straight to us on WhatsApp to confirm and place an order.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default async function RoofCalculatorPage() {
  const [branches, activeBranch, products] = await Promise.all([
    listBranches(),
    resolveBranch(),
    prisma.product.findMany({
      where: { category: "SHEETS", published: true },
      include: { variants: { orderBy: { sortOrder: "asc" } } },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  const branchPrices = await loadBranchPrices(activeBranch);

  // Estimates are priced at the active branch's rates, so only offer the
  // gauges that branch actually carries.
  const sheetProducts = products.flatMap((p) => {
    const priced = priceProduct(branchPrices, p);
    if (!priced.carried) return [];
    return [
      {
        id: p.id,
        name: p.name,
        slug: p.slug,
        unit: p.unit,
        variants: priced.variants.map((v) => ({
          id: v.id,
          label: v.label,
          priceKobo: v.priceKobo,
          inStock: v.inStock,
        })),
      },
    ];
  });

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="mb-3 font-heading text-xs font-bold uppercase tracking-widest text-accent">
            Free Tool
          </p>
          <h1 className="mb-4 text-balance font-heading text-4xl font-bold uppercase sm:text-5xl lg:text-6xl">
            Roof Sheet Calculator
          </h1>
          <p className="max-w-2xl text-base text-primary-foreground/80 sm:text-lg">
            Estimate sheets, ridges, gutters and cost in a few quick steps — using our current, live
            price list. Treat the result as a solid working estimate; confirm exact cuts on site
            before ordering.
          </p>
        </div>
        <div className="h-1 w-full bg-accent" />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BranchBar branches={branches} active={activeBranch} />
        </div>
        <RoofCalculator products={sheetProducts} />
      </section>

      {/* FAQ */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="font-heading mb-2 text-xs font-bold uppercase tracking-widest text-accent">
            Common Questions
          </p>
          <h2 className="font-heading mb-8 text-2xl font-bold uppercase sm:text-3xl lg:text-4xl">
            Roof Sheet Calculator FAQ
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-sm border border-border bg-card p-6"
              >
                <h3 className="font-heading text-sm font-bold uppercase tracking-wide">
                  {faq.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
