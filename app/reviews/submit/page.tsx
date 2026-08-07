import type { Metadata } from "next";
import Link from "next/link";

import { ReviewForm } from "@/components/reviews/review-form";
import { prisma } from "@/lib/prisma";
import { siteIdentity } from "@/lib/site-identity";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/reviews/submit" },
  title: "Write a Review | Gods Promise Aluminium Roofing",
  description:
    "Share your experience with Gods Promise Aluminium roofing sheets and service. Your review helps other homeowners and builders across Nigeria choose with confidence.",
  robots: { index: false, follow: true },
};

interface PageProps {
  searchParams: Promise<{ token?: string; product?: string }>;
}

export default async function SubmitReviewPage({ searchParams }: PageProps) {
  const { token, product } = await searchParams;

  const products = await prisma.product.findMany({
    where: { published: true },
    select: { name: true, slug: true },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });

  // A valid invitation lets us greet the buyer by name and mark the resulting
  // review as a verified purchase. An invalid or spent token is not an error —
  // the form still works, the review just won't carry the verified badge.
  let invitation: { recipientName: string; recipientEmail: string; productSlug?: string } | null =
    null;

  if (token) {
    const found = await prisma.reviewInvitation.findUnique({
      where: { token },
      select: {
        recipientName: true,
        recipientEmail: true,
        usedAt: true,
        expiresAt: true,
        order: {
          select: {
            items: { select: { product: { select: { slug: true } } }, take: 1 },
          },
        },
      },
    });

    if (found && !found.usedAt && found.expiresAt > new Date()) {
      invitation = {
        recipientName: found.recipientName,
        recipientEmail: found.recipientEmail,
        productSlug: found.order?.items[0]?.product?.slug ?? undefined,
      };
    }
  }

  const defaultProductSlug =
    product && products.some((entry) => entry.slug === product)
      ? product
      : invitation?.productSlug;

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-primary-foreground">
        <div className="h-1 w-full bg-accent" />
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-16">
          <Link
            href="/reviews"
            className="font-heading text-xs font-bold uppercase tracking-widest text-primary-foreground/60 transition-colors hover:text-accent"
          >
            Reviews
          </Link>
          <h1 className="font-heading mt-3 text-3xl font-bold uppercase text-balance md:text-4xl">
            {invitation ? `Thanks, ${invitation.recipientName}` : "Write a Review"}
          </h1>
          <p className="mt-3 text-base text-primary-foreground/80">
            {invitation
              ? "Tell us how your order turned out. An honest three stars is more useful to us — and to the next customer — than a polite five."
              : "Tell other homeowners and builders what your experience with us was actually like. We publish reviews as written, good and bad."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <ReviewForm
          products={products}
          token={token}
          defaultProductSlug={defaultProductSlug}
          defaultName={invitation?.recipientName}
          defaultEmail={invitation?.recipientEmail}
        />

        <p className="mt-8 text-xs text-muted-foreground">
          Questions about a review you left? Call {siteIdentity.phoneDisplay} or email us and
          we&rsquo;ll sort it out.
        </p>
      </section>
    </div>
  );
}
