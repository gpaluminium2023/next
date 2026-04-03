import Link from "next/link";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PostForm } from "@/components/admin/post-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { format } from "date-fns";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") redirect("/admin/login");

  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  const bodyParagraphs = Array.isArray(post.body)
    ? (post.body as string[])
    : [];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button asChild size="sm" variant="ghost" className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10">
            <Link href="/admin">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Link>
          </Button>
          <span className="font-heading font-bold uppercase truncate max-w-xs">
            Edit: {post.title}
          </span>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        <PostForm
          mode="edit"
          postId={post.id}
          defaultValues={{
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            bodyParagraphs,
            coverImage: post.coverImage ?? null,
            coverImageAlt: post.coverImageAlt ?? null,
            coverPublicId: post.coverPublicId ?? null,
            date: format(new Date(post.date), "yyyy-MM-dd"),
            published: post.published,
            featured: post.featured,
            readingTimeMinutes: post.readingTimeMinutes ?? 5,
          }}
        />
      </main>
    </div>
  );
}
