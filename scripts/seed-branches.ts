/**
 * Seed the Lagos, Enugu and Imo branches and their price lists.
 *
 * Run with: pnpm seed:branches
 *
 * Idempotent — branches are upserted by slug and prices by (branch, variant),
 * so a re-run refreshes prices without touching anything else.
 *
 * **Every branch sells the full catalogue.** Only long span and step tiles are
 * repriced per branch; Metcopo, stone-coated and accessories get no rows here
 * and use the national catalogue price everywhere. Any gauge a branch's list
 * doesn't mention also falls back to the national price. Lagos is the default
 * branch and has no rows at all.
 *
 * ⚠ That fallback can invert a branch's own ladder — Enugu prices 0.55 at
 * ₦10,400 while the national 0.60 is ₦9,400, so at Enugu the thicker sheet
 * currently lists cheaper. The fix is to fill the missing gauges in
 * /admin/branches/<slug>, not to change the rule. Run this script to see the
 * full list of inversions it reports at the end.
 *
 * Where a list names a gauge the shared catalogue has no variant for (Imo's
 * 0.35mm, Enugu's 0.40mm step tile), the variant is created at ₦0 so it stays
 * hidden everywhere except the branch that priced it — the same convention
 * seed-store.ts uses for 0.45MMB.
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
  {
    slug: "imo",
    name: "Imo State Branch",
    shortName: "Imo",
    isDefault: false,
    sortOrder: 3,
    // TODO: the Imo price list carries no street address — fill this in once
    // the branch supplies one. The UI omits the line while it is blank.
    addressLine: "",
    locality: "Owerri",
    region: "Imo",
    phoneE164: PHONE_E164,
    whatsappUrl: WHATSAPP_URL,
    // The Imo list is undated; it only says prices may change without notice.
    priceListDate: null,
    note: null,
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

// Every branch list has one "0.55MM" line while the catalogue splits 0.55 into
// A and B grades, so all of them map to the A grade. Same note each time.
const GRADE_NOTE = '"0.55MM" mapped to the 0.55MMA grade';

// ── Enugu price list, 19 April 2026 ───────────────────────────────────────
// Long-span:  0.40 ₦6,170 · 0.45 ₦7,170 · 0.50 ₦9,199 · 0.55 ₦10,400
// Step tile:  0.40 ₦6,730 · 0.45 ₦7,690 · 0.50 ₦9,670 · 0.55 ₦11,020
const enuguPrices: BranchVariantSeed[] = [
  { productSlug: "long-span-roofing-sheet", variantLabel: "0.40MM", priceKobo: naira(6_170) },
  { productSlug: "long-span-roofing-sheet", variantLabel: "0.45MM", priceKobo: naira(7_170) },
  { productSlug: "long-span-roofing-sheet", variantLabel: "0.50MM", priceKobo: naira(9_199) },
  {
    productSlug: "long-span-roofing-sheet",
    variantLabel: "0.55MMA",
    priceKobo: naira(10_400),
    mappingNote: GRADE_NOTE,
  },

  { productSlug: "step-tiles-roofing-sheet", variantLabel: "0.40MM", priceKobo: naira(6_730), createIfMissing: true },
  { productSlug: "step-tiles-roofing-sheet", variantLabel: "0.45MM", priceKobo: naira(7_690) },
  { productSlug: "step-tiles-roofing-sheet", variantLabel: "0.50MM", priceKobo: naira(9_670) },
  {
    productSlug: "step-tiles-roofing-sheet",
    variantLabel: "0.55MMA",
    priceKobo: naira(11_020),
    mappingNote: GRADE_NOTE,
  },
];

// ── Imo price list (undated) ──────────────────────────────────────────────
// Long-span:  0.35 ₦5,200 · 0.40 ₦6,200 · 0.45 ₦6,700 · 0.50 ₦7,700 · 0.55 ₦9,000
// Step tile:  0.45 ₦6,950 · 0.50 ₦7,950 · 0.55 ₦9,250
const imoPrices: BranchVariantSeed[] = [
  {
    productSlug: "long-span-roofing-sheet",
    variantLabel: "0.35MM",
    priceKobo: naira(5_200),
    // Thinnest gauge on any list — the catalogue starts at 0.40.
    createIfMissing: true,
  },
  { productSlug: "long-span-roofing-sheet", variantLabel: "0.40MM", priceKobo: naira(6_200) },
  { productSlug: "long-span-roofing-sheet", variantLabel: "0.45MM", priceKobo: naira(6_700) },
  { productSlug: "long-span-roofing-sheet", variantLabel: "0.50MM", priceKobo: naira(7_700) },
  {
    productSlug: "long-span-roofing-sheet",
    variantLabel: "0.55MMA",
    priceKobo: naira(9_000),
    mappingNote: GRADE_NOTE,
  },

  { productSlug: "step-tiles-roofing-sheet", variantLabel: "0.45MM", priceKobo: naira(6_950) },
  { productSlug: "step-tiles-roofing-sheet", variantLabel: "0.50MM", priceKobo: naira(7_950) },
  {
    productSlug: "step-tiles-roofing-sheet",
    variantLabel: "0.55MMA",
    priceKobo: naira(9_250),
    mappingNote: GRADE_NOTE,
  },
];

/**
 * Metcopo is always priced identically to step tiles, so mirror every step tile
 * entry onto the Metcopo product rather than maintaining two copies. Gauges
 * Metcopo doesn't have a variant for are skipped by the main loop's normal
 * "no matching variant" path.
 */
function withMetcopo(prices: BranchVariantSeed[]): BranchVariantSeed[] {
  const mirrored = prices
    .filter((p) => p.productSlug === "step-tiles-roofing-sheet")
    .map((p) => ({ ...p, productSlug: "metcopo-roofing-sheet", createIfMissing: false }));
  return [...prices, ...mirrored];
}

const branchPriceLists: { branchSlug: string; prices: BranchVariantSeed[] }[] = [
  { branchSlug: "enugu", prices: withMetcopo(enuguPrices) },
  { branchSlug: "imo", prices: withMetcopo(imoPrices) },
];

// ── National catalogue corrections ────────────────────────────────────────
// Stone-coated has two independent axes: the tile design (Bond / Classic /
// Shingle / Milano) and the sheet quality (Thick / Light). Price depends only
// on quality, but the customer has to state both — the branch needs to know
// which design to pull off the rack.
//
// ProductVariant carries a single label, so the two axes are expanded into one
// variant per combination. Eight rows, no schema change, and the design and
// quality both land in the order's variantSnapshot.
const STONE_COATED_DESIGNS = ["Bond", "Classic", "Milano", "Shingle"];
const STONE_COATED_QUALITIES = [
  { name: "Thick", priceKobo: naira(6_950) },
  { name: "Light", priceKobo: naira(5_750) },
];

const stoneCoatedNationalPrices = STONE_COATED_DESIGNS.flatMap((design) =>
  STONE_COATED_QUALITIES.map((quality) => ({
    label: `${design} — ${quality.name} Quality`,
    priceKobo: quality.priceKobo,
    createIfMissing: true,
  })),
);

// Superseded by the combinations above: the original design-only rows, and the
// quality-only rows an earlier run of this script created. Zeroed rather than
// deleted so order history stays intact — a ₦0 variant is hidden everywhere.
const stoneCoatedRetiredLabels = [
  "Shingle Tiles",
  "Bond Tiles",
  "Classic Tiles",
  "Milano Tiles",
  "Thick Quality",
  "Light Quality",
];

/**
 * Put the stone-coated product on its two national quality prices and retire
 * the old per-design variants.
 */
async function applyStoneCoatedNationalPrices() {
  const product = await prisma.product.findUnique({
    where: { slug: "gerard-stone-coated-tiles" },
    include: { variants: true },
  });
  if (!product) {
    console.log("\n✗ gerard-stone-coated-tiles not found — stone-coated prices unchanged");
    return;
  }

  console.log("\nstone-coated (national):");

  let sortOrder = 0;
  for (const target of stoneCoatedNationalPrices) {
    sortOrder += 1;
    const existing = product.variants.find((v) => v.label === target.label);
    if (existing) {
      await prisma.productVariant.update({
        where: { id: existing.id },
        data: { priceKobo: target.priceKobo, inStock: true, sortOrder },
      });
    } else if (target.createIfMissing) {
      await prisma.productVariant.create({
        data: {
          productId: product.id,
          label: target.label,
          priceKobo: target.priceKobo,
          inStock: true,
          sortOrder,
        },
      });
    }
    console.log(`  ✓ ${target.label} — ₦${(target.priceKobo / 100).toLocaleString("en-NG")}`);
  }

  for (const label of stoneCoatedRetiredLabels) {
    const existing = product.variants.find((v) => v.label === label);
    if (!existing || existing.priceKobo === 0) continue;
    await prisma.productVariant.update({
      where: { id: existing.id },
      data: { priceKobo: 0, inStock: false },
    });
    console.log(`  – ${label} retired (₦0, hidden — delete in /admin/products if unwanted)`);
  }
}

/** Leading gauge number in a variant label: "0.55MMA" -> 0.55. */
function gaugeOf(label: string): number | null {
  const match = label.match(/^([\d.]+)\s*MM/i);
  return match ? Number(match[1]) : null;
}

/**
 * Flag any branch where a thicker gauge ends up cheaper than a thinner one.
 *
 * Unlisted gauges fall back to the national price, and the branch lists run
 * well above national, so a branch that stops at 0.55 inherits a national 0.58
 * or 0.60 that undercuts its own top gauge. Nobody would notice until a
 * customer did.
 */
async function reportPriceInversions() {
  const nonDefault = await prisma.branch.findMany({
    where: { isDefault: false },
    select: { id: true, slug: true, shortName: true },
  });

  const findings: string[] = [];

  for (const branch of nonDefault) {
    const overrides = new Map(
      (
        await prisma.branchVariantPrice.findMany({
          where: { branchId: branch.id },
          select: { variantId: true, priceKobo: true },
        })
      ).map((o) => [o.variantId, o.priceKobo]),
    );

    const products = await prisma.product.findMany({
      where: { published: true, variants: { some: {} } },
      select: { slug: true, variants: { select: { id: true, label: true, priceKobo: true } } },
    });

    for (const product of products) {
      const ladder = product.variants
        .map((v) => {
          const gauge = gaugeOf(v.label);
          const priceKobo = overrides.get(v.id) ?? v.priceKobo;
          const branchPriced = overrides.has(v.id);
          return gauge && priceKobo > 0 ? { gauge, priceKobo, branchPriced, label: v.label } : null;
        })
        .filter((v): v is NonNullable<typeof v> => v !== null)
        .sort((a, b) => a.gauge - b.gauge);

      // Compare each gauge against the dearest *strictly thinner* gauge, not
      // just the one before it. Adjacent-only comparison misses the expensive
      // cases: Enugu's 0.60 at the national ₦9,400 sits above the 0.58 next to
      // it but still undercuts its own 0.55MMA at ₦10,400. Same-gauge grades
      // (0.55MMA vs 0.55MMB) are not inversions and are skipped.
      let dearestThinner: (typeof ladder)[number] | null = null;
      let absorbed = 0;

      for (const current of ladder) {
        while (absorbed < ladder.length && ladder[absorbed].gauge < current.gauge) {
          const candidate = ladder[absorbed];
          if (!dearestThinner || candidate.priceKobo > dearestThinner.priceKobo) {
            dearestThinner = candidate;
          }
          absorbed += 1;
        }

        if (!dearestThinner || current.priceKobo >= dearestThinner.priceKobo) continue;
        findings.push(
          `${branch.shortName} · ${product.slug}: ${current.label} ` +
            `₦${(current.priceKobo / 100).toLocaleString("en-NG")}` +
            `${current.branchPriced ? "" : " (national)"} is cheaper than ${dearestThinner.label} ` +
            `₦${(dearestThinner.priceKobo / 100).toLocaleString("en-NG")}` +
            `${dearestThinner.branchPriced ? "" : " (national)"}`,
        );
      }
    }
  }

  if (findings.length === 0) {
    console.log("\nNo price inversions — every branch's gauge ladder rises with thickness.");
    return;
  }

  console.log(`\n⚠  ${findings.length} PRICE INVERSION(S) — thicker sheet selling for less:`);
  for (const f of findings) console.log(`  ⚠ ${f}`);
  console.log(
    "\nThese are gauges the branch price list didn't cover, so they fell back to\n" +
      "the national rate. Set a branch price for each at /admin/branches/<slug>.",
  );
}

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

  // ── Branch price lists ──────────────────────────────────────────────────
  const missingProducts: string[] = [];
  const createdVariants: string[] = [];
  const notes: string[] = [];
  const removed: string[] = [];
  let priced = 0;
  let expected = 0;

  for (const { branchSlug, prices } of branchPriceLists) {
    const branchId = branchIdBySlug.get(branchSlug);
    if (!branchId) {
      console.log(`\n✗ branch "${branchSlug}" not seeded — skipping its prices`);
      continue;
    }

    console.log(`\n${branchSlug}:`);
    expected += prices.length;
    const keptVariantIds: string[] = [];

    for (const entry of prices) {
      const product = await prisma.product.findUnique({
        where: { slug: entry.productSlug },
        include: { variants: true },
      });

      if (!product) {
        missingProducts.push(`${branchSlug}: ${entry.productSlug} (${entry.variantLabel})`);
        continue;
      }

      let variant = product.variants.find((v) => v.label === entry.variantLabel);

      if (!variant) {
        if (!entry.createIfMissing) {
          missingProducts.push(`${branchSlug}: ${entry.productSlug} → variant "${entry.variantLabel}"`);
          continue;
        }
        variant = await prisma.productVariant.create({
          data: {
            productId: product.id,
            label: entry.variantLabel,
            priceKobo: 0, // no national price — stays hidden except where priced
            inStock: false,
            sortOrder: product.variants.length + 1,
          },
        });
        createdVariants.push(`${entry.productSlug} → "${entry.variantLabel}" (for ${branchSlug})`);
      }

      await prisma.branchVariantPrice.upsert({
        where: { branchId_variantId: { branchId, variantId: variant.id } },
        create: {
          branchId,
          variantId: variant.id,
          productId: product.id,
          priceKobo: entry.priceKobo,
          inStock: true,
        },
        update: { priceKobo: entry.priceKobo, productId: product.id, inStock: true },
      });

      keptVariantIds.push(variant.id);
      priced += 1;
      console.log(
        `  ✓ ${product.slug} · ${variant.label} — ₦${(entry.priceKobo / 100).toLocaleString("en-NG")}`,
      );
      if (entry.mappingNote) notes.push(`${product.slug} · ${variant.label}: ${entry.mappingNote}`);
    }

    // Drop rows this branch no longer sets its own price for, so they revert to
    // the national price rather than sticking at a stale branch rate. This is
    // what moves Enugu's old Metcopo and stone-coated overrides back onto the
    // catalogue price now that only long span and step tiles vary by state.
    const stale = await prisma.branchVariantPrice.findMany({
      where: { branchId, variantId: { notIn: keptVariantIds } },
      select: { id: true, variant: { select: { label: true, product: { select: { slug: true } } } } },
    });
    for (const row of stale) {
      await prisma.branchVariantPrice.delete({ where: { id: row.id } });
      removed.push(`${branchSlug}: ${row.variant.product.slug} · ${row.variant.label}`);
    }
  }

  console.log(`\n${priced}/${expected} branch prices written.`);

  await applyStoneCoatedNationalPrices();
  await reportPriceInversions();

  if (createdVariants.length > 0) {
    console.log("\nVariants created (₦0 nationally, so hidden except where priced):");
    for (const v of new Set(createdVariants)) console.log(`  + ${v}`);
  }

  if (removed.length > 0) {
    console.log("\nOverrides removed — these now use the national catalogue price:");
    for (const r of removed) console.log(`  – ${r}`);
  }

  if (notes.length > 0) {
    console.log("\nMappings to confirm with each branch:");
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
