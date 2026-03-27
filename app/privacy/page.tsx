import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Privacy Policy | Gods Promise Aluminium',
	description:
		'How Gods Promise Aluminium handles personal information collected through this website, contact forms and WhatsApp enquiries.',
};

export default function PrivacyPage() {
	return (
		<div className='min-h-screen bg-background'>
			<section className='bg-primary text-primary-foreground'>
				<div className='h-1 w-full bg-accent' />
				<div className='container px-4 mx-auto max-w-4xl py-16 md:py-20'>
					<p className='text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3'>
						Legal
					</p>
					<h1 className='font-heading uppercase font-bold text-4xl md:text-5xl text-balance'>
						Privacy Policy
					</h1>
				</div>
			</section>

			<section className='py-12 md:py-16'>
				<div className='container px-4 mx-auto max-w-4xl space-y-4 text-sm text-muted-foreground'>
					<p className='md:text-base'>
						This page explains, in simple terms, what information we
						collect, how we use it, and how you can contact us with
						any privacy questions.
					</p>
					<p>
						When you contact us by phone, WhatsApp, email or through
						this website, we use your details only to respond to
						your enquiry, prepare quotes and manage your orders. We
						do not sell your data to third parties.
					</p>
				</div>
			</section>
		</div>
	);
}
