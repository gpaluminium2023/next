import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Terms & conditions | Gods Promise Aluminium',
	description:
		'Basic terms and conditions for using this website and purchasing aluminium roofing products from Gods Promise Aluminium.',
};

export default function TermsPage() {
	return (
		<div className='bg-gradient-to-b from-primary/5 via-background to-background'>
			<section className='mx-auto max-w-4xl px-4 py-12 md:py-16 space-y-6'>
				<h1 className='text-3xl font-bold tracking-tight md:text-4xl'>
					Terms & conditions
				</h1>
				<p className='text-sm text-muted-foreground md:text-base'>
					These are general terms for visitors and customers of Gods
					Promise Aluminium. They provide a simple overview and may be
					updated as our business grows.
				</p>
				<p className='text-sm text-muted-foreground'>
					By using this website or purchasing products from us, you
					agree that all orders are subject to written quotations,
					invoices and any specific agreements shared with you at the
					time of purchase.
				</p>
			</section>
		</div>
	);
}
