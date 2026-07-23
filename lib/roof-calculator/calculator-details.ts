import type { Dims, RoofShape, SheetLayout } from "./calculations";

export interface CalculatorAccessoryLine {
  label: string;
  length: number;
  pieces: number;
}

// Snapshot of a roof-calculator submission, stored as Order.calculatorDetails
// (Json) so the admin detail page and receipt/estimate PDF can render the
// full breakdown without re-deriving it from the (mutable) product catalog.
export interface CalculatorDetailsSnapshot {
  shape: RoofShape;
  dims: Dims;
  pitchDeg: number;
  sheetLayout: SheetLayout;
  wastePct: number;
  productName: string;
  variantLabel: string;
  roofAreaWithWaste: number;
  sheetsCount: number;
  sheetsNote: string;
  totalLinearMeters: number | null;
  fasteners: number;
  accessories: CalculatorAccessoryLine[];
  endCaps: number;
}
