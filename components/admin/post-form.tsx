"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CoverImageUpload } from "@/components/admin/cover-image-upload";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface PostFormProps {
  mode: "create" | "edit";
  postId?: string;
  defaultValues?: {
    title: string;
    slug: string;
    excerpt: string;
    bodyParagraphs: string[];
    coverImage: string | null;
    coverImageAlt: string | null;
    coverPublicId: string | null;
    date: string;
    published: boolean;
    featured: boolean;
    readingTimeMinutes: number;
  };
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function PostForm({ mode, postId, defaultValues }: PostFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [slug, setSlug] = useState(defaultValues?.slug ?? "");
  const [excerpt, setExcerpt] = useState(defaultValues?.excerpt ?? "");
  const [paragraphs, setParagraphs] = useState<string[]>(
    defaultValues?.bodyParagraphs ?? [""]
  );
  const [coverImage, setCoverImage] = useState<string | null>(
    defaultValues?.coverImage ?? null
  );
  const [coverImageAlt, setCoverImageAlt] = useState(
    defaultValues?.coverImageAlt ?? ""
  );
  const [coverPublicId, setCoverPublicId] = useState<string | null>(
    defaultValues?.coverPublicId ?? null
  );
  const [date, setDate] = useState(
    defaultValues?.date ?? new Date().toISOString().slice(0, 10)
  );
  const [published, setPublished] = useState(defaultValues?.published ?? false);
  const [featured, setFeatured] = useState(defaultValues?.featured ?? false);
  const [readingTimeMinutes, setReadingTimeMinutes] = useState(
    defaultValues?.readingTimeMinutes ?? 5
  );

  function handleTitleChange(v: string) {
    setTitle(v);
    if (mode === "create") setSlug(slugify(v));
  }

  function updateParagraph(index: number, value: string) {
    setParagraphs((prev) => prev.map((p, i) => (i === index ? value : p)));
  }

  function addParagraph() {
    setParagraphs((prev) => [...prev, ""]);
  }

  function removeParagraph(index: number) {
    setParagraphs((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload = {
      title,
      slug,
      excerpt,
      bodyParagraphs: paragraphs.filter((p) => p.trim() !== ""),
      coverImage,
      coverImageAlt: coverImageAlt || null,
      coverPublicId,
      date,
      published,
      featured,
      readingTimeMinutes,
    };

    startTransition(async () => {
      const res = await fetch(
        mode === "create" ? "/api/blog" : `/api/blog/${postId}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong");
        return;
      }

      router.push("/admin");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Cover image */}
      <div className="space-y-1.5">
        <Label>Cover Image</Label>
        <CoverImageUpload
          value={coverImage}
          publicId={coverPublicId}
          onChange={(url, pid) => {
            setCoverImage(url);
            setCoverPublicId(pid);
          }}
          onRemove={() => {
            setCoverImage(null);
            setCoverPublicId(null);
          }}
        />
        {coverImage && (
          <div className="space-y-1.5 pt-2">
            <Label htmlFor="coverImageAlt">Cover Image Alt Text</Label>
            <Input
              id="coverImageAlt"
              value={coverImageAlt}
              onChange={(e) => setCoverImageAlt(e.target.value)}
              placeholder="Describe the image for accessibility and SEO"
            />
          </div>
        )}
      </div>

      <Separator />

      {/* Title */}
      <div className="space-y-1.5">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          required
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="How Much Do Aluminium Roofing Sheets Cost in Lagos…"
        />
      </div>

      {/* Slug */}
      <div className="space-y-1.5">
        <Label htmlFor="slug">Slug *</Label>
        <Input
          id="slug"
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="aluminium-roofing-sheet-price-lagos-2026"
        />
        <p className="text-xs text-muted-foreground">
          /blog/{slug || "your-slug-here"}
        </p>
      </div>

      {/* Excerpt */}
      <div className="space-y-1.5">
        <Label htmlFor="excerpt">Excerpt *</Label>
        <Textarea
          id="excerpt"
          required
          rows={3}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="A short summary shown on the blog listing page and in search results. Keep it under 160 characters."
        />
      </div>

      {/* Body paragraphs */}
      <div className="space-y-3">
        <Label>Body Paragraphs</Label>
        {paragraphs.map((p, i) => (
          <div key={i} className="flex gap-2">
            <Textarea
              rows={4}
              className="flex-1"
              value={p}
              onChange={(e) => updateParagraph(i, e.target.value)}
              placeholder={`Paragraph ${i + 1}`}
            />
            {paragraphs.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive shrink-0"
                onClick={() => removeParagraph(i)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove paragraph</span>
              </Button>
            )}
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addParagraph}>
          <Plus className="h-4 w-4 mr-1" /> Add paragraph
        </Button>
      </div>

      <Separator />

      {/* Meta */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="date">Publish Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="readingTimeMinutes">Reading Time (minutes)</Label>
          <Input
            id="readingTimeMinutes"
            type="number"
            min={1}
            max={60}
            value={readingTimeMinutes}
            onChange={(e) => setReadingTimeMinutes(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="flex gap-8">
        <div className="flex items-center gap-2">
          <Switch
            id="published"
            checked={published}
            onCheckedChange={setPublished}
          />
          <Label htmlFor="published">Published</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="featured"
            checked={featured}
            onCheckedChange={setFeatured}
          />
          <Label htmlFor="featured">Featured</Label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {mode === "create" ? "Create Post" : "Save Changes"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
