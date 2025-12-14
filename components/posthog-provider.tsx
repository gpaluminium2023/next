'use client';

import { ReactNode, useEffect } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (typeof window !== 'undefined' && POSTHOG_KEY) {
	// Initialise PostHog once on the client. Subsequent calls are ignored.
	posthog.init(POSTHOG_KEY, {
		api_host: '/ingest',
		ui_host: 'https://us.posthog.com',
		capture_pageview: true,
		capture_pageleave: true,
		capture_exceptions: true,
		debug: process.env.NODE_ENV === 'development',
	});
}

export function PosthogProvider({ children }: { children: ReactNode }) {
	// Ensure pageviews are captured on route changes in the App Router
	// (PostHog also auto-captures, but this guarantees single-page navigations).
	useEffect(() => {
		if (!POSTHOG_KEY) return;
		// This will rely on PostHog's built-in SPA pageview handling after init.
	}, []);

	return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
