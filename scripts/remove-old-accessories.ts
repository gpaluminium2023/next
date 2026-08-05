/**
 * Delete every ACCESSORIES product except the nine seeded from the supplier's
 * 2026-08-05 price list, leaving the accessories catalogue as exactly that list.
 *
 * Run with: pnpm remove:old-accessories
 *
 * Safety:
 *  - Every row it deletes (product + variants) is written to
 *    prisma/backups/accessories-removed-<timestamp>.json first, so the delete
 *    is reversible by re-inserting from that file.
 *  - Order history survives. OrderItem snapshots nameSnapshot / variantSnapshot
 *    / unit / unitPriceKobo at purchase time, and admin order pages, receipts
 *    and admin notices all render those snapshots rather than the product
 *    relation. Product.orderItems is onDelete: SetNull, so past lines keep
 *    their text and totals and simply stop linking to a catalogue row.
 *  - ProductVariant is onDelete: Cascade from Product, so variants go with it.
 */
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { mkdirSync, writeFileSync } from "fs";
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

/** The nine products seeded by seed-accessories.ts — everything else goes. */
const KEEP = new Set([
  "land-gum-roofing-sealant",
  "abro-shur-fix-roof-cement",
  "abro-1800-silicone-sealant",
  "gerard-nail",
  "carton-nail-aluminium-roofing",
  "counting-nail",
  "sim-bolt",
  "2-inch-cladding-nail",
  "1-inch-nail",
]);

const DRY_RUN = process.argv.includes("--dry-run");

async function main() {
  const all = await prisma.product.findMany({
    where: { category: "ACCESSORIES" },
    include: { variants: { orderBy: { sortOrder: "asc" } }, _count: { select: { orderItems: true } } },
    orderBy: { sortOrder: "asc" },
  });

  const doomed = all.filter((p) => !KEEP.has(p.slug));
  const kept = all.filter((p) => KEEP.has(p.slug));

  console.log(`Keeping ${kept.length}, removing ${doomed.length}:\n`);
  for (const p of doomed) {
    const sold = p._count.orderItems;
    console.log(
      `  ${p.slug.padEnd(38)} published=${String(p.published).padEnd(5)} ` +
        `variants=${p.variants.length} orderItems=${sold}${sold > 0 ? "  <-- has been ordered" : ""}`
    );
  }

  if (DRY_RUN) {
    console.log("\n--dry-run — nothing deleted.");
    return;
  }

  const backupDir = resolve(__dirname, "../prisma/backups");
  mkdirSync(backupDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFile = resolve(backupDir, `accessories-removed-${stamp}.json`);
  writeFileSync(backupFile, JSON.stringify(doomed, null, 2));
  console.log(`\nBacked up ${doomed.length} product(s) to ${backupFile}`);

  for (const p of doomed) {
    await prisma.product.delete({ where: { id: p.id } });
    console.log(`✓ removed ${p.slug}`);
  }

  const left = await prisma.product.findMany({
    where: { category: "ACCESSORIES" },
    include: { variants: { orderBy: { sortOrder: "asc" } } },
    orderBy: { sortOrder: "asc" },
  });
  console.log(`\nAccessories remaining (${left.length}):`);
  for (const p of left) {
    const price = p.basePriceKobo
      ? `NGN ${(p.basePriceKobo / 100).toLocaleString()}`
      : p.variants.map((v) => `${v.label.trim()} ${(v.priceKobo / 100).toLocaleString()}`).join(" / ");
    console.log(`  ${p.published ? "LIVE " : "draft"} ${p.slug.padEnd(34)} ${price}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
