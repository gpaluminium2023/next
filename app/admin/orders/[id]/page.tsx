import Link from "next/link";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { format } from "date-fns";
import { ChevronLeft, Download, Mail, MessageCircle, Phone } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OrderStatusSelect } from "@/components/admin/order-status-select";
import { formatNaira } from "@/lib/store/format";
import type { CalculatorDetailsSnapshot } from "@/lib/roof-calculator/calculator-details";

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
  const calc = order.source === "ROOF_CALCULATOR" ? (order.calculatorDetails as CalculatorDetailsSnapshot | null) : null;
  const canDownloadReceipt = order.source === "ROOF_CALCULATOR" || order.status === "PAID" || order.status === "FULFILLED";

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
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-heading text-2xl font-bold uppercase">{order.reference}</h1>
              {order.source === "ROOF_CALCULATOR" && <Badge variant="secondary">Calculator</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">
              Placed {format(order.createdAt, "d MMM yyyy, HH:mm")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {canDownloadReceipt && (
              <Button asChild variant="outline" size="sm" className="gap-2">
                <a href={`/api/orders/${order.reference}/receipt`}>
                  <Download className="h-4 w-4" />
                  {order.source === "ROOF_CALCULATOR" ? "Estimate PDF" : "Receipt PDF"}
                </a>
              </Button>
            )}
            <OrderStatusSelect orderId={order.id} status={order.status} />
          </div>
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

        {calc && (
          <div className="mt-6 rounded-sm border border-border bg-card p-5">
            <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide">Calculator Breakdown</h2>
            <dl className="grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Roof shape</dt>
                <dd className="font-medium capitalize">{calc.shape}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Pitch</dt>
                <dd className="font-medium">{calc.pitchDeg}°</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Roof area (with waste)</dt>
                <dd className="font-medium">{calc.roofAreaWithWaste} m²</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Sheets needed</dt>
                <dd className="font-medium">{calc.sheetsCount}</dd>
              </div>
              {calc.totalLinearMeters != null && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Total linear metres</dt>
                  <dd className="font-medium">{calc.totalLinearMeters} m</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Approx. fasteners</dt>
                <dd className="font-medium">{calc.fasteners}</dd>
              </div>
            </dl>
            {calc.accessories.some((a) => a.length > 0) && (
              <>
                <h3 className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Trim &amp; accessories
                </h3>
                <ul className="grid gap-1 text-sm sm:grid-cols-2">
                  {calc.accessories
                    .filter((a) => a.length > 0)
                    .map((a) => (
                      <li key={a.label} className="flex justify-between">
                        <span className="text-muted-foreground">{a.label}</span>
                        <span className="font-medium">
                          {a.length} m &rarr; {a.pieces} pc
                        </span>
                      </li>
                    ))}
                </ul>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
