import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const factoryImages = [
	'1.jpg',
	'3.jpg',
	'4.jpg',
	'5.jpg',
	'6.jpg',
	'7.jpg',
	'8.jpg',
	'9.jpg',
	'10.jpg',
];

const jobImages = ['residential-roofing.jpg'];

const galleryImages = [
	...jobImages.map((name) => ({
		category: 'Completed roof',
		src: `/gallery/jobs/${name}`,
		alt: 'Completed aluminium roofing job supplied by Gods Promise Aluminium',
	})),
	...factoryImages.map((name, index) => ({
		category: 'Factory & production',
		src: `/gallery/factory/${name}`,
		alt: `Inside the Gods Promise Aluminium factory and production area (${
			index + 1
		})`,
	})),
];

export default function GalleryPage() {
	return (
		<div className='bg-linear-to-b from-primary/5 via-background to-background'>
			{/* Hero */}
			<section className='border-b bg-background/60 py-12 md:py-16'>
				<div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
					<div className='mx-auto max-w-3xl text-center space-y-4'>
						<Badge
							variant='secondary'
							className='text-xs sm:text-sm'
						>
							Our work in the field
						</Badge>
						<h1 className='text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl'>
							Project gallery & roof inspiration
						</h1>
						<p className='text-pretty text-sm text-muted-foreground sm:text-base lg:text-lg'>
							Explore a selection of aluminium roofing,
							stone-coated tiles, and accessories supplied and
							installed by Gods Promise Aluminium across Nigeria.
						</p>

						<div className='flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground'>
							<div className='flex items-center gap-2'>
								<span className='inline-flex h-2 w-2 rounded-full bg-primary' />
								<span>
									1000+ projects supplied and installed
								</span>
							</div>
							<Separator
								orientation='vertical'
								className='hidden h-4 sm:inline-flex'
							/>
							<div className='flex items-center gap-2'>
								<span className='inline-flex h-2 w-2 rounded-full bg-primary/70' />
								<span>
									Roofs for homes, churches, and businesses
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Category tags (non-interactive chips) */}
			<section className='border-b bg-muted/30 py-6'>
				<div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
					<div className='flex flex-wrap items-center gap-3 text-xs sm:text-sm'>
						<span className='text-muted-foreground'>
							Showing examples of:
						</span>
						<Badge variant='outline'>
							Aluminium roofing sheets
						</Badge>
						<Badge variant='outline'>Stone-coated tiles</Badge>
						<Badge variant='outline'>
							Accessories & flat sheets
						</Badge>
						<Badge variant='outline'>Before & after</Badge>
					</div>
				</div>
			</section>

			{/* Gallery grid */}
			<section className='py-10 md:py-16'>
				<div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
					<div className='mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
						<div>
							<h2 className='text-2xl font-semibold text-foreground sm:text-3xl'>
								Recent roofs & supplied projects
							</h2>
							<p className='mt-1 max-w-xl text-sm text-muted-foreground sm:text-base'>
								These photos show real shots from our factory
								and completed roofing jobs supplied by Gods
								Promise Aluminium.
							</p>
						</div>
						<Button
							asChild
							variant='outline'
							className='text-xs sm:text-sm'
						>
							<Link href='/products'>View product details</Link>
						</Button>
					</div>

					<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
						{galleryImages.map((item, index) => (
							<Card
								key={item.src}
								className='group flex h-full flex-col overflow-hidden border bg-card/90 shadow-sm transition-transform duration-150 hover:-translate-y-1 hover:shadow-md pt-0'
							>
								<div className='relative aspect-[4/3] w-full overflow-hidden bg-muted'>
									<Image
										src={item.src}
										alt={item.alt}
										fill
										className='object-cover transition-transform duration-200 group-hover:scale-105'
										sizes='(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
									/>
								</div>
								<CardHeader className='space-y-2 pb-2'>
									<div className='flex items-start justify-between gap-2'>
										<CardTitle className='text-sm font-semibold sm:text-base'>
											{item.category}
										</CardTitle>
										<Badge
											variant='secondary'
											className='shrink-0 text-[10px] uppercase tracking-[0.14em]'
										>
											Ref {index + 1}
										</Badge>
									</div>
									<p className='text-xs text-muted-foreground sm:text-sm'>
										{item.alt}
									</p>
								</CardHeader>
								<CardContent className='mt-auto flex items-center justify-between border-t px-4 py-3 text-xs text-muted-foreground'>
									<span>
										{item.category === 'Completed roof'
											? 'Site photo'
											: 'Factory & production area'}
									</span>
									<span className='hidden text-[11px] uppercase tracking-[0.16em] text-primary/80 sm:inline'>
										Project reference
									</span>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className='bg-muted/40 py-10 md:py-16'>
				<div className='mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8'>
					<Card className='border bg-card/90 shadow-sm'>
						<CardHeader className='space-y-2'>
							<CardTitle className='text-xl font-semibold sm:text-2xl lg:text-3xl'>
								Ready to add your project to this gallery?
							</CardTitle>
							<p className='text-sm text-muted-foreground sm:text-base'>
								Share your building details, preferred roofing
								profile, and estimated roof size. We&apos;ll
								recommend the right aluminium roofing sheets,
								stone-coated tiles, and accessories for your
								project.
							</p>
						</CardHeader>
						<CardContent>
							<div className='flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4'>
								<Button
									asChild
									size='lg'
									className='w-full sm:w-auto'
								>
									<Link href='/contact'>Request a quote</Link>
								</Button>
								<Button
									asChild
									size='lg'
									variant='outline'
									className='w-full bg-transparent sm:w-auto'
								>
									<a href='tel:09150459964'>Call us now</a>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	);
}
