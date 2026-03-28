# Feature 15 — Video Gallery

**Priority**: 🔵 Low  
**Effort**: S (1–2 days)  
**Dependencies**: YouTube/Vimeo account or Cloudinary for self-hosting  
**Route**: `/gallery` (enhanced) or `/videos`

---

## Problem

The factory production process, installation quality, and product demonstrations  
are not showcased visually. Photos alone don't convey the manufacturing scale  
or installation process.

## Solution

A video gallery section featuring:

- Factory tour videos (production line, quality control)
- Installation process videos (step-by-step)
- Product demonstration videos (durability tests, colour options)
- Customer testimonial videos

---

## User Flow

```
1. User visits /gallery (or /videos tab within gallery)
2. Sees video grid with thumbnails and category tabs
3. Categories:
   - Factory Tour
   - Installation Process
   - Product Demos
   - Testimonials
4. Clicks a video → plays inline (modal or expanded) with YouTube/Vimeo embed
5. Related videos shown below
6. CTA: "Ready to roof your building?" → WhatsApp / quote
```

---

## Technical Design

### File Structure

```
app/
  gallery/
    page.tsx              ← combined photo + video gallery
  videos/
    page.tsx              ← standalone video gallery (alternative)
components/
  video-gallery.tsx       ← "use client" — filterable video grid
  video-card.tsx          ← thumbnail + play button overlay
  video-player.tsx        ← modal/inline player
lib/
  videos-data.ts          ← video metadata
```

### Video Data Shape

```ts
export interface Video {
  id: string;
  title: string;
  description: string;
  category: 'factory' | 'installation' | 'demo' | 'testimonial';
  thumbnail: string;       // URL or path
  embedUrl: string;        // YouTube/Vimeo embed URL
  duration: string;        // "3:45"
  publishedAt: string;
}
```

### Video Card Component

```tsx
import Image from 'next/image';
import { Play } from 'lucide-react';

export function VideoCard({ video, onPlay }: { video: Video; onPlay: () => void }) {
  return (
    <button onClick={onPlay} className="group relative rounded-sm overflow-hidden">
      <Image
        src={video.thumbnail}
        alt={video.title}
        width={480}
        height={270}
        className="aspect-video object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30
                      group-hover:bg-black/50 transition-colors">
        <Play className="h-12 w-12 text-white" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80">
        <p className="text-white text-sm font-medium">{video.title}</p>
        <p className="text-white/70 text-xs">{video.duration}</p>
      </div>
    </button>
  );
}
```

### Embed Player (modal)

```tsx
'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';

export function VideoPlayer({
  embedUrl,
  open,
  onClose,
}: {
  embedUrl: string;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0">
        <div className="aspect-video">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

---

## Performance

- Thumbnails lazy-loaded with `next/image`
- YouTube embeds loaded only on play (no iframe until clicked)
- `loading="lazy"` on iframes
- Lightweight placeholder with play button overlay

---

## Acceptance Criteria

- [ ] Video grid with thumbnail previews
- [ ] Category filter tabs (Factory, Installation, Demos, Testimonials)
- [ ] Click to play in modal or inline
- [ ] YouTube/Vimeo embeds load only on interaction
- [ ] Responsive grid (3 cols desktop, 2 tablet, 1 mobile)
- [ ] Video duration shown on thumbnail
- [ ] CTA below video section
- [ ] No performance impact on initial page load (lazy iframe loading)

---

## SEO

### Page Metadata

```ts
export const metadata: Metadata = {
  title: 'Roofing Videos | Factory Tours, Installation Demos & Testimonials',
  description:
    'Watch Gods Promise Aluminium factory tours, roofing installation demos, '
    + 'and customer testimonials. See our aluminium roofing sheets in action.',
  alternates: { canonical: '/gallery/videos' },
  openGraph: {
    title: 'Gods Promise Aluminium Roofing Videos',
    description: 'Factory tours, installation guides, and customer testimonials.',
    url: '/gallery/videos',
    type: 'website',
  },
};
```

### Target Keywords

| Priority | Keyword |
|----------|---------|
| Primary | aluminium roofing installation video Nigeria |
| Primary | roofing sheet factory tour Lagos |
| Secondary | how to install aluminium roofing sheets |
| Long-tail | Gods Promise Aluminium factory tour video |

### Structured Data (JSON-LD)

Per video:

```json
{
  "@type": "VideoObject",
  "name": "Long Span Aluminium Roofing Installation",
  "description": "Watch our team install long span aluminium roofing sheets.",
  "thumbnailUrl": "https://...",
  "uploadDate": "2024-06-15",
  "duration": "PT3M45S",
  "contentUrl": "https://youtube.com/watch?v=...",
  "embedUrl": "https://youtube.com/embed/..."
}
```

Page: `ItemList` of `VideoObject` entries. Consider adding a **Video Sitemap** for Google Video search.

### Internal Linking

- `/gallery` → "Videos" tab links to video gallery
- `/products` → "Watch installation video" per product type
- `/about` → "Take a factory tour" video link
- Blog: "How We Make Our Roofing Sheets" → factory video
