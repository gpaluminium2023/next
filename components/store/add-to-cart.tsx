"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/cart/cart-context";
import { formatNaira } from "@/lib/store/format";

interface Variant {
  id: string;
  label: string;
  priceKobo: number;
  inStock: boolean;
}

interface AddToCartProps {
  productId: string;
  slug: string;
  name: string;
  unit: string;
  image?: string;
  basePriceKobo: number | null;
  inStock: boolean;
  variants: Variant[];
}

export function AddToCart({ productId, slug, name, unit, image, basePriceKobo, inStock, variants }: AddToCartProps) {
  const { addItem } = useCart();
  const [variantId, setVariantId] = useState<string | null>(
    variants.length > 0 ? (variants.find((v) => v.inStock)?.id ?? variants[0].id) : null,
  );
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = useMemo(
    () => variants.find((v) => v.id === variantId) ?? null,
    [variants, variantId],
  );

  const unitPriceKobo = selectedVariant ? selectedVariant.priceKobo : basePriceKobo;
  const itemInStock = variants.length > 0 ? (selectedVariant?.inStock ?? false) : inStock;
  const hasPrice = unitPriceKobo != null;
  const canAdd = itemInStock && hasPrice;
  const buttonLabel = !itemInStock ? "Out of Stock" : !hasPrice ? "Contact for Price" : "Add to Cart";

  function handleAdd() {
    if (!canAdd || unitPriceKobo == null) return;
    addItem(
      {
        productId,
        variantId: selectedVariant?.id ?? null,
        slug,
        name,
        variantLabel: selectedVariant?.label ?? null,
        unit,
        unitPriceKobo,
        image,
        inStock: true,
      },
      Math.max(1, quantity),
    );
    toast.success(`Added ${name}${selectedVariant ? ` (${selectedVariant.label})` : ""} to cart`);
  }

  return (
    <div className="space-y-4">
      {variants.length > 0 && (
        <div className="space-y-1.5">
          <Label>Choose an option</Label>
          <Select value={variantId ?? undefined} onValueChange={setVariantId}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {variants.map((v) => (
                <SelectItem key={v.id} value={v.id} disabled={!v.inStock}>
                  {v.label} — {v.inStock ? formatNaira(v.priceKobo) : "Out of stock"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex items-baseline gap-1">
        {unitPriceKobo != null ? (
          <>
            <span className="font-heading text-2xl font-bold text-accent">{formatNaira(unitPriceKobo)}</span>
            <span className="text-sm text-muted-foreground">/{unit}</span>
          </>
        ) : (
          <span className="text-sm text-muted-foreground">Contact us for a price</span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-sm border border-border">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={!canAdd}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            inputMode="numeric"
            min={1}
            max={500}
            value={quantity === 0 ? "" : quantity}
            onChange={(e) => {
              const raw = e.target.value;
              if (raw === "") {
                setQuantity(0);
                return;
              }
              const n = Math.trunc(Number(raw));
              if (Number.isFinite(n)) setQuantity(Math.min(500, Math.max(0, n)));
            }}
            onBlur={() => setQuantity((q) => Math.max(1, Math.min(500, q)))}
            disabled={!canAdd}
            aria-label="Quantity"
            className="h-9 w-14 rounded-none border-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <Button type="button" variant="ghost" size="icon" onClick={() => setQuantity((q) => Math.min(500, q + 1))} disabled={!canAdd}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button
          type="button"
          onClick={handleAdd}
          disabled={!canAdd}
          className="flex-1 gap-2 rounded-sm bg-accent font-heading font-bold uppercase tracking-wide hover:bg-accent/90"
        >
          <ShoppingCart className="h-4 w-4" />
          {buttonLabel}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Delivery is not included — it&rsquo;s quoted separately via WhatsApp after your order.
      </p>
    </div>
  );
}
