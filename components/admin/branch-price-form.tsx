"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatNaira } from "@/lib/store/format";

export interface BranchPriceRow {
  productId: string;
  productName: string;
  productSlug: string;
  unit: string;
  variantId: string | null;
  variantLabel: string | null;
  /** Price at the default branch, shown for comparison. */
  defaultPriceKobo: number | null;
  /** Current price at this branch; null = not carried here. */
  branchPriceKobo: number | null;
  branchInStock: boolean;
}

interface BranchPriceFormProps {
  branchSlug: string;
  branchShortName: string;
  defaultBranchShortName: string;
  rows: BranchPriceRow[];
}

function parseNairaToKobo(input: string): number | null {
  const cleaned = input.replace(/[₦,\s]/g, "");
  if (cleaned === "" || Number.isNaN(Number(cleaned))) return null;
  return Math.round(Number(cleaned) * 100);
}

function rowKey(row: BranchPriceRow) {
  return `${row.productId}:${row.variantId ?? "base"}`;
}

export function BranchPriceForm({
  branchSlug,
  branchShortName,
  defaultBranchShortName,
  rows,
}: BranchPriceFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [prices, setPrices] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      rows.map((r) => [rowKey(r), r.branchPriceKobo != null ? String(r.branchPriceKobo / 100) : ""]),
    ),
  );
  const [stock, setStock] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(rows.map((r) => [rowKey(r), r.branchInStock])),
  );

  const carriedCount = useMemo(
    () => Object.values(prices).filter((v) => parseNairaToKobo(v) != null).length,
    [prices],
  );

  const grouped = useMemo(() => {
    const map = new Map<string, BranchPriceRow[]>();
    for (const row of rows) {
      const list = map.get(row.productId) ?? [];
      list.push(row);
      map.set(row.productId, list);
    }
    return [...map.values()];
  }, [rows]);

  async function handleSave() {
    setError(null);
    setSaved(false);
    setSaving(true);

    const entries = rows.map((r) => {
      const key = rowKey(r);
      return {
        productId: r.productId,
        variantId: r.variantId,
        priceKobo: parseNairaToKobo(prices[key] ?? ""),
        inStock: stock[key] ?? true,
      };
    });

    try {
      const res = await fetch(`/api/store/branches/${branchSlug}/prices`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not save prices");
        return;
      }
      setSaved(true);
      startTransition(() => router.refresh());
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setSaving(false);
    }
  }

  const busy = saving || isPending;

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {saved && !error && (
        <Alert>
          <AlertDescription>Saved. {branchShortName} now carries {carriedCount} item{carriedCount !== 1 ? "s" : ""}.</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2 rounded-sm border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
        <p>
          Only long span and step tiles are priced per branch. Leave a product entirely blank and
          it sells at the standard {defaultBranchShortName} price everywhere — that&rsquo;s how
          Metcopo, stone-coated and accessories work.
        </p>
        <p>
          {branchShortName} sells the full catalogue either way — a blank just means it uses the
          standard price. Watch the {defaultBranchShortName} column as you fill these in: if this
          branch prices 0.55 above the standard 0.58 or 0.60, the thicker gauge ends up cheaper
          here. Price the whole ladder to avoid that.
        </p>
      </div>

      <div className="space-y-5">
        {grouped.map((productRows) => {
          const first = productRows[0];
          return (
            <div key={first.productId} className="overflow-hidden rounded-lg border border-border">
              <div className="border-b border-border bg-muted/40 px-4 py-2.5">
                <p className="text-sm font-medium">{first.productName}</p>
                <p className="text-xs text-muted-foreground">
                  /store/{first.productSlug} · per {first.unit}
                </p>
              </div>
              <div className="divide-y divide-border">
                {productRows.map((row) => {
                  const key = rowKey(row);
                  const value = prices[key] ?? "";
                  const carried = parseNairaToKobo(value) != null;
                  return (
                    <div
                      key={key}
                      className="flex flex-wrap items-center gap-3 bg-card px-4 py-3 sm:flex-nowrap"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm">{row.variantLabel ?? "Base price"}</p>
                        <p className="text-xs text-muted-foreground">
                          {defaultBranchShortName}:{" "}
                          {row.defaultPriceKobo ? formatNaira(row.defaultPriceKobo) : "—"}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-muted-foreground">₦</span>
                        <Input
                          value={value}
                          onChange={(e) =>
                            setPrices((p) => ({ ...p, [key]: e.target.value }))
                          }
                          placeholder="Not stocked"
                          inputMode="decimal"
                          aria-label={`${row.productName} ${row.variantLabel ?? "base"} price at ${branchShortName}`}
                          className="h-9 w-32"
                        />
                      </div>
                      <div className="flex w-28 shrink-0 items-center gap-2">
                        <Switch
                          checked={stock[key] ?? true}
                          disabled={!carried}
                          onCheckedChange={(v) => setStock((s) => ({ ...s, [key]: v }))}
                          aria-label={`In stock at ${branchShortName}`}
                        />
                        <span className="text-xs text-muted-foreground">
                          {!carried ? "—" : stock[key] ? "In stock" : "Out"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} disabled={busy}>
          {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save {branchShortName} prices
        </Button>
        <span className="text-sm text-muted-foreground">
          {carriedCount} item{carriedCount !== 1 ? "s" : ""} carried
        </span>
      </div>
    </div>
  );
}
