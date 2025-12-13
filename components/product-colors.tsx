import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const COLOR_OPTIONS = [
	{ slug: 'beige', label: 'Beige', imageSrc: '/gallery/colors/beige.jpg' },
	{ slug: 'black', label: 'Black', imageSrc: '/gallery/colors/black.jpg' },
	{
		slug: 'bushgreen',
		label: 'Bush green',
		imageSrc: '/gallery/colors/bushgreen.jpg',
	},
	{
		slug: 'deepblue',
		label: 'Deep blue',
		imageSrc: '/gallery/colors/deepblue.jpg',
	},
	{
		slug: 'navyblue',
		label: 'Navy blue',
		imageSrc: '/gallery/colors/navyblue.jpg',
	},
	{
		slug: 'nutbrown',
		label: 'Nut brown',
		imageSrc: '/gallery/colors/nutbrown.jpg',
	},
	{
		slug: 'palegreen',
		label: 'Pale green',
		imageSrc: '/gallery/colors/palegreen.jpg',
	},
	{ slug: 'tcred', label: 'TC red', imageSrc: '/gallery/colors/tcred.jpg' },
];

export function ProductColors() {
	return (
		<section className='border-y bg-muted/30 py-12 sm:py-16'>
			<div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
				<div className='mb-8 text-center sm:mb-10'>
					<h2 className='mb-3 text-2xl font-bold sm:text-3xl lg:text-4xl'>
						Available roofing colours
					</h2>
					<p className='mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base'>
						A selection of popular aluminium roofing colours often
						requested by our customers. Actual colours may vary
						slightly depending on lighting and screen.
					</p>
				</div>

				<div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
					{COLOR_OPTIONS.map((color) => (
						<Card
							key={color.slug}
							className='overflow-hidden border bg-card/90 shadow-sm p-0'
						>
							<div className='relative h-32 w-full bg-muted sm:h-36'>
								<Image
									src={color.imageSrc}
									alt={`${color.label} roofing colour sample`}
									fill
									className='object-cover'
									sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw'
								/>
							</div>
							<CardHeader className=''>
								<CardTitle className='text-sm font-semibold sm:text-base py-0'>
									{color.label}
								</CardTitle>
							</CardHeader>
							<CardContent className='pt-0 text-xs text-muted-foreground sm:text-sm'>
								Typical aluminium roofing sheet colour used on
								residential and project roofs.
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
