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
		slug: 'aluminum-roofing-sheet-price-lagos-2025',
		title: 'How Much Do Aluminum Roofing Sheets Cost in Lagos, Nigeria in 2025?',
		excerpt:
			'A practical guide to current aluminum roofing sheet prices in Lagos, the factors that affect cost, and how to get an accurate WhatsApp quote from Gods Promise Aluminium.',
		body: [
			'Many homeowners and contractors in Lagos are confused by different aluminium roofing sheet prices, thicknesses and profiles. In this guide, we explain the main factors that affect price, share realistic price ranges you can expect in Lagos, and show you how to get an accurate WhatsApp quote from Gods Promise Aluminium.',
			'Prices in 2025 are affected by exchange rates, raw material costs and logistics, so any figures you see online should be treated as a guide, not a final quote. The most accurate way to know your cost is still to share your roof details with a trusted manufacturer.',
		],
		date: '2025-01-01',
		imageSrc: '/gallery/factory/6.jpg',
		imageAlt:
			'Aluminium roofing sheets and production line at Gods Promise Aluminium factory in Lagos.',
		readingTimeMinutes: 8,
		featured: true,
	},
];
