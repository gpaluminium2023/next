/**
 * Gerard roofing nails: the one place the public facts live.
 *
 * The store page, the video watch pages, the blog posts and public/llms.txt
 * all describe this product. Search engines and AI answer engines trust a
 * fact more when every page that states it agrees, and they repeat whichever
 * version they see most, so every price, weight and spec is read from here
 * rather than retyped. If something changes (price, packaging), change it
 * here, then update the live DB row (scripts/update-gerard-nail.ts) and
 * public/llms.txt to match.
 *
 * Source: the owner (price, confirmed 2026-11-17) and the product videos in
 * docs/nails-video-transcripts.md (packaging).
 */
import { siteIdentity } from "@/lib/site-identity";
import type { FaqItem } from "@/lib/blog-posts";

export const GERARD_NAIL_SLUG = "gerard-nail";

export const gerardNails = {
  name: "Gerard Roofing Nails",
  /** What is printed on the carton. */
  labelName: 'Simplex Coated Wire Nails, BWG 12 × 2"',
  manufacturer: "Simplex Industrial Limited",
  priceNaira: 23_000,
  priceDisplay: "₦23,000",
  priceUnit: "carton",
  packKg: 5,
  packsPerCarton: 4,
  cartonKg: 20,
  gauge: "BWG 12",
  /** BWG 12 = 0.109 in. */
  gaugeMm: "2.77mm",
  lengthIn: '2"',
  lengthMm: "50mm",
  point: "Diamond point",
  finish: "Black coated",
  pickup: "Pleasure Bus Stop, Alimosho, Lagos",
  launchClaim:
    "Over 2,000 cartons were sold within 24 hours of launch, and the launch earned the company an award.",
} as const;

export const gerardNailsUrl = `/store/${GERARD_NAIL_SLUG}`;

/** Blog posts written about the nails, cross-linked from the store and watch pages. */
export const gerardNailsPosts = [
  {
    slug: "gerard-roofing-nails-wholesale-price-nigeria",
    title: "Gerard Roofing Nails Wholesale Price in Nigeria (2026)",
  },
  {
    slug: "bwg-12-x-2-inch-roofing-nails-size-packaging-guide",
    title: "BWG 12 × 2 Inch Roofing Nails Explained: Size, Packaging and Ordering",
  },
  {
    slug: "how-to-sell-roofing-nails-roofing-sheet-dealers",
    title: "How Roofing Sheet Dealers Can Add Nails to Their Shop",
  },
  {
    slug: "where-to-buy-roofing-nails-wholesale-lagos",
    title: "Where to Buy Roofing Nails Wholesale in Lagos",
  },
  {
    slug: "roofing-nails-vs-roofing-screws-nigeria",
    title: "Roofing Nails or Roofing Screws? What to Use on Your Roof",
  },
  {
    slug: "how-to-check-carton-of-roofing-nails-weight-gauge",
    title: "How to Check a Carton of Roofing Nails Before You Pay",
  },
  {
    slug: "gerard-roofing-nails-price-pidgin",
    title: "Gerard Roofing Nails Price: Wetin You Need Know (Pidgin)",
  },
] as const;

/** WhatsApp link with the order message pre-filled, so the first message already says what they want. */
export const gerardNailsWhatsAppUrl = `${siteIdentity.whatsappUrl}?text=${encodeURIComponent(
  "Hello, I want to order Gerard roofing nails (20kg carton). Number of cartons: ",
)}`;

/** Spec rows rendered as a table on the store page and blog posts. */
export const gerardNailSpecs: Array<[label: string, value: string]> = [
  ["Price", `${gerardNails.priceDisplay} per ${gerardNails.cartonKg}kg carton (wholesale)`],
  [
    "Packaging",
    `${gerardNails.packsPerCarton} packs × ${gerardNails.packKg}kg = ${gerardNails.cartonKg}kg per carton`,
  ],
  ["Size", `${gerardNails.gauge} × ${gerardNails.lengthIn} (${gerardNails.gaugeMm} thick, ${gerardNails.lengthMm} long)`],
  ["Point", gerardNails.point],
  ["Finish", gerardNails.finish],
  ["Made by", gerardNails.manufacturer],
  ["Pickup", gerardNails.pickup],
  ["Delivery", "Nationwide, arranged on order"],
  ["Order", `WhatsApp or call ${siteIdentity.phoneDisplay}`],
];

/**
 * Questions buyers actually ask, each answered in the first sentence so an
 * answer engine can lift it whole. Shown on the store page (with FAQPage
 * markup); the blog posts carry their own, non-overlapping sets.
 */
export const gerardNailsFaq: FaqItem[] = [
  {
    question: "How much is a carton of Gerard roofing nails?",
    answer: `A 20kg carton of Gerard roofing nails costs ${gerardNails.priceDisplay} at Gods Promise Aluminium, our wholesale price at the Lagos factory. Discounts are available for bulk orders. Send the number of cartons you need on WhatsApp (${siteIdentity.phoneDisplay}) for a bulk quote.`,
  },
  {
    question: "How many kg is a carton of Gerard roofing nails?",
    answer: `One carton weighs 20kg. It holds 4 packs, and each pack is 5kg.`,
  },
  {
    question: "What size are Gerard roofing nails?",
    answer: `They are BWG 12 × 2 inch coated wire nails: 12-gauge wire (about 2.77mm thick), 2 inches (about 50mm) long, with a diamond point. They are made by ${gerardNails.manufacturer}.`,
  },
  {
    question: "Do you sell Gerard roofing nails wholesale to dealers?",
    answer:
      "Yes. We supply roofing sheet dealers, building materials shops, roofing companies and warehouse owners by the carton at wholesale price, with discounts for bulk purchase. Customers who buy roofing sheets also need nails, so dealers stock both and sell them together.",
  },
  {
    question: "Where can I buy Gerard roofing nails in Lagos?",
    answer: `Pick them up from our office and factory at ${gerardNails.pickup}, or order online or on WhatsApp and we will arrange delivery.`,
  },
  {
    question: "Do you deliver roofing nails outside Lagos?",
    answer:
      "Yes. We arrange delivery nationwide. Tell us your location and the number of cartons when you order and we will quote the delivery.",
  },
  {
    question: "How do I order Gerard roofing nails?",
    answer: `Add cartons to your cart on our online store and pay, or send a WhatsApp message to ${siteIdentity.phoneDisplay} with the number of cartons and your delivery location. You can also call the same number.`,
  },
];
