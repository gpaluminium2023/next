"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCart } from "@/lib/cart/cart-context";

export interface BranchOption {
  slug: string;
  shortName: string;
  region: string;
}

interface BranchSelectorProps {
  branches: BranchOption[];
  activeSlug: string;
  className?: string;
}

/**
 * Switches the branch a visitor is shopping. Prices differ substantially
 * between branches, so a switch with items already in the cart empties it
 * rather than silently repricing — the new branch may not even stock the same
 * gauges. Checkout re-derives every price from the branch cookie regardless,
 * so a stale cart can never be *charged*, only displayed.
 */
export function BranchSelector({ branches, activeSlug, className }: BranchSelectorProps) {
  const router = useRouter();
  const { count, clear } = useCart();
  const [pending, startTransition] = useTransition();
  const [saving, setSaving] = useState(false);
  const [confirming, setConfirming] = useState<string | null>(null);

  async function applyBranch(slug: string) {
    setSaving(true);
    try {
      const res = await fetch("/api/store/branch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      if (!res.ok) {
        toast.error("Could not switch branch. Please try again.");
        return;
      }
      const data: { shortName: string } = await res.json();
      clear();
      toast.success(`Now showing ${data.shortName} branch prices`);
      startTransition(() => router.refresh());
    } catch {
      toast.error("Could not reach the server. Check your connection.");
    } finally {
      setSaving(false);
      setConfirming(null);
    }
  }

  function handleChange(slug: string) {
    if (slug === activeSlug) return;
    if (count > 0) {
      setConfirming(slug);
      return;
    }
    void applyBranch(slug);
  }

  const busy = saving || pending;
  const pendingBranch = branches.find((b) => b.slug === confirming);

  return (
    <>
      <div className={className}>
        <Select value={activeSlug} onValueChange={handleChange} disabled={busy}>
          <SelectTrigger className="w-full gap-2 sm:w-56" aria-label="Choose branch">
            {busy ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
            ) : (
              <MapPin className="h-4 w-4 shrink-0 text-accent" />
            )}
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {branches.map((b) => (
              <SelectItem key={b.slug} value={b.slug}>
                {b.shortName} branch
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <AlertDialog open={confirming !== null} onOpenChange={(open) => !open && setConfirming(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Switch to the {pendingBranch?.shortName} branch?</AlertDialogTitle>
            <AlertDialogDescription>
              Each branch has its own price list and stocks a different range, so your cart will be
              emptied. You&rsquo;ll need to add your items again at {pendingBranch?.shortName} prices.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={saving}>Keep shopping</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => confirming && void applyBranch(confirming)}
              disabled={saving}
            >
              Switch and empty cart
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
