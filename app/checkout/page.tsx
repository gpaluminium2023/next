"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/lib/cart/cart-context";
import { formatNaira } from "@/lib/store/format";
import { cartItemKey } from "@/lib/store/types";

type PaymentMethod = "PAYSTACK" | "BANK_TRANSFER";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalKobo, hydrated } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("PAYSTACK");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/store/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.productId, variantId: i.variantId, quantity: i.quantity })),
          customer: { name, email, phone, address, note: note || undefined },
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        router.push(`/checkout/bank-transfer?ref=${data.reference}`);
      }
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  if (!hydrated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-24 text-center">
        <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        <h1 className="font-heading text-2xl font-bold uppercase">Your cart is empty</h1>
        <Button asChild className="rounded-sm bg-accent hover:bg-accent/90">
          <Link href="/store">Browse the store</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-2 font-heading text-3xl font-bold uppercase">Checkout</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        You are paying for materials only. Delivery varies by location and weight, so it isn&rsquo;t
        charged here — our team will contact you via WhatsApp or phone shortly after payment to
        quote delivery and arrange a time, at no obligation.
      </p>

      <div className="grid gap-8 lg:grid-cols-5">
        <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-3">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
              <p className="text-xs text-muted-foreground">
                We&rsquo;ll send your payment receipt here.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0915 045 9964"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="address">Delivery Address *</Label>
            <Textarea
              id="address"
              required
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street, area, city, state"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="note">Order Note (optional)</Label>
            <Textarea
              id="note"
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Anything else we should know about your order"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Payment Method</Label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
              className="gap-2"
            >
              <label
                htmlFor="payment-paystack"
                className="flex cursor-pointer items-start gap-3 rounded-sm border border-border p-3 text-sm has-[[data-state=checked]]:border-accent"
              >
                <RadioGroupItem value="PAYSTACK" id="payment-paystack" className="mt-0.5" />
                <span>
                  <span className="block font-medium">Pay with Paystack</span>
                  <span className="block text-xs text-muted-foreground">
                    Card, bank, transfer, or USSD — confirmed instantly.
                  </span>
                </span>
              </label>
              <label
                htmlFor="payment-bank-transfer"
                className="flex cursor-pointer items-start gap-3 rounded-sm border border-border p-3 text-sm has-[[data-state=checked]]:border-accent"
              >
                <RadioGroupItem value="BANK_TRANSFER" id="payment-bank-transfer" className="mt-0.5" />
                <span>
                  <span className="block font-medium">Pay by Bank Transfer</span>
                  <span className="block text-xs text-muted-foreground">
                    We&rsquo;ll show you our account details on the next screen. Confirmed manually
                    once we receive it — usually within a few hours.
                  </span>
                </span>
              </label>
            </RadioGroup>
          </div>

          <Button
            type="submit"
            disabled={submitting || items.length === 0}
            className="w-full rounded-sm bg-accent font-heading font-bold uppercase tracking-wide hover:bg-accent/90"
            size="lg"
          >
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {paymentMethod === "PAYSTACK"
              ? `Pay ${formatNaira(subtotalKobo)} with Paystack`
              : `Place Order — Pay ${formatNaira(subtotalKobo)} by Bank Transfer`}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            {paymentMethod === "PAYSTACK"
              ? "Payments are processed securely by Paystack — we never see or store your card details."
              : "You'll get our account details and order reference on the next screen."}
          </p>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => router.push("/store")}
          >
            Continue shopping
          </Button>
        </form>

        <div className="lg:col-span-2">
          <div className="rounded-sm border border-border bg-card p-5">
            <h2 className="mb-4 font-heading text-sm font-bold uppercase tracking-wide">Order Summary</h2>
            <ul className="mb-4 space-y-3">
              {items.map((item) => (
                <li key={cartItemKey(item)} className="flex justify-between text-sm">
                  <span className="pr-2">
                    {item.name}
                    {item.variantLabel ? ` (${item.variantLabel})` : ""} × {item.quantity}
                  </span>
                  <span className="shrink-0 font-medium">{formatNaira(item.unitPriceKobo * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between border-t border-border pt-3 text-sm">
              <span className="font-semibold">Subtotal</span>
              <span className="font-heading text-lg font-bold">{formatNaira(subtotalKobo)}</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Delivery fee is not included and will be quoted separately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
