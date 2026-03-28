import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title:
    "Project Gallery | Completed Roofing Jobs & Factory Tour | Gods Promise Aluminium",
  description:
    "See completed aluminium roofing projects, factory production, and colour options from Gods Promise Aluminium. Real jobs across Lagos and Nigeria.",
  openGraph: {
    title:
      "Project Gallery | Completed Roofing Jobs & Factory Tour | Gods Promise Aluminium",
    description:
      "See completed aluminium roofing projects, factory production, and colour options from Gods Promise Aluminium. Real jobs across Lagos and Nigeria.",
    url: "https://www.godspromisealuminiumroofing.com/gallery",
    type: "website",
  },
};

const factoryImages = [
  "1.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
];

const jobImages = ["residential-roofing.jpg"];

const galleryImages = [
  ...jobImages.map((name) => ({
    category: "Completed Roof",
    src: `/gallery/jobs/${name}`,
    alt: "Completed aluminium roofing job supplied by Gods Promise Aluminium",
  })),
  ...factoryImages.map((name, index) => ({
    category: "Factory & Production",
    src: `/gallery/factory/${name}`,
    alt: `Inside the Gods Promise Aluminium factory and production area (${
      index + 1
    })`,
  })),
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="h-1 w-full bg-accent" />
        <div className="container px-4 mx-auto max-w-6xl py-16 md:py-20">
          <p className="text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3">
            Gallery
          </p>
          <h1 className="font-heading uppercase font-bold text-4xl md:text-5xl lg:text-6xl text-balance mb-4">
            Project Gallery
          </h1>
          <p className="text-primary-foreground/80 text-base md:text-lg max-w-2xl">
            Real photos from our factory floor and completed roofing projects
            across Nigeria.
          </p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-secondary border-b border-border">
        <div className="container px-4 mx-auto max-w-6xl py-6">
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-accent" />
              <span>1,000+ projects supplied and installed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-accent" />
              <span>Homes, churches, and commercial buildings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-accent" />
              <span>Lagos and across Nigeria</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="mb-8 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-accent text-xs uppercase tracking-widest font-heading font-bold mb-2">
                  Our Work
                </p>
                <h2 className="font-heading uppercase font-bold text-2xl md:text-3xl">
                  Recent Roofs &amp; Factory Shots
                </h2>
              </div>
              <Button
                asChild
                variant="outline"
                className="rounded-sm text-xs sm:text-sm"
              >
                <Link href="/products">View product details</Link>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 text-sm text-muted-foreground">
              <p>
                Below you will find a selection of photographs taken at our
                factory in Iyana Ipaja, Lagos and from completed roofing
                projects we have supplied across Nigeria. These images show our
                production process, the quality of our aluminium roofing sheets
                and how they look once installed on real buildings — from
                private residences and duplexes to churches, schools and
                commercial properties.
              </p>
              <p>
                Every project featured here used materials produced or supplied
                by Gods Promise Aluminium, including long span sheets, step
                tiles, stone-coated tiles and roofing accessories. If you would
                like to see how a specific profile or colour looks on a building
                similar to yours, contact us and we can share additional photos
                or arrange a visit to a nearby completed project.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((item, index) => (
              <div
                key={item.src}
                className="group rounded-sm overflow-hidden border border-border bg-card"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-200 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-heading uppercase font-bold text-xs tracking-widest text-accent">
                      {item.category}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {item.alt}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground/60 shrink-0 ml-2">
                    #{index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-secondary py-10">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <h3 className="font-heading uppercase font-bold text-xl mb-2">
            Ready to Add Your Project to This Gallery?
          </h3>
          <p className="text-sm text-muted-foreground mb-6 text-balance">
            Share your building details, preferred roofing profile, and
            estimated roof size. We&apos;ll recommend the right aluminium
            roofing sheets, stone-coated tiles, and accessories for your
            project.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              asChild
              className="rounded-sm bg-accent font-heading font-bold uppercase tracking-wide hover:bg-accent/90 w-full sm:w-auto"
            >
              <Link href="/contact">Request a Quote</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-sm w-full sm:w-auto"
            >
              <a href="tel:09150459964">Call Us Now</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
