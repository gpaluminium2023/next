import type { Metadata } from 'next';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
	title: 'Dealers & partners | Gods Promise Aluminium',
	description:
		'Information for dealers, distributors and roofing contractors interested in partnering with Gods Promise Aluminium.',
};

export default function DealersPage() {
	return (
		<div className='bg-gradient-to-b from-primary/5 via-background to-background'>
			<section className='mx-auto max-w-4xl px-4 py-12 md:py-16 space-y-8'>
				<div className='space-y-2'>
					<h1 className='text-3xl font-bold tracking-tight md:text-4xl'>
						Dealers & partners
					</h1>
					<p className='text-sm text-muted-foreground md:text-base'>
						We work with dealers, distributors and roofing
						contractors across Nigeria who want reliable aluminium
						roofing supply from Lagos.
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle className='text-base font-semibold'>
							How to get started
						</CardTitle>
					</CardHeader>
					<CardContent className='text-sm text-muted-foreground space-y-2'>
						<p>
							If you are interested in becoming a regular dealer
							or installation partner, please contact us with
							details of your business, location and typical order
							volumes.
						</p>
						<p>
							Our team will review your information and follow up
							to discuss how we can work together.
						</p>
					</CardContent>
				</Card>
			</section>
		</div>
	);
}
