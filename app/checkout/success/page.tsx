import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Download, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { formatNaira } from "@/lib/store/format";
import { ClearCartOnMount } from "@/components/store/clear-cart-on-mount";

export const dynamic = "force-dynamic";

interface SuccessPageProps {
  searchParams: Promise<{ ref?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const { ref } = await searchParams;
  if (!ref) notFound();

  const order = await prisma.order.findUnique({
    where: { reference: ref },
    include: { items: true },
  });

  if (!order || (order.status !== "PAID" && order.status !== "FULFILLED")) {
    notFound();
  }

  const whatsappText = encodeURIComponent(
    `Hello, I just paid for order ${order.reference} on the website. Please let me know the delivery quote for ${order.deliveryAddress}.`,
  );

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
      <ClearCartOnMount />
      <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-accent" />
      <h1 className="mb-2 font-heading text-3xl font-bold uppercase">Payment Successful</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Thank you, {order.customerName}. Your order has been received.
      </p>

      <div className="mb-6 rounded-sm border border-border bg-card p-6 text-left">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Order Reference — save this
        </p>
        <p className="mb-4 font-heading text-2xl font-bold">{order.reference}</p>
        <ul className="mb-4 space-y-2 border-t border-border pt-4 text-sm">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>
                {item.nameSnapshot}
                {item.variantSnapshot ? ` (${item.variantSnapshot})` : ""} × {item.quantity}
              </span>
              <span className="font-medium">{formatNaira(item.lineTotalKobo)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between border-t border-border pt-3 text-sm">
          <span className="font-semibold">Total Paid</span>
          <span className="font-heading text-lg font-bold">{formatNaira(order.subtotalKobo)}</span>
        </div>
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        Delivery was not included in this payment. Message us on WhatsApp with your reference so
        we can quote and arrange delivery to your address.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild className="gap-2 rounded-sm bg-accent font-heading font-bold uppercase tracking-wide hover:bg-accent/90">
          <a href={`https://wa.me/2349150459964?text=${whatsappText}`} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" />
            Confirm Delivery on WhatsApp
          </a>
        </Button>
        <Button asChild variant="outline" className="gap-2">
          <a href={`/api/orders/${order.reference}/receipt`}>
            <Download className="h-4 w-4" />
            Download Receipt (PDF)
          </a>
        </Button>
        <Button asChild variant="outline">
          <Link href="/store">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
