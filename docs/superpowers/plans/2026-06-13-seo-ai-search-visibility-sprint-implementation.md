# SEO AI Search Visibility Sprint Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the local website and documentation changes from the SEO and AI Search Visibility Sprint design.

**Architecture:** Centralize company identity in one shared TypeScript module, then reuse it in metadata, JSON-LD, FAQ content, About content, and review collection surfaces. Keep off-site work in a documented operations checklist because Google Business Profile, directories, and social profile edits require external account access.

**Tech Stack:** Next.js 16 App Router, React Server Components, TypeScript, Tailwind CSS, schema.org JSON-LD, static `public/llms.txt`, Markdown docs.

---

## File Structure

- Create `lib/site-identity.ts`: canonical company identity, social links, service areas, and schema helpers.
- Modify `app/layout.tsx`: use shared identity for `LocalBusiness` JSON-LD and root metadata.
- Modify `app/faq/page.tsx`: use shared identity, resolve address conflict, expand answer-first FAQs, add `FAQPage` JSON-LD.
- Modify `app/about/page.tsx`: upgrade the About page into the canonical company entity page using verified facts.
- Create `app/reviews/page.tsx`: review collection page with WhatsApp copy, email copy, and QR-code instructions.
- Modify `app/sitemap.ts`: include `/reviews` if sitemap uses a manual route list.
- Modify `public/llms.txt`: refresh stale URLs and include current 2026 priority pages.
- Create `docs/seo-ai-search-operations-checklist.md`: 30-day off-site SEO/AI visibility checklist.

## Task 1: Centralize Business Identity and Fix NAP Source

**Files:**
- Create: `lib/site-identity.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add shared identity module**

Create `lib/site-identity.ts` with exported constants for company name, brand name, URL, phone, address, social links, services, products, and a `localBusinessJsonLd` object.

- [ ] **Step 2: Update root metadata and schema**

Modify `app/layout.tsx` to import `siteIdentity` and `localBusinessJsonLd`, then use them in metadata and the JSON-LD script.

- [ ] **Step 3: Verify TypeScript**

Run: `pnpm exec tsc --noEmit`

Expected: exits with code 0.

- [ ] **Step 4: Commit**

Run:

```bash
git add lib/site-identity.ts app/layout.tsx
git commit -m "feat: centralize site identity"
```

## Task 2: Fix FAQ Content and Add FAQ Schema

**Files:**
- Modify: `app/faq/page.tsx`

- [ ] **Step 1: Resolve address discrepancy**

Replace the `55 Owutu Road, Ikorodu, Lagos` factory inspection reference with the canonical Sango Ota address from `siteIdentity`.

- [ ] **Step 2: Expand answer-first FAQs**

Update the FAQ list to include the priority questions from the spec: pricing, lifespan, gauge choice, profile comparison, coastal roofing, delivery, thickness verification, quotes, colours, and factory address.

- [ ] **Step 3: Add `FAQPage` JSON-LD**

Render a `<script type="application/ld+json">` with `@type: "FAQPage"` and `mainEntity` generated from the FAQ array.

- [ ] **Step 4: Verify TypeScript**

Run: `pnpm exec tsc --noEmit`

Expected: exits with code 0.

- [ ] **Step 5: Commit**

Run:

```bash
git add app/faq/page.tsx
git commit -m "feat: add faq schema and canonical answers"
```

## Task 3: Upgrade About as Canonical Entity Page

**Files:**
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Use shared identity**

Import `siteIdentity` and replace hard-coded phone, address, product, and social facts where practical.

- [ ] **Step 2: Add entity sections**

Add focused sections for company facts, factory and production, product lines, service areas, quality process, and official profiles. Use only verified facts already present in the site.

- [ ] **Step 3: Improve internal links**

Ensure the page links to `/products`, `/pricing`, `/gallery`, `/projects`, `/delivery`, `/faq`, and `/contact`.

- [ ] **Step 4: Verify TypeScript**

Run: `pnpm exec tsc --noEmit`

Expected: exits with code 0.

- [ ] **Step 5: Commit**

Run:

```bash
git add app/about/page.tsx
git commit -m "feat: strengthen about entity page"
```

## Task 4: Add Review Collection Page

**Files:**
- Create: `app/reviews/page.tsx`
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Create reviews route**

Create a server component page at `/reviews` with metadata, Google review CTA, WhatsApp request template, email request template, follow-up template, QR-code instructions, and links to `/contact` and `/projects`.

- [ ] **Step 2: Add route to sitemap**

If `app/sitemap.ts` uses a manual static route list, add `/reviews` with a reasonable priority.

- [ ] **Step 3: Verify TypeScript**

Run: `pnpm exec tsc --noEmit`

Expected: exits with code 0.

- [ ] **Step 4: Commit**

Run:

```bash
git add app/reviews/page.tsx app/sitemap.ts
git commit -m "feat: add review collection page"
```

## Task 5: Refresh `llms.txt`

**Files:**
- Modify: `public/llms.txt`

- [ ] **Step 1: Replace stale URLs**

Update old 2025 blog URLs to current 2026 URLs and add priority pages: `/pricing`, `/faq`, `/reviews`, `/projects`, `/locations`, and key price/stat guides.

- [ ] **Step 2: Verify content**

Run: `Select-String -Path public\\llms.txt -Pattern "2025|Ikorodu|Owutu"`

Expected: no stale primary URL/address references unless part of historical article titles that are intentionally retained.

- [ ] **Step 3: Commit**

Run:

```bash
git add public/llms.txt
git commit -m "docs: refresh ai crawler source file"
```

## Task 6: Add Off-Site Operations Checklist

**Files:**
- Create: `docs/seo-ai-search-operations-checklist.md`

- [ ] **Step 1: Create checklist**

Document the 30-day sequence for NAP audit, Google Business Profile, reviews, directory listings, LinkedIn, YouTube, project case studies, and monthly AI visibility tracking.

- [ ] **Step 2: Include reusable templates**

Include WhatsApp review request copy, email review request copy, directory profile description, LinkedIn bio, YouTube channel description, and AI visibility tracking table columns.

- [ ] **Step 3: Commit**

Run:

```bash
git add docs/seo-ai-search-operations-checklist.md
git commit -m "docs: add seo ai operations checklist"
```

## Task 7: Final Verification

**Files:**
- Check all edited files.

- [ ] **Step 1: Run TypeScript**

Run: `pnpm exec tsc --noEmit`

Expected: exits with code 0.

- [ ] **Step 2: Run lint**

Run: `pnpm exec eslint app layout.tsx components lib --max-warnings=0`

Expected: exits with code 0. If this command is too broad for the project, run `pnpm exec eslint app/faq/page.tsx app/about/page.tsx app/reviews/page.tsx app/layout.tsx lib/site-identity.ts --max-warnings=0`.

- [ ] **Step 3: Review git diff**

Run: `git status --short`

Expected: clean working tree after all task commits.

## Self-Review

- Spec coverage: The plan covers NAP consistency, About entity content, FAQ schema, review collection, `llms.txt`, off-site checklist, and verification. Case study implementation is deferred to the operations checklist and existing `/projects` route because this sprint can publish the repeatable structure without inventing unverified client details.
- Placeholder scan: No open placeholder values are required to implement local code. The Google direct review link is handled as an external account task because it requires Google Business Profile access.
- Type consistency: Shared identity should be imported from `lib/site-identity.ts` by all changed TypeScript files.
