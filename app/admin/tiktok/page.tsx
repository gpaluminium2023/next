import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { TikTokVideoBrowser } from "@/components/admin/tiktok-video-browser";

export const dynamic = "force-dynamic";

interface TikTokAdminPageProps {
  searchParams: Promise<{ connected?: string; error?: string }>;
}

export default async function TikTokAdminPage({ searchParams }: TikTokAdminPageProps) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/admin/login");
  if (session.user.role !== "admin") redirect(session.user.role === "staff" ? "/admin/orders" : "/");

  const { connected, error } = await searchParams;
  const [connection, featured] = await Promise.all([
    prisma.tikTokConnection.findUnique({ where: { id: "singleton" } }),
    prisma.featuredTikTokVideo.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="container mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="font-heading text-lg font-bold uppercase tracking-wide">
              GPA Admin
            </Link>
            <nav className="hidden gap-3 text-sm text-primary-foreground/70 sm:flex">
              <Link href="/admin/orders">Orders</Link>
              <Link href="/admin/products">Products</Link>
              <Link href="/admin/branches">Branches</Link>
              <Link href="/admin/settings/bank-transfer">Settings</Link>
              <Link href="/admin/tiktok" className="text-primary-foreground">
                TikTok
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-2 font-heading text-2xl font-bold uppercase">TikTok</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Connect the business TikTok account to browse its videos and pick which ones appear in
          the &ldquo;Follow us on TikTok&rdquo; strip on{" "}
          <Link href="/gallery" className="underline">
            /gallery
          </Link>
          .
        </p>

        {error && (
          <div className="mb-6 rounded-sm border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            Connection failed: {error}
          </div>
        )}
        {connected && (
          <div className="mb-6 rounded-sm border border-border bg-card p-4 text-sm">
            TikTok account connected.
          </div>
        )}

        {!connection ? (
          <Button asChild className="rounded-sm">
            <a href="/api/tiktok/authorize">Connect TikTok account</a>
          </Button>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between rounded-sm border border-border bg-card p-4 text-sm">
              <span>
                Connected as TikTok user{" "}
                <code className="text-xs text-muted-foreground">{connection.openId}</code>
              </span>
              <form action="/api/tiktok/disconnect" method="POST">
                <Button type="submit" variant="outline" size="sm" className="rounded-sm">
                  Disconnect
                </Button>
              </form>
            </div>

            <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide">
              Account videos
            </h2>
            <TikTokVideoBrowser featuredVideoIds={featured.map((f) => f.videoId)} />
          </>
        )}
      </main>
    </div>
  );
}
