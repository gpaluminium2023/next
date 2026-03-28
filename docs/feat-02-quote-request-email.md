# Feature 02 — Online Quote Request + Email

**Priority**: 🔴 High  
**Effort**: M (3–5 days)  
**Dependencies**: Resend account, DNS (SPF/DKIM/DMARC)  
**Route**: `/contact` (enhanced) or `/quote`

---

## Problem

All enquiries funnel through WhatsApp only. Customers who prefer email — or need  
a formal quotation document — have no option. Leads are lost when WhatsApp is  
unavailable, and there is no searchable record of enquiries.

## Solution

A structured quote-request form that:

1. Sends a formatted email to the GPA sales inbox via **Resend**
2. Sends a parallel WhatsApp notification as a backup
3. Gives the customer instant on-screen confirmation + email receipt
4. Stores submissions server-side for follow-up tracking

---

## User Flow

```
1. User navigates to /quote (or expanded /contact)
2. Fills form:
   a. Full name
   b. Phone number (with +234 default)
   c. Email address
   d. Location / delivery state
   e. Product interest (multi-select: Long Span, Step Tiles, Stone Tiles, Flat Sheet)
   f. Estimated roof area (sqm) — optional
   g. Preferred gauge (dropdown) — optional
   h. Message / special requirements (textarea)
3. Submits → Server Action validates with Zod
4. On success:
   a. Email sent to sales@godspromisealuminium.com via Resend
   b. WhatsApp deep-link opened with pre-filled summary
   c. Confirmation email sent to customer
   d. Toast: "Quote request sent! We'll respond within 2 hours."
5. On failure: inline validation errors shown
```

---

## Technical Design

### File Structure

```
app/
  quote/
    page.tsx              ← quote request page (Server Component)
  actions/
    quote.ts              ← "use server" — Zod validate + Resend send
components/
  quote-form.tsx          ← "use client" — form UI
emails/
  quote-request.tsx       ← React Email template (to sales team)
  quote-confirmation.tsx  ← React Email template (to customer)
lib/
  resend.ts              ← Resend client singleton
```

### Server Action (`app/actions/quote.ts`)

```ts
'use server';

import { z } from 'zod';
import { resend } from '@/lib/resend';
import QuoteRequest from '@/emails/quote-request';
import QuoteConfirmation from '@/emails/quote-confirmation';

const quoteSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(10).max(20),
  email: z.string().email(),
  location: z.string().min(2).max(100),
  products: z.array(z.enum(['long-span', 'step-tiles', 'stone-tiles', 'flat-sheet'])).min(1),
  area: z.string().optional(),
  gauge: z.string().optional(),
  message: z.string().max(1000).optional(),
});

export async function submitQuote(formData: FormData) {
  const parsed = quoteSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const data = parsed.data;

  // Send to sales team
  await resend.emails.send({
    from: 'GPA Quotes <quotes@godspromisealuminium.com>',
    to: 'sales@godspromisealuminium.com',
    subject: `New Quote Request — ${data.name}`,
    react: QuoteRequest({ data }),
  });

  // Send confirmation to customer
  await resend.emails.send({
    from: 'Gods Promise Aluminium <noreply@godspromisealuminium.com>',
    to: data.email,
    subject: 'We received your quote request',
    react: QuoteConfirmation({ data }),
  });

  return { success: true };
}
```

### Environment Variables

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
```

---

## Security

- Zod validation on server — never trust client input
- Rate-limit the Server Action (e.g., 5 requests per IP per minute)
- Honeypot field to deter bots
- CSRF protection via Next.js Server Actions (built-in)
- Email addresses validated and sanitised before use in templates

---

## Acceptance Criteria

- [ ] Form validates all required fields with inline errors
- [ ] Sales team receives formatted email within 30 seconds
- [ ] Customer receives confirmation email
- [ ] WhatsApp fallback link opens with pre-filled message
- [ ] Mobile-responsive layout
- [ ] Works without JavaScript (progressive enhancement — basic HTML form fallback)
- [ ] Rate limiting prevents abuse

---

## SEO

### Page Metadata

```ts
export const metadata: Metadata = {
  title: 'Request a Free Roofing Quote | Gods Promise Aluminium Lagos',
  description:
    'Get a free quote for aluminium roofing sheets delivered anywhere in Nigeria. '
    + 'Fill in your project details and receive a response within 24 hours.',
  alternates: { canonical: '/quote' },
  openGraph: {
    title: 'Request a Free Roofing Quote',
    description: 'Free aluminium roofing quote — response within 24 hours.',
    url: '/quote',
    type: 'website',
  },
};
```

### Target Keywords

| Priority | Keyword |
|----------|---------|
| Primary | aluminium roofing quote Lagos |
| Primary | free roofing estimate Nigeria |
| Secondary | roofing sheet price quote online |
| Long-tail | get quote for long span aluminium roof Lagos |

### Structured Data (JSON-LD)

Use `ContactPoint` action on the `Organization` schema to indicate quote availability.

### Internal Linking

- Every page CTA ("Request a Quote") links to `/quote`
- `/pricing` → "Need a custom quote?" link
- `/pricing/calculator` → "Get a formal quote" link after estimate
- `/contact` → cross-link to `/quote` for detailed requests
