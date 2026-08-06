import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { exchangeCodeForToken } from "@/lib/tiktok/client";

export async function GET(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const tiktokError = searchParams.get("error");

  const expectedState = request.cookies.get("tiktok_oauth_state")?.value;
  const codeVerifier = request.cookies.get("tiktok_oauth_verifier")?.value;

  const redirectUrl = new URL("/admin/tiktok", request.url);

  if (tiktokError) {
    redirectUrl.searchParams.set("error", tiktokError);
  } else if (!code || !state || !expectedState || !codeVerifier || state !== expectedState) {
    redirectUrl.searchParams.set("error", "invalid_state");
  } else {
    try {
      await exchangeCodeForToken(code, codeVerifier);
      redirectUrl.searchParams.set("connected", "1");
    } catch (err) {
      redirectUrl.searchParams.set(
        "error",
        err instanceof Error ? err.message : "token_exchange_failed",
      );
    }
  }

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.delete("tiktok_oauth_state");
  response.cookies.delete("tiktok_oauth_verifier");
  return response;
}
