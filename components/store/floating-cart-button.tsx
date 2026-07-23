"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart/cart-context";

// Site-wide, high-visibility entry point back into the cart — separate from
// the small header icon (components/store/cart-button.tsx), which is easy to
// miss. Only shown once something's actually in the cart.
export function FloatingCartButton() {
  const { count, hydrated, setOpen } = useCart();

  if (!hydrated || count === 0) return null;

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
      className="fixed bottom-20 left-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-black/25 transition-transform hover:scale-105 active:scale-95 md:bottom-6 md:left-6"
    >
      <ShoppingCart className="h-6 w-6" />
      <span className="absolute -right-1.5 -top-1.5 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-background bg-primary px-1 text-xs font-bold text-primary-foreground">
        {count > 99 ? "99+" : count}
      </span>
    </button>
  );
}
