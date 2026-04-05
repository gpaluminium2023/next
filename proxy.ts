import { NextRequest, NextResponse } from "next/server";

// Lightweight cookie check — full session + role validation happens in each admin page
const SESSION_COOKIE = "better-auth.session_token";
const SECURE_SESSION_COOKIE = "__Secure-better-auth.session_token";

const CANONICAL_HOST = "www.godspromisealuminiumroofing.com";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  // Redirect bare domain to www to prevent cross-origin auth issues
  if (
    host === "godspromisealuminiumroofing.com" ||
    host === "godspromisealuminiumroofing.com:443"
  ) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.protocol = "https";
    return NextResponse.redirect(url, 308);
  }

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();

    const sessionCookie =
      request.cookies.get(SECURE_SESSION_COOKIE) ??
      request.cookies.get(SESSION_COOKIE);
    if (!sessionCookie?.value) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|ingest).*)"],
};
