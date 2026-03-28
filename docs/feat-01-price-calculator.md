# Feature 01 — Instant Price Calculator

**Priority**: 🔴 High  
**Effort**: S (2–4 days)  
**Dependencies**: None (pure client-side)  
**Route**: `/pricing/calculator`

---

## Problem

Visitors leave without converting because they cannot self-serve a cost estimate.  
Every enquiry currently requires a WhatsApp conversation just to get a ballpark figure.

## Solution

A dedicated calculator page at `/pricing/calculator` (linked from the main `/pricing` page). The user selects
a **material category** (Standard Long Span, Standard Step Tiles, Stone Coated Tiles,
Caliper Long Span, or Caliper Stone Tiles), picks the appropriate **gauge / tile design**,
enters roof dimensions, and receives an instant cost breakdown — then clicks
"Get Final Quote on WhatsApp" to complete the handoff.

The calculator re-uses the **exact same pricing constants** already defined on the
pricing page (`longSpanPrices`, `stepTilesPrices`, `stoneTilesPrices`,
`caliperLongSpanPrices`) — extracted into `lib/pricing-data.ts` so both the pricing
tables and the calculator share a single source of truth.

---

## User Flow

```
1. User opens /pricing and sees "Calculate Your Roof Cost" CTA card
2. Clicks through to /pricing/calculator
3. Inputs:
   a. Material category   (select):
      ── Standard ──────────────────
      • Long Span & Metral
      • Step Tiles
      • Stone Coated Tiles (Gerard)
      ── Caliper Verified ──────────
      • Caliper Long Span
      • Caliper Stone Tiles
   b. Gauge / Design       (select — options change per category):
      - Long Span:        0.40MM … 0.70MM  (from longSpanPrices)
      - Step Tiles:       0.45MM … 0.60MM  (from stepTilesPrices)
      - Stone Tiles:      Shingle / Bond / Classic / Milano
      - Caliper Long Span: 0.40MM … 1.00MM (from caliperLongSpanPrices)
      - Caliper Stone:    All Designs (single option, ₦5,500)
   c. Metcopo surcharge    (toggle — only for Long Span & Step Tiles: +₦250/sqm)
   d. Roof area in sqm     (numeric input, or length × width helper)
   e. Roof shape / wastage (toggle: Gable 10% / Hip 15% / Flat 5%)
4. Estimate panel updates in real time:
   - "Price per sqm: ₦X,XXX (0.50MM Long Span)"
   - "Area incl. wastage: X sqm"
   - "Estimated material cost: ₦X,XXX,XXX"
   - Disclaimer: "Estimate only — final price confirmed on order."
5. CTA button: "Send This Estimate to WhatsApp"
   → Pre-fills WhatsApp message with the full breakdown
```

---

## Technical Design

### File Structure

```
lib/
  pricing-data.ts              ← extracted from app/pricing/page.tsx (single source of truth)
app/
  pricing/
    page.tsx                   ← imports from lib/pricing-data.ts, renders tables + CTA link
    calculator/
      page.tsx                 ← dedicated calculator page (Server Component shell + metadata)
components/
  price-calculator.tsx         ← "use client" interactive widget
```

### Pricing Data (`lib/pricing-data.ts`)

Extract the existing constants from `app/pricing/page.tsx` into a shared module.
Both the pricing tables and the calculator import from here.

```ts
/* ── Shared types ─────────────────────────────────────── */

export interface GaugePrice {
  gauge: string;          // e.g. "0.50MM", "0.55MMA"
  price: string | null;   // e.g. "₦5,650" or null (out of stock)
  note?: string;          // e.g. "Out of stock"
}

export interface TileTypePrice {
  type: string;           // e.g. "Shingle Tiles"
  price: string | null;
  note?: string;
}

/* ── Standard prices (non-caliper) ────────────────────── */

export const longSpanPrices: GaugePrice[] = [
  { gauge: "0.40MM", price: "₦4,300" },
  { gauge: "0.45MM", price: "₦5,350" },
  { gauge: "0.45MMB", price: null, note: "Out of stock" },
  { gauge: "0.50MM", price: "₦5,650" },
  { gauge: "0.50MMB", price: "₦5,550" },
  { gauge: "0.52MM", price: "₦6,000" },
  { gauge: "0.55MMA", price: "₦6,750" },
  { gauge: "0.55MMB", price: "₦6,300" },
  { gauge: "0.58MM", price: "₦8,130" },
  { gauge: "0.60MM", price: "₦9,400" },
  { gauge: "0.70MM", price: "₦14,100" },
];

export const stepTilesPrices: GaugePrice[] = [
  { gauge: "0.45MM", price: "₦5,600" },
  { gauge: "0.50MM", price: "₦6,000" },
  { gauge: "0.55MMA", price: "₦6,960" },
  { gauge: "0.55MMB", price: "₦6,730" },
  { gauge: "0.58MM", price: "₦8,000" },
  { gauge: "0.60MM", price: "₦9,680" },
];

export const stoneTilesPrices: TileTypePrice[] = [
  { type: "Shingle Tiles", price: "₦4,750" },
  { type: "Bond Tiles", price: "₦4,750" },
  { type: "Classic Tiles", price: "₦4,750" },
  { type: "Milano Tiles", price: "₦4,750" },
  { type: "Roman Tiles", price: null, note: "Contact us for price" },
];

/* ── Caliper-verified prices ──────────────────────────── */

export const caliperLongSpanPrices: GaugePrice[] = [
  { gauge: "0.40MM", price: "₦8,700" },
  { gauge: "0.45MM", price: "₦9,800" },
  { gauge: "0.50MM", price: "₦12,500" },
  { gauge: "0.55MM", price: "₦14,200" },
  { gauge: "0.60MM", price: "₦16,000" },
  { gauge: "0.70MM", price: "₦17,800" },
  { gauge: "0.80MM", price: "₦19,700" },
  { gauge: "1.00MM", price: "₦25,400" },
];

export const CALIPER_STONE_TILES_PRICE = 5_500; // ₦/sqm — all designs

/* ── Metcopo surcharge ────────────────────────────────── */

export const METCOPO_SURCHARGE = 250; // ₦/sqm — Long Span & Step Tiles only

/* ── Wastage factors ──────────────────────────────────── */

export const WASTAGE_FACTORS = {
  gable: 0.10,
  hip:   0.15,
  flat:  0.05,
} as const;

/* ── Material categories for the calculator ───────────── */

export type MaterialCategory =
  | 'long-span'
  | 'step-tiles'
  | 'stone-tiles'
  | 'caliper-long-span'
  | 'caliper-stone-tiles';

export const MATERIAL_CATEGORIES: {
  value: MaterialCategory;
  label: string;
  group: 'Standard' | 'Caliper Verified';
}[] = [
  { value: 'long-span',           label: 'Long Span & Metral',     group: 'Standard' },
  { value: 'step-tiles',          label: 'Step Tiles',              group: 'Standard' },
  { value: 'stone-tiles',         label: 'Stone Coated Tiles',      group: 'Standard' },
  { value: 'caliper-long-span',   label: 'Caliper Long Span',       group: 'Caliper Verified' },
  { value: 'caliper-stone-tiles', label: 'Caliper Stone Tiles',     group: 'Caliper Verified' },
];

/* ── Helper: parse "₦5,650" → 5650 ───────────────────── */

export function parsePrice(str: string | null): number | null {
  if (!str) return null;
  const cleaned = str.replace(/[₦,]/g, '');
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

/* ── Helper: get selectable options for a category ────── */

export function getOptionsForCategory(cat: MaterialCategory) {
  switch (cat) {
    case 'long-span':
      return longSpanPrices
        .filter((r) => r.price !== null)
        .map((r) => ({ value: r.gauge, label: r.gauge, price: parsePrice(r.price)! }));
    case 'step-tiles':
      return stepTilesPrices
        .map((r) => ({ value: r.gauge, label: r.gauge, price: parsePrice(r.price)! }));
    case 'stone-tiles':
      return stoneTilesPrices
        .filter((r) => r.price !== null)
        .map((r) => ({ value: r.type, label: r.type, price: parsePrice(r.price)! }));
    case 'caliper-long-span':
      return caliperLongSpanPrices
        .map((r) => ({ value: r.gauge, label: r.gauge, price: parsePrice(r.price)! }));
    case 'caliper-stone-tiles':
      return [{ value: 'all-designs', label: 'All Designs', price: CALIPER_STONE_TILES_PRICE }];
  }
}
```

### Calculator Component (`components/price-calculator.tsx`)

```tsx
'use client';

import { useState, useMemo } from 'react';
import {
  MATERIAL_CATEGORIES,
  WASTAGE_FACTORS,
  METCOPO_SURCHARGE,
  getOptionsForCategory,
  type MaterialCategory,
} from '@/lib/pricing-data';
// shadcn/ui: Input, Select, Label, Card, Badge, Button, Separator

export function PriceCalculator() {
  const [category, setCategory] = useState<MaterialCategory>('long-span');
  const [option, setOption]     = useState('');   // gauge or tile design
  const [metcopo, setMetcopo]   = useState(false);
  const [sqm, setSqm]           = useState('');
  const [roofType, setRoofType] = useState<keyof typeof WASTAGE_FACTORS>('gable');

  // Reset option when category changes
  const options = useMemo(() => getOptionsForCategory(category), [category]);
  const selectedOption = options.find((o) => o.value === option) ?? options[0];

  // Metcopo is only available for Long Span & Step Tiles (standard)
  const metcopoAllowed = category === 'long-span' || category === 'step-tiles';

  const result = useMemo(() => {
    const area = parseFloat(sqm);
    if (!area || area <= 0 || !selectedOption) return null;

    let unitPrice = selectedOption.price;
    if (metcopoAllowed && metcopo) unitPrice += METCOPO_SURCHARGE;

    const wastage  = WASTAGE_FACTORS[roofType];
    const totalSqm = area * (1 + wastage);
    const totalCost = Math.round(totalSqm * unitPrice);

    return { totalSqm, totalCost, unitPrice, wastage };
  }, [sqm, selectedOption, metcopo, metcopoAllowed, roofType]);

  const categoryLabel = MATERIAL_CATEGORIES.find((c) => c.value === category)?.label;

  const whatsappText = result
    ? encodeURIComponent(
        `Hello, I used your price calculator:\n` +
        `- Material: ${categoryLabel}\n` +
        `- Selection: ${selectedOption?.label}${metcopo ? ' (Metcopo)' : ''}\n` +
        `- Price/sqm: ₦${result.unitPrice.toLocaleString()}\n` +
        `- Roof area: ${sqm} sqm (${roofType} +${(result.wastage * 100).toFixed(0)}% wastage)\n` +
        `- Estimated cost: ₦${result.totalCost.toLocaleString()}\n\n` +
        `Please confirm final pricing.`
      )
    : '';

  return (
    <section id="calculator" className="py-12 md:py-16 border-t border-border">
      {/* Category select (grouped: Standard / Caliper Verified) */}
      {/* Option select (gauge or tile design — driven by getOptionsForCategory) */}
      {/* Metcopo toggle (shown only when metcopoAllowed) */}
      {/* Roof area input */}
      {/* Roof shape toggle (Gable / Hip / Flat) */}
      {/* Result card + WhatsApp CTA */}
    </section>
  );
}
```

### Calculator Page (`app/pricing/calculator/page.tsx`)

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { PriceCalculator } from '@/components/price-calculator';

export const metadata: Metadata = {
  title: 'Aluminium Roofing Price Calculator | Gods Promise Aluminium',
  description:
    'Calculate the cost of aluminium roofing sheets in Lagos. Select Long Span, Step Tiles, Stone Coated, or Caliper-verified gauges and get an instant estimate.',
  alternates: { canonical: '/pricing/calculator' },
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="h-1 w-full bg-accent" />
        <div className="container px-4 mx-auto max-w-4xl py-12 md:py-16">
          <nav className="text-xs text-primary-foreground/60 mb-4">
            <Link href="/pricing" className="hover:text-accent">Pricing</Link>
            <span className="mx-1.5">/</span>
            <span>Calculator</span>
          </nav>
          <h1 className="font-heading uppercase font-bold text-3xl md:text-4xl lg:text-5xl mb-2">
            Calculate Your Roof Cost
          </h1>
          <p className="text-primary-foreground/80 text-base max-w-xl">
            Get an instant estimate — no WhatsApp needed.
          </p>
        </div>
      </section>
      <PriceCalculator />
    </div>
  );
}
```

### Integration in `app/pricing/page.tsx`

```diff
- const longSpanPrices = [ ... ];
- const stepTilesPrices = [ ... ];
- const stoneTilesPrices = [ ... ];
- const caliperLongSpanPrices = [ ... ];
+ import {
+   longSpanPrices,
+   stepTilesPrices,
+   stoneTilesPrices,
+   caliperLongSpanPrices,
+ } from '@/lib/pricing-data';

  // ... existing table rendering unchanged ...

+ {/* Calculator CTA — placed above Notes section */}
+ <section className="py-10">
+   <div className="container px-4 mx-auto max-w-4xl">
+     <Link href="/pricing/calculator"
+       className="block rounded-sm border-2 border-accent/30 bg-accent/5 p-6 md:p-8
+                  text-center hover:border-accent/60 transition-colors">
+       <h2 className="font-heading uppercase font-bold text-xl md:text-2xl mb-2">
+         Calculate Your Roof Cost
+       </h2>
+       <p className="text-sm text-muted-foreground mb-3">
+         Select your material, enter your roof area, and get an instant price estimate.
+       </p>
+       <span className="inline-flex items-center rounded-sm bg-accent px-4 py-2
+                        font-heading text-sm font-bold uppercase tracking-wider text-accent-foreground">
+         Open Calculator →
+       </span>
+     </Link>
+   </div>
+ </section>
```

### WhatsApp Pre-fill

```
https://wa.me/2349150459964?text={encodedMessage}
```

---

## UI Specifications

- Dedicated page at `/pricing/calculator` with its own hero + breadcrumb
- CTA card on `/pricing` links to the calculator page
- Card container: `rounded-sm border border-border bg-card`
- Category select uses `<optgroup>` labels: "Standard" and "Caliper Verified"
- When category is `caliper-*`, show a `<Badge>` "Caliper Verified" accent pill next to the heading
- Option select dynamically re-populates when category changes; default to first available option
- Metcopo toggle: only visible for `long-span` and `step-tiles` categories
- Out-of-stock gauges (e.g. 0.45MMB) are excluded from the select (filtered by `price !== null`)
- Result panel: `bg-accent/5 border border-accent/20 rounded-sm` — only shown when inputs are valid
- `font-heading uppercase` for section heading: "CALCULATE YOUR ROOF COST"
- Mobile: stacked single column; desktop: 2-column grid (inputs left, result right)

---

## Copy

| Element | Text |
|---------|------|
| Section heading | CALCULATE YOUR ROOF COST |
| Subheading | Get an instant estimate — no WhatsApp needed. |
| Category label | Material Type |
| Option label | Gauge / Design |
| Metcopo label | Add Metcopo design (+₦250/sqm) |
| Area label | Roof Area (sqm) |
| Roof shape label | Roof Shape |
| Disclaimer | Prices are estimates based on current market rates. Final price confirmed at order. |
| CTA button | Send Estimate to WhatsApp |

---

## Success Metrics

- Calculator interactions per session (PostHog event: `calculator_result_shown`)
- WhatsApp CTA clicks from calculator (PostHog event: `calculator_whatsapp_click`)
- Reduction in "how much is X?" WhatsApp enquiries (ask sales team weekly)
- Target: **≥ 20% of /pricing visitors interact with the calculator** within 30 days

---

## SEO

### Page Metadata

```ts
export const metadata: Metadata = {
  title: 'Aluminium Roofing Price Calculator | Gods Promise Aluminium',
  description:
    'Calculate the cost of aluminium roofing sheets in Lagos instantly. '
    + 'Choose Long Span, Step Tiles, Stone Coated, or Caliper-verified gauges, '
    + 'enter your roof area, and get a free estimate.',
  alternates: { canonical: '/pricing/calculator' },
  openGraph: {
    title: 'Aluminium Roofing Price Calculator',
    description: 'Free instant roofing cost calculator — Long Span, Step Tiles, Caliper gauges.',
    url: '/pricing/calculator',
    type: 'website',
  },
};
```

### Target Keywords

| Priority | Keyword |
|----------|---------|
| Primary | aluminium roofing sheet price calculator Lagos |
| Primary | roofing cost calculator Nigeria |
| Secondary | how much is aluminium roofing sheet per sqm |
| Secondary | caliper verified aluminium roof price |
| Long-tail | calculate cost of long span roofing sheet Lagos |
| Long-tail | step tiles price per square metre Nigeria |

### Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Aluminium Roofing Price Calculator",
  "url": "https://godspromisealuminium.com/pricing/calculator",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "NGN"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Gods Promise Aluminium Concept Limited"
  }
}
```

### Internal Linking

- `/pricing` → "Use our calculator" CTA card linking to `/pricing/calculator`
- `/pricing/calculator` → breadcrumb back to `/pricing`
- `/pricing/calculator` → "View Full Price List" link to `/pricing`
- `/products` → "Calculate your cost" sidebar link
- Blog posts about roofing costs → embed calculator link

---

## Acceptance Criteria

- [ ] All 5 material categories appear grouped under "Standard" / "Caliper Verified"
- [ ] Gauge/design select updates dynamically when material changes
- [ ] Out-of-stock items (price = null) excluded from selectable options
- [ ] Metcopo surcharge toggle shown only for Long Span & Step Tiles
- [ ] "Caliper Verified" badge shown when a caliper category is selected
- [ ] Pricing constants imported from `lib/pricing-data.ts` (no duplicated data)
- [ ] Pricing tables on `/pricing` also import from the same module
- [ ] Result updates live on every input change (no submit button needed)
- [ ] WhatsApp link pre-fills with material, gauge/design, area, and total
- [ ] Mobile-responsive — usable on a 375px viewport
- [ ] Accessible: all inputs labelled, result announces via `aria-live="polite"`
- [ ] Zero flicker on first load (no hydration mismatch)
