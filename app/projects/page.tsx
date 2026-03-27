import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Projects & Case Studies | Gods Promise Aluminium',
	description:
		'A simple overview of sample aluminium roofing projects completed by Gods Promise Aluminium for homes, churches and commercial buildings in Lagos and across Nigeria.',
};

const sampleProjects = [
	{
		title: 'Residential Bungalow Roof in Lagos',
		location: 'Alimosho, Lagos State',
		description:
			'Long span aluminium roofing sheets supplied and installed for a 3-bedroom bungalow, with on-site verification before dispatch.',
	},
	{
		title: 'Church Roofing Project',
		location: 'Ogun State',
		description:
			'Step-tile aluminium roofing sheets supplied for a new church auditorium, with guidance on thickness and quantity.',
	},
];

export default function ProjectsPage() {
	return (
		<div className='min-h-screen bg-background'>
			<section className='bg-primary text-primary-foreground'>
				<div className='h-1 w-full bg-accent' />
				<div className='container px-4 mx-auto max-w-6xl py-16 md:py-20'>
					<p className='text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3'>
						Portfolio
					</p>
					<h1 className='font-heading uppercase font-bold text-4xl md:text-5xl text-balance'>
						Projects &amp; Case Studies
					</h1>
				</div>
			</section>

			<section className='py-12 md:py-16'>
				<div className='container px-4 mx-auto max-w-6xl'>
					<p className='text-sm text-muted-foreground md:text-base mb-8'>
						A few examples of how customers have used our aluminium
						roofing sheets and accessories on real projects.
					</p>
					<div className='grid gap-6 md:grid-cols-2'>
						{sampleProjects.map((project) => (
							<div
								key={project.title}
								className='rounded-sm border border-border bg-card p-6'
							>
								<h2 className='font-heading font-bold text-base mb-1'>
									{project.title}
								</h2>
								<p className='text-xs font-heading uppercase tracking-widest text-accent mb-2'>
									{project.location}
								</p>
								<p className='text-sm text-muted-foreground'>
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
