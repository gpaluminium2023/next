"use client";

import { useEffect, useRef, useState } from "react";

interface TikTokEmbedProps {
  videoId: string;
  authorHandle: string; // no leading "@"
}

// TikTok's embed.js scans the DOM for blockquote.tiktok-embed once on load
// and again on every window.tiktokEmbedLoad() call it exposes — so a second
// (or third) embed on the same page just needs that re-scan, not another
// script tag.
const EMBED_SCRIPT_ID = "tiktok-embed-script";

export function TikTokEmbed({ videoId, authorHandle }: TikTokEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    if (document.getElementById(EMBED_SCRIPT_ID)) {
      (window as unknown as { tiktokEmbedLoad?: () => void }).tiktokEmbedLoad?.();
      return;
    }
    const script = document.createElement("script");
    script.id = EMBED_SCRIPT_ID;
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, [shouldLoad]);

  const videoUrl = `https://www.tiktok.com/@${authorHandle}/video/${videoId}`;

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-[325px]">
      {shouldLoad ? (
        <blockquote className="tiktok-embed" cite={videoUrl} data-video-id={videoId}>
          <section />
        </blockquote>
      ) : (
        // No iframe, no script — just a link — until this scrolls into view.
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener nofollow"
          className="flex aspect-9/16 items-center justify-center rounded-sm border border-border bg-card text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          View on TikTok
        </a>
      )}
    </div>
  );
}
