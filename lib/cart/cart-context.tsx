"use client";

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { CartItem, cartItemKey } from "@/lib/store/types";

const STORAGE_KEY = "gpa-cart-v1";

interface CartContextValue {
  items: CartItem[];
  hydrated: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string, variantId: string | null) => void;
  setQuantity: (productId: string, variantId: string | null, quantity: number) => void;
  clear: () => void;
  subtotalKobo: number;
  count: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Start empty on both server and first client render so the two markups
  // match; localStorage is only read after mount (see effect below).
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // corrupted/old-shape data — start fresh
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return; // don't clobber storage with the pre-load empty array
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((prev) => {
      const key = cartItemKey(item);
      const existing = prev.find((i) => cartItemKey(i) === key);
      if (existing) {
        return prev.map((i) => (cartItemKey(i) === key ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { ...item, quantity }];
    });
    setOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, variantId: string | null) => {
    setItems((prev) => prev.filter((i) => cartItemKey(i) !== cartItemKey({ productId, variantId })));
  }, []);

  const setQuantity = useCallback((productId: string, variantId: string | null, quantity: number) => {
    setItems((prev) => {
      const key = cartItemKey({ productId, variantId });
      if (quantity <= 0) return prev.filter((i) => cartItemKey(i) !== key);
      return prev.map((i) => (cartItemKey(i) === key ? { ...i, quantity } : i));
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const subtotalKobo = useMemo(
    () => items.reduce((sum, i) => sum + i.unitPriceKobo * i.quantity, 0),
    [items],
  );
  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const value: CartContextValue = {
    items,
    hydrated,
    addItem,
    removeItem,
    setQuantity,
    clear,
    subtotalKobo,
    count,
    open,
    setOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
