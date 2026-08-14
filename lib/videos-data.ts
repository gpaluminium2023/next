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
];
