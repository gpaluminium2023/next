import Link from 'next/link';
import Image from 'next/image';
import {
	ArrowRight,
	CheckCircle2,
	Mail,
	MessageCircle,
	Phone,
	Ruler,
	Shield,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ProductColors } from '@/components/product-colors';

export default function ProductsPage() {
	return (
		<div className='min-h-screen bg-background'>
			{/* Hero Section */}
			<section className='relative overflow-hidden border-b bg-muted/30'>
				<div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]' />
				<div className='relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8'>
					<div className='mx-auto max-w-3xl text-center'>
						<Badge
							variant='secondary'
							className='mb-4 text-xs sm:text-sm'
						>
							Premium aluminium products you can trust
						</Badge>
						<h1 className='mb-4 text-balance text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
							Roofing sheets, tiles & accessories
						</h1>
						<p className='text-pretty text-base text-muted-foreground sm:text-lg lg:text-xl'>
							Durable, accurately measured and carefully finished
							aluminium products for homes and projects across
							Nigeria.
						</p>
					</div>
				</div>
			</section>

			{/* Product Categories Grid */}
			<section className='mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
				<div className='mb-10 text-center'>
					<h2 className='mb-3 text-2xl font-bold sm:text-3xl lg:text-4xl'>
						Our main product groups
					</h2>
					<p className='mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base'>
						Choose from trusted roofing sheets, stone-coated tiles,
						and a full range of accessories to complete your roof.
					</p>
				</div>

				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{/* Aluminium Roofing Sheets */}
					<Card className='group relative overflow-hidden transition-all rounded-xl hover:shadow-lg'>
						<div className='relative aspect-4/3 overflow-hidden rounded-t-xl bg-muted'>
							<Image
								src='/images/flatsheet.jpg'
								alt='Coloured aluminium flat sheets from Gods Promise Aluminium ready for installation'
								fill
								className='object-cover'
								sizes='(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
								priority
							/>
						</div>
						<CardHeader>
							<div className='flex items-start justify-between gap-2'>
								<CardTitle className='text-xl sm:text-2xl'>
									Aluminium roofing sheets
								</CardTitle>
								<Badge
									variant='outline'
									className='shrink-0 text-xs'
								>
									Most popular
								</Badge>
							</div>
							<CardDescription className='text-sm sm:text-base'>
								Long-lasting, lightweight sheets available in
								different profiles, thicknesses and colours.
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='space-y-2'>
								<p className='text-sm font-medium'>
									Corrugation types:
								</p>
								<div className='flex flex-wrap gap-2 text-xs'>
									<Badge variant='secondary'>Long span</Badge>
									<Badge variant='secondary'>Steptiles</Badge>
									<Badge variant='secondary'>Metcoppo</Badge>
									<Badge variant='secondary'>Normal</Badge>
								</div>
							</div>
							<ul className='space-y-2 text-sm'>
								{[
									'All thicknesses available',
									'Multiple standard colours',
									'Accurate measurement and cutting',
									'Suitable for residential and project work',
								].map((item) => (
									<li
										key={item}
										className='flex items-start gap-2'
									>
										<CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-primary' />
										<span className='text-muted-foreground'>
											{item}
										</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>

					{/* Stone-Coated Roofing Tiles */}
					<Card className='group relative overflow-hidden transition-all rounded-xl hover:shadow-lg'>
						<div className='relative aspect-4/3 overflow-hidden rounded-t-xl bg-muted'>
							<Image
								src='/images/stonetiles.jpg'
								alt='Coloured aluminium flat sheets from Gods Promise Aluminium ready for installation'
								fill
								className='object-cover'
								sizes='(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
								priority
							/>
						</div>
						<CardHeader>
							<div className='flex items-start justify-between gap-2'>
								<CardTitle className='text-xl sm:text-2xl'>
									Stone-coated tiles
								</CardTitle>
								<Badge
									variant='outline'
									className='shrink-0 text-xs'
								>
									Premium look
								</Badge>
							</div>
							<CardDescription className='text-sm sm:text-base'>
								Elegant roofing with natural stone finish,
								available in multiple profiles and colours.
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='space-y-2'>
								<p className='text-sm font-medium'>
									Popular profiles:
								</p>
								<div className='flex flex-wrap gap-2 text-xs'>
									<Badge variant='secondary'>Bond</Badge>
									<Badge variant='secondary'>Classic</Badge>
									<Badge variant='secondary'>Milano</Badge>
									<Badge variant='secondary'>Shingle</Badge>
								</div>
							</div>
							<ul className='space-y-2 text-sm'>
								{[
									'Quiet and comfortable in rain',
									'Good heat and sound control',
									'Strong against wind and harsh weather',
									'Adds value and beauty to your building',
								].map((item) => (
									<li
										key={item}
										className='flex items-start gap-2'
									>
										<CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-primary' />
										<span className='text-muted-foreground'>
											{item}
										</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>

					{/* Roofing Accessories */}
					<Card className='group relative overflow-hidden transition-all rounded-xl hover:shadow-lg'>
						<div className='relative aspect-4/3 overflow-hidden rounded-t-xl bg-muted'>
							<Image
								src='/images/pnail.jpg'
								alt='Coloured aluminium flat sheets from Gods Promise Aluminium ready for installation'
								fill
								className='object-cover'
								sizes='(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
								priority
							/>
						</div>
						<CardHeader>
							<CardTitle className='text-xl sm:text-2xl'>
								Roofing accessories
							</CardTitle>
							<CardDescription className='text-sm sm:text-base'>
								Everything you need to finish and protect your
								roof properly.
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='space-y-2'>
								<p className='text-sm font-medium'>
									Available items include:
								</p>
								<div className='flex flex-wrap gap-2 text-xs'>
									<Badge variant='secondary'>
										Drive screws
									</Badge>
									<Badge variant='secondary'>
										Seam bolts
									</Badge>
									<Badge variant='secondary'>
										Nails & washers
									</Badge>
									<Badge variant='secondary'>Felt</Badge>
									<Badge variant='secondary'>Silicone</Badge>
									<Badge variant='secondary'>
										Flash band
									</Badge>
								</div>
							</div>
							<ul className='space-y-2 text-sm'>
								{[
									'Corrosion-resistant materials',
									'Selected to match our roofing sheets',
									'Helps prevent leaks and future problems',
									'Available in project quantities',
								].map((item) => (
									<li
										key={item}
										className='flex items-start gap-2'
									>
										<CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-primary' />
										<span className='text-muted-foreground'>
											{item}
										</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</div>
			</section>

			<ProductColors />

			{/* Why Buy From Us Section */}
			<section className='border-y bg-muted/40 py-12 sm:py-16'>
				<div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
					<div className='mx-auto max-w-3xl text-center'>
						<h2 className='mb-3 text-balance text-2xl font-bold sm:text-3xl lg:text-4xl'>
							Why buy from Gods Promise Aluminium?
						</h2>
						<p className='mb-8 text-pretty text-sm text-muted-foreground sm:mb-10 sm:text-base'>
							Many people buy from open markets and later discover
							mistakes in thickness, colour or measurement. We
							focus on accurate, supervised supply so you can
							relax.
						</p>
					</div>

					<div className='mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3'>
						<Card className='border-primary/20 bg-card text-center'>
							<CardHeader className='pb-4'>
								<div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
									<Ruler className='h-6 w-6 text-primary' />
								</div>
								<CardTitle className='text-lg sm:text-xl'>
									Accurate measurements
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-sm text-muted-foreground'>
									All thicknesses and lengths are carefully
									measured and cut so you get what you paid
									for.
								</p>
							</CardContent>
						</Card>

						<Card className='border-primary/20 bg-card text-center'>
							<CardHeader className='pb-4'>
								<div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
									<Shield className='h-6 w-6 text-primary' />
								</div>
								<CardTitle className='text-lg sm:text-xl'>
									Trusted quality
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-sm text-muted-foreground'>
									We use reliable materials and supervise
									production so your roof remains strong and
									neat for years.
								</p>
							</CardContent>
						</Card>

						<Card className='border-primary/20 bg-card text-center sm:col-span-2 lg:col-span-1'>
							<CardHeader className='pb-4'>
								<div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
									<CheckCircle2 className='h-6 w-6 text-primary' />
								</div>
								<CardTitle className='text-lg sm:text-xl'>
									Support before & after
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-sm text-muted-foreground'>
									We help you choose profiles, estimate
									quantities and support your roofer with any
									questions.
								</p>
							</CardContent>
						</Card>
					</div>

					<div className='mx-auto mt-8 max-w-4xl rounded-lg border bg-card p-6 sm:mt-12 sm:p-8'>
						<div className='grid gap-6 sm:grid-cols-3'>
							<div className='text-center'>
								<div className='mb-2 text-3xl font-bold text-primary sm:text-4xl'>
									15+
								</div>
								<div className='text-xs text-muted-foreground sm:text-sm'>
									Years serving customers
								</div>
							</div>
							<Separator
								orientation='vertical'
								className='hidden sm:block'
							/>
							<div className='text-center'>
								<div className='mb-2 text-3xl font-bold text-primary sm:text-4xl'>
									1000+
								</div>
								<div className='text-xs text-muted-foreground sm:text-sm'>
									Roofs and projects supplied
								</div>
							</div>
							<Separator
								orientation='vertical'
								className='hidden sm:block'
							/>
							<div className='text-center'>
								<div className='mb-2 text-3xl font-bold text-primary sm:text-4xl'>
									100%
								</div>
								<div className='text-xs text-muted-foreground sm:text-sm'>
									Focus on customer satisfaction
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
				<div className='mx-auto max-w-4xl rounded-2xl border bg-gradient-to-br from-primary/5 to-primary/10 p-8 text-center sm:p-12'>
					<h2 className='mb-3 text-balance text-2xl font-bold sm:text-3xl lg:text-4xl'>
						Ready to get a product quote?
					</h2>
					<p className='mb-6 text-pretty text-sm text-muted-foreground sm:mb-8 sm:text-base lg:text-lg'>
						Share your building type, preferred profile and
						estimated roof size. Our team will respond with options
						and pricing.
					</p>

					<div className='flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4'>
						<Button
							size='lg'
							className='w-full gap-2 sm:w-auto'
							asChild
						>
							<Link href='/contact'>
								<Mail className='h-4 w-4' />
								Request a quote
								<ArrowRight className='h-4 w-4' />
							</Link>
						</Button>
						<Button
							size='lg'
							variant='outline'
							className='w-full gap-2 bg-transparent sm:w-auto'
							asChild
						>
							<a href='tel:09150459964'>
								<Phone className='h-4 w-4' />
								Call us now
							</a>
						</Button>
					</div>

					<Separator className='my-6 sm:my-8' />

					<div className='flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground sm:flex-row sm:gap-6'>
						<div className='flex items-center gap-2'>
							<MessageCircle className='h-4 w-4' />
							<a
								href='https://wa.me/2349150459964'
								target='_blank'
								rel='noopener'
								className='hover:text-primary underline-offset-4 hover:underline'
							>
								WhatsApp support (+234 915 045 9964)
							</a>
						</div>
						<Separator
							orientation='vertical'
							className='hidden h-4 sm:block'
						/>
						<div className='flex items-center gap-2'>
							<Phone className='h-4 w-4' />
							<span>
								Phone lines as listed on the contact page
							</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
