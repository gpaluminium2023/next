import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { buildAuthorizeUrl } from "@/lib/tiktok/client";
import { generateCodeChallenge, generateCodeVerifier, generateState } from "@/lib/tiktok/pkce";

// Long enough to get through TikTok's consent screen, short enough that a
// stale cookie can't be replayed.
const COOKIE_MAX_AGE = 60 * 10;

export async function GET(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);

  const response = NextResponse.redirect(buildAuthorizeUrl(state, codeChallenge));
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  };
  response.cookies.set("tiktok_oauth_state", state, cookieOptions);
  response.cookies.set("tiktok_oauth_verifier", codeVerifier, cookieOptions);
  return response;
}
