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

export interface AdminOrderNoticeEmailProps {
  order: OrderWithItems;
  baseUrl: string;
}

export default function AdminOrderNoticeEmail({ order, baseUrl }: AdminOrderNoticeEmailProps) {
  const isCalculator = order.source === "ROOF_CALCULATOR";
  const heading = isCalculator ? "New Roof Estimate Request" : "New Paid Order";
  const adminUrl = `${baseUrl}/admin/orders/${order.id}`;

  return (
    <Html lang="en">
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Head />
        <Preview>
          {heading} — {order.customerName} — {formatNaira(order.subtotalKobo)}
        </Preview>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="mx-auto max-w-xl bg-white p-6">
            <Heading className="text-xl text-gray-900">{heading}</Heading>
            <Text className="text-base text-gray-800">
              {isCalculator
                ? "A customer submitted a roof sheet calculator estimate and asked to be contacted. No payment has been made yet."
                : "A customer just completed payment on the website."}
            </Text>

            <Section className="my-4 rounded border border-solid border-gray-200 p-4">
              <Text className="m-0 mb-1 text-sm text-gray-800">
                <strong>Reference:</strong> {order.reference}
              </Text>
              <Text className="m-0 mb-1 text-sm text-gray-800">
                <strong>Name:</strong> {order.customerName}
              </Text>
              <Text className="m-0 mb-1 text-sm text-gray-800">
                <strong>Email:</strong> {order.customerEmail}
              </Text>
              <Text className="m-0 mb-1 text-sm text-gray-800">
                <strong>Phone:</strong> {order.customerPhone}
              </Text>
              {order.deliveryAddress && (
                <Text className="m-0 mb-1 text-sm text-gray-800">
                  <strong>Address:</strong> {order.deliveryAddress}
                </Text>
              )}
              {order.note && (
                <Text className="m-0 mb-1 text-sm text-gray-800">
                  <strong>Note:</strong> {order.note}
                </Text>
              )}

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
                {isCalculator ? "Estimated total" : "Amount paid"}: {formatNaira(order.subtotalKobo)}
              </Text>
            </Section>

            <Button
              href={adminUrl}
              className="box-border rounded bg-gray-900 px-5 py-3 text-center text-white no-underline"
            >
              View in Admin
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

AdminOrderNoticeEmail.PreviewProps = {
  baseUrl: "https://www.godspromisealuminiumroofing.com",
  order: {
    id: "ord_1",
    reference: "GPA-EXAMPLE-1234",
    status: "PENDING",
    source: "ROOF_CALCULATOR",
    customerName: "Ada Okafor",
    customerEmail: "ada@example.com",
    customerPhone: "+2348012345678",
    deliveryAddress: null,
    note: "Please call before 5pm",
    subtotalKobo: 45000000,
    calculatorDetails: null,
    paidAt: null,
    paystackId: null,
    channel: null,
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
} satisfies AdminOrderNoticeEmailProps;

export { AdminOrderNoticeEmail };
