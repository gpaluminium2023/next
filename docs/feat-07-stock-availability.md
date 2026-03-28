# Feature 07 — Stock / Availability Indicator

**Priority**: 🟡 Medium  
**Effort**: S (2–3 days)  
**Dependencies**: CMS (Sanity) or simple JSON API  
**Route**: `/products`, `/pricing`

---

## Problem

Customers enquire about products without knowing current stock status. Some  
profiles/gauges have 2–3 week lead times, causing frustration when discovered  
only after WhatsApp conversation.

## Solution

Display real-time stock status badges on product and pricing pages:

- **In Stock** (green) — available for immediate dispatch
- **Low Stock** (amber) — limited quantity, order soon
- **Made to Order** (blue) — 2–3 week lead time
- **Out of Stock** (red) — currently unavailable

---

## User Flow

```
1. User visits /products or /pricing
2. Each product row / card shows a stock badge
3. Hovering the badge shows tooltip:
   - "In Stock — ships within 24 hours"
   - "Low Stock — 12 units remaining"
   - "Made to Order — 2-3 week lead time"
4. Admin updates stock status via Sanity Studio (or simple admin endpoint)
```

---

## Technical Design

### Data Shape

```ts
export type StockStatus = 'in-stock' | 'low-stock' | 'made-to-order' | 'out-of-stock';

export interface StockEntry {
  profile: string;
  gauge: string;
  status: StockStatus;
  quantity?: number;       // optional — for "low stock" threshold
  leadTimeDays?: number;   // optional — for "made to order"
  updatedAt: string;
}
```

### Badge Component

```tsx
import { Badge } from '@/components/ui/badge';

const statusConfig = {
  'in-stock':       { label: 'In Stock',       variant: 'default', className: 'bg-green-600' },
  'low-stock':      { label: 'Low Stock',      variant: 'secondary', className: 'bg-amber-500' },
  'made-to-order':  { label: 'Made to Order',  variant: 'outline', className: 'border-blue-500 text-blue-600' },
  'out-of-stock':   { label: 'Out of Stock',   variant: 'destructive' },
} as const;

export function StockBadge({ status }: { status: StockStatus }) {
  const config = statusConfig[status];
  return <Badge className={config.className}>{config.label}</Badge>;
}
```

### CMS Integration (if Sanity available)

```ts
// In product schema — add stock field
defineField({
  name: 'stockStatus',
  type: 'string',
  options: {
    list: [
      { title: 'In Stock', value: 'in-stock' },
      { title: 'Low Stock', value: 'low-stock' },
      { title: 'Made to Order', value: 'made-to-order' },
      { title: 'Out of Stock', value: 'out-of-stock' },
    ],
  },
}),
```

---

## Acceptance Criteria

- [ ] Stock badges visible on `/products` and `/pricing` pages
- [ ] Four distinct visual states (green/amber/blue/red)
- [ ] Admin can update stock status without code deploy
- [ ] Tooltip shows additional detail on hover
- [ ] Badge updates reflect within 60 seconds (ISR or client fetch)
- [ ] "Out of stock" items still visible but de-emphasised

---

## SEO

### Impact on Existing Pages

Stock badges enhance existing `/products` and `/pricing` pages — no new routes.

### Structured Data Enhancement

Add `availability` to existing `Product` schema markup:

```json
{
  "@type": "Offer",
  "availability": "https://schema.org/InStock",
  "price": "5650",
  "priceCurrency": "NGN"
}
```

Map stock states:
- In Stock → `schema.org/InStock`
- Low Stock → `schema.org/LimitedAvailability`
- Made to Order → `schema.org/PreOrder`
- Out of Stock → `schema.org/OutOfStock`

### Internal Linking

- `/products` stock badge links to `/pricing` for the specific gauge
- "Notify me" (Out of Stock) links to `/contact` or newsletter capture
