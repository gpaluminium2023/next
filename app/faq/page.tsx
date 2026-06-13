import type { Metadata } from 'next';

import { siteIdentity } from "@/lib/site-identity";

export const metadata: Metadata = {
  alternates: { canonical: "/faq" },
  title:
    "Aluminium Roofing FAQs — Prices, Sizes & Installation | Gods Promise Aluminium",
  description:
    "Answers to common questions about aluminium (aluminum) roofing sheet prices, thickness, delivery and installation from Gods Promise Aluminium in Lagos, Nigeria.",
};

const faqs = [
  {
    question: "How much do aluminium roofing sheets cost in Lagos?",
    answer:
      "Aluminium roofing sheet prices in Lagos depend on the profile, thickness and colour you choose. Long span sheets, step tiles, Metcopo and stone-coated tiles are all priced differently. Contact us on WhatsApp for a current price list and a firm quote for your project. You can also visit our Pricing page for the latest rates.",
  },
  {
    question: "How long do aluminium roofing sheets last?",
    answer:
      "Good-quality aluminium roofing sheets can last 25 to 40 years or more when properly installed and maintained. Lifespan depends on the thickness (gauge), coating quality, installation workmanship, and local weather conditions. We recommend at least 0.55mm for coastal or high-wind locations.",
  },
  {
    question: "Do you deliver aluminium roofing sheets outside Lagos?",
    answer:
      "Yes. Gods Promise Aluminium is based in Lagos but we supply and arrange delivery to projects across Nigeria. We regularly deliver to Ogun, Oyo, Osun, Ondo, Edo, Delta, Rivers and other states. Delivery cost depends on your location, order size and the transport arrangement required.",
  },
  {
    question: "What thickness of aluminium roofing sheet should I choose?",
    answer:
      "The best thickness depends on your budget, project type and location. As a general guide, 0.45mm is common for budget-friendly residential projects while 0.55mm is preferred where extra durability and wind resistance are required, such as in coastal areas or large commercial buildings. Our team can advise when you share your project details.",
  },
  {
    question: "Are your aluminium roofing sheets suitable for coastal areas?",
    answer:
      "Yes, but we recommend 0.55mm or thicker profiles for coastal locations where salt air and higher humidity are factors. Thicker sheets offer better corrosion resistance and stand up better to strong coastal winds. Contact us to discuss the best profile and thickness for your coastal project.",
  },
  {
    question: "What types of aluminium roofing do you manufacture?",
    answer:
      "We produce long span aluminium roofing sheets, step-tile aluminium roofing sheets and Metcopo roofing sheets. We also supply premium Gerard stone-coated roofing tiles and stock roofing accessories including ridge caps, valley gutters, downpipes, roofing nails and flashings.",
  },
  {
    question: "How do I get a price quote for my roofing project?",
    answer: `Contact us by phone or WhatsApp on ${siteIdentity.phoneDisplay} with details of your project including the roof area, preferred profile type, thickness and colour. You can also use the contact form on our website. We typically respond with a formal quotation within a few hours during business days.`,
  },
  {
    question: "What colours are available for aluminium roofing sheets?",
    answer:
      "We offer a wide range of colours including wine red, dark blue, forest green, charcoal grey, black, off-white and brown. Colour availability may vary depending on current coil stock, so we recommend confirming your preferred colour with us before placing your order.",
  },
  {
    question: "How long does production and delivery take?",
    answer:
      "Production of aluminium roofing sheets typically takes one to three working days depending on order size and current workload. Delivery within Lagos usually happens the same day or next day after production. Deliveries to other states are scheduled based on logistics and typically take two to five additional days.",
  },
  {
    question: "Can I visit your factory to inspect my order before delivery?",
    answer: `Absolutely. We encourage all customers to visit our factory at ${siteIdentity.address.formatted} to inspect their roofing sheets before dispatch. This allows you to verify the thickness, colour, profile and quantity in person before the materials leave our premises.`,
  },
  {
    question: "Do you offer installation services?",
    answer:
      "Yes. In addition to manufacturing and supplying roofing materials, we also provide professional roofing installation services through our experienced team. We can handle the full process from material supply to on-site installation for residential, commercial and religious buildings.",
  },
  {
    question: "Where is your factory located?",
    answer: `Our aluminium roofing sheet factory is located at ${siteIdentity.address.formatted}. We are one of the leading aluminum roofing companies in Lagos. Customers from across Nigeria are welcome to visit, inspect products and place orders directly at our facility.`,
  },
  {
    question:
      "What is the difference between aluminium roofing sheets and stone-coated tiles?",
    answer:
      "Aluminium roofing sheets (long span and step-tile profiles) are lightweight, cost-effective and quick to install, making them the most popular choice for residential and commercial buildings in Nigeria. Stone-coated roofing tiles are a premium option that combine the lightweight properties of metal with a textured, stone-chip finish for a more decorative appearance and extra weather resistance.",
  },
  {
    question: "Do your aluminium roofing sheets come with a warranty?",
    answer:
      "We stand behind the quality of every product we supply. Each order is produced to the agreed specifications and customers are encouraged to verify materials before dispatch. If you notice any defects or issues with your sheets, please contact us immediately with your invoice number and photographs so we can investigate and resolve the matter promptly.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="bg-primary text-primary-foreground">
        <div className="h-1 w-full bg-accent" />
        <div className="container px-4 mx-auto max-w-4xl py-16 md:py-20">
          <p className="text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3">
            Support
          </p>
          <h1 className="font-heading uppercase font-bold text-4xl md:text-5xl text-balance">
            Frequently Asked Questions
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto max-w-4xl space-y-4">
          <p className="text-sm text-muted-foreground md:text-base mb-4">
            Below are the questions we hear most often from homeowners, builders
            and contractors who contact Gods Promise Aluminium about aluminum
            roofing sheets, pricing, delivery and installation in Lagos and
            across Nigeria. If your question is not answered here, please call
            or WhatsApp us on {siteIdentity.phoneDisplay} for a prompt response.
          </p>
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-sm border border-border bg-card p-6"
            >
              <h2 className="font-heading font-bold text-base mb-2">
                {faq.question}
              </h2>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
