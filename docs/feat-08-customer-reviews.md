# Feature 08 — Customer Reviews System

**Priority**: 🟡 Medium  
**Effort**: M (3–5 days)  
**Dependencies**: Better Auth or email verification, optional Sanity CMS  
**Route**: `/reviews`, inline on `/products` and homepage

---

## Problem

There is no social proof on the website. Potential customers cannot see verified  
testimonials from past buyers. Trust is established only through WhatsApp  
conversations.

## Solution

A review collection and display system where customers can submit verified  
testimonials. Admin moderates before publishing. Reviews display on the homepage,  
product pages, and a dedicated `/reviews` page.

---

## User Flow

### Submit Review
```
1. Customer receives a review link via email/WhatsApp after purchase
2. Visits /reviews/submit?token=xxxx (or public /reviews/submit)
3. Fills form:
   - Name, location (state)
   - Product purchased (dropdown)
   - Star rating (1–5)
   - Review text
   - Photo(s) of installed roof (optional)
4. Submits → stored as "pending"
5. Admin approves → review appears on site
```

### Display Reviews
```
1. Homepage: top 3 reviews in testimonial carousel
2. /products: reviews filtered by product type
3. /reviews: all approved reviews with filters and pagination
```

---

## Technical Design

### File Structure

```
app/
  reviews/
    page.tsx              ← all reviews listing
    submit/
      page.tsx            ← review submission form
  actions/
    reviews.ts            ← server actions for submit + moderate
components/
  review-card.tsx         ← individual review display
  review-carousel.tsx     ← homepage testimonial carousel
  star-rating.tsx         ← interactive star input / display
```

### Data Shape

```ts
export interface Review {
  id: string;
  name: string;
  state: string;
  product: string;
  rating: number;          // 1–5
  text: string;
  images?: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}
```

### Server Action

```ts
'use server';

import { z } from 'zod';

const reviewSchema = z.object({
  name: z.string().min(2).max(100),
  state: z.string().min(2),
  product: z.string(),
  rating: z.number().int().min(1).max(5),
  text: z.string().min(10).max(1000),
});

export async function submitReview(formData: FormData) {
  const parsed = reviewSchema.safeParse({
    name: formData.get('name'),
    state: formData.get('state'),
    product: formData.get('product'),
    rating: Number(formData.get('rating')),
    text: formData.get('text'),
  });

  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  // Store review with status: 'pending'
  // Notify admin

  return { success: true };
}
```

---

## Security

- Admin-only moderation — no auto-publish
- Review text sanitised before display (no XSS)
- Optional token-based submission to verify purchasers
- Rate-limited submissions (1 review per email per product)
- Image uploads validated (type, size < 5MB)

---

## Acceptance Criteria

- [ ] Review submission form with star rating, text, optional images
- [ ] Admin moderation: approve/reject reviews
- [ ] Homepage displays top 3 reviews in carousel
- [ ] Product pages show relevant reviews
- [ ] `/reviews` page with pagination and product filter
- [ ] Average rating calculation per product
- [ ] Reviews are sanitised against XSS
- [ ] Mobile-responsive layout

---

## SEO

### Page Metadata

```ts
export const metadata: Metadata = {
  title: 'Customer Reviews | Gods Promise Aluminium Roofing Lagos',
  description:
    'Read verified customer reviews of Gods Promise Aluminium roofing sheets '
    + 'and installation services across Nigeria.',
  alternates: { canonical: '/reviews' },
  openGraph: {
    title: 'Customer Reviews — Gods Promise Aluminium',
    description: 'What our customers say about our aluminium roofing products.',
    url: '/reviews',
    type: 'website',
  },
};
```

### Target Keywords

| Priority | Keyword |
|----------|---------|
| Primary | Gods Promise Aluminium reviews |
| Primary | aluminium roofing sheet reviews Nigeria |
| Secondary | best roofing company Lagos reviews |
| Long-tail | is Gods Promise Aluminium roofing good quality |

### Structured Data (JSON-LD)

```json
{
  "@type": "Product",
  "name": "Aluminium Roofing Sheets",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "47"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "..." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "..."
    }
  ]
}
```

This enables **Google rich review stars** in search results.

### Internal Linking

- Homepage → top-3 reviews carousel links to `/reviews`
- `/products` → "See customer reviews" link per product
- `/projects` → "Read what the client said" link on each project
- `/reviews` → "Get a Quote" CTA at end of page
