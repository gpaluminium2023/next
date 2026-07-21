import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { initializeTransaction, PaystackError } from "@/lib/paystack";
import { generateOrderReference } from "@/lib/store/orders";

const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        variantId: z.string().nullable(),
        quantity: z.number().int().min(1).max(500),
      }),
    )
    .min(1),
  customer: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7),
    address: z.string().min(5),
    note: z.string().optional(),
  }),
});

// POST /api/store/checkout — public. Prices are re-derived from the database
// for every line (never trusted from the client), a PENDING order is
// created, then a Paystack transaction is initialized against that total.
export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid checkout payload" }, { status: 400 });
  }
  const { items, customer } = parsed.data;

  interface ResolvedItem {
    productId: string;
    variantId: string | null;
    nameSnapshot: string;
    variantSnapshot: string | null;
    unit: string;
    unitPriceKobo: number;
    quantity: number;
    lineTotalKobo: number;
  }

  const resolved: ResolvedItem[] = [];

  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
      include: { variants: true },
    });

    if (!product || !product.published) {
      return NextResponse.json({ error: "One of the items in your cart is no longer available" }, { status: 409 });
    }

    let unitPriceKobo: number;
    let variantLabel: string | null = null;

    if (item.variantId) {
      const variant = product.variants.find((v) => v.id === item.variantId);
      if (!variant) {
        return NextResponse.json({ error: `${product.name}: selected option not found` }, { status: 409 });
      }
      if (!variant.inStock) {
        return NextResponse.json({ error: `${product.name} (${variant.label}) is out of stock` }, { status: 409 });
      }
      unitPriceKobo = variant.priceKobo;
      variantLabel = variant.label;
    } else {
      if (product.variants.length > 0) {
        return NextResponse.json({ error: `${product.name}: please choose an option` }, { status: 409 });
      }
      if (!product.inStock || product.basePriceKobo == null) {
        return NextResponse.json({ error: `${product.name} is out of stock` }, { status: 409 });
      }
      unitPriceKobo = product.basePriceKobo;
    }

    resolved.push({
      productId: product.id,
      variantId: item.variantId,
      nameSnapshot: product.name,
      variantSnapshot: variantLabel,
      unit: product.unit,
      unitPriceKobo,
      quantity: item.quantity,
      lineTotalKobo: unitPriceKobo * item.quantity,
    });
  }

  const subtotalKobo = resolved.reduce((sum, i) => sum + i.lineTotalKobo, 0);
  if (subtotalKobo <= 0) {
    return NextResponse.json({ error: "Cart total must be greater than zero" }, { status: 400 });
  }

  const reference = generateOrderReference();

  // Single-row creates only — a nested `items: { create: [...] }` would start
  // an implicit transaction the Neon HTTP adapter rejects.
  const order = await prisma.order.create({
    data: {
      reference,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      deliveryAddress: customer.address,
      note: customer.note || null,
      subtotalKobo,
    },
  });

  for (const item of resolved) {
    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: item.productId,
        variantId: item.variantId,
        nameSnapshot: item.nameSnapshot,
        variantSnapshot: item.variantSnapshot,
        unit: item.unit,
        unitPriceKobo: item.unitPriceKobo,
        quantity: item.quantity,
        lineTotalKobo: item.lineTotalKobo,
      },
    });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? request.nextUrl.origin;

  try {
    const { authorization_url } = await initializeTransaction({
      email: customer.email,
      amountKobo: subtotalKobo,
      reference,
      callbackUrl: `${baseUrl}/checkout/callback`,
      metadata: {
        orderId: order.id,
        custom_fields: [{ display_name: "Order Reference", variable_name: "order_reference", value: reference }],
      },
    });

    return NextResponse.json({ authorization_url, reference });
  } catch (err) {
    await prisma.order.update({ where: { id: order.id }, data: { status: "CANCELLED" } });
    const message = err instanceof PaystackError ? err.message : "Could not start payment";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
