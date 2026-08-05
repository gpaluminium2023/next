import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  pixelBasedPreset,
} from "@react-email/components";
import { formatNaira } from "@/lib/store/format";
import type { OrderWithItems } from "@/lib/store/order-types";

export interface OrderReceiptEmailProps {
  order: OrderWithItems;
  baseUrl: string;
}

export default function OrderReceiptEmail({ order, baseUrl }: OrderReceiptEmailProps) {
  const isCalculator = order.source === "ROOF_CALCULATOR";
  const heading = isCalculator ? "Your Roof Sheet Estimate" : "Payment Receipt";
  const receiptUrl = `${baseUrl}/api/orders/${order.reference}/receipt`;

  return (
    <Html lang="en">
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Head />
        <Preview>
          {isCalculator
            ? `Your roof estimate ${order.reference} — ${formatNaira(order.subtotalKobo)}`
            : `Receipt for order ${order.reference} — ${formatNaira(order.subtotalKobo)}`}
        </Preview>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="mx-auto max-w-xl bg-white p-6">
            <Heading className="text-xl text-gray-900">{heading}</Heading>
            <Text className="text-base text-gray-800">Hi {order.customerName},</Text>
            <Text className="text-base text-gray-800">
              {isCalculator
                ? "Thanks for using the roof sheet calculator. Here is a copy of the estimate you just generated — treat it as a solid working figure, not a final invoice. Our team will confirm exact costs before you pay anything."
                : "Thank you for your payment — we've received your order. This email is your receipt; keep the reference number below for any follow-up."}
            </Text>

            <Section className="my-4 rounded border border-solid border-gray-200 p-4">
              <Text className="m-0 text-xs uppercase tracking-wide text-gray-500">Reference</Text>
              <Text className="m-0 mb-3 text-lg font-bold text-gray-900">{order.reference}</Text>
              <Hr className="my-3 border-solid border-gray-200" />
              {order.items.map((item) => (
                <Text key={item.id} className="m-0 mb-2 text-sm text-gray-800">
                  {item.nameSnapshot}
                  {item.variantSnapshot ? ` (${item.variantSnapshot})` : ""} — {item.quantity} {item.unit} —{" "}
                  {formatNaira(item.lineTotalKobo)}
                </Text>
              ))}
              <Hr className="my-3 border-solid border-gray-200" />
              <Text className="m-0 text-base font-bold text-gray-900">
                {isCalculator ? "Estimated total" : "Total paid"}: {formatNaira(order.subtotalKobo)}
              </Text>
            </Section>

            <Button
              href={receiptUrl}
              className="box-border rounded bg-gray-900 px-5 py-3 text-center text-white no-underline"
            >
              Download {isCalculator ? "Estimate" : "Receipt"} (PDF)
            </Button>

            <Text className="mt-6 text-sm text-gray-600">
              {isCalculator
                ? "Message us on WhatsApp with this reference and we'll confirm your quote and next steps."
                : "Delivery isn't included in this payment — our team will reach out on WhatsApp to quote delivery and arrange a time."}
            </Text>

            <Hr className="my-5 border-solid border-gray-200" />
            <Text className="m-0 text-xs text-gray-500">Gods Promise Aluminium Concept Limited</Text>
            <Text className="m-0 text-xs text-gray-500">Pleasure Bus Stop, Alimosho, Lagos, Nigeria</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

OrderReceiptEmail.PreviewProps = {
  baseUrl: "https://www.godspromisealuminiumroofing.com",
  order: {
    id: "ord_1",
    reference: "GPA-EXAMPLE-1234",
    status: "PAID",
    source: "STORE",
    paymentMethod: "PAYSTACK",
    customerName: "Ada Okafor",
    customerEmail: "ada@example.com",
    customerPhone: "+2348012345678",
    deliveryAddress: "12 Admiralty Way, Lekki, Lagos",
    note: null,
    subtotalKobo: 45000000,
    calculatorDetails: null,
    paidAt: new Date(),
    paystackId: "123456",
    channel: "card",
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [
      {
        id: "item_1",
        orderId: "ord_1",
        productId: "prod_1",
        variantId: "var_1",
        nameSnapshot: "Long Span Aluminium Roofing Sheet",
        variantSnapshot: "0.45mm",
        unit: "sqm",
        unitPriceKobo: 500000,
        quantity: 90,
        lineTotalKobo: 45000000,
      },
    ],
  },
} satisfies OrderReceiptEmailProps;

export { OrderReceiptEmail };
