import type { RoofShape } from "@/lib/roof-calculator/calculations";

const STROKE = "var(--primary)";
const DIM = "var(--muted-foreground)";
const ACCENT = "var(--accent)";

function HDim({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  return (
    <g stroke={DIM} strokeWidth="1">
      <line x1={x1} y1={y} x2={x2} y2={y} />
      <line x1={x1} y1={y - 4} x2={x1} y2={y + 4} />
      <line x1={x2} y1={y - 4} x2={x2} y2={y + 4} />
      <text x={(x1 + x2) / 2} y={y - 6} textAnchor="middle" fill={DIM} stroke="none" fontSize="12" fontWeight="700">
        {label}
      </text>
    </g>
  );
}

function VDim({ y1, y2, x, label }: { y1: number; y2: number; x: number; label: string }) {
  const midY = (y1 + y2) / 2;
  return (
    <g stroke={DIM} strokeWidth="1">
      <line x1={x} y1={y1} x2={x} y2={y2} />
      <line x1={x - 4} y1={y1} x2={x + 4} y2={y1} />
      <line x1={x - 4} y1={y2} x2={x + 4} y2={y2} />
      <text
        x={x - 9}
        y={midY}
        textAnchor="middle"
        fill={DIM}
        stroke="none"
        fontSize="12"
        fontWeight="700"
        transform={`rotate(-90 ${x - 9} ${midY})`}
      >
        {label}
      </text>
    </g>
  );
}

// Top-down (plan/footprint) view, labelled to match the measurement fields —
// distinct from ShapeIcon, which is a front-elevation view used only for
// shape recognition in step 1.
export function PlanDiagram({ shape, className }: { shape: RoofShape; className?: string }) {
  const rect = { x: 55, y: 40, w: 125, h: 105 };
  const right = rect.x + rect.w;
  const bottom = rect.y + rect.h;
  const midY = rect.y + rect.h / 2;

  return (
    <svg viewBox="0 0 240 200" className={className}>
      {/* overhang */}
      <rect
        x={rect.x - 8}
        y={rect.y - 8}
        width={rect.w + 16}
        height={rect.h + 16}
        fill="none"
        stroke={DIM}
        strokeDasharray="3 3"
        strokeWidth="1"
      />
      {/* footprint */}
      <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} fill="none" stroke={STROKE} strokeWidth="2.5" />

      {shape !== "gable" && (
        <g stroke={STROKE} strokeWidth="1.5" fill="none">
          <line x1={rect.x} y1={rect.y} x2={rect.x + 32} y2={midY} />
          <line x1={rect.x} y1={bottom} x2={rect.x + 32} y2={midY} />
          <line x1={right} y1={rect.y} x2={right - 32} y2={midY} />
          <line x1={right} y1={bottom} x2={right - 32} y2={midY} />
          <line x1={rect.x + 32} y1={midY} x2={right - 32} y2={midY} />
        </g>
      )}

      {shape === "hipext" && (
        <>
          <rect
            x={right}
            y={rect.y + rect.h * 0.28}
            width={42}
            height={rect.h * 0.44}
            fill="none"
            stroke={STROKE}
            strokeWidth="2.5"
          />
          <text
            x={right + 21}
            y={rect.y + rect.h * 0.28 - 6}
            textAnchor="middle"
            fill={ACCENT}
            stroke="none"
            fontSize="10"
            fontWeight="700"
          >
            Ext
          </text>
        </>
      )}

      <HDim x1={rect.x} x2={right} y={rect.y - 18} label="W" />
      <VDim y1={rect.y} y2={bottom} x={rect.x - 18} label="L" />
    </svg>
  );
}
