/**
 * Unpublish the three products seeded by seed-accessories.ts that duplicate
 * listings already published on the live store.
 *
 * Run with: pnpm unpublish:dupes
 *
 * Context — the live store already carries these, published via /admin between
 * 2026-07-21 and 2026-08-02, at prices that disagree with the supplier's
 * WhatsApp price list:
 *
 *   gerard-nail (₦11,000/pack)        vs  gerard-roofing-nails (5kg ₦11,350, 4kg ₦9,500)
 *   abro-1800-silicone-sealant (₦4,500) vs roofing-silicone variant "ABRO 1800" (₦4,500)
 *   sim-bolt (₦2,500/pack)            vs  roofing-seam-bolts (₦2,350/pack)
 *
 * Two prices for one product on a store taking real payments is worse than a
 * missing listing, so the newly-seeded copies are hidden until the duplicates
 * are reconciled. This only flips `published` — the rows, prices and images
 * are left intact, so republishing is a one-click change in admin.
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

const DUPLICATE_SLUGS = ["gerard-nail", "abro-1800-silicone-sealant", "sim-bolt"];

async function main() {
  for (const slug of DUPLICATE_SLUGS) {
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (!existing) {
      console.log(`= ${slug} not found — skipping`);
      continue;
    }
    if (!existing.published) {
      console.log(`= ${slug} already unpublished — skipping`);
      continue;
    }
    await prisma.product.update({ where: { slug }, data: { published: false } });
    console.log(`✓ unpublished ${slug}`);
  }

  const live = await prisma.product.findMany({
    where: { category: "ACCESSORIES", published: true },
    orderBy: { sortOrder: "asc" },
  });
  console.log(`\nLive accessories now (${live.length}):`);
  for (const p of live) console.log(`  ${p.slug}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
