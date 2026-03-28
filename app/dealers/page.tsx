import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Dealers & Partners | Gods Promise Aluminium',
	description:
		'Information for dealers, distributors and roofing contractors interested in partnering with Gods Promise Aluminium.',
};

export default function DealersPage() {
	return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-primary-foreground">
        <div className="h-1 w-full bg-accent" />
        <div className="container px-4 mx-auto max-w-4xl py-16 md:py-20">
          <p className="text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3">
            Partnership
          </p>
          <h1 className="font-heading uppercase font-bold text-4xl md:text-5xl text-balance">
            Dealers &amp; Partners
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto max-w-4xl space-y-6">
          <p className="text-sm text-muted-foreground md:text-base">
            Gods Promise Aluminium works with dealers, distributors and roofing
            contractors across Nigeria who want a reliable factory-direct supply
            of aluminium roofing sheets from Lagos. Whether you sell roofing
            materials, manage building projects or run an installation business,
            we offer partnership terms that help you serve your customers
            better.
          </p>

          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="font-heading font-bold text-base mb-2">
              Why Partner With Us
            </h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                As a manufacturer, we offer competitive factory-gate pricing
                without middleman markups. Our production facility in Ikorodu,
                Lagos produces long span aluminium roofing sheets, step-tile
                profiles and supplies stone-coated tiles in a wide range of
                colours and thicknesses.
              </p>
              <p>
                Dealers benefit from consistent product quality, flexible order
                sizes and the ability to customise lengths to suit specific
                project requirements. We maintain regular stock of popular
                colours and gauges so you can fulfil your customer orders with
                short lead times.
              </p>
            </div>
          </div>

          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="font-heading font-bold text-base mb-2">
              Who Can Partner
            </h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                We welcome enquiries from building material retailers, roofing
                contractors, project managers, estate developers and wholesale
                distributors across all 36 states and the FCT. Whether you are
                starting a new business or looking to add a dependable aluminium
                roofing supplier to your network, we are open to discussing how
                we can work together.
              </p>
            </div>
          </div>

          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="font-heading font-bold text-base mb-2">
              Partnership Benefits
            </h2>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
              <li>Factory-direct pricing with no middleman</li>
              <li>Custom lengths and profiles produced to order</li>
              <li>Priority production scheduling for regular partners</li>
              <li>Delivery support to your warehouse or project site</li>
              <li>Dedicated account contact for order tracking</li>
              <li>Marketing materials and product samples on request</li>
            </ul>
          </div>

          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="font-heading font-bold text-base mb-2">
              How to Get Started
            </h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                If you are interested in becoming a regular dealer or
                installation partner, please contact us with details of your
                business, location and typical order volumes. You can reach us
                by phone or WhatsApp on +234 915 045 9964 or use the contact
                form on our website.
              </p>
              <p>
                Our team will review your information and follow up to discuss
                pricing, minimum order quantities and how we can support your
                business goals.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
