import type { Metadata } from 'next';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
	title: 'Warranty & returns | Gods Promise Aluminium',
	description:
		'Overview of product warranty, quality checks and returns process for aluminium roofing sheets supplied by Gods Promise Aluminium.',
};

export default function WarrantyPage() {
	return (
		<div className='bg-gradient-to-b from-primary/5 via-background to-background'>
			<section className='mx-auto max-w-4xl px-4 py-12 md:py-16 space-y-8'>
				<div className='space-y-2'>
					<h1 className='text-3xl font-bold tracking-tight md:text-4xl'>
						Warranty & returns
					</h1>
					<p className='text-sm text-muted-foreground md:text-base'>
						Basic information about how we stand behind the quality
						of our aluminium roofing sheets and what to do if there
						is a problem.
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle className='text-base font-semibold'>
							Product quality and checks
						</CardTitle>
					</CardHeader>
					<CardContent className='text-sm text-muted-foreground space-y-2'>
						<p>
							Each order is produced to the agreed thickness,
							profile and colour. We encourage customers to verify
							their materials at our factory before dispatch.
						</p>
						<p>
							If you notice any issues with the supplied sheets,
							please contact us as soon as possible with your
							invoice and clear photos so we can investigate.
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className='text-base font-semibold'>
							Returns and complaints
						</CardTitle>
					</CardHeader>
					<CardContent className='text-sm text-muted-foreground space-y-2'>
						<p>
							Because aluminium sheets are custom produced for
							each order, returns are handled on a case-by-case
							basis.
						</p>
						<p>
							Our goal is always to resolve genuine issues fairly
							and maintain a long-term relationship with our
							customers.
						</p>
					</CardContent>
				</Card>
			</section>
		</div>
	);
}
