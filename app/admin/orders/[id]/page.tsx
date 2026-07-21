import Link from "next/link";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { format } from "date-fns";
import { ChevronLeft, Mail, MessageCircle, Phone } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { OrderStatusSelect } from "@/components/admin/order-status-select";
import { formatNaira } from "@/lib/store/format";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminOrderDetailPage({ params }: Props) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") redirect("/admin/login");

  const { id } = await params;
  const order = await prisma.order.findUnique({ where: { id }, include: { items: true } });
  if (!order) notFound();

  const whatsappNumber = order.customerPhone.replace(/[^0-9]/g, "");

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
            <Link href="/admin/orders">
              <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </Link>
          </Button>
          <span className="font-heading font-bold uppercase">Order {order.reference}</span>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold uppercase">{order.reference}</h1>
            <p className="text-sm text-muted-foreground">
              Placed {format(order.createdAt, "d MMM yyyy, HH:mm")}
            </p>
          </div>
          <OrderStatusSelect orderId={order.id} status={order.status} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-sm border border-border bg-card p-5">
            <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide">Customer</h2>
            <p className="mb-1 text-sm font-medium">{order.customerName}</p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" />
                <a href={`mailto:${order.customerEmail}`} className="hover:text-foreground hover:underline">
                  {order.customerEmail}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" />
                <a href={`tel:${order.customerPhone}`} className="hover:text-foreground hover:underline">
                  {order.customerPhone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="h-3.5 w-3.5" />
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground hover:underline"
                >
                  WhatsApp
                </a>
              </p>
            </div>
            <p className="mt-3 text-sm">
              <span className="font-semibold">Delivery address:</span> {order.deliveryAddress}
            </p>
            {order.note && (
              <p className="mt-2 text-sm">
                <span className="font-semibold">Note:</span> {order.note}
              </p>
            )}
          </div>

          <div className="rounded-sm border border-border bg-card p-5">
            <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide">Payment</h2>
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Status</dt>
                <dd className="font-medium">{order.status}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Paystack transaction ID</dt>
                <dd className="font-medium">{order.paystackId ?? "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Channel</dt>
                <dd className="font-medium">{order.channel ?? "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Paid at</dt>
                <dd className="font-medium">{order.paidAt ? format(order.paidAt, "d MMM yyyy, HH:mm") : "—"}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-6 rounded-sm border border-border bg-card p-5">
          <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide">Items</h2>
          <ul className="divide-y divide-border">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between py-2 text-sm">
                <span>
                  {item.nameSnapshot}
                  {item.variantSnapshot ? ` (${item.variantSnapshot})` : ""} × {item.quantity} {item.unit}
                </span>
                <span className="font-medium">{formatNaira(item.lineTotalKobo)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between border-t border-border pt-3">
            <span className="font-semibold">Total</span>
            <span className="font-heading text-lg font-bold">{formatNaira(order.subtotalKobo)}</span>
          </div>
        </div>
      </main>
    </div>
  );
}
