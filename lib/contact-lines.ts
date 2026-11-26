import { siteIdentity } from "@/lib/site-identity";

/**
 * Direct contact lines supplied by the owner for the Black Friday refresh.
 *
 * UNVERIFIED: these were transcribed from a voice recording. The display
 * strings are kept exactly as transcribed — do not regroup or "fix" them here;
 * the owner must confirm each before publication.
 *
 * Links are only attached where the digits form a valid Nigerian number:
 * - Office (calls only): +234 903 343 0469 → 13 digits, valid → tel: link.
 * - CEO direct: 091 504 59964 → 11 digits (0915 045 9964), valid → tel: link.
 *   Same digits as siteIdentity.phoneE164, only grouped differently.
 * The office WhatsApp transcription was incomplete. Use the website's
 * established general WhatsApp channel until the office line is confirmed.
 */
export type ContactLine = {
  id: string;
  label: string;
  channel: "call" | "whatsapp";
  note: string;
  display: string;
  /** Omitted when the number can't be linked safely. */
  href?: string;
};

export const directContactLines: ContactLine[] = [
  {
    id: "office-calls",
    label: "Office line",
    channel: "call",
    note: "Calls only",
    display: "+234 903 343 0469",
    href: "tel:+2349033430469",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    channel: "whatsapp",
    note: "WhatsApp messages",
    display: siteIdentity.phoneDisplay,
    href: siteIdentity.whatsappUrl,
  },
  {
    id: "ceo-direct",
    label: "CEO direct",
    channel: "call",
    note: "Direct contact with our CEO",
    display: "091 504 59964",
    href: "tel:09150459964",
  },
];
