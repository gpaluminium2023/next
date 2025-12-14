import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Privacy policy | Gods Promise Aluminium',
	description:
		'How Gods Promise Aluminium handles personal information collected through this website, contact forms and WhatsApp enquiries.',
};

export default function PrivacyPage() {
	return (
		<div className='bg-gradient-to-b from-primary/5 via-background to-background'>
			<section className='mx-auto max-w-4xl px-4 py-12 md:py-16 space-y-6'>
				<h1 className='text-3xl font-bold tracking-tight md:text-4xl'>
					Privacy policy
				</h1>
				<p className='text-sm text-muted-foreground md:text-base'>
					This page explains, in simple terms, what information we
					collect, how we use it, and how you can contact us with any
					privacy questions.
				</p>
				<p className='text-sm text-muted-foreground'>
					When you contact us by phone, WhatsApp, email or through
					this website, we use your details only to respond to your
					enquiry, prepare quotes and manage your orders. We do not
					sell your data to third parties.
				</p>
			</section>
		</div>
	);
}
