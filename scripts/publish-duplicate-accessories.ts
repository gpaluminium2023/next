/**
 * Publish the three accessories that unpublish-duplicate-accessories.ts parked
 * as drafts, on the user's explicit instruction ("publish all", 2026-08-05).
 *
 * Run with: pnpm publish:dupes
 *
 * NOTE — this deliberately puts two listings for the same goods on the live
 * store at once, which is why it is a separate opt-in script rather than a
 * change to seed-accessories.ts:
 *
 *   gerard-nail (₦11,000/pack)          alongside  gerard-roofing-nails (5kg ₦11,350, 4kg ₦9,500)
 *   abro-1800-silicone-sealant (₦4,500) alongside  roofing-silicone variant "ABRO 1800" (₦4,500)
 *   sim-bolt (₦2,500/pack)              alongside  roofing-seam-bolts (₦2,350/pack)
 *
 * The seam bolt pair in particular shows two different prices for one product.
 * Retiring the older generic listing of each pair is the follow-up.
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

const SLUGS = ["gerard-nail", "abro-1800-silicone-sealant", "sim-bolt"];

async function main() {
  for (const slug of SLUGS) {
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (!existing) {
      console.log(`= ${slug} not found — skipping`);
      continue;
    }
    if (existing.published) {
      console.log(`= ${slug} already published — skipping`);
      continue;
    }
    await prisma.product.update({ where: { slug }, data: { published: true } });
    console.log(`✓ published ${slug}`);
  }

  const live = await prisma.product.findMany({
    where: { category: "ACCESSORIES", published: true },
    include: { variants: { orderBy: { sortOrder: "asc" } } },
    orderBy: { sortOrder: "asc" },
  });
  console.log(`\nLive accessories now (${live.length}):`);
  for (const p of live) {
    const price = p.basePriceKobo
      ? `NGN ${(p.basePriceKobo / 100).toLocaleString()}`
      : p.variants.map((v) => `${v.label.trim()} ${(v.priceKobo / 100).toLocaleString()}`).join(" / ");
    console.log(`  ${p.slug.padEnd(34)} ${price}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
