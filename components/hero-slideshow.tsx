"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Clip = {
  src: string;
  poster: string;
};

type HeroSlideshowProps = {
  clips: Clip[];
  className?: string;
};

/**
 * Full-bleed, muted, auto-advancing background for the hero. Two stacked
 * <video> layers crossfade into each other on `ended`, with the hidden layer
 * always pre-loaded one clip ahead so the swap never stalls.
 *
 * Ships a single static poster on first paint (the LCP-safe path) and only
 * upgrades to video after mount, and only for desktop, motion-ok visitors —
 * mobile and prefers-reduced-motion visitors keep the still frame.
 */
export function HeroSlideshow({ clips, className }: HeroSlideshowProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const layerRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)] as const;
  const nextIndexRef = useRef(1 % Math.max(clips.length, 1));
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const [armed, setArmed] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (clips.length === 0) return;
    if (
      !window.matchMedia("(min-width: 768px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [clips.length]);

  const handleEnded = (layer: 0 | 1) => {
    if (clips.length < 2) return;
    const otherLayer = layer === 0 ? 1 : 0;
    const other = layerRefs[otherLayer].current;
    const mine = layerRefs[layer].current;
    if (!other || !mine) return;

    setActiveLayer(otherLayer);
    other.currentTime = 0;
    other.play().catch(() => undefined);

    const upcoming = (nextIndexRef.current + 1) % clips.length;
    mine.src = clips[upcoming].src;
    mine.load();
    nextIndexRef.current = upcoming;
  };

  const toggle = () => {
    const current = layerRefs[activeLayer].current;
    if (!current) return;
    if (current.paused) {
      current.play().catch(() => undefined);
      setPlaying(true);
    } else {
      current.pause();
      setPlaying(false);
    }
  };

  if (clips.length === 0) return null;

  return (
    <div ref={wrapRef} className={cn("absolute inset-0 overflow-hidden bg-primary", className)}>
      <link rel="preload" as="image" href={clips[0].poster} fetchPriority="high" />
      {!armed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={clips[0].poster} alt="" className="h-full w-full object-cover" />
      ) : (
        <>
          {([0, 1] as const).map((layer) => (
            <video
              key={layer}
              ref={layerRefs[layer]}
              src={clips[layer % clips.length].src}
              poster={clips[layer % clips.length].poster}
              autoPlay={layer === 0}
              muted
              playsInline
              preload="auto"
              onEnded={() => handleEnded(layer)}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out",
                activeLayer === layer ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
          {clips.length > 1 && (
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause background video" : "Play background video"}
              className="absolute bottom-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary/60 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary/80"
            >
              {playing ? <PauseIcon className="h-3.5 w-3.5" /> : <PlayIcon className="ml-0.5 h-3.5 w-3.5" />}
            </button>
          )}
        </>
      )}
    </div>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  );
}
