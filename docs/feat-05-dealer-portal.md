# Feature 05 — Dealer Portal

**Priority**: 🔴 High  
**Effort**: XL (10–15 days)  
**Dependencies**: Better Auth, Prisma + Postgres, Resend  
**Route**: `/dealers/apply`, `/dealers/portal`

---

## Problem

Dealers currently register and manage orders through phone calls and WhatsApp.  
There is no structured onboarding, territory tracking, or order history for  
dealer accounts.

## Solution

A gated dealer portal where dealers can:

1. Apply to become an authorised dealer
2. Get approved by admin
3. Log in to view pricing (dealer-only rates), place orders, and track deliveries
4. Manage their territory and profile

Authentication via **Better Auth** with email/password + OTP.

---

## User Flow

### Dealer Application
```
1. Dealer visits /dealers/apply
2. Fills application:
   - Business name, RC number, contact person
   - Phone, email, state, LGA
   - Business type (retailer / contractor / distributor)
   - References (optional)
3. Submits → stored in DB, email sent to admin
4. Admin reviews in /admin/dealers → approves/rejects
5. Dealer receives approval email with login instructions
```

### Dealer Portal
```
1. Dealer logs in at /dealers/portal
2. Dashboard shows:
   - Dealer-exclusive pricing
   - Order history + status tracking
   - Territory map (assigned states/LGAs)
   - Account profile
3. Places order → sent to sales team + recorded in DB
4. Tracks delivery status
```

---

## Technical Design

### File Structure

```
app/
  dealers/
    apply/
      page.tsx            ← public application form
    portal/
      layout.tsx          ← auth-gated layout (Better Auth session check)
      page.tsx            ← dealer dashboard
      orders/
        page.tsx          ← order history
      pricing/
        page.tsx          ← dealer-exclusive pricing
      profile/
        page.tsx          ← dealer profile management
  admin/
    dealers/
      page.tsx            ← admin dealer management
  actions/
    dealer.ts             ← server actions for dealer CRUD
lib/
  auth.ts                 ← Better Auth config
  auth-client.ts          ← Better Auth client
  db.ts                   ← Prisma client
prisma/
  schema.prisma           ← Dealer, Order, Territory models
```

### Prisma Schema (additions)

```prisma
model Dealer {
  id            String   @id @default(cuid())
  userId        String   @unique
  user          User     @relation(fields: [userId], references: [id])
  businessName  String
  rcNumber      String?
  contactPerson String
  phone         String
  state         String
  lga           String
  businessType  String   // retailer | contractor | distributor
  status        String   @default("pending") // pending | approved | rejected
  territories   Territory[]
  orders        Order[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Territory {
  id        String @id @default(cuid())
  dealerId  String
  dealer    Dealer @relation(fields: [dealerId], references: [id])
  state     String
  lga       String?
}

model Order {
  id          String   @id @default(cuid())
  dealerId    String
  dealer      Dealer   @relation(fields: [dealerId], references: [id])
  items       Json     // [{ product, gauge, qty, unitPrice }]
  totalAmount Int      // in kobo
  status      String   @default("pending") // pending | confirmed | shipped | delivered
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Better Auth Configuration

```ts
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma),
  emailAndPassword: { enabled: true },
  session: { expiresIn: 60 * 60 * 24 * 7 }, // 7 days
});
```

---

## Security

- Better Auth session validation on all portal routes
- Role-based access: `dealer` vs `admin`
- Server Actions validate dealer ownership of resources
- Rate-limited application submissions
- Admin-only approval workflow — no self-activation

---

## Acceptance Criteria

- [ ] Dealer application form with validation
- [ ] Admin can approve/reject dealer applications
- [ ] Approved dealers can log in and access portal
- [ ] Dealer dashboard shows exclusive pricing
- [ ] Order placement and history tracking works
- [ ] Territory assignment by admin
- [ ] Email notifications at each status change
- [ ] Unauthenticated users redirected to login

---

## SEO

### Page Metadata

```ts
// /dealers — public landing page (indexed)
export const metadata: Metadata = {
  title: 'Become a Dealer | Gods Promise Aluminium Roofing',
  description:
    'Join our dealer network and access exclusive wholesale pricing on aluminium '
    + 'roofing sheets. Apply to become a Gods Promise Aluminium dealer in Nigeria.',
  alternates: { canonical: '/dealers' },
};

// /dealers/apply — application form (indexed)
export const metadata: Metadata = {
  title: 'Dealer Application | Gods Promise Aluminium',
  description: 'Apply to become a Gods Promise Aluminium dealer. Wholesale pricing, territory exclusivity, and marketing support.',
  alternates: { canonical: '/dealers/apply' },
};

// /dealers/portal — authenticated area (noindex)
export const metadata: Metadata = {
  title: 'Dealer Portal',
  robots: { index: false },
};
```

### Target Keywords

| Priority | Keyword |
|----------|---------|
| Primary | aluminium roofing dealer Nigeria |
| Primary | become a roofing sheet distributor Lagos |
| Secondary | wholesale aluminium roofing sheets |
| Long-tail | how to become aluminium roofing dealer in Nigeria |

### Structured Data

- `/dealers`: `WebPage` with `mainEntity` → `Organization` (dealer programme)
- Application confirmation: `ConfirmAction`

### Internal Linking

- Homepage → "Become a Dealer" CTA in footer
- `/about` → mention dealer network with link
- `/pricing` → "Dealers get exclusive rates" link
- Blog post: "How Our Dealer Network Works" → `/dealers/apply`
