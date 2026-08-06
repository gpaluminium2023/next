# TikTok Developer Kit — Integration Plan

**Site**: Gods Promise Aluminium — Next.js 16 marketing site + storefront
**Prepared**: 2026-08-06
**Scope**: developers.tiktok.com products only (Embed/oEmbed, Login Kit, Share Kit, Content Posting API, Webhooks)

---

## 0. Repo findings that drive every recommendation below

- **Framework**: Next.js 16.2.2, App Router, React 19.2, TypeScript. Mix of static/ISR marketing pages and `force-dynamic` storefront pages (`app/store/[slug]/page.tsx`).
- **SEO plumbing already in place**: dynamic `app/sitemap.ts` (DB-driven, hourly revalidate), `app/robots.ts`, per-page `Metadata` exports with OG/Twitter cards, a `LocalBusiness` JSON-LD block injected site-wide in `app/layout.tsx` (from `lib/site-identity.ts`), `Product` JSON-LD on `app/store/[slug]/page.tsx`, a pre-generated OG image pipeline (`lib/og-image.ts` + `scripts/make-og-images.mjs`), and `public/llms.txt` for AI-search visibility. This is a well-instrumented site — new work should slot into these existing patterns, not create parallel ones.
- **Social presence today is link-only, no embeds anywhere**: `components/site-footer.tsx` lists Instagram, Facebook, X, YouTube, TikTok, Threads, Snapchat and WhatsApp as plain outbound `<a rel="noopener nofollow">` links. There is currently **zero** embedded third-party content (no iframes, no oEmbed, no widget scripts) on the site.
- **⚠️ Data inconsistency found**: the footer TikTok link points to `https://www.tiktok.com/@godspromiseroofing_1`, while the `sameAs` array used in the site-wide `LocalBusiness` JSON-LD (`lib/site-identity.ts:55`) points to `https://www.tiktok.com/@godspacltd`. Two different handles are being asserted as "this business's TikTok" to Google and to users. This should be fixed regardless of any TikTok Kit integration — it weakens entity/Knowledge-Panel matching. Pick the real active handle and use it in both places.
- **Video infrastructure already exists — and it's self-hosted**: `Product` already has a `videoUrl` field (`prisma/schema.prisma:202`, "Cloudinary secure_url") and `components/store/product-gallery.tsx` already plays a self-hosted product video inline in the gallery carousel. This matters a lot: the site does not need to lean on a third-party embed to show video — it already has a working self-host pipeline via Cloudinary, which is also what backs all gallery/OG images.
- **A video gallery is planned but not built**: `docs/feat-15-video-gallery.md` specs a `/gallery` video section using YouTube/Vimeo iframes, lazy-loaded, with `VideoObject` JSON-LD per video, "Low priority, 1-2 days." This is the natural slot for TikTok embeds — see §2.1.
- **Testimonials are 100% text today**: `app/page.tsx` homepage testimonial grid and the dedicated `app/reviews/page.tsx` are both plain text quotes; `/reviews` funnels users to leave a **Google** review via WhatsApp. No video testimonials exist yet.
- **No customer account system exists**: `app/checkout/page.tsx` is guest-only — it redirects straight to Paystack's `authorization_url`; there is no sign-up/sign-in flow for shoppers anywhere in `/store` or `/checkout`. This is the single biggest fact ruling out Login Kit (see §2.2).
- **Admin auth is internal-only and unrelated to customers**: `app/admin/login/page.tsx` uses `better-auth` email/password for staff (per project memory, a `staff` role was recently added for bank-transfer order confirmation). It is not a public-facing account system and has no reason to grow a third-party consumer OAuth provider.
- **`/admin` already is the staff CMS surface**: `app/admin/blog/new/page.tsx`, `app/admin/products/*`, `app/admin/orders/*` are the existing pattern for "staff does a task in a form, gated by better-auth." A Content Posting API tool would extend this exact pattern (see §2.4).

---

## 1. Summary table

| Integration | Effort | SEO Impact | Business Impact | Recommended |
|---|---|---|---|---|
| Fix TikTok handle inconsistency (footer vs. `sameAs`) | Trivial (~15 min) | Low–Medium (entity consistency) | Low | **Y** |
| Embed Videos (oEmbed) — "Follow us" strip on `/gallery` | Low (0.5–1 day) | Low, and **only if paired with self-hosted video + schema** | Medium (social proof, dwell time) | **Y — as secondary content, not primary** |
| Self-hosted video + `VideoObject` schema (extends existing `feat-15`) | Medium (2–4 days) | **High** | Medium–High | **Y — do this first, before embedding** |
| Content Posting API — `/admin/social` staff tool | Medium–High (app review + OAuth + upload UI) | Indirect only (content-marketing flywheel) | Medium (ops efficiency, not sales) | **Y — lower priority** |
| Share Kit — "share this project/product to TikTok" button | Low–Medium | ~None | Low (uncertain adoption on web) | **Conditional / nice-to-have** |
| Login Kit — customer or admin auth | N/A | None | Negative (adds attack surface, no real need) | **N** |
| Webhooks | N/A standalone | None | None standalone | **N — only if Content Posting API ships and needs async status** |

Excluded outright (don't fit this site, per your instructions):
- **Research Tools** — academic/research data access API; irrelevant to a commercial roofing storefront.
- **Data Portability API** — lets TikTok users export *their own TikTok data*; this site doesn't process TikTok user data, so there's nothing to port.
- **Commercial Content API** — branded-content disclosure tooling for agencies running paid TikTok ad campaigns at scale; only becomes relevant if the business starts running TikTok Ads, which is outside "developer kit for site capability/SEO."

---

## 2. Implementation plan for recommended integrations

### 2.1 Self-hosted video + `VideoObject` schema, TikTok embed as a secondary widget

This supersedes `docs/feat-15-video-gallery.md`'s original YouTube/Vimeo plan — same shape, better SEO outcome, and it reuses infrastructure that already exists (`product.videoUrl` via Cloudinary).

**Why self-host first**: TikTok's oEmbed is an iframe pointing at `tiktok.com`. Googlebot does not execute and index the video content inside that iframe as *your* content — you get zero incremental crawlable text/video association with your domain from the embed itself. Google's Video rich-result eligibility wants a `VideoObject` with a `contentUrl` or `embedUrl` it can actually resolve; a self-hosted Cloudinary MP4 is far more reliably indexed than a third-party iframe. The pragmatic path: upload the same clips you post to TikTok to Cloudinary (the pipeline already exists), host them at `/gallery` with real `VideoObject` schema, and add TikTok embeds beside them only as a "this is also on our TikTok" social-proof affordance.

**Files to touch:**
- `app/gallery/page.tsx` — add a video section following the existing `galleryImages` grid pattern (currently image-only, `app/gallery/page.tsx:23-180`).
- New `lib/videos-data.ts` — video metadata (title, description, category, Cloudinary `contentUrl`, thumbnail, duration, TikTok `embedUrl` if also posted there), same shape `feat-15` already specified.
- New `components/video-card.tsx` / reuse `components/store/product-gallery.tsx` patterns for the lazy player.
- `app/sitemap.ts` — optionally add a video sitemap entry per Google's Video Sitemap format once you have 5+ hosted videos.

**`VideoObject` schema (self-hosted, primary):**

```tsx
// app/gallery/page.tsx — alongside the existing static galleryImages grid
const videoJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: videos.map((v, i) => ({
    "@type": "VideoObject",
    position: i + 1,
    name: v.title,
    description: v.description,
    thumbnailUrl: v.thumbnail, // self-hosted, so Google can actually fetch it
    uploadDate: v.uploadDate,
    duration: v.duration, // ISO 8601, e.g. "PT1M45S"
    contentUrl: v.cloudinaryUrl, // real, crawlable MP4 — this is what makes it indexable
    embedUrl: v.tiktokEmbedUrl, // optional, secondary
  })),
};
```

### 2.2 TikTok embed component (lazy-loaded, secondary widget)

Placed on `/gallery` under a "Follow @[handle] on TikTok" heading, and optionally as a small strip in the homepage testimonials section (`app/page.tsx:296-340`) once there's video testimonial content. Lazy-load on intersection so it never costs anything on initial page load — same discipline `feat-15` already called out for YouTube ("embeds loaded only on play... no performance impact on initial page load").

```tsx
// components/tiktok-embed.tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface TikTokEmbedProps {
  videoId: string;
  authorHandle: string; // e.g. "godspacltd" — no @
}

export function TikTokEmbed({ videoId, authorHandle }: TikTokEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    // TikTok's embed.js scans the DOM for blockquote.tiktok-embed on load,
    // then again on each call to window.tiktokEmbedLoad() it exposes.
    if (document.getElementById("tiktok-embed-script")) {
      (window as unknown as { tiktokEmbedLoad?: () => void }).tiktokEmbedLoad?.();
      return;
    }
    const script = document.createElement("script");
    script.id = "tiktok-embed-script";
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="mx-auto max-w-[325px]">
      {shouldLoad ? (
        <blockquote
          className="tiktok-embed"
          cite={`https://www.tiktok.com/@${authorHandle}/video/${videoId}`}
          data-video-id={videoId}
        >
          <section />
        </blockquote>
      ) : (
        // Lightweight placeholder — no iframe, no script, until scrolled into view
        <a
          href={`https://www.tiktok.com/@${authorHandle}/video/${videoId}`}
          target="_blank"
          rel="noopener nofollow"
          className="flex aspect-9/16 items-center justify-center rounded-sm border border-border bg-card text-sm text-muted-foreground"
        >
          Loading TikTok video…
        </a>
      )}
    </div>
  );
}
```

**Fix the handle inconsistency at the same time** (`lib/site-identity.ts:55` and `components/site-footer.tsx:268`) — confirm the real handle with the business owner and use one value in both places; consider pulling both from `siteIdentity.socialLinks` so there's a single source of truth instead of a hardcoded string in the footer.

### 2.3 Login Kit — not recommended

No customer account system exists to attach it to (`app/checkout/page.tsx` is guest-only, Paystack-redirect). Building a customer account system just to hang TikTok Login Kit off it would be solving a problem the site doesn't have — classic scope creep for an "SEO/capability" ask. The admin side (`app/admin/login/page.tsx`) is internal, staff-only, and should not depend on a public consumer OAuth provider — that would widen its attack surface for no benefit (staff aren't authenticating as TikTok creators). Revisit only if/when the business decides to build customer accounts for order history — and at that point evaluate it against simpler options (email magic link, Google) first, since TikTok login has no relevance to a B2B/B2C roofing buyer's existing habits.

### 2.4 Content Posting API — `/admin/social` staff tool (lower priority)

The business already runs an active TikTok account and already posts factory/production content there manually (the same photos already live in `app/gallery/page.tsx`'s "Factory & Production" category). A staff-only posting tool would extend the existing `/admin` pattern (`app/admin/blog/new/page.tsx`, gated by `better-auth`) with a page where staff upload a factory/production clip once and it posts directly to the business TikTok account via the Content Posting API, instead of switching to the TikTok app.

- **Route**: `app/admin/social/page.tsx`, following the existing admin page shape.
- **Requires**: TikTok Developer app registration, Content Posting API approval (TikTok reviews the app and use case before granting this scope), and OAuth token storage/refresh for the business account — non-trivial setup relative to the payoff.
- **SEO impact**: indirect only — posts live on tiktok.com, not on this domain, so they don't directly move this site's rankings. The value is operational (staff saves a context switch) and downstream (more consistent TikTok posting → more branded search volume / referral traffic over time), not a direct SEO lever. Don't oversell this as an SEO integration internally — it's a content-ops tool.
- **Webhooks** become relevant here only if you want async confirmation that an uploaded video finished processing/publishing rather than polling — skip until this ships, if it ships.

### 2.5 Share Kit — conditional, low priority

Nice-to-have on `app/store/[slug]/page.tsx` or `app/gallery/page.tsx` ("share this to TikTok"), but flag two things before building it: TikTok's Share Kit is primarily a mobile SDK (iOS/Android deep-link into the TikTok app's composer with pre-loaded media); web support is a thinner deep-link flow with no guarantee of a polished experience, and most visitors sharing a *photo* of a finished roof aren't set up to turn it into a TikTok video in-session anyway. Given the site's actual conversion goal is WhatsApp leads and store checkout, this has the weakest expected payoff of anything on this list — build it only if there's a specific campaign asking for it, not proactively.

---

## 3. What NOT to do (SEO cautions)

1. **Don't treat TikTok oEmbed as your video content strategy.** Embeds are not a substitute for indexable content — the iframe's video is not crawled/indexed as part of your domain. If a factory-tour or installation-demo video matters for SEO, it must exist as a self-hosted asset (Cloudinary, same as `product.videoUrl` already does) with real `VideoObject` schema, per §2.1. TikTok embeds are a trust/social-proof layer on top, never the primary delivery.
2. **Don't add the TikTok embed script (`embed.js`) globally.** It must be lazy-loaded on intersection/interaction, scoped to the specific page section that uses it (e.g. `/gallery`) — never added to `app/layout.tsx` or `components/site-footer.tsx`, which render on every route. Loading it site-wide would regress Core Web Vitals (LCP/INP) across the entire site for a widget most pages don't need. The footer's existing TikTok link should stay exactly what it is today: a plain `<a>` tag, no script.
3. **Don't build Login Kit before there's a reason to.** There is no customer account system today; adding social login is solving a problem this site doesn't have. If customer accounts get built later, evaluate providers against actual buyer habits, not "TikTok has a kit for it."
4. **Don't let entity signals diverge.** Fix the `@godspacltd` vs. `@godspromiseroofing_1` mismatch between `lib/site-identity.ts`'s `sameAs` and `components/site-footer.tsx` before doing anything else on this list — an inconsistent `sameAs` weakens how confidently Google associates the TikTok profile with this business's Knowledge Panel / Local entity.
5. **Don't confuse Content Posting API with an SEO lever.** It's a content-ops convenience for staff, not something that improves this site's rankings. Keep publishing the actual long-form equivalent (factory-tour write-ups, installation guides) on `/blog` or `/articles` per `docs/blog-content-plan.md` — that's what builds this domain's own topical authority and backlinks, not TikTok posts.
6. **Don't request broader OAuth scopes than needed** if the Content Posting API tool gets built (§2.4) — request only the video-upload/direct-post scope for the business account, not Login Kit user-info scopes you won't use. Narrower scope requests also tend to move faster through TikTok's app review.
