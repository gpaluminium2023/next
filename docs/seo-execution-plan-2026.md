# SEO Execution Plan 2026 — Gods Promise Aluminium

> **Strategy**: Intent-first keyword targeting, reverse-outreach link building, and authority funnelling for the Nigerian roofing market.

---

## Overview: What This Plan Adds

The existing [blog-content-plan.md](blog-content-plan.md) covers 70 topical-authority blog posts across 6 pillars. This plan **layers on top of it** with:

1. **New "Journalist Magnet" stat pages** — designed to attract backlinks from Nigerian news sites, Nairaland, and real estate blogs.
2. **New long-tail commercial blog posts** — targeting builders with purchase intent.
3. **Internal link funnelling strategy** — routing backlink authority into `/products` and `/pricing`.
4. **Updated blog topics** mapped to the 5-phase SEO framework.
5. **Technical SEO checklist** aligned with Next.js App Router.

---

## Phase 1: Keyword Targeting (Intent, Not Volume)

### A. Long-Tail Commercial Keywords (Buyers Ready to Purchase)

These are the **exact queries** contractors type into Google from building sites. Each becomes a blog post or lands on an existing page.

| # | Target Keyword | Intent | Map To |
|---|---|---|---|
| 1 | "price of 0.55mm long span aluminium roofing sheets in Lagos" | Transactional | New blog post |
| 2 | "Gerard stone coated roofing tiles price in Nigeria 2026" | Transactional | Update existing post #3 |
| 3 | "where to buy aluminium roofing sheets directly from factory in Lagos" | Transactional | New blog post |
| 4 | "0.45mm vs 0.55mm aluminium roofing sheet which is better" | Commercial investigation | Update existing post #7 slug |
| 5 | "cost of roofing a 4 bedroom duplex in Lagos 2026" | Transactional | **New stat page** (Phase 4) |
| 6 | "aluminium roofing sheet price per square metre Nigeria 2026" | Transactional | New blog post |
| 7 | "step tile aluminium roofing sheet price in Lagos" | Transactional | New blog post |
| 8 | "Metcopo roofing sheet price per metre in Nigeria" | Transactional | New blog post |
| 9 | "stone coated roof tiles installation cost Lagos" | Transactional | New blog post |
| 10 | "bulk roofing sheet supplier Lagos factory direct" | Transactional | New blog post |

### B. Journalist / "Be the Source" Keywords (For Backlinks)

These are the **data points** that Nigerian real estate bloggers, Punch, Guardian, BusinessDay, and Nairaland forum users search for when writing articles. We create definitive stat pages that become their cited sources.

| # | Target Keyword | Format | Priority |
|---|---|---|---|
| J1 | "average cost to roof a 4-bedroom duplex in Nigeria 2026" | Stat page | 🔴 Critical |
| J2 | "lifespan of 0.45mm vs 0.55mm aluminium roofing sheets" | Stat page | 🔴 Critical |
| J3 | "aluminium roofing sheet price trend Nigeria 2024 2025 2026" | Data/chart page | 🔴 Critical |
| J4 | "cost of building materials in Lagos 2026" | Stat page section | 🟡 Medium |
| J5 | "roofing sheet price comparison chart Nigeria" | Infographic page | 🟡 Medium |
| J6 | "how much does it cost to roof a house in Nigeria" | Stat page | 🔴 Critical |
| J7 | "naira exchange rate impact on building material prices" | Data page | 🟡 Medium |

---

## Phase 2: Technical & On-Page Implementation

### Checklist (Next.js App Router Specific)

- [x] **Metadata API** — Every route exports `metadata` or `generateMetadata()` with keyword-first titles ✅
- [x] **Canonical URLs** — Set on all pages ✅
- [x] **OpenGraph + Twitter cards** — Present on all pages ✅
- [x] **Dynamic sitemap.ts** — Includes blog posts, location pages ✅
- [x] **robots.ts** — Configured, disallows analytics ✅
- [x] **Static generation** — `generateStaticParams()` on blog/[slug] and locations/[state] ✅
- [x] **Structured data** — `ItemList` + `Product` schema on /products ✅

### To-Do Items

- [ ] **Add `FAQPage` JSON-LD schema** to every blog post with FAQ sections
- [ ] **Add `Article` JSON-LD schema** to blog/[slug] pages (publishedTime, author, publisher)
- [ ] **Add `BreadcrumbList` schema** to all pages for enhanced SERP display
- [ ] **Verify LCP < 2.5s** — Audit all hero images use `next/image` with `priority` prop
- [ ] **Add year to pricing page title** — Ensure title includes "2026" and is updated annually
- [ ] **Update existing blog post #1** slug from `aluminum-roofing-sheet-price-lagos-2025` to `aluminum-roofing-sheet-price-lagos` (redirect the old URL) and update the content body for 2026 prices
- [ ] **Ensure first 100 words** of every page contain the primary keyword naturally

---

## Phase 3: Content Structure & UX Fixes

### Frontload the Value

For every product/service page, the **first visible element** should answer the user's question:

| Page | Current First Element | Recommended First Element |
|---|---|---|
| `/products/stone-coated` | Hero intro paragraph | Available profiles grid (Shingle, Bond, Classic, Milano) + "Get Quote" CTA |
| `/pricing` | Intro paragraph | Price summary table + "WhatsApp for exact quote" CTA |
| `/services` | About services text | Service list with prices + booking CTA |
| `/products` | Product intro | Product cards with starting prices visible |

### Format for Mobile Skimming

- Body text: minimum 16px (1rem), line-height 1.6–1.75
- Paragraphs: max 3–4 sentences
- Use bold/highlighted key numbers (prices, dimensions, timelines)
- Tables with horizontal scroll on mobile for price comparisons
- Sticky WhatsApp CTA button on mobile

---

## Phase 4: "Reverse Outreach" Link Building — Stat Pages

### Page 1: "2026 Cost Guide: Average Cost to Roof a 4-Bedroom Duplex in Nigeria"

**URL**: `/resources/cost-to-roof-4-bedroom-duplex-nigeria-2026`

**Why it works**: This is the single most-searched building cost question in Nigeria. Every real estate writer, Nairaland thread, and property blog needs this number. If our page is the most authoritative source, they link to us.

**Structure**:
```
H1: How Much Does It Cost to Roof a 4-Bedroom Duplex in Nigeria in 2026?

[ANSWER BOX — immediately visible, no scrolling]
"As of March 2026, the total cost to roof a standard 4-bedroom duplex 
in Nigeria ranges from ₦X to ₦Y depending on material choice. 
0.50mm long span aluminium costs ₦6,300–₦6,800 per square metre. 
Stone-coated tiles cost ₦4,750–₦6,500 per piece."

H2: Cost Breakdown by Roofing Material
  - Table: Material | Price/unit | Estimated total for 4-bed duplex
  - Long span (0.45mm, 0.50mm, 0.55mm)
  - Step tile
  - Metcopo
  - Stone-coated (Shingle, Bond, Classic, Milano)

H2: Labour & Installation Costs
  - Average labour rates in Lagos, Abuja, PH
  - Carpenter/welder costs
  - Timeline

H2: Additional Costs Most People Forget
  - Fascia boards, gutters, ridge caps, flashing
  - Delivery charges by location
  - Wastage allowance (10-15%)

H2: Total Cost Comparison Table
  - Budget tier vs mid-range vs premium
  - ₦ per sqm and total project cost

H2: How to Get an Accurate Quote
  → CTA: "Send your roof plan via WhatsApp for a free estimate"
  → Internal link: /pricing
  → Internal link: /products
  → Internal link: /contact

[FAQ Section with FAQPage schema]
```

### Page 2: "Aluminium Roofing Sheet Price Trend in Nigeria (2024–2026)"

**URL**: `/resources/aluminium-roofing-price-trend-nigeria`

**Why it works**: Journalists writing about "rising cost of building in Nigeria" need historical data. A chart showing price movement over 2 years with exchange rate commentary becomes a go-to citation.

**Structure**:
```
H1: Aluminium Roofing Sheet Price Trend in Nigeria (2024–2026)

[CHART — price per sqm over time, by product type]

H2: Price Changes Year-by-Year
H2: Key Factors Driving Price Changes (Dollar rate, raw material, demand)
H2: Price Forecast: What to Expect in Late 2026
H2: How to Lock in Current Prices
  → CTA + internal links to /pricing and /products
```

### Page 3: "Roofing Sheet Lifespan Comparison: 0.45mm vs 0.55mm"

**URL**: `/resources/roofing-sheet-lifespan-045mm-vs-055mm`

**Why it works**: This is the technical question every spec-sheet writer and building consultant searches. Definitive data with real-world Nigerian climate context.

---

## Phase 5: Authority Funnelling — Internal Link Strategy

Once stat pages accumulate backlinks, **route the authority** to commercial pages:

### Link Placement Rules for Stat Pages

Every "journalist magnet" stat page MUST contain:

1. **2–3 contextual links to `/products`** within the body text
   - Anchor text examples: "our long span aluminium roofing sheets", "view our stone-coated tile range"

2. **1–2 contextual links to `/pricing`** near price data
   - Anchor text: "see our current 2026 price list", "factory-direct pricing"

3. **1 link to `/contact`** as the final CTA
   - Anchor text: "get a free roofing estimate via WhatsApp"

4. **1–2 links to related blog posts** for topical clustering

### Existing Blog Post Link Audit

Update these existing posts with links to the new stat pages (creates a two-way authority flow):

| Existing Post | Add Link To |
|---|---|
| Post #1 (price Lagos 2025) | → Stat page: cost to roof 4-bed duplex |
| Post #3 (stone coated prices) | → Stat page: price trend chart |
| Post #4 (longspan vs steptile) | → Stat page: lifespan comparison |
| Post #7 (gauge thickness) | → Stat page: lifespan comparison |

---

## New Blog Topics — Aligned to 5-Phase Framework

### Tier 1: "Reverse Outreach" Stat Posts (Publish FIRST)

These are the highest-priority new posts. They serve Phase 4 (link building) and Phase 1 (journalist keywords).

| # | Slug | Title | Target Keyword | Type |
|---|---|---|---|---|
| S1 | `cost-to-roof-4-bedroom-duplex-nigeria-2026` | How Much Does It Cost to Roof a 4-Bedroom Duplex in Nigeria in 2026? | cost to roof a 4-bedroom duplex Nigeria 2026 | Stat page |
| S2 | `aluminium-roofing-price-trend-nigeria` | Aluminium Roofing Sheet Price Trend in Nigeria (2024–2026) | aluminium roofing sheet price trend Nigeria | Data page |
| S3 | `roofing-sheet-lifespan-045mm-vs-055mm` | How Long Do 0.45mm and 0.55mm Roofing Sheets Last? (Lifespan Comparison) | lifespan 0.45mm vs 0.55mm aluminium roofing sheets | Stat page |
| S4 | `cost-of-building-materials-lagos-2026-roofing` | Cost of Building Materials in Lagos 2026 — Roofing Section | cost of building materials Lagos 2026 | Stat page |
| S5 | `roofing-cost-calculator-nigeria` | Free Roofing Cost Calculator for Nigerian Homes (2026) | roofing cost calculator Nigeria | Interactive tool |

### Tier 2: Long-Tail Commercial Posts (Buyer Intent)

These target contractors and homeowners ready to purchase. Publish after the stat pages are live.

| # | Slug | Title | Target Keyword |
|---|---|---|---|
| C1 | `055mm-long-span-aluminium-roofing-sheet-price-lagos` | Price of 0.55mm Long Span Aluminium Roofing Sheets in Lagos (2026) | 0.55mm long span aluminium roofing sheets price Lagos |
| C2 | `step-tile-aluminium-roofing-sheet-price-lagos-2026` | Step Tile Aluminium Roofing Sheet Price in Lagos (2026 Factory Direct) | step tile aluminium roofing sheet price Lagos |
| C3 | `metcopo-roofing-sheet-price-per-metre-nigeria` | Metcopo Roofing Sheet Price Per Metre in Nigeria (2026 Update) | Metcopo roofing sheet price per metre Nigeria |
| C4 | `buy-roofing-sheets-factory-direct-lagos` | How to Buy Roofing Sheets Factory Direct in Lagos (Save 15–25%) | buy roofing sheets factory direct Lagos |
| C5 | `stone-coated-roof-tiles-installation-cost-lagos` | Stone Coated Roof Tiles Installation Cost in Lagos (Materials + Labour) | stone coated tiles installation cost Lagos |
| C6 | `bulk-aluminium-roofing-sheets-wholesale-price-nigeria` | Bulk Aluminium Roofing Sheets Wholesale Price in Nigeria (2026) | bulk aluminium roofing sheets wholesale price Nigeria |
| C7 | `cost-of-roofing-a-5-bedroom-duplex-lagos` | Cost of Roofing a 5-Bedroom Duplex in Lagos (2026 Full Breakdown) | cost of roofing 5 bedroom duplex Lagos |
| C8 | `gerard-stone-coated-tiles-price-nigeria-2026` | Gerard Stone Coated Roofing Tiles Price in Nigeria (2026 Authorized Dealer) | Gerard stone coated tiles price Nigeria 2026 |
| C9 | `aluminium-roofing-sheets-delivery-to-abuja-from-lagos` | Aluminium Roofing Sheets Delivery to Abuja From Lagos (Cost & Timeline) | aluminium roofing sheets delivery Abuja |
| C10 | `roofing-sheet-price-list-all-gauges-nigeria-2026` | Aluminium Roofing Sheet Price List — All Gauges & Profiles (Nigeria 2026) | aluminium roofing sheet price list Nigeria 2026 |

### Tier 3: Topical Authority Posts (Fill Gaps in Existing Plan)

These fill gaps the existing 70-post plan doesn't cover, especially for 2026-specific queries.

| # | Slug | Title | Target Keyword |
|---|---|---|---|
| T1 | `how-exchange-rate-affects-roofing-sheet-prices-nigeria` | How the Dollar-Naira Exchange Rate Affects Roofing Sheet Prices in Nigeria | exchange rate roofing sheet prices Nigeria |
| T2 | `complete-guide-to-roof-accessories-nigeria` | Complete Guide to Roof Accessories in Nigeria (Ridge Caps, Flashing, Gutters & More) | roof accessories Nigeria guide |
| T3 | `roofing-a-bungalow-vs-duplex-cost-difference-nigeria` | Roofing a Bungalow vs Duplex — Cost Difference Explained (Nigeria 2026) | roofing bungalow vs duplex cost Nigeria |
| T4 | `how-to-verify-aluminium-roofing-sheet-thickness` | How to Verify Aluminium Roofing Sheet Thickness Before Buying | verify aluminium roofing sheet thickness |
| T5 | `aluminium-roofing-sheet-colour-options-lagos` | Aluminium Roofing Sheet Colour Options Available in Lagos (With Photos) | aluminium roofing sheet colours Lagos |
| T6 | `why-you-should-avoid-cheap-roofing-sheets-nigeria` | Why You Should Avoid Cheap Roofing Sheets in Nigeria (False Economy) | cheap roofing sheets Nigeria warning |
| T7 | `roofing-materials-checklist-for-nigerian-contractors` | Roofing Materials Checklist for Nigerian Contractors (Print & Use) | roofing materials checklist Nigeria |
| T8 | `how-long-does-it-take-to-roof-a-house-in-nigeria` | How Long Does It Take to Roof a House in Nigeria? (Timeline by Building Type) | how long to roof a house Nigeria |
| T9 | `best-roofing-sheet-for-lagos-island-coastal-weather` | Best Roofing Sheet for Lagos Island & Coastal Areas (Salt Air Resistant) | best roofing sheet Lagos Island coastal |
| T10 | `aluminium-vs-stone-coated-total-cost-of-ownership` | Aluminium vs Stone-Coated Tiles: Total Cost of Ownership Over 20 Years | aluminium vs stone coated total cost ownership |

---

## Updates to Existing Blog Posts

### Posts to Update (Content Refresh)

| Existing Post | Update Required |
|---|---|
| #1: `aluminum-roofing-sheet-price-lagos-2025` | **Rename slug** to `-lagos` (year-agnostic), update all 2025 prices → 2026, add internal links to new stat pages, add `FAQPage` schema |
| #3: `stone-coated-roofing-sheet-prices-lagos` | Refresh prices for March 2026, add link to Gerard stat post (C8), add links to stat page (S1) |
| #4: `longspan-vs-steptile-vs-metcopo-comparison` | Add 2026 price updates in comparison table, link to lifespan stat page (S3) |
| #7 (planned): `roofing-sheet-gauge-thickness-price-difference` | Integrate data from stat page S3, cross-link both ways |

### Posts to Prioritize from Existing Plan (Reorder)

The existing plan's priority queue should be adjusted. **Publish these first** because they directly support the reverse-outreach strategy:

| New Priority | Post # | Title | Reason |
|---|---|---|---|
| 1st | **S1** (NEW) | Cost to Roof a 4-Bedroom Duplex | Journalist magnet, highest backlink potential |
| 2nd | **S2** (NEW) | Aluminium Roofing Price Trend | Data-driven, media-citation target |
| 3rd | **S3** (NEW) | Lifespan 0.45mm vs 0.55mm | Technical authority, consultant citation target |
| 4th | #5 | Cost of Roofing a 3-Bedroom House | Transactional, high volume |
| 5th | **C1** (NEW) | 0.55mm Long Span Price Lagos | Exact-match buyer query |
| 6th | **C10** (NEW) | Price List All Gauges Nigeria 2026 | Comprehensive buyer resource |
| 7th | #8 | How to Choose Best Roofing Company | Brand positioning |
| 8th | #11 | How to Calculate Roofing Sheets | Evergreen calculator content |
| 9th | **C4** (NEW) | Buy Factory Direct Lagos | Differentiator content |
| 10th | #28 | Top Roofing Companies in Lagos | Local SEO, "roofing company Lagos" |
| 11th | **S4** (NEW) | Cost of Building Materials Lagos 2026 | Broader journalist magnet |
| 12th | #29 | Where to Buy Roofing Sheets Lagos | Transactional local intent |

---

## Publishing Schedule (Revised)

| Period | Posts | Focus |
|---|---|---|
| **Weeks 1–2** | S1, S2, S3 | Stat pages (journalist magnets) — publish immediately |
| **Weeks 3–4** | C1, C10, S4 | Commercial long-tail + building materials stat page |
| **Weeks 5–6** | C2, C3, C4, C8 | Product-specific pricing posts |
| **Weeks 7–8** | #5, #8, #11 | High-priority posts from existing plan |
| **Month 3+** | Resume existing plan priority queue | Continue with remaining 70-post plan interspersed with Tier 3 posts |

**Ongoing**: Publish 2 posts/week for first 2 months, then 1 post/week from month 3 onwards.

---

## Tracking & KPIs

| Metric | Target | Tool |
|---|---|---|
| Stat page backlinks | 10+ referring domains within 6 months | Google Search Console / Ahrefs |
| Organic traffic to /pricing | +50% in 6 months | Google Analytics |
| Organic traffic to /products | +50% in 6 months | Google Analytics |
| "Cost to roof" keyword ranking | Top 3 within 4 months | Google Search Console |
| WhatsApp quote requests from blog | Track with UTM parameters | WhatsApp Business |
| Blog post indexing speed | < 48 hours after publish | Google Search Console |
| Core Web Vitals (LCP) | < 2.5s on all pages | PageSpeed Insights |

---

## Quick Reference: Content Types

| Type | Purpose | Internal Links Required |
|---|---|---|
| **Stat page** | Attract journalist backlinks | 2–3 to /products, 1–2 to /pricing, 1 to /contact |
| **Commercial post** | Convert buyer-intent search traffic | 1 to /pricing, 1 to /products, 1 to /contact, 2 to related blog posts |
| **Topical authority post** | Build domain expertise signals | 2 to related blog posts, 1 to /products or /services, 1 to /contact |
| **Location page** | Dominate local search | 1 to /products, 1 to /pricing, 1 to /delivery |
