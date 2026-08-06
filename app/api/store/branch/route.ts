import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { BRANCH_COOKIE, BRANCH_COOKIE_MAX_AGE } from "@/lib/store/branch";

const bodySchema = z.object({ slug: z.string().min(1).max(64) });

// POST /api/store/branch — public. Records which branch the visitor is
// shopping. Only the slug is stored; every price is still resolved server-side
// from that branch's own price rows, so a tampered cookie can only ever select
// a different published branch's real prices, never invent one.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid branch" }, { status: 400 });
  }

  const branch = await prisma.branch.findFirst({
    where: { slug: parsed.data.slug, published: true },
    select: { slug: true, shortName: true },
  });
  if (!branch) {
    return NextResponse.json({ error: "Unknown branch" }, { status: 404 });
  }

  const response = NextResponse.json({ slug: branch.slug, shortName: branch.shortName });
  response.cookies.set(BRANCH_COOKIE, branch.slug, {
    path: "/",
    maxAge: BRANCH_COOKIE_MAX_AGE,
    sameSite: "lax",
    httpOnly: true, // nothing reads this client-side; the selector gets its active branch as a server prop
  });
  return response;
}
