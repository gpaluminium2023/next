# SEO and AI Search Visibility Sprint Design

## Context

Gods Promise Aluminium already has a strong SEO foundation in the Next.js site:

- Core commercial pages exist for home, about, products, pricing, services, gallery, projects, delivery, FAQ, locations, and contact.
- Technical SEO basics are in place: metadata, sitemap, robots, `LocalBusiness` JSON-LD, canonical URLs, Open Graph data, and `llms.txt`.
- Existing SEO plans already prioritize pricing guides, stat pages, local SEO, review collection, content publishing, and AI visibility.
- The pasted priority list adds the missing operational layer: consistent business identity, Google Business Profile optimization, review velocity, external listings, social/video proof, and AI search tracking.

This sprint combines both sides: repo-backed website improvements plus off-site operating tasks that make the entity stronger across Google, ChatGPT, Perplexity, Gemini, and other AI-powered discovery systems.

## Goal

Increase the chance that Gods Promise Aluminium is recognized, cited, and recommended for Nigerian aluminium roofing searches by strengthening:

- Entity clarity: consistent name, address, phone, website, services, and social profiles.
- Trust signals: reviews, project proof, factory proof, testimonials, and case studies.
- Topical authority: answer-first roofing content, price data, FAQs, comparisons, and calculator content.
- Machine readability: structured data, `llms.txt`, FAQ schema, case study structure, and citation-ready pages.
- External corroboration: Google Business Profile, directories, LinkedIn, YouTube, and industry mentions.

## Recommended Approach

Use a combined 30-day sprint.

The website changes should be implemented first because they create the canonical source of truth. Off-site work should then copy the exact same business identity from the site into Google Business Profile, directories, social pages, review templates, and future outreach.

This balances speed and impact. Website-only work would miss local SEO trust signals, while operations-only work would leave AI systems with less structured first-party evidence to cite.

## Scope

### In Scope

- Strengthen the About page into a clearer Wikipedia-style entity page.
- Add or improve structured data for FAQs, organization/entity details, and review collection surfaces.
- Create a review collection system page or asset hub with WhatsApp copy, email copy, and QR-code instructions.
- Refresh `llms.txt` so AI crawlers see the current 2026 pages, pricing guides, products, projects, and contact details.
- Define a reusable project case study content model and publishable page structure.
- Create a 30-day operations checklist for Google Business Profile, NAP audit, reviews, directories, LinkedIn, YouTube, and AI visibility checks.
- Document exact canonical NAP details to use everywhere.

### Out of Scope for This Sprint

- Building a full CMS migration.
- Automating Google Business Profile posting.
- Scraping directories or creating external profiles from code.
- Publishing 50 new articles.
- Running paid ads.
- Guaranteeing rankings or AI mentions.

## Canonical Business Identity

All channels should use the same identity unless the business owner confirms a correction:

- Company name: Gods Promise Aluminium Concept Limited
- Public brand: Gods Promise Aluminium
- Website: `https://www.godspromisealuminiumroofing.com`
- Phone: `+234 915 045 9964`
- Address: `Km 38, Lagos-Abeokuta Expressway, Beside First Bank, Sango Ota, Ogun State, Nigeria`
- Primary category: Aluminium roofing sheet manufacturer
- Secondary services: Roofing sheet supply, step tile production, Metcopo roofing sheets, stone-coated roofing tiles, roofing accessories, roofing installation support, nationwide delivery
- Service area: Lagos, Ogun State, and all Nigerian states

Note: `/faq` currently mentions `55 Owutu Road, Ikorodu, Lagos` for factory inspection while layout schema and `llms.txt` use the Sango Ota address. The implementation plan must resolve this discrepancy before wider NAP distribution.

## Website Workstream

### 1. Entity Page Upgrade

Update `/about` so it functions as the canonical company entity page. It should include:

- Company summary in the first 100 words.
- Founder or leadership story if confirmed.
- Factory location and capacity.
- Product lines.
- Service areas.
- Years in operation and project count.
- Quality control process.
- Social profile links.
- Clear internal links to pricing, products, gallery, projects, delivery, FAQ, and contact.

If founder, certification, or capacity details are unknown, the page should avoid inventing them and use verified statements already present in the site.

### 2. FAQ and Answer-First Content

Improve `/faq` and priority blog posts so they start with direct answers and support FAQ schema.

Minimum FAQ targets for this sprint:

- How much is aluminium roofing in Nigeria?
- Which roofing sheet lasts longest?
- What gauge should I use?
- Long span vs step tile vs Metcopo?
- Which roof is best for coastal areas?
- Do you deliver outside Lagos?
- How do I verify sheet thickness?
- How do I get a roofing quote?
- What colours are available?
- What is the factory address?

### 3. Review Collection Surface

Create a lightweight review collection page or section that supports the sales team after each job.

It should include:

- Google review CTA.
- WhatsApp review request copy.
- Email review request copy.
- QR-code placement instructions.
- Short customer guidance without making the page feel like marketing fluff.

The direct Google review link must be added later by the business owner or whoever manages the Google Business Profile.

### 4. AI-Crawler Source File

Refresh `public/llms.txt` so it reflects current URLs and updated content:

- Correct 2026 blog URLs.
- Pricing page.
- Products and stone-coated product page.
- Gallery and projects.
- Locations.
- FAQ.
- Contact.
- Key price/stat guides already published.
- Canonical NAP.

### 5. Case Study Template

Define a repeatable project case study format. Each case study should include:

- Project title with location and material.
- Building type.
- Roof size if known.
- Materials used.
- Timeline.
- Challenge.
- Result.
- Photos.
- CTA to request a similar quote.
- Internal links to relevant products, pricing, gallery, and contact.

Initial case studies can use existing gallery assets and conservative descriptions where exact client/project details are not confirmed.

## Off-Site Operations Workstream

### 1. NAP Audit

Audit and standardize the company name, phone, address, and website across:

- Website.
- Google Business Profile.
- Facebook.
- Instagram.
- LinkedIn.
- YouTube.
- TikTok.
- Nigerian business directories.
- Construction and real estate supplier directories.

### 2. Google Business Profile

Fully optimize the profile:

- Logo.
- Cover photo.
- Factory photos.
- Project photos.
- Product photos.
- Business description.
- Services.
- Products.
- Weekly posts.
- Review link.

### 3. Review Velocity

Target:

- 50 Google reviews in 3 to 6 months.
- 100+ Google reviews in 12 months.

Operating process:

- Send WhatsApp review request after every completed project.
- Include the direct review link.
- Follow up once after 3 to 5 days.
- Collect video testimonials from willing customers.

### 4. Directory and Social Proof

Create or update:

- LinkedIn Company Page.
- YouTube channel.
- Nigerian business directory profiles.
- Construction directory profiles.
- Manufacturing directory profiles.
- Real estate supplier directory profiles.

All profiles should use the canonical NAP and link back to the website.

### 5. AI Visibility Tracking

Once per month, test:

- `Best aluminium roofing company in Lagos`
- `Best roofing company in Nigeria`
- `Aluminium roofing prices Nigeria`
- `Step tile roofing suppliers`
- `Long span roofing sheet price Lagos`
- `Where to buy aluminium roofing sheets directly from factory in Lagos`

Track mentions in:

- Google search.
- Google AI Overviews where available.
- ChatGPT.
- Perplexity.
- Gemini.

Record date, query, tool, whether Gods Promise Aluminium appears, cited source URL, and competitor names.

## Data Flow

1. Website becomes the canonical source of business identity, pricing context, product descriptions, project proof, and FAQs.
2. Off-site profiles copy the same identity and link back to the website.
3. Customers leave Google reviews through the review system.
4. Case studies and project photos create real proof on the site and social channels.
5. AI/search systems find consistent facts across the website, Google profile, directories, social profiles, and reviews.
6. Monthly tracking shows which queries begin mentioning the company and which gaps remain.

## Risks and Mitigations

- Risk: inconsistent address data weakens local SEO.
  Mitigation: resolve the Sango Ota vs Ikorodu address discrepancy before publishing NAP externally.

- Risk: publishing unverified founder, capacity, or certification claims harms trust.
  Mitigation: only publish verified facts; leave unknown claims out until confirmed.

- Risk: review collection stalls after initial enthusiasm.
  Mitigation: make review requests part of the post-project handover process, not a one-time campaign.

- Risk: AI tools may not surface the brand quickly.
  Mitigation: track monthly and focus on stronger corroborating sources: reviews, directories, YouTube, LinkedIn, case studies, and industry mentions.

- Risk: pricing becomes stale.
  Mitigation: keep the pricing page update date visible and refresh price guides monthly.

## Acceptance Criteria

- A canonical NAP block is documented and used consistently across site updates.
- `/about` reads as a clear, factual company entity page.
- `/faq` has direct answers and machine-readable FAQ schema.
- Review collection copy and page/asset structure exist.
- `llms.txt` reflects the current 2026 site and no longer points to stale primary URLs.
- A case study template is documented or implemented.
- A 30-day off-site checklist exists with GBP, reviews, directories, social, and AI tracking tasks.
- TypeScript and lint checks pass for edited code.

## Implementation Priority

1. Resolve NAP discrepancy.
2. Refresh `llms.txt`.
3. Add FAQ schema to `/faq`.
4. Upgrade `/about`.
5. Add review collection page or section.
6. Define case study template and first case study route/content.
7. Create off-site operations checklist.
8. Run verification and document next monthly tasks.
