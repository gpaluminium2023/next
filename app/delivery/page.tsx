import type { Metadata } from 'next';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
	title: 'Delivery & coverage areas | Gods Promise Aluminium',
	description:
		'Information about how Gods Promise Aluminium delivers aluminium roofing sheets from Lagos to projects across Nigeria, including typical timelines and requirements.',
};

export default function DeliveryPage() {
	return (
		<div className='bg-gradient-to-b from-primary/5 via-background to-background'>
			<section className='mx-auto max-w-4xl px-4 py-12 md:py-16 space-y-8'>
				<div className='space-y-2'>
					<h1 className='text-3xl font-bold tracking-tight md:text-4xl'>
						Delivery & coverage areas
					</h1>
					<p className='text-sm text-muted-foreground md:text-base'>
						We are based in Lagos and deliver aluminium roofing
						sheets and accessories to projects across Nigeria.
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle className='text-base font-semibold'>
							Where we deliver
						</CardTitle>
					</CardHeader>
					<CardContent className='text-sm text-muted-foreground space-y-2'>
						<p>
							We regularly arrange deliveries within Lagos State
							and to nearby states such as Ogun, Oyo, Osun and
							beyond.
						</p>
						<p>
							For projects in other parts of Nigeria, we will
							confirm transport options, costs and timelines when
							preparing your quote.
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className='text-base font-semibold'>
							What to know before delivery
						</CardTitle>
					</CardHeader>
					<CardContent className='text-sm text-muted-foreground space-y-2'>
						<p>
							We confirm all quantities, colours and thicknesses
							with you before loading. We also encourage customers
							to verify their order at our factory when possible.
						</p>
						<p>
							Please ensure there is safe access for the truck and
							a team available to offload the materials on site.
						</p>
					</CardContent>
				</Card>
			</section>
		</div>
	);
}
