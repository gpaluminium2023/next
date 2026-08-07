'use client';

import { ReactNode } from 'react';
import { PostHogProvider } from 'posthog-js/react';

import { startPostHog } from '@/lib/posthog';

// Mounted only by /anltks, the internal analytics page — it is the sole
// consumer of usePostHog(). Keeping this in the root layout put posthog-js in
// every public page's client bundle for no benefit.
//
// startPostHog() is called during render rather than in an effect because the
// page captures an event on mount, and instrumentation-client.ts only starts
// PostHog on browser idle. The call is idempotent: whichever path runs first
// wins and the other is a no-op.
export function PosthogProvider({ children }: { children: ReactNode }) {
	const posthog = startPostHog();

	return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
