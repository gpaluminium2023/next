export type BlogPost = {
	slug: string;
	title: string;
	excerpt: string;
	body: string[]; // full post body as paragraphs
	date: string; // ISO date string
	imageSrc?: string;
	imageAlt?: string;
	readingTimeMinutes?: number;
	featured?: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "aluminum-roofing-sheet-price-lagos-2025",
    title:
      "How Much Do Aluminum Roofing Sheets Cost in Lagos, Nigeria in 2025?",
    excerpt:
      "A practical guide to current aluminum roofing sheet prices in Lagos, the factors that affect cost, and how to get an accurate WhatsApp quote from Gods Promise Aluminium.",
    body: [
      "Many homeowners and contractors in Lagos are confused by different aluminium roofing sheet prices, thicknesses and profiles. In this guide, we explain the main factors that affect price, share realistic price ranges you can expect in Lagos, and show you how to get an accurate WhatsApp quote from Gods Promise Aluminium.",
      "Prices in 2025 are affected by exchange rates, raw material costs and logistics, so any figures you see online should be treated as a guide, not a final quote. The most accurate way to know your cost is still to share your roof details with a trusted manufacturer.",
      "The type of aluminium roofing profile you choose has a significant impact on total cost. Long span sheets are generally the most affordable option, followed by step-tile profiles which offer a more traditional tile-like appearance at a slightly higher price. Stone-coated tiles cost more per square metre but provide enhanced durability and a premium decorative finish that many estate developers and high-end homeowners prefer.",
      "Thickness also plays a key role in pricing. The most common gauges sold in Lagos are 0.45mm and 0.55mm. A thicker sheet costs more per metre but offers better resistance to wind uplift, hail damage and general wear over time. For most residential buildings, 0.45mm provides adequate performance, while 0.55mm is recommended for commercial buildings, coastal properties and areas prone to heavy rainfall.",
    ],
    date: "2025-01-01",
    imageSrc: "/gallery/factory/6.jpg",
    imageAlt:
      "Aluminium roofing sheets and production line at Gods Promise Aluminium factory in Lagos.",
    readingTimeMinutes: 8,
    featured: true,
  },
];
