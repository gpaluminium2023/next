import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { requireAdmin } from "@/lib/admin-guard";
import { sendReviewRequestEmail } from "@/lib/email/review-emails";

const inviteSchema = z.object({ orderId: z.string().min(1) });

// POST /api/reviews/invite — admin only. Emails one buyer a single-use review
// link. This is the honest way to grow review volume: ask real customers who
// really bought something, one order at a time, and take whatever they write.
export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = inviteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "orderId is required" }, { status: 400 });
  }

  const result = await sendReviewRequestEmail(parsed.data.orderId);
  if (!result.ok) {
    return NextResponse.json({ error: result.reason ?? "Could not send invitation" }, { status: 409 });
  }

  return NextResponse.json({ ok: true });
}
