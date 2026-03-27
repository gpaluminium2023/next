import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Frequently Asked Questions | Gods Promise Aluminium',
	description:
		'Answers to common questions about aluminium roofing sheet prices, thickness, delivery and installation from Gods Promise Aluminium in Lagos, Nigeria.',
};

const faqs = [
	{
		question: 'Do you deliver aluminium roofing sheets outside Lagos?',
		answer: 'Yes. Gods Promise Aluminium is based in Lagos but we supply and arrange delivery to projects across Nigeria. Delivery cost depends on your location and order size.',
	},
	{
		question: 'What thickness of aluminium roofing sheet should I choose?',
		answer: 'The best thickness depends on your budget, project type and location. As a general guide, 0.45mm is common for budget projects while 0.55mm is preferred where extra durability is required. Our team can advise when you share your project details.',
	},
];

export default function FaqPage() {
	return (
		<div className='min-h-screen bg-background'>
			<section className='bg-primary text-primary-foreground'>
				<div className='h-1 w-full bg-accent' />
				<div className='container px-4 mx-auto max-w-4xl py-16 md:py-20'>
					<p className='text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3'>
						Support
					</p>
					<h1 className='font-heading uppercase font-bold text-4xl md:text-5xl text-balance'>
						Frequently Asked Questions
					</h1>
				</div>
			</section>

			<section className='py-12 md:py-16'>
				<div className='container px-4 mx-auto max-w-4xl space-y-4'>
					{faqs.map((faq) => (
						<div
							key={faq.question}
							className='rounded-sm border border-border bg-card p-6'
						>
							<h2 className='font-heading font-bold text-base mb-2'>
								{faq.question}
							</h2>
							<p className='text-sm text-muted-foreground'>
								{faq.answer}
							</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
