/**
 * Bring the live `gerard-nail` listing in line with what the product videos
 * and the owner say: ₦23,000 per 20kg carton (4 × 5kg packs), BWG 12 × 2"
 * Simplex coated wire nails.
 *
 * Before this the row read "₦11,000 per pack, approximately 1kg per carton",
 * which contradicts every video now published about the nails.
 *
 * Run with: pnpm update:gerard-nail            (dry run: prints the diff)
 *           pnpm update:gerard-nail --apply    (writes it)
 *
 * Deploy first. The new images live in public/new-materials and 404 until
 * the deploy that ships them is live.
 *
 * Price and packaging are read from lib/nails-content.ts, so this script
 * and the site can't drift apart.
 */
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { PrismaNeonHttp } from "@prisma/adapter-neon";
import { PrismaClient } from "../lib/generated/prisma/client";
import { GERARD_NAIL_SLUG, gerardNails as n } from "../lib/nails-content";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../.env") });

const dbUrl = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL / DIRECT_URL not set");
  process.exit(1);
}
const prisma = new PrismaClient({ adapter: new PrismaNeonHttp(dbUrl, {}) } as never);
const apply = process.argv.includes("--apply");

const next = {
  name: `Gerard Roofing Nails (${n.cartonKg}kg Carton)`,
  description: `Gerard roofing nails at wholesale: ${n.priceDisplay} per ${n.cartonKg}kg carton of ${n.packsPerCarton} × ${n.packKg}kg packs. ${n.gauge} × ${n.lengthIn} (${n.gaugeMm} × ${n.lengthMm}) ${n.finish.toLowerCase()} wire nails with a ${n.point.toLowerCase()}, made by ${n.manufacturer}. Bulk discounts and nationwide delivery from ${n.pickup}.`,
  unit: "carton",
  basePriceKobo: n.priceNaira * 100,
  inStock: true,
  images: [
    {
      url: "/new-materials/gerard-nail-carton-1.jpg",
      publicId: "",
      alt: `Three cartons of Simplex coated wire nails, BWG 12 × 2 inch: Gerard roofing nails, ${n.priceDisplay} per ${n.cartonKg}kg carton`,
    },
    {
      url: "/new-materials/gerard-nail-carton-2.jpg",
      publicId: "",
      alt: "Two Simplex Industrial Limited cartons labelled Coated Wire Nails, Professional Grade, Diamond Point, Precision Cut",
    },
    {
      url: "/new-materials/gerard-nail-carton-3.jpg",
      publicId: "",
      alt: `A white Simplex Special ${n.packKg}kg inner pack on top of a ${n.cartonKg}kg outer carton of roofing nails`,
    },
    {
      url: "/new-materials/gerard-nail-carton-4.jpg",
      publicId: "",
      alt: "Stacked cartons of Gerard roofing nails from Simplex Industrial Limited",
    },
  ],
};

async function main() {
  const current = await prisma.product.findUnique({
    where: { slug: GERARD_NAIL_SLUG },
    select: {
      id: true,
      name: true,
      description: true,
      unit: true,
      basePriceKobo: true,
      inStock: true,
      images: true,
      _count: { select: { variants: true } },
    },
  });
  if (!current) {
    console.error(`No product with slug "${GERARD_NAIL_SLUG}". Nothing changed.`);
    process.exit(1);
  }
  if (current._count.variants > 0) {
    // basePriceKobo is ignored when variants exist, so the new price would not show.
    console.error(`"${GERARD_NAIL_SLUG}" has variants; set the price on them instead. Nothing changed.`);
    process.exit(1);
  }

  for (const key of ["name", "description", "unit", "basePriceKobo", "inStock", "images"] as const) {
    const before = JSON.stringify(current[key]);
    const after = JSON.stringify(next[key]);
    if (before !== after) console.log(`${key}:\n  - ${before}\n  + ${after}`);
  }

  if (!apply) {
    console.log("\nDry run. Re-run with --apply to write.");
    return;
  }
  await prisma.product.update({ where: { id: current.id }, data: next });
  console.log(`\nUpdated ${GERARD_NAIL_SLUG}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
