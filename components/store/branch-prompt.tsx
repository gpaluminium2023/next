"use client";

import { useState, useSyncExternalStore, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

export interface BranchPromptOption {
  slug: string;
  shortName: string;
  addressLine: string;
  region: string;
}

interface BranchPromptProps {
  branches: BranchPromptOption[];
}

// Client-only gate. useSyncExternalStore returns the server snapshot (false)
// during SSR and the first hydration pass, then the client snapshot (true) —
// giving us "render after hydration" without a setState in an effect.
const neverChanges = () => () => {};
const onClient = () => true;
const onServer = () => false;

/**
 * Asks a first-time visitor which branch they're buying from, before they can
 * see prices.
 *
 * Deliberately has no dismiss, no default highlight and no "detected for you"
 * shortcut. Branch prices differ by 40-60% and each branch carries a different
 * range, so an order placed against the wrong branch is a real problem for the
 * customer and the dealer. With only a couple of branches the manual tap costs
 * a second; a wrong automatic guess costs a mispriced order.
 *
 * Mounted only after hydration so the server HTML stays a clean, crawlable
 * product page with no modal overlay in it.
 */
export function BranchPrompt({ branches }: BranchPromptProps) {
  const router = useRouter();
  const mounted = useSyncExternalStore(neverChanges, onClient, onServer);
  const [saving, setSaving] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  async function choose(slug: string) {
    setSaving(slug);
    try {
      const res = await fetch("/api/store/branch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      if (!res.ok) {
        toast.error("Could not save your branch. Please try again.");
        setSaving(null);
        return;
      }
      const data: { shortName: string } = await res.json();
      toast.success(`Showing ${data.shortName} branch prices`);
      startTransition(() => router.refresh());
    } catch {
      toast.error("Could not reach the server. Check your connection.");
      setSaving(null);
    }
  }

  if (!mounted || branches.length < 2) return null;

  const busy = saving !== null || pending;

  return (
    <AlertDialog open>
      <AlertDialogContent
        // No cancel path: a dismissed prompt would silently fall back to the
        // default branch, which is the outcome this exists to prevent.
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="font-heading uppercase">
            Where are you buying from?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Each branch holds its own stock at its own prices, and they don&rsquo;t carry the same
            range. Pick yours so you see the right prices and can only order what your branch
            actually has.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-2">
          {branches.map((branch) => (
            <button
              key={branch.slug}
              type="button"
              onClick={() => void choose(branch.slug)}
              disabled={busy}
              className={cn(
                "flex items-start gap-3 rounded-sm border border-border p-4 text-left transition-colors",
                "hover:border-accent hover:bg-muted focus-visible:border-accent focus-visible:outline-none",
                busy && "opacity-60",
              )}
            >
              {saving === branch.slug ? (
                <Loader2 className="mt-0.5 h-4 w-4 shrink-0 animate-spin text-accent" />
              ) : (
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              )}
              <span className="min-w-0">
                <span className="font-heading block text-sm font-bold uppercase tracking-wide">
                  {branch.shortName} branch
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {branch.addressLine ? `${branch.addressLine}, ` : ""}
                  {branch.region} State
                </span>
              </span>
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          You can change this at any time from the branch selector on the store.
        </p>
      </AlertDialogContent>
    </AlertDialog>
  );
}
