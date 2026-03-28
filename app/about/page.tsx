import type { Metadata } from 'next';
import Image from 'next/image';
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About Gods Promise Aluminium | Lagos-Based Aluminium Roofing Company",
  description:
    "Learn about Gods Promise Aluminium, a Lagos-based, Nigerian-owned aluminium roofing and building products company supplying roofing sheets, stone tiles and accessories to projects across Nigeria.",
  openGraph: {
    title: "About Gods Promise Aluminium | Lagos Aluminium Roofing Company",
    description:
      "Gods Promise Aluminium provides durable aluminium roofing sheets, stone-coated tiles and accessories for homes, churches and commercial buildings in Lagos and across Nigeria.",
    url: "https://www.godspromisealuminiumroofing.com/about",
    type: "article",
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
    title:
      "About Gods Promise Aluminium | Lagos-based aluminium roofing company in Nigeria",
    description:
      "Lagos-based aluminium roofing company supplying roofing sheets, stone-coated tiles and accessories for projects across Nigeria.",
    images: ["/logo.jpeg"],
  },
};

const stats = [
  { id: 1, value: "950+", label: "Satisfied clients" },
  { id: 2, value: "15+", label: "Years of experience" },
  { id: 3, value: "1000+", label: "Completed projects" },
  { id: 4, value: "24/7", label: "Customer support" },
];

const values = [
  {
    id: 1,
    title: "Integrity",
    description:
      "We keep our word, deliver on time, and stand behind every roof we install.",
  },
  {
    id: 2,
    title: "Quality",
    description:
      "We use durable materials and careful workmanship so your roof lasts for years.",
  },
  {
    id: 3,
    title: "Customer care",
    description:
      "From first call to final installation, we communicate clearly and serve with respect.",
  },
  {
    id: 4,
    title: "Excellence",
    description:
      "We pay attention to the small details that make a big difference.",
  },
];

const milestones = [
  {
    year: "2009",
    title: "Company founded in Nigeria",
    description:
      "Gods Promise Aluminium begins serving homeowners, builders, and churches with aluminium roofing products.",
  },
  {
    year: "2015",
    title: "Expanded production capacity",
    description:
      "We invest in better machinery and a stronger team to serve more clients across the country.",
  },
  {
    year: "2020",
    title: "Over 1000 completed projects",
    description:
      "Our roofs protect homes, sanctuaries, and commercial buildings in multiple states.",
  },
  {
    year: "Today",
    title: "Growing with our customers",
    description:
      "We continue to innovate, improve, and support every client long after installation.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-heading mb-3 text-xs font-bold uppercase tracking-widest text-accent">
              Lagos-based · Nigerian-owned · 15+ Years
            </p>
            <h1 className="font-heading mb-6 text-balance text-4xl font-bold uppercase md:text-5xl lg:text-6xl">
              About Gods Promise Aluminium
            </h1>
            <p className="text-balance text-lg text-primary-foreground/80 md:text-xl">
              We produce and supply aluminium roofing sheets, stone-coated
              tiles, and accessories that keep homes, churches, and businesses
              across Nigeria beautifully protected.
            </p>
          </div>
        </div>
        <div className="h-1 w-full bg-accent" />
      </section>

      {/* Stats */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="rounded-sm border border-border bg-card p-6 text-center"
              >
                <div className="font-heading mb-1 text-3xl font-bold text-accent md:text-4xl">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="font-heading mb-3 text-xs font-bold uppercase tracking-widest text-accent">
                Our story
              </p>
              <h2 className="font-heading mb-6 text-balance text-3xl font-bold uppercase md:text-4xl">
                Built on promise, powered by experience
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Gods Promise Aluminium is a Lagos-based aluminium roofing and
                  building products company. From our workshop in Lagos, we
                  produce and supply roofing sheets, stone-coated tiles, and
                  accessories for projects of all sizes across Nigeria.
                </p>
                <p>
                  Over the years we&apos;ve grown with our customers, learning
                  the challenges builders and homeowners face in the Nigerian
                  climate and shaping our services to meet them. We believe
                  every structure deserves a roof that is strong, beautiful, and
                  built to last.
                </p>
                <p>
                  Whether you are covering a new home, renovating a sanctuary,
                  or completing a commercial project, our team is ready to guide
                  you from product selection through to delivery and
                  installation support, with simple WhatsApp quoting and clear,
                  transparent pricing.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-4/3 overflow-hidden rounded-sm border border-border bg-muted">
                <Image
                  src="/gallery/factory/6.jpg"
                  alt="Inside the Gods Promise Aluminium factory"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="font-heading mb-3 text-xs font-bold uppercase tracking-widest text-accent">
              Purpose
            </p>
            <h2 className="font-heading text-balance text-3xl font-bold uppercase md:text-4xl">
              Our mission &amp; vision
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            <div className="rounded-sm border border-border bg-card p-8">
              <div className="mb-2 h-1 w-8 bg-accent" />
              <h3 className="font-heading mb-4 text-xl font-bold uppercase">
                Our mission
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                To supply high-quality aluminium roofing products and services
                that give lasting protection, comfort, and peace of mind to
                every customer we serve.
              </p>
            </div>

            <div className="rounded-sm border border-border bg-card p-8">
              <div className="mb-2 h-1 w-8 bg-accent" />
              <h3 className="font-heading mb-4 text-xl font-bold uppercase">
                Our vision
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                To be the most trusted name in aluminium roofing in Nigeria and
                beyond, known for integrity, excellence, and dependable service
                on every project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="font-heading mb-3 text-xs font-bold uppercase tracking-widest text-accent">
              What we stand for
            </p>
            <h2 className="font-heading text-balance text-3xl font-bold uppercase md:text-4xl">
              Our core values
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.id}
                className="rounded-sm border border-primary-foreground/10 p-6"
              >
                <div className="mb-4 h-1 w-6 bg-accent" />
                <h3 className="font-heading mb-3 text-lg font-bold uppercase">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-primary-foreground/75">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="font-heading mb-3 text-xs font-bold uppercase tracking-widest text-accent">
              Track record
            </p>
            <h2 className="font-heading text-balance text-3xl font-bold uppercase md:text-4xl">
              Our experience
            </h2>
          </div>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-5">
                <div className="font-heading flex h-10 w-16 shrink-0 items-center justify-center bg-accent text-sm font-bold uppercase text-white">
                  {milestone.year}
                </div>
                <div className="pt-1">
                  <h3 className="font-heading mb-1 font-bold uppercase">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="font-heading mb-3 text-xs font-bold uppercase tracking-widest text-accent">
              The team
            </p>
            <h2 className="font-heading text-balance text-3xl font-bold uppercase md:text-4xl">
              Leadership
            </h2>
          </div>
          <div className="mx-auto max-w-3xl rounded-sm border border-border bg-card p-8">
            <div className="mb-2 h-1 w-8 bg-accent" />
            <h3 className="font-heading mb-4 text-xl font-bold uppercase">
              Our leadership team
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              Behind every successful project is a committed team of managers,
              supervisors, and craftsmen. Our leadership brings years of
              hands-on industry experience to ensure that every order is
              processed accurately and every customer is treated with care.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-heading mb-3 text-xs font-bold uppercase tracking-widest text-accent">
            Get started
          </p>
          <h2 className="font-heading mb-4 text-balance text-3xl font-bold uppercase md:text-4xl">
            Ready to plan your next roof?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-balance text-lg text-primary-foreground/80">
            Share your project details with us and we&apos;ll help you choose
            the right aluminium roofing solution for your budget and design.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="rounded-sm bg-accent font-heading font-bold uppercase tracking-wide hover:bg-accent/90"
              asChild
            >
              <Link href="/contact">Get in touch</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-sm border-primary-foreground/30 bg-transparent font-heading font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/services">View our services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
