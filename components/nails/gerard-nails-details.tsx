import Link from "next/link";

import { FactoryVideo } from "@/components/factory-video";
import { NailsOrderBox } from "@/components/nails/nails-order-box";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  GERARD_NAIL_SLUG,
  gerardNails,
  gerardNailSpecs,
  gerardNailsFaq,
  gerardNailsPosts,
} from "@/lib/nails-content";
import { galleryVideos, watchPagePath } from "@/lib/videos-data";

export const gerardNailVideos = () =>
  galleryVideos.filter((video) => video.productSlug === GERARD_NAIL_SLUG);

/**
 * Everything the generic store page doesn't know about the nails: specs,
 * the videos, buyer questions, and direct call/WhatsApp ordering for dealers
 * who won't check out through a cart. Rendered by app/store/[slug] for the
 * gerard-nail product only. The FAQ here must match the FAQPage JSON-LD
 * that page emits, because markup has to describe visible content.
 */
export function GerardNailsDetails() {
  const videos = gerardNailVideos();

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <p className="mb-8 rounded-sm border-l-4 border-accent bg-card p-4 text-sm sm:text-base">
        <strong>Launch record:</strong> {gerardNails.launchClaim}
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 font-heading text-xl font-bold uppercase sm:text-2xl">Specifications</h2>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-border border-y border-border">
              {gerardNailSpecs.map(([label, value]) => (
                <tr key={label}>
                  <th scope="row" className="w-32 py-2 pr-4 text-left font-medium text-muted-foreground">
                    {label}
                  </th>
                  <td className="py-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2 className="mb-4 font-heading text-xl font-bold uppercase sm:text-2xl">Order by carton</h2>
          <NailsOrderBox showStoreLink={false} />
        </div>
      </div>

      {videos.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 font-heading text-xl font-bold uppercase sm:text-2xl">Watch: Gerard roofing nails</h2>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {videos.map((video) => (
              <li key={video.id} className="flex flex-col">
                <FactoryVideo
                  src={video.contentUrl}
                  poster={video.thumbnail}
                  label={video.title}
                  mode="feature"
                  className={
                    video.orientation === "portrait"
                      ? "aspect-9/16 w-full rounded-sm"
                      : "aspect-9/16 w-full rounded-sm [&_video]:object-contain"
                  }
                />
                <p className="mt-2 text-sm font-medium">{video.title}</p>
                {video.transcript && (
                  <Link href={watchPagePath(video)} className="mt-1 text-xs text-accent underline">
                    Watch with transcript &rarr;
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-12">
        <h2 className="mb-4 font-heading text-xl font-bold uppercase sm:text-2xl">Questions buyers ask</h2>
        <Accordion type="single" collapsible className="w-full">
          {gerardNailsFaq.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`}>
              <AccordionTrigger className="text-left text-sm font-medium">{item.question}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-6 text-sm">
          Read more:{" "}
          {gerardNailsPosts.map((post, index) => (
            <span key={post.slug}>
              {index > 0 && " · "}
              <Link href={`/blog/${post.slug}`} className="text-accent underline">
                {post.title}
              </Link>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
