"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart/cart-context";

// Clears the cart once the success page confirms payment. Placed here
// (rather than clearing right before the Paystack redirect) so an abandoned
// or failed payment attempt leaves the cart intact for the customer to retry.
//
// Gated on `hydrated` rather than firing on mount unconditionally: this
// component mounts in the same commit as CartProvider (fresh page load after
// the Paystack/callback redirect), and CartProvider's own effect — which
// reads the pre-checkout cart back out of localStorage — is a *parent*
// effect that fires after this *child* effect. Clearing immediately on
// mount raced that hydration and always lost: the stale cart got restored
// right after being cleared. Waiting for `hydrated` runs clear() after
// that restore instead, so it actually sticks.
export function ClearCartOnMount() {
  const { clear, hydrated } = useCart();
  useEffect(() => {
    if (hydrated) clear();
  }, [hydrated, clear]);
  return null;
}
