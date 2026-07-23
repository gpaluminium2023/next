import type { ProductCategory } from "@/lib/generated/prisma/client";

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  SHEETS: "Roofing Sheets",
  STONE_COATED: "Stone-Coated Tiles",
  ACCESSORIES: "Accessories",
};

export const CATEGORY_VALUES = Object.keys(CATEGORY_LABELS) as ProductCategory[];

export function categoryLabel(category: string) {
  return CATEGORY_LABELS[category as ProductCategory] ?? category;
}
