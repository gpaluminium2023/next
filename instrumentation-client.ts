// PostHog is the heaviest script on the site and nothing above the fold
// depends on it, so it is imported lazily and started once the browser goes
// idle. That keeps ~60KB of parse/execute off the critical path on mobile,
// where 82% of this site's search traffic lands.
//
// Trade-off, deliberately taken: the initial pageview and any exception fire
// up to ~3s later than they used to, so a visitor who leaves inside that
// window may go uncounted. The `timeout` below caps the delay — lower it to
// tighten the window, or call startPostHog() at the top level of this file to
// go back to eager init if analytics completeness ever outweighs LCP.
function schedule(run: () => void) {
  if (typeof window === "undefined") return;

  // Safari < 16.4 has no requestIdleCallback; fall back to a plain timer.
  const idle = window.requestIdleCallback as typeof window.requestIdleCallback | undefined;

  if (idle) {
    idle(run, { timeout: 3000 });
  } else {
    window.setTimeout(run, 2000);
  }
}

schedule(() => {
  void import("@/lib/posthog").then(({ startPostHog }) => startPostHog());
});
