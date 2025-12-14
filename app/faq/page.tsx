import type { Metadata } from 'next';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
	title: 'Frequently asked questions | Gods Promise Aluminium',
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
		<div className='bg-gradient-to-b from-primary/5 via-background to-background'>
			<section className='mx-auto max-w-4xl px-4 py-12 md:py-16'>
				<div className='mb-8 space-y-2 text-center'>
					<h1 className='text-3xl font-bold tracking-tight md:text-4xl'>
						Frequently asked questions
					</h1>
					<p className='text-sm text-muted-foreground md:text-base'>
						Short answers to common questions about aluminium
						roofing and working with Gods Promise Aluminium.
					</p>
				</div>
				<div className='space-y-4'>
					{faqs.map((faq) => (
						<Card key={faq.question}>
							<CardHeader>
								<CardTitle className='text-base font-semibold'>
									{faq.question}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-sm text-muted-foreground'>
									{faq.answer}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</section>
		</div>
	);
}
