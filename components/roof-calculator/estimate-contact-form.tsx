"use client";

import { useState } from "react";
import { CheckCircle2, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { CalculatorState } from "@/lib/roof-calculator/calculations";

export function EstimateContactForm({ state }: { state: CalculatorState }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  if (!state.shape || !state.productId || !state.variantId) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/roof-calculator/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: { name, email, phone, address: address || undefined, note: note || undefined },
          calculator: {
            shape: state.shape,
            dims: state.dims,
            pitchDeg: state.pitchDeg,
            sheetLayout: state.sheetLayout,
            sheetWidth: state.sheetWidth,
            sheetLength: state.sheetLength,
            overlap: state.overlap,
            wastePct: state.wastePct,
            productId: state.productId,
            variantId: state.variantId,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      setReference(data.reference as string);
      setSubmitting(false);
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  if (reference) {
    return (
      <div className="rounded-sm border border-accent/30 bg-accent/5 p-4">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <CheckCircle2 className="h-4 w-4 text-accent" />
          Sent! We&rsquo;ve emailed a copy to {email} and our team will follow up.
        </p>
        <p className="mb-3 text-xs text-muted-foreground">Reference: {reference}</p>
        <Button asChild variant="outline" className="gap-2 rounded-sm">
          <a href={`/api/orders/${reference}/receipt`}>
            <Download className="h-4 w-4" />
            Download Estimate (PDF)
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-border bg-background p-4">
      <p className="mb-3 text-sm text-muted-foreground">
        Want this estimate emailed to you (with a downloadable PDF) and a note sent to our team? Fill in your
        details below.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="est-name">Full Name *</Label>
            <Input id="est-name" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="est-phone">Phone Number *</Label>
            <Input
              id="est-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0915 045 9964"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="est-email">Email Address *</Label>
          <Input
            id="est-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="est-address">Delivery Address (optional)</Label>
          <Textarea
            id="est-address"
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street, area, city, state"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="est-note">Note (optional)</Label>
          <Textarea
            id="est-note"
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Anything else we should know"
          />
        </div>
        <Button
          type="submit"
          disabled={submitting}
          className="w-full gap-2 rounded-sm bg-accent font-heading font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90 sm:w-auto"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Email My Estimate
        </Button>
      </form>
    </div>
  );
}
