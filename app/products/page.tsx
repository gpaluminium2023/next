import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageCircle,
  Phone,
  Ruler,
  Shield,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductColors } from "@/components/product-colors";

export const metadata: Metadata = {
  alternates: { canonical: "/products" },
  title:
    "Aluminium Roofing Sheets, Step Tiles & Stone-Coated Tiles | Buy Direct in Lagos",
  description:
    "Buy aluminium long span roofing sheets, flat aluminium roofing sheets, step tiles, Metcopo and Gerard stone-coated tiles direct from our factory. Wholesale & retail — call for today's prices.",
  openGraph: {
    title:
      "Aluminium Roofing Sheets & Stone-Coated Tiles | Gods Promise Aluminium Products",
    description:
      "Browse our full range of aluminum roofing sheets, flat sheets, step tiles, stone-coated tiles and accessories. Quality roofing materials supplied across Lagos and Nigeria.",
    url: "https://www.godspromisealuminiumroofing.com/products",
    type: "website",
  },
};

export default function ProductsPage() {
  const productsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Gods Promise Aluminium Products",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Product",
          name: "Aluminium Long Span Roofing Sheet",
          description:
            "0.45mm and 0.55mm aluminium long span roofing sheets manufactured in Lagos. Available in custom lengths up to 6m. Rust-proof and lightweight.",
          brand: { "@type": "Brand", name: "Gods Promise Aluminium" },
          category: "Roofing Sheets",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Product",
          name: "Aluminium Step Tile Roofing Sheet",
          description:
            "Step tile profile aluminium roofing sheets with realistic tile appearance. Available in 0.45mm and 0.55mm thickness in various colours.",
          brand: { "@type": "Brand", name: "Gods Promise Aluminium" },
          category: "Roofing Sheets",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Product",
          name: "Metcopo Aluminium Roofing Sheet",
          description:
            "Metcopo profile aluminium roofing sheets with bold tile design. Manufactured in 0.45mm and 0.55mm gauges for residential and commercial roofing.",
          brand: { "@type": "Brand", name: "Gods Promise Aluminium" },
          category: "Roofing Sheets",
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Product",
          name: "Gerard Stone Coated Roofing Tile",
          description:
            "Premium stone-coated steel roofing tiles by Gerard. Available in Classic, Milano, Heritage, Shingle and Roman profiles with 50-year warranty.",
          brand: { "@type": "Brand", name: "Gerard" },
          category: "Stone Coated Tiles",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
      />
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="font-heading mb-3 text-xs font-bold uppercase tracking-widest text-accent">
            Premium Aluminium Products
          </p>
          <h1 className="font-heading mb-4 text-balance text-4xl font-bold uppercase sm:text-5xl lg:text-6xl">
            Roofing Sheets, Tiles &amp; Accessories
          </h1>
          <p className="max-w-2xl text-base text-primary-foreground/80 sm:text-lg">
            Durable, accurately measured and carefully finished aluminium
            products for homes and projects across Nigeria.
          </p>
        </div>
        <div className="h-1 w-full bg-accent" />
      </section>

      {/* Product Categories Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-10">
          <p className="font-heading mb-2 text-xs font-bold uppercase tracking-widest text-accent">
            Product Range
          </p>
          <h2 className="font-heading mb-3 text-2xl font-bold uppercase sm:text-3xl lg:text-4xl">
            Our Main Product Groups
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            Choose from trusted roofing sheets, stone-coated tiles, and a full
            range of accessories to complete your roof.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Aluminium Roofing Sheets */}
          <div className="group relative overflow-hidden rounded-sm border border-border bg-card transition-all hover:shadow-lg">
            <div className="relative aspect-4/3 overflow-hidden bg-muted">
              <Image
                src="/images/flatsheet.jpg"
                alt="Coloured aluminium flat sheets from Gods Promise Aluminium ready for installation"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                priority
              />
            </div>
            <div className="p-5">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="font-heading text-xl font-bold uppercase sm:text-2xl">
                  Aluminium Roofing Sheets
                </h3>
                <Badge
                  variant="outline"
                  className="shrink-0 rounded-sm text-xs"
                >
                  Most popular
                </Badge>
              </div>
              <p className="mb-4 text-sm text-muted-foreground sm:text-base">
                Long-lasting, lightweight sheets available in different
                profiles, thicknesses and colours.
              </p>
              <div className="mb-4 space-y-2">
                <p className="text-sm font-semibold">Corrugation types:</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge variant="secondary" className="rounded-sm">
                    Long span
                  </Badge>
                  <Badge variant="secondary" className="rounded-sm">
                    Steptiles
                  </Badge>
                  <Badge variant="secondary" className="rounded-sm">
                    Metcoppo
                  </Badge>
                  <Badge variant="secondary" className="rounded-sm">
                    Normal
                  </Badge>
                </div>
              </div>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground marker:text-accent">
                <li>All thicknesses available</li>
                <li>Multiple standard colours</li>
                <li>Accurate measurement and cutting</li>
                <li>Suitable for residential and project work</li>
              </ul>
            </div>
          </div>

          {/* Stone-Coated Roofing Tiles */}
          <div className="group relative overflow-hidden rounded-sm border border-border bg-card transition-all hover:shadow-lg">
            <div className="relative aspect-4/3 overflow-hidden bg-muted">
              <Image
                src="/images/stonetiles.jpg"
                alt="Stone-coated roofing tiles from Gods Promise Aluminium"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                priority
              />
            </div>
            <div className="p-5">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="font-heading text-xl font-bold uppercase sm:text-2xl">
                  Stone-Coated Tiles
                </h3>
                <Badge
                  variant="outline"
                  className="shrink-0 rounded-sm text-xs"
                >
                  Premium look
                </Badge>
              </div>
              <p className="mb-4 text-sm text-muted-foreground sm:text-base">
                Elegant roofing with natural stone finish, available in multiple
                profiles and colours.
              </p>
              <div className="mb-4 space-y-2">
                <p className="text-sm font-semibold">Popular profiles:</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge variant="secondary" className="rounded-sm">
                    Bond
                  </Badge>
                  <Badge variant="secondary" className="rounded-sm">
                    Classic
                  </Badge>
                  <Badge variant="secondary" className="rounded-sm">
                    Milano
                  </Badge>
                  <Badge variant="secondary" className="rounded-sm">
                    Shingle
                  </Badge>
                </div>
              </div>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground marker:text-accent">
                <li>Quiet and comfortable in rain</li>
                <li>Good heat and sound control</li>
                <li>Strong against wind and harsh weather</li>
                <li>Adds value and beauty to your building</li>
              </ul>
              <Link
                href="/products/stone-coated"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-accent/80"
              >
                View details <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Roofing Accessories */}
          <div className="group relative overflow-hidden rounded-sm border border-border bg-card transition-all hover:shadow-lg">
            <div className="relative aspect-4/3 overflow-hidden bg-muted">
              <Image
                src="/images/pnail.jpg"
                alt="Roofing accessories from Gods Promise Aluminium"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                priority
              />
            </div>
            <div className="p-5">
              <h3 className="font-heading mb-2 text-xl font-bold uppercase sm:text-2xl">
                Roofing Accessories
              </h3>
              <p className="mb-4 text-sm text-muted-foreground sm:text-base">
                Everything you need to finish and protect your roof properly.
              </p>
              <div className="mb-4 space-y-2">
                <p className="text-sm font-semibold">
                  Available items include:
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge variant="secondary" className="rounded-sm">
                    Drive screws
                  </Badge>
                  <Badge variant="secondary" className="rounded-sm">
                    Seam bolts
                  </Badge>
                  <Badge variant="secondary" className="rounded-sm">
                    Nails &amp; washers
                  </Badge>
                  <Badge variant="secondary" className="rounded-sm">
                    Felt
                  </Badge>
                  <Badge variant="secondary" className="rounded-sm">
                    Silicone
                  </Badge>
                  <Badge variant="secondary" className="rounded-sm">
                    Flash band
                  </Badge>
                </div>
              </div>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground marker:text-accent">
                <li>Corrosion-resistant materials</li>
                <li>Selected to match our roofing sheets</li>
                <li>Helps prevent leaks and future problems</li>
                <li>Available in project quantities</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ProductColors />

      {/* Why Buy From Us Section */}
      <section className="bg-primary py-12 text-primary-foreground sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-heading mb-2 text-xs font-bold uppercase tracking-widest text-accent">
              Why Choose Us
            </p>
            <h2 className="font-heading mb-3 text-balance text-2xl font-bold uppercase sm:text-3xl lg:text-4xl">
              Why Buy From Gods Promise Aluminium?
            </h2>
            <p className="mb-8 text-pretty text-sm text-primary-foreground/80 sm:mb-10 sm:text-base">
              Many people buy from open markets and later discover mistakes in
              thickness, colour or measurement. We focus on accurate, supervised
              supply so you can relax.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-sm border border-primary-foreground/10 bg-primary-foreground/5 p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-accent">
                <Ruler className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-heading mb-2 text-lg font-bold uppercase sm:text-xl">
                Accurate Measurements
              </h3>
              <p className="text-sm text-primary-foreground/75">
                All thicknesses and lengths are carefully measured and cut so
                you get what you paid for.
              </p>
            </div>

            <div className="rounded-sm border border-primary-foreground/10 bg-primary-foreground/5 p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-accent">
                <Shield className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-heading mb-2 text-lg font-bold uppercase sm:text-xl">
                Trusted Quality
              </h3>
              <p className="text-sm text-primary-foreground/75">
                We use reliable materials and supervise production so your roof
                remains strong and neat for years.
              </p>
            </div>

            <div className="rounded-sm border border-primary-foreground/10 bg-primary-foreground/5 p-6 text-center sm:col-span-2 lg:col-span-1">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-accent">
                <CheckCircle2 className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-heading mb-2 text-lg font-bold uppercase sm:text-xl">
                Support Before &amp; After
              </h3>
              <p className="text-sm text-primary-foreground/75">
                We help you choose profiles, estimate quantities and support
                your roofer with any questions.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-4xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 sm:mt-12 sm:p-8">
            <div className="grid gap-6 text-center sm:grid-cols-3">
              <div>
                <div className="font-heading mb-2 text-3xl font-bold text-accent sm:text-4xl">
                  15+
                </div>
                <div className="text-xs text-primary-foreground/70 sm:text-sm">
                  Years serving customers
                </div>
              </div>
              <div>
                <div className="font-heading mb-2 text-3xl font-bold text-accent sm:text-4xl">
                  1000+
                </div>
                <div className="text-xs text-primary-foreground/70 sm:text-sm">
                  Roofs and projects supplied
                </div>
              </div>
              <div>
                <div className="font-heading mb-2 text-3xl font-bold text-accent sm:text-4xl">
                  100%
                </div>
                <div className="text-xs text-primary-foreground/70 sm:text-sm">
                  Focus on customer satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 h-1 w-full bg-accent" />
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="border border-border bg-secondary p-8 text-center sm:p-12">
          <p className="font-heading mb-2 text-xs font-bold uppercase tracking-widest text-accent">
            Get a Quote
          </p>
          <h2 className="font-heading mb-3 text-balance text-2xl font-bold uppercase sm:text-3xl lg:text-4xl">
            Ready to Get a Product Quote?
          </h2>
          <p className="mb-6 text-pretty text-sm text-muted-foreground sm:mb-8 sm:text-base lg:text-lg">
            Share your building type, preferred profile and estimated roof size.
            Our team will respond with options and pricing.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button
              size="lg"
              className="w-full gap-2 rounded-sm bg-accent font-heading font-bold uppercase tracking-wide hover:bg-accent/90 sm:w-auto"
              asChild
            >
              <Link href="/contact">
                <Mail className="h-4 w-4" />
                Request a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full gap-2 rounded-sm font-heading font-bold uppercase tracking-wide sm:w-auto"
              asChild
            >
              <a href="tel:09150459964">
                <Phone className="h-4 w-4" />
                Call Us Now
              </a>
            </Button>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground sm:mt-8 sm:flex-row sm:gap-6">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <a
                href="https://wa.me/2349150459964"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="underline-offset-4 hover:text-foreground hover:underline"
              >
                WhatsApp support (+234 915 045 9964)
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Phone lines as listed on the contact page</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
