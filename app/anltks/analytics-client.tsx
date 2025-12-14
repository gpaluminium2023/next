'use client';

import { useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type PageStat = {
	url: string;
	count: number;
};

type ReferrerStat = {
	referrer: string;
	count: number;
};

type AnalyticsSummary = {
	pageStats: PageStat[];
	referrerStats: ReferrerStat[];
	totalEvents: number;
} | null;

interface AnalyticsClientPageProps {
	summary: AnalyticsSummary;
	days: number;
}

export function AnalyticsClientPage({
	summary,
	days,
}: AnalyticsClientPageProps) {
	const posthog = usePostHog();

	useEffect(() => {
		if (!posthog) return;
		posthog.capture('anltks_viewed', {
			page: '/anltks',
			description: 'Internal analytics overview opened',
		});
	}, [posthog]);

	const pageStats = summary?.pageStats ?? [];
	const referrerStats = summary?.referrerStats ?? [];
	const totalEvents = summary?.totalEvents ?? 0;
	const hasData = totalEvents > 0;

	return (
		<div className='min-h-screen bg-background'>
			<section className='bg-gradient-to-b from-muted/60 to-background py-10 md:py-14'>
				<div className='container mx-auto max-w-5xl px-4'>
					<h1 className='text-3xl md:text-4xl font-bold tracking-tight text-balance mb-2'>
						Analytics overview
					</h1>
					<p className='text-muted-foreground max-w-2xl text-sm md:text-base'>
						Private analytics dashboard for Gods Promise Aluminium,
						powered by PostHog. Use this page as a guide to
						understand what we track and how to explore it in the
						main PostHog app.
					</p>
				</div>
			</section>

			<section className='py-10 md:py-14'>
				<div className='container mx-auto max-w-5xl px-4 space-y-8'>
					<Card>
						<CardHeader>
							<CardTitle className='text-xl'>
								Summary (last {days} days)
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-2 text-sm text-muted-foreground'>
							{hasData ? (
								<div className='grid gap-4 sm:grid-cols-3'>
									<div>
										<p className='text-xs uppercase tracking-wide text-muted-foreground'>
											Total pageviews
										</p>
										<p className='text-2xl font-semibold text-foreground'>
											{totalEvents}
										</p>
									</div>
									<div>
										<p className='text-xs uppercase tracking-wide text-muted-foreground'>
											Distinct pages
										</p>
										<p className='text-2xl font-semibold text-foreground'>
											{pageStats.length}
										</p>
									</div>
									<div>
										<p className='text-xs uppercase tracking-wide text-muted-foreground'>
											Distinct referrers
										</p>
										<p className='text-2xl font-semibold text-foreground'>
											{referrerStats.length}
										</p>
									</div>
								</div>
							) : (
								<p>
									No analytics data available yet for the last{' '}
									{days} day(s), or the PostHog API
									credentials are not configured. Once events
									are flowing, this page will show pageview
									and referrer summaries.
								</p>
							)}
						</CardContent>
					</Card>

					{hasData && (
						<Card>
							<CardHeader>
								<CardTitle className='text-xl'>
									Page views by URL
								</CardTitle>
							</CardHeader>
							<CardContent className='space-y-2 text-sm text-muted-foreground'>
								<p>
									Top pages by number of{' '}
									<code>$pageview</code>
									events in the last {days} days.
								</p>
								<div className='overflow-x-auto rounded-md border border-border bg-card/50'>
									<table className='min-w-full text-left text-xs md:text-sm'>
										<thead className='bg-muted/60 text-muted-foreground'>
											<tr>
												<th className='px-3 py-2 font-medium'>
													Page URL
												</th>
												<th className='px-3 py-2 font-medium text-right'>
													Views
												</th>
											</tr>
										</thead>
										<tbody>
											{pageStats
												.slice(0, 10)
												.map((row) => (
													<tr
														key={row.url}
														className='border-t border-border/60'
													>
														<td className='px-3 py-2 align-top break-all text-foreground'>
															{row.url}
														</td>
														<td className='px-3 py-2 text-right font-semibold text-foreground'>
															{row.count}
														</td>
													</tr>
												))}
										</tbody>
									</table>
								</div>
							</CardContent>
						</Card>
					)}

					{hasData && (
						<Card>
							<CardHeader>
								<CardTitle className='text-xl'>
									Top referrers
								</CardTitle>
							</CardHeader>
							<CardContent className='space-y-2 text-sm text-muted-foreground'>
								<p>
									Where visitors came from before viewing your
									pages, based on the <code>$referrer</code>{' '}
									property.
								</p>
								<div className='overflow-x-auto rounded-md border border-border bg-card/50'>
									<table className='min-w-full text-left text-xs md:text-sm'>
										<thead className='bg-muted/60 text-muted-foreground'>
											<tr>
												<th className='px-3 py-2 font-medium'>
													Referrer
												</th>
												<th className='px-3 py-2 font-medium text-right'>
													Visits
												</th>
											</tr>
										</thead>
										<tbody>
											{referrerStats
												.slice(0, 10)
												.map((row) => (
													<tr
														key={row.referrer}
														className='border-t border-border/60'
													>
														<td className='px-3 py-2 align-top break-all text-foreground'>
															{row.referrer}
														</td>
														<td className='px-3 py-2 text-right font-semibold text-foreground'>
															{row.count}
														</td>
													</tr>
												))}
										</tbody>
									</table>
								</div>
							</CardContent>
						</Card>
					)}
					<Card>
						<CardHeader>
							<CardTitle className='text-xl'>
								Key automatic events
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-3 text-sm text-muted-foreground'>
							<p>
								PostHog automatically captures core product
								usage events across the entire site:
							</p>
							<ul className='list-disc pl-5 space-y-1'>
								<li>
									<span className='font-medium text-foreground'>
										$pageview
									</span>{' '}
									&mdash; fired on every page load and route
									change.
								</li>
								<li>
									<span className='font-medium text-foreground'>
										$pageleave
									</span>{' '}
									&mdash; fired when visitors leave a page.
								</li>
								<li>
									<span className='font-medium text-foreground'>
										$autocapture
									</span>{' '}
									&mdash; clicks on buttons, links, and key UI
									elements.
								</li>
								<li>
									<span className='font-medium text-foreground'>
										$exception
									</span>{' '}
									&mdash; captured JavaScript errors when
									Error Tracking is enabled.
								</li>
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className='text-xl'>
								Custom business events
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-3 text-sm text-muted-foreground'>
							<p>
								In addition to automatic events, we can send
								custom events from important flows. Examples you
								may want to track:
							</p>
							<ul className='list-disc pl-5 space-y-1'>
								<li>
									<span className='font-medium text-foreground'>
										contact_whatsapp_opened
									</span>{' '}
									when a user submits the contact form and
									WhatsApp opens.
								</li>
								<li>
									<span className='font-medium text-foreground'>
										product_whatsapp_click
									</span>{' '}
									when a user clicks the WhatsApp support link
									from the products page.
								</li>
								<li>
									<span className='font-medium text-foreground'>
										phone_call_click
									</span>{' '}
									when a user taps one of the phone numbers.
								</li>
								<li>
									<span className='font-medium text-foreground'>
										social_profile_click
									</span>{' '}
									with a property like <code>platform</code>{' '}
									(Instagram, Facebook, X, YouTube, TikTok,
									Threads, Snapchat).
								</li>
								<li>
									<span className='font-medium text-foreground'>
										theme_changed
									</span>{' '}
									with a property like <code>theme</code>{' '}
									(Default, Christmas, New Year, etc.).
								</li>
							</ul>
							<p>
								To capture a custom event from any client
								component, use
								<code> usePostHog()</code> from{' '}
								<code>posthog-js/react</code> and call{' '}
								<code>
									posthog.capture(&apos;event_name&apos;,
									properties)
								</code>
								.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className='text-xl'>
								How to explore data in PostHog
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-3 text-sm text-muted-foreground'>
							<ol className='list-decimal pl-5 space-y-1'>
								<li>
									Open your PostHog project (usually at{' '}
									<code>https://us.posthog.com</code> or your
									custom domain).
								</li>
								<li>
									Go to{' '}
									<span className='font-medium text-foreground'>
										Insights
									</span>{' '}
									&rarr;{' '}
									<span className='font-medium text-foreground'>
										Trends
									</span>{' '}
									to see pageviews, WhatsApp clicks, and other
									key events over time.
								</li>
								<li>
									Build a funnel from <code>$pageview</code>{' '}
									on the home page to
									<code>contact_whatsapp_opened</code> to
									understand how many visitors convert to
									enquiries.
								</li>
								<li>
									Use{' '}
									<span className='font-medium text-foreground'>
										Recordings
									</span>{' '}
									to watch real sessions and see how people
									move through the site.
								</li>
								<li>
									Use{' '}
									<span className='font-medium text-foreground'>
										Dashboards
									</span>{' '}
									to pin your most important charts (e.g.
									enquiries per week, traffic by source,
									device breakdown).
								</li>
							</ol>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className='text-xl'>
								Current session details
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-2 text-sm text-muted-foreground'>
							<p>
								This page is also tracked as a normal visit. In
								PostHog, look for the event{' '}
								<code>anltks_viewed</code> to see who is opening
								this internal analytics overview.
							</p>
							<Separator className='my-2' />
							<p>
								You can enrich events with properties like{' '}
								<code>$current_url</code>,
								<code>$geoip_country_name</code>, device type,
								and more. Most of these are added automatically
								by PostHog.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	);
}
