import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { blackFridayOffer } from "@/lib/promo";
import styles from "./black-friday-hero.module.css";

export function BlackFridayHero() {
  const { name, discountLabel, example, path } = blackFridayOffer;

  return (
    <section className={styles.hero} aria-labelledby="campaign-title">
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
          <span className={styles.tag}>{discountLabel}</span>
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
