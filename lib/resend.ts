import { Resend } from "resend";

let client: Resend | null = null;

// Returns null (instead of throwing) when RESEND_API_KEY isn't configured yet,
// so order/quote creation never fails just because email isn't set up.
export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

export const EMAIL_FROM =
  process.env.RESEND_FROM_EMAIL ?? "Gods Promise Aluminium <orders@godspromisealuminiumroofing.com>";
export const ADMIN_NOTIFICATION_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL ?? "godspromisegroup@gmail.com";
