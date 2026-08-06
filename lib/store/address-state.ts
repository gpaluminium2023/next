import { locations } from "@/lib/locations-data";

// Longest names first so "Akwa Ibom" wins over a stray "Imo"-style substring
// and multi-word states match before single-word ones.
const STATE_NAMES = [...locations.map((l) => l.name)].sort((a, b) => b.length - a.length);

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Best-effort guess at which Nigerian state a free-text delivery address is in.
 *
 * Used only to warn a customer whose delivery address looks like it's in a
 * different state from the branch they're ordering from — never to block, and
 * never to price anything. Returns null when nothing recognisable is found,
 * which is the common case for "12 Admiralty Way, Lekki".
 *
 * Word-boundary matched so "Ogunlana Drive" doesn't read as Ogun State.
 */
export function detectStateInAddress(address: string): string | null {
  if (!address.trim()) return null;

  for (const name of STATE_NAMES) {
    const pattern = new RegExp(`\\b${escapeRegExp(name)}\\b`, "i");
    if (pattern.test(address)) return name;
  }
  return null;
}
