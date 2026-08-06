"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TikTokVideoSummary {
  id: string;
  title: string;
  coverImageUrl: string;
  shareUrl: string;
  duration: number;
  createTime: number;
}

export function TikTokVideoBrowser({ featuredVideoIds }: { featuredVideoIds: string[] }) {
  const [videos, setVideos] = useState<TikTokVideoSummary[]>([]);
  const [featured, setFeatured] = useState(new Set(featuredVideoIds));
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadPage = useCallback(async (nextCursor?: number) => {
    setLoading(true);
    setError(null);
    try {
      const url = nextCursor ? `/api/tiktok/videos?cursor=${nextCursor}` : "/api/tiktok/videos";
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load videos");
      setVideos((prev) => (nextCursor ? [...prev, ...data.videos] : data.videos));
      setCursor(data.cursor);
      setHasMore(data.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load videos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  async function toggleFeatured(video: TikTokVideoSummary) {
    setPendingId(video.id);
    const isFeatured = featured.has(video.id);
    try {
      if (isFeatured) {
        await fetch(`/api/tiktok/featured/${video.id}`, { method: "DELETE" });
        setFeatured((prev) => {
          const next = new Set(prev);
          next.delete(video.id);
          return next;
        });
      } else {
        await fetch("/api/tiktok/featured", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoId: video.id, caption: video.title }),
        });
        setFeatured((prev) => new Set(prev).add(video.id));
      }
    } finally {
      setPendingId(null);
    }
  }

  if (error) {
    return <p className="text-sm text-destructive">{error}</p>;
  }

  if (loading && videos.length === 0) {
    return (
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading videos…
      </p>
    );
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => {
          const isFeatured = featured.has(video.id);
          return (
            <div key={video.id} className="overflow-hidden rounded-sm border border-border bg-card">
              {/* TikTok's cover_image_url is a signed, expiring CDN link we
                  don't control — plain <img>, not next/image (which needs a
                  stable, allow-listed remote host). */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={video.coverImageUrl}
                alt={video.title || "TikTok video"}
                className="aspect-9/16 w-full object-cover"
              />
              <div className="p-3">
                <p className="line-clamp-2 text-xs text-muted-foreground">
                  {video.title || "(no caption)"}
                </p>
                <Button
                  size="sm"
                  variant={isFeatured ? "outline" : "default"}
                  className="mt-2 w-full rounded-sm"
                  disabled={pendingId === video.id}
                  onClick={() => toggleFeatured(video)}
                >
                  {pendingId === video.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isFeatured ? (
                    "Featured — remove"
                  ) : (
                    "Feature on /gallery"
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {videos.length === 0 && !loading && (
        <p className="text-sm text-muted-foreground">No videos found on this account.</p>
      )}

      {hasMore && (
        <Button
          variant="outline"
          className="mt-4 rounded-sm"
          disabled={loading}
          onClick={() => loadPage(cursor)}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Load more"}
        </Button>
      )}
    </div>
  );
}
