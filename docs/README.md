# Gods Promise Aluminium — Feature Roadmap

**Site**: Marketing / lead-generation website for Gods Promise Aluminium Company Limited  
**Stack**: Next.js 16 · React 19 · TypeScript · Tailwind v4 · shadcn/ui · pnpm  
**Primary CTA**: WhatsApp handoff  
**Last updated**: 2026-03-28

---

## Roadmap Overview

| # | Feature | Priority | Effort | Status |
|---|---------|----------|--------|--------|
| [01](./feat-01-price-calculator.md) | Instant Price Calculator | 🔴 High | S | Planned |
| [02](./feat-02-quote-request-email.md) | Online Quote Request + Email | 🔴 High | M | Planned |
| [03](./feat-03-paystack-payments.md) | Paystack Payment Integration | 🔴 High | L | Planned |
| [04](./feat-04-sanity-cms.md) | CMS for Products & Blog | 🔴 High | L | Planned |
| [05](./feat-05-dealer-portal.md) | Dealer Portal | 🔴 High | XL | Planned |
| [06](./feat-06-project-portfolio-filters.md) | Project Portfolio with Filters | 🟡 Medium | M | Planned |
| [07](./feat-07-stock-availability.md) | Stock / Availability Indicator | 🟡 Medium | S | Planned |
| [08](./feat-08-customer-reviews.md) | Customer Reviews System | 🟡 Medium | M | Planned |
| [09](./feat-09-material-calculator.md) | Roofing Material Calculator | 🟡 Medium | M | Planned |
| [10](./feat-10-newsletter-email-capture.md) | Newsletter / Email Capture | 🟡 Medium | S | Planned |
| [11](./feat-11-local-seo-pages.md) | Local SEO Landing Pages | 🟡 Medium | M | Planned |
| [12](./feat-12-pwa.md) | PWA (Progressive Web App) | 🔵 Low | S | Planned |
| [13](./feat-13-multi-language.md) | Multi-language Pages | 🔵 Low | M | Planned |
| [14](./feat-14-whatsapp-chat-widget.md) | Live Chat Widget | 🔵 Low | XS | Planned |
| [15](./feat-15-video-gallery.md) | Video Gallery | 🔵 Low | S | Planned |
| [16](./feat-16-contractor-directory.md) | Contractor / Installer Directory | 🔵 Low | M | Planned |

**Effort key**: S = days · M = 1–2 weeks · L = 2–4 weeks · XL = 4+ weeks

---

## Recommended Build Order

```
Phase 1 — Quick wins (no new infra)
  01 → 09 → 07 → 10 → 12

Phase 2 — Lead capture (Resend + email)
  02 → 15

Phase 3 — Content authority (Sanity CMS)
  04 → 06 → 11 → 08

Phase 4 — Commerce (Paystack)
  03 → 05

Phase 5 — Scale (auth, directories, i18n)
  05 → 13 → 16 → 14
```
