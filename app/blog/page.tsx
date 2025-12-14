import Link from 'next/link';
import Image from 'next/image';

import type { Metadata } from 'next';
import { blogPosts } from '@/lib/blog-posts';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
	title: 'Blog & resources | Gods Promise Aluminium',
	description:
		'Aluminium roofing guides, price updates and practical resources for homeowners, builders and contractors in Lagos and across Nigeria.',
};

export default function BlogIndexPage() {
	const sortedPosts = [...blogPosts].sort((a, b) =>
		a.date < b.date ? 1 : -1
	);

	return (
		<div className='bg-linear-to-b from-primary/5 via-background to-background'>
			<section className='py-12 md:py-20'>
				<div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
					<div className='mb-10 max-w-3xl space-y-3'>
						<Badge variant='secondary'>Blog & resources</Badge>
						<h1 className='text-3xl font-bold tracking-tight md:text-4xl'>
							Aluminium roofing guides & price updates
						</h1>
						<p className='text-sm md:text-base text-muted-foreground'>
							Practical articles to help you choose the right
							aluminium roofing sheets, understand pricing in
							Lagos and across Nigeria, and plan your next roofing
							project with confidence.
						</p>
					</div>

					<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
						{sortedPosts.map((post) => (
							<Card
								key={post.slug}
								className='h-full transition-shadow hover:shadow-md pt-0'
							>
								{post.imageSrc && (
									<div className='relative h-40 w-full overflow-hidden rounded-t-lg border-b border-border/60 bg-muted'>
										<Image
											src={post.imageSrc}
											alt={post.imageAlt ?? post.title}
											fill
											className='object-cover'
											sizes='(min-width: 1024px) 33vw, 50vw'
										/>
									</div>
								)}
								<CardHeader className='pb-2'>
									<CardTitle className='line-clamp-2 text-base md:text-lg'>
										<Link
											href={`/blog/${post.slug}`}
											className='hover:underline'
										>
											{post.title}
										</Link>
									</CardTitle>
								</CardHeader>
								<CardContent className='space-y-2 text-sm text-muted-foreground'>
									<p className='line-clamp-3'>
										{post.excerpt}
									</p>
									<p className='text-xs text-muted-foreground/80'>
										<span>
											{new Date(
												post.date
											).toLocaleDateString('en-NG', {
												year: 'numeric',
												month: 'short',
												day: 'numeric',
											})}
										</span>
										{post.readingTimeMinutes && (
											<span>{` • ${post.readingTimeMinutes} min read`}</span>
										)}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
