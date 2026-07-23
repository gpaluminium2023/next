import type { RoofShape } from "@/lib/roof-calculator/calculations";

const STROKE = "var(--primary)";

export function ShapeIcon({ shape, className }: { shape: RoofShape; className?: string }) {
  if (shape === "gable") {
    return (
      <svg viewBox="0 0 120 80" className={className}>
        <polyline points="10,60 60,15 110,60" fill="none" stroke={STROKE} strokeWidth="3" />
        <line x1="10" y1="60" x2="110" y2="60" stroke={STROKE} strokeWidth="3" />
      </svg>
    );
  }
  if (shape === "hip") {
    return (
      <svg viewBox="0 0 120 80" className={className}>
        <polygon points="10,60 45,30 75,30 110,60" fill="none" stroke={STROKE} strokeWidth="3" />
        <line x1="10" y1="60" x2="110" y2="60" stroke={STROKE} strokeWidth="3" />
        <line x1="10" y1="60" x2="45" y2="30" stroke={STROKE} strokeWidth="3" />
        <line x1="110" y1="60" x2="75" y2="30" stroke={STROKE} strokeWidth="3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 80" className={className}>
      <polygon points="10,55 45,25 75,25 100,55" fill="none" stroke={STROKE} strokeWidth="3" />
      <polygon points="70,55 95,38 112,55" fill="none" stroke={STROKE} strokeWidth="3" />
      <line x1="10" y1="55" x2="100" y2="55" stroke={STROKE} strokeWidth="2" />
    </svg>
  );
}

export const SHAPE_META: Record<RoofShape, { name: string; desc: string }> = {
  gable: { name: "Straight Gable", desc: "Two slopes, triangle ends" },
  hip: { name: "Hip Roof", desc: "Slopes on all four sides" },
  hipext: { name: "Hip + Extension", desc: "Main hip with a smaller wing" },
};
