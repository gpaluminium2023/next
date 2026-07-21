import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { markOrderPaid } from "@/lib/store/orders";

// POST /api/webhooks/paystack — backup source of truth for payment
// confirmation (the checkout callback page is the primary path; whichever
// arrives first wins via markOrderPaid's idempotent guard).
export async function POST(request: NextRequest) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  // Signature is computed over the exact raw bytes — read as text first,
  // never parse-then-reserialize.
  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  const expected = createHmac("sha512", secretKey).update(rawBody).digest("hex");
  const expectedBuf = Buffer.from(expected, "utf8");
  const signatureBuf = Buffer.from(signature, "utf8");
  const valid =
    expectedBuf.length === signatureBuf.length && timingSafeEqual(expectedBuf, signatureBuf);

  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "charge.success") {
    const data = event.data;
    const reference: string = data.reference;

    const order = await prisma.order.findUnique({ where: { reference } });
    if (!order) {
      // Unknown reference — acknowledge so Paystack doesn't retry forever.
      return NextResponse.json({ received: true });
    }

    if (data.amount !== order.subtotalKobo || data.currency !== "NGN") {
      console.error(`Paystack webhook amount/currency mismatch for order ${reference}`);
      return NextResponse.json({ received: true });
    }

    await markOrderPaid({
      reference,
      paystackId: String(data.id),
      channel: data.channel ?? null,
      paidAt: data.paid_at ? new Date(data.paid_at) : new Date(),
    });
  }

  return NextResponse.json({ received: true });
}
