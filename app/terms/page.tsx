import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Terms & Conditions | Gods Promise Aluminium',
	description:
		'Basic terms and conditions for using this website and purchasing aluminium roofing products from Gods Promise Aluminium.',
};

export default function TermsPage() {
	return (
		<div className='min-h-screen bg-background'>
			<section className='bg-primary text-primary-foreground'>
				<div className='h-1 w-full bg-accent' />
				<div className='container px-4 mx-auto max-w-4xl py-16 md:py-20'>
					<p className='text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3'>
						Legal
					</p>
					<h1 className='font-heading uppercase font-bold text-4xl md:text-5xl text-balance'>
						Terms &amp; Conditions
					</h1>
				</div>
			</section>

			<section className='py-12 md:py-16'>
				<div className='container px-4 mx-auto max-w-4xl space-y-4 text-sm text-muted-foreground'>
					<p className='md:text-base'>
						These are general terms for visitors and customers of
						Gods Promise Aluminium. They provide a simple overview
						and may be updated as our business grows.
					</p>
					<p>
						By using this website or purchasing products from us,
						you agree that all orders are subject to written
						quotations, invoices and any specific agreements shared
						with you at the time of purchase.
					</p>
				</div>
			</section>
		</div>
	);
}
