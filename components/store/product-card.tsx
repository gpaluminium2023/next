import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatNaira } from "@/lib/store/format";
import type { ProductImage } from "@/lib/store/types";
import { categoryLabel } from "@/lib/store/categories";

interface ProductCardProps {
  slug: string;
  name: string;
  category: string;
  unit: string;
  images: ProductImage[];
  basePriceKobo: number | null;
  inStock: boolean;
  variants: { priceKobo: number; inStock: boolean }[];
}

export function ProductCard({ slug, name, category, unit, images, basePriceKobo, inStock, variants }: ProductCardProps) {
  const inStockPrices = variants.filter((v) => v.inStock).map((v) => v.priceKobo);
  const anyPrices = variants.map((v) => v.priceKobo).filter((p) => p > 0);
  const fromKobo =
    inStockPrices.length > 0
      ? Math.min(...inStockPrices)
      : anyPrices.length > 0
        ? Math.min(...anyPrices)
        : basePriceKobo;
  const anyInStock = variants.length > 0 ? variants.some((v) => v.inStock) : inStock;
  const cover = images[0];

  return (
    <Link
      href={`/store/${slug}`}
      className="group overflow-hidden rounded-sm border border-border bg-card transition-all hover:shadow-lg"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        {cover ? (
          <Image
            src={cover.url}
            alt={cover.alt || name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">No image</div>
        )}
        {!anyInStock && (
          <Badge variant="destructive" className="absolute top-2 right-2 rounded-sm text-xs">
            Out of stock
          </Badge>
        )}
      </div>
      <div className="p-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {categoryLabel(category)}
        </p>
        <h3 className="font-heading text-base font-bold uppercase leading-tight">{name}</h3>
        <div className="mt-2 flex items-baseline gap-1">
          {fromKobo != null ? (
            <>
              <span className="font-heading text-lg font-bold text-accent">
                {variants.length > 1 ? "From " : ""}
                {formatNaira(fromKobo)}
              </span>
              <span className="text-xs text-muted-foreground">/{unit}</span>
            </>
          ) : (
            <span className="text-xs text-muted-foreground">Contact for price</span>
          )}
        </div>
      </div>
    </Link>
  );
}
