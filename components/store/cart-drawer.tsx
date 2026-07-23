"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart/cart-context";
import { formatNaira } from "@/lib/store/format";
import { cartItemKey } from "@/lib/store/types";

export function CartDrawer() {
  const { items, open, setOpen, removeItem, setQuantity, subtotalKobo } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border">
          <SheetTitle className="font-heading uppercase tracking-wide">Your Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center text-muted-foreground">
            <ShoppingBag className="h-10 w-10 opacity-40" />
            <p className="text-sm">Your cart is empty.</p>
            <Button asChild size="sm" variant="outline" onClick={() => setOpen(false)}>
              <Link href="/store">Browse the store</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4">
              <ul className="divide-y divide-border">
                {items.map((item) => (
                  <li key={cartItemKey(item)} className="flex gap-3 py-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm border border-border bg-muted">
                      {item.image && (
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{item.name}</p>
                      {item.variantLabel && (
                        <p className="text-xs text-muted-foreground">{item.variantLabel}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formatNaira(item.unitPriceKobo)} / {item.unit}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => setQuantity(item.productId, item.variantId, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <QuantityInput
                          value={item.quantity}
                          ariaLabel={`Quantity for ${item.name}`}
                          onCommit={(n) => setQuantity(item.productId, item.variantId, n)}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => setQuantity(item.productId, item.variantId, Math.min(500, item.quantity + 1))}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="ml-auto h-6 w-6 text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.productId, item.variantId)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <div className="shrink-0 text-sm font-semibold">
                      {formatNaira(item.unitPriceKobo * item.quantity)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <SheetFooter className="border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal (materials only)</span>
                <span className="font-heading text-lg font-bold">{formatNaira(subtotalKobo)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Delivery is not included — it&rsquo;s quoted separately via WhatsApp after your order.
              </p>
              <Button
                asChild
                className="w-full rounded-sm bg-accent font-heading font-bold uppercase tracking-wide hover:bg-accent/90"
                onClick={() => setOpen(false)}
              >
                <Link href="/checkout">Checkout</Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

// Local text state, decoupled from the committed cart quantity, so clearing
// the field to retype a value (e.g. 5 -> 150) doesn't get fought by the
// controlled value snapping back on every keystroke.
function QuantityInput({
  value,
  ariaLabel,
  onCommit,
}: {
  value: number;
  ariaLabel: string;
  onCommit: (quantity: number) => void;
}) {
  const [text, setText] = useState(String(value));

  useEffect(() => {
    setText(String(value));
  }, [value]);

  return (
    <Input
      type="number"
      inputMode="numeric"
      min={1}
      max={500}
      value={text}
      onChange={(e) => {
        const raw = e.target.value;
        setText(raw);
        const n = Math.trunc(Number(raw));
        if (raw !== "" && Number.isFinite(n) && n > 0) {
          onCommit(Math.min(500, n));
        }
      }}
      onBlur={() => {
        const n = Math.trunc(Number(text));
        if (!Number.isFinite(n) || n <= 0) {
          setText(String(value));
          return;
        }
        const clamped = Math.min(500, n);
        setText(String(clamped));
        onCommit(clamped);
      }}
      aria-label={ariaLabel}
      className="h-6 w-12 rounded-sm border-border px-1 text-center text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
    />
  );
}
