import type { Metadata } from 'next';
import Link from 'next/link';

import { blogPosts } from '@/lib/blog-posts';

export const metadata: Metadata = {
	title: 'Resources & Guides | Gods Promise Aluminium',
	description:
		'Aluminium roofing guides, FAQs and blog posts to help you choose the right roofing sheets and plan your project in Lagos and across Nigeria.',
};

export default function ResourcesPage() {
	const sortedPosts = [...blogPosts].sort((a, b) =>
		a.date < b.date ? 1 : -1
	);

	return (
		<div className='min-h-screen bg-background'>
			<section className='bg-primary text-primary-foreground'>
				<div className='h-1 w-full bg-accent' />
				<div className='container px-4 mx-auto max-w-6xl py-16 md:py-20'>
					<p className='text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3'>
						Knowledge Base
					</p>
					<h1 className='font-heading uppercase font-bold text-4xl md:text-5xl text-balance'>
						Resources &amp; Guides
					</h1>
				</div>
			</section>

			<section className='py-12 md:py-16'>
				<div className='container px-4 mx-auto max-w-6xl'>
					<p className='text-sm text-muted-foreground md:text-base mb-8'>
						Start here for our key aluminium roofing guides, FAQs
						and price-related articles.
					</p>
					<div className='grid gap-6 md:grid-cols-2'>
						<div className='rounded-sm border border-border bg-card p-6'>
							<h2 className='font-heading font-bold text-base mb-3'>
								Help &amp; Support
							</h2>
							<ul className='list-disc space-y-1 pl-5 text-sm text-muted-foreground'>
								<li>
									<Link
										href='/faq'
										className='text-accent underline-offset-2 hover:underline'
									>
										Frequently asked questions
									</Link>
								</li>
								<li>
									<Link
										href='/pricing'
										className='text-accent underline-offset-2 hover:underline'
									>
										Pricing &amp; how quotes work
									</Link>
								</li>
							</ul>
						</div>

						<div className='rounded-sm border border-border bg-card p-6'>
							<h2 className='font-heading font-bold text-base mb-3'>
								Latest Articles
							</h2>
							<ul className='space-y-1 text-sm text-muted-foreground'>
								{sortedPosts.slice(0, 3).map((post) => (
									<li key={post.slug}>
										<Link
											href={`/blog/${post.slug}`}
											className='text-accent underline-offset-2 hover:underline'
										>
											{post.title}
										</Link>
									</li>
								))}
							</ul>
							<p className='mt-2'>
								<Link
									href='/blog'
									className='text-sm text-accent underline-offset-2 hover:underline'
								>
									View all blog posts →
								</Link>
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
