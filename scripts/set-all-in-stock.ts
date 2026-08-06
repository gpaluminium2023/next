/**
 * Mark everything in the catalogue as in stock — products, variants and every
 * branch's price rows.
 *
 * Run with: pnpm stock:all-in
 *
 * Zero-priced variants are NOT touched and stay hidden from the store: they are
 * placeholders for gauges a branch has no rate for, so flipping them in stock
 * would list them as buyable at ₦0. `priceForVariant` in lib/store/branch.ts
 * hides anything unpriced regardless of its stock flag.
 *
 * Re-runnable. Prints what it changed rather than working silently.
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

async function main() {
  let changed = 0;
  let skipped = 0;

  // Single-row updates only — the Neon HTTP adapter rejects the implicit
  // transaction updateMany with a filter would start.
  const products = await prisma.product.findMany({
    where: { inStock: false },
    select: { id: true, name: true, slug: true, basePriceKobo: true },
  });
  for (const p of products) {
    if (p.basePriceKobo == null || p.basePriceKobo <= 0) {
      console.log(`  – skipped ${p.slug} (no price — stays hidden)`);
      skipped += 1;
      continue;
    }
    await prisma.product.update({ where: { id: p.id }, data: { inStock: true } });
    console.log(`  ✓ product ${p.slug}`);
    changed += 1;
  }

  const variants = await prisma.productVariant.findMany({
    where: { inStock: false },
    select: { id: true, label: true, priceKobo: true, product: { select: { slug: true } } },
  });
  for (const v of variants) {
    if (v.priceKobo <= 0) {
      console.log(`  – skipped ${v.product.slug} · ${v.label} (₦0 — stays hidden)`);
      skipped += 1;
      continue;
    }
    await prisma.productVariant.update({ where: { id: v.id }, data: { inStock: true } });
    console.log(`  ✓ variant ${v.product.slug} · ${v.label}`);
    changed += 1;
  }

  const branchVariants = await prisma.branchVariantPrice.findMany({
    where: { inStock: false },
    select: {
      id: true,
      priceKobo: true,
      branch: { select: { shortName: true } },
      variant: { select: { label: true } },
    },
  });
  for (const bv of branchVariants) {
    if (bv.priceKobo <= 0) {
      skipped += 1;
      continue;
    }
    await prisma.branchVariantPrice.update({ where: { id: bv.id }, data: { inStock: true } });
    console.log(`  ✓ ${bv.branch.shortName} · ${bv.variant.label}`);
    changed += 1;
  }

  const branchProducts = await prisma.branchProductPrice.findMany({
    where: { inStock: false },
    select: {
      id: true,
      priceKobo: true,
      branch: { select: { shortName: true } },
      product: { select: { slug: true } },
    },
  });
  for (const bp of branchProducts) {
    if (bp.priceKobo <= 0) {
      skipped += 1;
      continue;
    }
    await prisma.branchProductPrice.update({ where: { id: bp.id }, data: { inStock: true } });
    console.log(`  ✓ ${bp.branch.shortName} · ${bp.product.slug}`);
    changed += 1;
  }

  console.log(
    changed === 0 && skipped === 0
      ? "\nNothing was out of stock — no changes."
      : `\n${changed} row(s) set in stock, ${skipped} left alone (unpriced, hidden from the store).`,
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => void prisma.$disconnect());
