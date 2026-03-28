# Feature 09 — Roofing Material Calculator

**Priority**: 🟡 Medium  
**Effort**: M (3–5 days)  
**Dependencies**: None (client-side), shares data with feat-01 Price Calculator  
**Route**: `/calculator` or `/resources/calculator`

---

## Problem

Customers and contractors don't know how many sheets they need for a given roof.  
They rely on rough estimates or must ask the sales team, adding friction  
to the buying process.

## Solution

An advanced roofing material calculator that takes roof dimensions  
(length, width, pitch, roof type) and outputs:

- Exact number of sheets required
- Total coverage area in sqm
- Ridge caps, valley gutters, and accessories needed
- Estimated total material cost (links to feat-01 price calculator)

---

## User Flow

```
1. User visits /calculator
2. Selects roof shape: Gable | Hip | Flat | Gambrel | Mono-pitch
3. Inputs dimensions:
   a. Building length (m)
   b. Building width (m)
   c. Roof pitch (degrees or ratio — with visual helper)
   d. Overhang (default: 0.3m)
4. Selects sheet profile: Long Span | Step Tiles | Stone Tiles
5. Calculator computes:
   a. True roof area (accounting for pitch)
   b. Effective coverage per sheet (accounting for overlap)
   c. Number of sheets needed (with wastage)
   d. Ridge cap quantity
   e. Valley gutter length (hip roofs)
6. Results panel:
   - "Roof area: X sqm"
   - "Sheets required: Y pcs"
   - "Ridge caps: Z pcs"
   - "Estimated cost: ₦X,XXX,XXX" (if gauge selected)
   - "Download Material List (PDF)" — optional
7. CTA: "Get Final Quote on WhatsApp"
```

---

## Technical Design

### File Structure

```
app/
  calculator/
    page.tsx              ← calculator page
components/
  material-calculator.tsx ← "use client" — interactive calculator
  roof-shape-picker.tsx   ← visual roof shape selector
lib/
  roof-math.ts            ← geometry calculations
  sheet-specs.ts          ← coverage per sheet by profile
```

### Roof Geometry (`lib/roof-math.ts`)

```ts
export function trueRoofArea(
  length: number,
  width: number,
  pitchDegrees: number,
  roofType: 'gable' | 'hip' | 'flat' | 'gambrel' | 'mono'
): number {
  const pitchFactor = 1 / Math.cos((pitchDegrees * Math.PI) / 180);
  const baseArea = length * width;

  switch (roofType) {
    case 'flat':
      return baseArea;
    case 'mono':
      return baseArea * pitchFactor;
    case 'gable':
      return baseArea * pitchFactor; // 2 equal slopes
    case 'hip':
      return baseArea * pitchFactor * 1.05; // ~5% extra for hip joints
    case 'gambrel':
      return baseArea * pitchFactor * 1.1; // ~10% extra for dual slopes
  }
}

export function sheetsRequired(
  roofArea: number,
  coveragePerSheet: number,
  wastagePct: number
): number {
  return Math.ceil(roofArea * (1 + wastagePct) / coveragePerSheet);
}

export function ridgeCaps(roofLength: number, capLength: number = 0.9): number {
  return Math.ceil(roofLength / capLength);
}
```

### Sheet Specs (`lib/sheet-specs.ts`)

```ts
export const SHEET_SPECS = {
  'long-span': { coverageWidth: 0.76, minLength: 1.0, maxLength: 7.2, overlapM: 0.1 },
  'step-tiles': { coverageWidth: 0.42, minLength: 0.42, maxLength: 0.42, overlapM: 0 },
  'stone-tiles': { coverageWidth: 0.42, minLength: 1.34, maxLength: 1.34, overlapM: 0 },
};
```

---

## Acceptance Criteria

- [ ] 5 roof shapes selectable with visual icons
- [ ] Dimension inputs with sensible defaults and validation
- [ ] True roof area accounts for pitch angle correctly
- [ ] Sheet quantity calculation includes wastage + overlaps
- [ ] Ridge cap and accessory counts displayed
- [ ] Cost estimate integrated (reuses pricing data from feat-01)
- [ ] WhatsApp CTA pre-fills material list
- [ ] Responsive: usable on mobile
- [ ] Results update in real time as inputs change

---

## SEO

### Page Metadata

```ts
export const metadata: Metadata = {
  title: 'Roof Material Calculator | Gods Promise Aluminium Lagos',
  description:
    'Calculate how many aluminium roofing sheets you need for your project. '
    + 'Enter roof dimensions and get instant quantity, accessory, and cost estimates.',
  alternates: { canonical: '/resources/calculator' },
  openGraph: {
    title: 'Roof Material Calculator — Gods Promise Aluminium',
    description: 'Enter your roof dimensions and get an instant material list with costs.',
    url: '/resources/calculator',
    type: 'website',
  },
};
```

### Target Keywords

| Priority | Keyword |
|----------|---------|
| Primary | roof material calculator Nigeria |
| Primary | how many roofing sheets do I need |
| Secondary | aluminium roofing sheet calculator |
| Long-tail | calculate number of long span roofing sheets for my building |

### Structured Data (JSON-LD)

- `WebApplication` with `applicationCategory: "UtilityApplication"` and `operatingSystem: "All"`
- `HowTo` schema for the step-by-step calculation flow

### Internal Linking

- `/pricing` → "Not sure how many sheets? Use our calculator" link
- `/pricing/calculator` → "Need full material list? Try the material calculator"
- Calculator result → "Get a Quote" CTA linking to `/quote`
- `/resources` landing page lists calculator as a tool
- Blog: "How to Calculate Roofing Sheets for Your House" → `/resources/calculator`
