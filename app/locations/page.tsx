import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight, Phone, Factory } from "lucide-react";
import { locations } from "@/lib/locations-data";

export const metadata: Metadata = {
  alternates: { canonical: "/locations" },
  title:
    "Aluminium Roofing Company in Nigeria — All 36 States & FCT | Gods Promise Aluminium",
  description:
    "Gods Promise Aluminium delivers factory-direct aluminium (aluminum) roofing sheets to all 36 states and Abuja FCT. Find your state for local pricing, delivery times and contact details.",
  openGraph: {
    title:
      "Aluminium Roofing Company in Nigeria — All 36 States & FCT | Gods Promise Aluminium",
    description:
      "Factory-direct aluminum roofing sheets delivered to all 36 Nigerian states and FCT. Get local pricing for your state.",
  },
};

const regions = [
  "South-West",
  "South-South",
  "South-East",
  "North-Central",
  "North-West",
  "North-East",
] as const;

export default function LocationsPage() {
  const grouped = regions.map((region) => ({
    region,
    states: locations.filter((loc) => loc.region === region),
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="h-1 w-full bg-accent" />
        <div className="container px-4 mx-auto max-w-4xl py-16 md:py-20">
          <p className="text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3">
            Nationwide Coverage
          </p>
          <h1 className="font-heading uppercase font-bold text-4xl md:text-5xl text-balance">
            Aluminium Roofing Company in Nigeria
          </h1>
          <p className="mt-4 text-primary-foreground/80 text-sm md:text-base max-w-2xl">
            Gods Promise Aluminium manufactures and delivers aluminium roofing
            sheets to building sites across all 36 Nigerian states and the
            Federal Capital Territory. Select your state below for local
            pricing, delivery times and product availability.
          </p>
        </div>
      </section>

      {/* Factory Info Strip */}
      <section className="border-b border-border bg-card">
        <div className="container px-4 mx-auto max-w-4xl py-6 flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Factory className="h-4 w-4 text-accent shrink-0" />
            <span>
              Factory: Km 38 Lagos-Abeokuta Expressway, Sango Ota, Ogun State
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-accent shrink-0" />
            <a href="tel:+2349150459964" className="hover:text-foreground">
              +234 915 045 9964
            </a>
          </div>
        </div>
      </section>

      {/* States by Region */}
      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="font-heading uppercase font-bold text-2xl md:text-3xl mb-2">
            Find Your State
          </h2>
          <p className="text-sm text-muted-foreground md:text-base mb-10">
            We deliver to every state in Nigeria. Click your state to see local
            delivery information, available products and frequently asked
            questions specific to your area.
          </p>

          <div className="space-y-10">
            {grouped.map(({ region, states }) => (
              <div key={region}>
                <h3 className="font-heading font-bold text-lg mb-4 border-b border-border pb-2">
                  {region}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {states.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/locations/${loc.slug}`}
                      className="group rounded-sm border border-border bg-card p-4 flex items-center justify-between hover:border-accent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-accent shrink-0" />
                        <div>
                          <span className="font-heading font-bold text-sm">
                            {loc.name}
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            {loc.deliveryDays}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Starting Prices Strip */}
      <section className="bg-secondary">
        <div className="container px-4 mx-auto max-w-4xl py-12 md:py-16">
          <h2 className="font-heading uppercase font-bold text-2xl md:text-3xl mb-6">
            Factory-Direct Pricing Nationwide
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="rounded-sm border border-border bg-card p-5 text-center">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-heading font-bold mb-1">
                Long Span Sheets
              </p>
              <p className="font-heading font-bold text-2xl">
                From ₦4,300<span className="text-sm font-normal">/sqm</span>
              </p>
            </div>
            <div className="rounded-sm border border-border bg-card p-5 text-center">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-heading font-bold mb-1">
                Step Tiles
              </p>
              <p className="font-heading font-bold text-2xl">
                From ₦5,600<span className="text-sm font-normal">/sqm</span>
              </p>
            </div>
            <div className="rounded-sm border border-border bg-card p-5 text-center">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-heading font-bold mb-1">
                Stone-Coated Tiles
              </p>
              <p className="font-heading font-bold text-2xl">
                From ₦4,750<span className="text-sm font-normal">/sqm</span>
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Prices are factory-gate rates. Delivery charges vary by state and
            order volume.{" "}
            <Link
              href="/pricing"
              className="text-accent hover:underline font-medium"
            >
              View full price list →
            </Link>
          </p>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto max-w-4xl py-12 md:py-16 text-center">
          <h2 className="font-heading uppercase font-bold text-2xl md:text-3xl mb-3">
            Get a Roofing Quote for Your State
          </h2>
          <p className="text-primary-foreground/80 text-sm md:text-base mb-6 max-w-xl mx-auto">
            Tell us your location, roof area and preferred profile. We will send
            a quotation including delivery cost within the same business day.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/2349150459964?text=Hello%2C%20I%20need%20a%20roofing%20quote.%20My%20state%20is%3A%20"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center justify-center rounded-sm bg-accent text-accent-foreground font-heading font-bold uppercase text-sm px-6 py-3 hover:bg-accent/90 transition-colors"
            >
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-sm border border-primary-foreground/30 text-primary-foreground font-heading font-bold uppercase text-sm px-6 py-3 hover:bg-primary-foreground/10 transition-colors"
            >
              Contact Form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
