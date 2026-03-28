# Feature 14 — Live Chat Widget (WhatsApp Business)

**Priority**: 🔵 Low  
**Effort**: XS (0.5–1 day)  
**Dependencies**: WhatsApp Business account  
**Route**: N/A — floating widget on all pages

---

## Problem

The WhatsApp link is buried in the contact page and footer. Visitors must  
navigate away from their current page to start a conversation.

## Solution

A floating WhatsApp chat widget (bottom-right corner) visible on every page.  
Clicking it opens WhatsApp with a pre-filled message based on the current page  
context.

---

## User Flow

```
1. User is browsing any page
2. Sees floating green WhatsApp button (bottom-right)
3. Clicks → WhatsApp opens with contextual pre-filled message:
   - From /pricing: "Hi, I'm interested in your aluminium roofing sheet prices."
   - From /products: "Hi, I'd like to know more about your [product] roofing sheets."
   - From /calculator: "Hi, I just used your calculator and need a final quote."
   - Default: "Hi, I'm visiting your website and have a question."
4. Customer sends message → sales team responds
```

---

## Technical Design

### File Structure

```
components/
  whatsapp-widget.tsx     ← "use client" — floating button
app/
  layout.tsx              ← add <WhatsAppWidget /> before </body>
```

### Widget Component

```tsx
'use client';

import { usePathname } from 'next/navigation';

const PHONE = '2348XXXXXXXXX'; // WhatsApp Business number

const contextMessages: Record<string, string> = {
  '/pricing': 'Hi, I\'m interested in your aluminium roofing sheet prices.',
  '/products': 'Hi, I\'d like to know more about your roofing products.',
  '/calculator': 'Hi, I just used your roof calculator and need a final quote.',
  '/quote': 'Hi, I\'d like to request a formal quote.',
};

const DEFAULT_MESSAGE = 'Hi, I\'m visiting your website and have a question.';

export function WhatsAppWidget() {
  const pathname = usePathname();
  const message = contextMessages[pathname] ?? DEFAULT_MESSAGE;
  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center
                 rounded-full bg-[#25D366] text-white shadow-lg
                 hover:bg-[#20bd5a] transition-colors"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
        {/* WhatsApp icon SVG path */}
      </svg>
    </a>
  );
}
```

### Optional: Expanded Widget

For a more advanced version with a mini chat preview:

```
1. Click WhatsApp button → expands a small card above it
2. Card shows:
   - "Chat with us on WhatsApp"
   - "We typically reply within 5 minutes"
   - Pre-filled message preview
   - "Start Chat" button
3. Dismissible with X — remembers preference in localStorage
```

---

## Configuration

```env
NEXT_PUBLIC_WHATSAPP_PHONE=2348XXXXXXXXX
```

---

## Acceptance Criteria

- [ ] Floating button visible on all pages (bottom-right)
- [ ] Opens WhatsApp with page-contextual pre-filled message
- [ ] Does not overlap with other fixed elements (cookie banner, scroll-to-top)
- [ ] Accessible: has `aria-label`, keyboard focusable
- [ ] Mobile: doesn't obscure content or navigation
- [ ] Optional: dismiss/minimize and remember preference
- [ ] Smooth entry animation (fade in after 2s delay)

---

## SEO

### Impact

The WhatsApp widget is a client-side floating component — no dedicated page to index.

### SEO Considerations

- Widget is rendered client-side (`"use client"`) and does **not** affect SSR/page content
- The `<a>` link uses `rel="noopener noreferrer"` and `target="_blank"` — no SEO link equity leaked
- `aria-label="Chat with us on WhatsApp"` improves accessibility audit scores

### Structured Data Enhancement

Add `contactPoint` to the site-wide `Organization` JSON-LD:

```json
{
  "@type": "Organization",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "url": "https://wa.me/234XXXXXXXXXX",
    "availableLanguage": ["English", "Yoruba"]
  }
}
```

### Internal Linking

- No page-level linking needed
- Widget pre-fills message with current page context (product name, price, etc.) which improves lead quality
