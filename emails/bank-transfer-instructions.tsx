import {
  Body,
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

export interface BankTransferInstructionsEmailProps {
  order: OrderWithItems;
  bankName: string;
  accountNumber: string;
  accountName: string;
  instructions?: string | null;
}

export default function BankTransferInstructionsEmail({
  order,
  bankName,
  accountNumber,
  accountName,
  instructions,
}: BankTransferInstructionsEmailProps) {
  return (
    <Html lang="en">
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Head />
        <Preview>
          Pay {formatNaira(order.subtotalKobo)} by bank transfer for order {order.reference}
        </Preview>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="mx-auto max-w-xl bg-white p-6">
            <Heading className="text-xl text-gray-900">Complete Your Payment by Bank Transfer</Heading>
            <Text className="text-base text-gray-800">Hi {order.customerName},</Text>
            <Text className="text-base text-gray-800">
              Thanks for your order. It isn&rsquo;t confirmed yet — transfer the amount below to our account,
              using your order reference as the transfer description, and we&rsquo;ll email you a receipt once
              we&rsquo;ve confirmed it.
            </Text>

            <Section className="my-4 rounded border border-solid border-gray-200 p-4">
              <Text className="m-0 text-xs uppercase tracking-wide text-gray-500">Reference (use as transfer description)</Text>
              <Text className="m-0 mb-3 text-lg font-bold text-gray-900">{order.reference}</Text>
              <Hr className="my-3 border-solid border-gray-200" />
              <Text className="m-0 mb-1 text-sm text-gray-800">
                <strong>Bank:</strong> {bankName}
              </Text>
              <Text className="m-0 mb-1 text-sm text-gray-800">
                <strong>Account Number:</strong> {accountNumber}
              </Text>
              <Text className="m-0 mb-1 text-sm text-gray-800">
                <strong>Account Name:</strong> {accountName}
              </Text>
              <Hr className="my-3 border-solid border-gray-200" />
              <Text className="m-0 text-base font-bold text-gray-900">
                Amount to pay: {formatNaira(order.subtotalKobo)}
              </Text>
              {instructions && (
                <>
                  <Hr className="my-3 border-solid border-gray-200" />
                  <Text className="m-0 text-sm text-gray-800">{instructions}</Text>
                </>
              )}
            </Section>

            <Text className="mt-6 text-sm text-gray-600">
              Delivery isn&rsquo;t included in this amount — our team will reach out on WhatsApp to quote
              delivery and arrange a time once payment is confirmed.
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

BankTransferInstructionsEmail.PreviewProps = {
  bankName: "Guaranty Trust Bank",
  accountNumber: "0123456789",
  accountName: "Gods Promise Aluminium Concept Limited",
  instructions: "Please use your order reference as the transfer description so we can match it quickly.",
  order: {
    id: "ord_1",
    reference: "GPA-EXAMPLE-1234",
    status: "PENDING",
    source: "STORE",
    paymentMethod: "BANK_TRANSFER",
    customerName: "Ada Okafor",
    customerEmail: "ada@example.com",
    customerPhone: "+2348012345678",
    deliveryAddress: "12 Admiralty Way, Lekki, Lagos",
    note: null,
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
} satisfies BankTransferInstructionsEmailProps;

export { BankTransferInstructionsEmail };
