import { z } from "zod";

import { prisma } from "@/lib/prisma";

// ──────────────────────────────
// Importing reviews customers sent off-site (WhatsApp, email, SMS)
//
// These are real reviews from real customers, so they belong on the site —
// but they arrive without the web form's guarantees, so this module supplies
// the missing ones explicitly:
//
//   • `receivedAt` is the date the customer actually sent the message, not
//     the date of the import, so the published dates stay truthful.
//   • `consentToPublish` must be true for every row. Publishing a named
//     customer's words is a personal-data disclosure under the NDPA; the
//     importer refuses rows that don't assert it rather than defaulting.
//   • `body` is stored verbatim. Do not rewrite a customer's words to add
//     keywords — an edited testimonial attributed to a named person is a
//     fabricated record, which is the thing this whole subsystem avoids.
//   • Rows land as PENDING, so they still pass through the same admin
//     moderation queue as web submissions before anything goes public.
// ──────────────────────────────

export const importedReviewSchema = z.object({
  authorName: z.string().trim().min(2).max(80),
  authorLocation: z.string().trim().max(80).optional(),
  rating: z.number().int().min(1).max(5),
  title: z.string().trim().max(120).optional(),
  /** The customer's own words, verbatim. */
  body: z.string().trim().min(10).max(2000),
  /** Product slug this review is about; omit for a review of the business. */
  productSlug: z.string().trim().max(120).optional(),
  /** When the customer sent the message — NOT the import date. */
  receivedAt: z.coerce.date(),
  submitterPhone: z.string().trim().max(40).optional(),
  submitterEmail: z.string().trim().email().max(160).optional(),
  source: z.enum(["WHATSAPP_IMPORT", "EMAIL_IMPORT"]).default("WHATSAPP_IMPORT"),
  /** Who transcribed it and from where — kept for audit, never displayed. */
  sourceNote: z.string().trim().min(3).max(500),
  /**
   * Must be true. Asserts the customer agreed their review can appear
   * publicly with the name given above.
   */
  consentToPublish: z.literal(true, {
    message:
      "consentToPublish must be true — only import reviews the customer agreed to have published",
  }),
});

export type ImportedReview = z.input<typeof importedReviewSchema>;

export interface ImportResult {
  created: number;
  skipped: { authorName: string; reason: string }[];
}

/**
 * Inserts transcribed reviews as PENDING rows.
 *
 * Rows are written one at a time on purpose: the Neon HTTP adapter this app
 * uses at runtime (lib/prisma.ts) rejects `createMany`'s implicit transaction
 * with "Transactions are not supported in HTTP mode".
 */
export async function importReviews(rows: ImportedReview[]): Promise<ImportResult> {
  const result: ImportResult = { created: 0, skipped: [] };

  for (const raw of rows) {
    const parsed = importedReviewSchema.safeParse(raw);
    if (!parsed.success) {
      result.skipped.push({
        authorName: String(raw?.authorName ?? "(unnamed)"),
        reason: parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; "),
      });
      continue;
    }

    const review = parsed.data;

    let productId: string | null = null;
    if (review.productSlug) {
      const product = await prisma.product.findUnique({
        where: { slug: review.productSlug },
        select: { id: true },
      });
      if (!product) {
        result.skipped.push({
          authorName: review.authorName,
          reason: `no product with slug "${review.productSlug}"`,
        });
        continue;
      }
      productId = product.id;
    }

    // Guard against double-imports if the script is run twice: same name and
    // same opening words is close enough to a natural key for transcriptions.
    const existing = await prisma.review.findFirst({
      where: {
        authorName: review.authorName,
        body: { startsWith: review.body.slice(0, 40) },
      },
      select: { id: true },
    });
    if (existing) {
      result.skipped.push({ authorName: review.authorName, reason: "already imported" });
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
        // The customer bought offline, so there is no Order row to point at.
        // verifiedPurchase stays false: it means "we can prove this from an
        // order record", and here we can't.
        verifiedPurchase: false,
        createdAt: review.receivedAt,
      },
    });

    result.created += 1;
  }

  return result;
}
