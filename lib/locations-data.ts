export interface LocationFaq {
  question: string;
  answer: string;
}

export interface LocationData {
  slug: string;
  name: string;
  region: string;
  capital: string;
  deliveryDays: string;
  deliveryNote: string;
  hasDealer: boolean;
  keyAreas: string[];
  popularProducts: string[];
  intro: string;
  whyChooseUs: string;
  faq: LocationFaq[];
}

export const locations: LocationData[] = [
  // ────────────── SOUTH-WEST ──────────────────────────────────────────────────
  {
    slug: "lagos",
    name: "Lagos",
    region: "South-West",
    capital: "Ikeja",
    deliveryDays: "Same day – next business day",
    deliveryNote:
      "Our factory is located on the Lagos-Abeokuta Expressway at Sango Ota. We deliver directly to building sites across every part of Lagos including Lekki, Ajah, Victoria Island, Ikeja, Festac, Ikorodu, Epe and Badagry. Most orders arrive the same day or next working day after production.",
    hasDealer: true,
    keyAreas: ["Lekki", "Ajah", "Ikeja", "Victoria Island", "Ikorodu", "Festac"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles", "Stone-Coated Tiles", "Flat Sheets"],
    intro:
      "Lagos is the economic capital of Nigeria and the engine of its construction industry. From luxury developments on Banana Island to affordable housing estates in Ibeju-Lekki, every building needs a roof that can handle coastal humidity, heavy seasonal rains and the salt-laden Atlantic breeze. As a Lagos-based aluminium roofing company, Gods Promise Aluminium manufactures roofing sheets directly at our factory on the Lagos-Abeokuta Expressway and delivers to project sites across the entire metropolis — no middlemen, no inflated prices.",
    whyChooseUs:
      "Being based in Lagos means you get the fastest delivery and the lowest transport costs anywhere in the state. You can visit our factory to inspect your order during production, verify gauges with a digital caliper and confirm colours before dispatch. Builders and contractors across Lagos choose Gods Promise Aluminium because we combine factory-direct pricing with a quality guarantee you can see for yourself.",
    faq: [
      {
        question: "Can I visit your factory to inspect my roofing sheets before delivery?",
        answer:
          "Yes. Our factory at Km 38, Lagos-Abeokuta Expressway, Sango Ota is open Monday to Saturday, 8 am to 6 pm. You are welcome to watch your order being produced, measure thickness with a caliper and confirm colour before loading.",
      },
      {
        question: "How quickly can you deliver aluminium roofing sheets within Lagos?",
        answer:
          "Most Lagos deliveries happen the same day or next business day after production is complete. We cover all areas including Lekki, Ajah, Victoria Island, Ikeja, Festac, Ikorodu, Epe, Badagry and Alimosho.",
      },
      {
        question: "What is the current price of aluminium roofing sheets in Lagos?",
        answer:
          "Prices start from ₦4,300 per square metre for 0.40 mm long span sheets. Check our pricing page for the full 2026 price list or contact us on WhatsApp for an instant personalised quote.",
      },
      {
        question: "Do you supply roofing sheets for large estate developments in Lagos?",
        answer:
          "Yes. We regularly supply roofing materials for estate developments, churches and commercial projects. We offer priority production scheduling and bulk pricing for large orders.",
      },
    ],
  },
  {
    slug: "ogun",
    name: "Ogun",
    region: "South-West",
    capital: "Abeokuta",
    deliveryDays: "Same day",
    deliveryNote:
      "Our production facility is physically located in Sango Ota, Ogun State. Customers in Abeokuta, Ifo, Ota, Sagamu, Ijebu-Ode and surrounding areas enjoy the fastest delivery times — often within hours of order confirmation. Many clients pick up directly from our factory.",
    hasDealer: true,
    keyAreas: ["Abeokuta", "Sango Ota", "Ifo", "Sagamu", "Ijebu-Ode", "Mowe"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles", "Flat Sheets"],
    intro:
      "Ogun State is home to our factory and one of the fastest-growing states for residential and industrial construction in Nigeria. The Lagos-Abeokuta Expressway corridor through Sango Ota, Ifo and Mowe has attracted thousands of new housing estates, while Abeokuta and Sagamu continue to expand with modern developments. As the aluminium roofing company operating right in the heart of Ogun State, Gods Promise Aluminium gives you direct access to factory-gate pricing and same-day availability that no reseller can match.",
    whyChooseUs:
      "Our factory at Km 38 on the Lagos-Abeokuta Expressway is in Ogun State itself. That means zero delivery distance for many of our Ogun customers — you can literally drive to our gate, inspect your sheets and load them the same day. For those farther away in Sagamu or Ijebu-Ode, we arrange direct delivery with minimal transport cost because the distance is short.",
    faq: [
      {
        question: "Where exactly is your factory in Ogun State?",
        answer:
          "We are located at Km 38, Lagos-Abeokuta Expressway, beside First Bank, Sango Ota, Ogun State. The factory is easily accessible from both the Lagos and Abeokuta direction.",
      },
      {
        question: "Can I buy roofing sheets directly from your Ogun State factory?",
        answer:
          "Absolutely. We sell retail and wholesale directly from our factory. You can walk in, place your order, watch it being produced and take delivery the same day.",
      },
      {
        question: "Do you deliver to Abeokuta and Ijebu-Ode?",
        answer:
          "Yes. We deliver throughout Ogun State including Abeokuta, Sagamu, Ijebu-Ode, Ifo, Mowe and all local government areas. Delivery within Ogun is typically same-day.",
      },
    ],
  },
  {
    slug: "oyo",
    name: "Oyo",
    region: "South-West",
    capital: "Ibadan",
    deliveryDays: "1–2 business days",
    deliveryNote:
      "Ibadan is approximately two hours from our factory via the Lagos-Ibadan Expressway. We dispatch roofing sheets to Oyo State regularly and cover areas including Ibadan, Ogbomoso, Oyo town and Iseyin. Orders are typically delivered within one to two working days.",
    hasDealer: true,
    keyAreas: ["Ibadan", "Ogbomoso", "Oyo Town", "Iseyin", "Saki"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles", "Stone-Coated Tiles"],
    intro:
      "Oyo State contains Ibadan — the largest city by geographical area in West Africa — and a construction market that is booming as Lagos residents seek more affordable land along the Lagos-Ibadan corridor. New estates in areas like Moniya, Ojoo and the Ibadan-Ife Expressway axis are springing up rapidly. Whether you are building a family home in Bodija, a church in Ogbomoso or a commercial plaza in Oyo town, Gods Promise Aluminium delivers factory-direct aluminium roofing sheets to your project site in Oyo State.",
    whyChooseUs:
      "The Lagos-Ibadan Expressway connects our factory directly to Oyo State, making delivery fast and cost-effective. We already supply numerous projects in the Ibadan metropolitan area and understand the building patterns of the region. Our Oyo State customers get the same factory-gate prices as Lagos buyers, with only a modest delivery charge added.",
    faq: [
      {
        question: "How long does delivery to Ibadan take?",
        answer:
          "Delivery from our factory to Ibadan typically takes one to two business days. We dispatch via the Lagos-Ibadan Expressway and cover all parts of the Ibadan metro area.",
      },
      {
        question: "Do you have a dealer or showroom in Ibadan?",
        answer:
          "We work with partner dealers in the Ibadan area. Contact us on WhatsApp and we will connect you with the nearest stockist or arrange factory-direct delivery to your site.",
      },
      {
        question: "What roofing sheets are most popular in Oyo State?",
        answer:
          "Long span aluminium roofing sheets in 0.45 mm and 0.50 mm gauges are the most popular for residential projects in Ibadan and surrounding areas. Step tiles are increasingly chosen for their modern appearance.",
      },
    ],
  },
  {
    slug: "osun",
    name: "Osun",
    region: "South-West",
    capital: "Osogbo",
    deliveryDays: "1–2 business days",
    deliveryNote:
      "Osun State is reachable from our factory through Ibadan and the Ife-Ibadan Road. We deliver to Osogbo, Ile-Ife, Ede, Ilesa and surrounding towns. Most deliveries arrive within one to two working days of dispatch.",
    hasDealer: false,
    keyAreas: ["Osogbo", "Ile-Ife", "Ilesa", "Ede", "Iwo"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles"],
    intro:
      "Osun State, home to the culturally significant city of Ile-Ife and the growing capital Osogbo, is seeing steady growth in residential and commercial construction. The sacred Osun-Osogbo Grove draws global attention to the state, while behind the scenes, builders across Ilesa, Ede and Iwo are raising new structures that need dependable roofing. Gods Promise Aluminium supplies quality aluminium roofing sheets to Osun State projects at factory-direct prices with reliable delivery from our production facility near Lagos.",
    whyChooseUs:
      "We route Osun State deliveries through Ibadan, keeping transit time short and transport costs reasonable. Our factory produces your roofing sheets to order, so you get precisely the gauge, colour and length your project demands — there is no reliance on whatever a local retailer happens to have in stock.",
    faq: [
      {
        question: "Do you deliver aluminium roofing sheets to Osogbo?",
        answer:
          "Yes. We deliver directly to Osogbo and other Osun State towns including Ile-Ife, Ilesa, Ede and Iwo. Delivery takes one to two business days from our factory.",
      },
      {
        question: "Can I order custom-length roofing sheets for my Osun project?",
        answer:
          "Yes. We produce roofing sheets to your exact length specifications at our factory. This eliminates on-site cutting waste and ensures a cleaner finish on your roof.",
      },
      {
        question: "What colour options are available for roofing sheets in Osun State?",
        answer:
          "We offer a full range of colours including wine, blue, green, brown, black and more. Check our colour chart on the products page or request samples via WhatsApp.",
      },
    ],
  },
  {
    slug: "ondo",
    name: "Ondo",
    region: "South-West",
    capital: "Akure",
    deliveryDays: "1–3 business days",
    deliveryNote:
      "Ondo State is served via the Ore-Benin Expressway and Akure Road from Ibadan. We deliver to Akure, Ondo Town, Owo, Ikare and the coastal town of Ilaje. Transit times range from one to three working days depending on destination.",
    hasDealer: false,
    keyAreas: ["Akure", "Ondo Town", "Owo", "Ikare-Akoko", "Ore"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles", "Stone-Coated Tiles"],
    intro:
      "Ondo State combines a growing capital city in Akure with Nigeria's largest bitumen deposits and a coastline that brings moisture-heavy winds inland. The combination of heavy rainfall, tropical humidity and expanding urbanisation means roofing materials must be both durable and corrosion-resistant. Gods Promise Aluminium provides factory-direct aluminium roofing sheets to builders across Ondo State — from residential projects in Akure to commercial developments in Owo and Ore.",
    whyChooseUs:
      "Aluminium roofing is particularly well-suited to Ondo State's heavy rainfall and high humidity. Our sheets resist corrosion, require no repainting and handle the tropical downpours that Akure and the southern parts of the state receive throughout the year. We provide free consultation on the right gauge and profile for your specific project location within Ondo State.",
    faq: [
      {
        question: "What gauge roofing sheet is best for the Ondo State climate?",
        answer:
          "For Ondo State's heavy rainfall, we recommend at least 0.45 mm gauge for residential homes and 0.50 mm or above for commercial buildings. Thicker sheets offer better resistance to wind uplift during storms.",
      },
      {
        question: "Do you deliver roofing sheets to Akure?",
        answer:
          "Yes. We deliver to Akure and all parts of Ondo State including Ondo Town, Owo, Ikare-Akoko and Ore. Typical transit time is one to three business days.",
      },
      {
        question: "Can I get stone-coated tiles delivered to Ondo State?",
        answer:
          "Yes. We supply Gerard stone-coated tiles in Shingle, Bond, Classic and Milano profiles to all parts of Ondo State. Contact us for pricing including delivery.",
      },
    ],
  },
  {
    slug: "ekiti",
    name: "Ekiti",
    region: "South-West",
    capital: "Ado-Ekiti",
    deliveryDays: "2–3 business days",
    deliveryNote:
      "Ekiti State is reached from our factory through Ibadan and the Ado-Ekiti Road. We deliver to Ado-Ekiti, Ikere, Ijero, Ikole and surrounding areas. Deliveries typically arrive within two to three working days.",
    hasDealer: false,
    keyAreas: ["Ado-Ekiti", "Ikere-Ekiti", "Ijero-Ekiti", "Ikole-Ekiti", "Oye-Ekiti"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles"],
    intro:
      "Ekiti State is known as the Fountain of Knowledge for its concentration of universities and educational institutions. The hilly terrain around Ado-Ekiti and Ikere-Ekiti creates unique roofing challenges — wind speeds are higher at elevation, and sheets must be securely fastened. Gods Promise Aluminium supplies roofing sheets that combine strength with lightness, making them ideal for the elevated building sites common across Ekiti State. Whether you are constructing a lecturers' quarters, a school block or a family home, we deliver directly to you.",
    whyChooseUs:
      "Ekiti's hilly topography demands careful gauge selection — our team advises on the optimal thickness for wind resistance at elevation. We produce sheets to the exact lengths you need, reducing waste on sloped roofs where precision matters. Our factory-direct model means you avoid the markups typically added by Lagos-based resellers servicing the interior states.",
    faq: [
      {
        question: "What is the delivery cost to Ado-Ekiti?",
        answer:
          "Delivery cost depends on order volume and exact location. Contact us on WhatsApp with your order details and site address, and we will include the delivery charge in your quotation.",
      },
      {
        question: "Do you supply roofing materials for school buildings in Ekiti?",
        answer:
          "Yes. We supply roofing sheets for institutional buildings including schools, churches and government projects. We offer bulk pricing and can produce to the specific lengths required for large-span structures.",
      },
      {
        question: "Which roofing profile works best for hilly areas in Ekiti State?",
        answer:
          "Long span profiles in 0.50 mm gauge or above perform well on elevated sites. The heavier gauge resists wind uplift, and the long span profile provides efficient coverage on sloped roofs.",
      },
    ],
  },

  // ────────────── SOUTH-SOUTH ─────────────────────────────────────────────────
  {
    slug: "edo",
    name: "Edo",
    region: "South-South",
    capital: "Benin City",
    deliveryDays: "2–3 business days",
    deliveryNote:
      "Edo State is connected to our factory via the Lagos-Benin Expressway through Ore. We deliver to Benin City, Auchi, Ekpoma, Uromi and surrounding areas. Transit time is typically two to three working days.",
    hasDealer: true,
    keyAreas: ["Benin City", "Auchi", "Ekpoma", "Uromi", "Igarra"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles", "Stone-Coated Tiles"],
    intro:
      "Edo State, centred on the historic city of Benin, is experiencing a transformation in its building sector. The Benin City master plan is reshaping the urban landscape, and new residential estates on the Benin-Auchi and Benin-Lagos corridors are driving demand for quality roofing materials. The region receives substantial annual rainfall, so corrosion-resistant aluminium roofing is the smart choice for both new builds and re-roofing projects. Gods Promise Aluminium delivers factory-direct roofing sheets to Edo State at competitive prices.",
    whyChooseUs:
      "We have an established logistics route from our factory to Benin City through Ore, ensuring consistent delivery times. Edo State builders benefit from our full range of profiles — long span, step tiles and stone-coated tiles — all available to order with no minimum quantity restriction. We also supply roofing accessories so you only need one vendor for your entire roof.",
    faq: [
      {
        question: "How do I order roofing sheets for delivery to Benin City?",
        answer:
          "Contact us on WhatsApp at +234 915 045 9964 with your project details — roofing profile, gauge, colour and site address in Benin City. We will send a quote including delivery cost and estimated arrival date.",
      },
      {
        question: "Do you supply roofing accessories alongside sheets in Edo State?",
        answer:
          "Yes. We supply drive screws, roofing nails, seam bolts, silicone sealant, felt and flash band. Bundling accessories with your sheet order saves you time and ensures compatibility.",
      },
      {
        question: "What is the starting price for roofing sheets delivered to Edo State?",
        answer:
          "Roofing sheet prices start from ₦4,300 per sqm (0.40 mm). Delivery charges are calculated based on order volume and exact destination. Contact us for a full quote.",
      },
    ],
  },
  {
    slug: "delta",
    name: "Delta",
    region: "South-South",
    capital: "Asaba",
    deliveryDays: "2–3 business days",
    deliveryNote:
      "Delta State is served through the Benin-Asaba Expressway and the Warri routes. We deliver to Asaba, Warri, Sapele, Ughelli, Agbor and creek-side areas where road access permits. Transit time is two to three business days.",
    hasDealer: false,
    keyAreas: ["Asaba", "Warri", "Sapele", "Ughelli", "Agbor"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles", "Stone-Coated Tiles"],
    intro:
      "Delta State sits in the oil-rich Niger Delta, where construction is fuelled by both oil-sector investment and a growing private residential market. Asaba, the state capital, is experiencing rapid expansion with new estates and commercial plazas, while Warri remains a major industrial city with continuous building activity. The high humidity and prolonged rainy season in the Niger Delta make corrosion-resistant aluminium an essential roofing choice. Gods Promise Aluminium supplies durable roofing sheets to Delta State builders who demand longevity from their materials.",
    whyChooseUs:
      "Delta State's humid, rain-heavy climate is harsh on inferior roofing materials. Our aluminium sheets are resistant to rust and corrosion, making them a cost-effective long-term investment in this environment. We deliver to both the urban centres of Asaba and Warri and the smaller towns across the state, ensuring consistent product quality regardless of your project location.",
    faq: [
      {
        question: "Is aluminium roofing suitable for the Delta State climate?",
        answer:
          "Absolutely. Aluminium does not rust, making it ideal for Delta State's high humidity and heavy rainfall. It outperforms galvanised steel in coastal and riverine environments by a significant margin.",
      },
      {
        question: "Can you deliver to both Asaba and Warri?",
        answer:
          "Yes. We deliver to all major towns in Delta State including Asaba, Warri, Sapele, Ughelli and Agbor. Contact us for specific delivery times to your area.",
      },
      {
        question: "Do you offer bulk pricing for Delta State developers?",
        answer:
          "Yes. We provide competitive bulk pricing for estate developers and large commercial projects. The more you order, the better the per-square-metre rate. Contact us to discuss your project volume.",
      },
    ],
  },
  {
    slug: "rivers",
    name: "Rivers",
    region: "South-South",
    capital: "Port Harcourt",
    deliveryDays: "2–4 business days",
    deliveryNote:
      "Rivers State deliveries are routed through Benin City and the East-West Road to Port Harcourt. We cover Port Harcourt, Obio-Akpor, Eleme, Bonny and accessible mainland areas. Transit time is two to four working days depending on exact location.",
    hasDealer: true,
    keyAreas: ["Port Harcourt", "Obio-Akpor", "Eleme", "Bonny", "Oyigbo"],
    popularProducts: ["Long Span Roofing Sheets", "Stone-Coated Tiles", "Step Tiles"],
    intro:
      "Rivers State and its capital Port Harcourt form the oil and gas hub of Nigeria, driving a construction sector that ranges from executive mansions in GRA Phase 2 to large-scale industrial facilities in the Trans-Amadi industrial layout. The city receives some of the heaviest rainfall in Nigeria — over 2,400 mm annually — which makes roofing material quality a critical decision. Gods Promise Aluminium supplies premium aluminium roofing sheets to Rivers State from our Lagos factory, offering the corrosion resistance and durability that Port Harcourt's demanding climate requires.",
    whyChooseUs:
      "Port Harcourt's intense rainfall and saline coastal air accelerate the deterioration of cheap roofing materials. Our aluminium sheets are engineered for exactly this kind of environment — they will not rust, peel or degrade even after years of exposure to Niger Delta weather. We also supply stone-coated tiles for the premium residential projects that Rivers State is known for.",
    faq: [
      {
        question: "How long does delivery to Port Harcourt take?",
        answer:
          "Delivery to Port Harcourt typically takes two to four business days from our factory. We route through Benin City and the East-West Road. Exact timing depends on order volume and road conditions.",
      },
      {
        question: "Do you have a distributor in Port Harcourt?",
        answer:
          "We work with partners in the Port Harcourt area. Contact us on WhatsApp and we can connect you with a local stockist or arrange direct factory delivery to your site.",
      },
      {
        question: "Why is aluminium roofing better than zinc for Port Harcourt?",
        answer:
          "Aluminium does not rust in humid, saline conditions. Zinc (galvanised steel) corrodes faster in Port Harcourt's coastal climate. Aluminium roofing lasts significantly longer with less maintenance, making it more cost-effective over the life of your building.",
      },
    ],
  },
  {
    slug: "bayelsa",
    name: "Bayelsa",
    region: "South-South",
    capital: "Yenagoa",
    deliveryDays: "3–5 business days",
    deliveryNote:
      "Bayelsa State is reached via the East-West Road through Rivers State. We deliver to Yenagoa and accessible mainland locations. For creek and riverine areas, delivery is arranged to the nearest road-accessible point. Transit time is three to five working days.",
    hasDealer: false,
    keyAreas: ["Yenagoa", "Ogbia", "Sagbama", "Ekeremor"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles"],
    intro:
      "Bayelsa State presents unique construction challenges due to its riverine geography and high water table. Buildings are often elevated on stilts or raised foundations, and roofing materials face extreme moisture exposure year-round. Lightweight, corrosion-proof aluminium roofing is perfectly suited to these conditions. Gods Promise Aluminium supplies roofing sheets to Bayelsa State projects, providing materials that withstand the constant humidity and heavy rainfall of the Niger Delta without degrading.",
    whyChooseUs:
      "In Bayelsa's waterlogged terrain, roof weight matters — heavier materials put unnecessary stress on elevated foundations. Our aluminium sheets are significantly lighter than steel alternatives while offering superior corrosion resistance. We work with logistics partners experienced in Bayelsa delivery routes to get your materials to site efficiently.",
    faq: [
      {
        question: "Can you deliver roofing sheets to Yenagoa?",
        answer:
          "Yes. We deliver to Yenagoa via the East-West Road through Rivers State. Delivery takes three to five business days from our factory. Contact us for exact timing based on your order.",
      },
      {
        question: "Is aluminium roofing suitable for riverine areas in Bayelsa?",
        answer:
          "Aluminium is the best roofing choice for riverine areas. It does not rust, is lightweight (reducing load on elevated structures) and handles constant moisture exposure without degradation.",
      },
      {
        question: "What is the minimum order for delivery to Bayelsa State?",
        answer:
          "There is no strict minimum order, but we recommend combining your roofing sheet order with accessories to make the most of the delivery cost. Contact us to discuss your project needs.",
      },
    ],
  },
  {
    slug: "cross-river",
    name: "Cross River",
    region: "South-South",
    capital: "Calabar",
    deliveryDays: "3–5 business days",
    deliveryNote:
      "Cross River State is served through the Ikom-Calabar Road from the Benin-Enugu corridor. We deliver to Calabar, Ikom, Ogoja and surrounding areas. Delivery takes three to five working days.",
    hasDealer: false,
    keyAreas: ["Calabar", "Ikom", "Ogoja", "Obudu", "Ugep"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles", "Stone-Coated Tiles"],
    intro:
      "Cross River State is famous for the Calabar Carnival and Obudu Mountain Resort, but its construction sector deserves equal attention. Calabar, one of the cleanest cities in Nigeria, has strict building standards, and the state government's focus on urban renewal has driven demand for quality roofing materials. The coastal location brings heavy rainfall and seasonal storms, making roofing sheet quality a top priority. Gods Promise Aluminium supplies durable aluminium roofing to Cross River State builders who need materials that look great and last long in a challenging coastal climate.",
    whyChooseUs:
      "Calabar's building standards reward quality materials. Our factory-direct aluminium sheets meet the aesthetic and durability requirements that Cross River State builders expect. We supply the full range — from affordable long span profiles for residential use to premium stone-coated tiles for hospitality and tourism developments in Obudu and Tinapa.",
    faq: [
      {
        question: "Do you deliver roofing sheets to Calabar?",
        answer:
          "Yes. We deliver to Calabar and other Cross River towns including Ikom, Ogoja and Obudu. Transit time is typically three to five business days from our factory.",
      },
      {
        question: "What roofing profile is best for Calabar's heavy rainfall?",
        answer:
          "Long span profiles with a minimum gauge of 0.45 mm handle Calabar's heavy rains well. For premium projects, step tiles or stone-coated tiles add aesthetic appeal while maintaining excellent water drainage.",
      },
      {
        question: "Can you supply roofing for resort or hotel projects in Cross River?",
        answer:
          "Yes. We supply stone-coated tiles and premium aluminium profiles suitable for hospitality and tourism buildings. Contact us with your project specifications for a customised quotation.",
      },
    ],
  },
  {
    slug: "akwa-ibom",
    name: "Akwa Ibom",
    region: "South-South",
    capital: "Uyo",
    deliveryDays: "3–5 business days",
    deliveryNote:
      "Akwa Ibom State is reached via the Calabar-Itu-Uyo Road or through Aba in Abia State. We deliver to Uyo, Eket, Ikot Ekpene and surrounding areas. Delivery takes three to five working days.",
    hasDealer: false,
    keyAreas: ["Uyo", "Eket", "Ikot Ekpene", "Oron", "Abak"],
    popularProducts: ["Long Span Roofing Sheets", "Stone-Coated Tiles", "Step Tiles"],
    intro:
      "Akwa Ibom State has undergone dramatic urban transformation, particularly in the capital Uyo, where modern infrastructure and architectural standards rival any city in southern Nigeria. The Ibom Air industrial complex, new road networks and expanding residential estates have created strong demand for premium building materials. With heavy annual rainfall and proximity to the coast, roofing in Akwa Ibom must be both beautiful and built to endure. Gods Promise Aluminium delivers factory-direct aluminium roofing sheets to projects across this fast-developing state.",
    whyChooseUs:
      "Akwa Ibom's modern construction standards demand roofing materials that match the state's ambition. Our range includes stone-coated tiles for executive residences in Uyo, and heavy-gauge aluminium sheets for the industrial developments around Eket and Ibeno. Factory-direct pricing means your Akwa Ibom project gets Lagos factory rates without expensive mark-ups.",
    faq: [
      {
        question: "How do I arrange delivery of roofing sheets to Uyo?",
        answer:
          "WhatsApp us at +234 915 045 9964 with your project details and Uyo delivery address. We will provide a quotation including roofing sheets, accessories and delivery charge within the same day.",
      },
      {
        question: "Do you supply roofing materials for industrial projects in Eket?",
        answer:
          "Yes. We supply long span aluminium roofing sheets in heavy gauges (0.55 mm – 1.00 mm) suitable for industrial buildings, warehouses and factory roofs in the Eket industrial corridor.",
      },
      {
        question: "Are stone-coated tiles available for delivery to Akwa Ibom?",
        answer:
          "Yes. We deliver Gerard stone-coated tiles (Shingle, Bond, Classic and Milano) to Akwa Ibom State. These tiles are popular for premium residential estates in Uyo.",
      },
    ],
  },

  // ────────────── SOUTH-EAST ──────────────────────────────────────────────────
  {
    slug: "anambra",
    name: "Anambra",
    region: "South-East",
    capital: "Awka",
    deliveryDays: "2–3 business days",
    deliveryNote:
      "Anambra State is served through the Benin-Onitsha Expressway and the Enugu-Onitsha Road. We deliver to Awka, Onitsha, Nnewi, Ekwulobia and surrounding towns. Transit time is two to three working days.",
    hasDealer: true,
    keyAreas: ["Awka", "Onitsha", "Nnewi", "Ekwulobia", "Ihiala"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles", "Stone-Coated Tiles", "Flat Sheets"],
    intro:
      "Anambra State has one of the strongest building cultures in Nigeria. From the commercial powerhouse of Onitsha to the industrial town of Nnewi and the administrative capital Awka, construction is a constant. Anambra natives invest heavily in homebuilding — many construct landmark projects meant to last generations. This mindset demands roofing materials of uncompromising quality. Gods Promise Aluminium is the factory-direct aluminium roofing company serving Anambra State builders who refuse to compromise on gauge accuracy, colour consistency and overall durability.",
    whyChooseUs:
      "Anambra buyers are famously thorough — and rightly so. We welcome that scrutiny. Every sheet we produce can be verified with a caliper, every colour matched to your specification. Our factory-direct model eliminates the middlemen common in the Onitsha building materials market, giving you genuine factory prices with full traceability.",
    faq: [
      {
        question: "Can I verify the gauge thickness of my roofing sheets before purchasing?",
        answer:
          "Yes. We encourage caliper verification. If you visit our factory, you can measure thickness yourself during production. For remote orders, we provide thickness certifications with every delivery.",
      },
      {
        question: "Do you deliver to Onitsha Main Market area?",
        answer:
          "We deliver to all parts of Anambra State including Onitsha, Awka, Nnewi, Ekwulobia and Ihiala. We can deliver to your project site or to a preferred receiving point.",
      },
      {
        question: "What is the price difference between factory-direct and market prices in Onitsha?",
        answer:
          "Factory-direct prices are typically 10-20% lower than what you find at reseller shops in Onitsha Main Market, because you eliminate the middleman markup. Contact us for a comparative quote.",
      },
    ],
  },
  {
    slug: "enugu",
    name: "Enugu",
    region: "South-East",
    capital: "Enugu",
    deliveryDays: "2–4 business days",
    deliveryNote:
      "Enugu State is accessible via the Benin-Onitsha-Enugu Road or the Ore-Benin-Enugu route. We deliver to Enugu city, Nsukka, Agbani, Udi and surrounding areas. Transit time is two to four working days.",
    hasDealer: true,
    keyAreas: ["Enugu City", "Nsukka", "Agbani", "Udi", "Oji River"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles", "Stone-Coated Tiles"],
    intro:
      "Enugu, the Coal City and former capital of Eastern Nigeria, occupies a unique geographical position on escarpments and hills that shape local construction approaches. The city has experienced a residential boom driven by diaspora investment — Enugu natives living overseas are building retirement homes, rental properties and family compounds. The hilly terrain means roof pitches must be carefully planned, and materials need to handle both heavy rains and strong winds at elevation. Gods Promise Aluminium provides the quality roofing sheets that Enugu's demanding landscape requires.",
    whyChooseUs:
      "Enugu's hilly terrain requires careful roofing planning. Our team can advise on appropriate gauge thickness and profile selection for hillside buildings, ensuring your roof withstands the wind loads common at Enugu's elevation. We supply directly from our factory, cutting out the reseller chain and giving Enugu builders genuine factory pricing.",
    faq: [
      {
        question: "Do you deliver to Nsukka and other parts of Enugu State?",
        answer:
          "Yes. We deliver throughout Enugu State including Enugu city, Nsukka, Agbani, Udi, Oji River and all local government areas. Delivery takes two to four business days.",
      },
      {
        question: "What roofing sheets are popular for diaspora building projects in Enugu?",
        answer:
          "Diaspora clients in Enugu often choose 0.50 mm or 0.55 mm gauge long span for durability, or Gerard stone-coated tiles for a premium finish. We can work with your builder or project manager on-ground to coordinate delivery and specifications.",
      },
      {
        question: "Can you produce roofing sheets for a specific roof pitch in Enugu?",
        answer:
          "We produce sheets to custom lengths, which you can specify based on your roof pitch design. Consult with your architect or builder on the required lengths and share the specifications with us for production.",
      },
    ],
  },
  {
    slug: "imo",
    name: "Imo",
    region: "South-East",
    capital: "Owerri",
    deliveryDays: "3–4 business days",
    deliveryNote:
      "Imo State is reached via the Benin-Onitsha-Owerri route or through Aba in Abia State. We deliver to Owerri, Orlu, Okigwe, Oguta and surrounding areas. Delivery takes three to four business days.",
    hasDealer: false,
    keyAreas: ["Owerri", "Orlu", "Okigwe", "Oguta", "Mbaise"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles", "Stone-Coated Tiles"],
    intro:
      "Imo State, with its capital in Owerri, is a hub of commercial activity and residential development in south-eastern Nigeria. The entertainment industry, hospitality sector and a vibrant diaspora community drive continuous construction — from hotels and event centres along the Owerri-Aba Road to residential estates in New Owerri and World Bank Housing Estate. Imo State builders want roofing materials that make a visual statement while standing up to the region's heavy rainfall. Gods Promise Aluminium delivers both — striking aesthetics and proven durability, direct from our factory.",
    whyChooseUs:
      "Imo State's diverse building landscape, from budget bungalows to show-stopping mansions, means you need a roofing supplier with a complete range. We supply everything from entry-level 0.40 mm long span sheets to premium Gerard stone-coated tiles, all at factory-direct prices. Our WhatsApp-based ordering makes it easy to manage your purchase even if you are coordinating from abroad.",
    faq: [
      {
        question: "I am building in Owerri from abroad — can you coordinate with my builder?",
        answer:
          "Yes. Many of our Imo State clients manage projects remotely. We can liaise directly with your builder or project manager on specifications, delivery scheduling and site access.",
      },
      {
        question: "What is the delivery cost to Owerri, Imo State?",
        answer:
          "Delivery cost varies based on order quantity. Contact us on WhatsApp with your full order details and Owerri address, and we will include the delivery charge in your quotation.",
      },
      {
        question: "Do you supply coloured aluminium flat sheets to Imo State?",
        answer:
          "Yes. We supply aluminium flat sheets in multiple thicknesses and colours for custom fabrication work including fascia boards, soffits and wall cladding. These are available for delivery to Imo State.",
      },
    ],
  },
  {
    slug: "abia",
    name: "Abia",
    region: "South-East",
    capital: "Umuahia",
    deliveryDays: "3–4 business days",
    deliveryNote:
      "Abia State is accessible via the Enugu-Port Harcourt Expressway. We deliver to Umuahia, Aba, Ohafia and surrounding towns. Transit time is three to four working days from our factory.",
    hasDealer: false,
    keyAreas: ["Umuahia", "Aba", "Ohafia", "Arochukwu", "Isialangwa"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles", "Flat Sheets"],
    intro:
      "Abia State is defined by two engines — the administrative capital Umuahia and the commercial powerhouse Aba, known across West Africa as a manufacturing and trading hub. Aba's Ariaria International Market generates enormous demand for building materials, and the city's workshops fabricate everything from shoes to electronics under aluminium roofs. Beyond commerce, residential construction in Umuahia's expanding suburbs requires reliable roofing at fair prices. Gods Promise Aluminium serves both markets with factory-direct aluminium roofing sheets that skip the reseller chain.",
    whyChooseUs:
      "Aba's entrepreneurs know the value of cutting out middlemen. Our factory-direct supply model resonates with the Abia business mindset — you get genuine factory pricing, verified gauges and direct communication with the manufacturer. Whether you need roofing for a workshop in Aba or a residential project in Umuahia, we deliver the same consistent quality.",
    faq: [
      {
        question: "Do you deliver to both Aba and Umuahia?",
        answer:
          "Yes. We deliver to both cities and all other parts of Abia State. Aba and Umuahia deliveries typically arrive within three to four business days of dispatch.",
      },
      {
        question: "Can I get flat aluminium sheets for fabrication work in Aba?",
        answer:
          "Yes. We supply aluminium flat sheets in various thicknesses suitable for fabrication, signage, wall cladding and other metalwork. Contact us with your required thickness and quantity.",
      },
      {
        question: "Is there a minimum order quantity for Abia State delivery?",
        answer:
          "No strict minimum, but we recommend placing orders of at least 50 sqm to make the delivery cost economical. For smaller quantities, consider combining with other building materials in your order.",
      },
    ],
  },
  {
    slug: "ebonyi",
    name: "Ebonyi",
    region: "South-East",
    capital: "Abakaliki",
    deliveryDays: "3–5 business days",
    deliveryNote:
      "Ebonyi State is reached via the Enugu-Abakaliki Road. We deliver to Abakaliki, Afikpo, Onueke, Ezza and surrounding areas. Transit time is three to five business days.",
    hasDealer: false,
    keyAreas: ["Abakaliki", "Afikpo", "Onueke", "Ezza", "Ishielu"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles"],
    intro:
      "Ebonyi State has undergone remarkable infrastructure development in recent years. The state capital Abakaliki has been transformed with flyovers, new road networks and modern buildings that demand quality finishing materials. The Ebonyi State rice revolution and salt mining industry have driven economic growth, translating into more residential and commercial construction projects. Gods Promise Aluminium provides the durable, factory-direct aluminium roofing sheets that match the ambition of Ebonyi's building transformation.",
    whyChooseUs:
      "As Ebonyi State modernises, the buildings going up deserve roofing materials that reflect the state's progress. Our aluminium roofing sheets offer clean lines, accurate gauges and lasting colours that will not fade or corrode in the local climate. Factory-direct pricing ensures your budget goes further on every project.",
    faq: [
      {
        question: "Do you deliver roofing sheets to Abakaliki?",
        answer:
          "Yes. We deliver to Abakaliki and all parts of Ebonyi State. Deliveries are routed through Enugu and typically take three to five business days.",
      },
      {
        question: "What gauges are recommended for residential buildings in Ebonyi?",
        answer:
          "For standard residential roofing in Ebonyi, 0.45 mm to 0.50 mm gauge provides a good balance of durability and cost. For larger or commercial structures, 0.55 mm and above offers enhanced wind resistance.",
      },
      {
        question: "Can I pay on delivery for roofing sheets in Ebonyi State?",
        answer:
          "We typically require payment confirmation before dispatch for interstate deliveries. Contact us to discuss payment arrangements that work for your project timeline.",
      },
    ],
  },

  // ────────────── NORTH-CENTRAL ───────────────────────────────────────────────
  {
    slug: "abuja",
    name: "Abuja (FCT)",
    region: "North-Central",
    capital: "Abuja",
    deliveryDays: "2–4 business days",
    deliveryNote:
      "We deliver to the Federal Capital Territory via the Lagos-Abuja highway corridor. Coverage includes Abuja city, Gwagwalada, Kubwa, Bwari, Kuje and Nyanya. Delivery takes two to four working days depending on the specific location within the FCT.",
    hasDealer: true,
    keyAreas: ["Central Area", "Gwarinpa", "Kubwa", "Maitama", "Lugbe", "Gwagwalada"],
    popularProducts: ["Stone-Coated Tiles", "Step Tiles", "Long Span Roofing Sheets"],
    intro:
      "Abuja, Nigeria's federal capital, sets the standard for modern architecture and premium construction in the country. From government buildings in the Three Arms Zone to luxury villas in Maitama and Asokoro, and the rapidly expanding satellite towns of Lugbe, Kubwa and Gwagwalada, the FCT demands roofing materials that meet the highest aesthetic and structural standards. The dry season brings Harmattan dust and intense heat, while the wet season delivers heavy downpours — your roof must handle both extremes. Gods Promise Aluminium supplies the FCT with factory-direct aluminium roofing sheets and stone-coated tiles that match Abuja's building standards.",
    whyChooseUs:
      "Abuja builders expect premium quality, and we deliver exactly that. Our stone-coated tiles are particularly popular for the executive estates in Maitama, Asokoro and Gwarinpa, while our long span sheets serve the massive housing developments in satellite towns. Factory-direct pricing means you are paying for material quality, not middleman margins — and every sheet can be verified before it leaves our production line.",
    faq: [
      {
        question: "What roofing materials are best for Abuja's climate?",
        answer:
          "Aluminium handles Abuja's dual climate well — reflecting heat during the dry season and resisting corrosion during the rains. Stone-coated tiles add an extra layer of heat insulation and are popular for residential estates.",
      },
      {
        question: "How much does delivery to Abuja cost?",
        answer:
          "Delivery cost to the FCT depends on order volume and exact location (city centre vs satellite town). Contact us on WhatsApp for a quote that includes delivery to your specific address.",
      },
      {
        question: "Do you supply roofing for government contract projects?",
        answer:
          "Yes. We supply roofing materials for institutional and government projects. We can provide proforma invoices, delivery documentation and quality certificates as required for contract compliance.",
      },
      {
        question: "Can I get a site survey before ordering roofing sheets for my Abuja project?",
        answer:
          "We can work with your architect or builder to determine the exact quantity and specifications needed. Share your roof plan drawings via WhatsApp and we will prepare a precise material list and quotation.",
      },
    ],
  },
  {
    slug: "kwara",
    name: "Kwara",
    region: "North-Central",
    capital: "Ilorin",
    deliveryDays: "1–2 business days",
    deliveryNote:
      "Kwara State is well-connected to our factory through the Lagos-Ibadan-Ilorin corridor. We deliver to Ilorin, Offa, Omu-Aran, Jebba and surrounding areas. Delivery typically arrives within one to two business days.",
    hasDealer: false,
    keyAreas: ["Ilorin", "Offa", "Omu-Aran", "Jebba", "Lafiagi"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles"],
    intro:
      "Kwara State sits at the gateway between northern and southern Nigeria, and its capital Ilorin is one of the fastest-growing cities in the middle belt. The University of Ilorin has attracted an academic community that drives residential construction, while the expanding commercial district along the Ilorin-Lagos Road creates demand for quality roofing on new plazas and office buildings. Gods Promise Aluminium delivers factory-direct aluminium roofing sheets to Kwara State, leveraging the Lagos-Ilorin highway for fast, reliable logistics.",
    whyChooseUs:
      "Kwara State's position on the Lagos-Ilorin highway gives it one of the fastest delivery times outside the South-West. You benefit from the same factory-gate pricing as our Lagos customers with only a short transit distance. Our production-to-order model means you get the exact profile, gauge and colour you need for your Ilorin project.",
    faq: [
      {
        question: "How quickly can roofing sheets reach Ilorin from your factory?",
        answer:
          "Ilorin deliveries typically arrive within one to two business days of dispatch. The direct Lagos-Ilorin highway makes this one of our fastest interstate delivery routes.",
      },
      {
        question: "Is there a dealer for Gods Promise Aluminium in Kwara State?",
        answer:
          "We currently handle Kwara State orders directly from our factory. Contact us on WhatsApp to place your order and we will arrange delivery to your site.",
      },
      {
        question: "What roofing profiles do you supply to Kwara State?",
        answer:
          "We supply long span roofing sheets, step tiles, Metcopo profiles and flat sheets to Kwara State. Stone-coated tiles are also available. Contact us with your project specifications for a quote.",
      },
    ],
  },
  {
    slug: "kogi",
    name: "Kogi",
    region: "North-Central",
    capital: "Lokoja",
    deliveryDays: "2–3 business days",
    deliveryNote:
      "Kogi State is served via the Abuja-Lokoja Expressway and the Okene corridor. We deliver to Lokoja, Okene, Kabba, Idah and surrounding areas. Transit takes two to three business days.",
    hasDealer: false,
    keyAreas: ["Lokoja", "Okene", "Kabba", "Idah", "Ankpa"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles"],
    intro:
      "Kogi State sits at the confluence of the Niger and Benue rivers — a strategic position that has made Lokoja an important transit point and growing city. The state's mineral wealth including iron ore and coal supports an expanding economy, with new residential and commercial buildings rising across Lokoja, Okene and Kabba. The confluence location brings both heavy rains and Harmattan dryness, requiring roofing that performs across seasons. Gods Promise Aluminium delivers dependable aluminium roofing sheets to builders across Kogi State at factory-direct prices.",
    whyChooseUs:
      "Kogi State's mix of wet and dry climate conditions demands versatile roofing. Our aluminium sheets handle both the heavy downpours of the rainy season and the dusty Harmattan without degradation — no rust, no peeling, no warping. We deliver to all major towns in Kogi on reliable schedules.",
    faq: [
      {
        question: "Do you deliver to Lokoja and Okene?",
        answer:
          "Yes. We deliver throughout Kogi State including Lokoja, Okene, Kabba, Idah and Ankpa. Delivery time is typically two to three business days.",
      },
      {
        question: "What payment methods do you accept for Kogi State orders?",
        answer:
          "We accept bank transfers and verified payment confirmations. Contact us on WhatsApp to receive our account details and process your order efficiently.",
      },
      {
        question: "Can you supply roofing for large community projects in Kogi?",
        answer:
          "Yes. We handle bulk orders for community buildings, churches, mosques and institutional projects. We offer competitive bulk pricing and can produce to the specific lengths your project requires.",
      },
    ],
  },
  {
    slug: "niger",
    name: "Niger",
    region: "North-Central",
    capital: "Minna",
    deliveryDays: "2–4 business days",
    deliveryNote:
      "Niger State is accessible via the Abuja-Minna Expressway and the Bida Road. We deliver to Minna, Bida, Suleja, Kontagora and surrounding areas. Transit time is two to four business days.",
    hasDealer: false,
    keyAreas: ["Minna", "Bida", "Suleja", "Kontagora", "New Bussa"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles"],
    intro:
      "Niger State is the largest state in Nigeria by land area, stretching from the Abuja corridor through Minna to the remote areas near the Niger Republic border. The state's hydropower infrastructure at Kainji and Jebba dams has supported industrial growth, while Minna's proximity to Abuja drives a steady residential construction market. Suleja, practically an extension of the FCT, is booming with housing developments. Gods Promise Aluminium supplies aluminium roofing sheets across this vast state, from the urban centres to emerging towns, at consistent factory-direct pricing.",
    whyChooseUs:
      "Niger State's large geographical spread means delivery logistics matter. We have experience shipping to locations across the state using reliable transport routes via Abuja and the Kaduna corridor. Whether your project is in suburban Suleja or rural Kontagora, you receive the same quality and pricing.",
    faq: [
      {
        question: "Can you deliver to Suleja, Niger State?",
        answer:
          "Yes. Suleja is close to the FCT and well-served by our delivery routes. Delivery to Suleja typically takes two to three business days from our factory.",
      },
      {
        question: "What roofing is suitable for Niger State's hot, dry climate?",
        answer:
          "Aluminium reflects solar heat better than darker zinc options, helping keep interiors cooler in Niger State's hot climate. We recommend light-coloured sheets (white, cream or light grey) for maximum heat reflection.",
      },
      {
        question: "Do you deliver to Kontagora and other distant Niger State towns?",
        answer:
          "Yes. We deliver statewide. Remote areas may take three to four working days, and delivery cost is adjusted for distance. Contact us for a quote specific to your location.",
      },
    ],
  },
  {
    slug: "plateau",
    name: "Plateau",
    region: "North-Central",
    capital: "Jos",
    deliveryDays: "3–4 business days",
    deliveryNote:
      "Plateau State is reached via the Abuja-Jos Expressway. We deliver to Jos, Bukuru, Barkin Ladi, Pankshin and surrounding areas. Transit time is three to four working days from our factory.",
    hasDealer: false,
    keyAreas: ["Jos", "Bukuru", "Barkin Ladi", "Pankshin", "Shendam"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles", "Stone-Coated Tiles"],
    intro:
      "Plateau State is unique in Nigeria — its high-altitude location gives Jos and surrounding areas a temperate climate that is closer to European conditions than typical West African weather. This cooler climate attracts residential development and tourism, but it also brings cold night-time temperatures and occasional hailstorms that test roofing durability. The rocky, hilly terrain of Jos means wind patterns can be unpredictable. Gods Promise Aluminium supplies roofing sheets built to handle Plateau State's distinct climate, from the cool Jos Plateau to the warmer lowland areas around Shendam.",
    whyChooseUs:
      "Plateau States unusual climate means you need a supplier who understands that not all roofing performs equally in cool, high-altitude conditions. Our aluminium sheets maintain their structural integrity across temperature swings and resist the occasional hailstorms that Jos experiences. We deliver via the Abuja-Jos highway for reliable, scheduled access.",
    faq: [
      {
        question: "Is aluminium roofing suitable for Jos's cold season?",
        answer:
          "Yes. Aluminium handles temperature fluctuations without cracking or warping, unlike some other materials. For extra insulation, we recommend pairing aluminium sheets with insulation felt, which we also supply.",
      },
      {
        question: "How long does delivery to Jos take from your Lagos factory?",
        answer:
          "Delivery to Jos typically takes three to four business days via the Abuja-Jos Expressway. We schedule deliveries to ensure your materials arrive in good condition.",
      },
      {
        question: "Do you supply coloured roofing sheets to Plateau State?",
        answer:
          "Yes. We offer a full colour range including wine, blue, green, brown, black, and more. Light colours are popular in Jos for their aesthetic match with the landscape.",
      },
    ],
  },
  {
    slug: "nasarawa",
    name: "Nasarawa",
    region: "North-Central",
    capital: "Lafia",
    deliveryDays: "2–4 business days",
    deliveryNote:
      "Nasarawa State is adjacent to the FCT and accessible via the Abuja-Keffi-Lafia Road. We deliver to Lafia, Keffi, Akwanga, Nasarawa Town and surrounding areas. Transit time is two to four working days.",
    hasDealer: false,
    keyAreas: ["Lafia", "Keffi", "Akwanga", "Nasarawa Town", "Doma"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles"],
    intro:
      "Nasarawa State has become a major beneficiary of Abuja's expansion. Towns like Keffi and Mararaba are now effectively satellite cities of the FCT, with thousands of civil servants and workers commuting daily. This has sparked an unprecedented housing construction boom — affordable residential estates are rising across the Keffi-Lafia corridor. As people build homes just outside Abuja's borders for cost savings, the demand for quality, affordable roofing materials has surged. Gods Promise Aluminium meets this demand with factory-direct pricing and reliable delivery to every corner of Nasarawa State.",
    whyChooseUs:
      "Nasarawa's proximity to Abuja means delivery is fast and affordable via the Keffi Road. Our factory-direct pricing is especially attractive for the cost-conscious builders who choose Nasarawa over the FCT for its lower land costs. We make sure the roofing quality matches their ambition, not their budget constraints.",
    faq: [
      {
        question: "Do you deliver to Keffi and Mararaba?",
        answer:
          "Yes. Keffi and Mararaba are among our most frequent Nasarawa State delivery points, given their proximity to Abuja. Delivery takes two to three business days.",
      },
      {
        question: "What is the cheapest roofing option for my Nasarawa housing project?",
        answer:
          "Our 0.40 mm long span aluminium sheets start from ₦4,300 per sqm and provide reliable protection at an entry-level price. For better long-term value, we recommend 0.45 mm gauge which offers improved durability.",
      },
      {
        question: "Can you supply materials for an entire housing estate in Nasarawa?",
        answer:
          "Yes. We regularly supply estate-scale orders with priority production scheduling and bulk pricing. Contact us with your estate plan and we will provide a comprehensive material and pricing breakdown.",
      },
    ],
  },
  {
    slug: "benue",
    name: "Benue",
    region: "North-Central",
    capital: "Makurdi",
    deliveryDays: "3–5 business days",
    deliveryNote:
      "Benue State is reached via the Abuja-Makurdi Road. We deliver to Makurdi, Otukpo, Gboko, Katsina-Ala and surrounding areas. Delivery takes three to five working days.",
    hasDealer: false,
    keyAreas: ["Makurdi", "Otukpo", "Gboko", "Katsina-Ala", "Vandeikya"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles"],
    intro:
      "Benue State, the Food Basket of the Nation, is primarily agricultural but its capital Makurdi is growing steadily with new residential developments along the banks of the Benue River. Agricultural processing facilities, warehouses and market buildings also require durable roofing. The state experiences significant rainfall during the wet season, with the Benue River flooding creating a high-moisture environment. Aluminium roofing is the logical choice for its rust-proof properties. Gods Promise Aluminium brings factory-direct roofing supplies to Benue State builders who need materials built to last.",
    whyChooseUs:
      "Benue's agricultural economy means many buildings serve dual residential-agricultural purposes — farmhouse stores, processing sheds, market stalls. Our roofing sheets are versatile enough for all these applications, and we produce to custom lengths to fit non-standard structure sizes commonly found in Benue State.",
    faq: [
      {
        question: "Do you deliver aluminium roofing sheets to Makurdi?",
        answer:
          "Yes. We deliver to Makurdi via the Abuja Road and cover all parts of Benue State including Otukpo, Gboko, Katsina-Ala and Vandeikya. Transit time is three to five business days.",
      },
      {
        question: "Can you supply roofing for farm buildings and warehouses in Benue State?",
        answer:
          "Yes. Our long span sheets in heavier gauges (0.50 mm+) are suitable for agricultural buildings and warehouses. We can produce custom lengths to match your structure's span without needing additional joins.",
      },
      {
        question: "What colours are available for roofing sheets delivered to Benue?",
        answer:
          "All colours in our standard range are available including wine, blue, green, brown, black, grey and more. Contact us for the full colour chart or request physical samples.",
      },
    ],
  },

  // ────────────── NORTH-WEST ──────────────────────────────────────────────────
  {
    slug: "kano",
    name: "Kano",
    region: "North-West",
    capital: "Kano",
    deliveryDays: "3–5 business days",
    deliveryNote:
      "Kano State is reached via the Abuja-Kaduna-Kano Expressway. We deliver to Kano city, Fagge, Nassarawa, Ungogo and surrounding areas. Transit time is three to five business days from our factory.",
    hasDealer: true,
    keyAreas: ["Kano City", "Fagge", "Nassarawa", "Ungogo", "Wudil"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles", "Flat Sheets"],
    intro:
      "Kano is the commercial capital of northern Nigeria and the most populous city in the region, with a construction market driven by its massive trading economy, industrial zone and growing residential suburbs. The hot, semi-arid climate means roofing materials must handle extreme heat during the dry season and intense, short-duration rains during the wet season. Kano's Sabon Gari market is one of the largest building materials markets in the North, but factory-direct supply from Gods Promise Aluminium beats market prices consistently while guaranteeing genuine gauge thickness and colour quality.",
    whyChooseUs:
      "Kano's market is large enough to attract substandard roofing products from various sources. Going factory-direct with Gods Promise Aluminium eliminates the risk of receiving mislabelled gauges or faded colours. Our sheets are produced to order at our factory and shipped directly to your Kano project site with full quality documentation.",
    faq: [
      {
        question: "How do I order roofing sheets for delivery to Kano?",
        answer:
          "WhatsApp us at +234 915 045 9964 with your specifications — profile, gauge, colour, quantity and delivery address in Kano. We will send a quotation including delivery cost within the same business day.",
      },
      {
        question: "What roofing colour is best for Kano's hot climate?",
        answer:
          "Light colours (white, cream, light grey, light blue) reflect more solar heat and keep interior temperatures lower. This is especially important in Kano where dry season temperatures can exceed 40°C.",
      },
      {
        question: "Is there a Gods Promise Aluminium dealer in Kano?",
        answer:
          "We work with distribution partners in the Kano area. Contact us and we will connect you with the nearest stockist or arrange direct factory delivery to your site.",
      },
    ],
  },
  {
    slug: "kaduna",
    name: "Kaduna",
    region: "North-West",
    capital: "Kaduna",
    deliveryDays: "3–4 business days",
    deliveryNote:
      "Kaduna State is well-connected via the Abuja-Kaduna Expressway and the Kaduna rail line corridor. We deliver to Kaduna city, Zaria, Kafanchan, Kachia and surrounding areas within three to four working days.",
    hasDealer: true,
    keyAreas: ["Kaduna City", "Zaria", "Kafanchan", "Kachia", "Birnin Gwari"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles", "Stone-Coated Tiles"],
    intro:
      "Kaduna State has long been an industrial and military centre in northern Nigeria, and its construction sector reflects that heritage with a mix of institutional, commercial and residential projects. The state capital Kaduna city is expanding along the Abuja highway corridor, while Zaria — home to Ahmadu Bello University — maintains a steady demand for student housing and academic infrastructure. Kaduna's Guinea Savanna climate brings a distinct wet and dry season, both of which test roofing performance. Gods Promise Aluminium provides factory-direct roofing sheets that handle Kaduna's climate with zero maintenance.",
    whyChooseUs:
      "Kaduna's distance from coastal Lagos means you need a supplier whose delivery is reliable and whose products justify the transport cost. Our aluminium sheets are manufactured to order, delivered on schedule and backed by a quality guarantee. The Abuja-Kaduna highway ensures smooth logistics, and our pricing stays competitive even with the delivery cost included.",
    faq: [
      {
        question: "How long does delivery to Kaduna take?",
        answer:
          "Delivery to Kaduna city and Zaria typically takes three to four business days from our factory. We route through Abuja and the Abuja-Kaduna Expressway for reliable transit.",
      },
      {
        question: "Do you supply roofing for university and institutional projects?",
        answer:
          "Yes. We supply roofing materials for universities, barracks, hospitals and other institutional buildings. We can provide the documentation needed for formal procurement processes.",
      },
      {
        question: "What is the most popular roofing sheet in Kaduna?",
        answer:
          "Long span roofing sheets in 0.45 mm and 0.50 mm gauges are the most popular in Kaduna for residential projects. Step tiles are gaining popularity for their modern look on new estate developments.",
      },
    ],
  },
  {
    slug: "katsina",
    name: "Katsina",
    region: "North-West",
    capital: "Katsina",
    deliveryDays: "4–5 business days",
    deliveryNote:
      "Katsina State is reached via Kano or through the Kaduna-Funtua-Katsina road. We deliver to Katsina city, Funtua, Daura, Malumfashi and surrounding areas. Transit time is four to five business days.",
    hasDealer: false,
    keyAreas: ["Katsina City", "Funtua", "Daura", "Malumfashi", "Kankia"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles"],
    intro:
      "Katsina State, birthplace of the Katsina Durbar and a centre of traditional learning, is experiencing modern development alongside its cultural heritage. New markets, residential quarters and agricultural processing facilities are being built across the state from Funtua in the south to Daura in the north. The hot, arid climate with intense sun exposure requires roofing materials that resist heat damage and UV degradation. Gods Promise Aluminium delivers aluminium roofing sheets to Katsina State that maintain their colour and integrity through years of harsh Sahel sun.",
    whyChooseUs:
      "Katsina's extreme heat makes material selection critical. Our aluminium roofing sheets reflect solar radiation more effectively than galvanised alternatives, helping keep buildings cooler. They will not warp, crack or lose colour after years of Sahelian sun exposure — a lasting investment for your Katsina project.",
    faq: [
      {
        question: "Can you deliver roofing sheets to Katsina State?",
        answer:
          "Yes. We deliver to Katsina city, Funtua, Daura and all parts of the state. Delivery takes four to five business days from our factory.",
      },
      {
        question: "How does aluminium roofing handle Katsina's extreme heat?",
        answer:
          "Aluminium has high reflectivity, bouncing back more solar energy than zinc or steel alternatives. Combined with light colours, aluminium roofing significantly reduces heat transfer into the building interior.",
      },
      {
        question: "What gauge roofing is recommended for Katsina?",
        answer:
          "For residential buildings in Katsina, 0.45 mm is a popular choice balancing cost and durability. For commercial or public buildings, 0.50 mm and above provides extra strength against strong dry-season winds.",
      },
    ],
  },
  {
    slug: "zamfara",
    name: "Zamfara",
    region: "North-West",
    capital: "Gusau",
    deliveryDays: "4–6 business days",
    deliveryNote:
      "Zamfara State is reached via the Kaduna-Funtua-Gusau Road or through Sokoto. We deliver to Gusau, Kaura Namoda, Anka, Talata Mafara and surrounding areas. Transit time is four to six business days.",
    hasDealer: false,
    keyAreas: ["Gusau", "Kaura Namoda", "Anka", "Talata Mafara"],
    popularProducts: ["Long Span Roofing Sheets"],
    intro:
      "Zamfara State's gold mining boom has injected significant resources into the local economy, and that wealth is being channelled into construction — new homes, commercial buildings and community structures across Gusau, Kaura Namoda and smaller towns. The semi-arid climate presents intense heat and seasonal dust storms that quickly degrade cheap roofing materials. Gods Promise Aluminium offers Zamfara State builders durable aluminium roofing that maintains its quality through the challenging northern climate, delivered directly from our factory at honest pricing.",
    whyChooseUs:
      "You do not need to rely on whatever roofing is available in local Zamfara markets. Our factory-direct supply means you access the full range of profiles, gauges and colours — produced specifically for your order and delivered to your site. This is especially valuable in Zamfara where local material availability can be inconsistent.",
    faq: [
      {
        question: "How does delivery to Zamfara State work?",
        answer:
          "We ship via trailer through the Kaduna-Funtua-Gusau corridor. Delivery takes four to six business days. Contact us with your location and we will provide exact timing and cost.",
      },
      {
        question: "Is aluminium roofing common in Zamfara State?",
        answer:
          "Aluminium roofing is growing in popularity across Zamfara due to its durability and heat resistance. Many new construction projects in Gusau now specify aluminium over galvanised zinc for longer lifespan.",
      },
      {
        question: "What is the cost of roofing sheets including delivery to Zamfara?",
        answer:
          "Sheet prices start from ₦4,300/sqm. Delivery cost varies by order volume and location within Zamfara. WhatsApp us for a complete quote including delivery to your address.",
      },
    ],
  },
  {
    slug: "sokoto",
    name: "Sokoto",
    region: "North-West",
    capital: "Sokoto",
    deliveryDays: "5–7 business days",
    deliveryNote:
      "Sokoto State is one of our most distant delivery points, reached via the Kaduna-Gusau-Sokoto Road. We deliver to Sokoto city, Bodinga, Wamakko, Tambuwal and surrounding areas. Transit time is five to seven business days.",
    hasDealer: false,
    keyAreas: ["Sokoto City", "Bodinga", "Wamakko", "Tambuwal"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles"],
    intro:
      "Sokoto, the seat of the Sokoto Caliphate, is one of the hottest cities in Nigeria with temperatures regularly exceeding 40°C. This extreme heat is the single most important factor in roofing material selection — your roof is your primary shield against the relentless Sahel sun. Construction in Sokoto ranges from traditional palace architecture to modern commercial buildings and mosques that serve as community anchors. Gods Promise Aluminium supplies heat-reflective aluminium roofing sheets to Sokoto State, a material choice that keeps interiors significantly cooler than galvanised zinc alternatives.",
    whyChooseUs:
      "In Sokoto's extreme heat, the right roofing material makes a measurable difference in indoor comfort. Our aluminium sheets have superior solar reflectance, and we recommend light-coloured finishes that can reduce roof surface temperature by 15-20°C compared to dark-coloured zinc. We deliver to Sokoto despite the distance because every Nigerian state deserves access to factory-quality roofing.",
    faq: [
      {
        question: "Can you really deliver to Sokoto from Lagos?",
        answer:
          "Yes. We regularly deliver to all 36 states including Sokoto. Delivery takes five to seven business days via the Kaduna-Gusau-Sokoto route. We use experienced transport partners for long-distance haulage.",
      },
      {
        question: "What colour roofing sheet keeps a building coolest in Sokoto?",
        answer:
          "White or cream-coloured aluminium reflects the most solar heat. For Sokoto's extreme temperatures, these colours combined with insulation felt underneath provide the best indoor temperature reduction.",
      },
      {
        question: "Is aluminium more expensive than zinc for roofing in Sokoto?",
        answer:
          "The initial cost per square metre is slightly higher, but aluminium lasts 2-3 times longer in Sokoto's harsh climate and requires zero maintenance. Over the building's lifetime, aluminium is the more economical choice.",
      },
    ],
  },
  {
    slug: "kebbi",
    name: "Kebbi",
    region: "North-West",
    capital: "Birnin Kebbi",
    deliveryDays: "5–7 business days",
    deliveryNote:
      "Kebbi State is reached via the Sokoto-Birnin Kebbi Road or through the Kaduna-Kontagora-Yauri route. We deliver to Birnin Kebbi, Argungu, Yauri, Zuru and surrounding areas. Transit time is five to seven working days.",
    hasDealer: false,
    keyAreas: ["Birnin Kebbi", "Argungu", "Yauri", "Zuru", "Jega"],
    popularProducts: ["Long Span Roofing Sheets"],
    intro:
      "Kebbi State, home to the famous Argungu Fishing Festival and a leader in Nigeria's rice revolution, is a state where agriculture drives the economy and shapes the built environment. New rice mills, storage warehouses and residential buildings are going up across Birnin Kebbi, Argungu and Yauri. The hot, dry climate demands roofing that can endure relentless sun without degradation. Gods Promise Aluminium delivers durable, factory-direct aluminium roofing sheets to Kebbi State — materials built for the Sahel that maintain their appearance and performance for decades.",
    whyChooseUs:
      "Kebbi's agricultural boom means more buildings are going up than ever. Whether you are roofing a rice processing mill, a new market or a family residence, our factory-direct aluminium sheets give you reliable quality at fair pricing. We deliver directly to your site, saving you from the limited and often overpriced roofing options available in Kebbi's local markets.",
    faq: [
      {
        question: "Do you deliver roofing sheets to Birnin Kebbi?",
        answer:
          "Yes. We deliver to Birnin Kebbi and all parts of Kebbi State. Transit time is five to seven business days. Contact us for a quotation including delivery cost.",
      },
      {
        question: "Can you supply roofing for agricultural buildings in Kebbi?",
        answer:
          "Yes. Our long span sheets in 0.50 mm gauge and above are ideal for warehouses, mills and large agricultural structures. We produce custom lengths to span wide buildings without joints.",
      },
      {
        question: "What is the minimum order for delivery to Kebbi State?",
        answer:
          "We suggest a minimum order of 100 sqm for distant deliveries to make shipping cost-effective. Contact us to discuss your project requirements and we will find the best solution.",
      },
    ],
  },
  {
    slug: "jigawa",
    name: "Jigawa",
    region: "North-West",
    capital: "Dutse",
    deliveryDays: "4–6 business days",
    deliveryNote:
      "Jigawa State is reached via the Kano-Dutse Road. We deliver to Dutse, Hadejia, Gumel, Kazaure and surrounding areas. Transit time is four to six working days.",
    hasDealer: false,
    keyAreas: ["Dutse", "Hadejia", "Gumel", "Kazaure", "Birnin Kudu"],
    popularProducts: ["Long Span Roofing Sheets"],
    intro:
      "Jigawa State is one of the emerging states in northern Nigeria where government-driven infrastructure development is opening up new construction opportunities. The state capital Dutse is being modernised with new government buildings and residential quarters, while agricultural towns like Hadejia and Gumel are seeing private sector investment in storage facilities and housing. The hot, dry climate of the Sudan Savanna demands roofing that handles extreme temperatures and seasonal rainstorms. Gods Promise Aluminium supplies quality roofing sheets to Jigawa State builders at factory-direct prices that make quality accessible.",
    whyChooseUs:
      "Jigawa State builders often face limited local material options. By ordering directly from our factory, you access the full range of aluminium roofing profiles and gauges at factory pricing. We handle logistics through Kano for efficient delivery to Dutse and surrounding towns.",
    faq: [
      {
        question: "How do I get roofing sheets delivered to Dutse, Jigawa?",
        answer:
          "Contact us on WhatsApp with your order details and Dutse address. We route through Kano and deliver within four to six business days. We include delivery cost in your quotation.",
      },
      {
        question: "Are aluminium roofing sheets available in Jigawa markets?",
        answer:
          "Availability in local Jigawa markets can be limited. Ordering factory-direct ensures you get the exact gauge, colour and quantity you need without depending on local stock.",
      },
      {
        question: "Can you supply roofing sheets for mosque construction in Jigawa?",
        answer:
          "Yes. We supply roofing for religious buildings, commercial properties and residential homes. We can produce sheets to the lengths required for the wide spans common in mosque architecture.",
      },
    ],
  },

  // ────────────── NORTH-EAST ──────────────────────────────────────────────────
  {
    slug: "bauchi",
    name: "Bauchi",
    region: "North-East",
    capital: "Bauchi",
    deliveryDays: "4–5 business days",
    deliveryNote:
      "Bauchi State is accessible via the Jos-Bauchi Road or the Abuja-Kaduna-Bauchi corridor. We deliver to Bauchi city, Azare, Misau, Tafawa Balewa and surrounding areas. Transit time is four to five working days.",
    hasDealer: false,
    keyAreas: ["Bauchi City", "Azare", "Misau", "Tafawa Balewa", "Dass"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles"],
    intro:
      "Bauchi State sits at the threshold of Nigeria's north-east, an area undergoing significant reconstruction and new development. The state capital Bauchi is growing with new residential estates and commercial plazas, while Yankari National Park draws tourism investment that includes lodges and hospitality facilities. Bauchi's climate swings between intense dry-season heat and heavy wet-season downpours, demanding roofing that performs reliably in both extremes. Gods Promise Aluminium delivers factory-quality aluminium roofing to Bauchi State projects — rust-free, weather-resistant and built for the long term.",
    whyChooseUs:
      "Bauchi State projects need roofing that stands up to extreme temperature variation. Our aluminium sheets do not expand and contract as much as zinc under thermal cycling, which means fewer creaking sounds, better seal integrity and longer lifespan. We deliver reliably through the Jos-Bauchi route.",
    faq: [
      {
        question: "Do you deliver roofing materials to Bauchi State?",
        answer:
          "Yes. We deliver to Bauchi city, Azare, Misau and all parts of the state. Delivery typically takes four to five business days via the Jos-Bauchi Road.",
      },
      {
        question: "What is the best gauge for residential roofing in Bauchi?",
        answer:
          "We recommend 0.45 mm as a minimum for Bauchi residential projects. If your area is prone to strong winds or hailstorms, consider 0.50 mm for added resilience.",
      },
      {
        question: "Can you supply roofing for tourism facilities near Yankari?",
        answer:
          "Yes. We supply roofing for lodges, chalets and hospitality buildings. Stone-coated tiles are a popular choice for tourism facilities as they provide a natural, attractive appearance.",
      },
    ],
  },
  {
    slug: "gombe",
    name: "Gombe",
    region: "North-East",
    capital: "Gombe",
    deliveryDays: "4–6 business days",
    deliveryNote:
      "Gombe State is reached via the Bauchi-Gombe Road. We deliver to Gombe city, Billiri, Kaltungo, Deba and surrounding areas. Transit time is four to six working days from our factory.",
    hasDealer: false,
    keyAreas: ["Gombe City", "Billiri", "Kaltungo", "Deba", "Kumo"],
    popularProducts: ["Long Span Roofing Sheets"],
    intro:
      "Gombe State, known as the Jewel of the Savannah, occupies a central position in north-eastern Nigeria and serves as a commercial hub connecting Bauchi, Yobe, Borno and Adamawa. The state capital Gombe is growing with new government infrastructure, educational institutions, and residential developments. The semi-arid climate brings extreme heat and seasonal rainstorms that test building materials. Gods Promise Aluminium gets factory-direct aluminium roofing sheets to Gombe State builders — durable, lightweight materials that hold up under the savannah sun and sudden rains alike.",
    whyChooseUs:
      "Gombe's strategic location as a north-eastern hub means construction is growing. Our factory-direct supply chain ensures you do not pay inflated prices for quality roofing material. We deliver consistently through the Bauchi corridor, bringing you the same quality available in Lagos at competitive pricing.",
    faq: [
      {
        question: "How do I place an order for delivery to Gombe?",
        answer:
          "Contact us on WhatsApp at +234 915 045 9964 with your roofing requirements and delivery address in Gombe. We will provide a same-day quotation including delivery.",
      },
      {
        question: "What is the delivery cost to Gombe State?",
        answer:
          "Delivery cost depends on order volume and exact destination. For most residential orders, the delivery charge is a fraction of the total order value. Contact us for a precise quote.",
      },
      {
        question: "Do you supply roofing accessories alongside sheets to Gombe?",
        answer:
          "Yes. We supply drive screws, roofing nails, seam bolts, silicone sealant and felt alongside roofing sheets. Bundling everything in one shipment saves on delivery costs.",
      },
    ],
  },
  {
    slug: "borno",
    name: "Borno",
    region: "North-East",
    capital: "Maiduguri",
    deliveryDays: "5–7 business days",
    deliveryNote:
      "Borno State is reached via the Gombe-Damaturu-Maiduguri Road. We deliver to Maiduguri and other accessible areas. Security and road conditions are assessed before each delivery to ensure safe transit. Delivery takes five to seven working days.",
    hasDealer: false,
    keyAreas: ["Maiduguri", "Jere", "Biu", "Konduga"],
    popularProducts: ["Long Span Roofing Sheets"],
    intro:
      "Borno State is undergoing one of the largest reconstruction efforts anywhere in West Africa. As displaced communities return and rebuilding accelerates in Maiduguri and surrounding areas, the demand for building materials — including quality roofing — is substantial and growing. Every new school, clinic, home and market being rebuilt needs a roof that will last. Gods Promise Aluminium supports Borno State's reconstruction by delivering factory-direct aluminium roofing sheets that offer the durability and low maintenance this rebuilding effort demands.",
    whyChooseUs:
      "Borno's reconstruction requires materials that last — there is no room for replacing cheap roofing after just a few years. Our aluminium sheets provide a maintenance-free lifetime that makes them the economical choice for the thousands of buildings being rebuilt. We work with logistics partners experienced in north-eastern delivery routes.",
    faq: [
      {
        question: "Can you deliver roofing materials to Maiduguri?",
        answer:
          "Yes. We deliver to Maiduguri via the Gombe-Damaturu-Maiduguri route. Delivery takes five to seven business days. We assess road conditions and security with our transport partners before each shipment.",
      },
      {
        question: "Do you supply roofing for NGO and reconstruction projects?",
        answer:
          "Yes. We can supply roofing materials for reconstruction projects at scale. We provide proforma invoices, delivery documentation and can work within the procurement timelines of institutional buyers.",
      },
      {
        question: "What is the most cost-effective roofing for Borno's rebuilding?",
        answer:
          "Our 0.45 mm long span aluminium sheets offer an excellent balance of affordability and durability for mass rebuilding. They are rust-proof, need no maintenance and will serve for decades in Borno's climate.",
      },
    ],
  },
  {
    slug: "yobe",
    name: "Yobe",
    region: "North-East",
    capital: "Damaturu",
    deliveryDays: "5–7 business days",
    deliveryNote:
      "Yobe State is reached via the Gombe-Damaturu road corridor. We deliver to Damaturu, Potiskum, Gashua, Nguru and accessible surrounding areas. Delivery takes five to seven business days.",
    hasDealer: false,
    keyAreas: ["Damaturu", "Potiskum", "Gashua", "Nguru"],
    popularProducts: ["Long Span Roofing Sheets"],
    intro:
      "Yobe State is rebuilding and growing. Damaturu, the state capital, is seeing new construction in both the public and private sectors, while the commercial town of Potiskum continues its tradition as a major trading centre in the north-east. The hot, arid climate with Sahel-type conditions means buildings need roofing that resists extreme heat and seasonal sandstorms. Gods Promise Aluminium delivers durable aluminium roofing sheets to Yobe State — materials that maintain structural integrity and visual quality despite the harshest climatic conditions in Nigeria.",
    whyChooseUs:
      "Yobe's arid climate is among the most demanding in Nigeria for building materials. Our aluminium roofing does not corrode, crack or deteriorate in dry heat the way inferior alternatives do. We deliver through Gombe on an established route, ensuring your materials arrive safely and on schedule.",
    faq: [
      {
        question: "Do you deliver to Damaturu and Potiskum?",
        answer:
          "Yes. We deliver to both cities and other accessible parts of Yobe State via the Gombe-Damaturu road. Delivery takes five to seven business days.",
      },
      {
        question: "How does aluminium roofing perform in Yobe's sandstorm conditions?",
        answer:
          "Aluminium is inherently resistant to sand abrasion and does not rust. Our factory finish maintains colour integrity even after years of exposure to Sahel wind and sand conditions.",
      },
      {
        question: "What is the minimum order for delivery to Yobe?",
        answer:
          "We recommend a minimum of 100 sqm for long-distance deliveries to optimise logistics cost. Contact us to discuss your specific requirements.",
      },
    ],
  },
  {
    slug: "adamawa",
    name: "Adamawa",
    region: "North-East",
    capital: "Yola",
    deliveryDays: "5–7 business days",
    deliveryNote:
      "Adamawa State is reached via the Gombe-Numan-Yola Road or the Jalingo route. We deliver to Yola, Jimeta, Mubi, Numan and surrounding accessible areas. Transit time is five to seven working days.",
    hasDealer: false,
    keyAreas: ["Yola", "Jimeta", "Mubi", "Numan", "Ganye"],
    popularProducts: ["Long Span Roofing Sheets", "Step Tiles"],
    intro:
      "Adamawa State features dramatic geographical diversity — from the Mandara Mountains along the Cameroon border to the Benue River floodplains around Numan. The state capital Yola and its twin city Jimeta are expanding with modern construction, while towns like Mubi serve as important cross-border trading centres. This varied terrain means roofing needs differ across the state — mountain settlements face stronger winds, while riverine areas contend with higher moisture. Gods Promise Aluminium supplies factory-direct aluminium roofing sheets that perform across all of Adamawa's diverse conditions.",
    whyChooseUs:
      "Adamawa's geographic diversity requires a supplier who understands that a roofing solution in Yola may differ from one in mountainous Mubi. We advise on appropriate gauges and profiles for your specific location within the state, and our custom-length production means sheets are cut to fit your design, reducing on-site waste.",
    faq: [
      {
        question: "Can you deliver to Yola and Mubi?",
        answer:
          "Yes. We deliver to Yola, Jimeta, Mubi, Numan and other accessible towns in Adamawa State. Delivery takes five to seven business days via the Gombe route.",
      },
      {
        question: "What gauge is recommended for windy mountain areas in Adamawa?",
        answer:
          "For elevated and mountainous areas like Mubi and the Mandara foothills, we recommend 0.50 mm gauge minimum. The heavier gauge provides better resistance to wind uplift at altitude.",
      },
      {
        question: "Do you supply roofing for cross-border trade buildings in Mubi?",
        answer:
          "Yes. We supply roofing for commercial buildings, warehouses and market structures. Our long span sheets can be produced to the wide spans typical of market buildings.",
      },
    ],
  },
  {
    slug: "taraba",
    name: "Taraba",
    region: "North-East",
    capital: "Jalingo",
    deliveryDays: "5–7 business days",
    deliveryNote:
      "Taraba State is reached via the Gombe-Jalingo Road or through Adamawa. We deliver to Jalingo, Wukari, Takum, Bali and surrounding areas. Transit time is five to seven working days depending on exact destination.",
    hasDealer: false,
    keyAreas: ["Jalingo", "Wukari", "Takum", "Bali", "Ibi"],
    popularProducts: ["Long Span Roofing Sheets"],
    intro:
      "Taraba State is called Nature's Gift to the Nation for its lush scenery, rolling hills, and the Mambilla Plateau — the highest point in Nigeria. Beyond its natural beauty, Taraba is developing its urban centres with new construction in Jalingo, Wukari and southern towns like Takum. The state's elevation and rainfall patterns create a climate that is cooler and wetter than typical north-eastern states. Roofing materials here must handle consistent moisture without corroding. Gods Promise Aluminium delivers corrosion-proof aluminium roofing sheets to Taraba State builders who want lasting performance in this unique environment.",
    whyChooseUs:
      "Taraba's higher rainfall and cooler temperatures set it apart from neighbouring states. Our aluminium sheets are naturally corrosion-proof, making them ideal for the wetter conditions found especially on the Mambilla Plateau and in southern Taraba. Factory-direct pricing keeps costs fair even for this more remote delivery route.",
    faq: [
      {
        question: "Do you deliver to Jalingo, Taraba State?",
        answer:
          "Yes. We deliver to Jalingo and other accessible Taraba towns via the Gombe-Jalingo route. Delivery takes five to seven business days from our factory.",
      },
      {
        question: "What roofing material is best for the Mambilla Plateau?",
        answer:
          "Aluminium is ideal for Mambilla's wet, cool climate. It does not rust in persistent moisture, is lightweight for transport to elevated areas and maintains its integrity in cooler temperatures.",
      },
      {
        question: "Can you produce long sheets for wide-span buildings in Taraba?",
        answer:
          "Yes. We produce custom-length roofing sheets to match your exact roof span. This reduces on-site cutting and provides a cleaner, leak-free installation.",
      },
    ],
  },
];

/** Look up a single location by its URL slug */
export function getLocationBySlug(slug: string): LocationData | undefined {
  return locations.find((loc) => loc.slug === slug);
}
