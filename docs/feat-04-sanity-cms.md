# Feature 04 — CMS for Products & Blog (Sanity)

**Priority**: 🔴 High  
**Effort**: L (5–8 days)  
**Dependencies**: Sanity account, GROQ knowledge  
**Route**: Affects `/products`, `/blog`, `/blog/[slug]`, `/pricing`

---

## Problem

All product data, blog posts, and prices are hardcoded in source files. Any content  
update requires a developer to edit code, commit, and deploy. The marketing team  
cannot publish blog posts or update pricing independently.

## Solution

Connect **Sanity CMS** as a headless content backend. Define schemas for products,  
blog posts, pricing tiers, and gallery images. Use GROQ queries in Server Components  
to fetch content at build/request time.

---

## User Flow (Content Editor)

```
1. Editor logs into Sanity Studio (studio.godspromisealuminium.com or embedded)
2. Creates/edits a blog post with rich text, images, SEO fields
3. Publishes → triggers ISR revalidation on the Next.js site
4. Updated content appears on /blog and /blog/[slug] within seconds
```

---

## Technical Design

### Sanity Schemas

```
sanity/
  schemas/
    product.ts           ← name, slug, profile, gauges[], image, description
    blogPost.ts          ← title, slug, author, publishedAt, body (Portable Text), seo
    pricingTier.ts       ← profile, gauge, price, isCaliper, updatedAt
    galleryImage.ts      ← image, caption, category, project reference
    author.ts            ← name, avatar, bio
  sanity.config.ts
  sanity.cli.ts
```

### Product Schema Example

```ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'profile', type: 'string',
      options: { list: ['long-span', 'step-tiles', 'stone-tiles', 'flat-sheet'] } }),
    defineField({ name: 'gauges', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'features', type: 'array', of: [{ type: 'string' }] }),
  ],
});
```

### Blog Post Schema

```ts
export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'author', type: 'reference', to: [{ type: 'author' }] }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({ name: 'excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'body', type: 'array', of: [
      { type: 'block' },
      { type: 'image', options: { hotspot: true } },
    ]}),
    defineField({ name: 'seo', type: 'object', fields: [
      { name: 'metaTitle', type: 'string' },
      { name: 'metaDescription', type: 'text' },
    ]}),
  ],
});
```

### Next.js Integration

```
lib/
  sanity.ts              ← Sanity client + GROQ queries
app/
  blog/
    page.tsx             ← fetch all posts via GROQ
    [slug]/
      page.tsx           ← fetch single post, generateStaticParams
  products/
    page.tsx             ← fetch products from Sanity
  api/
    revalidate/
      route.ts           ← Sanity webhook → on-demand ISR
```

### Query Example

```ts
import { createClient } from 'next-sanity';

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
});

export async function getBlogPosts() {
  return sanity.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id, title, slug, excerpt, publishedAt,
      "author": author->{ name, "avatar": avatar.asset->url }
    }
  `);
}
```

### Environment Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk_xxxxxxxxxxxxxxxx
SANITY_REVALIDATE_SECRET=whsec_xxxxxxxx
```

---

## Acceptance Criteria

- [ ] Sanity Studio accessible with login
- [ ] Product, Blog Post, Pricing, Gallery, Author schemas defined
- [ ] Blog listing page fetches from Sanity
- [ ] Blog detail page renders Portable Text
- [ ] Products page reads from CMS
- [ ] Sanity webhook triggers ISR revalidation
- [ ] Content team can publish without developer involvement
- [ ] SEO metadata pulled from CMS fields

---

## SEO

### CMS-Driven Metadata

All Sanity document types include SEO fields:

```ts
// Sanity schema: shared SEO object
defineType({
  name: 'seo',
  type: 'object',
  fields: [
    { name: 'metaTitle', type: 'string', validation: (r) => r.max(60) },
    { name: 'metaDescription', type: 'text', validation: (r) => r.max(160) },
    { name: 'ogImage', type: 'image' },
    { name: 'canonicalUrl', type: 'url' },
    { name: 'noIndex', type: 'boolean', initialValue: false },
  ],
});
```

Blog posts generate:
- `<title>` and `<meta name="description">` from CMS SEO fields
- Open Graph `og:title`, `og:description`, `og:image` with Sanity image CDN URL
- `article` structured data with `datePublished`, `author`, `publisher`
- Canonical URL (auto or custom)

### Target Keywords (Blog Strategy)

| Priority | Keyword Pattern |
|----------|------------------|
| Primary | aluminium roofing sheet price Lagos 2026 |
| Primary | best roofing sheet in Nigeria |
| Secondary | long span vs step tiles comparison |
| Secondary | caliper verified roofing sheets meaning |
| Long-tail | how to choose aluminium roofing gauge thickness |

### Structured Data

- Blog listing: `CollectionPage` + `ItemList`
- Blog post: `Article` with `author`, `datePublished`, `publisher`, `image`
- Product pages: `Product` with `offers`, `brand`, `name`

### Internal Linking

- Blog posts link to `/pricing`, `/pricing/calculator`, `/products`
- Product pages link to related blog posts
- `/resources` page aggregates all blog categories
- Auto-generate breadcrumb trail via Sanity slugs
