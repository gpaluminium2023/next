import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: "/warranty" },
  title: "Roofing Warranty & Returns Policy | Gods Promise Aluminium",
  description:
    "Overview of product warranty, quality checks and returns process for aluminium roofing sheets supplied by Gods Promise Aluminium.",
};

export default function WarrantyPage() {
	return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-primary-foreground">
        <div className="h-1 w-full bg-accent" />
        <div className="container px-4 mx-auto max-w-4xl py-16 md:py-20">
          <p className="text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3">
            Quality
          </p>
          <h1 className="font-heading uppercase font-bold text-4xl md:text-5xl text-balance">
            Warranty &amp; Returns
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto max-w-4xl space-y-6">
          <p className="text-sm text-muted-foreground md:text-base">
            Gods Promise Aluminium is committed to delivering high-quality
            roofing materials that meet the agreed specifications for every
            order. This page outlines our approach to product quality, what is
            covered if something goes wrong, and how to contact us with any
            concerns.
          </p>

          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="font-heading font-bold text-base mb-2">
              Product Quality and Checks
            </h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                Each order is produced to the agreed thickness, profile and
                colour using quality aluminium coils sourced from reputable
                suppliers. Our production team inspects the raw materials before
                manufacturing begins and carries out checks during the rolling
                and cutting process to ensure consistency.
              </p>
              <p>
                We encourage customers to verify their materials at our factory
                before dispatch. This allows you to confirm that the sheet
                thickness, colour, profile type and quantity match your order
                before the goods leave our premises.
              </p>
            </div>
          </div>

          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="font-heading font-bold text-base mb-2">
              What Is Covered
            </h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                If your aluminium roofing sheets arrive with manufacturing
                defects such as incorrect thickness, wrong colour, damaged
                coating or profile irregularities that were not caused during
                transit or handling, Gods Promise Aluminium will investigate the
                issue and work with you to provide a fair resolution.
              </p>
              <p>
                Resolutions may include replacement of defective sheets, credit
                towards a future order, or repair at our discretion depending on
                the nature and extent of the issue.
              </p>
            </div>
          </div>

          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="font-heading font-bold text-base mb-2">
              What Is Not Covered
            </h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                Our warranty does not cover damage resulting from improper
                installation, mishandling during offloading, exposure to harsh
                chemicals, or modifications made to the sheets after delivery.
                Normal wear and tear, including gradual colour fading from
                prolonged sun exposure, is also excluded.
              </p>
              <p>
                Sheets that have been cut, bent or altered on site are
                considered accepted as-is and are not eligible for replacement
                or credit.
              </p>
            </div>
          </div>

          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="font-heading font-bold text-base mb-2">
              How to Report an Issue
            </h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                If you notice any problems with your roofing sheets, please
                contact us as soon as possible — ideally within 48 hours of
                delivery. Provide your invoice number, a description of the
                issue and clear photographs showing the defect. This helps our
                team assess the situation quickly and determine the best course
                of action.
              </p>
              <p>
                You can reach us by phone or WhatsApp on +234 915 045 9964 or by
                email at godspromisealuminium@gmail.com.
              </p>
            </div>
          </div>

          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="font-heading font-bold text-base mb-2">
              Returns and Complaints
            </h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                Because aluminium sheets are custom produced for each order
                based on your chosen thickness, colour and length, returns are
                handled on a case-by-case basis. We do not accept returns for
                change-of-mind purchases or orders that match the confirmed
                specifications.
              </p>
              <p>
                Our goal is always to resolve genuine issues fairly and
                promptly. We value long-term customer relationships and will
                work with you to find a satisfactory outcome for valid
                complaints.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
