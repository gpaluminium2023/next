import type { BlogPost } from "@/lib/blog-posts";
import { gerardNails, gerardNailsUrl } from "@/lib/nails-content";
import { blackFridayOffer } from "@/lib/promo";

export const roofingQuoteGuideSlug = "black-friday-roofing-quote-nigeria";

export const roofingQuoteGuide: BlogPost = {
  slug: roofingQuoteGuideSlug,
  title: "Buying roofing materials on Black Friday in Nigeria",
  metaDescription: "Compare roofing quotes for Gerard sheets, Aluzinc long-span, transparent fiberglass and roofing nails. See how a discount affects the amount you pay.",
  excerpt: "Two quotes can show the same discount and leave you with different bills. Here’s how to compare sheet quantities, nail cartons and delivery before you order.",
  date: "2026-11-27",
  readingTimeMinutes: 3,
  imageSrc: "/images/black-friday-roofing.webp",
  imageAlt: "Silver, navy and red long-span roofing sheets",
  body: [],
  bodyHtml: `
<p>When you compare roofing quotations, start with what each supplier has priced. One may quote per square metre and another per sheet. One may include delivery to your site and another may quote for factory pickup. Ask for the quantities, units and delivery charge in writing so you can compare the amount you would actually pay.</p>
${blackFridayOffer.enabled ? `<div class="blog-callout"><strong>Gods Promise Aluminium’s Black Friday offer starts on ${blackFridayOffer.startsLabel}.</strong> At ${blackFridayOffer.discountLabel}, a qualifying ${blackFridayOffer.example.purchaseDisplay} purchase saves ${blackFridayOffer.example.discountDisplay}. Ask the team which items on your quote qualify and confirm the final amount before paying. <a href="${blackFridayOffer.path}">See the offer and request a quote</a>.</div>` : `<p>For current rates, <a href="/pricing">check our price lists</a> or <a href="/contact">request a written quote</a>.</p>`}

<h2>What to ask for with each product</h2>
<p><strong>Aluminium roofing and flat sheets.</strong> For long-span, step tile or Metcopo, ask for the same profile, thickness and quantity on each quote. In Lagos, specify whether you want market standard or caliper-verified thickness. For flat sheets, send the dimensions and quantity your fabricator needs. <a href="/pricing#caliper-standard">Compare the Lagos pricing options</a>.</p>
<p><strong>Gerard roofing sheets.</strong> For a new roof, send your installer’s material list and the profile and colour you want. For an extension, include a clear photo of the existing roof. Ask the team to identify the profile and list the matching accessories separately. <a href="/products/stone-coated">Compare stone-coated roofing profiles</a>.</p>
<p><strong>Aluzinc long-span.</strong> Tell the team whether you need formed sheets or coils. For cut sheets, send the number of pieces at each length, the colour and the thickness you want quoted. Ask the supplier to state the thickness unit and effective cover width. A price per sheet only makes sense alongside the area that sheet will cover.</p>
<p><strong>Transparent fiberglass sheets.</strong> If you want daylight over a workshop or warehouse, identify the bays where your installer plans to use transparent panels. Include the adjoining sheet profile and required lengths so the team can check availability and fit before quoting.</p>
<p><strong>Gerard roofing nails.</strong> GPA supplies ${gerardNails.packsPerCarton} packs of ${gerardNails.packKg} kg in a ${gerardNails.cartonKg} kg carton. If you are buying for a site, get the quantity from your installer. If you are stocking a shop, send your carton count and delivery town. <a href="${gerardNailsUrl}">Check the nail specification and carton listing</a>.</p>

<h2>Read the total before paying</h2>
<p>Ask the team to show the materials subtotal, the items covered by the offer, the saving in naira and the delivery charge. For example, if your order lists both sheets and fasteners, confirm whether the discount covers both lines. Compare the final delivered amounts for the same material list.</p>

<h2>A message you can send for a quote</h2>
<blockquote>“I need [product and profile] in [colour or finish]. My quantities are [sheet lengths and counts, or number of cartons]. Delivery is to [town and state]. Please confirm availability, any discount on these items, delivery cost and the final amount.”</blockquote>
<p><a href="/contact">Send your list to the Lagos team</a>. If you are still working out the area, the <a href="/roof-calculator">roof calculator</a> can help you prepare an estimate to discuss with your installer.</p>`,
};
