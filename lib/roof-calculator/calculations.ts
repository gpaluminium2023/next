// Pure calculation logic for the roof sheet calculator. No React, no DOM —
// safe to unit test and safe to run on the server if ever needed.
//
// Pricing note: sheets/tiles on this site are priced per square metre
// (Product.unit === "sqm", ProductVariant.priceKobo is ₦/sqm). Material cost
// is therefore always `roofAreaWithWaste * pricePerSqmKobo`, independent of
// how many physical sheets/cuts that works out to. Sheet count and linear
// metres below are informational only (useful for ordering/logistics), not
// part of the cost formula.

export type RoofShape = "gable" | "hip" | "hipext";
export type SheetLayout = "longspan" | "fixed";

export interface Dims {
  eaveWidth?: string;
  buildingLength?: string;
  overhang?: string;
  extWidth?: string;
  extDepth?: string;
}

export interface CalculatorState {
  shape: RoofShape | null;
  dims: Dims;
  pitchDeg: number;
  productId: string | null;
  variantId: string | null;
  sheetLayout: SheetLayout;
  sheetWidth: number;
  sheetLength: number;
  overlap: number;
  wastePct: number;
  pricePerSqmKobo: number | null;
  priceUnit: string;
  bendMax: number;
  bendLap: number;
  valleyLen: number;
  wallFlashingLen: number;
}

export const DEFAULT_STATE: CalculatorState = {
  shape: null,
  dims: {},
  pitchDeg: 30,
  productId: null,
  variantId: null,
  sheetLayout: "fixed",
  sheetWidth: 1,
  sheetLength: 3,
  overlap: 0.25,
  wastePct: 8,
  pricePerSqmKobo: null,
  priceUnit: "sqm",
  bendMax: 6,
  bendLap: 0.15,
  valleyLen: 0,
  wallFlashingLen: 0,
};

export function round2(v: number) {
  return Math.round(v * 100) / 100;
}

function cosDeg(d: number) {
  return Math.cos((d * Math.PI) / 180);
}

export function getSpans(state: CalculatorState) {
  const d = state.dims;
  const ov = parseFloat(d.overhang ?? "") || 0;
  const a = (parseFloat(d.eaveWidth ?? "") || 0) + 2 * ov;
  const b = (parseFloat(d.buildingLength ?? "") || 0) + 2 * ov;
  return { shortSpan: Math.min(a, b), longSpan: Math.max(a, b), ov };
}

export function planArea(state: CalculatorState) {
  const d = state.dims;
  const { shortSpan, longSpan, ov } = getSpans(state);
  let area = shortSpan * longSpan;
  if (state.shape === "hipext") {
    const ew = (parseFloat(d.extWidth ?? "") || 0) + 2 * ov;
    const ed = (parseFloat(d.extDepth ?? "") || 0) + ov;
    area += ew * ed;
  }
  return area;
}

export function rafterLength(state: CalculatorState) {
  const { shortSpan } = getSpans(state);
  return shortSpan / 2 / cosDeg(state.pitchDeg);
}

export function eaveCoverWidth(state: CalculatorState) {
  const { longSpan } = getSpans(state);
  return longSpan;
}

export interface ResultsSummary {
  area: number;
  roofArea: number;
  roofAreaWithWaste: number;
  sheetsCount: number;
  sheetsNote: string;
  totalLinearMeters: number | null;
  ridgeLen: number;
  hipLen: number;
  fasteners: number;
  effWidth: number;
  rafter: number;
  eaveCover: number;
  materialCostKobo: number | null;
}

export function computeResults(state: CalculatorState): ResultsSummary {
  const area = planArea(state);
  const roofArea = area / cosDeg(state.pitchDeg);
  const waste = 1 + (parseFloat(String(state.wastePct)) || 0) / 100;
  const roofAreaWithWaste = roofArea * waste;

  const effWidth = state.sheetWidth - state.overlap;
  const eaveCover = eaveCoverWidth(state);
  const rafter = rafterLength(state);

  let sheetsCount = 0;
  let sheetsNote = "";
  let totalLinearMeters: number | null = null;

  if (effWidth > 0) {
    if (state.sheetLayout === "longspan") {
      const rowsPerSlope = Math.ceil(eaveCover / effWidth);
      sheetsCount = rowsPerSlope * 2;
      totalLinearMeters = sheetsCount * rafter * waste;
      sheetsNote = `${rowsPerSlope} cut sheet(s) per slope face x 2 main faces, each cut to ${round2(rafter)} m long`;
    } else {
      const rowsPerSlope = Math.ceil(eaveCover / effWidth);
      const effLength = state.sheetLength || 1;
      const coursesPerSlope = Math.ceil(rafter / effLength);
      sheetsCount = Math.ceil(rowsPerSlope * coursesPerSlope * 2 * waste);
      sheetsNote = `${rowsPerSlope} sheet(s) wide x ${coursesPerSlope} course(s) up the slope, x 2 main slope faces`;
    }
  }

  const { shortSpan, longSpan } = getSpans(state);
  const ridgeLen = state.shape === "gable" ? longSpan : Math.max(longSpan - shortSpan, 0);
  const commonRafterRun = shortSpan / 2;
  const hipLen = state.shape !== "gable" ? 4 * (commonRafterRun / cosDeg(state.pitchDeg)) * Math.SQRT2 : 0;
  const fasteners = Math.ceil(roofAreaWithWaste * 3);

  const materialCostKobo =
    state.pricePerSqmKobo != null ? Math.round(roofAreaWithWaste * state.pricePerSqmKobo) : null;

  return {
    area,
    roofArea,
    roofAreaWithWaste,
    sheetsCount,
    sheetsNote,
    totalLinearMeters,
    ridgeLen,
    hipLen,
    fasteners,
    effWidth,
    rafter,
    eaveCover,
    materialCostKobo,
  };
}

export interface GlossaryEntry {
  key: string;
  tech: string;
  common: string;
}

export const GLOSSARY: GlossaryEntry[] = [
  { key: "ridge", tech: "Ridge Cap", common: "Ridge" },
  { key: "hip", tech: "Hip Cap", common: "Hip cover" },
  { key: "valley", tech: "Valley Flashing", common: "Valley gutter" },
  { key: "eaveAngle", tech: "Eave Angle", common: "Top trim" },
  { key: "eaveBottom", tech: "Eave Bottom Closing Strip", common: "Bottom strip" },
  { key: "gutter", tech: "Rainwater Gutter", common: "Gutter" },
  { key: "fascia", tech: "Fascia Board", common: "Facial board" },
  { key: "barge", tech: "Barge Board (Verge)", common: "Verge board" },
  { key: "wall", tech: "Wall / Apron Flashing", common: "Wall cover" },
];

export function bendPieces(state: CalculatorState, lengthM: number) {
  if (lengthM <= 0) return 0;
  const usable = state.bendMax - state.bendLap;
  if (usable <= 0) return 0;
  return Math.ceil(lengthM / usable);
}

export interface AccessoryItem {
  length: number;
  pieces: number;
}

export interface AccessoriesSummary {
  items: Record<string, AccessoryItem>;
  endCaps: number;
}

export function computeAccessories(state: CalculatorState): AccessoriesSummary {
  const r = computeResults(state);
  const d = state.dims;
  const { shortSpan, longSpan } = getSpans(state);

  const eaveRunLength =
    state.shape === "gable"
      ? 2 * longSpan
      : 2 * (shortSpan + longSpan) + (state.shape === "hipext" ? 2 * (parseFloat(d.extWidth ?? "") || 0) : 0);

  const bargeLength = state.shape === "gable" ? 4 * r.rafter : 0;

  const items: Record<string, AccessoryItem> = {
    ridge: { length: r.ridgeLen, pieces: bendPieces(state, r.ridgeLen) },
    hip: { length: r.hipLen, pieces: bendPieces(state, r.hipLen) },
    valley: { length: state.valleyLen, pieces: bendPieces(state, state.valleyLen) },
    eaveAngle: { length: eaveRunLength, pieces: bendPieces(state, eaveRunLength) },
    eaveBottom: { length: eaveRunLength, pieces: bendPieces(state, eaveRunLength) },
    gutter: { length: eaveRunLength, pieces: bendPieces(state, eaveRunLength) },
    fascia: { length: eaveRunLength, pieces: bendPieces(state, eaveRunLength) },
    barge: { length: bargeLength, pieces: bendPieces(state, bargeLength) },
    wall: { length: state.wallFlashingLen, pieces: bendPieces(state, state.wallFlashingLen) },
  };

  const endCaps = (r.ridgeLen > 0 ? 2 : 0) + (state.shape !== "gable" ? 4 : 0);
  return { items, endCaps };
}

export function autoAccessoryKeys(shape: RoofShape | null): string[] {
  return shape === "gable"
    ? ["ridge", "eaveAngle", "eaveBottom", "gutter", "fascia", "barge"]
    : ["ridge", "hip", "eaveAngle", "eaveBottom", "gutter", "fascia"];
}

export function inferSheetLayout(productName: string): SheetLayout {
  return /long\s*span/i.test(productName) ? "longspan" : "fixed";
}
