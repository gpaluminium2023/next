import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const dynamic = "force-dynamic";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getArticle(slug: string) {
  const row = await prisma.blogPost.findUnique({
    where: { slug, published: true },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      coverImage: true,
      coverImageAlt: true,
      date: true,
      readingTimeMinutes: true,
      body: true,
    },
  });
  if (!row) return null;
  return {
    ...row,
    date: row.date instanceof Date ? row.date.toISOString() : String(row.date),
    body: Array.isArray(row.body) ? (row.body as string[]) : [],
  };
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getArticle(slug);

  if (!post) {
    return { title: "Article | Gods Promise Aluminium" };
  }

  const url = `https://www.godspromisealuminiumroofing.com/articles/${post.slug}`;
  const imageUrl = post.coverImage ?? "/logo.jpeg";
  const imageAlt = post.coverImageAlt ?? `${post.title} - Gods Promise Aluminium`;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      locale: "en_NG",
      siteName: "Gods Promise Aluminium",
      publishedTime: post.date,
      images: [{ url: imageUrl, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = await getArticle(slug);

  if (!post) notFound();

  return (
    <div className="bg-linear-to-b from-primary/5 via-background to-background">
      <article className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <div className="mb-6 space-y-2">
          <Badge variant="secondary">Aluminium roofing</Badge>
          <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            {post.title}
          </h1>
          <p className="text-xs text-muted-foreground">
            <span>
              {new Date(post.date).toLocaleDateString("en-NG", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            {post.readingTimeMinutes && (
              <span>{` • ${post.readingTimeMinutes} min read`}</span>
            )}
          </p>
        </div>

        {post.coverImage && (
          <div className="mb-6 overflow-hidden rounded-xl border border-border/60 bg-muted">
            <div className="relative aspect-video w-full">
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt ?? post.title}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        )}

        <Separator className="mb-6" />

        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          {post.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <p className="mt-8 text-sm">
          Need today&apos;s aluminium roofing sheet price in Lagos or anywhere in
          Nigeria? Visit our{" "}
          <Link href="/contact" className="text-primary underline">
            contact page
          </Link>{" "}
          to call us or request a WhatsApp quote.
        </p>
        <p className="mt-4 text-sm">
          <Link href="/articles" className="text-primary underline">
            ← Back to all articles
          </Link>
        </p>
      </article>
    </div>
  );
}
