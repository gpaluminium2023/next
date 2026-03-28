# Feature 03 — Paystack Payment Integration

**Priority**: 🔴 High  
**Effort**: L (5–8 days)  
**Dependencies**: Paystack business account, bank details verified  
**Route**: `/pay` or inline on `/pricing`

---

## Problem

Customers must negotiate pricing over WhatsApp and pay via bank transfer with no  
structured flow. This creates friction for bulk/contractor orders, no payment  
tracking, and no automated receipts.

## Solution

Integrate **Paystack** to accept deposits and full payments online. Support card,  
bank transfer, and USSD channels. Provide instant receipts and payment confirmation  
via webhook.

---

## User Flow

```
1. Customer gets a confirmed quote (from WhatsApp or quote form)
2. Navigates to /pay or clicks a payment link
3. Enters:
   a. Invoice/reference number (or selects from recent quotes)
   b. Amount to pay (full or deposit — minimum 50%)
   c. Email for receipt
4. Clicks "Pay Now" → Paystack checkout popup
5. Completes payment (card / bank transfer / USSD)
6. Webhook fires → server verifies + records payment
7. Customer sees confirmation page + receives email receipt
8. Sales team notified via email
```

---

## Technical Design

### File Structure

```
app/
  pay/
    page.tsx              ← payment initiation page
  api/
    webhooks/
      paystack/
        route.ts          ← POST webhook handler
  actions/
    payment.ts            ← "use server" — initialise transaction
lib/
  paystack.ts             ← Paystack API client wrapper
  payment-store.ts        ← payment record helpers (file-based or DB)
emails/
  payment-receipt.tsx     ← React Email receipt template
```

### Payment Initialisation (`app/actions/payment.ts`)

```ts
'use server';

import { z } from 'zod';
import { paystack } from '@/lib/paystack';

const paymentSchema = z.object({
  email: z.string().email(),
  amount: z.number().min(10000), // minimum ₦100 in kobo
  reference: z.string().min(3).max(50),
  metadata: z.record(z.string()).optional(),
});

export async function initiatePayment(input: z.infer<typeof paymentSchema>) {
  const parsed = paymentSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const { data } = await paystack.transaction.initialize({
    email: parsed.data.email,
    amount: parsed.data.amount, // in kobo
    reference: parsed.data.reference,
    callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pay/verify`,
    metadata: parsed.data.metadata,
  });

  return { authorization_url: data.authorization_url };
}
```

### Webhook Handler (`app/api/webhooks/paystack/route.ts`)

```ts
import { headers } from 'next/headers';
import crypto from 'crypto';

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('x-paystack-signature');

  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest('hex');

  if (hash !== signature) {
    return new Response('Invalid signature', { status: 401 });
  }

  const event = JSON.parse(body);

  if (event.event === 'charge.success') {
    // Record payment, send receipt email, notify sales
  }

  return new Response('OK', { status: 200 });
}
```

### Environment Variables

```env
PAYSTACK_SECRET_KEY=sk_live_xxxxxxxxxxxx
PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxxxxxx
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxxxxxx
```

---

## Security

- HMAC SHA-512 webhook signature verification (mandatory)
- Secret key never exposed to client
- Amount validated server-side — never trust client-sent amounts
- Idempotent webhook processing (deduplicate by reference)
- Paystack IP whitelist on webhook endpoint

---

## Acceptance Criteria

- [ ] Customer can initiate payment from `/pay`
- [ ] Paystack checkout opens with correct amount
- [ ] Card, bank transfer, and USSD channels functional
- [ ] Webhook verifies signature and records payment
- [ ] Customer receives email receipt on successful payment
- [ ] Sales team notified of new payment
- [ ] Minimum deposit enforced (50% of quoted amount)
- [ ] Test mode works end-to-end with Paystack test keys

---

## SEO

### Page Metadata

```ts
export const metadata: Metadata = {
  title: 'Pay for Roofing Sheets Online | Gods Promise Aluminium',
  description:
    'Pay securely for your aluminium roofing order online via card, bank transfer, '
    + 'or USSD powered by Paystack. Fast confirmation, instant receipt.',
  alternates: { canonical: '/pay' },
  robots: { index: false }, // payment page should not be indexed
};
```

### Target Keywords

Payment pages are typically `noindex` — SEO applies to link text from referencing pages:

| Context | Anchor Text |
|---------|--------------|
| `/pricing` | Pay Online Securely |
| `/quote` confirmation | Proceed to Payment |
| Email receipt | View your order |

### Internal Linking

- `/pricing/calculator` → "Ready to order? Pay securely online" link
- `/quote` confirmation → "Pay your deposit now" CTA
- Order confirmation email → link back to `/pay?ref=...`
