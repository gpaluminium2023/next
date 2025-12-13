import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
	title: 'Contact Us - Gods Promise Aluminium',
	description:
		'Get in touch with Gods Promise Aluminium. Contact us for quality aluminium roofing sheets, stone-coated tiles, and accessories in Nigeria.',
};

const PHONE_NUMBERS = [
	'09150459964',
	'07040249854',
	'07060414466',
	'08146074077',
	'09025432004',
];

const EMAIL_ADDRESS = 'godspromisealuminumconceptltd@gmail.com';

const FACTORY_ADDRESS_LINES = [
	'288 Abeokuta Expressway, Pleasure B/Stop',
	'Iyana Ipaja, Lagos State',
	'Nigeria',
];

export default function ContactPage() {
	return (
		<div className='min-h-screen bg-background'>
			{/* Hero Section */}
			<section className='bg-gradient-to-b from-muted/50 to-background py-12 md:py-16'>
				<div className='container px-4 mx-auto max-w-6xl'>
					<div className='text-center max-w-2xl mx-auto'>
						<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-4'>
							Get in Touch with Us
						</h1>
						<p className='text-muted-foreground text-base md:text-lg text-pretty'>
							Have questions about our aluminium roofing sheets,
							stone-coated tiles, or accessories? Reach out today
							and our team will get back to you as quickly as
							possible.
						</p>
					</div>
				</div>
			</section>

			{/* Contact Information Cards */}
			<section className='py-12 md:py-16'>
				<div className='container px-4 mx-auto max-w-6xl'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12'>
						{/* Phone Card */}
						<Card className='hover:shadow-md transition-shadow'>
							<CardHeader>
								<div className='flex items-center gap-3'>
									<div className='p-2 bg-primary/10 rounded-lg'>
										<Phone className='h-5 w-5 text-primary' />
									</div>
									<CardTitle className='text-lg'>
										Call Us
									</CardTitle>
								</div>
								<CardDescription>
									Talk directly with our team about your
									project.
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-1'>
								{PHONE_NUMBERS.map((phone) => (
									<a
										key={phone}
										href={`tel:${phone}`}
										className='block text-sm hover:text-primary transition-colors tracking-wide'
									>
										{phone}
									</a>
								))}
								<p className='text-xs text-muted-foreground pt-2'>
									Available Monday to Saturday, 8:00 AM  6:00
									PM
								</p>
							</CardContent>
						</Card>

						{/* Email Card */}
						<Card className='hover:shadow-md transition-shadow'>
							<CardHeader>
								<div className='flex items-center gap-3'>
									<div className='p-2 bg-primary/10 rounded-lg'>
										<Mail className='h-5 w-5 text-primary' />
									</div>
									<CardTitle className='text-lg'>
										Email Us
									</CardTitle>
								</div>
								<CardDescription>
									Send us your building details and
									requirements.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<a
									href={`mailto:${EMAIL_ADDRESS}`}
									className='text-sm hover:text-primary transition-colors break-words'
								>
									{EMAIL_ADDRESS}
								</a>
								<p className='text-xs text-muted-foreground pt-2'>
									We typically respond within one business
									day.
								</p>
							</CardContent>
						</Card>

						{/* Address Card */}
						<Card className='hover:shadow-md transition-shadow'>
							<CardHeader>
								<div className='flex items-center gap-3'>
									<div className='p-2 bg-primary/10 rounded-lg'>
										<MapPin className='h-5 w-5 text-primary' />
									</div>
									<CardTitle className='text-lg'>
										Visit Our Factory
									</CardTitle>
								</div>
								<CardDescription>
									Walk in to discuss your roofing project in
									person.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<address className='text-sm not-italic text-muted-foreground leading-relaxed'>
									{FACTORY_ADDRESS_LINES.map((line) => (
										<div key={line}>{line}</div>
									))}
								</address>
							</CardContent>
						</Card>
					</div>

					{/* Main Content Grid */}
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
						{/* Contact Form */}
						<div>
							<Card>
								<CardHeader>
									<CardTitle className='text-2xl'>
										Send Us a Message
									</CardTitle>
									<CardDescription>
										Fill in the form and let us know what
										you need – we use your details only to
										respond to your enquiry.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ContactForm />
								</CardContent>
							</Card>
						</div>

						{/* Map Placeholder & Business Hours */}
						<div className='space-y-6'>
							{/* Map Embed */}
							<Card className='overflow-hidden'>
								<CardHeader>
									<CardTitle className='text-xl'>
										Our Location
									</CardTitle>
									<CardDescription>
										Find us easily using Google Maps and get
										directions straight to our factory.
									</CardDescription>
								</CardHeader>
								<CardContent className='p-0'>
									<div className='border-t'>
										<iframe
											src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7926.261100011551!2d3.3004211!3d6.6307033!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b918c1a8f0dbf%3A0x596f93e7caaf4a77!2sGOD%27S%20PROMISE%20ALUMINUM%20CONCEPT%20LTD!5e0!3m2!1sen!2sng!4v1765657509731!5m2!1sen!2sng'
											width='100%'
											height='320'
											style={{ border: 0 }}
											allowFullScreen
											loading='lazy'
											referrerPolicy='no-referrer-when-downgrade'
											className='w-full h-64 md:h-80'
											title="God's Promise Aluminium Concept Ltd location on map"
										/>
									</div>
									<div className='px-6 py-4 text-sm text-muted-foreground'>
										<p>
											Tap the map to open directions in
											your preferred maps app.
										</p>
										<p className='mt-2'>
											<a
												href='https://www.google.com/search?q=god%27s+promise+aluminium+concept+ltd&rlz=1C1ONGR_enNG1192NG1192&oq=gods+promise+alu&gs_lcrp=EgZjaHJvbWUqCAgBEAAYFhgeMgYIABBFGDkyCAgBEAAYFhgeMggIAhAAGBYYHjINCAMQABiGAxiABBiKBTINCAQQABiGAxiABBiKBTIGCAUQRRg9MgYIBhBFGD0yBggHEEUYPdIBCDk3OTBqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8&lqi=CiNnb2QncyBwcm9taXNlIGFsdW1pbml1bSBjb25jZXB0IGx0ZEiq0oCppLuAgAhaORAAEAEQAhADEAQYABgBGAIYAxgEIiNnb2QncyBwcm9taXNlIGFsdW1pbml1bSBjb25jZXB0IGx0ZJIBEnJvb2ZpbmdfY29udHJhY3Rvcg#rlimm=6444532215537683063&lrd=0x103b918c1a8f0dbf:0x596f93e7caaf4a77,3,,,,'
												target='_blank'
												rel='noopener'
												className='font-medium text-primary hover:underline'
											>
												See reviews or leave a review on
												Google
											</a>
										</p>
									</div>
								</CardContent>
							</Card>

							{/* Business Hours */}
							<Card>
								<CardHeader>
									<div className='flex items-center gap-3'>
										<div className='p-2 bg-primary/10 rounded-lg'>
											<Clock className='h-5 w-5 text-primary' />
										</div>
										<CardTitle className='text-xl'>
											Business Hours
										</CardTitle>
									</div>
								</CardHeader>
								<CardContent className='space-y-3'>
									<div className='flex justify-between text-sm'>
										<span className='text-muted-foreground'>
											Monday – Friday
										</span>
										<span className='font-medium'>
											8:00 AM – 6:00 PM
										</span>
									</div>
									<div className='flex justify-between text-sm'>
										<span className='text-muted-foreground'>
											Saturday
										</span>
										<span className='font-medium'>
											9:00 AM – 4:00 PM
										</span>
									</div>
									<div className='flex justify-between text-sm'>
										<span className='text-muted-foreground'>
											Sunday
										</span>
										<span className='font-medium text-destructive'>
											Closed
										</span>
									</div>
									<div className='pt-3 border-t mt-4'>
										<p className='text-xs text-muted-foreground'>
											<span className='font-semibold text-foreground'>
												Response time:
											</span>{' '}
											We aim to respond to enquiries
											within 2–4 hours during business
											hours, or the next business day if
											you contact us after closing time.
										</p>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* Trust Section */}
			<section className='py-12 bg-muted/30'>
				<div className='container px-4 mx-auto max-w-4xl'>
					<Card className='border-primary/20 bg-card/50'>
						<CardContent className='pt-6 text-center'>
							<h3 className='font-semibold text-lg mb-2'>
								Why Contact Gods Promise Aluminium?
							</h3>
							<p className='text-sm text-muted-foreground text-balance'>
								From taking accurate measurements to supplying
								and installing your roof, we support you at
								every step. Share your project details with us
								and we&apos;ll recommend the right aluminium
								roofing sheets, stone-coated tiles, and
								accessories for your budget and design.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	);
}
