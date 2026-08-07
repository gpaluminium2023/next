import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ReviewCard } from "@/components/reviews/review-card";
import { ReviewSummary } from "@/components/reviews/review-summary";
import { getApprovedReviews, getSiteRatingSummary } from "@/lib/reviews/queries";
import { siteIdentity } from "@/lib/site-identity";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/reviews" },
  title:
    "Customer Reviews | Gods Promise Aluminium — Roofing Sheet Manufacturer Lagos",
  description:
    "Read what customers say about Gods Promise Aluminium and share your own experience. Your review helps homeowners and builders across Nigeria make confident roofing decisions.",
  openGraph: {
    title: "Customer Reviews | Gods Promise Aluminium",
    description:
      "Share your experience with Gods Promise Aluminium and help other homeowners and builders choose quality roofing sheets in Lagos and Nigeria.",
    url: `${siteIdentity.siteUrl}/reviews`,
    type: "website",
  },
};

const whatsappReviewTemplate = `Hi, I recently purchased roofing sheets from Gods Promise Aluminium and I'm happy with the quality and service. I'd like to leave a review to help others. Could you share a link where I can do that?`;

const emailTemplate = `Subject: Review for Gods Promise Aluminium

Hi Gods Promise Aluminium team,

I recently ordered [product type] for my project in [location] and I'm satisfied with the [quality / service / delivery / pricing].

I'm happy to leave a review. Please send me a link or let me know the best way to do so.

Best regards,
[Your name]
[Your phone number]`;

export default async function ReviewsPage() {
  const [reviews, summary] = await Promise.all([
    getApprovedReviews(),
    getSiteRatingSummary(),
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="h-1 w-full bg-accent" />
        <div className="mx-auto max-w-4xl px-4 py-16 md:py-20">
          <p className="mb-3 font-heading text-xs font-bold uppercase tracking-widest text-accent">
            Customer reviews
          </p>
          <h1 className="font-heading text-4xl font-bold uppercase text-balance md:text-5xl">
            What Our Customers Say
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Real projects across Lagos and Nigeria, in our customers&rsquo; own words. We
            publish every approved review exactly as it was written.
          </p>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-background py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          {summary.count > 0 ? (
            <>
              <div className="mb-10 rounded-sm border border-border bg-card p-6 md:p-8">
                <ReviewSummary summary={summary} />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>

              <div className="mt-10 text-center">
                <Button
                  size="lg"
                  className="rounded-sm bg-accent font-heading font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90"
                  asChild
                >
                  <Link href="/reviews/submit">Write a review</Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="rounded-sm border border-dashed border-border p-10 text-center">
              <h2 className="font-heading text-xl font-bold uppercase">
                No published reviews yet
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
                We&rsquo;ve only just opened reviews on the site. If you&rsquo;ve bought from
                us, yours would be the first — and it will appear here exactly as you write
                it.
              </p>
              <Button
                size="lg"
                className="mt-6 rounded-sm bg-accent font-heading font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90"
                asChild
              >
                <Link href="/reviews/submit">Write the first review</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Leave a review elsewhere */}
      <section className="bg-secondary py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-sm border border-border bg-card p-8 text-center">
            <div className="mx-auto mb-4 h-1 w-10 bg-accent" />
            <h2 className="font-heading mb-4 text-2xl font-bold uppercase md:text-3xl">
              Prefer Google or WhatsApp?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
              A Google review takes less than two minutes and helps other homeowners and
              builders in Lagos and across Nigeria find a manufacturer they can trust. Message
              us and we&rsquo;ll send you the direct link.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="rounded-sm bg-accent font-heading font-bold uppercase tracking-wide hover:bg-accent/90"
                asChild
              >
                <a href={siteIdentity.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Request review link via WhatsApp
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-sm font-heading font-bold uppercase tracking-wide"
                asChild
              >
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="bg-background py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-8">
            <p className="font-heading mb-2 text-xs font-bold uppercase tracking-widest text-accent">
              Not sure what to write?
            </p>
            <h2 className="font-heading text-2xl font-bold uppercase md:text-3xl">
              Starting points
            </h2>
            <p className="mt-2 text-muted-foreground">
              These are prompts, not scripts — the useful part of any review is the bit only
              you can write.
            </p>
          </div>
          <div className="space-y-6">
            <div className="rounded-sm border border-border bg-card p-6">
              <p className="font-heading mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                On WhatsApp —{" "}
                <a
                  href={siteIdentity.whatsappUrl}
                  className="text-accent hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {siteIdentity.phoneDisplay}
                </a>
              </p>
              <p className="text-sm italic leading-relaxed text-muted-foreground">
                &ldquo;{whatsappReviewTemplate}&rdquo;
              </p>
            </div>
            <div className="rounded-sm border border-border bg-card p-6">
              <p className="font-heading mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                By email — via the{" "}
                <Link href="/contact" className="text-accent hover:underline">
                  contact form
                </Link>
              </p>
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted-foreground">
                {emailTemplate}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Explore */}
      <section className="bg-primary py-14 text-primary-foreground md:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="font-heading mb-3 text-xs font-bold uppercase tracking-widest text-accent">
            Explore more
          </p>
          <h2 className="font-heading mb-8 text-2xl font-bold uppercase md:text-3xl">
            See our work
          </h2>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="rounded-sm bg-accent font-heading font-bold uppercase tracking-wide hover:bg-accent/90"
              asChild
            >
              <Link href="/projects">View completed projects</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-sm border-primary-foreground/30 bg-transparent font-heading font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
