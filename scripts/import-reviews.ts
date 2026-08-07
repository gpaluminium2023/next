/**
 * Import the reviews staged in scripts/reviews-to-import.ts.
 *
 *   pnpm import:reviews                  — import
 *   pnpm import:reviews --dry-run        — validate without writing
 *   pnpm exec tsx scripts/import-reviews.ts --list-products
 *
 * Idempotent: a row whose author name and opening words already exist is
 * skipped, so re-running after adding entries only inserts the new ones.
 * Everything lands as PENDING for moderation in /admin/reviews.
 */
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { PrismaNeonHttp } from "@prisma/adapter-neon";
import { PrismaClient } from "../lib/generated/prisma/client";
import { importedReviewSchema, type ImportedReview } from "../lib/reviews/import";
import { reviewsToImport } from "./reviews-to-import";

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

const dryRun = process.argv.includes("--dry-run");
const listProducts = process.argv.includes("--list-products");

async function main() {
  if (listProducts) {
    const products = await prisma.product.findMany({
      where: { published: true },
      select: { name: true, slug: true, category: true },
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
    });
    console.log(`\n${products.length} published products:\n`);
    for (const product of products) {
      console.log(`  ${product.slug.padEnd(46)} ${product.category.padEnd(14)} ${product.name}`);
    }
    console.log("\nUse the left-hand slug as `productSlug` in scripts/reviews-to-import.ts.\n");
    return;
  }

  if (reviewsToImport.length === 0) {
    console.log(
      "\nNothing staged. Add entries to scripts/reviews-to-import.ts first —\n" +
        "read the rules at the top of that file before you do.\n",
    );
    return;
  }

  // Validate everything up front so a bad row is reported before any write.
  const invalid: string[] = [];
  reviewsToImport.forEach((row: ImportedReview, index) => {
    const parsed = importedReviewSchema.safeParse(row);
    if (!parsed.success) {
      const who = row?.authorName ?? `entry ${index + 1}`;
      for (const issue of parsed.error.issues) {
        invalid.push(`  ✗ ${who} — ${issue.path.join(".") || "(root)"}: ${issue.message}`);
      }
    }
  });

  if (invalid.length > 0) {
    console.error(`\n${invalid.length} validation problem(s):\n`);
    console.error(invalid.join("\n"));
    console.error("\nNothing was imported. Fix the entries above and re-run.\n");
    process.exitCode = 1;
    return;
  }

  console.log(`\n${reviewsToImport.length} staged review(s) passed validation.`);

  if (dryRun) {
    console.log("\n--dry-run: nothing written. Re-run without the flag to import.\n");
    return;
  }

  // importReviews() imports lib/prisma, which builds its own client from
  // DATABASE_URL — fine here, but the loop is inlined instead so this script
  // writes through the same DIRECT_URL client it validated against.
  let created = 0;
  const skipped: string[] = [];

  for (const raw of reviewsToImport) {
    const review = importedReviewSchema.parse(raw);

    let productId: string | null = null;
    if (review.productSlug) {
      const product = await prisma.product.findUnique({
        where: { slug: review.productSlug },
        select: { id: true },
      });
      if (!product) {
        skipped.push(`${review.authorName} — no product with slug "${review.productSlug}"`);
        continue;
      }
      productId = product.id;
    }

    const existing = await prisma.review.findFirst({
      where: { authorName: review.authorName, body: { startsWith: review.body.slice(0, 40) } },
      select: { id: true },
    });
    if (existing) {
      skipped.push(`${review.authorName} — already imported`);
      continue;
    }

    await prisma.review.create({
      data: {
        rating: review.rating,
        title: review.title || null,
        body: review.body,
        authorName: review.authorName,
        authorLocation: review.authorLocation || null,
        submitterEmail: review.submitterEmail || null,
        submitterPhone: review.submitterPhone || null,
        source: review.source,
        sourceNote: review.sourceNote,
        consentToPublish: true,
        status: "PENDING",
        productId,
        verifiedPurchase: false,
        createdAt: review.receivedAt,
      },
    });
    created += 1;
    console.log(`  ✓ ${review.authorName}${review.productSlug ? ` — ${review.productSlug}` : ""}`);
  }

  if (skipped.length > 0) {
    console.log(`\nSkipped ${skipped.length}:`);
    for (const line of skipped) console.log(`  – ${line}`);
  }

  console.log(
    `\nImported ${created} review(s) as PENDING.\n` +
      "Approve them at /admin/reviews — nothing is public until you do.\n",
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => void prisma.$disconnect());
