import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Price List 2026 | Gods Promise Aluminium",
  description:
    "Official 2026 price list for aluminium roofing sheets (Long Span, Step Tiles, Metcopo) and Gerard Stone Coated Tiles from Gods Promise Aluminium Concept Limited in Lagos, Nigeria.",
};

const longSpanPrices = [
  { gauge: "0.40MM", price: "₦4,300" },
  { gauge: "0.45MM", price: "₦5,350" },
  { gauge: "0.45MMB", price: null, note: "Out of stock" },
  { gauge: "0.50MM", price: "₦5,650" },
  { gauge: "0.50MMB", price: "₦5,550" },
  { gauge: "0.52MM", price: "₦6,000" },
  { gauge: "0.55MMA", price: "₦6,750" },
  { gauge: "0.55MMB", price: "₦6,300" },
  { gauge: "0.58MM", price: "₦8,130" },
  { gauge: "0.60MM", price: "₦9,400" },
  { gauge: "0.70MM", price: "₦14,100" },
];

const stepTilesPrices = [
  { gauge: "0.45MM", price: "₦5,600" },
  { gauge: "0.50MM", price: "₦6,000" },
  { gauge: "0.55MMA", price: "₦6,960" },
  { gauge: "0.55MMB", price: "₦6,730" },
  { gauge: "0.58MM", price: "₦8,000" },
  { gauge: "0.60MM", price: "₦9,680" },
];

const stoneTilesPrices = [
  { type: "Shingle Tiles", price: "₦4,750" },
  { type: "Bond Tiles", price: "₦4,750" },
  { type: "Classic Tiles", price: "₦4,750" },
  { type: "Milano Tiles", price: "₦4,750" },
  { type: "Roman Tiles", price: null, note: "Contact us for price" },
];

// Caliper-verified (standard gauge) prices
const caliperLongSpanPrices = [
  { gauge: "0.40MM", price: "₦8,700" },
  { gauge: "0.45MM", price: "₦9,800" },
  { gauge: "0.50MM", price: "₦12,500" },
  { gauge: "0.55MM", price: "₦14,200" },
  { gauge: "0.60MM", price: "₦16,000" },
  { gauge: "0.70MM", price: "₦17,800" },
  { gauge: "0.80MM", price: "₦19,700" },
  { gauge: "1.00MM", price: "₦25,400" },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="h-1 w-full bg-accent" />
        <div className="container px-4 mx-auto max-w-4xl py-16 md:py-20">
          <p className="text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3">
            Updated 29 January 2026
          </p>
          <h1 className="font-heading uppercase font-bold text-4xl md:text-5xl lg:text-6xl text-balance mb-4">
            Official Price List 2026
          </h1>
          <p className="text-primary-foreground/80 text-base md:text-lg max-w-2xl">
            All prices are per square metre (sqm). Prices are subject to change
            with market conditions — contact us via WhatsApp for the latest
            confirmed rates before ordering.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto max-w-4xl space-y-10">
          {/* Intro text */}
          <div className="grid gap-4 md:grid-cols-2 text-sm text-muted-foreground">
            <p>
              Gods Promise Aluminium supplies aluminium roofing sheets, step
              tiles and stone-coated tiles at competitive factory prices. The
              tables below show our current rates per square metre for each
              product category and gauge thickness. Standard colours — wine,
              blue, green, grey and brown — are included at the listed price
              with no extra charge.
            </p>
            <p>
              We offer two pricing tiers: our regular product line and a
              caliper-verified standard range where gauge thickness is confirmed
              by physical caliper measurement before dispatch. The
              caliper-verified option is ideal for customers who require
              certified accuracy for government projects, estate developments or
              any build where precise specifications must be documented.
            </p>
          </div>

          {/* Long Span & Metral */}
          <div className="rounded-sm border border-border bg-card overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-heading uppercase font-bold text-lg">
                  Long Span &amp; Metral
                </h2>
                <span className="text-xs font-heading font-bold uppercase tracking-widest text-accent">
                  Metcopo design +₦250
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Price per sqm · All standard colours included
              </p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Gauge</TableHead>
                  <TableHead className="text-right pr-6">Price / sqm</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {longSpanPrices.map((row) => (
                  <TableRow key={row.gauge}>
                    <TableCell className="pl-6 font-medium">
                      {row.gauge}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      {row.price ? (
                        <span className="font-semibold">{row.price}</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {row.note}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Step Tiles */}
          <div className="rounded-sm border border-border bg-card overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="font-heading uppercase font-bold text-lg">
                Step Tiles
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Price per sqm · All standard colours included
              </p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Gauge</TableHead>
                  <TableHead className="text-right pr-6">Price / sqm</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stepTilesPrices.map((row) => (
                  <TableRow key={row.gauge}>
                    <TableCell className="pl-6 font-medium">
                      {row.gauge}
                    </TableCell>
                    <TableCell className="text-right pr-6 font-semibold">
                      {row.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Gerard Stone Coated Tiles */}
          <div className="rounded-sm border border-border bg-card overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-heading uppercase font-bold text-lg">
                  Gerard Stone Coated Tiles
                </h2>
                <span className="text-xs text-muted-foreground">
                  Imported · New Zealand
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Price per sqm
              </p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Type</TableHead>
                  <TableHead className="text-right pr-6">Price / sqm</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stoneTilesPrices.map((row) => (
                  <TableRow key={row.type}>
                    <TableCell className="pl-6 font-medium">
                      {row.type}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      {row.price ? (
                        <span className="font-semibold">{row.price}</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {row.note}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* Caliper Standard Prices */}
      <section className="py-12 md:py-16 border-t-4 border-accent">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center rounded-sm bg-accent px-3 py-1 font-heading text-xs font-bold uppercase tracking-widest text-accent-foreground">
                Caliper Verified
              </span>
            </div>
            <h2 className="font-heading uppercase font-bold text-3xl md:text-4xl leading-none tracking-tight mb-2">
              Caliper Standard Prices
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl">
              These prices are for aluminium roofing sheets with gauge thickness
              confirmed by caliper measurement. What you order is exactly what
              you get.
            </p>
          </div>
          <div className="space-y-10">
            {/* Caliper Long Span */}
            <div className="rounded-sm border border-accent/40 bg-card overflow-hidden">
              <div className="px-6 py-4 border-b border-accent/30 bg-accent/5">
                <h3 className="font-heading uppercase font-bold text-lg">
                  Long Span
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Price per sqm · Caliper-verified gauge
                </p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Gauge</TableHead>
                    <TableHead className="text-right pr-6">
                      Price / sqm
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {caliperLongSpanPrices.map((row) => (
                    <TableRow key={row.gauge}>
                      <TableCell className="pl-6 font-medium">
                        {row.gauge}
                      </TableCell>
                      <TableCell className="text-right pr-6 font-semibold">
                        {row.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {/* Caliper Stone Tiles */}
            <div className="rounded-sm border border-accent/40 bg-card overflow-hidden">
              <div className="px-6 py-4 border-b border-accent/30 bg-accent/5">
                <h3 className="font-heading uppercase font-bold text-lg">
                  Stone Tiles
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  All designs · Caliper-verified
                </p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Design</TableHead>
                    <TableHead className="text-right pr-6">
                      Price / sqm
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="pl-6 font-medium">
                      All Designs
                    </TableCell>
                    <TableCell className="text-right pr-6 font-semibold">
                      ₦5,500
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </section>

      {/* Notes + CTA */}
      <section className="bg-secondary py-10">
        <div className="container px-4 mx-auto max-w-4xl">
          <h3 className="font-heading uppercase font-bold text-lg mb-3">
            Important Notes
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5 mb-6">
            <li>All prices are per square metre (sqm).</li>
            <li>Metcopo design attracts an additional ₦250 per sqm.</li>
            <li>
              Prices are subject to change with market conditions. Always
              confirm the current price via WhatsApp before finalising your
              order.
            </li>
            <li>
              Delivery charges are calculated separately based on your project
              location.
            </li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="rounded-sm bg-accent font-heading font-bold uppercase tracking-wide hover:bg-accent/90"
            >
              <a
                href="https://wa.me/2349150459964"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Confirm Price on WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-sm">
              <Link href="/contact">Request a Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
