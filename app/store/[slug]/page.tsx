import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { ProductGallery } from "@/components/store/product-gallery";
import { AddToCart } from "@/components/store/add-to-cart";
import { formatNaira } from "@/lib/store/format";
import type { ProductImage } from "@/lib/store/types";
import { siteIdentity } from "@/lib/site-identity";
import { categoryLabel } from "@/lib/store/categories";
import { ogImageUrl, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from "@/lib/og-image";
import { BranchBar } from "@/components/store/branch-bar";
import {
  listBranches,
  resolveBranchWithSource,
  loadBranchPrices,
  priceProduct,
} from "@/lib/store/branch";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { variants: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product || !product.published) return {};

  const title = `${product.name} | Buy Online | ${siteIdentity.brandName}`;
  const description =
    product.description || `Buy ${product.name} online from ${siteIdentity.brandName}.`;

  // Share cards use the product's own photo; the logo is only the fallback for
  // products that have no gallery image yet. ogImageUrl swaps in a ~100 KB
  // derivative — the raw artwork is megabytes and WhatsApp drops it.
  const images = Array.isArray(product.images) ? (product.images as unknown as ProductImage[]) : [];
  const cover = images[0];
  const imageUrl = ogImageUrl(cover?.url ?? siteIdentity.logoPath);
  const imageAlt = cover?.alt || `${product.name} — ${siteIdentity.brandName}`;

  return {
    alternates: { canonical: `/store/${product.slug}` },
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteIdentity.siteUrl}/store/${product.slug}`,
      type: "website",
      locale: "en_NG",
      siteName: siteIdentity.brandName,
      // Explicit dimensions let a scraper lay the card out without downloading
      // the file first.
      images: [
        { url: imageUrl, alt: imageAlt, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product || !product.published) notFound();

  const [branches, { branch: activeBranch, explicit: branchChosen }] = await Promise.all([
    listBranches(),
    resolveBranchWithSource(),
  ]);
  const branchPrices = await loadBranchPrices(activeBranch);
  const priced = priceProduct(branchPrices, product);

  const images = Array.isArray(product.images) ? (product.images as unknown as ProductImage[]) : [];
  const anyInStock = priced.inStock;
  const prices = priced.variants.map((v) => v.priceKobo).filter((p) => p > 0);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: images.map((img) => img.url),
    brand: { "@type": "Brand", name: siteIdentity.brandName },
    ...(prices.length > 0
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "NGN",
            lowPrice: (Math.min(...prices) / 100).toFixed(2),
            highPrice: (Math.max(...prices) / 100).toFixed(2),
            availability: anyInStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          },
        }
      : priced.basePriceKobo
        ? {
            offers: {
              "@type": "Offer",
              priceCurrency: "NGN",
              price: (priced.basePriceKobo / 100).toFixed(2),
              availability: anyInStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            },
          }
        : {}),
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Link href="/store" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" /> Back to store
        </Link>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BranchBar branches={branches} active={activeBranch} chosen={branchChosen} />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <ProductGallery images={images} videoUrl={product.videoUrl} productName={product.name} />

          <div>
            <p className="mb-2 font-heading text-xs font-bold uppercase tracking-widest text-accent">
              {categoryLabel(product.category)}
            </p>
            <h1 className="mb-3 font-heading text-3xl font-bold uppercase leading-tight sm:text-4xl">
              {product.name}
            </h1>
            {!anyInStock && (
              <Badge variant="destructive" className="mb-4 rounded-sm">
                Out of stock
              </Badge>
            )}
            {product.description && (
              <p className="mb-6 text-sm text-muted-foreground sm:text-base">{product.description}</p>
            )}

            {priced.carried ? (
              <div className="rounded-sm border border-border bg-card p-5">
                <AddToCart
                  productId={product.id}
                  slug={product.slug}
                  name={product.name}
                  unit={product.unit}
                  image={images[0]?.url}
                  basePriceKobo={priced.basePriceKobo}
                  inStock={priced.inStock}
                  variants={priced.variants.map((v) => ({
                    id: v.id,
                    label: v.label,
                    priceKobo: v.priceKobo,
                    inStock: v.inStock,
                  }))}
                />
              </div>
            ) : (
              <div className="rounded-sm border border-dashed border-border bg-card p-5 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">
                  Not stocked at our {activeBranch?.shortName} branch
                </p>
                <p className="mt-1">
                  Switch branch above to see where it&rsquo;s available, or message us on{" "}
                  <a
                    href={activeBranch?.whatsappUrl ?? siteIdentity.whatsappUrl}
                    className="text-accent underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>{" "}
                  and we&rsquo;ll quote it for you.
                </p>
              </div>
            )}

            {priced.variants.length > 0 && (
              <div className="mt-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  All options{activeBranch && branches.length > 1 ? ` at ${activeBranch.shortName}` : ""}
                </p>
                <ul className="divide-y divide-border rounded-sm border border-border text-sm">
                  {priced.variants.map((v) => (
                    <li key={v.id} className="flex items-center justify-between px-3 py-2">
                      <span>{v.label}</span>
                      <span className={v.inStock ? "font-medium" : "text-muted-foreground"}>
                        {v.inStock ? `${formatNaira(v.priceKobo)} / ${product.unit}` : "Out of stock"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
