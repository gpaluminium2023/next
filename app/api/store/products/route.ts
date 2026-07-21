import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/prisma";
import { ProductCategory } from "@/lib/generated/prisma/enums";

const VALID_CATEGORIES = Object.values(ProductCategory) as string[];

// GET /api/store/products — list products (public: published only, admin +
// ?all=true: everything). ?category=SHEETS|STONE_COATED|ACCESSORIES filters.
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const slug = searchParams.get("slug");
  const all = searchParams.get("all") === "true";
  const category = searchParams.get("category");

  const session = all ? await requireAdmin() : null;

  if (slug) {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { variants: { orderBy: { sortOrder: "asc" } } },
    });
    if (!product || (!product.published && !session)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  }

  const validCategory = category && VALID_CATEGORIES.includes(category) ? (category as ProductCategory) : undefined;

  const product = await prisma.product.findMany({
    where: {
      ...(all && session ? {} : { published: true }),
      ...(validCategory ? { category: validCategory } : {}),
    },
    include: { variants: { orderBy: { sortOrder: "asc" } } },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(product);
}

// POST /api/store/products — create product (admin only)
export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  if (!name || !slug || !category) {
    return NextResponse.json({ error: "name, slug and category are required" }, { status: 400 });
  }

  // Single-row create only — a nested `variants: { create: [...] }` would
  // start an implicit transaction, which the Neon HTTP adapter rejects.
  // Variants are inserted one at a time right after.
  const product = await prisma.product.create({
    data: {
      name,
      slug,
      description: description ?? "",
      category,
      unit: unit ?? "sqm",
      basePriceKobo: basePriceKobo ?? null,
      inStock: inStock ?? true,
      published: published ?? false,
      featured: featured ?? false,
      sortOrder: sortOrder ?? 0,
      images: images ?? [],
      videoUrl: videoUrl ?? null,
      videoPublicId: videoPublicId ?? null,
    },
  });

  if (Array.isArray(variants)) {
    for (const v of variants) {
      await prisma.productVariant.create({
        data: {
          productId: product.id,
          label: v.label,
          priceKobo: v.priceKobo,
          inStock: v.inStock ?? true,
          sortOrder: v.sortOrder ?? 0,
        },
      });
    }
  }

  const withVariants = await prisma.product.findUnique({
    where: { id: product.id },
    include: { variants: { orderBy: { sortOrder: "asc" } } },
  });

  return NextResponse.json(withVariants, { status: 201 });
}
