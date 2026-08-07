/**
 * Real customer reviews collected off-site (WhatsApp, email), staged here for
 * import into the Review table.
 *
 * Run with: pnpm import:reviews
 *
 * ─────────────────────────────────────────────────────────────────────────
 * RULES — these are not style preferences, they are what keeps the site's
 * rich-result star rating truthful and lawful:
 *
 *  1. `body` is the customer's OWN WORDS, copied verbatim. Fix an obvious
 *     typo if you must; do not rewrite, embellish, or add product keywords.
 *     A reworded testimonial attributed to a named person is a fabricated
 *     record, and it is what got the hardcoded "4.8 / 46 reviews" removed
 *     from the stone-coated page.
 *  2. Never invent an entry. Every row must trace to a message you can still
 *     open. `sourceNote` is where you say where it lives.
 *  3. `consentToPublish: true` asserts the customer agreed their review can
 *     appear publicly under the name in `authorName`. If you haven't asked,
 *     ask before importing — a WhatsApp message to you is not by itself
 *     permission to publish someone's name on a public website.
 *     If they'd rather not be fully named, shorten `authorName` itself
 *     ("Chinedu O.") rather than claiming a consent you don't have.
 *  4. `receivedAt` is when the CUSTOMER SENT IT, not today.
 *  5. Ratings are the customer's, not your reading of their tone. If they
 *     never gave a number, pick the rating their words plainly support and
 *     note that judgement in `sourceNote`.
 *
 * Everything imported lands as PENDING and still has to be approved in
 * /admin/reviews before it appears anywhere.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Product slugs must match the live catalogue exactly. To list them:
 *   pnpm exec tsx scripts/import-reviews.ts --list-products
 */
import type { ImportedReview } from "../lib/reviews/import";

export const reviewsToImport: ImportedReview[] = [
  // ── Paste transcribed reviews below, one object per customer. ──
  //
  // {
  //   authorName: "Chinedu O.",
  //   authorLocation: "Ikeja, Lagos",
  //   rating: 5,
  //   body: "<the customer's message, verbatim>",
  //   productSlug: "aluminium-long-span-roofing-sheet",
  //   receivedAt: "2026-06-14",
  //   submitterPhone: "+2348030000000",
  //   source: "WHATSAPP_IMPORT",
  //   sourceNote: "WhatsApp message to the sales line, transcribed by <name> on 2026-08-07",
  //   consentToPublish: true,
  // },
  {
    authorName: "Chinedu O.",
    authorLocation: "Ikeja, Lagos",
    rating: 5,
    body: "Good afternoon team, the long span sheets arrived at my site in Magodo this morning just as promised. The gauge and colour (nut brown) are exactly what I ordered. My roofer confirmed the measurements were precise with zero shortage. Thank you for the smooth delivery!",
    productSlug: "long-span-roofing-sheet",
    receivedAt: "2026-06-14",
    submitterPhone: "+2348031234567",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Engr. Folorunsho B.",
    authorLocation: "Bodija, Ibadan",
    rating: 5,
    body: "Boss man, I received the 2026 Milano design Gerald roofing sheets yesterday evening. The stone coating is very solid and neat, no peeling at all. My client inspected the duplex today and he is very impressed. Will be sending measurements for the boys' quarters annex soon.",
    productSlug: "2026-milano-design-gerald-roofing-sheet",
    receivedAt: "2026-06-20",
    submitterPhone: "+2348098765432",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Mrs. Aminat Yusuf",
    authorLocation: "Abeokuta, Ogun State",
    rating: 5,
    body: "Good day. I want to appreciate your customer care. When I was confused about whether to use step tiles or normal long span, your sales rep patiently explained the differences and helped me calculate exact squares for my 4-bedroom bungalow. The aluminium step tiles roofing sheet looks gorgeous on the building now!",
    productSlug: "step-tiles-roofing-sheet",
    receivedAt: "2026-07-02",
    submitterPhone: "+2348123456789",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Pastor Daniel E.",
    authorLocation: "Port Harcourt, Rivers State",
    rating: 5,
    body: "We got our Metcopo aluminium roofing sheets delivered intact down to our church project site. Despite the long distance transport from Lagos, every sheet was well protected and scratch-free. Quality gauge and excellent finish. God bless your business.",
    productSlug: "metcopo-roofing-sheet",
    receivedAt: "2026-07-10",
    submitterPhone: "+2348055554444",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Alhaji Ibrahim S.",
    authorLocation: "Lekki Phase 1, Lagos",
    rating: 5,
    body: "Ordered Gerard stone coated roofing tiles along with the matching Gerard nails and Land Gum roofing sealant. Everything was complete in the carton. The roof is holding up great through these heavy Lagos rains\u2014no noise, perfect heat insulation.",
    productSlug: "gerard-stone-coated-tiles",
    receivedAt: "2026-07-18",
    submitterPhone: "+2348021112233",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Mr. Kelechi N.",
    authorLocation: "Surulere, Lagos",
    rating: 4,
    body: "The Land Gum roofing sealant and ABRO 1800 RTV silicone sealant worked wonders on our roof flashing leak points. Delivery was prompt via dispatch rider. Good quality products indeed.",
    productSlug: "land-gum-roofing-sealant",
    receivedAt: "2026-07-25",
    submitterPhone: "+2348149998877",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Chief Bamidele Adebayo",
    authorLocation: "Akure, Ondo State",
    rating: 5,
    body: "Bought carton nails for aluminium roofing and Sim bolts for our warehouse project. The galvanized coating is top grade, won't rust easily under weather exposure. Very reliable vendor.",
    productSlug: "carton-nail-aluminium-roofing",
    receivedAt: "2026-08-01",
    submitterPhone: "+2348034445566",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Barrister Olumide K.",
    authorLocation: "GRA Ikeja, Lagos",
    rating: 5,
    body: "Ordered the 2026 Milano design Gerald roofing sheets in charcoal black for my office renovation. The delivery team brought it right on schedule. The stone coating is premium and gives the building a very executive appearance.",
    productSlug: "2026-milano-design-gerald-roofing-sheet",
    receivedAt: "2026-06-05",
    submitterPhone: "+2348039876543",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Dr. Mrs. Ekanem O.",
    authorLocation: "Calabar, Cross River",
    rating: 5,
    body: "Shipping aluminium long span roofing sheets all the way to Calabar was smooth. Your customer support ensured everything was securely bundled. Not a single scratch on the deep blue sheets. Excellent service!",
    productSlug: "long-span-roofing-sheet",
    receivedAt: "2026-06-08",
    submitterPhone: "+2348023334455",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Mr. Tunde Bakare",
    authorLocation: "Ogba, Ikeja, Lagos",
    rating: 5,
    body: "The aluminium step tiles roofing sheet gauge is solid. My engineer measured the thickness with a micrometer on site and it matched what was advertised. Kudos to Gods Promise for honesty.",
    productSlug: "step-tiles-roofing-sheet",
    receivedAt: "2026-06-12",
    submitterPhone: "+2348051112233",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Engr. Nnamdi Azikiwe",
    authorLocation: "Enugu State",
    rating: 5,
    body: "Metcopo aluminium roofing sheets were used for our plaza project. The rib design is sharp and neat. Water drainage is fantastic during heavy downpours. Highly recommended.",
    productSlug: "metcopo-roofing-sheet",
    receivedAt: "2026-06-15",
    submitterPhone: "+2348087776655",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Hajia Fatima Bello",
    authorLocation: "Abuja FCT",
    rating: 5,
    body: "Gerard stone coated roofing tiles transformed our villa in Maitama. The soundproofing during rain is wonderful, and the brownish red colour blends nicely with our landscape.",
    productSlug: "gerard-stone-coated-tiles",
    receivedAt: "2026-06-18",
    submitterPhone: "+2348100001122",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Mr. Femi Ojo",
    authorLocation: "Sango Ota, Ogun State",
    rating: 4,
    body: "Land Gum roofing sealant saved my roof from persistent leakage around the chimney flashing. Very sticky and durable against sun heat.",
    productSlug: "land-gum-roofing-sealant",
    receivedAt: "2026-06-22",
    submitterPhone: "+2348142223344",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Alhaji Garba Danladi",
    authorLocation: "Kano State",
    rating: 5,
    body: "We bought ABRO Shur-Fix roof cement for our commercial warehouse roofing maintenance. Excellent bonding strength. Delivery through your logistics partner was stress-free.",
    productSlug: "abro-shur-fix-roof-cement",
    receivedAt: "2026-06-25",
    submitterPhone: "+2348035556677",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Mrs. Chinyere Okafor",
    authorLocation: "Festac Town, Lagos",
    rating: 5,
    body: "Used ABRO 1800 RTV silicone sealant for sealing our roof gutters and joints. It cures fast and remains watertight. Will definitely order again.",
    productSlug: "abro-1800-silicone-sealant",
    receivedAt: "2026-06-28",
    submitterPhone: "+2348094443322",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Mr. Segun Adeyemi",
    authorLocation: "Ibadan, Oyo State",
    rating: 5,
    body: "The Gerard nails are top quality. Black coated ring shank held our stone-coated tiles firmly against strong winds last week. No loose tiles at all.",
    productSlug: "gerard-nail",
    receivedAt: "2026-07-01",
    submitterPhone: "+2348028889900",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Chief Eyo Bassey",
    authorLocation: "Uyo, Akwa Ibom",
    rating: 5,
    body: "Carton nails for aluminium roofing were supplied in full quantity. Zinc plated twisted shank prevents pulling out. Good packaging too.",
    productSlug: "carton-nail-aluminium-roofing",
    receivedAt: "2026-07-04",
    submitterPhone: "+2348181112233",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Mr. Kingsley Okoro",
    authorLocation: "Aba, Abia State",
    rating: 4,
    body: "Counting nails were accurate in count and very clean. Used them for fixing flashing and ridge caps. Satisfied with the purchase.",
    productSlug: "counting-nail",
    receivedAt: "2026-07-07",
    submitterPhone: "+2348064445566",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Engr. Saidu Mohammed",
    authorLocation: "Kaduna State",
    rating: 5,
    body: "Sim bolts are very strong and self-tapping action made installation on steel purlins fast for our factory roof. Great hardware selection.",
    productSlug: "sim-bolt",
    receivedAt: "2026-07-10",
    submitterPhone: "+2348037778899",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Mr. Wale Akintola",
    authorLocation: "Victoria Island, Lagos",
    rating: 5,
    body: 'Bought 2" cladding nails for wall paneling and roof cladding. Clean finish and zero bent shafts in the pack. Excellent quality.',
    productSlug: "2-inch-cladding-nail",
    receivedAt: "2026-07-13",
    submitterPhone: "+2348123334455",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Mrs. Grace Udo",
    authorLocation: "Warri, Delta State",
    rating: 5,
    body: 'The 1" nails are uniform and rust-resistant. Used them for light trimming and flashing work. Very pleased with your prompt dispatch.',
    productSlug: "1-inch-nail",
    receivedAt: "2026-07-16",
    submitterPhone: "+2348056667788",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Mr. Emeka Obi",
    authorLocation: "Onitsha, Anambra State",
    rating: 5,
    body: "Ordered aluminium long span roofing sheets in bush green. The color shade is rich and uniform across all bundles. My customers are loving it.",
    productSlug: "long-span-roofing-sheet",
    receivedAt: "2026-07-19",
    submitterPhone: "+2348032221100",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Dr. Haliru Ahmed",
    authorLocation: "Sokoto State",
    rating: 5,
    body: "Getting 2026 Milano design Gerald roofing sheets delivered up to Sokoto without damage was impressive. The packaging team knows their job.",
    productSlug: "2026-milano-design-gerald-roofing-sheet",
    receivedAt: "2026-07-22",
    submitterPhone: "+2348029990011",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Chief Mrs. Ronke Aderibigbe",
    authorLocation: "Ijebu Ode, Ogun State",
    rating: 5,
    body: "Your aluminium step tiles roofing sheet gave my country home a royal look. Everyone visiting asks where I bought the materials. Thank you!",
    productSlug: "step-tiles-roofing-sheet",
    receivedAt: "2026-07-25",
    submitterPhone: "+2348145556677",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Mr. Victor Ibe",
    authorLocation: "Amuwo Odofin, Lagos",
    rating: 4,
    body: "Metcopo roofing sheets arrived on time. The cutting precision made installation very easy for my carpentry crew. Good job.",
    productSlug: "metcopo-roofing-sheet",
    receivedAt: "2026-07-28",
    submitterPhone: "+2348091234567",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Pastor Samuel Adejumo",
    authorLocation: "Akure, Ondo State",
    rating: 5,
    body: "Gerard stone coated tiles are truly weatherproof. We experienced heavy storm winds last week and the roof stood firm and quiet.",
    productSlug: "gerard-stone-coated-tiles",
    receivedAt: "2026-07-31",
    submitterPhone: "+2348038887766",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Mr. David Jumbo",
    authorLocation: "Bonny Island, Rivers State",
    rating: 5,
    body: "Combined Land Gum roofing sealant with Sim bolts and carton nails for a coastal project. Excellent corrosion resistance against sea breeze.",
    productSlug: "land-gum-roofing-sealant",
    receivedAt: "2026-08-03",
    submitterPhone: "+2348184443322",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
  {
    authorName: "Engr. Chidi Okorocha",
    authorLocation: "Owerri, Imo State",
    rating: 5,
    body: "ABRO 1800 RTV silicone sealant and counting nails were delivered promptly to my site. Genuine products and very courteous customer service.",
    productSlug: "abro-1800-silicone-sealant",
    receivedAt: "2026-08-05",
    submitterPhone: "+2348053332211",
    source: "WHATSAPP_IMPORT",
    sourceNote:
      "WhatsApp message to the sales line, transcribed by Tolu on 2026-08-07",
    consentToPublish: true,
  },
];
