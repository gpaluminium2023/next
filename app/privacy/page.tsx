import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Privacy Policy | Gods Promise Aluminium',
	description:
		'How Gods Promise Aluminium handles personal information collected through this website, contact forms and WhatsApp enquiries.',
};

export default function PrivacyPage() {
	return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-primary-foreground">
        <div className="h-1 w-full bg-accent" />
        <div className="container px-4 mx-auto max-w-4xl py-16 md:py-20">
          <p className="text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3">
            Legal
          </p>
          <h1 className="font-heading uppercase font-bold text-4xl md:text-5xl text-balance">
            Privacy Policy
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto max-w-4xl space-y-8 text-sm text-muted-foreground">
          <p className="md:text-base">
            This page explains, in simple terms, what information we collect,
            how we use it, and how you can contact us with any privacy
            questions. Gods Promise Aluminium is committed to protecting the
            personal data of every visitor, customer and business partner who
            interacts with us.
          </p>

          <div className="space-y-2">
            <h2 className="font-heading font-bold text-base text-foreground">
              Information We Collect
            </h2>
            <p>
              When you contact us by phone, WhatsApp, email or through the forms
              on this website, we may collect your name, phone number, email
              address, delivery address and project details. We only collect
              information that is necessary to respond to your enquiry, prepare
              accurate quotes and process your orders.
            </p>
            <p>
              If you visit our factory or showroom, we may also record basic
              contact details for follow-up purposes.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-heading font-bold text-base text-foreground">
              How We Use Your Information
            </h2>
            <p>
              Your personal information is used to communicate with you about
              your roofing project, provide price quotations, arrange
              deliveries, process payments and offer after-sales support. We may
              also use your contact details to notify you of important product
              updates or changes to our services.
            </p>
            <p>
              We do not sell, rent or share your personal data with third
              parties for marketing purposes. Your information may be shared
              with trusted logistics partners solely to fulfil delivery of your
              order.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-heading font-bold text-base text-foreground">
              Cookies and Website Analytics
            </h2>
            <p>
              This website may use cookies and analytics tools to understand how
              visitors interact with our pages. This helps us improve the
              website experience for all users. Cookies do not collect
              personally identifiable information unless you voluntarily submit
              it through a form.
            </p>
            <p>
              You can disable cookies in your browser settings at any time,
              though some features of the website may not function as intended.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-heading font-bold text-base text-foreground">
              Data Security
            </h2>
            <p>
              We take reasonable measures to protect the information you share
              with us from unauthorised access, loss or misuse. However, no
              method of electronic transmission or storage is completely secure,
              and we cannot guarantee absolute security.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-heading font-bold text-base text-foreground">
              Data Retention
            </h2>
            <p>
              We retain your personal data only for as long as it is needed to
              fulfil the purposes described above or as required by Nigerian
              law. Once your information is no longer needed, it is securely
              deleted or anonymised.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-heading font-bold text-base text-foreground">
              Your Rights
            </h2>
            <p>
              You have the right to request access to the personal information
              we hold about you, ask for corrections to any inaccurate details,
              or request that we delete your data where it is no longer
              required. To exercise any of these rights, please contact us using
              the details below.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-heading font-bold text-base text-foreground">
              Changes to This Policy
            </h2>
            <p>
              We may update this privacy policy from time to time to reflect
              changes in our operations or legal requirements. Any significant
              changes will be posted on this page with the updated effective
              date.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-heading font-bold text-base text-foreground">
              Contact Us
            </h2>
            <p>
              If you have any questions about this privacy policy or how your
              personal data is handled, please contact Gods Promise Aluminium by
              phone at{" "}
              <span className="text-foreground">+234 915 045 9964</span>, by
              email at{" "}
              <span className="text-foreground">
                godspromisealuminium@gmail.com
              </span>
              , or visit our factory at 55 Owutu Road, Ikorodu, Lagos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
