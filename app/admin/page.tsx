import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdminSignOut } from "@/components/admin/admin-sign-out";
import { AdminDeletePost } from "@/components/admin/admin-delete-post";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/admin/login");
  if (session.user.role !== "admin") redirect("/");

  const posts = await prisma.blogPost.findMany({
    orderBy: { date: "desc" },
  }) as Array<{ id: string; title: string; slug: string; featured: boolean; published: boolean; date: Date | string; }>;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-heading font-bold uppercase text-lg tracking-wide">
              GPA Admin
            </span>
            <span className="text-primary-foreground/60 text-sm hidden sm:block">
              Blog CMS
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-primary-foreground/70 hidden sm:block">
              {session.user.email}
            </span>
            <AdminSignOut />
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-heading font-bold text-2xl uppercase">
              Blog Posts
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              {posts.length} post{posts.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/blog/new">New Post</Link>
          </Button>
        </div>

        {posts.length === 0 ? (
          <div className="border border-dashed border-border rounded-lg p-12 text-center text-muted-foreground">
            <p className="mb-4">No posts yet.</p>
            <Button asChild variant="outline">
              <Link href="/admin/blog/new">Create your first post</Link>
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-border border border-border rounded-lg overflow-hidden">
            {posts.map((post: Record<string, unknown> & { id: string; title: string; slug: string; featured: boolean; published: boolean; date: string | Date; }) => (
              <div
                key={post.id}
                className="flex items-start gap-4 px-4 py-4 bg-card hover:bg-accent/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-medium text-sm truncate">
                      {post.title}
                    </span>
                    {post.featured && (
                      <Badge variant="secondary" className="text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>/{post.slug}</span>
                    <span>{format(new Date(post.date), "d MMM yyyy")}</span>
                    <Badge
                      variant={post.published ? "default" : "outline"}
                      className="text-xs h-4"
                    >
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/admin/blog/${post.id}`}>Edit</Link>
                  </Button>
                  {post.published && (
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/articles/${post.slug}`} target="_blank">
                        View
                      </Link>
                    </Button>
                  )}
                  <AdminDeletePost id={post.id} title={post.title} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
