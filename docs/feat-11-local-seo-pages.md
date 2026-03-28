# Feature 11 — Local SEO Landing Pages

**Priority**: 🟡 Medium  
**Effort**: M (3–5 days)  
**Dependencies**: Optional Sanity CMS for content management  
**Route**: `/locations/[state]` (e.g., `/locations/abuja`, `/locations/port-harcourt`)

---

## Problem

GPA serves customers nationwide but only has a Lagos address. The site doesn't  
rank for location-specific searches like "aluminium roofing sheets in Abuja" or  
"roof prices in Port Harcourt."

## Solution

Dedicated landing pages for each major Nigerian state/city with localised content,  
local pricing context, delivery info, and schema.org LocalBusiness markup.

---

## Target Locations

### Priority Tier 1 (top search volume)
Lagos, Abuja (FCT), Port Harcourt (Rivers), Ogun, Oyo (Ibadan)

### Priority Tier 2
Kano, Kaduna, Enugu, Anambra (Onitsha), Delta, Edo (Benin), Ondo

### Tier 3 (remaining 24 states)
Generated from template with minimal customisation.

---

## Page Structure

```
/locations/[state]

├── Hero: "Aluminium Roofing Sheets in [State]"
├── Local context: delivery times, available products
├── Pricing snippet: top 3 gauges with local delivery cost
├── Completed projects in [State] (links to /projects filtered)
├── Dealer/stockist info in [State] (if applicable)
├── FAQ: state-specific questions
├── CTA: "Get a Quote for [State]" → WhatsApp / quote form
└── JSON-LD: LocalBusiness schema
```

---

## Technical Design

### File Structure

```
app/
  locations/
    page.tsx              ← index: all locations grid
    [state]/
      page.tsx            ← dynamic state page
lib/
  locations-data.ts       ← state metadata, delivery info
```

### Static Generation

```ts
// app/locations/[state]/page.tsx
import { locations } from '@/lib/locations-data';

export async function generateStaticParams() {
  return locations.map((loc) => ({ state: loc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const loc = locations.find((l) => l.slug === state);
  return {
    title: `Aluminium Roofing Sheets in ${loc?.name} — Gods Promise Aluminium`,
    description: `Buy quality aluminium roofing sheets in ${loc?.name}. Factory-direct pricing, fast delivery. Long span, step tiles, stone coated tiles.`,
  };
}
```

### Location Data Shape

```ts
export interface LocationData {
  slug: string;             // "abuja"
  name: string;             // "Abuja (FCT)"
  deliveryDays: string;     // "2–3 business days"
  deliveryNote?: string;    // "Delivery via trailer from Lagos factory"
  hasDealer: boolean;
  dealerInfo?: string;
  popularProducts: string[];
  faq: { q: string; a: string }[];
}
```

### JSON-LD Schema

```tsx
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Gods Promise Aluminium — Abuja",
  "description": "Aluminium roofing sheets supplier in Abuja",
  "address": { "@type": "PostalAddress", "addressRegion": "FCT", "addressCountry": "NG" },
  "telephone": "+234-XXX-XXX-XXXX",
  "url": "https://godspromisealuminium.com/locations/abuja",
  "areaServed": { "@type": "State", "name": "Federal Capital Territory" },
})}
</script>
```

---

## SEO Targets (per page)

| Keyword Pattern | Example |
|---|---|
| aluminium roofing sheet price in [state] | aluminium roofing sheet price in abuja |
| roof sheet [state] | roof sheet port harcourt |
| buy aluminium roofing [city] | buy aluminium roofing ibadan |
| [brand] roofing sheet [state] | gods promise roofing sheet lagos |

---

## Acceptance Criteria

- [ ] At least 12 state pages generated (Tier 1 + Tier 2)
- [ ] Each page has unique meta title and description
- [ ] JSON-LD LocalBusiness markup on every page
- [ ] Delivery time and cost info per state
- [ ] Links to relevant projects filtered by state
- [ ] FAQ section with state-specific questions
- [ ] Internal links from homepage and footer
- [ ] `/locations` index page lists all available locations
- [ ] `generateStaticParams` for static generation at build time

---

## SEO (Enhanced)

> This feature is inherently SEO-focused. The section below formalises the metadata strategy.

### Page Metadata

```ts
// /locations — index page
export const metadata: Metadata = {
  title: 'Aluminium Roofing Sheet Dealers & Delivery Across Nigeria',
  description:
    'Find Gods Promise Aluminium roofing sheets in your state. '
    + 'We deliver to Lagos, Abuja, Rivers, Oyo, and 30+ states.',
  alternates: { canonical: '/locations' },
};

// /locations/[state] — dynamic per state
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: `Aluminium Roofing Sheets in ${state.name} | Prices & Delivery`,
    description:
      `Buy aluminium roofing sheets in ${state.name}. `
      + `Delivery in ${state.deliveryDays} days. Prices from ₦${state.startPrice}/sqm.`,
    alternates: { canonical: `/locations/${state.slug}` },
  };
}
```

### Target Keywords (per state)

| Pattern | Example |
|---------|---------|
| aluminium roofing sheet price in [state] | aluminium roofing sheet price in Abuja |
| buy roofing sheets [state] | buy roofing sheets Rivers |
| [product] roofing [state] | long span roofing Lagos |
| roofing sheet delivery [state] | roofing sheet delivery Oyo |

### Structured Data (JSON-LD)

Per-state page:

```json
{
  "@type": "LocalBusiness",
  "name": "Gods Promise Aluminium — [State]",
  "areaServed": { "@type": "State", "name": "[State]" },
  "address": { "@type": "PostalAddress", "addressRegion": "[State]" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Aluminium Roofing Sheets"
  }
}
```

Index page: `ItemList` of all state pages.

### Internal Linking

- Homepage → "We deliver across Nigeria" → `/locations`
- Footer → top 6 state links
- `/delivery` → links to each state’s location page
- Each state page → links to `/projects?state=[state]`, `/quote`, `/pricing`
- Blog: "Aluminium Roofing in [City]" posts link to state pages
