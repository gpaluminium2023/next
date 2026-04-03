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
