import Link from "next/link";
import { redirect } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { verifyTransaction, PaystackError } from "@/lib/paystack";
import { markOrderPaid } from "@/lib/store/orders";

export const dynamic = "force-dynamic";

interface CallbackPageProps {
  searchParams: Promise<{ reference?: string; trxref?: string }>;
}

export default async function CheckoutCallbackPage({ searchParams }: CallbackPageProps) {
  const { reference, trxref } = await searchParams;
  const ref = reference ?? trxref;

  if (!ref) {
    return <FailureState message="No payment reference was provided." />;
  }

  const order = await prisma.order.findUnique({ where: { reference: ref } });
  if (!order) {
    return <FailureState message="We couldn't find an order matching this payment reference." />;
  }

  if (order.status === "PAID" || order.status === "FULFILLED") {
    redirect(`/checkout/success?ref=${ref}`);
  }

  // Resolve to a plain failure message first — JSX is only constructed after
  // the try/catch settles, since React doesn't render JSX synchronously and
  // a try/catch around it can't actually catch rendering errors.
  let failureMessage =
    "Your payment could not be confirmed. If you were charged, please contact us on WhatsApp with your reference.";
  try {
    const result = await verifyTransaction(ref);

    if (result.status === "success" && result.amount === order.subtotalKobo && result.currency === "NGN") {
      await markOrderPaid({
        reference: ref,
        paystackId: String(result.id),
        channel: result.channel,
        paidAt: result.paid_at ? new Date(result.paid_at) : new Date(),
      });
      redirect(`/checkout/success?ref=${ref}`);
    }
  } catch (err) {
    if (err instanceof PaystackError) {
      failureMessage =
        "We couldn't verify your payment right now. If you were charged, please contact us on WhatsApp with your reference.";
    } else {
      throw err;
    }
  }

  return <FailureState message={failureMessage} reference={ref} />;
}

function FailureState({ message, reference }: { message: string; reference?: string }) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-24 text-center">
      <AlertTriangle className="h-10 w-10 text-destructive" />
      <h1 className="font-heading text-2xl font-bold uppercase">Payment Not Confirmed</h1>
      <p className="text-sm text-muted-foreground">{message}</p>
      {reference && <p className="text-xs text-muted-foreground">Reference: {reference}</p>}
      <div className="flex gap-3">
        <Button asChild variant="outline">
          <Link href="/checkout">Try again</Link>
        </Button>
        <Button asChild className="bg-accent hover:bg-accent/90">
          <a href="https://wa.me/2349150459964" target="_blank" rel="noopener noreferrer">
            Contact us on WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}
