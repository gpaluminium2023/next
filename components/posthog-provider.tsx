'use client';

import { ReactNode } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

// posthog.init() runs in instrumentation-client.ts, which Next.js loads
// before this module — do not call init() again here (it's a no-op and
// logs a warning, plus risks drifting out of sync with that config).
export function PosthogProvider({ children }: { children: ReactNode }) {
	return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
