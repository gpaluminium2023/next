/**
 * Black Friday offer: the one place its public facts live.
 *
 * The sitewide strip, the /pricing callout and the /black-friday landing page
 * all read from here, so the offer can't be stated two different ways.
 *
 * Confirmed by the owner: 2% off, starting 1 December. The sender explicitly
 * corrected earlier wording — it is 2%, not 10% or 20%.
 *
 * NOT confirmed, so deliberately absent: the campaign end date, the year,
 * eligibility rules and exclusions. Don't add any of them until the owner
 * confirms. Set `enabled` to false to take the offer off every page at once
 * (the /black-friday page then tells visitors the offer has ended).
 */
export const blackFridayOffer = {
  enabled: true,
  name: "Black Friday",
  discountPercent: 2,
  discountLabel: "2% off",
  /** Start day only — the year was not confirmed. */
  startsLabel: "1 December",
  /** The owner's own worked example. */
  example: {
    purchaseDisplay: "₦1,000,000",
    discountDisplay: "₦20,000",
  },
  path: "/black-friday",
} as const;
