import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Factory,
  Truck,
  HardHat,
  CheckCircle,
  ArrowRight,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title:
    "Roofing Services in Lagos — Supply, Delivery & Installation | Gods Promise Aluminium",
  description:
    "Professional aluminium roofing services in Lagos and across Nigeria — supply, delivery, and expert installation of long span sheets, step tiles, and stone-coated tiles.",
  openGraph: {
    title:
      "Roofing Services | Supply, Delivery & Installation | Gods Promise Aluminium",
    description:
      "Professional aluminium roofing services in Lagos and across Nigeria — supply, delivery, and expert installation of long span sheets, step tiles, and stone-coated tiles.",
    url: "https://www.godspromisealuminiumroofing.com/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <p className="font-heading mb-3 text-xs font-bold uppercase tracking-widest text-accent">
            Our Services
          </p>
          <h1 className="font-heading mb-6 text-balance text-4xl font-bold uppercase md:text-5xl lg:text-6xl">
            Complete Aluminium Roofing Services
          </h1>
          <p className="max-w-2xl text-base text-primary-foreground/80 md:text-lg">
            From production to transportation and installation, Gods Promise
            Aluminium handles your roofing project end-to-end so you get a
            durable, beautiful roof with less stress.
          </p>
        </div>
        <div className="h-1 w-full bg-accent" />
      </section>

      {/* Services Grid */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="font-heading mb-2 text-xs font-bold uppercase tracking-widest text-accent">
              What We Offer
            </p>
            <h2 className="font-heading mb-4 text-2xl font-bold uppercase md:text-4xl">
              Our Core Services
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              Everything you need for a long-lasting aluminium roof, delivered
              by one reliable team.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {/* Production Service */}
            <div className="overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-accent/60">
              <div className="relative aspect-video overflow-hidden border-b bg-muted">
                <Image
                  src="/images/production.jpg"
                  alt="Production of aluminium roofing sheets at Gods Promise Aluminium factory"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
                />
              </div>
              <div className="p-5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center bg-accent">
                  <Factory className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-heading mb-1 text-xl font-bold uppercase md:text-2xl">
                  Production
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Quality roofing sheets, cut to size
                </p>
                <p className="mb-4 text-sm text-muted-foreground">
                  We produce different types of corrugations using efficient
                  equipment and quality aluminium, including popular profiles
                  for Nigerian homes and projects.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground marker:text-accent">
                  <li>Metral profiles available</li>
                  <li>Steptiles profiles available</li>
                  <li>Normal profiles available</li>
                  <li>Metrocoppo profiles available</li>
                  <li>Measured and cut to your exact roof size</li>
                </ul>
              </div>
            </div>

            {/* Transportation Service */}
            <div className="overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-accent/60">
              <div className="relative aspect-video overflow-hidden border-b bg-muted">
                <Image
                  src="/images/transportation.jpg"
                  alt="Transportation of aluminium roofing materials to project sites"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
                />
              </div>
              <div className="p-5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center bg-accent">
                  <Truck className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-heading mb-1 text-xl font-bold uppercase md:text-2xl">
                  Transportation
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Safe and timely delivery
                </p>
                <p className="mb-4 text-sm text-muted-foreground">
                  We arrange delivery of your roofing materials from our factory
                  directly to your site, with careful handling throughout the
                  journey.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground marker:text-accent">
                  <li>Reliable, experienced drivers</li>
                  <li>Secure loading and packaging</li>
                  <li>Delivery to your project location</li>
                  <li>Support for residential and commercial projects</li>
                </ul>
              </div>
            </div>

            {/* Installation Service */}
            <div className="overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-accent/60">
              <div className="relative aspect-video overflow-hidden border-b bg-muted">
                <Image
                  src="/images/installation.jpg"
                  alt="Installation of aluminium roofing sheets by professional roofers"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
                />
              </div>
              <div className="p-5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center bg-accent">
                  <HardHat className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-heading mb-1 text-xl font-bold uppercase md:text-2xl">
                  Installation
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Professional on-site roofing work
                </p>
                <p className="mb-4 text-sm text-muted-foreground">
                  Our well-trained roofers carry out effective and efficient
                  installation work so your roof performs and looks great for
                  years.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground marker:text-accent">
                  <li>Qualified and supervised roofing teams</li>
                  <li>Installation available on request</li>
                  <li>Attention to safety and finishing details</li>
                  <li>Post-installation checks and support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="font-heading mb-2 text-xs font-bold uppercase tracking-widest text-accent">
              The Process
            </p>
            <h2 className="font-heading mb-4 text-2xl font-bold uppercase md:text-4xl">
              How We Work
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              A simple, supervised process from your first call to a finished
              roof.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-4">
            {[
              {
                step: "01",
                title: "Request a quote",
                description:
                  "Share your building details and preferred roofing profile. We respond quickly with guidance and pricing.",
              },
              {
                step: "02",
                title: "Measurement & planning",
                description:
                  "Our team confirms measurements and quantities so production, delivery, and installation are accurate.",
              },
              {
                step: "03",
                title: "Production & delivery",
                description:
                  "We produce your sheets, package them securely, and arrange delivery to your project location.",
              },
              {
                step: "04",
                title: "Professional installation",
                description:
                  "If requested, our roofers install and finish your roof, supervised for quality at every stage.",
              },
            ].map((item, index) => (
              <div key={item.step} className="relative">
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center bg-accent font-heading text-xl font-bold text-accent-foreground">
                    {item.step}
                  </div>
                  <h3 className="font-heading mb-2 text-lg font-bold uppercase">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="absolute left-1/2 top-8 hidden h-0.5 w-full -translate-x-1/2 bg-border md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="font-heading mb-2 text-xs font-bold uppercase tracking-widest text-accent">
                Our Advantage
              </p>
              <h2 className="font-heading mb-6 text-2xl font-bold uppercase md:text-4xl">
                Why Customers Trust Our Services
              </h2>
              <p className="mb-8 text-muted-foreground">
                We combine good materials, careful supervision, and reliable
                people so every stage of your roofing project is covered.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "End-to-end support",
                    description:
                      "One team to handle production, transportation, and installation so you deal with fewer vendors.",
                  },
                  {
                    title: "Well-supervised work",
                    description:
                      "All services are supervised so you get neat finishing, correct quantities, and reliable timelines.",
                  },
                  {
                    title: "Experience with Nigerian projects",
                    description:
                      "From homes to larger sites, we understand local conditions, sites, and expectations.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent">
                      <CheckCircle className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading mb-1 font-bold uppercase">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-sm bg-muted">
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
                  <div className="bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    Placeholder image
                  </div>
                  <p className="max-w-xs text-xs text-muted-foreground">
                    This area can later show your team working on-site, trucks
                    in motion, or your factory.
                  </p>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 rounded-sm border border-border bg-card shadow-lg md:bottom-10 md:left-10 md:right-auto">
                <div className="p-4 md:p-5">
                  <div className="grid grid-cols-3 gap-4 text-center text-xs md:text-sm">
                    <div>
                      <div className="font-heading mb-1 text-xl font-bold text-accent md:text-2xl">
                        15+
                      </div>
                      <div className="text-muted-foreground">
                        Years in service
                      </div>
                    </div>
                    <div>
                      <div className="font-heading mb-1 text-xl font-bold text-accent md:text-2xl">
                        1000+
                      </div>
                      <div className="text-muted-foreground">
                        Projects handled
                      </div>
                    </div>
                    <div>
                      <div className="font-heading mb-1 text-xl font-bold text-accent md:text-2xl">
                        5+
                      </div>
                      <div className="text-muted-foreground">
                        Service locations
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-heading mb-3 text-xs font-bold uppercase tracking-widest text-accent">
            Get Started
          </p>
          <h2 className="font-heading mb-4 text-balance text-2xl font-bold uppercase md:text-4xl">
            Ready to Discuss Your Roofing Project?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-balance text-base text-primary-foreground/80 md:text-lg">
            Reach out for a free discussion about measurements, profiles, and
            costing. We are happy to guide you before you decide.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full rounded-sm bg-accent font-heading font-bold uppercase tracking-wide hover:bg-accent/90 sm:w-auto"
              asChild
            >
              <Link href="/contact">
                Request a quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full rounded-sm border-primary-foreground/30 bg-transparent font-heading font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
              asChild
            >
              <a href="tel:09150459964">
                <Phone className="mr-2 h-4 w-4" /> Call us directly
              </a>
            </Button>
          </div>

          <p className="mt-8 text-sm text-primary-foreground/75">
            288 Abeokuta Expressway, Pleasure B/Stop, Iyana Ipaja, Lagos State
          </p>
        </div>
      </section>
    </div>
  );
}
