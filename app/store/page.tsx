import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/store/product-card";
import type { ProductImage } from "@/lib/store/types";
import { siteIdentity } from "@/lib/site-identity";
import { CATEGORY_LABELS, CATEGORY_VALUES } from "@/lib/store/categories";
import { BranchBar } from "@/components/store/branch-bar";
import { listBranches, resolveBranch, loadBranchPrices, priceProduct } from "@/lib/store/branch";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/store" },
  title: "Shop Aluminium Roofing Sheets & Tiles Online | Gods Promise Aluminium",
  description:
    "Buy aluminium long span roofing sheets, step tiles, Metcopo and Gerard stone-coated tiles online. Secure card, bank transfer or USSD payment via Paystack.",
};

const CATEGORIES = [
  { value: undefined, label: "All Products" },
  ...CATEGORY_VALUES.map((value) => ({ value, label: CATEGORY_LABELS[value] })),
];

interface StorePageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function StorePage({ searchParams }: StorePageProps) {
  const { category } = await searchParams;
  const validCategory = CATEGORIES.find((c) => c.value === category)?.value;

  const [branches, activeBranch, products] = await Promise.all([
    listBranches(),
    resolveBranch(),
    prisma.product.findMany({
      where: {
        published: true,
        ...(validCategory ? { category: validCategory } : {}),
      },
      include: { variants: { orderBy: { sortOrder: "asc" } } },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
  ]);

  const branchPrices = await loadBranchPrices(activeBranch);

  // Products the active branch doesn't carry are dropped from the grid rather
  // than shown at another branch's price.
  const visibleProducts = products.flatMap((product) => {
    const priced = priceProduct(branchPrices, product);
    if (!priced.carried) return [];
    return [{ product, priced }];
  });

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="mb-3 font-heading text-xs font-bold uppercase tracking-widest text-accent">
            Shop Online
          </p>
          <h1 className="mb-4 text-balance font-heading text-4xl font-bold uppercase sm:text-5xl lg:text-6xl">
            Buy Roofing Materials Online
          </h1>
          <p className="max-w-2xl text-base text-primary-foreground/80 sm:text-lg">
            Order aluminium roofing sheets, stone-coated tiles and accessories directly, and pay
            securely by card, bank transfer or USSD. Delivery is quoted separately via WhatsApp
            after your order.
          </p>
        </div>
        <div className="h-1 w-full bg-accent" />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BranchBar branches={branches} active={activeBranch} />
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const href = c.value ? `/store?category=${c.value}` : "/store";
            const isActive = c.value === validCategory;
            return (
              <Link
                key={c.label}
                href={href}
                className={cn(
                  "rounded-sm border px-4 py-2 font-heading text-xs font-bold uppercase tracking-wide transition-colors",
                  isActive
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-card text-foreground hover:border-accent/50",
                )}
              >
                {c.label}
              </Link>
            );
          })}
        </div>

        {visibleProducts.length === 0 ? (
          <div className="rounded-sm border border-dashed border-border p-12 text-center text-muted-foreground">
            <p>
              {activeBranch && branches.length > 1
                ? `Our ${activeBranch.shortName} branch doesn't stock anything in this category yet.`
                : "No products available in this category yet."}
            </p>
            <p className="mt-2 text-sm">
              Need something specific? Contact us on{" "}
              <a
                href={activeBranch?.whatsappUrl ?? siteIdentity.whatsappUrl}
                className="text-accent underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map(({ product, priced }) => (
              <ProductCard
                key={product.id}
                slug={product.slug}
                name={product.name}
                category={product.category}
                unit={product.unit}
                images={Array.isArray(product.images) ? (product.images as unknown as ProductImage[]) : []}
                basePriceKobo={priced.basePriceKobo}
                inStock={priced.inStock}
                variants={priced.variants}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
