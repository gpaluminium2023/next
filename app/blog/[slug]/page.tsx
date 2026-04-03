import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from "next/navigation";

import { blogPosts } from "@/lib/blog-posts";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Blog post | Gods Promise Aluminium",
    };
  }

  const url = `https://www.godspromisealuminiumroofing.com/blog/${post.slug}`;
  const imageUrl = post.imageSrc ?? "/logo.jpeg";
  const imageAlt = post.imageAlt ?? `${post.title} - Gods Promise Aluminium`;
  const metaTitle = post.metaTitle ?? post.title;
  const metaDescription = post.metaDescription ?? post.excerpt;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
      type: "article",
      locale: "en_NG",
      siteName: "Gods Promise Aluminium",
      publishedTime: post.date,
      images: [{ url: imageUrl, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const siteUrl = "https://www.godspromisealuminiumroofing.com";
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = post.imageSrc
    ? `${siteUrl}${post.imageSrc}`
    : `${siteUrl}/logo.jpeg`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Gods Promise Aluminium",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Gods Promise Aluminium",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.jpeg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.metaTitle ?? post.title,
        item: postUrl,
      },
    ],
  };

  const faqJsonLd = post.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <div className="bg-linear-to-b from-primary/5 via-background to-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <article className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <div className="mb-6 space-y-2">
          <Badge variant="secondary">Aluminium roofing blog</Badge>
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
        {post.imageSrc && (
          <div className="mb-6 overflow-hidden rounded-xl border border-border/60 bg-muted">
            <div className="relative aspect-video w-full">
              <Image
                src={post.imageSrc}
                alt={post.imageAlt ?? post.title}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        )}
        <Separator className="mb-6" />
        {post.bodyHtml ? (
          <div
            className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-table:text-sm"
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
          />
        ) : (
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            {post.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}
        {post.faq && post.faq.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 text-xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {post.faq.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-sm font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
        <p className="mt-8 text-sm">
          Need today&apos;s aluminium roofing sheet price in Lagos or anywhere
          in Nigeria? Visit our{" "}
          <Link href="/contact" className="text-primary underline">
            contact page
          </Link>{" "}
          to call us or request a WhatsApp quote.
        </p>
        <p className="mt-4 text-sm">
          <Link href="/blog" className="text-primary underline">
            ← Back to all articles
          </Link>
        </p>
      </article>
    </div>
  );
}
