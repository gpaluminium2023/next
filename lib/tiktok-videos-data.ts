export interface FeaturedTikTokVideo {
  /** The numeric video ID from the TikTok video URL. */
  videoId: string;
  caption: string;
}

// Populate with a handful of the account's best factory/installation clips
// to show as a "Follow us on TikTok" strip. These are secondary social proof
// — not a substitute for the self-hosted videos in lib/videos-data.ts, which
// are what's actually indexable. See docs/tiktok-integration-plan.md §2.1–2.2.
export const featuredTikTokVideos: FeaturedTikTokVideo[] = [];
