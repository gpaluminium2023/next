import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Dealers & Partners | Gods Promise Aluminium',
	description:
		'Information for dealers, distributors and roofing contractors interested in partnering with Gods Promise Aluminium.',
};

export default function DealersPage() {
	return (
		<div className='min-h-screen bg-background'>
			<section className='bg-primary text-primary-foreground'>
				<div className='h-1 w-full bg-accent' />
				<div className='container px-4 mx-auto max-w-4xl py-16 md:py-20'>
					<p className='text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3'>
						Partnership
					</p>
					<h1 className='font-heading uppercase font-bold text-4xl md:text-5xl text-balance'>
						Dealers &amp; Partners
					</h1>
				</div>
			</section>

			<section className='py-12 md:py-16'>
				<div className='container px-4 mx-auto max-w-4xl'>
					<p className='text-sm text-muted-foreground md:text-base mb-6'>
						We work with dealers, distributors and roofing
						contractors across Nigeria who want reliable aluminium
						roofing supply from Lagos.
					</p>
					<div className='rounded-sm border border-border bg-card p-6'>
						<h2 className='font-heading font-bold text-base mb-2'>
							How to Get Started
						</h2>
						<div className='text-sm text-muted-foreground space-y-2'>
							<p>
								If you are interested in becoming a regular
								dealer or installation partner, please contact
								us with details of your business, location and
								typical order volumes.
							</p>
							<p>
								Our team will review your information and follow
								up to discuss how we can work together.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
