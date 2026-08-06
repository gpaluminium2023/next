import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const BRANCH_COOKIE = "gpa_branch";
export const BRANCH_COOKIE_MAX_AGE = 60 * 60 * 24 * 180; // 180 days

// Shape shared by server components, the branch selector and the seed script.
export interface BranchSummary {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  isDefault: boolean;
  addressLine: string;
  locality: string;
  region: string;
  phoneE164: string;
  whatsappUrl: string;
  priceListDate: Date | null;
  note: string | null;
}

const BRANCH_SELECT = {
  id: true,
  slug: true,
  name: true,
  shortName: true,
  isDefault: true,
  addressLine: true,
  locality: true,
  region: true,
  phoneE164: true,
  whatsappUrl: true,
  priceListDate: true,
  note: true,
} as const;

export async function listBranches(): Promise<BranchSummary[]> {
  return prisma.branch.findMany({
    where: { published: true },
    select: BRANCH_SELECT,
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export async function getDefaultBranch(): Promise<BranchSummary | null> {
  return prisma.branch.findFirst({
    where: { published: true, isDefault: true },
    select: BRANCH_SELECT,
    orderBy: { sortOrder: "asc" },
  });
}

export interface BranchResolution {
  branch: BranchSummary | null;
  /**
   * True when the visitor actually picked this branch, false when we fell back
   * to the default. Prices differ enough between branches that a silent
   * fallback shouldn't look like a choice — the store prompts when this is
   * false rather than quietly showing Lagos rates to an Enugu customer.
   */
  explicit: boolean;
}

/**
 * The branch a request is shopping, plus whether the visitor chose it.
 *
 * `branch` is null only if no published branch exists at all — callers treat
 * that as "branches not seeded yet" and fall back to the plain catalogue
 * prices, so the store keeps working before `pnpm seed:branches` has been run.
 */
export async function resolveBranchWithSource(
  slugOverride?: string | null,
): Promise<BranchResolution> {
  const slug = slugOverride ?? (await cookies()).get(BRANCH_COOKIE)?.value;

  if (slug) {
    const match = await prisma.branch.findFirst({
      where: { slug, published: true },
      select: BRANCH_SELECT,
    });
    if (match) return { branch: match, explicit: true };
  }

  return { branch: await getDefaultBranch(), explicit: false };
}

/** Just the branch — for callers that don't care how it was arrived at. */
export async function resolveBranch(slugOverride?: string | null): Promise<BranchSummary | null> {
  return (await resolveBranchWithSource(slugOverride)).branch;
}

// ──────────────────────────────
// Price resolution
// ──────────────────────────────

export interface ResolvedPrice {
  priceKobo: number;
  inStock: boolean;
}

/**
 * A branch's price overrides, keyed by variant id and by product id.
 *
 * The default branch has no overrides — it is priced off the catalogue columns
 * directly — so we skip the query entirely for it.
 *
 * Anything absent falls back to the national catalogue price — every branch
 * sells the full range, and only the items a branch has explicitly repriced
 * differ.
 */
export interface BranchPriceMap {
  branch: BranchSummary | null;
  isDefaultBranch: boolean;
  byVariantId: Map<string, ResolvedPrice>;
  byProductId: Map<string, ResolvedPrice>;
}

export async function loadBranchPrices(branch: BranchSummary | null): Promise<BranchPriceMap> {
  // No branch row, or the default branch: catalogue prices apply as-is.
  if (!branch || branch.isDefault) {
    return {
      branch,
      isDefaultBranch: true,
      byVariantId: new Map(),
      byProductId: new Map(),
    };
  }

  const [variantPrices, productPrices] = await Promise.all([
    prisma.branchVariantPrice.findMany({
      where: { branchId: branch.id },
      select: { variantId: true, productId: true, priceKobo: true, inStock: true },
    }),
    prisma.branchProductPrice.findMany({
      where: { branchId: branch.id },
      select: { productId: true, priceKobo: true, inStock: true },
    }),
  ]);

  return {
    branch,
    isDefaultBranch: false,
    byVariantId: new Map(
      variantPrices.map((p) => [p.variantId, { priceKobo: p.priceKobo, inStock: p.inStock }]),
    ),
    byProductId: new Map(
      productPrices.map((p) => [p.productId, { priceKobo: p.priceKobo, inStock: p.inStock }]),
    ),
  };
}

/** Convenience: resolve the request's branch and load its overrides in one go. */
export async function getBranchPricing(slugOverride?: string | null): Promise<BranchPriceMap> {
  return loadBranchPrices(await resolveBranch(slugOverride));
}

/**
 * Price for one variant at this branch.
 *
 * Every branch sells the full catalogue. A branch price wins where one exists;
 * everything else falls back to the national rate on the variant itself.
 *
 * `null` means nothing anywhere has a usable price — a ₦0 variant, which is
 * the placeholder convention seed-store.ts uses for 0.45MMB and the branch seed
 * uses for gauges only one branch lists. Those stay hidden rather than showing
 * as out of stock: an unbuyable row is noise, not information.
 */
export function priceForVariant(
  prices: BranchPriceMap,
  variant: { id: string; priceKobo: number; inStock: boolean },
): ResolvedPrice | null {
  const override = prices.byVariantId.get(variant.id);
  if (override && override.priceKobo > 0) return override;

  // No branch price for this gauge — sell it at the national rate.
  if (variant.priceKobo <= 0) return null;
  return { priceKobo: variant.priceKobo, inStock: variant.inStock };
}

/** Same, for a product with no variants. */
export function priceForProduct(
  prices: BranchPriceMap,
  product: { id: string; basePriceKobo: number | null; inStock: boolean },
): ResolvedPrice | null {
  const override = prices.byProductId.get(product.id);
  if (override && override.priceKobo > 0) return override;

  if (product.basePriceKobo == null || product.basePriceKobo <= 0) return null;
  return { priceKobo: product.basePriceKobo, inStock: product.inStock };
}

export interface PricedVariant {
  id: string;
  label: string;
  priceKobo: number;
  inStock: boolean;
  sortOrder: number;
}

export interface PricableProduct {
  id: string;
  basePriceKobo: number | null;
  inStock: boolean;
  variants: { id: string; label: string; priceKobo: number; inStock: boolean; sortOrder: number }[];
}

export interface PricedProduct {
  /** Variants this branch actually carries, already re-priced. */
  variants: PricedVariant[];
  /** Base price for variant-less products; null when not carried here. */
  basePriceKobo: number | null;
  inStock: boolean;
  /** False when the branch carries none of this product's options. */
  carried: boolean;
}

/**
 * Re-price a product for a branch. Variants the branch does not stock are
 * dropped from the list entirely rather than shown as out of stock — they are
 * not part of that branch's range at all.
 */
export function priceProduct(prices: BranchPriceMap, product: PricableProduct): PricedProduct {
  if (product.variants.length > 0) {
    const variants = product.variants.flatMap((v) => {
      const resolved = priceForVariant(prices, v);
      if (!resolved) return [];
      return [{ ...v, priceKobo: resolved.priceKobo, inStock: resolved.inStock }];
    });

    return {
      variants,
      basePriceKobo: null,
      inStock: variants.some((v) => v.inStock),
      carried: variants.length > 0,
    };
  }

  const resolved = priceForProduct(prices, product);
  return {
    variants: [],
    basePriceKobo: resolved?.priceKobo ?? null,
    inStock: resolved?.inStock ?? false,
    carried: resolved != null,
  };
}
