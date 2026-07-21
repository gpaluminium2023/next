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
