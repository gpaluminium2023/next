import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { blogPosts } from '@/lib/blog-posts';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface BlogPostPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export function generateStaticParams() {
	return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
	params,
}: BlogPostPageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = blogPosts.find((p) => p.slug === slug);

	if (!post) {
		return {
			title: 'Blog post | Gods Promise Aluminium',
		};
	}

	const url = `https://godspromisealuminiumroofing.com/blog/${post.slug}`;
	const imageUrl = post.imageSrc ?? '/logo.jpeg';
	const imageAlt = post.imageAlt ?? `${post.title} - Gods Promise Aluminium`;

	return {
		title: `${post.title} | Gods Promise Aluminium`,
		description: post.excerpt,
		openGraph: {
			title: `${post.title} | Gods Promise Aluminium`,
			description: post.excerpt,
			url,
			type: 'article',
			locale: 'en_NG',
			siteName: 'Gods Promise Aluminium',
			publishedTime: post.date,
			images: [
				{
					url: imageUrl,
					alt: imageAlt,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: `${post.title} | Gods Promise Aluminium`,
			description: post.excerpt,
			images: [imageUrl],
		},
		alternates: {
			canonical: url,
		},
	};
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;
	const post = blogPosts.find((p) => p.slug === slug);

	if (!post) {
		return (
			<div className='mx-auto max-w-3xl px-4 py-16'>
				<p className='text-sm text-muted-foreground'>
					This blog post could not be found.
				</p>
				<p className='mt-4 text-sm'>
					<Link
						href='/blog'
						className='text-primary underline'
					>
						Back to blog
					</Link>
				</p>
			</div>
		);
	}

	// TODO: Replace this placeholder with real blog content
	// For now we show the title, meta info, optional image and body paragraphs
	return (
		<div className='bg-linear-to-b from-primary/5 via-background to-background'>
			<article className='mx-auto max-w-3xl px-4 py-12 md:py-16'>
				<div className='mb-6 space-y-2'>
					<Badge variant='secondary'>Aluminium roofing blog</Badge>
					<h1 className='text-balance text-3xl font-bold tracking-tight md:text-4xl'>
						{post.title}
					</h1>
					<p className='text-xs text-muted-foreground'>
						<span>
							{new Date(post.date).toLocaleDateString('en-NG', {
								year: 'numeric',
								month: 'short',
								day: 'numeric',
							})}
						</span>
						{post.readingTimeMinutes && (
							<span>{` • ${post.readingTimeMinutes} min read`}</span>
						)}
					</p>
				</div>
				{post.imageSrc && (
					<div className='mb-6 overflow-hidden rounded-xl border border-border/60 bg-muted'>
						<div className='relative aspect-video w-full'>
							<Image
								src={post.imageSrc}
								alt={post.imageAlt ?? post.title}
								fill
								className='object-cover'
								sizes='(min-width: 1024px) 50vw, 100vw'
							/>
						</div>
					</div>
				)}
				<Separator className='mb-6' />
				<div className='space-y-4 text-sm leading-relaxed text-muted-foreground'>
					{post.body.map((paragraph, index) => (
						<p key={index}>{paragraph}</p>
					))}
				</div>
				<p className='mt-8 text-sm'>
					Need today&apos;s aluminium roofing sheet price in Lagos or
					anywhere in Nigeria? Visit our{' '}
					<Link
						href='/contact'
						className='text-primary underline'
					>
						contact page
					</Link>{' '}
					to call us or request a WhatsApp quote.
				</p>
				<p className='mt-4 text-sm'>
					<Link
						href='/blog'
						className='text-primary underline'
					>
						← Back to all articles
					</Link>
				</p>
			</article>
		</div>
	);
}
