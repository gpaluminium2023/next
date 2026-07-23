import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { generateOrderReference } from "@/lib/store/orders";
import { sendAdminOrderNotice, sendBuyerReceiptEmail } from "@/lib/email/order-emails";
import {
  DEFAULT_STATE,
  GLOSSARY,
  computeAccessories,
  computeResults,
  round2,
  type CalculatorState,
} from "@/lib/roof-calculator/calculations";
import type { CalculatorDetailsSnapshot } from "@/lib/roof-calculator/calculator-details";

const dimsSchema = z.object({
  eaveWidth: z.string().optional(),
  buildingLength: z.string().optional(),
  overhang: z.string().optional(),
  extWidth: z.string().optional(),
  extDepth: z.string().optional(),
});

const submitSchema = z.object({
  contact: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7),
    address: z.string().optional(),
    note: z.string().max(1000).optional(),
  }),
  calculator: z.object({
    shape: z.enum(["gable", "hip", "hipext"]),
    dims: dimsSchema,
    pitchDeg: z.number().min(5).max(80),
    sheetLayout: z.enum(["longspan", "fixed"]),
    sheetWidth: z.number().positive(),
    sheetLength: z.number().positive(),
    overlap: z.number().min(0),
    wastePct: z.number().min(0).max(100),
    productId: z.string().min(1),
    variantId: z.string().min(1),
  }),
});

// POST /api/roof-calculator/submit — public. Mirrors /api/store/checkout's
// trust model: the client sends shape/dimensions (which only affect
// quantity), but the price-per-sqm is always re-derived from the database,
// never trusted from the client.
export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = submitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid estimate payload" }, { status: 400 });
  }
  const { contact, calculator } = parsed.data;

  const product = await prisma.product.findUnique({
    where: { id: calculator.productId },
    include: { variants: true },
  });
  if (!product || !product.published || product.category !== "SHEETS") {
    return NextResponse.json({ error: "Selected sheet product is no longer available" }, { status: 409 });
  }
  const variant = product.variants.find((v) => v.id === calculator.variantId);
  if (!variant || !variant.inStock) {
    return NextResponse.json({ error: "Selected sheet option is no longer available" }, { status: 409 });
  }

  const state: CalculatorState = {
    ...DEFAULT_STATE,
    shape: calculator.shape,
    dims: calculator.dims,
    pitchDeg: calculator.pitchDeg,
    productId: product.id,
    variantId: variant.id,
    sheetLayout: calculator.sheetLayout,
    sheetWidth: calculator.sheetWidth,
    sheetLength: calculator.sheetLength,
    overlap: calculator.overlap,
    wastePct: calculator.wastePct,
    pricePerSqmKobo: variant.priceKobo,
    priceUnit: product.unit,
  };

  const r = computeResults(state);
  const acc = computeAccessories(state);

  if (r.materialCostKobo == null) {
    return NextResponse.json({ error: "Could not price this estimate" }, { status: 400 });
  }

  const calculatorDetails: CalculatorDetailsSnapshot = {
    shape: calculator.shape,
    dims: calculator.dims,
    pitchDeg: calculator.pitchDeg,
    sheetLayout: calculator.sheetLayout,
    wastePct: calculator.wastePct,
    productName: product.name,
    variantLabel: variant.label,
    roofAreaWithWaste: round2(r.roofAreaWithWaste),
    sheetsCount: r.sheetsCount,
    sheetsNote: r.sheetsNote,
    totalLinearMeters: r.totalLinearMeters != null ? round2(r.totalLinearMeters) : null,
    fasteners: r.fasteners,
    accessories: GLOSSARY.map((g) => ({
      label: g.tech,
      length: round2(acc.items[g.key].length),
      pieces: acc.items[g.key].pieces,
    })),
    endCaps: acc.endCaps,
  };

  const reference = generateOrderReference();

  const order = await prisma.order.create({
    data: {
      reference,
      source: "ROOF_CALCULATOR",
      customerName: contact.name,
      customerEmail: contact.email,
      customerPhone: contact.phone,
      deliveryAddress: contact.address || null,
      note: contact.note || null,
      subtotalKobo: r.materialCostKobo,
      calculatorDetails: calculatorDetails as unknown as object,
    },
  });

  const item = await prisma.orderItem.create({
    data: {
      orderId: order.id,
      productId: product.id,
      variantId: variant.id,
      nameSnapshot: product.name,
      variantSnapshot: variant.label,
      unit: product.unit,
      unitPriceKobo: variant.priceKobo,
      quantity: round2(r.roofAreaWithWaste),
      lineTotalKobo: r.materialCostKobo,
    },
  });

  const orderWithItems = { ...order, items: [item] };
  await sendBuyerReceiptEmail(orderWithItems);
  await sendAdminOrderNotice(orderWithItems);

  return NextResponse.json({ reference: order.reference, orderId: order.id });
}
