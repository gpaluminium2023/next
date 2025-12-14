import type { Metadata } from 'next';

import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { blogPosts } from '@/lib/blog-posts';

export const metadata: Metadata = {
	title: 'Resources & guides | Gods Promise Aluminium',
	description:
		'Aluminium roofing guides, FAQs and blog posts to help you choose the right roofing sheets and plan your project in Lagos and across Nigeria.',
};

export default function ResourcesPage() {
	const sortedPosts = [...blogPosts].sort((a, b) =>
		a.date < b.date ? 1 : -1
	);

	return (
		<div className='bg-gradient-to-b from-primary/5 via-background to-background'>
			<section className='mx-auto max-w-6xl px-4 py-12 md:py-16 space-y-8'>
				<div className='max-w-3xl space-y-2'>
					<h1 className='text-3xl font-bold tracking-tight md:text-4xl'>
						Resources & guides
					</h1>
					<p className='text-sm text-muted-foreground md:text-base'>
						Start here for our key aluminium roofing guides, FAQs
						and price-related articles.
					</p>
				</div>

				<div className='grid gap-6 md:grid-cols-2'>
					<Card>
						<CardHeader>
							<CardTitle className='text-base font-semibold'>
								Help & support
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-2 text-sm text-muted-foreground'>
							<ul className='list-disc space-y-1 pl-5'>
								<li>
									<Link
										href='/faq'
										className='text-primary underline-offset-2 hover:underline'
									>
										Frequently asked questions
									</Link>
								</li>
								<li>
									<Link
										href='/pricing'
										className='text-primary underline-offset-2 hover:underline'
									>
										Pricing & how quotes work
									</Link>
								</li>
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className='text-base font-semibold'>
								Latest articles
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-2 text-sm text-muted-foreground'>
							<ul className='space-y-1'>
								{sortedPosts.slice(0, 3).map((post) => (
									<li key={post.slug}>
										<Link
											href={`/blog/${post.slug}`}
											className='text-primary underline-offset-2 hover:underline'
										>
											{post.title}
										</Link>
									</li>
								))}
							</ul>
							<p>
								<Link
									href='/blog'
									className='text-primary underline-offset-2 hover:underline'
								>
									View all blog posts
								</Link>
							</p>
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	);
}
