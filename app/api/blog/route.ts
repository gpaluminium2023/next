import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") {
    return null;
  }
  return session;
}

// GET /api/blog — list all posts (admin: all, public: published only)
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const slug = searchParams.get("slug");
  const all = searchParams.get("all") === "true";

  const session = all ? await requireAdmin() : null;

  if (slug) {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: { author: { select: { name: true } } },
    });
    if (!post || (!post.published && !session)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  }

  const posts = await prisma.blogPost.findMany({
    where: all && session ? {} : { published: true },
    orderBy: { date: "desc" },
    include: { author: { select: { name: true } } },
  });

  return NextResponse.json(posts);
}

// POST /api/blog — create post (admin only)
export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, slug, excerpt, bodyParagraphs, coverImage, coverImageAlt, coverPublicId, date, published, featured, readingTimeMinutes } = body;

  if (!title || !slug || !excerpt) {
    return NextResponse.json({ error: "title, slug and excerpt are required" }, { status: 400 });
  }

  const post = await prisma.blogPost.create({
    data: {
      title,
      slug,
      excerpt,
      body: bodyParagraphs ?? [],
      coverImage: coverImage ?? null,
      coverImageAlt: coverImageAlt ?? null,
      coverPublicId: coverPublicId ?? null,
      date: date ? new Date(date) : new Date(),
      published: published ?? false,
      featured: featured ?? false,
      readingTimeMinutes: readingTimeMinutes ?? 5,
      authorId: session.user.id,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
