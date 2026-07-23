/**
 * Seed an initial product catalog from the site's existing hardcoded pricing
 * (app/pricing/page.tsx) and product images (public/images/p*.jpg).
 *
 * Run with: pnpm seed:store
 *
 * Idempotent — safe to re-run; upserts by slug/label so admin edits made in
 * between runs to seeded rows are NOT overwritten (upsert only fills create).
 * Products with no confirmed real price in the source pages are seeded as
 * drafts (published: false) so nothing invented shows up on the live store —
 * this is a real production site selling real materials.
 */
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { PrismaNeonHttp } from "@prisma/adapter-neon";
import { PrismaClient } from "../lib/generated/prisma/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: resolve(__dirname, "../.env") });

const dbUrl = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL / DIRECT_URL not set");
  process.exit(1);
}
const adapter = new PrismaNeonHttp(dbUrl, {});
const prisma = new PrismaClient({ adapter } as never);

function nairaToKobo(price: string): number {
  return Math.round(Number(price.replace(/[₦,]/g, "")) * 100);
}

interface SeedVariant {
  label: string;
  priceKobo: number;
  inStock: boolean;
  sortOrder: number;
}

interface SeedProduct {
  name: string;
  slug: string;
  description: string;
  category: "SHEETS" | "STONE_COATED" | "ACCESSORIES";
  unit: string;
  basePriceKobo: number | null;
  published: boolean;
  featured: boolean;
  sortOrder: number;
  images: { url: string; publicId: string; alt: string }[];
  variants: SeedVariant[];
}

// Prices below are copied from app/pricing/page.tsx (the site's own official
// price list) so the store launches with real, currently-listed prices.
const products: SeedProduct[] = [
  {
    name: "Aluminium Long Span Roofing Sheet",
    slug: "long-span-roofing-sheet",
    description:
      "Durable, lightweight long span aluminium roofing sheets in all standard colours (wine, blue, green, grey, brown). Accurately measured and cut to your required length.",
    category: "SHEETS",
    unit: "sqm",
    basePriceKobo: null,
    published: true,
    featured: true,
    sortOrder: 1,
    images: [{ url: "/images/plongspan.jpg", publicId: "", alt: "Aluminium long span roofing sheets" }],
    variants: [
      { label: "0.40MM", priceKobo: nairaToKobo("₦4,300"), inStock: true, sortOrder: 1 },
      { label: "0.45MM", priceKobo: nairaToKobo("₦5,350"), inStock: true, sortOrder: 2 },
      { label: "0.45MMB", priceKobo: 0, inStock: false, sortOrder: 3 },
      { label: "0.50MM", priceKobo: nairaToKobo("₦5,650"), inStock: true, sortOrder: 4 },
      { label: "0.50MMB", priceKobo: nairaToKobo("₦5,550"), inStock: true, sortOrder: 5 },
      { label: "0.52MM", priceKobo: nairaToKobo("₦6,000"), inStock: true, sortOrder: 6 },
      { label: "0.55MMA", priceKobo: nairaToKobo("₦6,750"), inStock: true, sortOrder: 7 },
      { label: "0.55MMB", priceKobo: nairaToKobo("₦6,300"), inStock: true, sortOrder: 8 },
      { label: "0.58MM", priceKobo: nairaToKobo("₦8,130"), inStock: true, sortOrder: 9 },
      { label: "0.60MM", priceKobo: nairaToKobo("₦9,400"), inStock: true, sortOrder: 10 },
      { label: "0.70MM", priceKobo: nairaToKobo("₦14,100"), inStock: true, sortOrder: 11 },
    ],
  },
  {
    name: "Aluminium Step Tiles Roofing Sheet",
    slug: "step-tiles-roofing-sheet",
    description:
      "Step tile profile aluminium roofing sheets with a realistic tile appearance, available in all standard colours.",
    category: "SHEETS",
    unit: "sqm",
    basePriceKobo: null,
    published: true,
    featured: true,
    sortOrder: 2,
    images: [{ url: "/images/psteptiles.jpg", publicId: "", alt: "Aluminium step tiles roofing sheets" }],
    variants: [
      { label: "0.45MM", priceKobo: nairaToKobo("₦5,600"), inStock: true, sortOrder: 1 },
      { label: "0.50MM", priceKobo: nairaToKobo("₦6,000"), inStock: true, sortOrder: 2 },
      { label: "0.55MMA", priceKobo: nairaToKobo("₦6,960"), inStock: true, sortOrder: 3 },
      { label: "0.55MMB", priceKobo: nairaToKobo("₦6,730"), inStock: true, sortOrder: 4 },
      { label: "0.58MM", priceKobo: nairaToKobo("₦8,000"), inStock: true, sortOrder: 5 },
      { label: "0.60MM", priceKobo: nairaToKobo("₦9,680"), inStock: true, sortOrder: 6 },
    ],
  },
  {
    name: "Metcopo Aluminium Roofing Sheet",
    slug: "metcopo-roofing-sheet",
    description:
      "Metcopo profile aluminium roofing sheets with a bold tile design. Same gauge range as Long Span, at a ₦250/sqm design premium.",
    category: "SHEETS",
    unit: "sqm",
    basePriceKobo: null,
    published: true,
    featured: false,
    sortOrder: 3,
    images: [{ url: "/images/pmetcoppo.jpg", publicId: "", alt: "Metcopo aluminium roofing sheets" }],
    variants: [
      { label: "0.40MM", priceKobo: nairaToKobo("₦4,300") + 25_00, inStock: true, sortOrder: 1 },
      { label: "0.45MM", priceKobo: nairaToKobo("₦5,350") + 25_00, inStock: true, sortOrder: 2 },
      { label: "0.50MM", priceKobo: nairaToKobo("₦5,650") + 25_00, inStock: true, sortOrder: 3 },
      { label: "0.55MMA", priceKobo: nairaToKobo("₦6,750") + 25_00, inStock: true, sortOrder: 4 },
      { label: "0.60MM", priceKobo: nairaToKobo("₦9,400") + 25_00, inStock: true, sortOrder: 5 },
    ],
  },
  {
    name: "Gerard Stone Coated Roofing Tiles",
    slug: "gerard-stone-coated-tiles",
    description:
      "Premium imported stone-coated steel roofing tiles from Gerard (New Zealand). Quiet in rain, strong against wind, and adds lasting value to your building.",
    category: "STONE_COATED",
    unit: "piece",
    basePriceKobo: null,
    published: true,
    featured: true,
    sortOrder: 4,
    images: [
      { url: "/images/pshingle.png", publicId: "", alt: "Gerard stone coated roofing tiles" },
      {
        url: "/core-products/stonetiles.jpg",
        publicId: "",
        alt: "Gerard stone-coated roofing tiles — Shingle, Bond, Classic, Milano and Roman profiles displayed at Gods Promise Aluminium",
      },
      {
        url: "/core-products/stonetiles-green.jpg",
        publicId: "",
        alt: "Green stone-coated roofing tiles showing two profile options side by side",
      },
      {
        url: "/core-products/stonetiles-red-black-warehouse.jpg",
        publicId: "",
        alt: "Red and black stone-coated shingle-profile roofing tile in the Gods Promise Aluminium warehouse",
      },
      {
        url: "/core-products/stonetiles-render-charcoal.png",
        publicId: "",
        alt: "Charcoal grey stone-coated shingle-profile roofing tile",
      },
      {
        url: "/core-products/stonetiles-render-teal-navy.png",
        publicId: "",
        alt: "Teal and navy stone-coated shingle-profile roofing tile colour option",
      },
      {
        url: "/core-products/stonetiles-render-teal-brown.png",
        publicId: "",
        alt: "Teal and brown stone-coated shingle-profile roofing tile colour option",
      },
      {
        url: "/core-products/stonetiles-red-warehouse-stack.png",
        publicId: "",
        alt: "Red Roman-profile stone-coated roofing tiles stacked in the warehouse",
      },
      {
        url: "/core-products/stonetiles-green-outdoor.jpg",
        publicId: "",
        alt: "Green stone-coated roofing tile sample on site",
      },
      {
        url: "/core-products/stonetiles-showroom-1.jpg",
        publicId: "",
        alt: "Gods Promise Aluminium staff member holding a stone-coated roofing tile in the showroom",
      },
      {
        url: "/core-products/stonetiles-showroom-3.jpg",
        publicId: "",
        alt: "Gods Promise Aluminium staff member holding a stone-coated roofing tile in the showroom",
      },
    ],
    variants: [
      { label: "Shingle Tiles", priceKobo: nairaToKobo("₦4,750"), inStock: true, sortOrder: 1 },
      { label: "Bond Tiles", priceKobo: nairaToKobo("₦4,750"), inStock: true, sortOrder: 2 },
      { label: "Classic Tiles", priceKobo: nairaToKobo("₦4,750"), inStock: true, sortOrder: 3 },
      { label: "Milano Tiles", priceKobo: nairaToKobo("₦4,750"), inStock: true, sortOrder: 4 },
    ],
  },
  // Accessories — no confirmed price in the source pages, seeded as drafts.
  // Admin must set a real price and publish before these appear in the store.
  {
    name: "Roofing Drive Screws",
    slug: "roofing-drive-screws",
    description: "Corrosion-resistant drive screws selected to match our roofing sheets.",
    category: "ACCESSORIES",
    unit: "pack",
    basePriceKobo: null,
    published: false,
    featured: false,
    sortOrder: 10,
    images: [{ url: "/images/pdrivescrew.jpg", publicId: "", alt: "Roofing drive screws" }],
    variants: [],
  },
  {
    name: "Roofing Seam Bolts",
    slug: "roofing-seam-bolts",
    description: "Seam bolts for secure sheet-to-sheet joins.",
    category: "ACCESSORIES",
    unit: "pack",
    basePriceKobo: null,
    published: false,
    featured: false,
    sortOrder: 11,
    images: [{ url: "/images/pseambolt.jpg", publicId: "", alt: "Roofing seam bolts" }],
    variants: [],
  },
  {
    name: "Roofing Nails & Washers",
    slug: "roofing-nails-washers",
    description: "Nails and rubber washers for a watertight fix.",
    category: "ACCESSORIES",
    unit: "pack",
    basePriceKobo: null,
    published: false,
    featured: false,
    sortOrder: 12,
    images: [
      { url: "/images/pnail.jpg", publicId: "", alt: "Roofing nails" },
      { url: "/images/pwasher.jpg", publicId: "", alt: "Roofing washers" },
    ],
    variants: [],
  },
  {
    name: "Roofing Felt",
    slug: "roofing-felt",
    description: "Underlay felt for extra insulation and leak protection.",
    category: "ACCESSORIES",
    unit: "pack",
    basePriceKobo: null,
    published: false,
    featured: false,
    sortOrder: 13,
    images: [{ url: "/images/pfelt.png", publicId: "", alt: "Roofing felt" }],
    variants: [],
  },
  {
    name: "Roofing Silicone",
    slug: "roofing-silicone",
    description: "Weatherproof sealant for joins, flashing and screw heads.",
    category: "ACCESSORIES",
    unit: "piece",
    basePriceKobo: null,
    published: false,
    featured: false,
    sortOrder: 14,
    images: [{ url: "/images/psilicone.jpg", publicId: "", alt: "Roofing silicone sealant" }],
    variants: [],
  },
  {
    name: "Flash Band",
    slug: "flash-band",
    description: "Self-adhesive flashing band for edges, valleys and joints.",
    category: "ACCESSORIES",
    unit: "pack",
    basePriceKobo: null,
    published: false,
    featured: false,
    sortOrder: 15,
    images: [{ url: "/images/pflashband.jpg", publicId: "", alt: "Flash band" }],
    variants: [],
  },
];

async function main() {
  for (const p of products) {
    const existing = await prisma.product.findUnique({ where: { slug: p.slug } });
    if (existing) {
      console.log(`= ${p.slug} already exists — skipping (edit via /admin/products instead)`);
      continue;
    }

    // Neither a nested `variants: { create: [...] }` nor `createMany` works
    // here — both start an implicit transaction, which the Neon HTTP adapter
    // (lib/prisma.ts) rejects ("Transactions are not supported in HTTP
    // mode"). Plain single-row `create` calls work fine, so variants are
    // inserted one at a time in a loop.
    const created = await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        category: p.category,
        unit: p.unit,
        basePriceKobo: p.basePriceKobo,
        published: p.published,
        featured: p.featured,
        sortOrder: p.sortOrder,
        images: p.images,
      },
    });
    for (const v of p.variants) {
      await prisma.productVariant.create({ data: { ...v, productId: created.id } });
    }
    console.log(`✓ created ${p.slug} (${p.variants.length} variant(s), published: ${p.published})`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
