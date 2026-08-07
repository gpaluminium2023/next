export const siteIdentity = {
  legalName: "Gods Promise Aluminium Concept Limited",
  brandName: "Gods Promise Aluminium",
  siteUrl: "https://www.godspromisealuminiumroofing.com",
  logoPath: "/logo.jpeg",
  phoneDisplay: "+234 915 045 9964",
  phoneE164: "+2349150459964",
  whatsappUrl: "https://wa.me/2349150459964",
  // Single source of truth for the TikTok handle — reused by both the footer
  // link and any TikTok embeds so they can't drift apart again.
  tiktokHandle: "godspromiseroofing_1",
  // The one true address. Field-for-field this matches the verified Google
  // Business Profile listing ("PLEASURE BUS STOP, ALIMOSHO, Lagos 100275,
  // Lagos"), which is the record Google reconciles the site against — so
  // nothing here should be edited without changing the GBP listing to match.
  //
  // Everything on the site must render from these fields rather than hardcode
  // an address. Hardcoding is how the site ended up publishing three
  // different addresses across two states, including a second contradictory
  // PostalAddress in the JSON-LD on every /locations/* page.
  address: {
    streetAddress: "Pleasure Bus Stop",
    locality: "Alimosho",
    region: "Lagos",
    postalCode: "100275",
    country: "Nigeria",
    countryCode: "NG",
    // Full display form, matching the GBP listing exactly.
    formatted: "Pleasure Bus Stop, Alimosho, Lagos 100275, Lagos",
    // Shorter form for running prose, where the postal code reads awkwardly.
    short: "Pleasure Bus Stop, Alimosho, Lagos",
  },
  geo: {
    latitude: 6.7,
    longitude: 3.25,
  },
  // Physical branches. The first entry is the head office / factory, whose
  // address is the one above. Store pricing per branch lives in the Branch
  // table — this list is for structured data and contact details only.
  branches: [
    {
      slug: "enugu",
      name: "Gods Promise Aluminium — Enugu State Branch",
      // The branch price list gives no street number or landmark beyond this.
      streetAddress: "Enugu–PH Expressway",
      locality: "Enugu",
      region: "Enugu",
      country: "Nigeria",
      countryCode: "NG",
      phoneE164: "+2349150459964",
    },
    {
      slug: "imo",
      name: "Gods Promise Aluminium — Imo State Branch",
      // No street address supplied by the branch yet.
      streetAddress: "",
      locality: "Owerri",
      region: "Imo",
      country: "Nigeria",
      countryCode: "NG",
      phoneE164: "+2349150459964",
    },
  ],
  openingHours: {
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "08:00",
    closes: "18:00",
  },
  socialLinks: [
    "https://www.instagram.com/godspacltd/",
    "https://www.facebook.com/profile.php?id=100063619451498",
    "https://www.youtube.com/@godspromisealuminiumconcep3aborig",
    "https://www.tiktok.com/@godspromiseroofing_1",
  ],
  productLines: [
    "Long span aluminium roofing sheets",
    "Step tile aluminium roofing sheets",
    "Metcopo aluminium roofing sheets",
    "Gerard stone-coated roofing tiles",
    "Roofing accessories",
  ],
  services: [
    "Roofing sheet supply",
    "Step tile production",
    "Metcopo roofing sheet production",
    "Stone-coated tile supply",
    "Roofing accessories supply",
    "Roofing installation support",
    "Nationwide roofing material delivery",
  ],
  serviceAreas: [
    "Lagos",
    "Ogun State",
    "Enugu State",
    "Imo State",
    "Abuja",
    "Oyo State",
    "Osun State",
    "Ondo State",
    "Edo State",
    "Delta State",
    "Rivers State",
    "Nigeria",
  ],
  primaryCategory: "Aluminium roofing sheet manufacturer",
  priceRange: "NGN",
} as const;

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteIdentity.siteUrl}/#localbusiness`,
  name: siteIdentity.legalName,
  alternateName: siteIdentity.brandName,
  image: `${siteIdentity.siteUrl}${siteIdentity.logoPath}`,
  logo: `${siteIdentity.siteUrl}${siteIdentity.logoPath}`,
  url: siteIdentity.siteUrl,
  telephone: siteIdentity.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteIdentity.address.streetAddress,
    addressLocality: siteIdentity.address.locality,
    addressRegion: siteIdentity.address.region,
    postalCode: siteIdentity.address.postalCode,
    addressCountry: siteIdentity.address.countryCode,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteIdentity.geo.latitude,
    longitude: siteIdentity.geo.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: siteIdentity.openingHours.days,
      opens: siteIdentity.openingHours.opens,
      closes: siteIdentity.openingHours.closes,
    },
  ],
  sameAs: siteIdentity.socialLinks,
  // Lagos is the only place the company manufactures. Ogun and the other
  // states it serves belong in areaServed below, not in the identity — saying
  // "Lagos and Ogun State company" here competed with the address above.
  description:
    "Lagos aluminium roofing company manufacturing and supplying long span sheets, step tiles, Metcopo sheets, stone-coated tiles and roofing accessories from its Alimosho factory to projects across Nigeria, with branches in Enugu and Imo States.",
  priceRange: siteIdentity.priceRange,
  // Branches are their own locations rather than extra addresses on the head
  // office, so each can carry its own address in search results.
  department: siteIdentity.branches.map((branch) => ({
    "@type": "LocalBusiness",
    "@id": `${siteIdentity.siteUrl}/#branch-${branch.slug}`,
    name: branch.name,
    telephone: branch.phoneE164,
    address: {
      "@type": "PostalAddress",
      // Omit streetAddress entirely rather than emit an empty string for
      // branches that haven't given us one.
      ...(branch.streetAddress ? { streetAddress: branch.streetAddress } : {}),
      addressLocality: branch.locality,
      addressRegion: branch.region,
      addressCountry: branch.countryCode,
    },
    priceRange: siteIdentity.priceRange,
  })),
  areaServed: [
    {
      "@type": "Country",
      name: "Nigeria",
    },
    {
      "@type": "AdministrativeArea",
      name: "Lagos",
    },
    {
      "@type": "AdministrativeArea",
      name: "Ogun State",
    },
    {
      "@type": "AdministrativeArea",
      name: "Enugu State",
    },
    {
      "@type": "AdministrativeArea",
      name: "Imo State",
    },
  ],
  makesOffer: siteIdentity.services.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service,
    },
  })),
};
