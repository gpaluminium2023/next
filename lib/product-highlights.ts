/**
 * Product details supplied by the owner (voice recording, transcribed) for the
 * Black Friday refresh. Shown on /products and /black-friday.
 *
 * Stated exactly as given. Thickness figures came without a unit, so none is
 * added here — don't append "mm" until the owner confirms it. No prices were
 * given for these lines, so none are shown, and they are left out of the
 * Product JSON-LD on /products (a Product without an offer just raises
 * Search Console warnings).
 */
import { gerardNails, gerardNailsUrl } from "@/lib/nails-content";

export type ProductHighlight = {
  id: string;
  name: string;
  summary: string;
  details: string[];
  link?: { href: string; label: string };
};

export const productHighlights: ProductHighlight[] = [
  {
    id: "gerard-roofing-sheets",
    name: "Gerard Roofing Sheets",
    summary: "Gerard roofing sheets in 0.50 thickness.",
    details: [],
  },
  {
    id: "transparent-fiberglass-sheets",
    name: "Transparent Fiberglass Sheets",
    summary:
      "Transparent sheets that help bring daylight into warehouses and other spaces.",
    details: [],
  },
  {
    id: "aluzinc-long-span",
    name: "Aluzinc Long-Span Roofing",
    summary:
      "Aluzinc long-span roofing, corrugated to resemble aluminium long-span roofing sheets.",
    details: [
      "Thicknesses: 0.24, 0.25, 0.28 and 0.30",
      "Also available in coils",
      "Available in different colours",
    ],
  },
  {
    id: "gerard-roofing-nails",
    name: gerardNails.name,
    summary:
      "We supply Gerard roofing nails within Nigeria and also export them.",
    details: [
      `${gerardNails.packKg} kg per pack`,
      `${gerardNails.packsPerCarton} packs per carton`,
      `${gerardNails.cartonKg} kg per carton`,
    ],
    link: { href: gerardNailsUrl, label: "Order Gerard roofing nails" },
  },
];
