import Link from 'next/link';
import Image from 'next/image';

import type { Metadata } from 'next';
import { blogPosts } from '@/lib/blog-posts';

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title:
    "Aluminium Roofing Blog — Prices, Guides & Tips | Gods Promise Aluminium",
  description:
    "Aluminium roofing guides, price updates and practical resources for homeowners, builders and contractors in Lagos and across Nigeria.",
};

export default function BlogIndexPage() {
	const sortedPosts = [...blogPosts].sort((a, b) =>
		a.date < b.date ? 1 : -1
	);

	return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="h-1 w-full bg-accent" />
        <div className="container px-4 mx-auto max-w-6xl py-16 md:py-20">
          <p className="text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3">
            Blog &amp; Resources
          </p>
          <h1 className="font-heading uppercase font-bold text-4xl md:text-5xl lg:text-6xl text-balance mb-4">
            Roofing Guides &amp; Price Updates
          </h1>
          <p className="text-primary-foreground/80 text-base md:text-lg max-w-2xl">
            Practical articles to help you choose the right aluminium roofing
            sheets, understand pricing in Lagos and across Nigeria, and plan
            your next roofing project with confidence.
          </p>
        </div>
      </section>

      {/* Intro text */}
      <section className="bg-secondary border-b border-border">
        <div className="container px-4 mx-auto max-w-6xl py-6">
          <div className="grid gap-4 md:grid-cols-2 text-sm text-muted-foreground">
            <p>
              Our blog covers the topics that matter most to anyone planning a
              roofing project in Nigeria — from understanding the differences
              between long span, step tile and stone-coated profiles to
              comparing aluminium gauge thicknesses and working out how much
              material you need for your roof size. Each article is written from
              direct experience in the roofing industry.
            </p>
            <p>
              We also publish regular price updates so you can track how
              aluminium roofing sheet costs change with market conditions.
              Whether you are a first-time homeowner, an experienced contractor
              or a property developer, these guides will help you make better
              purchasing decisions and avoid common mistakes when buying roofing
              materials in Lagos and across Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedPosts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-sm overflow-hidden border border-border bg-card h-full flex flex-col"
              >
                {post.imageSrc && (
                  <div className="relative h-40 w-full overflow-hidden bg-muted">
                    <Image
                      src={post.imageSrc}
                      alt={post.imageAlt ?? post.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, 50vw"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="font-heading font-bold text-base md:text-lg line-clamp-2 mb-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-accent transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-3">
                    {new Date(post.date).toLocaleDateString("en-NG", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                    {post.readingTimeMinutes && (
                      <span>{` · ${post.readingTimeMinutes} min read`}</span>
                    )}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
