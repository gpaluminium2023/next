import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

interface Params {
  params: Promise<{ id: string }>;
}

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") return null;
  return session;
}

// PATCH /api/blog/[id] — update post
export async function PATCH(request: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const { title, slug, excerpt, bodyParagraphs, coverImage, coverImageAlt, coverPublicId, date, published, featured, readingTimeMinutes } = body;

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      ...(title !== undefined && { title }),
      ...(slug !== undefined && { slug }),
      ...(excerpt !== undefined && { excerpt }),
      ...(bodyParagraphs !== undefined && { body: bodyParagraphs }),
      ...(coverImage !== undefined && { coverImage }),
      ...(coverImageAlt !== undefined && { coverImageAlt }),
      ...(coverPublicId !== undefined && { coverPublicId }),
      ...(date !== undefined && { date: new Date(date) }),
      ...(published !== undefined && { published }),
      ...(featured !== undefined && { featured }),
      ...(readingTimeMinutes !== undefined && { readingTimeMinutes }),
    },
  });

  return NextResponse.json(post);
}

// DELETE /api/blog/[id]
export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
