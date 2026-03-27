import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/pricing", label: "Pricing" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Gods Promise Aluminium"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          <span className="font-heading text-lg font-bold uppercase tracking-wide text-foreground leading-tight hidden sm:block">
            Gods Promise <span className="text-accent">Aluminium</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-heading px-3 py-1.5 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground hover:bg-muted rounded-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-bold uppercase tracking-wide text-sm rounded-sm"
            >
              <Link href="/contact">Get a Quote</Link>
            </Button>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
