import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { FactoryVideo } from "@/components/factory-video";
import { NailsOrderBox } from "@/components/nails/nails-order-box";
import { siteIdentity } from "@/lib/site-identity";
import { GERARD_NAIL_SLUG, gerardNailsPosts, gerardNailsUrl } from "@/lib/nails-content";
import {
  galleryVideos,
  getVideo,
  videoObjectJsonLd,
  watchPagePath,
  watchPageVideos,
  type GalleryVideo,
} from "@/lib/videos-data";

/**
 * One page per video, with the video as the main content.
 *
 * Google only indexes a video in video results when it is the page's main
 * subject. A clip tucked under a product or a gallery grid gets the page
 * indexed but rarely the video. These pages exist for that reason, and the
 * visible transcript gives search and answer engines the spoken words as
 * text. Only videos with a transcript get one (see watchPageVideos).
 */

interface VideoPageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return watchPageVideos().map((video) => ({ id: video.id }));
}

function getWatchableVideo(id: string): GalleryVideo | undefined {
  const video = getVideo(id);
  return video?.transcript ? video : undefined;
}

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const { id } = await params;
  const video = getWatchableVideo(id);
  if (!video) return {};

  const url = `${siteIdentity.siteUrl}${watchPagePath(video)}`;
  const portrait = video.orientation === "portrait";
  return {
    alternates: { canonical: watchPagePath(video) },
    title: `${video.title} | ${siteIdentity.brandName}`,
    description: video.description,
    openGraph: {
      title: video.title,
      description: video.description,
      url,
      type: "video.other",
      locale: "en_NG",
      siteName: siteIdentity.brandName,
      images: [{ url: video.thumbnail, alt: video.title }],
      videos: [
        {
          url: `${siteIdentity.siteUrl}${video.contentUrl}`,
          type: "video/mp4",
          width: portrait ? 720 : 1280,
          height: portrait ? 1280 : 720,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: video.title,
      description: video.description,
      images: [video.thumbnail],
    },
  };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = await params;
  const video = getWatchableVideo(id);
  if (!video) notFound();

  const siteUrl = siteIdentity.siteUrl;
  const sellsNails = video.productSlug === GERARD_NAIL_SLUG;
  const portrait = video.orientation === "portrait";
  const related = galleryVideos.filter(
    (other) => other.id !== video.id && other.transcript && other.productSlug === video.productSlug,
  );

  const videoJsonLd = {
    "@context": "https://schema.org",
    ...videoObjectJsonLd(video, siteUrl),
    publisher: {
      "@type": "Organization",
      name: siteIdentity.legalName,
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}${siteIdentity.logoPath}` },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Gallery", item: `${siteUrl}/gallery` },
      { "@type": "ListItem", position: 3, name: video.title, item: `${siteUrl}${watchPagePath(video)}` },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Link href="/gallery" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" /> All videos
        </Link>
      </div>

      <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className={portrait ? "grid gap-8 md:grid-cols-[minmax(0,22rem)_1fr]" : "grid gap-8"}>
          <FactoryVideo
            src={video.contentUrl}
            poster={video.thumbnail}
            label={video.title}
            mode="feature"
            priority
            className={
              portrait
                ? "mx-auto aspect-9/16 w-full max-w-88 rounded-sm"
                : "aspect-video w-full rounded-sm"
            }
          />

          <div>
            <p className="mb-2 font-heading text-xs font-bold uppercase tracking-widest text-accent">
              {video.category}
            </p>
            <h1 className="mb-3 text-balance font-heading text-2xl font-bold uppercase leading-tight sm:text-3xl">
              {video.title}
            </h1>
            <p className="mb-6 text-sm text-muted-foreground sm:text-base">{video.description}</p>

            {sellsNails && <NailsOrderBox />}

            <section className="mt-8">
              <h2 className="mb-3 font-heading text-lg font-bold uppercase">Transcript</h2>
              <p
                lang={video.inLanguage}
                className="whitespace-pre-line rounded-sm border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground"
              >
                {video.transcript}
              </p>
            </section>

            {sellsNails && (
              <section className="mt-8 text-sm">
                <h2 className="mb-3 font-heading text-lg font-bold uppercase">More about these nails</h2>
                <ul className="list-disc space-y-1 pl-5">
                  <li>
                    <Link href={gerardNailsUrl} className="text-accent underline">
                      Gerard roofing nails: price, specs and online order
                    </Link>
                  </li>
                  {gerardNailsPosts.map((post) => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`} className="text-accent underline">
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="mb-4 font-heading text-lg font-bold uppercase">Related videos</h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((other) => (
                <li key={other.id}>
                  <Link
                    href={watchPagePath(other)}
                    className="flex gap-3 rounded-sm border border-border bg-card p-3 hover:border-accent/60"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- posters are already sized for the web */}
                    <img
                      src={other.thumbnail}
                      alt=""
                      loading="lazy"
                      className="h-24 w-14 shrink-0 rounded-sm object-cover"
                    />
                    <span className="text-sm font-medium">{other.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </div>
  );
}
