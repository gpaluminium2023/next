// All money in the store is stored/transferred as integer kobo (1 naira = 100 kobo).
// These two functions are the only place ₦ <-> kobo conversion should happen.

export function formatNaira(kobo: number): string {
  const naira = kobo / 100;
  return `₦${naira.toLocaleString("en-NG", {
    minimumFractionDigits: naira % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

// Parses a ₦ amount typed by an admin (e.g. "4,300" or "4300.50") into integer kobo.
export function parseNairaToKobo(input: string): number | null {
  const cleaned = input.replace(/[₦,\s]/g, "");
  if (cleaned === "" || Number.isNaN(Number(cleaned))) return null;
  const naira = Number(cleaned);
  if (naira < 0) return null;
  return Math.round(naira * 100);
}
