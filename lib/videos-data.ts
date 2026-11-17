export interface GalleryVideo {
  id: string;
  title: string;
  description: string;
  category: "Factory & Production" | "Installation" | "Product Demo" | "Testimonial";
  /** Self-hosted poster image, as a site-root-relative path. */
  thumbnail: string;
  /**
   * Self-hosted MP4, as a site-root-relative path. This is what makes the
   * video indexable — VideoObject schema is only worth as much as this field.
   * Never point this at a tiktok.com URL; TikTok's own player isn't crawlable
   * as this site's content. See docs/tiktok-integration-plan.md §2.1.
   *
   * These live in /public/videos and are served from Vercel's CDN. Google
   * needs absolute URLs in the schema, so /gallery resolves both this and
   * `thumbnail` against siteIdentity.siteUrl when it builds the JSON-LD.
   */
  contentUrl: string;
  /** ISO 8601 duration, e.g. "PT1M45S". */
  duration: string;
  /** ISO date the video was uploaded, e.g. "2026-06-01". */
  uploadDate: string;
  /** Set only if this same clip is also posted on TikTok. */
  tiktokVideoId?: string;
  /** Defaults to landscape. Portrait clips are 9:16 phone footage. */
  orientation?: "landscape" | "portrait";
  /**
   * Spoken words, cleaned up from a Whisper transcript. A video with a
   * transcript gets its own watch page at /videos/[id], where the video is
   * the main content and the transcript is visible text. That is what Google
   * needs before it will index a video, and the text gives answer engines
   * something to quote.
   */
  transcript?: string;
  /** BCP 47 language of the speech, e.g. "en-NG" or "pcm" (Nigerian Pidgin). */
  inLanguage?: string;
  /** Store product the video sells. Watch pages show its price and a buy button. */
  productSlug?: string;
}

/** Videos that have their own watch page (/videos/[id]). */
export const watchPageVideos = (): GalleryVideo[] =>
  galleryVideos.filter((video) => Boolean(video.transcript));

export const watchPagePath = (video: GalleryVideo) => `/videos/${video.id}`;

export const getVideo = (id: string) => galleryVideos.find((video) => video.id === id);

/** ISO 8601 duration ("PT1M4S") to whole seconds, as video sitemaps want. */
export function durationSeconds(iso: string): number {
  const match = /PT(?:(\d+)M)?(?:(\d+)S)?/.exec(iso);
  return match ? Number(match[1] ?? 0) * 60 + Number(match[2] ?? 0) : 0;
}

/**
 * VideoObject JSON-LD. Google rejects relative URLs here, so everything is
 * resolved against the canonical site URL.
 */
export function videoObjectJsonLd(video: GalleryVideo, siteUrl: string) {
  return {
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: `${siteUrl}${video.thumbnail}`,
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: `${siteUrl}${video.contentUrl}`,
    ...(video.transcript ? { transcript: video.transcript, url: `${siteUrl}${watchPagePath(video)}` } : {}),
    ...(video.inLanguage ? { inLanguage: video.inLanguage } : {}),
    ...(video.tiktokVideoId
      ? { embedUrl: `https://www.tiktok.com/embed/v2/${video.tiktokVideoId}` }
      : {}),
  };
}

// Web-encoded derivatives of the raw factory footage, produced with the recipe
// in docs/factory-video-assets.md. Four of the five also appear on the
// homepage; listing them here is what earns them a VideoObject entry.
export const galleryVideos: GalleryVideo[] = [
  {
    id: "hero-corrugation",
    title: "Long span sheet leaving the corrugation line",
    description:
      "A red long span aluminium roofing sheet coming off the corrugation machine at the Gods Promise Aluminium factory in Alimosho, Lagos.",
    category: "Factory & Production",
    thumbnail: "/videos/hero-corrugation.jpg",
    contentUrl: "/videos/hero-corrugation.mp4",
    duration: "PT9S",
    uploadDate: "2026-08-14",
  },
  {
    id: "coil-feed",
    title: "Feeding a coil into the long span machine",
    description:
      "An aluminium coil being loaded and fed into the long span corrugation machine at our Lagos factory — the first step in producing a roofing sheet.",
    category: "Factory & Production",
    thumbnail: "/videos/coil-feed.jpg",
    contentUrl: "/videos/coil-feed.mp4",
    duration: "PT10S",
    uploadDate: "2026-08-14",
  },
  {
    id: "sheet-inspection",
    title: "0.45mm black sheet coming off the line",
    description:
      "A factory worker watching a black 0.45mm aluminium roofing sheet come off the long span corrugation machine, alongside finished red profiles.",
    category: "Factory & Production",
    thumbnail: "/videos/sheet-inspection.jpg",
    contentUrl: "/videos/sheet-inspection.mp4",
    duration: "PT9S",
    uploadDate: "2026-08-14",
  },
  {
    id: "cut-to-length",
    title: "Cutting 60 metres from a black aluminium coil",
    description:
      "Staff measuring and cutting a 60 metre length from a black aluminium coil on the factory floor, showing how sheets are cut to the length a roof actually needs.",
    category: "Product Demo",
    thumbnail: "/videos/cut-to-length.jpg",
    contentUrl: "/videos/cut-to-length.mp4",
    duration: "PT11S",
    uploadDate: "2026-08-14",
  },
  {
    id: "coil-stock",
    title: "Aluminium coil stock in our factory",
    description:
      "Aluminium coils held in stock at the Gods Promise Aluminium factory in Lagos, across a range of colours and gauges from 0.40mm to 1.00mm.",
    category: "Factory & Production",
    thumbnail: "/videos/coil-stock.jpg",
    contentUrl: "/videos/coil-stock.mp4",
    duration: "PT34S",
    uploadDate: "2026-08-14",
  },

  // Gerard roofing nails. Raw footage is in public/t (gitignored); encoded per
  // docs/factory-video-assets.md at 720x1280. Transcripts come from
  // docs/nails-video-transcripts.md. The figures they speak (5kg pack, 4 per
  // carton, 20kg) must agree with lib/nails-content.ts.
  {
    id: "gerard-nails-wholesale-dealers",
    title: "Gerard Roofing Nails at Wholesale Price: 20kg Carton for Dealers",
    description:
      "Gods Promise supplies Gerard roofing nails at wholesale price to roofing sheet dealers, building materials shops, roofing companies and warehouse owners. Each 5kg pack is sold 4 to a 20kg carton for ₦23,000, with bulk discounts and nationwide delivery from Pleasure Bus Stop, Lagos.",
    category: "Product Demo",
    thumbnail: "/videos/gerard-nails-wholesale-dealers.jpg",
    contentUrl: "/videos/gerard-nails-wholesale-dealers.mp4",
    duration: "PT43S",
    uploadDate: "2026-11-17",
    orientation: "portrait",
    inLanguage: "en-NG",
    productSlug: "gerard-nail",
    transcript:
      "Do you sell Gerard roofing sheets? Do you own a roofing warehouse or a building materials shop? Come, let's talk business. When customers buy roofing sheets from you, they also need roofing nails. Stock both and supply them together. At God's Promise Group, we supply Gerard roofing nails at affordable wholesale prices to dealers, roofing companies and warehouse owners. Each pack contains 5kg, 4 packs in 1 carton, that's 20kg. We sell by the carton, with discounts available for bulk purchase. Our office is at Pleasure Bus Stop here in Lagos, and we arrange delivery nationwide. Send us a WhatsApp message with the number of cartons you need and let's give you our price. God's Promise Group, in God we trust.",
  },
  {
    id: "gerard-nails-wholesale-pidgin",
    title: "Gerard Roofing Nails for Wholesale Price (Pidgin): 4 Pack, 20kg Inside One Carton",
    description:
      "For Pidgin: God's Promise dey sell Gerard roofing nails for wholesale price. 4 pack dey inside one carton, 5kg each, 20kg altogether, ₦23,000 per carton. Visit us for Pleasure Bus Stop, Lagos. We dey deliver nationwide.",
    category: "Product Demo",
    thumbnail: "/videos/gerard-nails-wholesale-pidgin.jpg",
    contentUrl: "/videos/gerard-nails-wholesale-pidgin.mp4",
    duration: "PT40S",
    uploadDate: "2026-11-17",
    orientation: "portrait",
    inLanguage: "pcm",
    productSlug: "gerard-nail",
    transcript:
      "You dey sell Gerard roofing sheets and you no get the nails wey your customer want? Come, we get am. For God's Promise Group, we dey sell Gerard roofing nails for wholesale price. We dey sell in cartons so you fit stock up for your customers. Na 4 pack dey inside one carton. Inside each pack, we get 5kg. All together na 20kg dey inside one carton. No forget say na wholesale price we dey sell. You fit send us message today, make we supply your next stock. You fit visit us for Pleasure Bus Stop, Lagos, and we dey deliver nationwide.",
  },
  {
    id: "gerard-nails-ceo-launch",
    title: "Gerard Roofing Nails Launch: Over 2,000 Cartons Sold in 24 Hours",
    description:
      "Within 24 hours of launching its Gerard roofing nails at wholesale price, Gods Promise sold over 2,000 cartons and received an award for it. Each 20kg carton holds 4 packs of 5kg and costs ₦23,000.",
    category: "Testimonial",
    thumbnail: "/videos/gerard-nails-ceo-launch.jpg",
    contentUrl: "/videos/gerard-nails-ceo-launch.mp4",
    duration: "PT1M4S",
    uploadDate: "2026-11-17",
    orientation: "portrait",
    inLanguage: "pcm",
    productSlug: "gerard-nail",
    transcript:
      "E never reach 24 hours wey I launch my new Gerard roofing nail wey I dey sell for wholesale price, I don sell over 2,000 cartons, and dem don give me award. So what you dey wait for now? E dey available now. It's available. Affordable price. Warehouse price. It's available. Gerard roofing nail. Each pack is 5kg. One carton is 20kg. Four packs in one carton. It's available now. Contact me on the number displayed. Available, before e sold out.",
  },
  {
    id: "gerard-nails-closeup",
    title: "Gerard roofing nails up close: black coated, diamond point",
    description:
      "A close look inside a carton of Gerard roofing nails: black coated BWG 12 × 2 inch wire nails with diamond points, sold in 20kg cartons by Gods Promise Aluminium.",
    category: "Product Demo",
    thumbnail: "/videos/gerard-nails-closeup.jpg",
    contentUrl: "/videos/gerard-nails-closeup.mp4",
    duration: "PT22S",
    uploadDate: "2026-11-17",
    productSlug: "gerard-nail",
  },
];
