import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { getActiveThemeForDate } from '@/lib/theme-config';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Gods Promise Aluminium',
	description:
		'Premium aluminium roofing and construction materials in Nigeria.',
	openGraph: {
		title: 'Gods Promise Aluminium',
		description:
			'Premium aluminium roofing sheets, stone-coated tiles and accessories for Nigerian projects.',
		url: 'https://godspromisealuminiumroofing.com',
		type: 'website',
		images: [
			{
				url: '/opengraph-image',
				width: 1200,
				height: 630,
				alt: 'Gods Promise Aluminium 1f31ff premium roofing in Nigeria',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Gods Promise Aluminium',
		description:
			'Roofing sheets, stone-coated tiles and accessories supplied and installed across Nigeria.',
		images: ['/twitter-image'],
	},
	icons: {
		icon: [
			{ url: '/favicon.ico', sizes: 'any' },
			{ url: '/icon', type: 'image/png' },
		],
		apple: [{ url: '/apple-icon', type: 'image/png' }],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const theme = getActiveThemeForDate();

	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground ${theme.bodyClass}`}
			>
				<div className='flex min-h-screen flex-col'>
					<SiteHeader />
					<main className='flex-1'>{children}</main>
					<SiteFooter />
				</div>
			</body>
		</html>
	);
}
