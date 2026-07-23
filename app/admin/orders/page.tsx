import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdminSignOut } from "@/components/admin/admin-sign-out";
import { formatNaira } from "@/lib/store/format";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@/lib/generated/prisma/enums";

export const dynamic = "force-dynamic";

const STATUS_FILTERS = ["ALL", "PENDING", "PAID", "FULFILLED", "CANCELLED"] as const;
const VALID_ORDER_STATUSES = Object.values(OrderStatus) as string[];

const STATUS_VARIANT: Record<string, "default" | "outline" | "destructive" | "secondary"> = {
  PENDING: "outline",
  PAID: "default",
  FULFILLED: "secondary",
  CANCELLED: "destructive",
};

interface AdminOrdersPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminOrdersPage({ searchParams }: AdminOrdersPageProps) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/admin/login");
  if (session.user.role !== "admin") redirect("/");

  const { status } = await searchParams;
  const validStatus =
    status && VALID_ORDER_STATUSES.includes(status) ? (status as OrderStatus) : undefined;

  const orders = await prisma.order.findMany({
    where: validStatus ? { status: validStatus } : {},
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="container mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="font-heading text-lg font-bold uppercase tracking-wide">
              GPA Admin
            </Link>
            <span className="hidden text-sm text-primary-foreground/60 sm:block">Store · Orders</span>
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
            <h1 className="font-heading text-2xl font-bold uppercase">Orders</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {orders.length} order{orders.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/admin/products">Products</Link>
          </Button>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {STATUS_FILTERS.map((s) => {
            const href = s === "ALL" ? "/admin/orders" : `/admin/orders?status=${s}`;
            const isActive = (s === "ALL" && !validStatus) || s === validStatus;
            return (
              <Link
                key={s}
                href={href}
                className={cn(
                  "rounded-sm border px-3 py-1.5 text-xs font-heading font-bold uppercase tracking-wide",
                  isActive ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-accent/50",
                )}
              >
                {s}
              </Link>
            );
          })}
        </div>

        {orders.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
            No orders yet.
          </div>
        ) : (
          <div className="divide-y divide-border overflow-hidden rounded-lg border border-border">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/admin/orders/${order.id}`}
                className="flex items-start gap-4 bg-card px-4 py-4 transition-colors hover:bg-accent/30"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="font-heading text-sm font-bold">{order.reference}</span>
                    <Badge variant={STATUS_VARIANT[order.status] ?? "outline"} className="h-4 text-xs">
                      {order.status}
                    </Badge>
                    {order.source === "ROOF_CALCULATOR" && (
                      <Badge variant="secondary" className="h-4 text-xs">
                        Calculator
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span>{order.customerName}</span>
                    <span>{order.customerPhone}</span>
                    <span>{order.items.length} item{order.items.length !== 1 ? "s" : ""}</span>
                    <span>{format(order.createdAt, "d MMM yyyy, HH:mm")}</span>
                  </div>
                </div>
                <div className="shrink-0 font-heading text-lg font-bold">{formatNaira(order.subtotalKobo)}</div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
