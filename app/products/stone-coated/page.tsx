import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowRight,
    CheckCircle2,
    MessageCircle,
    Phone,
    Shield,
    ThermometerSun,
    Volume2,
    Timer,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  alternates: { canonical: "/products/stone-coated" },
  title:
    "Stone Coated Roofing Sheet Prices in Lagos | Gerard Tiles — Gods Promise Aluminium",
  description:
    "Buy genuine Gerard stone-coated roofing tiles in Lagos — Shingle, Bond, Classic, Milano & Roman profiles from ₦4,750/piece. 50-year warranty, nationwide delivery. Call for today's prices.",
  openGraph: {
    title:
      "Stone Coated Roofing Tiles — Gerard Shingle, Bond, Classic & Milano | Gods Promise Aluminium",
    description:
      "Premium Gerard stone-coated roofing tiles from New Zealand. Heat-insulated, noise-reducing and built to last 50+ years. Available in Lagos with delivery across Nigeria.",
    url: "https://www.godspromisealuminiumroofing.com/products/stone-coated",
    type: "website",
    images: [
      {
        url: "/core-products/stonetiles.jpg",
        width: 1200,
        height: 630,
        alt: "Gerard stone-coated roofing tiles at Gods Promise Aluminium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Stone Coated Roofing Sheet Prices in Lagos | Gerard Tiles",
    description:
      "Buy genuine Gerard stone-coated tiles from ₦4,750/piece. Shingle, Bond, Classic, Milano & Roman profiles. 50-year warranty.",
    images: ["/core-products/stonetiles.jpg"],
  },
};

export default function StoneCoatedPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Gerard Stone Coated Roofing Tile",
    description:
      "Premium Gerard stone-coated steel roofing tiles imported from New Zealand. Available in Shingle, Bond, Classic, Milano and Roman profiles with natural stone chip coating and 50-year warranty.",
    brand: { "@type": "Brand", name: "Gerard" },
    category: "Stone Coated Roofing Tiles",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "NGN",
      lowPrice: "4750",
      offerCount: "5",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Gods Promise Aluminium",
        url: "https://www.godspromisealuminiumroofing.com",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "46",
    },
  };

  const profiles = [
    {
      name: "Shingle",
      description:
        "Flat, textured finish that mimics natural wood shingles. Clean, modern look suited to contemporary homes and estate developments.",
      ideal: "Residential estates, modern homes",
    },
    {
      name: "Bond",
      description:
        "Low-profile interlocking tile with a subtle wave pattern. One of the most popular stone-coated profiles in Nigeria for its balanced appearance.",
      ideal: "Duplexes, bungalows, mid-range homes",
    },
    {
      name: "Classic",
      description:
        "Traditional tile profile with a timeless, universally appealing look. The most versatile option that suits virtually any building style.",
      ideal: "All building types, churches, schools",
    },
    {
      name: "Milano",
      description:
        "Roman-inspired profile with deep grooves and a premium Mediterranean aesthetic. Creates a bold, distinctive roofline.",
      ideal: "Luxury homes, hotels, commercial buildings",
    },
    {
      name: "Roman",
      description:
        "Rounded barrel-tile shape with an elegant, classic European look. Excellent water channelling and a premium architectural finish.",
      ideal: "High-end residential, villas, mansions",
    },
  ];

  const advantages = [
    {
      icon: Shield,
      title: "50+ Year Lifespan",
      description:
        "Galvanised steel base with multiple acrylic and stone-chip layers resists corrosion, cracking and UV degradation far longer than standard aluminium sheets.",
    },
    {
      icon: ThermometerSun,
      title: "Superior Heat Insulation",
      description:
        "The natural stone chip layer acts as a thermal barrier, keeping indoor temperatures 5-8°C cooler than bare metal roofing in direct sunlight.",
    },
    {
      icon: Volume2,
      title: "Noise Reduction",
      description:
        "Stone-coated tiles dramatically reduce rain noise compared to standard metal roofing — a significant comfort upgrade during heavy Lagos downpours.",
    },
    {
      icon: Timer,
      title: "Minimal Maintenance",
      description:
        "No repainting or re-coating needed. Stone-coated tiles retain their colour and finish for decades, saving long-term maintenance costs.",
    },
  ];

  const faqs = [
    {
      q: "How much do stone-coated roofing tiles cost in Lagos?",
      a: "Prices start from ₦4,750 per piece at Gods Promise Aluminium for Gerard tiles. Final pricing depends on the profile, quantity and current exchange rates. Contact us for today's exact prices.",
    },
    {
      q: "Are stone-coated tiles better than aluminium roofing sheets?",
      a: "Stone-coated tiles offer superior heat insulation, noise reduction and a longer lifespan (50+ years vs 20-30 years), but they cost more upfront. They're ideal for homeowners prioritising long-term value and comfort.",
    },
    {
      q: "Can stone-coated tiles withstand heavy rain and wind?",
      a: "Yes. Gerard stone-coated tiles are tested to withstand winds of up to 190 km/h and perform exceptionally well in tropical rainfall. The interlocking design prevents water ingress.",
    },
    {
      q: "Do you deliver stone-coated tiles outside Lagos?",
      a: "Yes, we deliver to all 36 states and the FCT. Delivery timelines and costs vary by location. Contact us for a delivery quote to your specific project site.",
    },
    {
      q: "What accessories do I need for stone-coated tile installation?",
      a: "You'll need ridge caps, hip tiles, valley troughs, starter kits, roofing nails and in some cases, eave closures. We supply complete accessory kits alongside tile orders.",
    },
    {
      q: "How do I verify the tiles are genuine Gerard?",
      a: "Genuine Gerard tiles have consistent weight, colour depth and a clearly embossed brand mark on the underside. We encourage customers to inspect samples at our factory before placing bulk orders.",
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

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link
              href="/products"
              className="font-heading text-xs font-bold uppercase tracking-widest text-primary-foreground/60 hover:text-accent transition-colors"
            >
              Products
            </Link>
            <span className="text-primary-foreground/40">/</span>
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-accent">
              Stone Coated Tiles
            </span>
          </div>
          <h1 className="font-heading mb-4 text-balance text-4xl font-bold uppercase sm:text-5xl lg:text-6xl">
            Stone Coated
            <br />
            Roofing Tiles
          </h1>
          <p className="max-w-2xl text-base text-primary-foreground/80 sm:text-lg">
            Premium Gerard stone-coated roofing tiles imported from New Zealand.
            Superior heat insulation, noise reduction and a 50-year lifespan —
            the ultimate roofing investment for Nigerian buildings.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-sm bg-accent font-heading font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90"
            >
              <a
                href="https://wa.me/2349150459964?text=Hello%2C%20I%27m%20interested%20in%20stone-coated%20roofing%20tiles.%20Please%20send%20me%20current%20prices."
                target="_blank"
                rel="noopener"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Get WhatsApp Quote
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-sm border-primary-foreground/30 bg-transparent font-heading font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary-foreground/10"
            >
              <a href="tel:+2349150459964">
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
        <div className="h-1 w-full bg-accent" />
      </section>

      {/* Product Image + Intro */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-4/3 overflow-hidden rounded-sm border border-border bg-muted">
            <Image
              src="/core-products/stonetiles.jpg"
              alt="Gerard stone-coated roofing tiles — Shingle, Bond, Classic, Milano and Roman profiles displayed at Gods Promise Aluminium"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
          <div>
            <Badge
              variant="outline"
              className="mb-3 rounded-sm text-xs uppercase tracking-wider"
            >
              Imported from New Zealand
            </Badge>
            <h2 className="font-heading mb-4 text-2xl font-bold uppercase sm:text-3xl lg:text-4xl">
              Gerard Stone-Coated Tiles
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Gerard stone-coated tiles are manufactured using a galvanised
              steel base coated with multiple layers of acrylic primer and
              natural stone chips. This multi-layer construction provides
              exceptional durability, weather resistance and thermal performance
              that far exceeds standard metal roofing.
            </p>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Available in five distinct profiles — Shingle, Bond, Classic,
              Milano and Roman — each tile delivers a beautiful, natural
              appearance while offering the strength and longevity of steel.
              Gods Promise Aluminium is a trusted supplier of genuine Gerard
              tiles in Lagos with delivery to all 36 states.
            </p>
            <div className="flex items-center gap-2 rounded-sm border border-accent/30 bg-accent/10 p-4">
              <span className="font-heading text-2xl font-bold text-accent sm:text-3xl">
                From ₦4,750
              </span>
              <span className="text-sm text-muted-foreground">/piece</span>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="font-heading mb-2 text-xs font-bold uppercase tracking-widest text-accent">
            Why Choose Stone-Coated
          </p>
          <h2 className="font-heading mb-10 text-2xl font-bold uppercase sm:text-3xl lg:text-4xl">
            Key Advantages
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((adv) => (
              <div key={adv.title} className="flex flex-col gap-4 p-6">
                <adv.icon className="h-8 w-8 text-accent" />
                <div>
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wide">
                    {adv.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-primary-foreground/65">
                    {adv.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profiles */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <p className="font-heading mb-2 text-xs font-bold uppercase tracking-widest text-accent">
          Available Profiles
        </p>
        <h2 className="font-heading mb-3 text-2xl font-bold uppercase sm:text-3xl lg:text-4xl">
          Five Profiles to Suit Any Project
        </h2>
        <p className="mb-10 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Each Gerard stone-coated tile profile offers a distinct architectural
          look while sharing the same premium multi-layer construction.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile, i) => (
            <div
              key={profile.name}
              className="rounded-sm border border-border bg-card p-6"
            >
              <span className="font-heading text-5xl font-bold leading-none text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold uppercase tracking-wide">
                {profile.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {profile.description}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                <span className="text-xs text-muted-foreground">
                  Ideal for: {profile.ideal}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Summary */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="font-heading mb-2 text-xs font-bold uppercase tracking-widest text-accent">
            Pricing Guide
          </p>
          <h2 className="font-heading mb-3 text-2xl font-bold uppercase sm:text-3xl lg:text-4xl">
            Stone-Coated Tile Prices in Lagos
          </h2>
          <p className="mb-8 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Prices vary by profile, colour and current exchange rates. Contact
            us for the most accurate quote for your project.
          </p>
          <div className="overflow-hidden rounded-sm border border-border bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left font-heading text-xs font-bold uppercase tracking-wider">
                    Profile
                  </th>
                  <th className="px-4 py-3 text-left font-heading text-xs font-bold uppercase tracking-wider">
                    Starting Price
                  </th>
                  <th className="px-4 py-3 text-left font-heading text-xs font-bold uppercase tracking-wider">
                    Coverage
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { profile: "Shingle", price: "₦4,750", coverage: "~0.42 m²/piece" },
                  { profile: "Bond", price: "₦4,750", coverage: "~0.42 m²/piece" },
                  { profile: "Classic", price: "₦4,900", coverage: "~0.42 m²/piece" },
                  { profile: "Milano", price: "₦5,100", coverage: "~0.40 m²/piece" },
                  { profile: "Roman", price: "₦5,200", coverage: "~0.38 m²/piece" },
                ].map((row) => (
                  <tr
                    key={row.profile}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-4 py-3 font-medium">{row.profile}</td>
                    <td className="px-4 py-3 font-heading font-bold text-accent">
                      {row.price}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.coverage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Prices are per piece and exclude delivery. Accessories (ridge caps,
            hip tiles, valley troughs, starter kits) add approximately 15–20%
            to total material cost. Prices updated January 2026.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <p className="font-heading mb-2 text-xs font-bold uppercase tracking-widest text-accent">
          Common Questions
        </p>
        <h2 className="font-heading mb-8 text-2xl font-bold uppercase sm:text-3xl lg:text-4xl">
          Stone-Coated Roofing FAQ
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
      </section>

      {/* CTA */}
      <section className="bg-accent text-accent-foreground">
        <div className="h-1 w-full bg-primary" />
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-3 font-heading text-xs font-bold uppercase tracking-[0.28em] opacity-75">
                288 Abeokuta Expressway, Iyana Ipaja, Lagos State
              </p>
              <h2 className="font-heading text-3xl font-bold uppercase leading-none tracking-tight md:text-5xl lg:text-6xl">
                Ready to Roof
                <br />
                With Stone-Coated?
              </h2>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Button
                asChild
                size="lg"
                className="rounded-sm bg-primary font-heading font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/contact">Get a Quote Today</Link>
              </Button>
              <p className="text-xs opacity-75">
                09150459964 · 07040249854 · 07060414466 · 08146074077
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Products */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          Back to all products
        </Link>
      </section>
    </div>
  );
}
