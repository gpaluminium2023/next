import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminSignOut } from "@/components/admin/admin-sign-out";
import { BranchPriceForm, type BranchPriceRow } from "@/components/admin/branch-price-form";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AdminBranchPricesPage({ params }: PageProps) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/admin/login");
  if (session.user.role !== "admin") redirect(session.user.role === "staff" ? "/admin/orders" : "/");

  const { slug } = await params;
  const branch = await prisma.branch.findUnique({ where: { slug } });
  if (!branch) notFound();
  // The default branch has no override rows — its prices live on the products.
  if (branch.isDefault) redirect("/admin/products");

  const [defaultBranch, products, variantPrices, productPrices] = await Promise.all([
    prisma.branch.findFirst({ where: { isDefault: true }, select: { shortName: true } }),
    prisma.product.findMany({
      include: { variants: { orderBy: { sortOrder: "asc" } } },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.branchVariantPrice.findMany({ where: { branchId: branch.id } }),
    prisma.branchProductPrice.findMany({ where: { branchId: branch.id } }),
  ]);

  const byVariant = new Map(variantPrices.map((p) => [p.variantId, p]));
  const byProduct = new Map(productPrices.map((p) => [p.productId, p]));

  const rows = products.flatMap<BranchPriceRow>((product) => {
    if (product.variants.length > 0) {
      return product.variants.map<BranchPriceRow>((v) => {
        const override = byVariant.get(v.id);
        return {
          productId: product.id,
          productName: product.name,
          productSlug: product.slug,
          unit: product.unit,
          variantId: v.id,
          variantLabel: v.label,
          defaultPriceKobo: v.priceKobo || null,
          branchPriceKobo: override?.priceKobo ?? null,
          branchInStock: override?.inStock ?? true,
        };
      });
    }
    const override = byProduct.get(product.id);
    return [
      {
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        unit: product.unit,
        variantId: null,
        variantLabel: null,
        defaultPriceKobo: product.basePriceKobo,
        branchPriceKobo: override?.priceKobo ?? null,
        branchInStock: override?.inStock ?? true,
      },
    ];
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="container mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="font-heading text-lg font-bold uppercase tracking-wide">
              GPA Admin
            </Link>
            <span className="hidden text-sm text-primary-foreground/60 sm:block">
              Store · {branch.shortName} prices
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-primary-foreground/70 sm:block">{session.user.email}</span>
            <AdminSignOut />
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Link
          href="/admin/branches"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> All branches
        </Link>

        <div className="mb-6">
          <h1 className="font-heading text-2xl font-bold uppercase">{branch.name} prices</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {branch.addressLine}, {branch.region} State
          </p>
        </div>

        <BranchPriceForm
          branchSlug={branch.slug}
          branchShortName={branch.shortName}
          defaultBranchShortName={defaultBranch?.shortName ?? "Default"}
          rows={rows}
        />
      </main>
    </div>
  );
}
