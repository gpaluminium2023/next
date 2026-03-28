import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact Us — Get a Free Roofing Quote | Gods Promise Aluminium",
  description:
    "Contact Gods Promise Aluminium in Sango Ota, Ogun State for quality aluminium roofing sheets, stone-coated tiles and accessories. Free quotes for projects across Lagos and Nigeria.",
};

const PHONE_NUMBERS = [
  "09150459964",
  "07040249854",
  "07060414466",
  "08146074077",
];

const EMAIL_ADDRESS = "godspromisealuminumconceptltd@gmail.com";

const FACTORY_ADDRESS_LINES = [
  "288 Abeokuta Expressway, Pleasure B/Stop",
  "Iyana Ipaja, Lagos State",
  "Nigeria",
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="h-1 w-full bg-accent" />
        <div className="container px-4 mx-auto max-w-6xl py-16 md:py-20">
          <p className="text-accent text-xs uppercase tracking-widest font-heading font-bold mb-3">
            Contact
          </p>
          <h1 className="font-heading uppercase font-bold text-4xl md:text-5xl lg:text-6xl text-balance mb-4">
            Get in Touch
          </h1>
          <p className="text-primary-foreground/80 text-base md:text-lg max-w-2xl">
            Have questions about our aluminium (aluminum) roofing sheets,
            stone-coated tiles or accessories? Contact our team in Ogun State
            and we will respond promptly with a free quote.
          </p>
        </div>
      </section>

      {/* Contact Info Row */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone */}
            <div className="rounded-sm border border-border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center bg-accent mb-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading uppercase font-bold text-lg mb-1">
                Call Us
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Talk directly with our team about your project.
              </p>
              <div className="space-y-1">
                {PHONE_NUMBERS.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone}`}
                    className="block text-sm font-medium hover:text-accent transition-colors tracking-wide"
                  >
                    {phone}
                  </a>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Mon &ndash; Sat, 8:00 AM &ndash; 6:00 PM
              </p>
            </div>

            {/* Email */}
            <div className="rounded-sm border border-border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center bg-accent mb-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading uppercase font-bold text-lg mb-1">
                Email Us
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Send us your building details and requirements.
              </p>
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="text-sm font-medium hover:text-accent transition-colors break-all"
              >
                {EMAIL_ADDRESS}
              </a>
              <p className="text-xs text-muted-foreground mt-3">
                We respond within one business day.
              </p>
            </div>

            {/* Address */}
            <div className="rounded-sm border border-border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center bg-accent mb-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading uppercase font-bold text-lg mb-1">
                Visit Our Factory
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Walk in to discuss your roofing project in person.
              </p>
              <address className="text-sm not-italic leading-relaxed">
                {FACTORY_ADDRESS_LINES.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </address>
            </div>
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div>
              <p className="text-accent text-xs uppercase tracking-widest font-heading font-bold mb-2">
                Send a Message
              </p>
              <h2 className="font-heading uppercase font-bold text-2xl md:text-3xl mb-2">
                Tell Us What You Need
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Fill in the form and we&apos;ll get back to you. We use your
                details only to respond to your enquiry.
              </p>
              <ContactForm />
            </div>

            {/* Map + Hours */}
            <div className="space-y-6">
              {/* Map */}
              <div>
                <p className="text-accent text-xs uppercase tracking-widest font-heading font-bold mb-2">
                  Our Location
                </p>
                <h2 className="font-heading uppercase font-bold text-2xl md:text-3xl mb-4">
                  Find Us
                </h2>
                <div className="rounded-sm overflow-hidden border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7926.261100011551!2d3.3004211!3d6.6307033!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b918c1a8f0dbf%3A0x596f93e7caaf4a77!2sGOD%27S%20PROMISE%20ALUMINUM%20CONCEPT%20LTD!5e0!3m2!1sen!2sng!4v1765657509731!5m2!1sen!2sng"
                    width="100%"
                    height="320"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="God's Promise Aluminium Concept Ltd location on map"
                  />
                </div>
              </div>

              {/* Business Hours */}
              <div className="rounded-sm border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center bg-accent">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-heading uppercase font-bold text-lg">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Monday &ndash; Friday
                    </span>
                    <span className="font-medium">8:00 AM &ndash; 6:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium">9:00 AM &ndash; 4:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium text-destructive">Closed</span>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-xs text-muted-foreground">
                      We aim to respond within 2&ndash;4 hours during business
                      hours, or the next business day after closing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-secondary py-10">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <h3 className="font-heading uppercase font-bold text-xl mb-2">
            Ready to Start Your Roofing Project?
          </h3>
          <p className="text-sm text-muted-foreground mb-6 text-balance">
            From taking accurate measurements to supplying and installing your
            roof, we support you at every step. Share your project details and
            we&apos;ll recommend the right products for your budget.
          </p>
          <Button
            asChild
            className="rounded-sm bg-accent font-heading font-bold uppercase tracking-wide hover:bg-accent/90"
          >
            <Link
              href="https://wa.me/2349150459964"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              WhatsApp Us Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
