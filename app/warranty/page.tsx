import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Warranty & Returns | Gods Promise Aluminium',
	description:
		'Overview of product warranty, quality checks and returns process for aluminium roofing sheets supplied by Gods Promise Aluminium.',
};

export default function WarrantyPage() {
	return (
		<div className='min-h-screen bg-background'>
			<section className='bg-primary text-primary-foreground'>
				<div className='h-1 w-full bg-accent' />
				<div className='container px-4 mx-auto max-w-4xl py-16 md:py-20'>
					<p className='text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3'>
						Quality
					</p>
					<h1 className='font-heading uppercase font-bold text-4xl md:text-5xl text-balance'>
						Warranty &amp; Returns
					</h1>
				</div>
			</section>

			<section className='py-12 md:py-16'>
				<div className='container px-4 mx-auto max-w-4xl space-y-6'>
					<p className='text-sm text-muted-foreground md:text-base'>
						Basic information about how we stand behind the quality
						of our aluminium roofing sheets and what to do if there
						is a problem.
					</p>

					<div className='rounded-sm border border-border bg-card p-6'>
						<h2 className='font-heading font-bold text-base mb-2'>
							Product Quality and Checks
						</h2>
						<div className='text-sm text-muted-foreground space-y-2'>
							<p>
								Each order is produced to the agreed thickness,
								profile and colour. We encourage customers to
								verify their materials at our factory before
								dispatch.
							</p>
							<p>
								If you notice any issues with the supplied
								sheets, please contact us as soon as possible
								with your invoice and clear photos so we can
								investigate.
							</p>
						</div>
					</div>

					<div className='rounded-sm border border-border bg-card p-6'>
						<h2 className='font-heading font-bold text-base mb-2'>
							Returns and Complaints
						</h2>
						<div className='text-sm text-muted-foreground space-y-2'>
							<p>
								Because aluminium sheets are custom produced for
								each order, returns are handled on a
								case-by-case basis.
							</p>
							<p>
								Our goal is always to resolve genuine issues
								fairly and maintain a long-term relationship
								with our customers.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
