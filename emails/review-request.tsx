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

export interface ReviewRequestEmailProps {
  customerName: string;
  orderReference: string;
  reviewUrl: string;
  /** Comma-joined item names, for a concrete reminder of what they bought. */
  itemSummary: string;
}

// Deliberately plain: no incentive, no discount, no "leave us 5 stars".
// Offering something in exchange for a review, or asking only happy customers,
// is review-gating — it breaches Google's policy and the FTC's fake-review
// rule just as squarely as writing the review yourself would.
export default function ReviewRequestEmail({
  customerName,
  orderReference,
  reviewUrl,
  itemSummary,
}: ReviewRequestEmailProps) {
  return (
    <Html lang="en">
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Head />
        <Preview>How did your roofing order turn out?</Preview>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="mx-auto max-w-xl bg-white p-6">
            <Heading className="text-xl text-gray-900">How did it go?</Heading>

            <Text className="text-base text-gray-800">Hi {customerName},</Text>

            <Text className="text-base text-gray-800">
              You ordered {itemSummary} from us a little while back (order{" "}
              {orderReference}). Now that it&rsquo;s on the roof, we&rsquo;d like to know how it
              worked out.
            </Text>

            <Text className="text-base text-gray-800">
              If you have two minutes, your review helps the next homeowner or builder decide
              what to put on their own roof — and tells us where we need to do better.
            </Text>

            <Section className="my-6 text-center">
              <Button
                href={reviewUrl}
                className="rounded bg-[#1a1a1a] px-6 py-3 text-base font-bold text-white"
              >
                Write your review
              </Button>
            </Section>

            <Text className="text-sm text-gray-600">
              Please say what you actually found — an honest three stars is more useful to us
              than a polite five. We publish reviews as written, good or bad, once a member of
              our team has checked they&rsquo;re genuine.
            </Text>

            <Hr className="my-6 border-gray-200" />

            <Text className="text-xs text-gray-500">
              This link is unique to your order and can be used once. If you&rsquo;d rather not
              leave a review, you can ignore this email — we won&rsquo;t ask again about this
              order.
            </Text>

            <Text className="text-xs text-gray-500">
              Gods Promise Aluminium · Pleasure Bus Stop, Alimosho, Lagos
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
