import Link from 'next/link';
import Image from 'next/image';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function Home() {
	return (
		<div className='bg-linear-to-b from-primary/5 via-background to-background'>
			<main className='mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-4 py-10 md:px-8 md:py-16'>
				{/* Hero */}
				<section className='grid gap-10 lg:grid-cols-2 lg:items-center'>
					<div className='space-y-6'>
						<Badge className='border border-primary/20 bg-primary/5 text-primary'>
							🇳🇬 Proudly Nigerian Aluminium Experts
						</Badge>
						<h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-foreground'>
							Durable, quality aluminium roofing for your next
							project.
						</h1>
						<p className='max-w-xl text-base md:text-lg text-muted-foreground'>
							Gods Promise Aluminium is an aluminium marketing
							company established and registered in Nigeria. We
							are business-men and engineers focused on providing
							durable, quality aluminium products backed by
							technical innovation.
						</p>
						<div className='flex flex-wrap gap-3'>
							<Button
								asChild
								className='rounded-full px-6'
								size='lg'
							>
								<Link href='/contact'>Get a free quote</Link>
							</Button>
							<Button
								asChild
								className='rounded-full border px-6'
								size='lg'
								variant='outline'
							>
								<Link href='/products'>View products</Link>
							</Button>
						</div>
					</div>

					<Card className='overflow-hidden border-none shadow-lg pt-0'>
						<div className='relative aspect-video w-full bg-slate-900/90 dark:bg-slate-900'>
							<Image
								src='/images/ceo-two.jpg'
								alt='CEO of Gods Promise Aluminium in the factory, representing a business built on promise'
								fill
								className='object-cover'
								sizes='(min-width: 1024px) 50vw, 100vw'
								priority
							/>
							<div className='absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-6 pb-5 pt-10 text-sm text-slate-100'>
								<p className='text-xs uppercase tracking-[0.2em] text-primary'>
									Projects across Nigeria
								</p>
								<p className='mt-1 text-sm'>
									Long span, stone-coated tiles and flat
									sheets designed for the Nigerian climate.
								</p>
							</div>
						</div>
						<CardHeader className='pb-3'>
							<CardTitle className='text-base font-semibold tracking-tight'>
								Why choose Gods Promise
							</CardTitle>
						</CardHeader>
						<CardContent className='grid gap-3 text-sm'>
							<ValueItem
								title='Integrity'
								description='We deliver exactly what we promise, every time.'
								iconSrc='/icons/integrity.png'
								iconAlt='Gears with checkmarks representing reliable processes'
							/>
							<ValueItem
								title='Customer satisfaction'
								description='Transparency, flexibility and accountability guide every customer interaction.'
								iconSrc='/icons/excellence.png'
								iconAlt='Hand reaching for a star representing customer success'
							/>
							<ValueItem
								title='Accountability'
								description='We keep detailed records and stand behind every product from our factory.'
								iconSrc='/icons/accounting.png'
								iconAlt='Calculator and coins representing transparent pricing and records'
							/>
							<ValueItem
								title='Excellence'
								description='Continuous improvement and a clear standard of operation to serve you better.'
								iconSrc='/icons/trophy.png'
								iconAlt='Trophy representing excellence and high standards'
							/>
						</CardContent>
					</Card>
				</section>

				{/* Our core products */}
				<section className='space-y-10'>
					<div className='flex flex-col gap-3 text-center md:flex-row md:items-end md:justify-between md:text-left'>
						<div>
							<h2 className='text-2xl font-semibold text-foreground'>
								Our core products
							</h2>
							<p className='mt-1 text-sm max-w-xl text-muted-foreground'>
								All thicknesses and colours are available at
								affordable prices for residential, commercial
								and industrial projects.
							</p>
						</div>
						<Button
							asChild
							className='h-9 rounded-full px-4 text-xs md:text-sm'
							variant='outline'
						>
							<Link href='/products'>View full product list</Link>
						</Button>
					</div>

					<div className='grid gap-6 md:grid-cols-3'>
						<ProductCard
							badge='Roofing sheets'
							title='Long span roofing sheets'
							description='Durable profiles for homes, churches and commercial buildings, with accurate gauges and trusted colours.'
							imageSrc='/core-products/roof1.jpg'
							imageAlt='Example of a completed aluminium long span roofing sheet installation'
						/>
						<ProductCard
							badge='Stone tiles'
							title='Stone coated roof tiles'
							description='Shingle, Classic, Bond and more – combining aesthetics with long-lasting protection.'
							imageSrc='/core-products/stonetiles.jpg'
							imageAlt='Stone-coated roofing tiles installed on a building roof'
						/>
						<ProductCard
							badge='Flat sheets'
							title='Aluminium flat sheets'
							description='Versatile sheets in multiple thicknesses for custom fabrication and finishing.'
							imageSrc='/core-products/flatsheet.jpg'
							imageAlt='Stack of coloured aluminium flat sheets ready for fabrication'
						/>
					</div>
				</section>

				{/* How it works */}
				<section className='space-y-8'>
					<div className='text-center space-y-2'>
						<h2 className='text-2xl font-semibold text-foreground'>
							Easy to get started
						</h2>
						<p className='text-sm max-w-xl mx-auto text-muted-foreground'>
							Move from enquiry to verified delivery in three
							simple steps.
						</p>
					</div>

					<div className='relative'>
						<div className='pointer-events-none absolute left-8 right-8 top-8 hidden h-px bg-slate-200 dark:bg-slate-800 lg:block' />
						<div className='grid gap-6 lg:grid-cols-3 lg:gap-10'>
							<StepCard
								step='01'
								title='Check products'
								description='Browse our range of roofing sheets, stone tiles and flat sheets to confirm availability.'
							/>
							<StepCard
								step='02'
								title='Place order'
								description='Contact us or visit our factory and our team will guide you through your order.'
							/>
							<StepCard
								step='03'
								title='Verify order'
								description='Cross-check every item at our factory before transportation to your site.'
							/>
						</div>
					</div>
				</section>

				{/* Contact strip / CTA */}
				<section className='rounded-2xl border border-primary/10 bg-primary px-5 py-6 text-sm text-primary-foreground shadow-sm'>
					<div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
						<div>
							<p className='text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/80'>
								Contact information
							</p>
							<p className='mt-1 text-sm font-medium'>
								Ready to start your roofing project? Talk to our
								team today.
							</p>
							<p className='mt-1 text-xs opacity-90'>
								288 Abeokuta Expressway, Pleasure B/Stop, Iyana
								Ipaja, Lagos State (by Ilepo way)
							</p>
						</div>
						<div className='space-y-1 text-xs md:text-right'>
							<p className='opacity-90'>
								godspromisealuminumconceptltd@gmail.com
							</p>
							<p className='opacity-90'>
								09150459964 · 07040249854 · 07060414466 ·
								08146074077
							</p>
						</div>
					</div>
				</section>

				<Separator className='mt-4' />
			</main>
		</div>
	);
}

type ValueItemProps = {
	title: string;
	description: string;
	iconSrc: string;
	iconAlt: string;
};

function ValueItem({ title, description, iconSrc, iconAlt }: ValueItemProps) {
	return (
		<div className='flex gap-3'>
			<div className='mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary'>
				<Image
					src={iconSrc}
					alt={iconAlt}
					width={20}
					height={20}
					className='h-5 w-5'
				/>
			</div>
			<div>
				<p className='text-sm font-medium text-slate-900 dark:text-slate-50'>
					{title}
				</p>
				<p className='text-xs text-slate-600 dark:text-slate-300'>
					{description}
				</p>
			</div>
		</div>
	);
}

type ProductCardProps = {
	badge: string;
	title: string;
	description: string;
	imageSrc: string;
	imageAlt: string;
};

function ProductCard({
	badge,
	title,
	description,
	imageSrc,
	imageAlt,
}: ProductCardProps) {
	return (
		<Card className='overflow-hidden border border-slate-200/70 bg-white/90 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80 p-0'>
			<div className='relative aspect-video w-full bg-slate-100 dark:bg-slate-900/80'>
				<Image
					src={imageSrc}
					alt={imageAlt}
					fill
					className='object-cover'
					sizes='(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
				/>
			</div>
			<CardHeader className='space-y-2 pb-3'>
				<Badge
					variant='secondary'
					className='w-fit text-[11px] uppercase tracking-[0.16em]'
				>
					{badge}
				</Badge>
				<CardTitle className='text-base font-semibold leading-snug'>
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent className='text-xs text-slate-600 dark:text-slate-300'>
				{description}
			</CardContent>
			<CardFooter className='pt-3'>
				<Button
					asChild
					variant='ghost'
					size='sm'
					className='ml-auto h-8 px-2 text-xs'
				>
					<Link href='/products'>Learn more</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}

type StepCardProps = {
	step: string;
	title: string;
	description: string;
};

function StepCard({ step, title, description }: StepCardProps) {
	return (
		<Card className='relative border-none bg-white/90 shadow-sm dark:bg-slate-900/80'>
			<CardHeader className='pb-2'>
				<div className='flex items-center justify-center'>
					<div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-md'>
						{step}
					</div>
				</div>
				<CardTitle className='mt-3 text-center text-sm font-semibold'>
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent className='px-6 pb-6 text-center text-xs text-slate-600 dark:text-slate-300'>
				{description}
			</CardContent>
		</Card>
	);
}
