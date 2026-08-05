"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Banknote, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfirmBankTransferPaymentProps {
  orderId: string;
}

export function ConfirmBankTransferPayment({ orderId }: ConfirmBankTransferPaymentProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      const res = await fetch(`/api/store/orders/${orderId}/confirm-payment`, { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        toast.error(data?.error ?? "Could not confirm payment");
        return;
      }
      toast.success("Payment confirmed — receipt emailed to the customer");
      router.refresh();
    });
  }

  return (
    <Button onClick={handleConfirm} disabled={isPending} size="sm" className="gap-2 bg-accent hover:bg-accent/90">
      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Banknote className="h-4 w-4" />}
      Mark Payment Received
    </Button>
  );
}
