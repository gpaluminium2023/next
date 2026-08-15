import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { HeroSlideshow } from '@/components/hero-slideshow';
import { FactoryVideo } from '@/components/factory-video';
import { siteIdentity, yearsTrading } from '@/lib/site-identity';

const heroClips = [
  { src: "/videos/hero-corrugation.mp4", poster: "/videos/hero-corrugation.jpg" },
  { src: "/videos/coil-feed.mp4", poster: "/videos/coil-feed.jpg" },
  { src: "/videos/sheet-inspection.mp4", poster: "/videos/sheet-inspection.jpg" },
  { src: "/videos/coil-stock-loop.mp4", poster: "/videos/coil-stock-loop.jpg" },
];

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  // "aluminium roofing company" brings 151 impressions and zero clicks at
  // position 7.8 — the largest single waste in Search Console. The title
  // already matched the query; the description did not earn the click, opening
  // with "a leading aluminium roofing company", which every competitor also
  // claims. It now leads with what can be checked: years, gauges, credentials.
  title: "Aluminium Roofing Company in Lagos & Nigeria | Gods Promise Aluminium",
  description:
    "Aluminium roofing sheet manufacturer in Lagos since 2009. We roll long span, step tile, Metcopo (Metcoppo) and flat sheets in-house from 0.40mm to 1.00mm, and we are an authorised Gerard dealer with Gerard-certified installers. Delivery to all 36 states.",
  openGraph: {
    title: "Aluminium Roofing Company in Lagos | Gods Promise Aluminium",
    description:
      "Lagos-based aluminium roofing company supplying roofing sheets, stone-coated tiles and flat sheets for projects across Nigeria.",
    url: "https://www.godspromisealuminiumroofing.com",
    type: "website",
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Gods Promise Aluminium logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aluminium Roofing Sheet Company in Lagos | Gods Promise Aluminium",
    description:
      "Lagos aluminium roofing company supplying roofing sheets, stone-coated tiles and accessories across Nigeria.",
    images: ["/logo.jpeg"],
  },
};

export default function Home() {
	return (
    <div>
      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-[560px] overflow-hidden bg-primary text-primary-foreground lg:min-h-[680px]">
        <HeroSlideshow clips={heroClips} className="z-0" />
        <div className="absolute inset-0 z-1 bg-linear-to-r from-primary/95 via-primary/75 to-primary/30" />
        <div className="absolute inset-0 z-1 bg-linear-to-t from-primary/70 via-transparent to-transparent" />
        <div className="relative z-10 h-1 w-full bg-accent" />
        <div className="relative z-10 mx-auto flex min-h-[calc(560px-4px)] max-w-7xl items-center px-6 py-14 md:px-10 lg:min-h-[calc(680px-4px)] lg:py-24">
          <div className="max-w-xl">
            <p className="mb-4 font-heading text-xs font-bold uppercase tracking-[0.28em] text-accent">
              Lagos · Nigeria
            </p>
            <h1 className="font-heading text-5xl font-bold uppercase leading-none tracking-tight md:text-6xl lg:text-7xl">
              We Build
              <br />
              <span className="text-accent">Roofs</span>
              <br />
              That Last
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-primary-foreground/75">
              Gods Promise Aluminium is a trusted aluminium roofing company in
              Lagos, manufacturing durable roofing sheets and stone-coated
              tiles. Fast WhatsApp quotes, accurate gauges and delivery to every
              state in Nigeria.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-sm bg-accent font-heading font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90"
              >
                <Link href="/store">Shop Online</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-sm border-primary-foreground/30 bg-transparent font-heading font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary-foreground/10"
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
            {/* The three claims a buyer can actually check before ringing —
                the same ones the meta description leads with. */}
            <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-primary-foreground/15 pt-6 font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground/60">
              <li>Authorised Gerard Dealer</li>
              <li aria-hidden className="text-accent">
                /
              </li>
              <li>0.40mm – 1.00mm</li>
              <li aria-hidden className="text-accent">
                /
              </li>
              <li>All 36 States</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ─────────────────────────────────────────── */}
      <section className="bg-secondary">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border md:grid-cols-4">
          {/* Years derives from siteIdentity.foundedYear; the customer count
              matches /about rather than rounding up to 1K+ separately. */}
          <StatItem value={`${yearsTrading()}+`} label="Years in Business" />
          <StatItem value="500K+" label="Sheets Sold" />
          <StatItem value="36" label="States Served" />
          <StatItem value="950+" label="Happy Customers" />
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

      {/* ── CUT TO LENGTH ───────────────────────────────────────── */}
      {/* Portrait footage in a portrait frame — the clip is 480x848, so it is
          shown at that shape instead of being cropped into a landscape box.
          It answers the one question every buyer asks by phone: can you do my
          exact length? */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-[minmax(0,18rem)_1fr] md:px-10">
          <FactoryVideo
            src="/videos/cut-to-length.mp4"
            poster="/videos/cut-to-length.jpg"
            label="Factory staff measuring and cutting a 60 metre length from a black aluminium coil"
            className="aspect-[480/848] w-full max-w-[18rem] border border-primary-foreground/15"
          />
          <div>
            <p className="mb-2 font-heading text-xs font-bold uppercase tracking-[0.28em] text-accent">
              Made to Order
            </p>
            <h2 className="font-heading text-3xl font-bold uppercase leading-none tracking-tight md:text-4xl">
              Cut to Your Measurement,
              <br />
              Not Ours
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-primary-foreground/75">
              Sheets are cut to the length your roof actually needs, measured
              straight off the coil on our factory floor. That means fewer
              joints on long runs, and you are not paying for offcuts you will
              never lay. Bring your measurements — or send them on WhatsApp and
              our team will work the quantity out with you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-sm bg-accent font-heading font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90"
              >
                <Link href="/roof-calculator">Work Out My Quantity</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-sm border-primary-foreground/30 bg-transparent font-heading font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/contact">Send Measurements</Link>
              </Button>
            </div>
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

          {/* The two ends of the line, side by side. Step 02 is where most
              buyers hesitate, and this is what it looks like from the inside. */}
          <div className="mt-12">
            <p className="mb-6 font-heading text-xs font-bold uppercase tracking-[0.28em] text-accent">
              On Our Floor
            </p>
            <div className="grid gap-1 md:grid-cols-2">
              <ClipPanel
                src="/videos/coil-feed.mp4"
                poster="/videos/coil-feed.jpg"
                label="An aluminium coil being fed into the long span corrugation machine"
                caption="Coil goes in"
                detail="Raw aluminium coil loaded onto the long span line."
              />
              <ClipPanel
                src="/videos/sheet-inspection.mp4"
                poster="/videos/sheet-inspection.jpg"
                label="A factory worker watching a black 0.45mm aluminium sheet come off the corrugation machine"
                caption="Sheet comes out"
                detail="0.45mm profiled sheet, watched off the line by our team."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SUMMARY ───────────────────────────────────────── */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-10">
            <p className="mb-2 font-heading text-xs font-bold uppercase tracking-[0.28em] text-accent">
              About Us
            </p>
            <h2 className="font-heading text-3xl font-bold uppercase leading-none tracking-tight md:text-4xl">
              Lagos-Based Aluminium Roofing Manufacturer
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Gods Promise Aluminium Concept Limited is an aluminium roofing
                sheet manufacturer based at Pleasure Bus Stop, Alimosho, Lagos
                100275, Nigeria. We produce long
                span roofing sheets, step tiles, metcoppo profiles and flat
                sheets in a range of thicknesses from 0.40mm to 1.00mm, serving
                homeowners, builders, contractors and developers across all 36
                states in Nigeria.
              </p>
              <p>
                Our factory handles the entire process from coil slitting and
                profiling to cutting, packaging and dispatch. Customers are
                welcome to visit the factory, inspect their order during
                production and verify thickness, colour and measurements before
                the materials leave our premises. This hands-on approach reduces
                the risk of errors and gives you full confidence in what you are
                paying for.
              </p>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                We also supply Gerard stone-coated roofing tiles imported from
                New Zealand, available in Shingle, Bond, Classic and Milano
                profiles. For roofing accessories, we stock drive screws, seam
                bolts, roofing nails, felt, silicone sealant and flash band —
                everything needed to complete a roof properly.
              </p>
              <p>
                Whether you are roofing a single bungalow in Lagos or supplying
                materials for a multi-unit estate development outside the city,
                Gods Promise Aluminium offers transparent pricing, reliable
                delivery timelines and customer support before, during and after
                your purchase. Contact us on WhatsApp or visit our factory to
                discuss your project.
              </p>
            </div>
          </div>

          {/* Stock depth is the hardest thing to prove in prose and the easiest
              to prove on camera. Feature mode: 34 seconds with sound, and it
              downloads nothing until someone presses play. */}
          <div className="mt-12 grid gap-6 md:grid-cols-[1fr_minmax(0,20rem)] md:items-end">
            <FactoryVideo
              src="/videos/coil-stock.mp4"
              poster="/videos/coil-stock.jpg"
              label="Aluminium coils in stock at the Gods Promise Aluminium factory, in a range of colours and gauges"
              mode="feature"
              className="aspect-video w-full rounded-sm border border-border"
            />
            <div>
              <p className="font-heading text-xs font-bold uppercase tracking-[0.28em] text-accent">
                Coil Store
              </p>
              <h3 className="mt-2 font-heading text-xl font-bold uppercase leading-tight tracking-tight">
                The Stock Behind the Quote
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Colours and gauges held on site, so an order does not wait on
                somebody else&rsquo;s container. Press play — the sound is our
                floor, not a soundtrack.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
          <p className="mb-3 font-heading text-xs font-bold uppercase tracking-[0.28em] text-accent">
            What Our Customers Say
          </p>
          <h2 className="mb-10 font-heading text-3xl font-bold uppercase leading-none tracking-tight md:text-5xl">
            Trusted by Builders
            <br />
            Across Nigeria
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="I ordered 0.55mm long span sheets for my duplex in Lekki and the quality was exactly as promised. The thickness was verified right at the factory before loading. Very transparent company."
              name="Engr. Adebayo K."
              role="Building Contractor, Lagos"
            />
            <TestimonialCard
              quote="We have been buying from Gods Promise for three estate projects now. Delivery is always on time and their pricing is the most competitive we have found for genuine aluminium sheets."
              name="Mrs. Chidinma O."
              role="Property Developer, Abuja"
            />
            <TestimonialCard
              quote="The stone-coated tiles I got for my hotel project in Ibadan are beautiful. Two years later and they still look brand new. The noise reduction during heavy rain is remarkable."
              name="Chief Emeka A."
              role="Hotelier, Ibadan"
            />
            <TestimonialCard
              quote="I was sceptical about ordering roofing sheets from Lagos to Port Harcourt but the delivery arrived in perfect condition within a week. Will definitely order again for my next project."
              name="Mr. Uche N."
              role="Homeowner, Port Harcourt"
            />
            <TestimonialCard
              quote="Their team helped me calculate the exact quantity I needed for my church building so we did not overbuy. Honest advice and quality material — exactly what a first-time builder needs."
              name="Pastor Olumide T."
              role="Church Building Committee, Abeokuta"
            />
            <TestimonialCard
              quote="What impressed me most was being able to visit the factory and watch my roofing sheets being produced. No hidden gauge tricks. What they say is what you get."
              name="Alhaji Musa B."
              role="Contractor, Kano"
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
                {siteIdentity.address.formatted}
              </p>
              <h2 className="font-heading text-3xl font-bold uppercase leading-none tracking-tight md:text-5xl lg:text-6xl">
                Ready to Start
                <br />
                Your Project?
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

type ClipPanelProps = {
	src: string;
	poster: string;
	label: string;
	caption: string;
	detail: string;
};

/** A captioned ambient clip, sized to the footage's native 16:9. */
function ClipPanel({ src, poster, label, caption, detail }: ClipPanelProps) {
	return (
		<figure className="bg-primary">
			<FactoryVideo src={src} poster={poster} label={label} className="aspect-video w-full" />
			<figcaption className="px-4 py-4">
				<p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-accent">
					{caption}
				</p>
				<p className="mt-1 text-xs leading-relaxed text-primary-foreground/70">{detail}</p>
			</figcaption>
		</figure>
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

function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <div className="rounded-sm border border-border bg-card p-6">
      <p className="text-sm leading-relaxed text-muted-foreground">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-4 border-t border-border pt-4">
        <p className="font-heading text-sm font-bold uppercase tracking-wide">
          {name}
        </p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </div>
    </div>
  );
}
