export interface ProductImage {
  url: string;
  publicId: string;
  alt: string;
}

// A single line in the client-side cart. Prices here are display-only —
// the checkout API re-derives every price from the database before charging.
export interface CartItem {
  productId: string;
  variantId: string | null;
  slug: string;
  name: string;
  variantLabel: string | null;
  unit: string;
  unitPriceKobo: number;
  quantity: number;
  image?: string;
  inStock: boolean;
}

export function cartItemKey(item: Pick<CartItem, "productId" | "variantId">) {
  return `${item.productId}:${item.variantId ?? "base"}`;
}
