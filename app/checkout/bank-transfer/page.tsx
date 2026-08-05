import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Banknote, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { formatNaira } from "@/lib/store/format";
import { ClearCartOnMount } from "@/components/store/clear-cart-on-mount";

export const dynamic = "force-dynamic";

interface BankTransferPageProps {
  searchParams: Promise<{ ref?: string }>;
}

export default async function BankTransferInstructionsPage({ searchParams }: BankTransferPageProps) {
  const { ref } = await searchParams;
  if (!ref) notFound();

  const order = await prisma.order.findUnique({ where: { reference: ref } });
  if (!order || order.paymentMethod !== "BANK_TRANSFER") notFound();

  // Staff may have confirmed the transfer already by the time the customer
  // gets here — send them straight to the paid-success page instead.
  if (order.status === "PAID" || order.status === "FULFILLED") {
    redirect(`/checkout/success?ref=${ref}`);
  }

  const bankDetails = await prisma.bankTransferSettings.findUnique({ where: { id: "singleton" } });

  const whatsappText = encodeURIComponent(
    `Hello, I just placed order ${order.reference} and will be paying by bank transfer.`,
  );

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
      <ClearCartOnMount />
      <Banknote className="mx-auto mb-4 h-14 w-14 text-accent" />
      <h1 className="mb-2 font-heading text-3xl font-bold uppercase">Complete Your Payment</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Thank you, {order.customerName}. Transfer the amount below to confirm your order.
      </p>

      <div className="mb-6 rounded-sm border border-border bg-card p-6 text-left">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Order Reference — use as transfer description
        </p>
        <p className="mb-4 font-heading text-2xl font-bold">{order.reference}</p>

        <div className="space-y-2 border-t border-border pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bank</span>
            <span className="font-medium">{bankDetails?.bankName || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Account Number</span>
            <span className="font-medium">{bankDetails?.accountNumber || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Account Name</span>
            <span className="font-medium">{bankDetails?.accountName || "—"}</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between border-t border-border pt-3 text-sm">
          <span className="font-semibold">Amount to pay</span>
          <span className="font-heading text-lg font-bold">{formatNaira(order.subtotalKobo)}</span>
        </div>

        {bankDetails?.instructions && (
          <p className="mt-4 border-t border-border pt-3 text-sm text-muted-foreground">
            {bankDetails.instructions}
          </p>
        )}
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        We&rsquo;ll confirm your payment and email your receipt once we see it land — usually within
        a few hours. Delivery isn&rsquo;t included; our team will follow up on WhatsApp to quote it.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild className="gap-2 rounded-sm bg-accent font-heading font-bold uppercase tracking-wide hover:bg-accent/90">
          <a href={`https://wa.me/2349150459964?text=${whatsappText}`} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" />
            Notify Us on WhatsApp
          </a>
        </Button>
        <Button asChild variant="outline">
          <Link href="/store">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
