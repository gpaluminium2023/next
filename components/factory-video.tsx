"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type FactoryVideoProps = {
  /** Path under /public/videos, e.g. "/videos/hero-corrugation.mp4". */
  src: string;
  /** Matching still. This is the only byte-cost until the clip is armed. */
  poster: string;
  /** What the footage shows — used as the accessible name of the player. */
  label: string;
  /**
   * "ambient" — muted, looping, starts by itself on wide viewports.
   * "feature" — native controls and audio, never starts on its own.
   */
  mode?: "ambient" | "feature";
  /** Hero only: warms the poster so it can paint without waiting on hydration. */
  priority?: boolean;
  className?: string;
};

/**
 * A factory clip that costs nothing until it is worth playing.
 *
 * The source footage is 848x480, so every caller sizes this to the clip's
 * native aspect rather than letting it fill a taller box — cropping a 480p
 * source and then upscaling the remainder is what makes honest footage look
 * cheap.
 */
export function FactoryVideo({
  src,
  poster,
  label,
  mode = "ambient",
  priority = false,
  className,
}: FactoryVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // `armed` gates the src attribute. Until it flips, preload="none" plus a
  // poster means the browser fetches one ~30KB still and nothing else, so a
  // page carrying five of these only pays for the ones a visitor reaches.
  const [armed, setArmed] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Ambient clips arm themselves near the viewport, but only where autoplay is
  // a courtesy rather than someone else's data bill: wide viewports, and only
  // when the visitor hasn't asked for reduced motion. Everywhere else the
  // poster stands in until tapped.
  useEffect(() => {
    if (mode !== "ambient") return;
    const el = wrapRef.current;
    if (!el) return;
    if (
      !window.matchMedia("(min-width: 768px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
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
  }, [mode]);

  // Arming only attaches the source; playback still has to be requested, and
  // can still be refused (low-power mode, battery saver). Let the element
  // report what actually happened via onPlay/onPause so the control tells the
  // truth rather than what we asked for.
  useEffect(() => {
    if (!armed) return;
    videoRef.current?.play().catch(() => undefined);
  }, [armed]);

  const toggle = useCallback(() => {
    const video = videoRef.current;
    if (!armed || !video) {
      setArmed(true);
      return;
    }
    if (video.paused) video.play().catch(() => undefined);
    else video.pause();
  }, [armed]);

  const ambient = mode === "ambient";

  return (
    <div
      ref={wrapRef}
      className={cn("group relative overflow-hidden bg-primary", className)}
    >
      {priority && (
        // React hoists this into <head>, so the still starts downloading with
        // the document instead of after the client bundle wakes up.
        <link rel="preload" as="image" href={poster} fetchPriority="high" />
      )}
      <video
        ref={videoRef}
        src={armed ? src : undefined}
        poster={poster}
        muted={ambient}
        loop={ambient}
        playsInline
        preload="none"
        controls={!ambient && armed}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="h-full w-full object-cover"
      />

      {/* Feature clips show a single large affordance until they are started;
          after that the native controls take over and this gets out of the way. */}
      {!ambient && !armed && (
        <button
          type="button"
          onClick={toggle}
          aria-label={`Play video: ${label}`}
          className="absolute inset-0 flex items-center justify-center bg-primary/30 transition-colors hover:bg-primary/15"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg">
            <PlayIcon className="ml-1 h-6 w-6" />
          </span>
        </button>
      )}

      {ambient && (
        <button
          type="button"
          onClick={toggle}
          aria-label={
            playing ? `Pause video: ${label}` : `Play video: ${label}`
          }
          className={cn(
            "absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary/70 text-primary-foreground backdrop-blur-sm transition-opacity hover:bg-primary/90 focus-visible:opacity-100",
            // Once it is running the control is clutter, so it fades back until
            // the visitor goes looking for it. Before then it reads as the
            // invitation to start, and stays put.
            playing ? "opacity-0 group-hover:opacity-100" : "opacity-100",
          )}
        >
          {playing ? (
            <PauseIcon className="h-4 w-4" />
          ) : (
            <PlayIcon className="ml-0.5 h-4 w-4" />
          )}
        </button>
      )}
    </div>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.79-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 4h3.5v16H7zM13.5 4H17v16h-3.5z" />
    </svg>
  );
}
