import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdminSignOut } from "@/components/admin/admin-sign-out";
import { AdminDeleteProduct } from "@/components/admin/admin-delete-product";
import { formatNaira } from "@/lib/store/format";

export const dynamic = "force-dynamic";

const CATEGORY_LABELS: Record<string, string> = {
  SHEETS: "Roofing Sheets",
  STONE_COATED: "Stone-Coated Tiles",
  ACCESSORIES: "Accessories",
};

export default async function AdminProductsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/admin/login");
  if (session.user.role !== "admin") redirect(session.user.role === "staff" ? "/admin/orders" : "/");

  const products = await prisma.product.findMany({
    include: { variants: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="container mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="font-heading text-lg font-bold uppercase tracking-wide">
              GPA Admin
            </Link>
            <span className="hidden text-sm text-primary-foreground/60 sm:block">Store · Products</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-primary-foreground/70 sm:block">{session.user.email}</span>
            <AdminSignOut />
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold uppercase">Products</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {products.length} product{products.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/admin/orders">Orders</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/branches">Branches</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/settings/bank-transfer">Settings</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/tiktok">TikTok</Link>
            </Button>
            <Button asChild>
              <Link href="/admin/products/new">New Product</Link>
            </Button>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
            <p className="mb-4">No products yet.</p>
            <Button asChild variant="outline">
              <Link href="/admin/products/new">Create your first product</Link>
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-border overflow-hidden rounded-lg border border-border">
            {products.map((product) => {
              const prices =
                product.variants.length > 0
                  ? product.variants.map((v) => v.priceKobo).filter((p) => p > 0)
                  : product.basePriceKobo
                    ? [product.basePriceKobo]
                    : [];
              const min = prices.length ? Math.min(...prices) : null;
              const max = prices.length ? Math.max(...prices) : null;
              const anyInStock =
                product.variants.length > 0 ? product.variants.some((v) => v.inStock) : product.inStock;

              return (
                <div
                  key={product.id}
                  className="flex items-start gap-4 bg-card px-4 py-4 transition-colors hover:bg-accent/30"
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="truncate text-sm font-medium">{product.name}</span>
                      {product.featured && (
                        <Badge variant="secondary" className="text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span>/store/{product.slug}</span>
                      <span>{CATEGORY_LABELS[product.category] ?? product.category}</span>
                      <span>
                        {min !== null
                          ? min === max
                            ? formatNaira(min)
                            : `${formatNaira(min)} – ${formatNaira(max!)}`
                          : "No price set"}
                        {" / "}
                        {product.unit}
                      </span>
                      <Badge variant={product.published ? "default" : "outline"} className="h-4 text-xs">
                        {product.published ? "Published" : "Draft"}
                      </Badge>
                      <Badge variant={anyInStock ? "outline" : "destructive"} className="h-4 text-xs">
                        {anyInStock ? "In stock" : "Out of stock"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/products/${product.id}`}>Edit</Link>
                    </Button>
                    {product.published && (
                      <Button asChild size="sm" variant="ghost">
                        <Link href={`/store/${product.slug}`} target="_blank">
                          View
                        </Link>
                      </Button>
                    )}
                    <AdminDeleteProduct id={product.id} name={product.name} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
