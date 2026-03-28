import Link from "next/link";
import {
  Facebook,
  Ghost,
  Hash,
  Instagram,
  Mail,
  MessageCircle,
  Music2,
  Twitter,
  Youtube,
} from "lucide-react";
import { Separator } from "./ui/separator";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground">
            Gods Promise Aluminium
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Nigeria&apos;s trusted provider of premium aluminium roofing and
            construction materials. We help homeowners, builders, and churches
            protect what matters most with durable, beautiful roofs.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              Quick links
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Products</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/products#roofing"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Aluminium roofing sheets
                </Link>
              </li>
              <li>
                <Link
                  href="/products#stone-coated"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Stone coated tiles
                </Link>
              </li>
              <li>
                <Link
                  href="/products#accessories"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Roofing accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  View all products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">
              More information
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/pricing"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Pricing & quotes
                </Link>
              </li>
              <li>
                <Link
                  href="/delivery"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Delivery & coverage
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Projects & case studies
                </Link>
              </li>
              <li>
                <Link
                  href="/dealers"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Dealers & partners
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Warranty & returns
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Terms & conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">
              Contact & social
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <a
                  href="mailto:godspromisealuminumconceptltd@gmail.com"
                  className="transition-colors hover:text-foreground"
                >
                  godspromisealuminumconceptltd@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MessageCircle className="h-4 w-4 shrink-0" />
                <a
                  href="https://wa.me/2349150459964"
                  target="_blank"
                  rel="noopener nofollow"
                  className="transition-colors hover:text-foreground"
                >
                  WhatsApp: +2349150459964
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Instagram className="h-4 w-4 shrink-0" />
                <a
                  href="https://www.instagram.com/godspacltd?igsh=dWxybXJrOTBhbXJi"
                  target="_blank"
                  rel="noopener nofollow"
                  className="transition-colors hover:text-foreground"
                >
                  Instagram
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Facebook className="h-4 w-4 shrink-0" />
                <a
                  href="https://www.facebook.com/share/1G88rStYo2/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener nofollow"
                  className="transition-colors hover:text-foreground"
                >
                  Facebook
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Twitter className="h-4 w-4 shrink-0" />
                <a
                  href="https://x.com/GODSPACLTDROOF?t=og3JQ66r07ChmIkRYQbGkQ&s=09"
                  target="_blank"
                  rel="noopener nofollow"
                  className="transition-colors hover:text-foreground"
                >
                  X (Twitter)
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Youtube className="h-4 w-4 shrink-0" />
                <a
                  href="https://youtube.com/@godspromisealuminumconceptltd?si=WoIqnLBIX-t9cX4s"
                  target="_blank"
                  rel="noopener nofollow"
                  className="transition-colors hover:text-foreground"
                >
                  YouTube
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Music2 className="h-4 w-4 shrink-0" />
                <a
                  href="https://www.tiktok.com/@godspromiseroofing_1"
                  target="_blank"
                  rel="noopener nofollow"
                  className="transition-colors hover:text-foreground"
                >
                  TikTok
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Hash className="h-4 w-4 shrink-0" />
                <a
                  href="https://www.threads.com/@godspacltd"
                  target="_blank"
                  rel="noopener nofollow"
                  className="transition-colors hover:text-foreground"
                >
                  Threads
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Ghost className="h-4 w-4 shrink-0" />
                <a
                  href="https://www.snapchat.com/add/godspacltd_2?share_id=6Rid9tirHwM&locale=en-US"
                  target="_blank"
                  rel="noopener nofollow"
                  className="transition-colors hover:text-foreground"
                >
                  Snapchat
                </a>
              </li>
            </ul>

            <div className="mt-4 border-t border-border pt-4">
              <h4 className="text-sm font-semibold text-foreground">
                Working hours
              </h4>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>Mon – Fri: 8:00 AM – 5:00 PM</li>
                <li>Saturday: 9:00 AM – 2:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Location links */}
        <div className="mt-8 border-t border-border pt-6">
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Locations we serve
          </h4>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {[
              { name: "Lagos", slug: "lagos" },
              { name: "Ogun", slug: "ogun" },
              { name: "Abuja", slug: "abuja" },
              { name: "Rivers", slug: "rivers" },
              { name: "Oyo", slug: "oyo" },
              { name: "Kano", slug: "kano" },
              { name: "Edo", slug: "edo" },
              { name: "Delta", slug: "delta" },
              { name: "Kaduna", slug: "kaduna" },
              { name: "Anambra", slug: "anambra" },
            ].map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {loc.name}
              </Link>
            ))}
            <Link
              href="/locations"
              className="text-accent transition-colors hover:text-accent/80 font-medium"
            >
              All 36 states + FCT →
            </Link>
          </div>
        </div>
      </div>

      <Separator className="bg-border" />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} Gods Promise Aluminium. Quality
            roofing, reliable service.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="/sitemap.xml"
              className="transition-colors hover:text-foreground"
            >
              Sitemap
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="/llms.txt"
              className="transition-colors hover:text-foreground"
            >
              LLMs.txt
            </a>
            <span aria-hidden="true">·</span>
            <span>Made in Nigeria 🇳🇬</span>
          </div>
        </div>
      </div>

      {/* Themed gradient bottom border */}
      <div className="h-4 w-full bg-linear-to-r from-primary via-blue-500 to-primary" />
    </footer>
  );
}
