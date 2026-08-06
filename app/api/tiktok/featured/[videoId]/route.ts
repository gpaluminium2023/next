import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/prisma";

// DELETE /api/tiktok/featured/:videoId — remove a video from the
// "Follow us on TikTok" strip on /gallery.
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ videoId: string }> },
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { videoId } = await params;
  await prisma.featuredTikTokVideo.deleteMany({ where: { videoId } });
  return NextResponse.json({ ok: true });
}
