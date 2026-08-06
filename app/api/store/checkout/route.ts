import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { initializeTransaction, PaystackError } from "@/lib/paystack";
import { generateOrderReference } from "@/lib/store/orders";
import { sendAdminOrderNotice, sendBankTransferInstructionsEmail } from "@/lib/email/order-emails";
import {
  BRANCH_COOKIE,
  loadBranchPrices,
  priceForProduct,
  priceForVariant,
  resolveBranch,
} from "@/lib/store/branch";

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
  paymentMethod: z.enum(["PAYSTACK", "BANK_TRANSFER"]).default("PAYSTACK"),
  // What the cart was showing the customer. Advisory only — never used to
  // price anything, just compared against the real total so we refuse to
  // charge an amount the customer never saw.
  expectedSubtotalKobo: z.number().int().min(0).optional(),
});

// POST /api/store/checkout — public. Prices are re-derived from the database
// for every line (never trusted from the client), a PENDING order is
// created, then a Paystack transaction is initialized against that total.
//
// Which price applies depends on the branch the customer is shopping. That
// comes from the branch cookie and is resolved server-side against published
// branches only — the client never sends a price or a branch id.
export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid checkout payload" }, { status: 400 });
  }
  const { items, customer, paymentMethod, expectedSubtotalKobo } = parsed.data;

  const branch = await resolveBranch(request.cookies.get(BRANCH_COOKIE)?.value ?? null);
  const branchPrices = await loadBranchPrices(branch);

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

    const branchLabel = branch ? ` at our ${branch.shortName} branch` : "";

    if (item.variantId) {
      const variant = product.variants.find((v) => v.id === item.variantId);
      if (!variant) {
        return NextResponse.json({ error: `${product.name}: selected option not found` }, { status: 409 });
      }
      const price = priceForVariant(branchPrices, variant);
      if (!price) {
        return NextResponse.json(
          { error: `${product.name} (${variant.label}) isn't stocked${branchLabel}` },
          { status: 409 },
        );
      }
      if (!price.inStock) {
        return NextResponse.json(
          { error: `${product.name} (${variant.label}) is out of stock${branchLabel}` },
          { status: 409 },
        );
      }
      unitPriceKobo = price.priceKobo;
      variantLabel = variant.label;
    } else {
      if (product.variants.length > 0) {
        return NextResponse.json({ error: `${product.name}: please choose an option` }, { status: 409 });
      }
      const price = priceForProduct(branchPrices, product);
      if (!price) {
        return NextResponse.json(
          { error: `${product.name} isn't stocked${branchLabel}` },
          { status: 409 },
        );
      }
      if (!price.inStock) {
        return NextResponse.json({ error: `${product.name} is out of stock${branchLabel}` }, { status: 409 });
      }
      unitPriceKobo = price.priceKobo;
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

  // The cart lives in localStorage and the branch in a cookie, with nothing
  // tying them together — clear cookies but not site data and the cart can
  // still be showing another branch's prices. Rather than send the customer to
  // Paystack for an amount their cart never displayed, stop and make them
  // re-check. Also catches ordinary price edits made since add-to-cart.
  if (expectedSubtotalKobo != null && expectedSubtotalKobo !== subtotalKobo) {
    return NextResponse.json(
      {
        error: "Prices have changed since you added these items. Please review your cart.",
        code: "SUBTOTAL_MISMATCH",
        subtotalKobo,
      },
      { status: 409 },
    );
  }

  const reference = generateOrderReference();

  // Single-row creates only — a nested `items: { create: [...] }` would start
  // an implicit transaction the Neon HTTP adapter rejects.
  const order = await prisma.order.create({
    data: {
      reference,
      paymentMethod,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      deliveryAddress: customer.address,
      note: customer.note || null,
      subtotalKobo,
      branchId: branch?.id ?? null,
      branchSnapshot: branch?.name ?? null,
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

  if (paymentMethod === "BANK_TRANSFER") {
    const bankDetails = await prisma.bankTransferSettings.findUnique({ where: { id: "singleton" } });
    if (!bankDetails || !bankDetails.bankName || !bankDetails.accountNumber || !bankDetails.accountName) {
      await prisma.order.update({ where: { id: order.id }, data: { status: "CANCELLED" } });
      return NextResponse.json(
        { error: "Bank transfer isn't set up yet — please pay with Paystack or contact us" },
        { status: 503 },
      );
    }

    const orderWithItems = await prisma.order.findUnique({ where: { id: order.id }, include: { items: true } });
    if (orderWithItems) {
      await sendBankTransferInstructionsEmail(orderWithItems, bankDetails);
      await sendAdminOrderNotice(orderWithItems);
    }

    return NextResponse.json({ reference });
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
