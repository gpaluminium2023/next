import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { AdminSignOut } from "@/components/admin/admin-sign-out";
import { ReviewModeration, type AdminReview } from "@/components/admin/review-moderation";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/admin/login");
  if (session.user.role !== "admin") redirect(session.user.role === "staff" ? "/admin/orders" : "/");

  const rows = await prisma.review.findMany({
    // PENDING sorts first alphabetically among the three statuses, which is
    // also the order the dealer wants: things needing a decision at the top.
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: {
      product: { select: { name: true } },
      order: { select: { reference: true } },
    },
  });

  const reviews: AdminReview[] = rows.map((review) => ({
    id: review.id,
    rating: review.rating,
    title: review.title,
    body: review.body,
    authorName: review.authorName,
    authorLocation: review.authorLocation,
    submitterEmail: review.submitterEmail,
    submitterPhone: review.submitterPhone,
    status: review.status,
    source: review.source,
    sourceNote: review.sourceNote,
    consentToPublish: review.consentToPublish,
    verifiedPurchase: review.verifiedPurchase,
    createdAt: review.createdAt.toISOString(),
    productName: review.product?.name ?? null,
    orderReference: review.order?.reference ?? null,
  }));

  const pendingCount = reviews.filter((review) => review.status === "PENDING").length;
  const approvedCount = reviews.filter((review) => review.status === "APPROVED").length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="container mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="font-heading text-lg font-bold uppercase tracking-wide">
              GPA Admin
            </Link>
            <span className="hidden text-sm text-primary-foreground/60 sm:block">Reviews</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-primary-foreground/70 sm:block">
              {session.user.email}
            </span>
            <AdminSignOut />
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold uppercase">Reviews</h1>
            <p className="mt-0.5 max-w-2xl text-sm text-muted-foreground">
              {pendingCount} awaiting a decision · {approvedCount} published. Approving a review
              is what puts it on the site and moves that product&rsquo;s star rating in Google —
              nothing publishes on its own.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/admin/orders">Orders</Link>
          </Button>
        </div>

        <div className="mb-6 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Publish what customers actually wrote.</p>
          <p className="mt-1">
            Reject spam, abuse, and anything you can&rsquo;t trace to a real customer. Do not
            reject a review for being critical, and do not edit the words — the site&rsquo;s
            structured data tells Google these are genuine customer reviews, and a curated or
            rewritten set makes that a false statement.
          </p>
        </div>

        <ReviewModeration reviews={reviews} />
      </main>
    </div>
  );
}
