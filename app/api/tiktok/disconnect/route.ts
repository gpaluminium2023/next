import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { disconnectAccount } from "@/lib/tiktok/client";

// Plain HTML form target (see app/admin/tiktok/page.tsx) — redirects back
// rather than returning JSON, so no client JS is needed to disconnect.
export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  await disconnectAccount();
  return NextResponse.redirect(new URL("/admin/tiktok", request.url));
}
