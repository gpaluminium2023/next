export interface NavLink {
  href: string;
  label: string;
  /** Shown in the desktop dropdown panels; omitted for top-level links. */
  description?: string;
}

export interface NavGroup {
  label: string;
  items: NavLink[];
}

export type NavEntry = NavLink | NavGroup;

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return "items" in entry;
}

/**
 * Single source of truth for the header and the mobile sheet.
 *
 * The site has grown well past what a flat row of links can hold, so
 * everything below the top level is grouped. Keep no more than six top-level
 * entries — past that the desktop row starts crowding the CTAs again.
 */
export const siteNav: NavEntry[] = [
  { href: "/", label: "Home" },
  {
    label: "Products",
    items: [
      {
        href: "/products",
        label: "All Products",
        description: "Long span, step tiles, Metcopo and stone-coated ranges",
      },
      {
        href: "/store",
        label: "Shop Online",
        description: "Buy and pay by card, transfer or USSD",
      },
      {
        href: "/pricing",
        label: "Price List",
        description: "Current Lagos and Enugu branch rates",
      },
      {
        href: "/roof-calculator",
        label: "Roof Calculator",
        description: "Estimate sheets and cost from your measurements",
      },
      {
        href: "/gallery",
        label: "Gallery",
        description: "Finished roofs and colour options",
      },
    ],
  },
  {
    label: "Services",
    items: [
      { href: "/services", label: "Our Services", description: "Supply, production and install support" },
      { href: "/delivery", label: "Delivery", description: "Coverage, transit times and haulage" },
      { href: "/locations", label: "Locations", description: "States we serve and where we stock" },
      { href: "/dealers", label: "Dealers", description: "Become a distributor or find one near you" },
      { href: "/projects", label: "Projects", description: "Estates, churches and commercial builds" },
      { href: "/warranty", label: "Warranty", description: "What's covered and for how long" },
    ],
  },
  {
    label: "Learn",
    items: [
      { href: "/articles", label: "Articles", description: "In-depth roofing guides and comparisons" },
      { href: "/blog", label: "Blog", description: "Price updates, news and practical tips" },
      { href: "/resources", label: "Resources", description: "Spec sheets and buying checklists" },
      { href: "/faq", label: "FAQ", description: "Answers to the questions we get most" },
      { href: "/reviews", label: "Reviews", description: "What our customers say" },
    ],
  },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
