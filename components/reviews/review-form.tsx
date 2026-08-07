"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REVIEW_BODY_MIN, REVIEW_BODY_MAX } from "@/lib/reviews/schema";
import { cn } from "@/lib/utils";

export interface ReviewFormProduct {
  name: string;
  slug: string;
}

interface ReviewFormProps {
  products: ReviewFormProduct[];
  /** Present when the reviewer arrived from an emailed invitation. */
  token?: string;
  /** Pre-selected product slug, from the invitation's order. */
  defaultProductSlug?: string;
  defaultName?: string;
  defaultEmail?: string;
}

const GENERAL = "__general__";

export function ReviewForm({
  products,
  token,
  defaultProductSlug,
  defaultName,
  defaultEmail,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [body, setBody] = useState("");
  const [productSlug, setProductSlug] = useState(defaultProductSlug ?? GENERAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = new FormData(event.currentTarget);
    setFieldErrors({});

    if (rating === 0) {
      setFieldErrors({ rating: ["Please choose a star rating"] });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorName: String(form.get("authorName") ?? ""),
          authorLocation: String(form.get("authorLocation") ?? ""),
          submitterEmail: String(form.get("submitterEmail") ?? ""),
          title: String(form.get("title") ?? ""),
          body,
          rating,
          productSlug: productSlug === GENERAL ? "" : productSlug,
          token: token ?? "",
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        toast.error(data.error ?? "Could not submit your review");
        return;
      }

      setSubmitted(true);
    } catch {
      toast.error("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-sm border border-accent/30 bg-accent/10 p-8 text-center">
        <h2 className="font-heading text-xl font-bold uppercase">Thank you</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Your review has been sent to our team. We read every one and publish them as
          written — we&rsquo;ll never edit your words. It should appear on the site within a
          couple of working days.
        </p>
      </div>
    );
  }

  const error = (field: string) => fieldErrors[field]?.[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Rating */}
      <div>
        <Label className="mb-2 block">Your rating</Label>
        <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5].map((star) => {
            const active = (hoverRating || rating) >= star;
            return (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                aria-label={`${star} ${star === 1 ? "star" : "stars"}`}
                aria-pressed={rating === star}
                className="rounded-sm p-0.5 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Star
                  className={cn(
                    "h-7 w-7 transition-colors",
                    active ? "fill-accent text-accent" : "text-muted-foreground/40",
                  )}
                />
              </button>
            );
          })}
          {rating > 0 && (
            <span className="ml-2 text-sm text-muted-foreground">{rating} / 5</span>
          )}
        </div>
        {error("rating") && <p className="mt-1 text-xs text-destructive">{error("rating")}</p>}
      </div>

      {/* Product */}
      <div>
        <Label htmlFor="product" className="mb-2 block">
          What did you buy?
        </Label>
        <Select value={productSlug} onValueChange={setProductSlug}>
          <SelectTrigger id="product" className="w-full">
            <SelectValue placeholder="Choose a product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={GENERAL}>General — my experience overall</SelectItem>
            {products.map((product) => (
              <SelectItem key={product.slug} value={product.slug}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Review body */}
      <div>
        <Label htmlFor="body" className="mb-2 block">
          Your review
        </Label>
        <Textarea
          id="body"
          name="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows={6}
          maxLength={REVIEW_BODY_MAX}
          placeholder="What did you buy, how did it arrive, and how has it held up? Anything that would have helped you before you ordered."
          aria-describedby="body-hint"
        />
        <div className="mt-1 flex items-center justify-between text-xs">
          <span id="body-hint" className="text-muted-foreground">
            {error("body") ?? `At least ${REVIEW_BODY_MIN} characters.`}
          </span>
          <span className="text-muted-foreground">
            {body.length} / {REVIEW_BODY_MAX}
          </span>
        </div>
      </div>

      {/* Title */}
      <div>
        <Label htmlFor="title" className="mb-2 block">
          Headline <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Input id="title" name="title" maxLength={120} placeholder="Sum it up in a few words" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="authorName" className="mb-2 block">
            Your name
          </Label>
          <Input
            id="authorName"
            name="authorName"
            required
            maxLength={80}
            defaultValue={defaultName}
            placeholder="How you'd like to be credited"
          />
          {error("authorName") && (
            <p className="mt-1 text-xs text-destructive">{error("authorName")}</p>
          )}
        </div>
        <div>
          <Label htmlFor="authorLocation" className="mb-2 block">
            Location <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="authorLocation"
            name="authorLocation"
            maxLength={80}
            placeholder="e.g. Ikeja, Lagos"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="submitterEmail" className="mb-2 block">
          Your email
        </Label>
        <Input
          id="submitterEmail"
          name="submitterEmail"
          type="email"
          required
          maxLength={160}
          defaultValue={defaultEmail}
          placeholder="you@example.com"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          {error("submitterEmail") ??
            "Only so we can check the review is genuine and reach you if we need to. It is never published."}
        </p>
      </div>

      <div className="rounded-sm border border-border bg-muted/40 p-4 text-xs leading-relaxed text-muted-foreground">
        Submitting means you&rsquo;re happy for your review to appear publicly on this site with
        the name and location you entered above. We publish reviews as written — we don&rsquo;t
        edit them and we don&rsquo;t filter out the critical ones. Email us any time to have
        yours removed.
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="w-full rounded-sm bg-accent font-heading font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90 sm:w-auto"
      >
        {submitting ? "Sending…" : "Submit review"}
      </Button>
    </form>
  );
}
