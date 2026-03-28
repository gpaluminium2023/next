# Feature 13 — Multi-Language Pages

**Priority**: 🔵 Low  
**Effort**: M (4–6 days)  
**Dependencies**: None (i18n library)  
**Route**: `/{locale}/...` (e.g., `/yo/pricing`, `/ig/products`, `/ha/contact`)

---

## Problem

GPA serves customers across Nigeria's diverse linguistic regions. The site is  
English-only, which may reduce engagement with Yoruba, Igbo, and Hausa-speaking  
customers who prefer their native language.

## Solution

Add multi-language support for the three major Nigerian languages:

- **Yoruba** (`/yo/...`)
- **Igbo** (`/ig/...`)
- **Hausa** (`/ha/...`)
- **English** (`/en/...` — default, also served at `/`)

---

## Technical Design

### i18n Strategy: Next.js Middleware + Dictionary Files

No external library needed — use Next.js middleware for locale detection  
and simple JSON dictionaries for translations.

### File Structure

```
app/
  [locale]/
    layout.tsx            ← locale-aware layout
    page.tsx              ← homepage (translated)
    pricing/
      page.tsx
    products/
      page.tsx
    contact/
      page.tsx
dictionaries/
  en.json                 ← English (default)
  yo.json                 ← Yoruba
  ig.json                 ← Igbo
  ha.json                 ← Hausa
lib/
  i18n.ts                 ← locale config + dictionary loader
middleware.ts             ← locale detection + redirect
```

### Middleware (`middleware.ts`)

```ts
import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'yo', 'ig', 'ha'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if locale already in path
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Default to English
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next|icons|images|favicon).*)'],
};
```

### Dictionary Loader (`lib/i18n.ts`)

```ts
const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((m) => m.default),
  yo: () => import('@/dictionaries/yo.json').then((m) => m.default),
  ig: () => import('@/dictionaries/ig.json').then((m) => m.default),
  ha: () => import('@/dictionaries/ha.json').then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;
export const getDictionary = (locale: Locale) => dictionaries[locale]();
```

### Dictionary Shape (`dictionaries/en.json` excerpt)

```json
{
  "nav": {
    "home": "Home",
    "products": "Products",
    "pricing": "Pricing",
    "contact": "Contact Us"
  },
  "hero": {
    "title": "Premium Aluminium Roofing Sheets",
    "subtitle": "Factory-direct from Lagos since 2009",
    "cta": "Get a Quote"
  },
  "pricing": {
    "title": "Current Prices",
    "perSqm": "per sqm",
    "gauge": "Gauge",
    "contactForPrice": "Contact us for price"
  }
}
```

### Page Usage

```tsx
// app/[locale]/pricing/page.tsx
import { getDictionary, type Locale } from '@/lib/i18n';

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale);

  return (
    <h1>{t.pricing.title}</h1>
    // ...
  );
}
```

### Language Switcher

```tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'yo', label: 'Yorùbá' },
  { code: 'ig', label: 'Igbo' },
  { code: 'ha', label: 'Hausa' },
];

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const pathWithoutLocale = pathname.replace(/^\/(en|yo|ig|ha)/, '');

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={`/${lang.code}${pathWithoutLocale}`}
          className={lang.code === currentLocale ? 'font-bold' : ''}
        >
          {lang.label}
        </Link>
      ))}
    </div>
  );
}
```

---

## Translation Effort

| Priority | Pages | Word Count (est.) |
|---|---|---|
| P1 — Must translate | Homepage, Products, Pricing, Contact | ~2,000 words |
| P2 — Should translate | About, Services, FAQ | ~1,500 words |
| P3 — Nice to have | Blog, Projects, Reviews | ~3,000+ words |

Professional translation recommended for P1 pages. Machine translation acceptable  
for P3 with human review.

---

## SEO

- `hreflang` tags in `<head>` for all locale variants
- `<link rel="alternate">` pointing to each language version
- Locale in URL path (`/yo/pricing`) for crawlability
- Separate sitemap entries per locale

---

## Acceptance Criteria

- [ ] English, Yoruba, Igbo, Hausa pages render correctly
- [ ] Language switcher in header works across all pages
- [ ] URL reflects locale (`/yo/pricing`)
- [ ] Default locale (`en`) works at root `/` paths
- [ ] `hreflang` tags present in HTML head
- [ ] Dictionary files complete for P1 pages
- [ ] No layout breakage with longer translated strings
- [ ] Static generation works with all locale variants

---

## SEO (Enhanced)

> This feature already contains hreflang and sitemap guidance above. This section adds formalised metadata and structured data.

### Page Metadata (per locale)

```ts
export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale } = params;
  const t = await getDictionary(locale);
  return {
    title: t.meta.title,           // e.g. "Aluminium Roofing Sheets Lagos | Gods Promise Aluminium"
    description: t.meta.description,
    alternates: {
      canonical: `/${locale === 'en' ? '' : locale + '/'}`,
      languages: {
        en: '/',
        yo: '/yo',
        ig: '/ig',
        ha: '/ha',
      },
    },
  };
}
```

### Target Keywords (per locale)

| Locale | Example Keywords |
|--------|------------------|
| en | aluminium roofing sheets Lagos, buy roofing sheets Nigeria |
| yo | aluuminiumu roofing sheet Lagos, owo roofing sheet |
| ig | aluminium roofing sheet Lagos, ịnú roofing sheet |
| ha | aluminium roofing sheet Lagos, farashin roofing sheet |

### Structured Data

- All JSON-LD should be locale-aware — `inLanguage` field set per page
- `WebSite` schema includes `potentialAction` → `SearchAction` with locale-specific URLs
- `hreflang` tags (already specified above) are the primary i18n SEO signal for Google

### Internal Linking

- Language switcher component links between locale versions of every page
- Sitemap includes all locale variants with `xhtml:link` alternates
- Footer links remain consistent across locales
