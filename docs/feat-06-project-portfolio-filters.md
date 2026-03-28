# Feature 06 — Project Portfolio with Filters

**Priority**: 🟡 Medium  
**Effort**: M (3–5 days)  
**Dependencies**: None (or Sanity CMS if feat-04 is done first)  
**Route**: `/projects` (enhanced)

---

## Problem

Completed roofing projects are listed but cannot be filtered or browsed by type.  
Potential customers want to see examples relevant to their building (church,  
duplex, school, etc.) and location.

## Solution

A filterable project gallery with categories, state/location tags, and before/after  
images. Each project links to a detail view with specs (profile used, gauge, sqm  
covered).

---

## User Flow

```
1. User visits /projects
2. Sees filter bar:
   - Building type: All | Church | Bungalow | Duplex | School | Commercial | Industrial
   - State: All | Lagos | Abuja | Ogun | Rivers | ...
   - Product used: All | Long Span | Step Tiles | Stone Tiles
3. Grid updates with filtered results (client-side filtering)
4. Clicks a project card → expands to detail view (or modal):
   - Multiple images (before/after)
   - Project details: location, building type, product, gauge, sqm, year
   - Client testimonial (if available)
5. CTA: "Start Your Project" → links to /quote or WhatsApp
```

---

## Technical Design

### File Structure

```
app/
  projects/
    page.tsx              ← project listing with filters
components/
  project-grid.tsx        ← "use client" — filterable grid
  project-card.tsx        ← individual project card
  project-filters.tsx     ← filter controls
lib/
  projects-data.ts        ← project data (or Sanity queries)
```

### Project Data Shape

```ts
export interface Project {
  id: string;
  title: string;
  slug: string;
  buildingType: 'church' | 'bungalow' | 'duplex' | 'school' | 'commercial' | 'industrial';
  state: string;
  lga?: string;
  product: 'long-span' | 'step-tiles' | 'stone-tiles';
  gauge?: string;
  sqm?: number;
  year: number;
  images: string[];
  testimonial?: { name: string; text: string };
}
```

### Filter Component

```tsx
'use client';

import { useState } from 'react';
import { Select, Badge, Button } from '@/components/ui';

export function ProjectFilters({ onFilter }: { onFilter: (filters: Filters) => void }) {
  const [buildingType, setBuildingType] = useState('all');
  const [state, setState] = useState('all');
  const [product, setProduct] = useState('all');

  // update parent on change
}
```

---

## Acceptance Criteria

- [ ] Projects display in responsive grid (3 cols desktop, 1 col mobile)
- [ ] Filters work for building type, state, and product
- [ ] Active filters shown as removable badges
- [ ] Project detail view shows images, specs, and testimonial
- [ ] Empty state when no projects match filters
- [ ] CTA links to quote/WhatsApp
- [ ] Images optimised with `next/image` and lazy loading

---

## SEO

### Page Metadata

```ts
export const metadata: Metadata = {
  title: 'Completed Roofing Projects | Gods Promise Aluminium Lagos',
  description:
    'Browse our portfolio of completed aluminium roofing projects across Nigeria. '
    + 'Filter by building type, state, and roofing product.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Completed Roofing Projects in Nigeria',
    description: 'See our aluminium roofing installations across Lagos, Abuja, and beyond.',
    url: '/projects',
    type: 'website',
  },
};
```

### Target Keywords

| Priority | Keyword |
|----------|---------|
| Primary | aluminium roofing projects Nigeria |
| Primary | roofing installation Lagos portfolio |
| Secondary | completed roofing jobs near me |
| Long-tail | aluminium long span roof installation Lekki Lagos |

### Structured Data (JSON-LD)

- Page: `CollectionPage` + `ItemList`
- Each project card: `CreativeWork` with `image`, `locationCreated`, `description`

### Internal Linking

- Homepage "Our Projects" section → `/projects`
- `/products` product cards → "See projects using this product"
- `/locations/[state]` → filtered project view
- Individual project entries link to `/quote` CTA
- Blog case studies → link to project portfolio
