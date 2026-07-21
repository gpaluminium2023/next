import Link from "next/link";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/product-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import type { ProductImage } from "@/lib/store/types";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") redirect("/admin/login");

  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { variants: { orderBy: { sortOrder: "asc" } } },
  });
  if (!product) notFound();

  const images = Array.isArray(product.images) ? (product.images as unknown as ProductImage[]) : [];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="container mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Link href="/admin/products">
              <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </Link>
          </Button>
          <span className="max-w-xs truncate font-heading font-bold uppercase">Edit: {product.name}</span>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-8">
        <ProductForm
          mode="edit"
          productId={product.id}
          defaultValues={{
            name: product.name,
            slug: product.slug,
            description: product.description,
            category: product.category,
            unit: product.unit,
            basePrice: product.basePriceKobo != null ? (product.basePriceKobo / 100).toString() : "",
            inStock: product.inStock,
            published: product.published,
            featured: product.featured,
            sortOrder: product.sortOrder,
            images,
            videoUrl: product.videoUrl,
            videoPublicId: product.videoPublicId,
            variants: product.variants.map((v) => ({
              id: v.id,
              label: v.label,
              price: (v.priceKobo / 100).toString(),
              inStock: v.inStock,
            })),
          }}
        />
      </main>
    </div>
  );
}
