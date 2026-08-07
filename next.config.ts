import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    // AVIF first: ~25–35% smaller than WebP on photographs, which is what
    // every blog cover and gallery shot here is. Next falls back to WebP,
    // then the original, per the browser's Accept header.
    formats: ["image/avif", "image/webp"],
    // Blog covers never change once published, so let an optimised variant
    // live in the edge cache for a month. Left at the default, entries expire
    // far sooner and a visitor landing on a cold URL waits for a full Sharp
    // transform before the first image byte arrives — which lands directly in
    // LCP. With 53 blog URLs each carrying its own cover, those cold hits are
    // common at this traffic level rather than rare.
    minimumCacheTTL: 2678400, // 31 days
  },

  // Redirect old .html URLs to clean paths
  async redirects() {
    return [
      {
        source: "/about.html",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/products.html",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/services.html",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/contact.html",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/blog/aluminum-roofing-sheet-price-lagos-2025",
        destination: "/blog/aluminum-roofing-sheet-price-lagos",
        permanent: true,
      },
    ];
  },

  // Add PostHog API rewrites
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },

  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
