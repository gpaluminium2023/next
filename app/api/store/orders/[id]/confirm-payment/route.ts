import { NextRequest, NextResponse } from "next/server";
import { requireStaff } from "@/lib/admin-guard";
import { confirmBankTransferPayment } from "@/lib/store/orders";

interface Params {
  params: Promise<{ id: string }>;
}

// POST /api/store/orders/[id]/confirm-payment — admin or staff. The one
// action staff can take: mark a pending BANK_TRANSFER order as paid once the
// dealer's real bank account shows a matching transfer. Every other order
// mutation (PATCH /api/store/orders/[id]) stays admin-only.
export async function POST(_request: NextRequest, { params }: Params) {
  const session = await requireStaff();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const confirmed = await confirmBankTransferPayment(id);
  if (!confirmed) {
    return NextResponse.json(
      { error: "Order is not a pending bank transfer order" },
      { status: 409 },
    );
  }

  return NextResponse.json({ ok: true });
}
