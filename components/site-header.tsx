import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { CartButton } from "@/components/store/cart-button";
import { SiteNavDesktop } from "@/components/site-nav-desktop";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Gods Promise Aluminium"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          <span className="font-heading text-base font-bold uppercase tracking-wide text-foreground leading-tight hidden sm:block xl:text-lg">
            Gods Promise <span className="text-accent">Aluminium</span>
          </span>
        </Link>

        <SiteNavDesktop />

        <div className="ml-auto flex shrink-0 items-center gap-1.5">
          <CartButton />
          <ThemeToggle />
          {/* Both CTAs only fit alongside the nav on wide screens; below that
              "Get a Quote" lives in the mobile sheet instead. */}
          <Button
            asChild
            variant="outline"
            className="font-heading hidden rounded-sm text-sm font-bold uppercase tracking-wide xl:inline-flex"
          >
            <Link href="/contact">Get a Quote</Link>
          </Button>
          <Button
            asChild
            className="font-heading hidden rounded-sm bg-accent text-sm font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90 lg:inline-flex"
          >
            <Link href="/store">Shop Online</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
