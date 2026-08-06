import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdminSignOut } from "@/components/admin/admin-sign-out";

export const dynamic = "force-dynamic";

export default async function AdminBranchesPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/admin/login");
  if (session.user.role !== "admin") redirect(session.user.role === "staff" ? "/admin/orders" : "/");

  const branches = await prisma.branch.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: {
      _count: { select: { variantPrices: true, productPrices: true, orders: true } },
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="container mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="font-heading text-lg font-bold uppercase tracking-wide">
              GPA Admin
            </Link>
            <span className="hidden text-sm text-primary-foreground/60 sm:block">Store · Branches</span>
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
            <h1 className="font-heading text-2xl font-bold uppercase">Branches</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Each branch has its own price list. The default branch is priced from the product
              catalogue.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/admin/products">Products</Link>
          </Button>
        </div>

        {branches.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
            <p className="mb-2">No branches yet.</p>
            <p className="text-sm">
              Run <code className="rounded bg-muted px-1.5 py-0.5">pnpm seed:branches</code> to
              create the Lagos and Enugu branches.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border overflow-hidden rounded-lg border border-border">
            {branches.map((branch) => {
              const priced = branch._count.variantPrices + branch._count.productPrices;
              return (
                <div key={branch.id} className="flex items-start gap-4 bg-card px-4 py-4">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium">{branch.name}</span>
                      {branch.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          Default
                        </Badge>
                      )}
                      <Badge variant={branch.published ? "default" : "outline"} className="h-4 text-xs">
                        {branch.published ? "Published" : "Hidden"}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span>
                        {branch.addressLine}, {branch.region} State
                      </span>
                      <span>
                        {branch.isDefault
                          ? "Priced from the product catalogue"
                          : `${priced} item${priced !== 1 ? "s" : ""} priced`}
                      </span>
                      <span>
                        {branch._count.orders} order{branch._count.orders !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    {branch.isDefault ? (
                      <Button asChild size="sm" variant="outline">
                        <Link href="/admin/products">Edit catalogue prices</Link>
                      </Button>
                    ) : (
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/branches/${branch.slug}`}>Edit prices</Link>
                      </Button>
                    )}
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
