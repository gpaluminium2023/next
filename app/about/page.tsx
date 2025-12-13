import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const stats = [
	{ id: 1, value: '950+', label: 'Satisfied clients' },
	{ id: 2, value: '15+', label: 'Years of experience' },
	{ id: 3, value: '1000+', label: 'Completed projects' },
	{ id: 4, value: '24/7', label: 'Customer support' },
];

const values = [
	{
		id: 1,
		title: 'Integrity',
		description:
			'We keep our word, deliver on time, and stand behind every roof we install.',
	},
	{
		id: 2,
		title: 'Quality',
		description:
			'We use durable materials and careful workmanship so your roof lasts for years.',
	},
	{
		id: 3,
		title: 'Customer care',
		description:
			'From first call to final installation, we communicate clearly and serve with respect.',
	},
	{
		id: 4,
		title: 'Excellence',
		description:
			'We pay attention to the small details that make a big difference.',
	},
];

const milestones = [
	{
		year: '2009',
		title: 'Company founded in Nigeria',
		description:
			'Gods Promise Aluminium begins serving homeowners, builders, and churches with aluminium roofing products.',
	},
	{
		year: '2015',
		title: 'Expanded production capacity',
		description:
			'We invest in better machinery and a stronger team to serve more clients across the country.',
	},
	{
		year: '2020',
		title: 'Over 1000 completed projects',
		description:
			'Our roofs protect homes, sanctuaries, and commercial buildings in multiple states.',
	},
	{
		year: 'Today',
		title: 'Growing with our customers',
		description:
			'We continue to innovate, improve, and support every client long after installation.',
	},
];

export default function AboutPage() {
	return (
		<div className='bg-gradient-to-b from-primary/5 via-background to-background'>
			{/* Hero / Intro */}
			<section className='relative overflow-hidden py-16 md:py-24'>
				<div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
					<div className='mx-auto max-w-3xl space-y-4 text-center'>
						<Badge
							variant='secondary'
							className='mb-1'
						>
							Trusted by builders and homeowners across Nigeria
						</Badge>
						<h1 className='text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
							About Gods Promise Aluminium
						</h1>
						<p className='text-pretty text-lg text-muted-foreground md:text-xl'>
							We are a Nigerian-owned company providing durable
							aluminium roofing, stone tiles, and accessories that
							keep homes, churches, and businesses beautifully
							protected.
						</p>
					</div>
				</div>
			</section>

			{/* Stats */}
			<section className='py-8 pb-16 md:py-10'>
				<div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6'>
						{stats.map((stat) => (
							<Card
								key={stat.id}
								className='border-border/60 text-center'
							>
								<CardContent className='px-4 py-6'>
									<div className='mb-1 text-3xl font-bold text-primary md:text-4xl'>
										{stat.value}
									</div>
									<p className='text-sm text-muted-foreground md:text-base'>
										{stat.label}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Company overview */}
			<section className='py-12 md:py-20'>
				<div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
					<div className='grid items-center gap-10 md:grid-cols-2'>
						<div>
							<h2 className='mb-4 text-balance text-3xl font-bold md:text-4xl'>
								Built on promise, powered by experience
							</h2>
							<div className='space-y-4 text-base leading-relaxed text-muted-foreground'>
								<p>
									Gods Promise Aluminium is a full-service
									aluminium roofing and building materials
									company. From our workshop in Nigeria, we
									produce and supply roofing sheets, stone
									coated tiles, and accessories for projects
									of all sizes.
								</p>
								<p>
									Over the years we&apos;ve grown with our
									customers, learning the challenges builders
									and homeowners face and shaping our services
									to meet them. We believe every structure
									deserves a roof that is both strong and
									beautiful.
								</p>
								<p>
									Whether you are covering a new home,
									renovating a sanctuary, or completing a
									commercial project, our team is ready to
									guide you from product selection through to
									delivery and installation support.
								</p>
							</div>
						</div>

						<div className='relative'>
							<div className='relative aspect-video overflow-hidden rounded-2xl border border-primary/30 bg-muted'>
								<Image
									src='/gallery/factory/6.jpg'
									alt='Inside the Gods Promise Aluminium factory showing a bright, organised workshop and finished roofing sheets.'
									fill
									className='object-cover'
									sizes='(min-width: 1024px) 50vw, 100vw'
									priority
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Mission & Vision */}
			<section className='py-12 md:py-20'>
				<div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
					<h2 className='mb-10 text-center text-3xl font-bold md:text-4xl'>
						Our mission & vision
					</h2>
					<div className='grid gap-6 md:grid-cols-2 lg:gap-8'>
						<Card className='border-l-4 border-l-primary/80'>
							<CardHeader>
								<CardTitle className='text-2xl'>
									Our mission
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='leading-relaxed text-muted-foreground'>
									To supply high-quality aluminium roofing
									products and services that give lasting
									protection, comfort, and peace of mind to
									every customer we serve.
								</p>
							</CardContent>
						</Card>

						<Card className='border-l-4 border-l-primary/80'>
							<CardHeader>
								<CardTitle className='text-2xl'>
									Our vision
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='leading-relaxed text-muted-foreground'>
									To be the most trusted name in aluminium
									roofing in Nigeria and beyond, known for
									integrity, excellence, and dependable
									service on every project.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Core values */}
			<section className='bg-accent/10 py-12 md:py-20'>
				<div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
					<div className='mx-auto mb-10 max-w-2xl text-center'>
						<h2 className='mb-4 text-3xl font-bold md:text-4xl'>
							Our core values
						</h2>
						<p className='text-muted-foreground'>
							These simple principles shape how we work with every
							client, supplier, and team member.
						</p>
					</div>

					<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
						{values.map((value) => (
							<Card
								key={value.id}
								className='h-full transition-shadow hover:shadow-md'
							>
								<CardHeader>
									<CardTitle className='text-lg font-semibold'>
										{value.title}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className='text-sm leading-relaxed text-muted-foreground'>
										{value.description}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Experience / milestones */}
			<section className='bg-muted/30 py-12 md:py-20'>
				<div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
					<h2 className='mb-10 text-center text-3xl font-bold md:text-4xl'>
						Our experience
					</h2>
					<div className='space-y-6'>
						{milestones.map((milestone, index) => (
							<div
								key={index}
								className='flex items-start gap-4'
							>
								<Badge
									variant='outline'
									className='mt-1 shrink-0'
								>
									{milestone.year}
								</Badge>
								<div>
									<h3 className='mb-1 font-semibold'>
										{milestone.title}
									</h3>
									<p className='text-sm text-muted-foreground'>
										{milestone.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Leadership */}
			<section className='py-12 md:py-20'>
				<div className='mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
					<h2 className='mb-10 text-center text-3xl font-bold md:text-4xl'>
						Leadership
					</h2>
					<Card className='mx-auto max-w-3xl'>
						<CardContent className='py-8'>
							<div className='flex flex-col items-center gap-6 md:flex-row md:items-start'>
								<Avatar className='size-24 md:size-28 ring-2 ring-primary/20'>
									<AvatarImage
										src='/images/profile.jpg'
										alt='Profile photo representing the leadership of Gods Promise Aluminium'
									/>
									<AvatarFallback>GP</AvatarFallback>
								</Avatar>
								<div className='flex-1 text-center md:text-left'>
									<h3 className='mb-1 text-2xl font-semibold'>
										Our leadership team
									</h3>
									<p className='mb-4 text-sm text-muted-foreground'>
										Guided by experience, driven by service.
									</p>
									<Separator className='my-4' />
									<p className='leading-relaxed text-muted-foreground'>
										Behind every successful project is a
										committed team of managers, supervisors,
										and craftsmen. Our leadership brings
										years of hands-on industry experience to
										ensure that every order is processed
										accurately and every customer is treated
										with care.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* CTA */}
			<section className='pb-16 pt-8 md:pb-20 md:pt-10'>
				<div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
					<Card className='border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background'>
						<CardContent className='py-10 text-center md:py-12'>
							<h2 className='mb-4 text-balance text-3xl font-bold md:text-4xl'>
								Ready to plan your next roof?
							</h2>
							<p className='mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground'>
								Share your project details with us and
								we&apos;ll help you choose the right aluminium
								roofing solution for your budget and design.
							</p>
							<div className='flex flex-col justify-center gap-4 sm:flex-row'>
								<Button
									size='lg'
									asChild
								>
									<a href='/contact'>Get in touch</a>
								</Button>
								<Button
									size='lg'
									variant='outline'
									asChild
								>
									<a href='/services'>View our services</a>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	);
}
