"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useAnimate } from "motion/react-mini";

import { blackFridayOffer } from "@/lib/promo";
import styles from "./black-friday-hero.module.css";

export function BlackFridayHero() {
  const { name, discountLabel, example, path } = blackFridayOffer;
  const [scope, animate] = useAnimate<HTMLElement>();

  useEffect(() => {
    const hero = scope.current;
    const artwork = hero.querySelector("img");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!artwork || reduced.matches) return;

    let disposed = false;
    const animations: ReturnType<typeof animate>[] = [];
    const compact = window.matchMedia("(max-width: 640px)").matches;
    const duration = compact ? 0.65 : 1.05;
    const ease = [0.22, 1, 0.36, 1] as const;
    function reveal() {
      if (disposed || reduced.matches || document.hidden || hero.getBoundingClientRect().bottom <= 0) return;
      const start = compact ? "translateY(8px) scale(0.98)" : "translateY(22px) scale(0.95)";
      animations.push(
        animate("img", { transform: [start, "translateY(0) scale(1)"] }, { duration, ease }),
        animate("h1", { backgroundPosition: ["100% 50%", "0% 50%"] }, { duration, delay: 0.1, ease }),
        animate("[data-offer-tag]", {
          transform: [compact ? "rotate(-3deg)" : "rotate(1deg)", "rotate(-11deg)", "rotate(-8deg)"],
        }, { duration: duration * 0.8, delay: 0.15, ease }),
      );
    }
    // Start once the metal is visible, even on a slow first visit.
    void artwork.decode().then(reveal, () => {});
    function finishOnReducedMotion() {
      if (reduced.matches) {
        disposed = true;
        for (const animation of animations) animation.complete();
      }
    }
    reduced.addEventListener("change", finishOnReducedMotion);
    return () => {
      disposed = true;
      reduced.removeEventListener("change", finishOnReducedMotion);
      for (const animation of animations) animation.cancel();
    };
  }, [animate, scope]);

  return (
    <section ref={scope} className={styles.hero} aria-labelledby="campaign-title">
      <Image
        className={styles.artwork}
        src="/images/black-friday-roofing.webp"
        alt="Layered silver, navy and red aluminium roofing sheets"
        width={1536}
        height={747}
        sizes="(min-width: 1024px) 64rem, 100vw"
        preload
      />
      <div className={styles.content}>
        <div className={styles.headline}>
          <h1 id="campaign-title">{name}</h1>
          <span className={styles.tag} data-offer-tag>{discountLabel}</span>
        </div>
        <p className="mt-5 text-base text-white/90 sm:text-xl">
          Save <strong>{example.discountDisplay}</strong> on a {example.purchaseDisplay} purchase.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          <Link href="/contact" className="inline-flex min-h-12 items-center gap-3 rounded-sm bg-accent px-6 font-bold text-accent-foreground hover:bg-accent/85">
            Get a quote <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href={path} className="inline-flex min-h-12 items-center text-sm font-bold text-white underline decoration-white/45 underline-offset-4 hover:decoration-white">
            View offer details
          </Link>
        </div>
      </div>
    </section>
  );
}
