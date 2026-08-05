import { headers } from "next/headers";
import { auth } from "@/lib/auth";

// Shared admin session check for API routes — extracted from the pattern
// originally duplicated in app/api/blog/route.ts.
export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") {
    return null;
  }
  return session;
}

// Orders-only access for staff who confirm bank transfer payments on the
// dealer's behalf — everything else (products, blog, settings) stays
// requireAdmin-only.
export async function requireStaff() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || (session.user.role !== "admin" && session.user.role !== "staff")) {
    return null;
  }
  return session;
}
