import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { RoofCalculator } from "@/components/roof-calculator/roof-calculator";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/roof-calculator" },
  title: "Roof Sheet Calculator | Gods Promise Aluminium",
  description:
    "Estimate how many aluminium roofing sheets, ridges, gutters and accessories your roof needs — with live pricing from our current price list.",
};

export default async function RoofCalculatorPage() {
  const products = await prisma.product.findMany({
    where: { category: "SHEETS", published: true },
    include: { variants: { orderBy: { sortOrder: "asc" } } },
    orderBy: { sortOrder: "asc" },
  });

  const sheetProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    unit: p.unit,
    variants: p.variants.map((v) => ({
      id: v.id,
      label: v.label,
      priceKobo: v.priceKobo,
      inStock: v.inStock,
    })),
  }));

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="mb-3 font-heading text-xs font-bold uppercase tracking-widest text-accent">
            Free Tool
          </p>
          <h1 className="mb-4 text-balance font-heading text-4xl font-bold uppercase sm:text-5xl lg:text-6xl">
            Roof Sheet Calculator
          </h1>
          <p className="max-w-2xl text-base text-primary-foreground/80 sm:text-lg">
            Estimate sheets, ridges, gutters and cost in six steps — using our current, live price
            list. Treat the result as a solid working estimate; confirm exact cuts on site before
            ordering.
          </p>
        </div>
        <div className="h-1 w-full bg-accent" />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <RoofCalculator products={sheetProducts} />
      </section>
    </div>
  );
}
