export interface GalleryVideo {
  id: string;
  title: string;
  description: string;
  category: "Factory & Production" | "Installation" | "Product Demo" | "Testimonial";
  /** Self-hosted (Cloudinary) poster image — must be publicly reachable. */
  thumbnail: string;
  /**
   * Self-hosted (Cloudinary) MP4 URL. This is what makes the video
   * indexable — VideoObject schema is only worth as much as this field.
   * Never point this at a tiktok.com URL; TikTok's own player isn't
   * crawlable as this site's content. See docs/tiktok-integration-plan.md §2.1.
   */
  contentUrl: string;
  /** ISO 8601 duration, e.g. "PT1M45S". */
  duration: string;
  /** ISO date the video was uploaded, e.g. "2026-06-01". */
  uploadDate: string;
  /** Set only if this same clip is also posted on TikTok. */
  tiktokVideoId?: string;
}

// Populate with real Cloudinary-hosted clips as they're produced — e.g. via
// `npm run og:images`-style upload, or the Cloudinary console. Each entry
// renders as a self-hosted <video> on /gallery and gets its own VideoObject
// JSON-LD entry. Leave empty and the video section simply doesn't render.
export const galleryVideos: GalleryVideo[] = [];
