import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{ slug: string }>;
}

const entrySchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().min(1).nullable(),
  // null price = the branch does not carry this item; the row is deleted.
  priceKobo: z.number().int().min(0).nullable(),
  inStock: z.boolean().default(true),
});

const bodySchema = z.object({ entries: z.array(entrySchema).max(500) });

// PUT /api/store/branches/[slug]/prices — replace this branch's price list
// (admin only). Sending priceKobo: null for an entry removes it from the
// branch's range, which is how a branch stops selling an item.
//
// The default branch is priced off the shared catalogue columns, so it has no
// override rows and is rejected here — edit those prices under Products.
export async function PUT(request: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const branch = await prisma.branch.findUnique({ where: { slug } });
  if (!branch) {
    return NextResponse.json({ error: "Branch not found" }, { status: 404 });
  }
  if (branch.isDefault) {
    return NextResponse.json(
      { error: "The default branch is priced from the product catalogue, not per-branch overrides" },
      { status: 409 },
    );
  }

  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid price payload" }, { status: 400 });
  }

  // Single-row writes only — the Neon HTTP adapter rejects the implicit
  // transaction that createMany/updateMany/deleteMany would start.
  for (const entry of parsed.data.entries) {
    if (entry.variantId) {
      const where = { branchId_variantId: { branchId: branch.id, variantId: entry.variantId } };
      if (entry.priceKobo == null) {
        await prisma.branchVariantPrice.deleteMany({
          where: { branchId: branch.id, variantId: entry.variantId },
        });
        continue;
      }
      await prisma.branchVariantPrice.upsert({
        where,
        create: {
          branchId: branch.id,
          variantId: entry.variantId,
          productId: entry.productId,
          priceKobo: entry.priceKobo,
          inStock: entry.inStock,
        },
        update: { priceKobo: entry.priceKobo, inStock: entry.inStock, productId: entry.productId },
      });
    } else {
      if (entry.priceKobo == null) {
        await prisma.branchProductPrice.deleteMany({
          where: { branchId: branch.id, productId: entry.productId },
        });
        continue;
      }
      await prisma.branchProductPrice.upsert({
        where: { branchId_productId: { branchId: branch.id, productId: entry.productId } },
        create: {
          branchId: branch.id,
          productId: entry.productId,
          priceKobo: entry.priceKobo,
          inStock: entry.inStock,
        },
        update: { priceKobo: entry.priceKobo, inStock: entry.inStock },
      });
    }
  }

  return NextResponse.json({ success: true, updated: parsed.data.entries.length });
}
