import type { Metadata } from 'next';
import { AnalyticsClientPage } from './analytics-client';

export const metadata: Metadata = {
	title: 'Analytics Overview - Gods Promise Aluminium',
	description:
		'Internal analytics overview powered by PostHog for Gods Promise Aluminium.',
	robots: {
		index: false,
		follow: false,
	},
};

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
};

async function getAnalyticsSummary(
	days: number
): Promise<AnalyticsSummary | null> {
	const apiKey = process.env.POSTHOG_PERSONAL_API_KEY;
	const projectId = process.env.POSTHOG_PROJECT_ID;
	const hostEnv = process.env.POSTHOG_API_HOST || 'https://us.posthog.com';

	if (!apiKey || !projectId) {
		return null;
	}

	const since = new Date(
		Date.now() - days * 24 * 60 * 60 * 1000
	).toISOString();
	const baseUrl = hostEnv.replace(/\/$/, '');
	const url = new URL(`/api/projects/${projectId}/events/`, baseUrl);
	url.searchParams.set('event', '$pageview');
	url.searchParams.set('after', since);
	url.searchParams.set('limit', '500');

	const response = await fetch(url.toString(), {
		headers: {
			Authorization: `Bearer ${apiKey}`,
		},
		cache: 'no-store',
	});

	if (!response.ok) {
		console.error('Failed to fetch PostHog analytics', response.statusText);
		return null;
	}

	const data = await response.json();
	const events = Array.isArray(data?.results) ? data.results : [];

	const pageCounts = new Map<string, number>();
	const refCounts = new Map<string, number>();
	let total = 0;

	for (const ev of events) {
		const props = ev.properties || {};
		const urlValue =
			(props.$current_url as string | undefined) || '(unknown)';
		const rawRef = (props.$referrer as string | undefined) || '';
		const refValue = rawRef || 'direct / none';

		pageCounts.set(urlValue, (pageCounts.get(urlValue) || 0) + 1);
		refCounts.set(refValue, (refCounts.get(refValue) || 0) + 1);
		total += 1;
	}

	const pageStats: PageStat[] = Array.from(pageCounts.entries())
		.map(([url, count]) => ({ url, count }))
		.sort((a, b) => b.count - a.count);

	const referrerStats: ReferrerStat[] = Array.from(refCounts.entries())
		.map(([referrer, count]) => ({ referrer, count }))
		.sort((a, b) => b.count - a.count);

	return {
		pageStats,
		referrerStats,
		totalEvents: total,
	};
}

export default async function AnalyticsPage() {
	const days = 7;
	const summary = await getAnalyticsSummary(days);

	return (
		<AnalyticsClientPage
			summary={summary}
			days={days}
		/>
	);
}
