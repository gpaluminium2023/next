import type { Metadata } from 'next';
import Link from 'next/link';

import { blogPosts } from '@/lib/blog-posts';

export const metadata: Metadata = {
	title: 'Resources & Guides | Gods Promise Aluminium',
	description:
		'Aluminium roofing guides, FAQs and blog posts to help you choose the right roofing sheets and plan your project in Lagos and across Nigeria.',
};

export default function ResourcesPage() {
	const sortedPosts = [...blogPosts].sort((a, b) =>
		a.date < b.date ? 1 : -1
	);

	return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-primary-foreground">
        <div className="h-1 w-full bg-accent" />
        <div className="container px-4 mx-auto max-w-6xl py-16 md:py-20">
          <p className="text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3">
            Knowledge Base
          </p>
          <h1 className="font-heading uppercase font-bold text-4xl md:text-5xl text-balance">
            Resources &amp; Guides
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto max-w-6xl">
          <p className="text-sm text-muted-foreground md:text-base mb-4">
            Whether you are building a new home, replacing an old roof or
            managing a large construction project, making informed decisions
            about your roofing materials saves time and money. We have put
            together these guides and resources to help you understand aluminium
            roofing sheet options, pricing factors and best practices for your
            project in Lagos and across Nigeria.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Browse the sections below to find answers to common questions,
            compare product options and read our latest articles on aluminium
            roofing.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-sm border border-border bg-card p-6">
              <h2 className="font-heading font-bold text-base mb-2">
                Help &amp; Support
              </h2>
              <p className="text-sm text-muted-foreground mb-3">
                Find answers to frequently asked questions about our products,
                delivery process, pricing and installation services. Our FAQ
                section covers the most common enquiries we receive from
                homeowners, contractors and dealers.
              </p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/faq"
                    className="text-accent underline-offset-2 hover:underline"
                  >
                    Frequently asked questions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-accent underline-offset-2 hover:underline"
                  >
                    Pricing &amp; how quotes work
                  </Link>
                </li>
                <li>
                  <Link
                    href="/warranty"
                    className="text-accent underline-offset-2 hover:underline"
                  >
                    Warranty &amp; returns policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/delivery"
                    className="text-accent underline-offset-2 hover:underline"
                  >
                    Delivery &amp; coverage areas
                  </Link>
                </li>
              </ul>
            </div>

            <div className="rounded-sm border border-border bg-card p-6">
              <h2 className="font-heading font-bold text-base mb-2">
                Latest Articles
              </h2>
              <p className="text-sm text-muted-foreground mb-3">
                Our blog covers practical topics like aluminium roofing sheet
                prices in Lagos, how to choose the right thickness and profile
                for your building, and tips for getting the best value from your
                roofing budget.
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {sortedPosts.slice(0, 3).map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-accent underline-offset-2 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-2">
                <Link
                  href="/blog"
                  className="text-sm text-accent underline-offset-2 hover:underline"
                >
                  View all blog posts →
                </Link>
              </p>
            </div>

            <div className="rounded-sm border border-border bg-card p-6">
              <h2 className="font-heading font-bold text-base mb-2">
                Buying Guide
              </h2>
              <p className="text-sm text-muted-foreground">
                Choosing the right roofing material involves considering your
                budget, building type, local weather conditions and aesthetic
                preferences. Long span aluminium sheets are the most economical
                option for standard residential and commercial buildings.
                Step-tile aluminium sheets provide a more traditional tile-like
                appearance at a moderate price point. Stone-coated roofing tiles
                offer premium durability and a decorative stone-chip finish
                suited for high-end homes and commercial properties. Visit our{" "}
                <Link
                  href="/products"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  products page
                </Link>{" "}
                to compare profiles and features.
              </p>
            </div>

            <div className="rounded-sm border border-border bg-card p-6">
              <h2 className="font-heading font-bold text-base mb-2">
                Working With Us
              </h2>
              <p className="text-sm text-muted-foreground">
                Gods Promise Aluminium is a Lagos-based manufacturer supplying
                roofing materials directly from our factory. We offer
                competitive pricing, custom production to your specifications,
                and delivery across Nigeria. Whether you are a homeowner,
                contractor or dealer, you can reach us by phone, WhatsApp or
                through our{" "}
                <Link
                  href="/contact"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  contact form
                </Link>{" "}
                to request a quote or ask any questions about your roofing
                project.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
