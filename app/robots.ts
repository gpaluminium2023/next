import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ??
  "https://www.godspromisealuminiumroofing.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/anltks/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
