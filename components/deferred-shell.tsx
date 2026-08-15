"use client";

import dynamic from "next/dynamic";

// Site-wide UI that nothing above the fold depends on, split into its own
// chunk so it loads after hydration instead of competing with the LCP image.
//
// All three are safe to defer because none of them paint on first render:
// CartDrawer renders a closed sheet (and pulls in the dialog primitives),
// FloatingCartButton returns null until the cart has items, and Toaster only
// shows anything once an action fires a toast.
//
// `ssr: false` is what keeps them out of the server-rendered HTML — they are
// also client-only by nature (localStorage-backed cart state), so there is no
// content or layout shift cost to skipping SSR here.
const CartDrawer = dynamic(
  () => import("@/components/store/cart-drawer").then((m) => m.CartDrawer),
  { ssr: false },
);

const FloatingCartButton = dynamic(
  () => import("@/components/store/floating-cart-button").then((m) => m.FloatingCartButton),
  { ssr: false },
);

const Toaster = dynamic(() => import("@/components/ui/sonner").then((m) => m.Toaster), {
  ssr: false,
});

export function DeferredShell() {
  return (
    <>
      <CartDrawer />
      <FloatingCartButton />
      <Toaster />
    </>
  );
}
