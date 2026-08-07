"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StarRating } from "@/components/reviews/star-rating";

export interface AdminReview {
  id: string;
  rating: number;
  title: string | null;
  body: string;
  authorName: string;
  authorLocation: string | null;
  submitterEmail: string | null;
  submitterPhone: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  source: "WEB_FORM" | "WHATSAPP_IMPORT" | "EMAIL_IMPORT";
  sourceNote: string | null;
  consentToPublish: boolean;
  verifiedPurchase: boolean;
  createdAt: string;
  productName: string | null;
  orderReference: string | null;
}

const SOURCE_LABEL: Record<AdminReview["source"], string> = {
  WEB_FORM: "Web form",
  WHATSAPP_IMPORT: "WhatsApp (transcribed)",
  EMAIL_IMPORT: "Email (transcribed)",
};

export function ReviewModeration({ reviews }: { reviews: AdminReview[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  async function moderate(id: string, status: AdminReview["status"]) {
    setBusyId(id);
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, moderationNote: notes[id] ?? "" }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        toast.error(data.error ?? "Could not update the review");
        return;
      }

      toast.success(
        status === "APPROVED"
          ? "Review published"
          : status === "REJECTED"
            ? "Review rejected"
            : "Review moved back to pending",
      );
      startTransition(() => router.refresh());
    } catch {
      toast.error("Could not reach the server");
    } finally {
      setBusyId(null);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this review permanently? Use this for spam, or when a customer asks to be removed.")) {
      return;
    }
    setBusyId(id);
    try {
      const response = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      if (!response.ok) {
        toast.error("Could not delete the review");
        return;
      }
      toast.success("Review deleted");
      startTransition(() => router.refresh());
    } catch {
      toast.error("Could not reach the server");
    } finally {
      setBusyId(null);
    }
  }

  if (reviews.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
        <p className="mb-2">No reviews yet.</p>
        <p className="text-sm">
          Reviews arrive from the public form at <code className="rounded bg-muted px-1.5 py-0.5">/reviews/submit</code>,
          from review-request emails sent off paid orders, or from{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">pnpm import:reviews</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        const busy = busyId === review.id || pending;

        return (
          <div key={review.id} className="rounded-lg border border-border bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <StarRating value={review.rating} />
                  <span className="text-sm font-medium">{review.authorName}</span>
                  {review.authorLocation && (
                    <span className="text-sm text-muted-foreground">· {review.authorLocation}</span>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {SOURCE_LABEL[review.source]}
                  {review.productName ? ` · ${review.productName}` : " · general"}
                  {review.orderReference ? ` · order ${review.orderReference}` : ""}
                  {" · "}
                  {new Date(review.createdAt).toLocaleDateString("en-NG", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2">
                {review.verifiedPurchase && <Badge variant="outline">Verified purchase</Badge>}
                {!review.consentToPublish && (
                  <Badge variant="destructive">No consent recorded</Badge>
                )}
                <Badge
                  variant={
                    review.status === "APPROVED"
                      ? "default"
                      : review.status === "REJECTED"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {review.status}
                </Badge>
              </div>
            </div>

            {review.title && <p className="mt-3 text-sm font-semibold">{review.title}</p>}
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {review.body}
            </p>

            <p className="mt-3 text-xs text-muted-foreground">
              {review.submitterEmail && <>Contact: {review.submitterEmail} </>}
              {review.submitterPhone && <>· {review.submitterPhone}</>}
            </p>
            {review.sourceNote && (
              <p className="mt-1 text-xs italic text-muted-foreground">
                Provenance: {review.sourceNote}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {review.status !== "APPROVED" && (
                <Button size="sm" disabled={busy} onClick={() => moderate(review.id, "APPROVED")}>
                  Approve &amp; publish
                </Button>
              )}
              {review.status !== "REJECTED" && (
                <Button
                  size="sm"
                  variant="outline"
                  disabled={busy}
                  onClick={() => moderate(review.id, "REJECTED")}
                >
                  Reject
                </Button>
              )}
              {review.status !== "PENDING" && (
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={busy}
                  onClick={() => moderate(review.id, "PENDING")}
                >
                  Back to pending
                </Button>
              )}
              <Input
                placeholder="Internal note (optional)"
                className="h-9 max-w-xs"
                value={notes[review.id] ?? ""}
                onChange={(event) =>
                  setNotes((current) => ({ ...current, [review.id]: event.target.value }))
                }
              />
              <Button
                size="sm"
                variant="ghost"
                className="ml-auto text-destructive hover:text-destructive"
                disabled={busy}
                onClick={() => remove(review.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
