import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateReceiptPdfBuffer } from "@/lib/receipts/generate-receipt-pdf";

interface Params {
  params: Promise<{ reference: string }>;
}

// GET /api/orders/[reference]/receipt — public. The order reference is a
// high-entropy, unguessable token (same trust model as ?ref= on
// /checkout/success), so no auth is required to download it.
export async function GET(_request: NextRequest, { params }: Params) {
  const { reference } = await params;

  const order = await prisma.order.findUnique({
    where: { reference },
    include: { items: true },
  });

  if (!order) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // A STORE order only has a receipt once payment is confirmed; a
  // ROOF_CALCULATOR estimate is downloadable as soon as it's submitted.
  if (order.source === "STORE" && order.status !== "PAID" && order.status !== "FULFILLED") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const pdfBuffer = await generateReceiptPdfBuffer(order);
  const filename = `${order.source === "ROOF_CALCULATOR" ? "Estimate" : "Receipt"}-${order.reference}.pdf`;

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
