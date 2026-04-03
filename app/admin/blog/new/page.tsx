import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PostForm } from "@/components/admin/post-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default async function NewPostPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") redirect("/admin/login");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button asChild size="sm" variant="ghost" className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10">
            <Link href="/admin">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Link>
          </Button>
          <span className="font-heading font-bold uppercase">New Post</span>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        <PostForm mode="create" />
      </main>
    </div>
  );
}
