"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/lib/store/types";

interface ProductGalleryProps {
  images: ProductImage[];
  videoUrl: string | null;
  productName: string;
}

export function ProductGallery({ images, videoUrl, productName }: ProductGalleryProps) {
  // Slide 0..images.length-1 are photos; the last slide (if present) is the video.
  const slides = [...images, ...(videoUrl ? [{ url: videoUrl, alt: `${productName} sample video`, publicId: "video" }] : [])];
  const [active, setActive] = useState(0);
  const activeSlide = slides[active];
  const isVideoSlide = videoUrl !== null && active === slides.length - 1;

  if (slides.length === 0) {
    return (
      <div className="flex aspect-4/3 w-full items-center justify-center rounded-sm border border-border bg-muted text-sm text-muted-foreground">
        No image available
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-sm border border-border bg-muted">
        {isVideoSlide ? (
          <video src={activeSlide.url} controls className="h-full w-full object-cover" />
        ) : (
          <Image
            src={activeSlide.url}
            alt={activeSlide.alt || productName}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        )}
      </div>

      {slides.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {slides.map((slide, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-sm border bg-muted",
                active === i ? "border-accent ring-1 ring-accent" : "border-border",
              )}
            >
              {videoUrl && i === slides.length - 1 ? (
                <span className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                  <PlayCircle className="h-6 w-6" />
                </span>
              ) : (
                <Image src={slide.url} alt="" fill className="object-cover" sizes="64px" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
