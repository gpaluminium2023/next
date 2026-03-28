import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: "/projects" },
  title:
    "Completed Roofing Projects in Lagos & Nigeria | Gods Promise Aluminium",
  description:
    "A simple overview of sample aluminium roofing projects completed by Gods Promise Aluminium for homes, churches and commercial buildings in Lagos and across Nigeria.",
};

const sampleProjects = [
  {
    title: "Residential Bungalow Roof in Lagos",
    location: "Alimosho, Lagos State",
    description:
      "Long span aluminium roofing sheets supplied and installed for a 3-bedroom bungalow. The homeowner chose 0.55mm wine red sheets for durability. Our team conducted on-site measurement, produced the sheets to exact lengths and completed delivery within 48 hours of order confirmation.",
  },
  {
    title: "Church Roofing Project",
    location: "Ogun State",
    description:
      "Step-tile aluminium roofing sheets supplied for a new 500-seat church auditorium. The project required 0.50mm dark blue sheets with matching ridge caps and valley gutters. We worked closely with the building committee to confirm specifications and arranged interstate delivery to the construction site.",
  },
  {
    title: "Duplex Roofing — Stone-Coated Tiles",
    location: "Lekki, Lagos State",
    description:
      "Premium stone-coated roofing tiles supplied for a newly built 4-bedroom duplex in a gated estate. The developer selected the classic shingle profile in charcoal black for its modern appearance and superior weather resistance. All accessories including starter kits and hip tiles were included in the order.",
  },
  {
    title: "Estate Development — 12 Units",
    location: "Ibeju-Lekki, Lagos State",
    description:
      "Bulk supply of long span aluminium roofing sheets for a 12-unit housing estate under construction. We produced 0.45mm forest green sheets in custom lengths to minimise waste across all units. The developer benefited from our wholesale pricing and phased delivery schedule aligned with their construction timeline.",
  },
  {
    title: "Factory Warehouse Roof Replacement",
    location: "Sagamu, Ogun State",
    description:
      "Long span aluminium roofing sheets supplied for the re-roofing of a 2,000 square metre industrial warehouse. The project required 0.55mm sheets in silver grey with extra-long spans to reduce the number of joints. We coordinated delivery over two trucks to match the client&apos;s installation schedule.",
  },
  {
    title: "School Building Roofing",
    location: "Ibadan, Oyo State",
    description:
      "Step-tile aluminium roofing sheets supplied for a three-storey school building with eight classrooms. The school administration chose 0.50mm burgundy sheets for a clean, professional appearance. We provided technical guidance on the number of sheets required based on the architectural drawings.",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-primary-foreground">
        <div className="h-1 w-full bg-accent" />
        <div className="container px-4 mx-auto max-w-6xl py-16 md:py-20">
          <p className="text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3">
            Portfolio
          </p>
          <h1 className="font-heading uppercase font-bold text-4xl md:text-5xl text-balance">
            Projects &amp; Case Studies
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto max-w-6xl">
          <p className="text-sm text-muted-foreground md:text-base mb-4">
            Over the years, Gods Promise Aluminium has supplied roofing
            materials for hundreds of residential, commercial, industrial and
            religious building projects across Lagos and other states in
            Nigeria. Below are some examples of how our customers have used our
            aluminium roofing sheets and accessories on real projects.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Each project demonstrates our ability to handle different building
            types, order sizes and delivery logistics. From single-unit
            bungalows in suburban Lagos to multi-unit estate developments and
            large warehouse re-roofing jobs, we provide the same level of
            attention to product quality and customer service. Contact us to
            discuss how we can support your next roofing project with
            factory-direct aluminium roofing sheets at competitive prices.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {sampleProjects.map((project) => (
              <div
                key={project.title}
                className="rounded-sm border border-border bg-card p-6"
              >
                <h2 className="font-heading font-bold text-base mb-1">
                  {project.title}
                </h2>
                <p className="text-xs font-heading uppercase tracking-widest text-accent mb-2">
                  {project.location}
                </p>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
