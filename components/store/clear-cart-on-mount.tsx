"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart/cart-context";

// Clears the cart once the success page confirms payment. Placed here
// (rather than clearing right before the Paystack redirect) so an abandoned
// or failed payment attempt leaves the cart intact for the customer to retry.
export function ClearCartOnMount() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
