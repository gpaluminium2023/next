import posthog from "posthog-js";

// Single entry point for starting PostHog, shared by the two callers that
// need it on different schedules:
//
//   • instrumentation-client.ts imports this lazily on browser idle, so
//     posthog-js stays out of the critical path on public pages.
//   • components/posthog-provider.tsx calls it synchronously, because the
//     only page mounting that provider (/anltks) captures an event on mount
//     and would otherwise race ahead of the idle callback.
//
// The module-level flag makes the second call a no-op rather than a repeat
// init(), which posthog-js warns about and which would risk the two call
// sites drifting out of config sync.
let started = false;

export function startPostHog(): typeof posthog {
  if (started) return posthog;
  started = true;

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2025-05-24",
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  });

  return posthog;
}
