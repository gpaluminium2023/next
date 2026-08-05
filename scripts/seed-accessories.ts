/**
 * Seed the roofing accessories catalogue from the supplier price list
 * (public/new-materials/accessories-price-list-source.png) and the product
 * artwork in public/new-materials/.
 *
 * Run with: pnpm seed:accessories
 *
 * Idempotent — skips any product whose slug already exists, so admin edits
 * made via /admin/products are never overwritten by a re-run.
 *
 * Unlike the placeholder accessories in seed-store.ts, every product here has
 * a confirmed price from the supplier, so these are seeded published: true and
 * go live on the store as soon as this script is run.
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

const products: SeedProduct[] = [
  {
    name: "Land Gum Roofing Sealant",
    slug: "land-gum-roofing-sealant",
    description:
      "Premium weather-resistant roofing sealant made for Gerard stone-coated roofing sheets. Bonds strongly, stays flexible to prevent cracking and peeling, and resists rain, sun and extreme heat for a long-lasting leak-free seal. Available in big and small bottles.",
    category: "ACCESSORIES",
    unit: "piece",
    basePriceKobo: null,
    published: true,
    featured: false,
    sortOrder: 20,
    images: [
      {
        url: "/new-materials/land-gum-roofing-sealant.png",
        publicId: "",
        alt: "Land Gum premium roofing sealant for Gerard roofing sheets, big and small bottles",
      },
      {
        url: "/new-materials/land-gum-roofing-sealant-alt.png",
        publicId: "",
        alt: "Land Gum roofing sealant shown against green Gerard roofing sheets",
      },
    ],
    variants: [
      { label: "Big", priceKobo: nairaToKobo("₦6,500"), inStock: true, sortOrder: 1 },
      { label: "Small", priceKobo: nairaToKobo("₦5,000"), inStock: true, sortOrder: 2 },
    ],
  },
  {
    name: "ABRO Shur-Fix Roof Cement",
    slug: "abro-shur-fix-roof-cement",
    description:
      "Genuine ABRO Shur-Fix roof cement (3.6 qts / 3.4L, Part No. RC-102) — a premium brush-on roof repair compound. Forms a strong waterproof seal that resists cracking and shrinking, ideal for roofs, gutters, flashings and chimneys.",
    category: "ACCESSORIES",
    unit: "piece",
    basePriceKobo: nairaToKobo("₦28,000"),
    published: true,
    featured: false,
    sortOrder: 21,
    images: [
      {
        url: "/new-materials/abro-shur-fix-roof-cement.png",
        publicId: "",
        alt: "ABRO Shur-Fix roof cement 3.4L tin for roof repair and maintenance",
      },
    ],
    variants: [],
  },
  {
    name: "ABRO 1800 RTV Silicone Sealant",
    slug: "abro-1800-silicone-sealant",
    description:
      "High-performance ABRO 1800 RTV silicone sealant in black (10.3 fl. oz. / 300ml, Part No. SS-1800-BLK). Forms a durable waterproof seal that withstands extreme temperatures and UV, and stays flexible without cracking. Use on roofing sheet ridges and overlaps, cladding edges, window and door frames, gutters and pipes.",
    category: "ACCESSORIES",
    unit: "piece",
    basePriceKobo: nairaToKobo("₦4,500"),
    published: true,
    featured: false,
    sortOrder: 22,
    images: [
      {
        url: "/new-materials/abro-1800-rtv-silicone-sealant.png",
        publicId: "",
        alt: "ABRO 1800 RTV silicone sealant black 300ml cartridge",
      },
    ],
    variants: [],
  },
  {
    name: "Gerard Nail",
    slug: "gerard-nail",
    description:
      "High carbon steel nails made for installing Gerard stone-coated roofing sheets. Black coated for rust resistance, with a flat head and ring/spiral shank for a secure hold that resists wind uplift. 2\" (50mm), approximately 1kg per carton.",
    category: "ACCESSORIES",
    unit: "pack",
    basePriceKobo: nairaToKobo("₦11,000"),
    published: true,
    featured: false,
    sortOrder: 23,
    images: [
      {
        url: "/new-materials/gerard-nail.png",
        publicId: "",
        alt: "Gerard nails — black coated 2 inch ring shank nails for Gerard stone-coated roofing sheets",
      },
    ],
    variants: [],
  },
  {
    name: "Carton Nail — Aluminium Roofing",
    slug: "carton-nail-aluminium-roofing",
    description:
      "Zinc-plated high carbon steel nails designed for aluminium roofing sheets. Wide flat head and twisted shank give strong pull-out resistance and a leak-proof fix to wood or steel purlins. 2\" (50mm), approximately 1kg per carton.",
    category: "ACCESSORIES",
    unit: "pack",
    basePriceKobo: nairaToKobo("₦3,200"),
    published: true,
    featured: false,
    sortOrder: 24,
    images: [
      {
        url: "/new-materials/carton-nail-aluminium-roofing.png",
        publicId: "",
        alt: "Carton nails — zinc plated twisted shank 2 inch nails for aluminium roofing sheets",
      },
    ],
    variants: [],
  },
  {
    name: "Counting Nail",
    slug: "counting-nail",
    description:
      "Zinc-plated high carbon steel nails packed in counted quantities — 100 pieces per pack — so you know exactly what you are buying. 2\" (50mm) with a flat head and twisted shank. Suitable for roofing work, wood framing, plywood fixing and wood packing.",
    category: "ACCESSORIES",
    unit: "pack",
    basePriceKobo: nairaToKobo("₦2,800"),
    published: true,
    featured: false,
    sortOrder: 25,
    images: [
      {
        url: "/new-materials/counting-nail.png",
        publicId: "",
        alt: "Counting nails — 2 inch zinc plated twisted shank nails, 100 pieces per pack",
      },
    ],
    variants: [],
  },
  {
    name: "Sim Bolt",
    slug: "sim-bolt",
    description:
      "High quality zinc-plated self-tapping bolts for durable, secure fastening without pre-drilling. Corrosion resistant and built for roofing sheets, cladding sheets, metal framing and general construction fixing.",
    category: "ACCESSORIES",
    unit: "pack",
    basePriceKobo: nairaToKobo("₦2,500"),
    published: true,
    featured: false,
    sortOrder: 26,
    images: [
      {
        url: "/new-materials/sim-bolt.png",
        publicId: "",
        alt: "Sim bolts — zinc plated self-tapping bolts for roofing and cladding sheets",
      },
    ],
    variants: [],
  },
  {
    name: '2" Cladding Nail',
    slug: "2-inch-cladding-nail",
    description:
      "Premium steel nails, 2 inches long, made for securely fastening cladding sheets. Anti-rust coating for long-lasting performance and a firm, reliable grip on cladding materials.",
    category: "ACCESSORIES",
    unit: "pack",
    basePriceKobo: nairaToKobo("₦1,200"),
    published: true,
    featured: false,
    sortOrder: 27,
    images: [
      {
        url: "/new-materials/2-inch-nail-cladding.png",
        publicId: "",
        alt: "2 inch nails for cladding sheets in a clear pack",
      },
    ],
    variants: [],
  },
  {
    name: '1" Nail',
    slug: "1-inch-nail",
    description:
      "High quality 1 inch (25mm) zinc-plated nails for small jobs and finishing work — woodwork, picture frames, cabinet making, trim and molding, and DIY projects. Smooth shank with a sharp point, approximately 500 pieces per bag.",
    category: "ACCESSORIES",
    unit: "pack",
    basePriceKobo: nairaToKobo("₦1,200"),
    published: true,
    featured: false,
    sortOrder: 28,
    images: [
      {
        url: "/new-materials/1-inch-nail.png",
        publicId: "",
        alt: "1 inch zinc plated nails in clear bags, approximately 500 pieces per bag",
      },
    ],
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

    // Nested `variants: { create: [...] }` and `createMany` both open an
    // implicit transaction, which the Neon HTTP adapter (lib/prisma.ts)
    // rejects. Single-row creates in a loop instead — same as seed-store.ts.
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
