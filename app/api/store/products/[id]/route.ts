import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{ id: string }>;
}

interface VariantInput {
  id?: string;
  label: string;
  priceKobo: number;
  inStock?: boolean;
  sortOrder?: number;
}

// PATCH /api/store/products/[id] — update product + reconcile variants (admin only)
export async function PATCH(request: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const {
    name,
    slug,
    description,
    category,
    unit,
    basePriceKobo,
    inStock,
    published,
    featured,
    sortOrder,
    images,
    videoUrl,
    videoPublicId,
    variants,
  } = body;

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...(name !== undefined && { name }),
      ...(slug !== undefined && { slug }),
      ...(description !== undefined && { description }),
      ...(category !== undefined && { category }),
      ...(unit !== undefined && { unit }),
      ...(basePriceKobo !== undefined && { basePriceKobo }),
      ...(inStock !== undefined && { inStock }),
      ...(published !== undefined && { published }),
      ...(featured !== undefined && { featured }),
      ...(sortOrder !== undefined && { sortOrder }),
      ...(images !== undefined && { images }),
      ...(videoUrl !== undefined && { videoUrl }),
      ...(videoPublicId !== undefined && { videoPublicId }),
    },
  });

  // Reconcile variants one row at a time (no createMany/updateMany/deleteMany
  // with array filters — the Neon HTTP adapter rejects the implicit
  // transaction those start; single-row create/update/delete work fine).
  if (Array.isArray(variants)) {
    const incoming = variants as VariantInput[];
    const existing = await prisma.productVariant.findMany({ where: { productId: id } });
    const incomingIds = new Set(incoming.filter((v) => v.id).map((v) => v.id));

    for (const existingVariant of existing) {
      if (!incomingIds.has(existingVariant.id)) {
        await prisma.productVariant.delete({ where: { id: existingVariant.id } });
      }
    }

    for (const v of incoming) {
      if (v.id) {
        await prisma.productVariant.update({
          where: { id: v.id },
          data: {
            label: v.label,
            priceKobo: v.priceKobo,
            inStock: v.inStock ?? true,
            sortOrder: v.sortOrder ?? 0,
          },
        });
      } else {
        await prisma.productVariant.create({
          data: {
            productId: id,
            label: v.label,
            priceKobo: v.priceKobo,
            inStock: v.inStock ?? true,
            sortOrder: v.sortOrder ?? 0,
          },
        });
      }
    }
  }

  const withVariants = await prisma.product.findUnique({
    where: { id: product.id },
    include: { variants: { orderBy: { sortOrder: "asc" } } },
  });

  return NextResponse.json(withVariants);
}

// DELETE /api/store/products/[id] (admin only)
export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  // Variants and order items cascade/set-null per schema; delete the product row.
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
