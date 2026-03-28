# Feature 12 — PWA (Progressive Web App)

**Priority**: 🔵 Low  
**Effort**: S (1–2 days)  
**Dependencies**: None  
**Route**: N/A — site-wide enhancement

---

## Problem

Many GPA customers are on mobile with poor or intermittent network connections.  
The site requires a full page load every visit, and there is no "install to  
home screen" prompt for repeat visitors.

## Solution

Convert the site to a PWA with:

- Installable on Android/iOS home screens
- Offline access to key pages (pricing, products, contact)
- Faster repeat visits via service worker caching

---

## Technical Design

### File Structure

```
public/
  manifest.json           ← web app manifest
  sw.js                   ← service worker (or generated)
  icons/
    icon-192.png
    icon-512.png
    icon-maskable-192.png
    icon-maskable-512.png
app/
  layout.tsx              ← add manifest link + theme-color meta
```

### Web App Manifest (`public/manifest.json`)

```json
{
  "name": "Gods Promise Aluminium",
  "short_name": "GPA Roofing",
  "description": "Aluminium roofing sheets — factory-direct pricing from Lagos",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a1628",
  "theme_color": "#0a1628",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

### Service Worker Strategy

Using **next-pwa** or **Serwist** (modern next-pwa fork):

```ts
// next.config.ts
import withSerwist from '@serwist/next';

export default withSerwist({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
})({
  // existing next config
});
```

### Caching Strategy

| Resource | Strategy | Max Age |
|---|---|---|
| Static assets (JS, CSS, fonts) | Cache First | 30 days |
| Images | Cache First | 7 days |
| HTML pages (pricing, products) | Stale While Revalidate | 1 day |
| API routes | Network First | — |
| Offline fallback | Precache | — |

### Offline Fallback Page

```tsx
// app/offline/page.tsx
export default function OfflinePage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <h1 className="font-heading text-2xl font-bold">You're Offline</h1>
        <p>Check your internet connection and try again.</p>
        <p>Call us directly: <a href="tel:+234XXXXXXXXXX">+234 XXX XXX XXXX</a></p>
      </div>
    </div>
  );
}
```

---

## Acceptance Criteria

- [ ] Valid `manifest.json` with correct icons
- [ ] "Add to Home Screen" prompt works on Android Chrome
- [ ] App icon appears on home screen with correct splash screen
- [ ] Service worker registered and caching static assets
- [ ] Pricing and products pages accessible offline (cached)
- [ ] Offline fallback page shown for uncached routes
- [ ] Lighthouse PWA score ≥ 90
- [ ] No impact on initial page load performance

---

## SEO

### Impact

PWA is a site-wide infrastructure feature — no new routes or pages to index.

### SEO Benefits

- `manifest.json` recognised by Google as a signal of a quality web experience
- Offline capability improves Lighthouse "Best Practices" score, indirectly boosting rankings
- Cached pages load faster → improved Core Web Vitals (LCP, FID)

### `manifest.json` SEO Fields

```json
{
  "name": "Gods Promise Aluminium",
  "short_name": "GPA Roofing",
  "description": "Aluminium roofing sheets manufacturer in Lagos, Nigeria",
  "start_url": "/",
  "scope": "/",
  "theme_color": "#0f172a",
  "background_color": "#ffffff"
}
```

### Internal Linking

- No direct internal linking impact
- Offline fallback page should include links to cached core pages (`/pricing`, `/products`, `/contact`)
