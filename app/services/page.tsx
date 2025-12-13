import Link from 'next/link';
import Image from 'next/image';
import {
	Factory,
	Truck,
	HardHat,
	CheckCircle,
	ArrowRight,
	Phone,
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

export default function ServicesPage() {
	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<section className='relative bg-background py-16 md:py-24'>
				<div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
					<div className='mx-auto max-w-3xl text-center'>
						<div className='mb-6 flex flex-wrap items-center justify-center gap-3'>
							<Badge
								variant='outline'
								className='text-xs md:text-sm'
							>
								15+ Years of trusted service
							</Badge>
							<Badge
								variant='outline'
								className='text-xs md:text-sm'
							>
								1000+ roofs supplied & installed
							</Badge>
							<Badge
								variant='outline'
								className='text-xs md:text-sm'
							>
								Serving homes & projects across Nigeria
							</Badge>
						</div>

						<h1 className='mb-6 text-balance text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
							Complete Aluminium Roofing Services
						</h1>

						<p className='mx-auto max-w-2xl text-balance text-base text-muted-foreground md:text-lg'>
							From production to transportation and installation,
							Gods Promise Aluminium handles your roofing project
							end-to-end so you get a durable, beautiful roof with
							less stress.
						</p>
					</div>
				</div>
			</section>

			{/* Services Grid */}
			<section className='bg-muted/30 py-16 md:py-24'>
				<div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
					<div className='mb-12 text-center'>
						<h2 className='mb-4 text-2xl font-bold md:text-4xl'>
							Our Core Services
						</h2>
						<p className='mx-auto max-w-2xl text-muted-foreground'>
							Everything you need for a long-lasting aluminium
							roof, delivered by one reliable team.
						</p>
					</div>

					<div className='grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8'>
						{/* Production Service */}
						<Card className='border-2 transition-colors hover:border-primary/60 pt-0 overflow-clip rounded-2xl'>
							<div className='relative aspect-video overflow-hidden border-b bg-muted'>
								<Image
									src='/images/production.jpg'
									alt='Production of aluminium roofing sheets at Gods Promise Aluminium factory'
									fill
									className='object-cover'
									sizes='(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw'
								/>
							</div>
							<CardHeader>
								<div className='mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10'>
									<Factory className='h-6 w-6 text-primary' />
								</div>
								<CardTitle className='text-xl md:text-2xl'>
									Production
								</CardTitle>
								<CardDescription>
									Quality roofing sheets, cut to size
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<p className='text-sm text-muted-foreground'>
									We produce different types of corrugations
									using efficient equipment and quality
									aluminium, including popular profiles for
									Nigerian homes and projects.
								</p>

								<Separator />

								<ul className='space-y-3 text-sm'>
									{[
										'Metral',
										'Steptiles',
										'Normal',
										'Metrocoppo',
									].map((item) => (
										<li
											key={item}
											className='flex items-start gap-2'
										>
											<CheckCircle className='mt-0.5 h-4 w-4 shrink-0 text-primary' />
											<span>
												{item} profiles available
											</span>
										</li>
									))}
									<li className='flex items-start gap-2'>
										<CheckCircle className='mt-0.5 h-4 w-4 shrink-0 text-primary' />
										<span>
											Measured and cut to your exact roof
											size
										</span>
									</li>
								</ul>
							</CardContent>
						</Card>

						{/* Transportation Service */}
						<Card className='border-2 transition-colors hover:border-primary/60 pt-0 overflow-clip rounded-2xl'>
							<div className='relative aspect-video overflow-hidden border-b bg-muted'>
								<Image
									src='/images/transportation.jpg'
									alt='Transportation of aluminium roofing materials to project sites'
									fill
									className='object-cover'
									sizes='(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw'
								/>
							</div>
							<CardHeader>
								<div className='mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10'>
									<Truck className='h-6 w-6 text-primary' />
								</div>
								<CardTitle className='text-xl md:text-2xl'>
									Transportation
								</CardTitle>
								<CardDescription>
									Safe and timely delivery
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<p className='text-sm text-muted-foreground'>
									We arrange delivery of your roofing
									materials from our factory directly to your
									site, with careful handling throughout the
									journey.
								</p>

								<Separator />

								<ul className='space-y-3 text-sm'>
									{[
										'Reliable, experienced drivers',
										'Secure loading and packaging',
										'Delivery to your project location',
									]
										.concat([
											'Support for residential and commercial projects',
										])
										.map((feature) => (
											<li
												key={feature}
												className='flex items-start gap-2'
											>
												<CheckCircle className='mt-0.5 h-4 w-4 shrink-0 text-primary' />
												<span>{feature}</span>
											</li>
										))}
								</ul>
							</CardContent>
						</Card>

						{/* Installation Service */}
						<Card className='border-2 transition-colors hover:border-primary/60 pt-0 overflow-clip rounded-2xl'>
							<div className='relative aspect-video overflow-hidden border-b bg-muted'>
								<Image
									src='/images/installation.jpg'
									alt='Installation of aluminium roofing sheets by professional roofers'
									fill
									className='object-cover'
									sizes='(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw'
								/>
							</div>
							<CardHeader>
								<div className='mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10'>
									<HardHat className='h-6 w-6 text-primary' />
								</div>
								<CardTitle className='text-xl md:text-2xl'>
									Installation
								</CardTitle>
								<CardDescription>
									Professional on-site roofing work
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<p className='text-sm text-muted-foreground'>
									Our well-trained roofers carry out effective
									and efficient installation work so your roof
									performs and looks great for years.
								</p>

								<Separator />

								<ul className='space-y-3 text-sm'>
									{[
										'Qualified and supervised roofing teams',
										'Installation available on request',
										'Attention to safety and finishing details',
										'Post-installation checks and support',
									].map((feature) => (
										<li
											key={feature}
											className='flex items-start gap-2'
										>
											<CheckCircle className='mt-0.5 h-4 w-4 shrink-0 text-primary' />
											<span>{feature}</span>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Process Timeline */}
			<section className='bg-background py-16 md:py-24'>
				<div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
					<div className='mb-12 text-center'>
						<h2 className='mb-4 text-2xl font-bold md:text-4xl'>
							How We Work
						</h2>
						<p className='mx-auto max-w-2xl text-muted-foreground'>
							A simple, supervised process from your first call to
							a finished roof.
						</p>
					</div>

					<div className='grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-4'>
						{[
							{
								step: '01',
								title: 'Request a quote',
								description:
									'Share your building details and preferred roofing profile. We respond quickly with guidance and pricing.',
							},
							{
								step: '02',
								title: 'Measurement & planning',
								description:
									'Our team confirms measurements and quantities so production, delivery, and installation are accurate.',
							},
							{
								step: '03',
								title: 'Production & delivery',
								description:
									'We produce your sheets, package them securely, and arrange delivery to your project location.',
							},
							{
								step: '04',
								title: 'Professional installation',
								description:
									'If requested, our roofers install and finish your roof, supervised for quality at every stage.',
							},
						].map((item, index) => (
							<div
								key={item.step}
								className='relative'
							>
								<div className='flex flex-col items-center text-center md:items-start md:text-left'>
									<div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground'>
										{item.step}
									</div>
									<h3 className='mb-2 text-lg font-semibold'>
										{item.title}
									</h3>
									<p className='text-sm text-muted-foreground'>
										{item.description}
									</p>
								</div>
								{index < 3 && (
									<div className='absolute left-1/2 top-8 hidden h-0.5 w-full -translate-x-1/2 bg-muted md:block' />
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Why Choose Us */}
			<section className='bg-muted/30 py-16 md:py-24'>
				<div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 items-center gap-10 lg:grid-cols-2'>
						<div>
							<h2 className='mb-6 text-2xl font-bold md:text-4xl'>
								Why customers trust our services
							</h2>
							<p className='mb-8 text-muted-foreground'>
								We combine good materials, careful supervision,
								and reliable people so every stage of your
								roofing project is covered.
							</p>

							<div className='space-y-6'>
								<div className='flex gap-4'>
									<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10'>
										<CheckCircle className='h-5 w-5 text-primary' />
									</div>
									<div>
										<h3 className='mb-1 font-semibold'>
											End-to-end support
										</h3>
										<p className='text-sm text-muted-foreground'>
											One team to handle production,
											transportation, and installation so
											you deal with fewer vendors.
										</p>
									</div>
								</div>

								<div className='flex gap-4'>
									<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10'>
										<CheckCircle className='h-5 w-5 text-primary' />
									</div>
									<div>
										<h3 className='mb-1 font-semibold'>
											Well-supervised work
										</h3>
										<p className='text-sm text-muted-foreground'>
											All services are supervised so you
											get neat finishing, correct
											quantities, and reliable timelines.
										</p>
									</div>
								</div>

								<div className='flex gap-4'>
									<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10'>
										<CheckCircle className='h-5 w-5 text-primary' />
									</div>
									<div>
										<h3 className='mb-1 font-semibold'>
											Experience with Nigerian projects
										</h3>
										<p className='text-sm text-muted-foreground'>
											From homes to larger sites, we
											understand local conditions, sites,
											and expectations.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className='relative'>
							<div className='aspect-square overflow-hidden rounded-2xl bg-muted'>
								{/* Placeholder imagery block */}
								<div className='flex h-full w-full flex-col items-center justify-center gap-2 text-center'>
									<div className='rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary'>
										Placeholder image
									</div>
									<p className='max-w-xs text-xs text-muted-foreground'>
										This area can later show your team
										working on-site, trucks in motion, or
										your factory.
									</p>
								</div>
							</div>

							<Card className='absolute bottom-6 left-6 right-6 shadow-lg md:bottom-10 md:left-10 md:right-auto'>
								<CardContent className='p-4 md:p-5'>
									<div className='grid grid-cols-3 gap-4 text-center text-xs md:text-sm'>
										<div>
											<div className='text-xl font-bold text-primary md:text-2xl'>
												15+
											</div>
											<div className='text-muted-foreground'>
												Years in service
											</div>
										</div>
										<div>
											<div className='text-xl font-bold text-primary md:text-2xl'>
												1000+
											</div>
											<div className='text-muted-foreground'>
												Projects handled
											</div>
										</div>
										<div>
											<div className='text-xl font-bold text-primary md:text-2xl'>
												5+
											</div>
											<div className='text-muted-foreground'>
												Service locations
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='bg-primary py-16 text-primary-foreground md:py-24'>
				<div className='mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8'>
					<h2 className='mb-4 text-balance text-2xl font-bold md:text-4xl'>
						Ready to discuss your roofing project?
					</h2>
					<p className='mx-auto mb-8 max-w-2xl text-balance text-base text-primary-foreground/90 md:text-lg'>
						Reach out for a free discussion about measurements,
						profiles, and costing. We are happy to guide you before
						you decide.
					</p>

					<div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
						<Button
							size='lg'
							variant='secondary'
							className='w-full sm:w-auto'
							asChild
						>
							<Link href='/contact'>
								Request a quote
								<ArrowRight className='ml-2 h-4 w-4' />
							</Link>
						</Button>

						<Button
							size='lg'
							variant='outline'
							className='w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto'
							asChild
						>
							<a href='tel:09150459964'>
								<Phone className='mr-2 h-4 w-4' /> Call us
								directly
							</a>
						</Button>
					</div>

					<p className='mt-8 text-sm text-primary-foreground/75'>
						288 Abeokuta Expressway, Pleasure B/Stop, Iyana Ipaja,
						Lagos State
					</p>
				</div>
			</section>
		</div>
	);
}
