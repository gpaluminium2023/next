import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
	title: 'Aluminium roofing sheet manufacturer in Lagos, Nigeria | Gods Promise Aluminium',
	description:
		'Gods Promise Aluminium is a Lagos-based aluminium roofing sheet manufacturer serving customers across Nigeria with durable, rust-resistant roofing systems, fast WhatsApp quotes and reliable nationwide delivery.',
	openGraph: {
		title: 'Aluminium roofing sheet manufacturer in Lagos, Nigeria | Gods Promise Aluminium',
		description:
			'Aluminium roofing sheets, stone-coated tiles and flat sheets designed for the Nigerian climate, supplied from Lagos to projects across Nigeria.',
		url: 'https://godspromisealuminiumroofing.com',
		type: 'website',
		images: [
			{
				url: '/logo.jpeg',
				width: 1200,
				height: 630,
				alt: 'Gods Promise Aluminium logo',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Aluminium roofing sheet manufacturer in Lagos, Nigeria | Gods Promise Aluminium',
		description:
			'Lagos-based aluminium roofing sheet manufacturer supplying roofing sheets, stone-coated tiles and accessories across Nigeria.',
		images: ['/logo.jpeg'],
	},
};

export default function Home() {
	return (
		<div>
			{/* ── HERO ────────────────────────────────────────────────── */}
			<section className="relative bg-primary text-primary-foreground">
				<div className="h-1 w-full bg-accent" />
				<div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
					{/* Left: text */}
					<div className="flex flex-col justify-center px-6 py-14 md:px-10 lg:py-24">
						<p className="mb-4 font-heading text-xs font-bold uppercase tracking-[0.28em] text-accent">
							Lagos · Nigeria
						</p>
						<h1 className="font-heading text-5xl font-bold uppercase leading-none tracking-tight md:text-6xl lg:text-7xl">
							We Build<br />
							<span className="text-accent">Roofs</span><br />
							That Last
						</h1>
						<p className="mt-6 max-w-md text-sm leading-relaxed text-primary-foreground/75">
							Gods Promise Aluminium manufactures durable roofing sheets and stone-coated tiles right here in Lagos. Fast WhatsApp quotes, accurate gauges and nationwide delivery to every state.
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<Button
								asChild
								size="lg"
								className="rounded-sm bg-accent font-heading font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90"
							>
								<Link href="/contact">Get WhatsApp Quote</Link>
							</Button>
							<Button
								asChild
								size="lg"
								variant="outline"
								className="rounded-sm border-primary-foreground/30 bg-transparent font-heading font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary-foreground/10"
							>
								<Link href="/products">View Products</Link>
							</Button>
						</div>
					</div>
					{/* Right: CEO image */}
					<div className="relative min-h-72 lg:min-h-[600px]">
						<Image
							src="/images/ceo-two.jpg"
							alt="CEO of Gods Promise Aluminium in the factory, representing a business built on promise"
							fill
							className="object-cover"
							sizes="(min-width: 1024px) 50vw, 100vw"
							priority
						/>
						<div className="absolute inset-0 bg-linear-to-t from-primary/70 via-transparent to-transparent" />
						<div className="absolute bottom-0 left-0 px-6 pb-6">
							<p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-accent">
								Projects Across Nigeria
							</p>
							<p className="mt-1 text-xs leading-relaxed text-primary-foreground/85">
								Long span, stone-coated tiles and flat sheets designed for the Nigerian climate.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ── STATS STRIP ─────────────────────────────────────────── */}
			<section className="bg-secondary">
				<div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border md:grid-cols-4">
					<StatItem value="15+" label="Years in Business" />
					<StatItem value="500K+" label="Sheets Sold" />
					<StatItem value="36" label="States Served" />
					<StatItem value="1K+" label="Happy Customers" />
				</div>
			</section>

			{/* ── PRODUCTS ────────────────────────────────────────────── */}
			<section className="bg-background py-16">
				<div className="mx-auto max-w-7xl px-6 md:px-10">
					<div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
						<div>
							<p className="mb-2 font-heading text-xs font-bold uppercase tracking-[0.28em] text-accent">
								Our Products
							</p>
							<h2 className="font-heading text-3xl font-bold uppercase leading-none tracking-tight md:text-4xl">
								Built for Nigeria’s Climate
							</h2>
						</div>
						<Button
							asChild
							variant="outline"
							className="self-start rounded-sm font-heading font-bold uppercase tracking-wide"
						>
							<Link href="/products">See Full Range</Link>
						</Button>
					</div>
					<div className="grid gap-1 md:grid-cols-3">
						<ProductPanel
							tag="Roofing Sheets"
							title="Long Span Roofing Sheets"
							description="Durable profiles for homes, churches and commercial buildings, with accurate gauges and trusted colours."
							imageSrc="/core-products/roof1.jpg"
							imageAlt="Long span aluminium roofing sheet installation"
							href="/products"
						/>
						<ProductPanel
							tag="Stone Tiles"
							title="Stone Coated Roof Tiles"
							description="Shingle, Classic, Bond and more — combining aesthetic appeal with long-lasting protection."
							imageSrc="/core-products/stonetiles.jpg"
							imageAlt="Stone-coated roofing tiles installed on a building roof"
							href="/products"
						/>
						<ProductPanel
							tag="Flat Sheets"
							title="Aluminium Flat Sheets"
							description="Versatile sheets in multiple thicknesses for custom fabrication and finishing work."
							imageSrc="/core-products/flatsheet.jpg"
							imageAlt="Stack of coloured aluminium flat sheets ready for fabrication"
							href="/products"
						/>
					</div>
				</div>
			</section>

			{/* ── VALUES ─────────────────────────────────────────────── */}
			<section className="bg-primary py-16 text-primary-foreground">
				<div className="mx-auto max-w-7xl px-6 md:px-10">
					<div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
						<div>
							<p className="mb-2 font-heading text-xs font-bold uppercase tracking-[0.28em] text-accent">
								Why Choose Us
							</p>
							<h2 className="font-heading text-3xl font-bold uppercase leading-none tracking-tight md:text-4xl">
								Our Core Values
							</h2>
						</div>
					</div>
					<div className="grid divide-y divide-primary-foreground/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
						<ValuePanel
							iconSrc="/icons/integrity.png"
							iconAlt="Integrity icon"
							title="Integrity"
							description="We deliver exactly what we promise, every time — no shortcuts, no substitutions."
						/>
						<ValuePanel
							iconSrc="/icons/excellence.png"
							iconAlt="Customer satisfaction icon"
							title="Customer Satisfaction"
							description="Transparency, flexibility and accountability guide every customer interaction."
						/>
						<ValuePanel
							iconSrc="/icons/accounting.png"
							iconAlt="Accountability icon"
							title="Accountability"
							description="We stand behind every product that leaves our factory with full records and support."
						/>
						<ValuePanel
							iconSrc="/icons/trophy.png"
							iconAlt="Excellence icon"
							title="Excellence"
							description="Continuous improvement and a clear standard of operation at every level of service."
						/>
					</div>
				</div>
			</section>

			{/* ── PROCESS ─────────────────────────────────────────────── */}
			<section className="bg-secondary py-16">
				<div className="mx-auto max-w-7xl px-6 md:px-10">
					<div className="mb-12 text-center">
						<p className="mb-2 font-heading text-xs font-bold uppercase tracking-[0.28em] text-accent">
							How It Works
						</p>
						<h2 className="font-heading text-3xl font-bold uppercase leading-none tracking-tight md:text-4xl">
							From Enquiry to Delivery
						</h2>
					</div>
					<div className="grid gap-0 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
						<StepPanel
							step="01"
							title="Check Products"
							description="Browse our range of roofing sheets, stone tiles and flat sheets to confirm availability and pricing for your project."
						/>
						<StepPanel
							step="02"
							title="Place Your Order"
							description="Contact us on WhatsApp or visit our Lagos factory. Our team will guide you through every step of the order."
						/>
						<StepPanel
							step="03"
							title="Verify & Receive"
							description="Cross-check every item at our factory before transport. We ensure quality at the source before it reaches your site."
						/>
					</div>
				</div>
			</section>

			{/* ── CTA STRIP ───────────────────────────────────────────── */}
			<section className="bg-accent text-accent-foreground">
				<div className="h-1 w-full bg-primary" />
				<div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
					<div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
						<div>
							<p className="mb-3 font-heading text-xs font-bold uppercase tracking-[0.28em] opacity-75">
								288 Abeokuta Expressway, Iyana Ipaja, Lagos State
							</p>
							<h2 className="font-heading text-3xl font-bold uppercase leading-none tracking-tight md:text-5xl lg:text-6xl">
								Ready to Start<br />Your Project?
							</h2>
						</div>
						<div className="flex flex-col gap-3 md:items-end">
							<Button
								asChild
								size="lg"
								className="rounded-sm bg-primary font-heading font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary/90"
							>
								<Link href="/contact">Contact Us Today</Link>
							</Button>
							<p className="text-xs opacity-75">
								09150459964 · 07040249854 · 07060414466 · 08146074077
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatItem({ value, label }: { value: string; label: string }) {
	return (
		<div className="flex flex-col items-center justify-center gap-1 px-6 py-10 text-center">
			<span className="font-heading text-4xl font-bold text-primary md:text-5xl">{value}</span>
			<span className="font-heading text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
				{label}
			</span>
		</div>
	);
}

type ProductPanelProps = {
	tag: string;
	title: string;
	description: string;
	imageSrc: string;
	imageAlt: string;
	href: string;
};

function ProductPanel({ tag, title, description, imageSrc, imageAlt, href }: ProductPanelProps) {
	return (
		<Link
			href={href}
			className="group relative block overflow-hidden bg-primary" style={{ aspectRatio: '4/3' }}
		>
			<Image
				src={imageSrc}
				alt={imageAlt}
				fill
				className="object-cover transition-transform duration-500 group-hover:scale-105"
				sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
			/>
			<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
			<div className="absolute left-0 right-0 top-0 px-4 pt-4">
				<span className="bg-primary/85 px-2 py-0.5 font-heading text-xs font-bold uppercase tracking-[0.2em] text-accent">
					{tag}
				</span>
			</div>
			<div className="absolute bottom-0 left-0 right-0 px-4 pb-5">
				<h3 className="font-heading text-lg font-bold uppercase leading-tight text-white">{title}</h3>
				<p className="mt-1 text-xs leading-relaxed text-white/80">{description}</p>
			</div>
		</Link>
	);
}

type ValuePanelProps = {
	iconSrc: string;
	iconAlt: string;
	title: string;
	description: string;
};

function ValuePanel({ iconSrc, iconAlt, title, description }: ValuePanelProps) {
	return (
		<div className="flex flex-col gap-4 px-6 py-8">
			<Image
				src={iconSrc}
				alt={iconAlt}
				width={32}
				height={32}
				className="h-8 w-8 brightness-0 invert"
			/>
			<div>
				<h3 className="font-heading text-sm font-bold uppercase tracking-wide">{title}</h3>
				<p className="mt-1.5 text-xs leading-relaxed text-primary-foreground/65">{description}</p>
			</div>
		</div>
	);
}

type StepPanelProps = {
	step: string;
	title: string;
	description: string;
};

function StepPanel({ step, title, description }: StepPanelProps) {
	return (
		<div className="flex flex-col gap-4 px-6 py-10">
			<span className="font-heading text-6xl font-bold leading-none text-accent">{step}</span>
			<div>
				<h3 className="font-heading text-base font-bold uppercase tracking-wide">{title}</h3>
				<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
			</div>
		</div>
	);
}
