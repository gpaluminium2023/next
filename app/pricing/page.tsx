import type { Metadata } from 'next';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
	title: 'Pricing & quotes | Gods Promise Aluminium',
	description:
		'Learn how aluminium roofing sheet pricing works at Gods Promise Aluminium and what information you need to get an accurate WhatsApp quote in Lagos and across Nigeria.',
};

export default function PricingPage() {
	return (
		<div className='bg-gradient-to-b from-primary/5 via-background to-background'>
			<section className='mx-auto max-w-4xl px-4 py-12 md:py-16 space-y-8'>
				<div className='space-y-2 text-center'>
					<h1 className='text-3xl font-bold tracking-tight md:text-4xl'>
						Pricing & how to get a quote
					</h1>
					<p className='text-sm text-muted-foreground md:text-base'>
						A simple overview of how we calculate aluminium roofing
						sheet prices and what we need from you to prepare an
						accurate quote.
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle className='text-base font-semibold'>
							What affects your roofing sheet price
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-2 text-sm text-muted-foreground'>
						<p>
							Key factors include sheet thickness (0.45mm or
							0.55mm), profile (long span, step-tile or
							stone-coated), colour and coating, quantity, and
							project location.
						</p>
						<p>
							Because raw material and transport costs change with
							market conditions, we prepare fresh quotes instead
							of publishing fixed prices.
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className='text-base font-semibold'>
							Information to share for an accurate quote
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-2 text-sm text-muted-foreground'>
						<ul className='list-disc space-y-1 pl-5'>
							<li>
								Roof plan or basic dimensions (length and
								width).
							</li>
							<li>
								Roof type (e.g. bungalow, duplex, church, hall).
							</li>
							<li>
								Preferred profile (long span, step-tile,
								stone-coated).
							</li>
							<li>
								Selected thickness (0.45mm / 0.55mm) if known.
							</li>
							<li>
								Project location in Lagos or elsewhere in
								Nigeria.
							</li>
						</ul>
						<p>
							Send these details via WhatsApp or our contact form
							and our team will respond with an itemised quote.
						</p>
					</CardContent>
				</Card>
			</section>
		</div>
	);
}
