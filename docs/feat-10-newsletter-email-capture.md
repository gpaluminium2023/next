# Feature 10 — Newsletter / Email Capture

**Priority**: 🟡 Medium  
**Effort**: S (2–3 days)  
**Dependencies**: Resend (Audiences API), optional Sanity for content  
**Route**: Inline component (footer, homepage, `/resources`)

---

## Problem

There is no way to collect customer emails for promotions, price-drop alerts,  
or new product announcements. All communication is one-to-one via WhatsApp.

## Solution

An email capture form displayed in the site footer and as a CTA block on key  
pages. Subscribers are added to a **Resend Audience** and can receive broadcast  
emails for price updates, new products, and promotions.

---

## User Flow

```
1. User sees "Get Price Updates" banner in footer or on /pricing
2. Enters email address + optional name
3. Clicks "Subscribe"
4. Server Action:
   a. Validates email with Zod
   b. Adds contact to Resend Audience
   c. Sends welcome email
5. Toast: "You're subscribed! Check your inbox."
6. Future: admin sends broadcasts via Resend dashboard or custom admin page
```

---

## Technical Design

### File Structure

```
app/
  actions/
    newsletter.ts         ← "use server" — subscribe action
components/
  newsletter-form.tsx     ← "use client" — inline form
emails/
  newsletter-welcome.tsx  ← React Email welcome template
lib/
  resend.ts              ← Resend client (shared with feat-02)
```

### Server Action (`app/actions/newsletter.ts`)

```ts
'use server';

import { z } from 'zod';
import { resend } from '@/lib/resend';
import NewsletterWelcome from '@/emails/newsletter-welcome';

const subscribeSchema = z.object({
  email: z.string().email(),
  name: z.string().max(100).optional(),
});

const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;

export async function subscribe(formData: FormData) {
  const parsed = subscribeSchema.safeParse({
    email: formData.get('email'),
    name: formData.get('name'),
  });

  if (!parsed.success) return { error: 'Invalid email address' };

  // Add to Resend audience
  await resend.contacts.create({
    audienceId: AUDIENCE_ID,
    email: parsed.data.email,
    firstName: parsed.data.name ?? '',
  });

  // Send welcome email
  await resend.emails.send({
    from: 'Gods Promise Aluminium <hello@godspromisealuminium.com>',
    to: parsed.data.email,
    subject: 'Welcome — Price updates from GPA',
    react: NewsletterWelcome({ name: parsed.data.name }),
  });

  return { success: true };
}
```

### Inline Form Component

```tsx
'use client';

import { useActionState } from 'react';
import { subscribe } from '@/app/actions/newsletter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribe, null);

  return (
    <form action={action} className="flex gap-2 max-w-md">
      <Input name="email" type="email" placeholder="Enter your email" required />
      <Button type="submit" disabled={pending}>Subscribe</Button>
    </form>
  );
}
```

### Environment Variables

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_AUDIENCE_ID=aud_xxxxxxxxxxxx
```

---

## Security

- Server-side email validation
- Rate-limit: 3 subscriptions per IP per hour
- Honeypot field for bot prevention
- Unsubscribe link in every email (Resend handles this)
- No PII stored beyond email + optional name

---

## Acceptance Criteria

- [ ] Email capture form in site footer
- [ ] Additional placement on `/pricing` and homepage
- [ ] Server-side Zod validation
- [ ] Contact added to Resend Audience on submit
- [ ] Welcome email sent immediately
- [ ] Duplicate emails handled gracefully (no error shown)
- [ ] Unsubscribe link works in all emails
- [ ] Rate limiting prevents abuse

---

## SEO

### Impact on Existing Pages

Newsletter capture is an inline component (footer + pricing page) — no dedicated route to index.

### Page Metadata (if standalone landing page is created)

```ts
// Optional: /newsletter
export const metadata: Metadata = {
  title: 'Subscribe to Our Newsletter | Gods Promise Aluminium',
  description:
    'Get aluminium roofing price updates, project tips, and industry news '
    + 'delivered to your inbox. Subscribe to the Gods Promise Aluminium newsletter.',
  alternates: { canonical: '/newsletter' },
  robots: { index: true },
};
```

### Structured Data

- No page-level schema required for inline forms
- If standalone page created: `WebPage` with `potentialAction` → `SubscribeAction`

### Internal Linking

- Footer CTA visible on all pages → natural internal exposure
- `/blog` posts → inline "Subscribe for more tips" mid-content CTA
- `/pricing` → "Get price drop alerts" newsletter CTA
- Post-quote confirmation → "Stay updated" newsletter prompt
