import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteIdentity } from "@/lib/site-identity";

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

const whatsappShareTemplate = `Hi, I wanted to say thank you for the roofing sheets I ordered recently. The quality was great and delivery was on time. I'm happy to leave a Google review if you can send me the link.`;

const emailTemplate = `Subject: Review for Gods Promise Aluminium

Hi Gods Promise Aluminium team,

I recently ordered [product type] for my project in [location] and I'm satisfied with the [quality / service / delivery / pricing].

I'm happy to leave a review. Please send me a link or let me know the best way to do so.

Best regards,
[Your name]
[Your phone number]`;

export default function ReviewsPage() {
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
            Over 950 satisfied clients. Real projects. Real results across Lagos
            and Nigeria.
          </p>
        </div>
      </section>

      {/* Google Review CTA */}
      <section className="bg-background py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-sm border border-border bg-card p-8 text-center">
            <div className="mb-4 h-1 w-10 bg-accent mx-auto" />
            <h2 className="font-heading mb-4 text-2xl font-bold uppercase md:text-3xl">
              Leave a Google Review
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
              Had a good experience with us? A Google review takes less than two
              minutes and helps other homeowners and builders in Lagos and across
              Nigeria find a manufacturer they can trust.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="rounded-sm bg-accent font-heading font-bold uppercase tracking-wide hover:bg-accent/90"
                asChild
              >
                <a
                  href={siteIdentity.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
            <p className="mt-6 text-xs text-muted-foreground">
              Message us on WhatsApp and we will send you the direct Google
              review link.
            </p>
          </div>
        </div>
      </section>

      {/* WhatsApp Review Template */}
      <section className="bg-secondary py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-8">
            <p className="font-heading mb-2 text-xs font-bold uppercase tracking-widest text-accent">
              Quick template
            </p>
            <h2 className="font-heading text-2xl font-bold uppercase md:text-3xl">
              WhatsApp Message Template
            </h2>
            <p className="mt-2 text-muted-foreground">
              Copy and send this to us on WhatsApp at{" "}
              <a
                href={siteIdentity.whatsappUrl}
                className="font-bold text-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {siteIdentity.phoneDisplay}
              </a>
              :
            </p>
          </div>
          <div className="space-y-6">
            <div className="rounded-sm border border-border bg-card p-6">
              <p className="font-heading mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                If you want to leave a review
              </p>
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                &ldquo;{whatsappReviewTemplate}&rdquo;
              </p>
            </div>
            <div className="rounded-sm border border-border bg-card p-6">
              <p className="font-heading mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                If you want to share feedback directly
              </p>
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                &ldquo;{whatsappShareTemplate}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Template */}
      <section className="bg-background py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-8">
            <p className="font-heading mb-2 text-xs font-bold uppercase tracking-widest text-accent">
              Prefer email?
            </p>
            <h2 className="font-heading text-2xl font-bold uppercase md:text-3xl">
              Email Review Template
            </h2>
            <p className="mt-2 text-muted-foreground">
              Use this template and send it to us via the{" "}
              <Link href="/contact" className="font-bold text-accent hover:underline">
                contact form
              </Link>
              :
            </p>
          </div>
          <div className="rounded-sm border border-border bg-card p-6">
            <pre className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed font-sans">
              {emailTemplate}
            </pre>
          </div>
        </div>
      </section>

      {/* Why reviews matter */}
      <section className="bg-secondary py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-8 text-center">
            <p className="font-heading mb-3 text-xs font-bold uppercase tracking-widest text-accent">
              Why it matters
            </p>
            <h2 className="font-heading text-2xl font-bold uppercase md:text-3xl">
              Your review makes a difference
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Helps other buyers",
                body: "Homeowners and builders across Nigeria rely on reviews to choose a roofing supplier they can trust.",
              },
              {
                title: "Builds confidence",
                body: "Honest feedback about product quality, delivery times, and service helps new customers know what to expect.",
              },
              {
                title: "Supports a Nigerian business",
                body: "Every review strengthens Gods Promise Aluminium's reputation and helps us grow to serve more customers.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-sm border border-border bg-card p-6">
                <div className="mb-3 h-1 w-6 bg-accent" />
                <h3 className="font-heading mb-2 font-bold uppercase text-sm">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
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
