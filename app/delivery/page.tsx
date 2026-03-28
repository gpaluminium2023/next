import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Delivery & Coverage Areas | Gods Promise Aluminium',
	description:
		'Information about how Gods Promise Aluminium delivers aluminium roofing sheets from Lagos to projects across Nigeria, including typical timelines and requirements.',
};

export default function DeliveryPage() {
	return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-primary-foreground">
        <div className="h-1 w-full bg-accent" />
        <div className="container px-4 mx-auto max-w-4xl py-16 md:py-20">
          <p className="text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3">
            Logistics
          </p>
          <h1 className="font-heading uppercase font-bold text-4xl md:text-5xl text-balance">
            Delivery &amp; Coverage Areas
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto max-w-4xl space-y-6">
          <p className="text-sm text-muted-foreground md:text-base">
            Gods Promise Aluminium is based in Ikorodu, Lagos and delivers
            aluminium roofing sheets and accessories to building projects across
            Nigeria. We handle logistics in-house for Lagos deliveries and
            coordinate with trusted transport partners for interstate shipments.
          </p>

          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="font-heading font-bold text-base mb-2">
              Lagos Deliveries
            </h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                For projects within Lagos State, delivery typically happens on
                the same day or the next working day after your order is
                produced and confirmed. We cover all areas of Lagos including
                Lekki, Ajah, Victoria Island, Ikeja, Festac, Ikorodu, Epe,
                Badagry and Alimosho.
              </p>
              <p>
                Delivery cost within Lagos depends on the distance from our
                factory and the volume of materials. Our team will include the
                delivery charge on your quotation.
              </p>
            </div>
          </div>

          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="font-heading font-bold text-base mb-2">
              Deliveries to Other States
            </h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                We regularly arrange deliveries to nearby states such as Ogun,
                Oyo, Osun, Ondo, Ekiti and Kwara, as well as to the South-South
                and South-East regions including Edo, Delta, Rivers, Anambra and
                Enugu. Deliveries to the North are also available upon request.
              </p>
              <p>
                For interstate shipments, transport cost and timeline depend on
                the destination, order size and available logistics. We will
                confirm the delivery fee and expected arrival date when
                preparing your quote.
              </p>
            </div>
          </div>

          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="font-heading font-bold text-base mb-2">
              Delivery Timeline
            </h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                Production of aluminium roofing sheets takes one to three
                working days depending on order volume. Once production is
                complete, Lagos deliveries are dispatched within 24 hours.
                Interstate deliveries typically arrive two to five working days
                after dispatch, depending on distance and road conditions.
              </p>
            </div>
          </div>

          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="font-heading font-bold text-base mb-2">
              What to Know Before Delivery
            </h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                We confirm all quantities, colours and thicknesses with you
                before loading. We also encourage customers to verify their
                order at our factory when possible so that any concerns are
                resolved before the materials leave our premises.
              </p>
              <p>
                Please ensure there is safe access for the delivery truck at
                your project site, and that a team is available to receive and
                offload the materials on arrival. Roofing sheets should be
                stored on a flat, dry surface and protected from the elements
                until installation begins.
              </p>
            </div>
          </div>

          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="font-heading font-bold text-base mb-2">
              Arrange Your Delivery
            </h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                To get a delivery estimate for your project, contact us with
                your location and order details. Call or WhatsApp us on +234 915
                045 9964 or use the contact form on our website. We will include
                the delivery cost and timeline in your quotation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
