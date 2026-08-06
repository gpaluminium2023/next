/**
 * Seed the Lagos and Enugu branches, and the Enugu branch's own price list
 * as issued by the branch on 19 April 2026 (transcribed in enuguPrices below).
 *
 * Run with: pnpm seed:branches
 *
 * Idempotent — branches are upserted by slug and prices by (branch, variant),
 * so a re-run refreshes prices without touching anything else.
 *
 * Lagos is the default branch: it is priced straight off the existing
 * ProductVariant.priceKobo column and therefore has no rows here. Enugu is
 * override-only — it sells exactly the variants listed below and nothing else.
 *
 * Where the Enugu list names a gauge the shared catalogue has no variant for,
 * the variant is created out-of-stock at ₦0 so Lagos keeps hiding it (the same
 * convention seed-store.ts uses for 0.45MMB) while Enugu can price it.
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

function naira(amount: number): number {
  return Math.round(amount * 100);
}

const PHONE_E164 = "+2349150459964";
const WHATSAPP_URL = "https://wa.me/2349150459964";

const branches = [
  {
    slug: "lagos",
    name: "Lagos Factory",
    shortName: "Lagos",
    isDefault: true,
    sortOrder: 1,
    addressLine: "Pleasure Bus Stop, Alimosho",
    locality: "Alimosho",
    region: "Lagos",
    phoneE164: PHONE_E164,
    whatsappUrl: WHATSAPP_URL,
    priceListDate: new Date("2026-01-29"),
    note: null as string | null,
  },
  {
    slug: "enugu",
    name: "Enugu State Branch",
    shortName: "Enugu",
    isDefault: false,
    sortOrder: 2,
    // The branch price list gives no street number or landmark beyond this.
    addressLine: "Enugu–PH Expressway",
    locality: "Enugu",
    region: "Enugu",
    phoneE164: PHONE_E164,
    whatsappUrl: WHATSAPP_URL,
    priceListDate: new Date("2026-04-19"),
    note: "Collection and local delivery from our Enugu–PH Expressway branch.",
  },
];

interface BranchVariantSeed {
  productSlug: string;
  /** Variant label in the shared catalogue this price attaches to. */
  variantLabel: string;
  priceKobo: number;
  /** Create the variant (out of stock, ₦0) if the catalogue lacks it. */
  createIfMissing?: boolean;
  /** Explains any non-obvious mapping from the paper list to a variant. */
  mappingNote?: string;
}

// ── Enugu price list, 19 April 2026 ───────────────────────────────────────
// Long-span:      0.40 ₦6,170 · 0.45 ₦7,170 · 0.50 ₦9,199 · 0.55 ₦10,400
// Step tile /
//   Metcoppo:     0.40 ₦6,730 · 0.45 ₦7,690 · 0.50 ₦9,670 · 0.55 ₦11,020
// Stone-coated:   Thick Quality ₦6,950 · Light Quality ₦5,750
//                 (designs: Bond / Classic / Shingle / Milano)
const enuguPrices: BranchVariantSeed[] = [
  // Long span
  { productSlug: "long-span-roofing-sheet", variantLabel: "0.40MM", priceKobo: naira(6_170) },
  { productSlug: "long-span-roofing-sheet", variantLabel: "0.45MM", priceKobo: naira(7_170) },
  { productSlug: "long-span-roofing-sheet", variantLabel: "0.50MM", priceKobo: naira(9_199) },
  {
    productSlug: "long-span-roofing-sheet",
    variantLabel: "0.55MMA",
    priceKobo: naira(10_400),
    // The Enugu list has a single "0.55MM" line; Lagos splits 0.55 into A and
    // B grades. Mapped to the A grade — confirm with the branch.
    mappingNote: 'Enugu "0.55MM" mapped to the 0.55MMA grade',
  },

  // Step tiles — the Enugu list prices step tile and Metcoppo design together
  { productSlug: "step-tiles-roofing-sheet", variantLabel: "0.40MM", priceKobo: naira(6_730), createIfMissing: true },
  { productSlug: "step-tiles-roofing-sheet", variantLabel: "0.45MM", priceKobo: naira(7_690) },
  { productSlug: "step-tiles-roofing-sheet", variantLabel: "0.50MM", priceKobo: naira(9_670) },
  {
    productSlug: "step-tiles-roofing-sheet",
    variantLabel: "0.55MMA",
    priceKobo: naira(11_020),
    mappingNote: 'Enugu "0.55MM" mapped to the 0.55MMA grade',
  },

  // Metcopo — same prices as step tiles per the Enugu list
  { productSlug: "metcopo-roofing-sheet", variantLabel: "0.40MM", priceKobo: naira(6_730) },
  { productSlug: "metcopo-roofing-sheet", variantLabel: "0.45MM", priceKobo: naira(7_690) },
  { productSlug: "metcopo-roofing-sheet", variantLabel: "0.50MM", priceKobo: naira(9_670) },
  {
    productSlug: "metcopo-roofing-sheet",
    variantLabel: "0.55MMA",
    priceKobo: naira(11_020),
    mappingNote: 'Enugu "0.55MM" mapped to the 0.55MMA grade',
  },

  // Stone-coated. The Enugu list prices by sheet quality rather than by tile
  // design (Lagos prices every design at one rate), so these two variants are
  // created on the shared product and left out of stock at Lagos.
  {
    productSlug: "gerard-stone-coated-tiles",
    variantLabel: "Thick Quality",
    priceKobo: naira(6_950),
    createIfMissing: true,
    mappingNote: "Enugu prices stone-coated by quality, not design",
  },
  {
    productSlug: "gerard-stone-coated-tiles",
    variantLabel: "Light Quality",
    priceKobo: naira(5_750),
    createIfMissing: true,
    mappingNote: "Enugu prices stone-coated by quality, not design",
  },
];

async function main() {
  // ── Branches ────────────────────────────────────────────────────────────
  const branchIdBySlug = new Map<string, string>();

  for (const b of branches) {
    const row = await prisma.branch.upsert({
      where: { slug: b.slug },
      create: b,
      // Address/phone/price-list metadata is safe to refresh; published is not
      // touched so an admin can hide a branch without the seed re-showing it.
      update: {
        name: b.name,
        shortName: b.shortName,
        isDefault: b.isDefault,
        sortOrder: b.sortOrder,
        addressLine: b.addressLine,
        locality: b.locality,
        region: b.region,
        phoneE164: b.phoneE164,
        whatsappUrl: b.whatsappUrl,
        priceListDate: b.priceListDate,
        note: b.note,
      },
    });
    branchIdBySlug.set(b.slug, row.id);
    console.log(`✓ branch ${row.slug} — ${row.name}${row.isDefault ? " (default)" : ""}`);
  }

  const enuguId = branchIdBySlug.get("enugu")!;

  // ── Enugu prices ────────────────────────────────────────────────────────
  const missingProducts: string[] = [];
  const createdVariants: string[] = [];
  const notes: string[] = [];
  let priced = 0;

  for (const entry of enuguPrices) {
    const product = await prisma.product.findUnique({
      where: { slug: entry.productSlug },
      include: { variants: true },
    });

    if (!product) {
      missingProducts.push(`${entry.productSlug} (${entry.variantLabel})`);
      continue;
    }

    let variant = product.variants.find((v) => v.label === entry.variantLabel);

    if (!variant) {
      if (!entry.createIfMissing) {
        missingProducts.push(`${entry.productSlug} → variant "${entry.variantLabel}"`);
        continue;
      }
      variant = await prisma.productVariant.create({
        data: {
          productId: product.id,
          label: entry.variantLabel,
          priceKobo: 0, // no Lagos price — Lagos shows it as out of stock
          inStock: false,
          sortOrder: product.variants.length + 1,
        },
      });
      createdVariants.push(`${entry.productSlug} → "${entry.variantLabel}"`);
    }

    await prisma.branchVariantPrice.upsert({
      where: { branchId_variantId: { branchId: enuguId, variantId: variant.id } },
      create: {
        branchId: enuguId,
        variantId: variant.id,
        productId: product.id,
        priceKobo: entry.priceKobo,
        inStock: true,
      },
      update: { priceKobo: entry.priceKobo, productId: product.id },
    });

    priced += 1;
    console.log(
      `  ✓ Enugu ${product.slug} · ${variant.label} — ₦${(entry.priceKobo / 100).toLocaleString("en-NG")}`,
    );
    if (entry.mappingNote) notes.push(`${product.slug} · ${variant.label}: ${entry.mappingNote}`);
  }

  console.log(`\n${priced}/${enuguPrices.length} Enugu prices written.`);

  if (createdVariants.length > 0) {
    console.log("\nVariants created (out of stock at Lagos, priced at Enugu):");
    for (const v of createdVariants) console.log(`  + ${v}`);
  }

  if (notes.length > 0) {
    console.log("\nMappings to confirm with the Enugu branch:");
    for (const n of new Set(notes)) console.log(`  ! ${n}`);
  }

  if (missingProducts.length > 0) {
    console.log("\nNOT PRICED — no matching product/variant in the live catalogue:");
    for (const m of missingProducts) console.log(`  ✗ ${m}`);
    console.log(
      "\nThe live catalogue has drifted from the seed scripts. Check the exact\n" +
        "slugs and variant labels in /admin/products and update this file.",
    );
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => void prisma.$disconnect());
