import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    MapPin,
    Truck,
    Phone,
    Clock,
    CheckCircle2,
    ChevronRight,
} from "lucide-react";
import { locations, getLocationBySlug } from "@/lib/locations-data";

/* ── Static params for ISR / static export ─────────────────────────────── */

export function generateStaticParams() {
  return locations.map((loc) => ({ state: loc.slug }));
}

/* ── Metadata ───────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const loc = getLocationBySlug(state);
  if (!loc) return {};

  const title = `Aluminium Roofing Company in ${loc.name} | Gods Promise Aluminium`;
  const description = `Buy factory-direct aluminium roofing sheets in ${loc.name}. ${loc.deliveryDays} delivery. Long span, step tiles & stone-coated tiles from ₦4,300/sqm. Call +234 915 045 9964.`;

  return {
    alternates: { canonical: `/locations/${loc.slug}` },
    title,
    description,
    openGraph: {
      title,
      description: description.replace("aluminium", "aluminum"),
    },
  };
}

/* ── Products data (static) ─────────────────────────────────────────────── */

const products = [
  {
    name: "Long Span Roofing Sheets",
    description:
      "The most popular aluminium roofing profile in Nigeria. Available in gauges from 0.40 mm to 1.00 mm, produced to custom lengths.",
    startPrice: "₦4,300/sqm",
  },
  {
    name: "Step Tiles (Aluminium)",
    description:
      "A step-tile profile that combines the appearance of traditional tiles with the lightweight strength of aluminium.",
    startPrice: "₦5,600/sqm",
  },
  {
    name: "Stone-Coated Roofing Tiles",
    description:
      "Premium Gerard stone-coated tiles in Shingle, Bond, Classic and Milano profiles for a distinctive high-end finish.",
    startPrice: "₦4,750/sqm",
  },
  {
    name: "Flat Aluminium Sheets",
    description:
      "Plain flat aluminium sheets for cladding, fascia boards, soffits and custom fabrication work.",
    startPrice: "From ₦4,500/sqm",
  },
];

/* ── Page ────────────────────────────────────────────────────────────────── */

export default async function LocationStatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const loc = getLocationBySlug(state);
  if (!loc) notFound();

  /* JSON-LD LocalBusiness schema for the state */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Gods Promise Aluminium",
    description: `Aluminium roofing company serving ${loc.name}, Nigeria. Factory-direct roofing sheets delivered to ${loc.keyAreas.slice(0, 3).join(", ")} and surrounding areas.`,
    telephone: "+2349150459964",
    url: `https://www.godspromisealuminiumroofing.com/locations/${loc.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Km 38 Lagos-Abeokuta Expressway, Beside First Bank",
      addressLocality: "Sango Ota",
      addressRegion: "Ogun State",
      addressCountry: "NG",
    },
    areaServed: {
      "@type": "State",
      name: loc.name,
      containedInPlace: { "@type": "Country", name: "Nigeria" },
    },
    priceRange: "₦₦",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground">
        <div className="h-1 w-full bg-accent" />
        <div className="container px-4 mx-auto max-w-4xl py-16 md:py-20">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1 text-xs text-primary-foreground/60 mb-4"
          >
            <Link href="/" className="hover:text-primary-foreground/80">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              href="/locations"
              className="hover:text-primary-foreground/80"
            >
              Locations
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary-foreground/90">{loc.name}</span>
          </nav>

          <p className="text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3">
            {loc.region} Nigeria
          </p>
          <h1 className="font-heading uppercase font-bold text-4xl md:text-5xl text-balance">
            Aluminium Roofing Company in {loc.name}
          </h1>
          <p className="mt-4 text-primary-foreground/80 text-sm md:text-base max-w-2xl">
            {loc.intro}
          </p>

          {/* Quick stats */}
          <div className="mt-8 flex flex-wrap gap-6">
            <QuickStat
              icon={<Clock className="h-4 w-4" />}
              label="Delivery"
              value={loc.deliveryDays}
            />
            <QuickStat
              icon={<MapPin className="h-4 w-4" />}
              label="Region"
              value={loc.region}
            />
            <QuickStat
              icon={<Truck className="h-4 w-4" />}
              label="Areas covered"
              value={loc.keyAreas.length + "+ towns"}
            />
          </div>
        </div>
      </section>

      {/* ── Products Available ────────────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="font-heading uppercase font-bold text-2xl md:text-3xl mb-2">
            Products Available in {loc.name}
          </h2>
          <p className="text-sm text-muted-foreground md:text-base mb-8">
            All products manufactured at our factory are available for delivery
            to {loc.name}. Prices are factory-gate rates — delivery charge is
            quoted separately based on your exact location.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((prod) => (
              <div
                key={prod.name}
                className="rounded-sm border border-border bg-card p-6"
              >
                <h3 className="font-heading font-bold text-base mb-1">
                  {prod.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {prod.description}
                </p>
                <p className="font-heading font-bold text-accent text-lg">
                  {prod.startPrice}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            <Link
              href="/pricing"
              className="text-accent hover:underline font-medium"
            >
              View the complete 2025 price list →
            </Link>
          </p>
        </div>
      </section>

      {/* ── Delivery ─────────────────────────────────────────────────────── */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="font-heading uppercase font-bold text-2xl md:text-3xl mb-2">
            Delivery to {loc.name}
          </h2>
          <div className="mt-4 rounded-sm border border-border bg-card p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-heading font-bold text-base">
                  Estimated transit time
                </p>
                <p className="text-sm text-muted-foreground">
                  {loc.deliveryDays}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-heading font-bold text-base">
                  Delivery details
                </p>
                <p className="text-sm text-muted-foreground">
                  {loc.deliveryNote}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-heading font-bold text-base">
                  Key areas we cover in {loc.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {loc.keyAreas.join(", ")}
                </p>
              </div>
            </div>
            {loc.hasDealer && (
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-bold text-base">
                    Local dealer/partner available
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We have distribution partners in {loc.name}.{" "}
                    <Link
                      href="/dealers"
                      className="text-accent hover:underline"
                    >
                      Learn about our dealer network →
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="font-heading uppercase font-bold text-2xl md:text-3xl mb-2">
            Why Choose Gods Promise Aluminium in {loc.name}
          </h2>
          <p className="text-sm text-muted-foreground md:text-base mb-6">
            {loc.whyChooseUs}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Factory-Direct Pricing",
                text: "Buy directly from the manufacturer. No middlemen, no inflated market prices.",
              },
              {
                title: "Verified Gauge Thickness",
                text: "Every sheet produced to exact specifications. Caliper-verified before dispatch.",
              },
              {
                title: "Full Colour Range",
                text: "Wine, blue, green, brown, black and more. Consistent colour across your entire order.",
              },
              {
                title: "Custom Lengths",
                text: "Sheets produced to your exact roof measurements. Less waste, cleaner installation.",
              },
              {
                title: "Nationwide Delivery",
                text: `Reliable delivery to ${loc.name} and all 36 states. We handle the logistics.`,
              },
              {
                title: "WhatsApp Ordering",
                text: "Get a quote, confirm your order and track delivery — all through WhatsApp.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-sm border border-border bg-card p-5"
              >
                <h3 className="font-heading font-bold text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="font-heading uppercase font-bold text-2xl md:text-3xl mb-6">
            Aluminium Roofing FAQs — {loc.name}
          </h2>
          <div className="space-y-4">
            {loc.faq.map((item) => (
              <div
                key={item.question}
                className="rounded-sm border border-border bg-card p-6"
              >
                <h3 className="font-heading font-bold text-base mb-2">
                  {item.question}
                </h3>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Have another question?{" "}
            <Link href="/faq" className="text-accent hover:underline font-medium">
              See our full FAQ page →
            </Link>
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto max-w-4xl py-12 md:py-16 text-center">
          <h2 className="font-heading uppercase font-bold text-2xl md:text-3xl mb-3">
            Get a Quote for Your {loc.name} Project
          </h2>
          <p className="text-primary-foreground/80 text-sm md:text-base mb-6 max-w-xl mx-auto">
            Share your roof area, preferred profile and delivery address in{" "}
            {loc.name}. We will send a full quotation including delivery cost.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/2349150459964?text=${encodeURIComponent(`Hello, I need a roofing quote for my project in ${loc.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center justify-center rounded-sm bg-accent text-accent-foreground font-heading font-bold uppercase text-sm px-6 py-3 hover:bg-accent/90 transition-colors"
            >
              WhatsApp Us
            </a>
            <a
              href="tel:+2349150459964"
              className="inline-flex items-center justify-center rounded-sm border border-primary-foreground/30 text-primary-foreground font-heading font-bold uppercase text-sm px-6 py-3 hover:bg-primary-foreground/10 transition-colors"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* ── Other Location Links ─────────────────────────────────────────── */}
      <section className="py-10 border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="font-heading font-bold text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Other Locations We Serve
          </h2>
          <div className="flex flex-wrap gap-2">
            {locations
              .filter((l) => l.slug !== loc.slug)
              .map((l) => (
                <Link
                  key={l.slug}
                  href={`/locations/${l.slug}`}
                  className="text-xs text-muted-foreground hover:text-accent transition-colors"
                >
                  {l.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Helper component ───────────────────────────────────────────────────── */

function QuickStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 text-primary-foreground/80">
      <span className="text-accent">{icon}</span>
      <span className="text-xs uppercase tracking-wider">{label}:</span>
      <span className="font-heading font-bold text-sm text-primary-foreground">
        {value}
      </span>
    </div>
  );
}
