# Feature 16 — Contractor / Installer Directory

**Priority**: 🔵 Low  
**Effort**: M (3–5 days)  
**Dependencies**: Optional — Better Auth for installer registration, Sanity CMS  
**Route**: `/installers` or `/contractors`

---

## Problem

Customers who buy roofing sheets often need a trusted installer, especially in  
states outside Lagos. There is no way to connect buyers with verified installers,  
leading to customer uncertainty and post-sale support burden on the GPA team.

## Solution

A directory of verified roofing installers/contractors searchable by state and  
speciality. Installers can apply to be listed, and GPA verifies and manages  
the directory.

---

## User Flow

### Customer (Finding an Installer)
```
1. Customer visits /installers
2. Selects their state from dropdown
3. Optionally filters by:
   - Speciality: Residential | Commercial | Industrial
   - Product type: Long Span | Step Tiles | Stone Tiles
4. Sees list of verified installers:
   - Business name, contact, state/LGA
   - Rating (if review system exists)
   - "GPA Verified" badge
   - Portfolio thumbnail (if available)
5. Clicks "Contact Installer" → phone or WhatsApp link
```

### Installer (Applying to be Listed)
```
1. Installer visits /installers/apply
2. Fills application:
   - Business name, contact person, phone, email
   - State(s) covered
   - Years of experience
   - Speciality (residential / commercial / industrial)
   - Portfolio images (completed jobs)
   - References
3. Submits → stored as pending
4. GPA team reviews + verifies (site visit or references)
5. Approved installer appears in directory
```

---

## Technical Design

### File Structure

```
app/
  installers/
    page.tsx              ← installer directory (public)
    apply/
      page.tsx            ← installer application form
  actions/
    installers.ts         ← server actions for apply + CRUD
components/
  installer-card.tsx      ← individual installer listing
  installer-filters.tsx   ← state + speciality filters
lib/
  installers-data.ts      ← installer data (or Sanity/DB queries)
```

### Data Shape

```ts
export interface Installer {
  id: string;
  businessName: string;
  contactPerson: string;
  phone: string;
  email?: string;
  states: string[];          // states covered
  lga?: string;
  speciality: ('residential' | 'commercial' | 'industrial')[];
  products: ('long-span' | 'step-tiles' | 'stone-tiles')[];
  yearsExperience: number;
  portfolioImages?: string[];
  rating?: number;           // 1–5 if review system exists
  verified: boolean;
  status: 'pending' | 'approved' | 'rejected';
}
```

### Directory Page

```tsx
// app/installers/page.tsx
import { InstallerCard } from '@/components/installer-card';
import { InstallerFilters } from '@/components/installer-filters';

export default async function InstallersPage() {
  const installers = await getApprovedInstallers();

  return (
    <main>
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <h1 className="font-heading uppercase text-4xl font-bold">
            Find a Verified Installer
          </h1>
          <p>GPA-verified roofing contractors across Nigeria</p>
        </div>
      </section>
      <section className="py-12">
        <div className="container">
          <InstallerFilters />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {installers.map((installer) => (
              <InstallerCard key={installer.id} installer={installer} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
```

### Application Form Validation

```ts
const installerSchema = z.object({
  businessName: z.string().min(2).max(200),
  contactPerson: z.string().min(2).max(100),
  phone: z.string().min(10).max(20),
  email: z.string().email().optional(),
  states: z.array(z.string()).min(1),
  speciality: z.array(z.enum(['residential', 'commercial', 'industrial'])).min(1),
  products: z.array(z.enum(['long-span', 'step-tiles', 'stone-tiles'])).min(1),
  yearsExperience: z.number().int().min(1).max(50),
  references: z.string().max(500).optional(),
});
```

---

## Security

- Admin-only approval — no self-listing
- Phone numbers validated but not exposed to scrapers (use click-to-reveal)
- Application rate-limited (1 per email per week)
- Portfolio images validated (type + size)
- "GPA Verified" badge only for admin-approved installers

---

## Acceptance Criteria

- [ ] Public directory page with state and speciality filters
- [ ] Installer cards show name, state, speciality, verified badge
- [ ] "Contact Installer" opens phone/WhatsApp link
- [ ] Application form with validation
- [ ] Admin review/approve workflow
- [ ] Empty state when no installers in selected state
- [ ] Mobile-responsive grid layout
- [ ] Installers cannot self-activate or edit their listing without approval

---

## SEO

### Page Metadata

```ts
export const metadata: Metadata = {
  title: 'Find a Certified Roofing Installer | Gods Promise Aluminium Nigeria',
  description:
    'Browse our directory of certified aluminium roofing installers across Nigeria. '
    + 'Find trusted contractors in Lagos, Abuja, Port Harcourt, and more.',
  alternates: { canonical: '/installers' },
  openGraph: {
    title: 'Certified Roofing Installers — Gods Promise Aluminium',
    description: 'Find a verified roofing contractor near you.',
    url: '/installers',
    type: 'website',
  },
};
```

### Target Keywords

| Priority | Keyword |
|----------|---------|
| Primary | roofing installer Lagos |
| Primary | certified roofing contractor Nigeria |
| Secondary | find aluminium roofing installer near me |
| Long-tail | Gods Promise Aluminium approved installer Abuja |

### Structured Data (JSON-LD)

Page: `ItemList` of installers.

Per installer card:

```json
{
  "@type": "ProfessionalService",
  "name": "Installer Name",
  "areaServed": { "@type": "State", "name": "Lagos" },
  "knowsAbout": ["Aluminium Roofing", "Long Span Installation"],
  "isRelatedTo": {
    "@type": "Organization",
    "name": "Gods Promise Aluminium"
  }
}
```

### Internal Linking

- Homepage → "Find an Installer" CTA in services section
- `/products` → "Need installation? Find a contractor" link
- `/services` → "Our certified installers" section links to `/installers`
- `/locations/[state]` → "Installers in [State]" filtered view
- Each installer profile → links to `/quote` and `/contact`
