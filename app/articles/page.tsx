import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/articles" },
  title:
    "Articles — In-Depth Roofing Guides | Gods Promise Aluminium",
  description:
    "In-depth articles on aluminium roofing — installation guides, product comparisons, price breakdowns and expert advice from Gods Promise Aluminium.",
};

export default async function ArticlesIndexPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      coverImage: true,
      coverImageAlt: true,
      date: true,
      readingTimeMinutes: true,
      featured: true,
    },
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="h-1 w-full bg-accent" />
        <div className="container px-4 mx-auto max-w-6xl py-16 md:py-20">
          <p className="text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3">
            Articles &amp; Guides
          </p>
          <h1 className="font-heading uppercase font-bold text-4xl md:text-5xl lg:text-6xl text-balance mb-4">
            Roofing Knowledge Hub
          </h1>
          <p className="text-primary-foreground/80 text-base md:text-lg max-w-2xl">
            Expert-written articles to help you make better roofing decisions —
            from choosing the right profile to understanding price movements
            across Nigeria.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto max-w-6xl">
          {posts.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p>No articles published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group rounded-sm overflow-hidden border border-border bg-card h-full flex flex-col"
                >
                  {post.coverImage && (
                    <div className="relative h-40 w-full overflow-hidden bg-muted">
                      <Image
                        src={post.coverImage}
                        alt={post.coverImageAlt ?? post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(min-width: 1024px) 33vw, 50vw"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <h2 className="font-heading font-bold text-base md:text-lg line-clamp-2 mb-2">
                      <Link
                        href={`/articles/${post.slug}`}
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
          )}
        </div>
      </section>
    </div>
  );
}
