"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductGalleryUpload } from "@/components/admin/product-gallery-upload";
import { ProductVideoUpload } from "@/components/admin/product-video-upload";
import { Loader2, Plus, Trash2 } from "lucide-react";
import type { ProductImage } from "@/lib/store/types";

interface VariantRow {
  id?: string;
  label: string;
  price: string; // ₦ display value while editing
  inStock: boolean;
}

interface ProductFormProps {
  mode: "create" | "edit";
  productId?: string;
  defaultValues?: {
    name: string;
    slug: string;
    description: string;
    category: "SHEETS" | "STONE_COATED" | "ACCESSORIES";
    unit: string;
    basePrice: string; // ₦ display value, "" if null
    inStock: boolean;
    published: boolean;
    featured: boolean;
    sortOrder: number;
    images: ProductImage[];
    videoUrl: string | null;
    videoPublicId: string | null;
    variants: VariantRow[];
  };
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseNairaToKobo(input: string): number | null {
  const cleaned = input.replace(/[₦,\s]/g, "");
  if (cleaned === "" || Number.isNaN(Number(cleaned))) return null;
  return Math.round(Number(cleaned) * 100);
}

export function ProductForm({ mode, productId, defaultValues }: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(defaultValues?.name ?? "");
  const [slug, setSlug] = useState(defaultValues?.slug ?? "");
  const [description, setDescription] = useState(defaultValues?.description ?? "");
  const [category, setCategory] = useState<"SHEETS" | "STONE_COATED" | "ACCESSORIES">(
    defaultValues?.category ?? "SHEETS",
  );
  const [unit, setUnit] = useState(defaultValues?.unit ?? "sqm");
  const [basePrice, setBasePrice] = useState(defaultValues?.basePrice ?? "");
  const [inStock, setInStock] = useState(defaultValues?.inStock ?? true);
  const [published, setPublished] = useState(defaultValues?.published ?? false);
  const [featured, setFeatured] = useState(defaultValues?.featured ?? false);
  const [sortOrder, setSortOrder] = useState(defaultValues?.sortOrder ?? 0);
  const [images, setImages] = useState<ProductImage[]>(defaultValues?.images ?? []);
  const [videoUrl, setVideoUrl] = useState<string | null>(defaultValues?.videoUrl ?? null);
  const [videoPublicId, setVideoPublicId] = useState<string | null>(defaultValues?.videoPublicId ?? null);
  const [variants, setVariants] = useState<VariantRow[]>(defaultValues?.variants ?? []);

  function handleNameChange(v: string) {
    setName(v);
    if (mode === "create") setSlug(slugify(v));
  }

  function addVariant() {
    setVariants((prev) => [...prev, { label: "", price: "", inStock: true }]);
  }

  function updateVariant(index: number, patch: Partial<VariantRow>) {
    setVariants((prev) => prev.map((v, i) => (i === index ? { ...v, ...patch } : v)));
  }

  function removeVariant(index: number) {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (variants.length === 0 && parseNairaToKobo(basePrice) === null) {
      setError("Set a base price, or add at least one variant with a price.");
      return;
    }
    for (const v of variants) {
      if (!v.label.trim()) {
        setError("Every variant needs a label (e.g. 0.45MM, Shingle Tiles).");
        return;
      }
      if (parseNairaToKobo(v.price) === null) {
        setError(`Variant "${v.label}" needs a valid price.`);
        return;
      }
    }

    const payload = {
      name,
      slug,
      description,
      category,
      unit,
      basePriceKobo: variants.length === 0 ? parseNairaToKobo(basePrice) : null,
      inStock,
      published,
      featured,
      sortOrder,
      images,
      videoUrl,
      videoPublicId,
      variants: variants.map((v, i) => ({
        ...(v.id && { id: v.id }),
        label: v.label,
        priceKobo: parseNairaToKobo(v.price),
        inStock: v.inStock,
        sortOrder: i,
      })),
    };

    startTransition(async () => {
      const res = await fetch(
        mode === "create" ? "/api/store/products" : `/api/store/products/${productId}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong");
        return;
      }

      router.push("/admin/products");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Gallery */}
      <div className="space-y-1.5">
        <Label>Product Images</Label>
        <ProductGalleryUpload images={images} onChange={setImages} />
      </div>

      {/* Video */}
      <div className="space-y-1.5">
        <Label>Sample Video (optional)</Label>
        <ProductVideoUpload
          value={videoUrl}
          publicId={videoPublicId}
          onChange={(url, pid) => {
            setVideoUrl(url);
            setVideoPublicId(pid);
          }}
          onRemove={() => {
            setVideoUrl(null);
            setVideoPublicId(null);
          }}
        />
      </div>

      <Separator />

      {/* Name */}
      <div className="space-y-1.5">
        <Label htmlFor="name">Product Name *</Label>
        <Input
          id="name"
          required
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="Aluminium Long Span Roofing Sheet"
        />
      </div>

      {/* Slug */}
      <div className="space-y-1.5">
        <Label htmlFor="slug">Slug *</Label>
        <Input id="slug" required value={slug} onChange={(e) => setSlug(e.target.value)} />
        <p className="text-xs text-muted-foreground">/store/{slug || "your-slug-here"}</p>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Durable, lightweight sheets available in all standard colours…"
        />
      </div>

      {/* Category + Unit */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Category *</Label>
          <Select value={category} onValueChange={(v) => setCategory(v as typeof category)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SHEETS">Roofing Sheets</SelectItem>
              <SelectItem value="STONE_COATED">Stone-Coated Tiles</SelectItem>
              <SelectItem value="ACCESSORIES">Accessories</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Unit *</Label>
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sqm">Per sqm</SelectItem>
              <SelectItem value="piece">Per piece</SelectItem>
              <SelectItem value="pack">Per pack</SelectItem>
              <SelectItem value="bundle">Per bundle</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Variants */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Variants (e.g. gauges, profiles)</Label>
          <Button type="button" variant="outline" size="sm" onClick={addVariant}>
            <Plus className="mr-1 h-4 w-4" /> Add variant
          </Button>
        </div>

        {variants.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            No variants — this product sells at a single base price below.
          </p>
        ) : (
          <div className="space-y-2">
            {variants.map((v, i) => (
              <div key={i} className="flex items-center gap-2 rounded-md border border-border p-2">
                <Input
                  value={v.label}
                  onChange={(e) => updateVariant(i, { label: e.target.value })}
                  placeholder="Label (0.45MM, Shingle Tiles…)"
                  className="flex-1"
                />
                <Input
                  value={v.price}
                  onChange={(e) => updateVariant(i, { price: e.target.value })}
                  placeholder="Price ₦"
                  className="w-32"
                  inputMode="decimal"
                />
                <div className="flex items-center gap-1.5 shrink-0">
                  <Switch
                    checked={v.inStock}
                    onCheckedChange={(checked) => updateVariant(i, { inStock: checked })}
                  />
                  <span className="text-xs text-muted-foreground whitespace-nowrap">In stock</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-destructive hover:text-destructive"
                  onClick={() => removeVariant(i)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove variant</span>
                </Button>
              </div>
            ))}
          </div>
        )}

        {variants.length === 0 && (
          <div className="space-y-1.5 pt-1">
            <Label htmlFor="basePrice">Base Price (₦)</Label>
            <Input
              id="basePrice"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              placeholder="4,300"
              inputMode="decimal"
            />
          </div>
        )}
      </div>

      <Separator />

      {/* Meta */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="sortOrder">Sort Order</Label>
          <Input
            id="sortOrder"
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-8">
        {variants.length === 0 && (
          <div className="flex items-center gap-2">
            <Switch id="inStock" checked={inStock} onCheckedChange={setInStock} />
            <Label htmlFor="inStock">In stock</Label>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Switch id="published" checked={published} onCheckedChange={setPublished} />
          <Label htmlFor="published">Published</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="featured" checked={featured} onCheckedChange={setFeatured} />
          <Label htmlFor="featured">Featured</Label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {mode === "create" ? "Create Product" : "Save Changes"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
