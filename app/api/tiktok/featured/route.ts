import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/prisma";

const featureSchema = z.object({
  videoId: z.string().min(1),
  caption: z.string().optional(),
});

// POST /api/tiktok/featured — add a video (picked from /api/tiktok/videos)
// to the "Follow us on TikTok" strip on /gallery.
export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = featureSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const featured = await prisma.featuredTikTokVideo.upsert({
    where: { videoId: parsed.data.videoId },
    create: { videoId: parsed.data.videoId, caption: parsed.data.caption },
    update: { caption: parsed.data.caption },
  });
  return NextResponse.json(featured);
}
