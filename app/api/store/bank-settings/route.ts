import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/prisma";

const bankSettingsSchema = z.object({
  bankName: z.string().min(1),
  accountNumber: z.string().min(1),
  accountName: z.string().min(1),
  instructions: z.string().optional(),
});

// PATCH /api/store/bank-settings — admin only. Upserts the singleton row
// customers see when they choose to pay by bank transfer at checkout.
export async function PATCH(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = bankSettingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid bank settings payload" }, { status: 400 });
  }
  const { bankName, accountNumber, accountName, instructions } = parsed.data;

  const settings = await prisma.bankTransferSettings.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", bankName, accountNumber, accountName, instructions: instructions || null },
    update: { bankName, accountNumber, accountName, instructions: instructions || null },
  });

  return NextResponse.json(settings);
}
