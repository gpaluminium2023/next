import type { Metadata } from 'next';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
	title: 'Projects & case studies | Gods Promise Aluminium',
	description:
		'A simple overview of sample aluminium roofing projects completed by Gods Promise Aluminium for homes, churches and commercial buildings in Lagos and across Nigeria.',
};

const sampleProjects = [
	{
		title: 'Residential bungalow roof in Lagos',
		location: 'Alimosho, Lagos State',
		description:
			'Long span aluminium roofing sheets supplied and installed for a 3-bedroom bungalow, with on-site verification before dispatch.',
	},
	{
		title: 'Church roofing project',
		location: 'Ogun State',
		description:
			'Step-tile aluminium roofing sheets supplied for a new church auditorium, with guidance on thickness and quantity.',
	},
];

export default function ProjectsPage() {
	return (
		<div className='bg-gradient-to-b from-primary/5 via-background to-background'>
			<section className='mx-auto max-w-6xl px-4 py-12 md:py-16 space-y-8'>
				<div className='max-w-3xl space-y-2'>
					<h1 className='text-3xl font-bold tracking-tight md:text-4xl'>
						Projects & case studies
					</h1>
					<p className='text-sm text-muted-foreground md:text-base'>
						A few examples of how customers have used our aluminium
						roofing sheets and accessories on real projects.
					</p>
				</div>
				<div className='grid gap-6 md:grid-cols-2'>
					{sampleProjects.map((project) => (
						<Card key={project.title}>
							<CardHeader>
								<CardTitle className='text-base font-semibold'>
									{project.title}
								</CardTitle>
							</CardHeader>
							<CardContent className='text-sm text-muted-foreground space-y-1'>
								<p className='font-medium'>
									{project.location}
								</p>
								<p>{project.description}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</section>
		</div>
	);
}
