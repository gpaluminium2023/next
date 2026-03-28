import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Terms & Conditions | Gods Promise Aluminium',
	description:
		'Basic terms and conditions for using this website and purchasing aluminium roofing products from Gods Promise Aluminium.',
};

export default function TermsPage() {
	return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-primary-foreground">
        <div className="h-1 w-full bg-accent" />
        <div className="container px-4 mx-auto max-w-4xl py-16 md:py-20">
          <p className="text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3">
            Legal
          </p>
          <h1 className="font-heading uppercase font-bold text-4xl md:text-5xl text-balance">
            Terms &amp; Conditions
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto max-w-4xl space-y-8 text-sm text-muted-foreground">
          <p className="md:text-base">
            These are general terms for visitors and customers of Gods Promise
            Aluminium. By using this website or purchasing products from us, you
            agree to the following terms. Please read them carefully before
            placing an order.
          </p>

          <div className="space-y-2">
            <h2 className="font-heading font-bold text-base text-foreground">
              Orders and Quotations
            </h2>
            <p>
              All orders are subject to written quotations provided by Gods
              Promise Aluminium. Prices quoted are valid for a limited period
              and may change due to fluctuations in raw material costs. An order
              is confirmed only when payment has been received in line with the
              agreed terms on the invoice.
            </p>
            <p>
              We recommend that customers confirm all specifications — including
              sheet thickness, profile type, colour and quantity — before
              production begins. Changes requested after production has started
              may attract additional charges or delays.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-heading font-bold text-base text-foreground">
              Products and Specifications
            </h2>
            <p>
              Gods Promise Aluminium manufactures and supplies aluminium roofing
              sheets, stone-coated roofing tiles, and related accessories.
              Product images on this website are for illustration purposes and
              actual colours may vary slightly due to screen settings and
              production batches.
            </p>
            <p>
              We make every effort to supply materials that meet the agreed
              specifications. Customers are encouraged to inspect their order at
              our factory before dispatch to confirm satisfaction with the
              goods.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-heading font-bold text-base text-foreground">
              Pricing and Payment
            </h2>
            <p>
              All prices on this website are indicative and may not reflect the
              final price for your order. Definitive pricing is provided through
              a formal quotation based on your project requirements. Payment
              terms are outlined on each invoice and must be fulfilled before
              goods are released for delivery.
            </p>
            <p>
              We accept bank transfers, cash payments at our factory and other
              payment methods as communicated to you during the ordering
              process. All payments should be made to official Gods Promise
              Aluminium accounts only.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-heading font-bold text-base text-foreground">
              Delivery
            </h2>
            <p>
              Delivery timelines provided are estimates and may vary depending
              on order size, location and logistics availability. Gods Promise
              Aluminium is not liable for delays caused by factors beyond our
              control such as traffic, road conditions or weather.
            </p>
            <p>
              The customer is responsible for ensuring that the delivery site is
              accessible for the transport vehicle and that a team is available
              to receive and offload the materials upon arrival.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-heading font-bold text-base text-foreground">
              Returns and Cancellations
            </h2>
            <p>
              Because aluminium roofing sheets are custom produced for each
              order, cancellations after production has commenced are generally
              not accepted. Returns are handled on a case-by-case basis and
              require prior approval from our team.
            </p>
            <p>
              If you receive goods that are damaged in transit or do not match
              your confirmed order, please notify us within 48 hours with your
              invoice number and clear photographs of the issue.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-heading font-bold text-base text-foreground">
              Limitation of Liability
            </h2>
            <p>
              Gods Promise Aluminium's liability is limited to the value of the
              goods supplied. We are not responsible for losses arising from
              improper installation, misuse of products, or failure to follow
              installation guidelines provided by our team.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-heading font-bold text-base text-foreground">
              Website Use
            </h2>
            <p>
              The content on this website including text, images and pricing
              information is owned by Gods Promise Aluminium and is provided for
              informational purposes only. Reproduction or redistribution of any
              content without our written permission is prohibited.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-heading font-bold text-base text-foreground">
              Changes to These Terms
            </h2>
            <p>
              We reserve the right to update these terms and conditions at any
              time. Changes will be posted on this page and take effect
              immediately. Continued use of this website or placement of orders
              after changes have been published constitutes acceptance of the
              updated terms.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-heading font-bold text-base text-foreground">
              Contact
            </h2>
            <p>
              For questions about these terms and conditions, please contact
              Gods Promise Aluminium by phone at{" "}
              <span className="text-foreground">+234 915 045 9964</span>, by
              email at{" "}
              <span className="text-foreground">
                godspromisealuminium@gmail.com
              </span>
              , or visit us at 55 Owutu Road, Ikorodu, Lagos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
