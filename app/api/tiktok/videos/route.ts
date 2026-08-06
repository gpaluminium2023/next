import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { listAccountVideos } from "@/lib/tiktok/client";

// GET /api/tiktok/videos — browse the connected account's own videos via the
// Display API, for staff picking which ones to feature on /gallery.
export async function GET(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cursorParam = request.nextUrl.searchParams.get("cursor");
  try {
    const result = await listAccountVideos(cursorParam ? Number(cursorParam) : undefined);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch videos" },
      { status: 502 },
    );
  }
}
