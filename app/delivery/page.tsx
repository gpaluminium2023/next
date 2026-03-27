import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Delivery & Coverage Areas | Gods Promise Aluminium',
	description:
		'Information about how Gods Promise Aluminium delivers aluminium roofing sheets from Lagos to projects across Nigeria, including typical timelines and requirements.',
};

export default function DeliveryPage() {
	return (
		<div className='min-h-screen bg-background'>
			<section className='bg-primary text-primary-foreground'>
				<div className='h-1 w-full bg-accent' />
				<div className='container px-4 mx-auto max-w-4xl py-16 md:py-20'>
					<p className='text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3'>
						Logistics
					</p>
					<h1 className='font-heading uppercase font-bold text-4xl md:text-5xl text-balance'>
						Delivery &amp; Coverage Areas
					</h1>
				</div>
			</section>

			<section className='py-12 md:py-16'>
				<div className='container px-4 mx-auto max-w-4xl space-y-6'>
					<p className='text-sm text-muted-foreground md:text-base'>
						We are based in Lagos and deliver aluminium roofing
						sheets and accessories to projects across Nigeria.
					</p>

					<div className='rounded-sm border border-border bg-card p-6'>
						<h2 className='font-heading font-bold text-base mb-2'>
							Where We Deliver
						</h2>
						<div className='text-sm text-muted-foreground space-y-2'>
							<p>
								We regularly arrange deliveries within Lagos
								State and to nearby states such as Ogun, Oyo,
								Osun and beyond.
							</p>
							<p>
								For projects in other parts of Nigeria, we will
								confirm transport options, costs and timelines
								when preparing your quote.
							</p>
						</div>
					</div>

					<div className='rounded-sm border border-border bg-card p-6'>
						<h2 className='font-heading font-bold text-base mb-2'>
							What to Know Before Delivery
						</h2>
						<div className='text-sm text-muted-foreground space-y-2'>
							<p>
								We confirm all quantities, colours and
								thicknesses with you before loading. We also
								encourage customers to verify their order at our
								factory when possible.
							</p>
							<p>
								Please ensure there is safe access for the truck
								and a team available to offload the materials on
								site.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
