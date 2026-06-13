import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PosthogProvider } from "@/components/posthog-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { localBusinessJsonLd, siteIdentity } from "@/lib/site-identity";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteIdentity.siteUrl),
  alternates: {
    canonical: "/",
  },
  title: siteIdentity.brandName,
  description:
    "Premium aluminium roofing and construction materials in Nigeria.",
  openGraph: {
    title: siteIdentity.brandName,
    description:
      "Premium aluminium roofing sheets, stone-coated tiles and accessories for Nigerian projects.",
    url: siteIdentity.siteUrl,
    type: "website",
    images: [
      {
        url: siteIdentity.logoPath,
        width: 1200,
        height: 630,
        alt: `${siteIdentity.brandName} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteIdentity.brandName,
    description:
      "Roofing sheets, stone-coated tiles and accessories supplied and installed across Nigeria.",
    images: [siteIdentity.logoPath],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </head>
      <body
        className={`${barlowCondensed.variable} ${dmSans.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PosthogProvider>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </PosthogProvider>
        </ThemeProvider>
        <GoogleAnalytics gaId="G-ZFRS3K0XR5" />
      </body>
    </html>
  );
}
