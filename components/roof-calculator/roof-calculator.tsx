"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { formatNaira } from "@/lib/store/format";
import {
  DEFAULT_STATE,
  GLOSSARY,
  autoAccessoryKeys,
  computeAccessories,
  computeResults,
  getSpans,
  inferSheetLayout,
  round2,
  type CalculatorState,
  type Dims,
  type RoofShape,
} from "@/lib/roof-calculator/calculations";
import { ShapeIcon, SHAPE_META } from "@/components/roof-calculator/shape-icons";

export interface SheetVariant {
  id: string;
  label: string;
  priceKobo: number;
  inStock: boolean;
}

export interface SheetProduct {
  id: string;
  name: string;
  slug: string;
  unit: string;
  variants: SheetVariant[];
}

const STEPS = ["Roof Shape", "Measurements", "Roof Pitch", "Sheet Type", "Accessories", "Result"];

export function RoofCalculator({ products }: { products: SheetProduct[] }) {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<CalculatorState>(DEFAULT_STATE);
  const [traceImage, setTraceImage] = useState<string | null>(null);
  const [openWhy, setOpenWhy] = useState<Set<string>>(new Set());

  function patch(p: Partial<CalculatorState>) {
    setState((s) => ({ ...s, ...p }));
  }
  function patchDims(p: Partial<Dims>) {
    setState((s) => ({ ...s, dims: { ...s.dims, ...p } }));
  }
  function toggleWhy(key: string) {
    setOpenWhy((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }
  function reset() {
    setStep(0);
    setState(DEFAULT_STATE);
    setTraceImage(null);
    setOpenWhy(new Set());
  }

  const d = state.dims;
  const dimsValid =
    (parseFloat(d.eaveWidth ?? "") || 0) > 0 &&
    (parseFloat(d.buildingLength ?? "") || 0) > 0 &&
    (state.shape !== "hipext" ||
      ((parseFloat(d.extWidth ?? "") || 0) > 0 && (parseFloat(d.extDepth ?? "") || 0) > 0));

  return (
    <div className="grid gap-7 lg:grid-cols-[180px_1fr] lg:items-start">
      <StepRail step={step} setStep={setStep} />
      <div className="min-h-[420px] rounded-sm border border-border bg-card p-6 md:p-8">
        {step === 0 && (
          <StepShape
            state={state}
            patch={patch}
            traceImage={traceImage}
            setTraceImage={setTraceImage}
            onNext={() => setStep(1)}
          />
        )}
        {step === 1 && (
          <StepMeasure
            state={state}
            patchDims={patchDims}
            traceImage={traceImage}
            dimsValid={dimsValid}
            onBack={() => setStep(0)}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <StepPitch state={state} patch={patch} onBack={() => setStep(1)} onNext={() => setStep(3)} />
        )}
        {step === 3 && (
          <StepSheet
            state={state}
            patch={patch}
            products={products}
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
          />
        )}
        {step === 4 && (
          <StepAccessories state={state} patch={patch} onBack={() => setStep(3)} onNext={() => setStep(5)} />
        )}
        {step === 5 && <StepResult state={state} openWhy={openWhy} toggleWhy={toggleWhy} onReset={reset} />}
      </div>
    </div>
  );
}

/* ---------------------------------- Rail --------------------------------- */

function StepRail({ step, setStep }: { step: number; setStep: (i: number) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto lg:sticky lg:top-20 lg:flex-col lg:gap-0.5 lg:overflow-visible">
      {STEPS.map((label, i) => {
        const active = i === step;
        const done = i < step;
        const reachable = i <= step;
        return (
          <button
            key={label}
            type="button"
            disabled={!reachable}
            onClick={() => reachable && setStep(i)}
            className={cn(
              "flex shrink-0 items-center gap-2.5 border-l-2 px-2.5 py-2.5 text-left text-sm transition-colors disabled:cursor-not-allowed",
              active
                ? "border-accent bg-muted text-foreground"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            <span className={cn("font-mono text-xs font-bold", active ? "text-accent" : "text-muted-foreground")}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="whitespace-nowrap lg:whitespace-normal">{label}</span>
            {done && <Check className="ml-auto h-3.5 w-3.5 shrink-0 text-accent lg:ml-auto" />}
          </button>
        );
      })}
    </div>
  );
}

function StepHeader({ n: stepNumber, title, help }: { n: number; title: string; help: string }) {
  return (
    <>
      <p className="mb-1 font-mono text-xs font-bold uppercase tracking-widest text-accent">
        Step {String(stepNumber).padStart(2, "0")}
      </p>
      <h2 className="mb-1.5 font-heading text-2xl font-bold uppercase sm:text-3xl">{title}</h2>
      <p className="mb-6 max-w-prose text-sm leading-relaxed text-muted-foreground">{help}</p>
    </>
  );
}

function NavRow({
  onBack,
  onNext,
  nextLabel = "Continue",
  nextDisabled = false,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
}) {
  return (
    <div className="mt-7 flex justify-between">
      {onBack ? (
        <Button type="button" variant="outline" className="rounded-sm" onClick={onBack}>
          Back
        </Button>
      ) : (
        <span />
      )}
      {onNext && (
        <Button
          type="button"
          disabled={nextDisabled}
          onClick={onNext}
          className="rounded-sm bg-accent font-heading font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90"
        >
          {nextLabel}
        </Button>
      )}
    </div>
  );
}

/* ------------------------------- Step: Shape ------------------------------ */

function StepShape({
  state,
  patch,
  traceImage,
  setTraceImage,
  onNext,
}: {
  state: CalculatorState;
  patch: (p: Partial<CalculatorState>) => void;
  traceImage: string | null;
  setTraceImage: (v: string | null) => void;
  onNext: () => void;
}) {
  const shapes: RoofShape[] = ["gable", "hip", "hipext"];

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setTraceImage(ev.target?.result as string);
    reader.readAsDataURL(f);
  }

  return (
    <div>
      <StepHeader
        n={1}
        title="What shape is the roof?"
        help="Pick the closest match. Roofs with more sections just repeat this shape — you'll be able to add the extra part in the next step."
      />
      <div className="mb-5 grid gap-3.5 sm:grid-cols-3">
        {shapes.map((shape) => {
          const meta = SHAPE_META[shape];
          const selected = state.shape === shape;
          return (
            <button
              key={shape}
              type="button"
              onClick={() => patch({ shape })}
              className={cn(
                "rounded-sm border bg-background p-3.5 text-center transition-colors",
                selected ? "border-2 border-accent" : "border-border hover:border-primary/40",
              )}
            >
              <ShapeIcon shape={shape} className="h-20 w-full" />
              <div className="mt-2 text-sm font-semibold">{meta.name}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{meta.desc}</div>
            </button>
          );
        })}
      </div>
      <label className="flex flex-col gap-2 rounded-sm border border-dashed border-border p-3.5 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <span className="w-fit shrink-0 rounded-xs bg-accent px-1.5 py-0.5 font-mono text-[10.5px] font-bold text-accent-foreground">
          OPTIONAL
        </span>
        <span>
          Have a hand-drawn sketch? Upload it — it&rsquo;ll appear faintly under the diagram in the next step so
          you can trace your numbers onto it.
        </span>
        <input type="file" accept="image/*" onChange={onFile} className="text-xs" />
      </label>
      {traceImage && <p className="mt-2 text-xs text-accent">Sketch attached ✓</p>}
      <NavRow onNext={onNext} nextDisabled={!state.shape} />
    </div>
  );
}

/* ----------------------------- Step: Measure ------------------------------ */

function StepMeasure({
  state,
  patchDims,
  traceImage,
  dimsValid,
  onBack,
  onNext,
}: {
  state: CalculatorState;
  patchDims: (p: Partial<Dims>) => void;
  traceImage: string | null;
  dimsValid: boolean;
  onBack: () => void;
  onNext: () => void;
}) {
  const d = state.dims;
  return (
    <div>
      <StepHeader
        n={2}
        title="Enter the measurements"
        help="Measure along the walls (plan view), not up the slope — we work out the slope length for you in the next step."
      />
      <div className="grid gap-7 md:grid-cols-2">
        <div className="relative rounded-sm border border-border bg-background p-3">
          {traceImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={traceImage}
              alt=""
              className="pointer-events-none absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] object-contain opacity-20"
            />
          )}
          {state.shape && <ShapeIcon shape={state.shape} className="h-56 w-full" />}
        </div>
        <div>
          <Field label="Eave width (W)" hint="front measurement, in metres">
            <Input
              type="number"
              step="0.1"
              value={d.eaveWidth ?? ""}
              onChange={(e) => patchDims({ eaveWidth: e.target.value })}
              placeholder="e.g. 7.6"
            />
          </Field>
          <Field label="Building length (L)" hint="side measurement, in metres">
            <Input
              type="number"
              step="0.1"
              value={d.buildingLength ?? ""}
              onChange={(e) => patchDims({ buildingLength: e.target.value })}
              placeholder="e.g. 8.4"
            />
          </Field>
          {state.shape === "hipext" && (
            <>
              <Field label="Extension width" hint="the smaller wing, across its front">
                <Input
                  type="number"
                  step="0.1"
                  value={d.extWidth ?? ""}
                  onChange={(e) => patchDims({ extWidth: e.target.value })}
                  placeholder="e.g. 3.0"
                />
              </Field>
              <Field label="Extension depth" hint="how far it sticks out">
                <Input
                  type="number"
                  step="0.1"
                  value={d.extDepth ?? ""}
                  onChange={(e) => patchDims({ extDepth: e.target.value })}
                  placeholder="e.g. 3.8"
                />
              </Field>
            </>
          )}
          <Field label="Eave overhang" hint="how far the roof extends past the wall">
            <Input
              type="number"
              step="0.05"
              value={d.overhang ?? "0.3"}
              onChange={(e) => patchDims({ overhang: e.target.value })}
              placeholder="0.3"
            />
          </Field>
        </div>
      </div>
      <NavRow onBack={onBack} onNext={onNext} nextDisabled={!dimsValid} />
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <Label className="mb-1.5 flex items-baseline justify-between gap-2 text-[13px] font-semibold">
        <span>{label}</span>
        {hint && <span className="font-normal text-muted-foreground">{hint}</span>}
      </Label>
      {children}
    </div>
  );
}

/* ------------------------------ Step: Pitch -------------------------------- */

function StepPitch({
  state,
  patch,
  onBack,
  onNext,
}: {
  state: CalculatorState;
  patch: (p: Partial<CalculatorState>) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const presets = [
    { label: "Low", range: "15°–20°", deg: 18 },
    { label: "Medium", range: "25°–35°", deg: 30 },
    { label: "Steep", range: "40°–45°", deg: 42 },
  ];
  return (
    <div>
      <StepHeader
        n={3}
        title="How steep is the roof?"
        help="Not sure of the exact angle? Pick the closest feel — most Nigerian home roofs sit in the Medium range."
      />
      <div className="mb-5 flex flex-wrap gap-2.5">
        {presets.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => patch({ pitchDeg: p.deg })}
            className={cn(
              "rounded-sm border bg-background px-4 py-2.5 text-left text-sm",
              state.pitchDeg === p.deg ? "border-2 border-accent" : "border-border hover:border-primary/40",
            )}
          >
            <b className="block font-heading text-lg leading-none">{p.label}</b>
            {p.range}
          </button>
        ))}
      </div>
      <div className="mb-5 max-w-[220px]">
        <Field label="Or enter exact angle" hint="degrees from horizontal">
          <Input
            type="number"
            min={5}
            max={60}
            value={state.pitchDeg}
            onChange={(e) => patch({ pitchDeg: parseFloat(e.target.value) || 30 })}
          />
        </Field>
      </div>
      <Disclaimer>
        Steeper roofs need more sheet material for the same footprint — sheets are cut to the actual slope length,
        not the flat measurement.
      </Disclaimer>
      <NavRow onBack={onBack} onNext={onNext} />
    </div>
  );
}

function Disclaimer({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-accent bg-accent/10 p-3 text-xs leading-relaxed text-muted-foreground">
      {children}
    </div>
  );
}

/* ------------------------------ Step: Sheet -------------------------------- */

function StepSheet({
  state,
  patch,
  products,
  onBack,
  onNext,
}: {
  state: CalculatorState;
  patch: (p: Partial<CalculatorState>) => void;
  products: SheetProduct[];
  onBack: () => void;
  onNext: () => void;
}) {
  const selectedProduct = products.find((p) => p.id === state.productId) ?? null;

  function pickProduct(product: SheetProduct) {
    patch({
      productId: product.id,
      variantId: null,
      pricePerSqmKobo: null,
      priceUnit: product.unit,
      sheetLayout: inferSheetLayout(product.name),
    });
  }

  function pickVariant(variant: SheetVariant) {
    if (!variant.inStock) return;
    patch({ variantId: variant.id, pricePerSqmKobo: variant.priceKobo });
  }

  return (
    <div>
      <StepHeader
        n={4}
        title="Choose your roofing sheet"
        help="Prices come straight from our current price list. Long Span is cut to your exact slope length; Step Tile and Metcopo come in fixed panel sizes."
      />

      {products.length === 0 ? (
        <Disclaimer>No sheet products are published in the store right now — contact us for current pricing.</Disclaimer>
      ) : (
        <div className="mb-5 grid gap-3 sm:grid-cols-2">
          {products.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => pickProduct(product)}
              className={cn(
                "rounded-sm border bg-background p-3.5 text-left",
                state.productId === product.id ? "border-2 border-accent" : "border-border hover:border-primary/40",
              )}
            >
              <div className="text-sm font-semibold">{product.name}</div>
              <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                {product.variants.length} option{product.variants.length === 1 ? "" : "s"} · priced per {product.unit}
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedProduct && (
        <div className="mb-6">
          <Label className="mb-1.5 block text-[13px] font-semibold">Gauge / option</Label>
          <div className="flex flex-wrap gap-2">
            {selectedProduct.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                disabled={!v.inStock}
                onClick={() => pickVariant(v)}
                className={cn(
                  "rounded-sm border px-3 py-2 text-left text-xs disabled:cursor-not-allowed disabled:opacity-40",
                  state.variantId === v.id
                    ? "border-2 border-accent bg-accent/5"
                    : "border-border bg-background hover:border-primary/40",
                )}
              >
                <div className="font-mono font-semibold">{v.label}</div>
                <div className="mt-0.5 text-muted-foreground">
                  {v.inStock ? `${formatNaira(v.priceKobo)}/${selectedProduct.unit}` : "Out of stock"}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-x-6 sm:grid-cols-2">
        <Field label="Sheet cover width" hint="metres, nominal">
          <Input
            type="number"
            step="0.05"
            value={state.sheetWidth}
            onChange={(e) => patch({ sheetWidth: parseFloat(e.target.value) || 0 })}
          />
        </Field>
        {state.sheetLayout === "fixed" && (
          <Field label="Sheet length" hint="metres, fixed panel">
            <Input
              type="number"
              step="0.1"
              value={state.sheetLength}
              onChange={(e) => patch({ sheetLength: parseFloat(e.target.value) || 0 })}
            />
          </Field>
        )}
        <Field label="Overlap allowance" hint="metres taken up by the side rib joint">
          <Input
            type="number"
            step="0.01"
            value={state.overlap}
            onChange={(e) => patch({ overlap: parseFloat(e.target.value) || 0 })}
          />
        </Field>
        <Field label="Waste / contingency" hint="covers cutting waste and mistakes, %">
          <Input
            type="number"
            step="1"
            value={state.wastePct}
            onChange={(e) => patch({ wastePct: parseFloat(e.target.value) || 0 })}
          />
        </Field>
      </div>

      <NavRow onBack={onBack} onNext={onNext} nextDisabled={!state.variantId} />
    </div>
  );
}

/* --------------------------- Step: Accessories ----------------------------- */

function accBadge(common: string) {
  return (
    <span className="ml-1.5 rounded-xs bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">aka {common}</span>
  );
}

function StepAccessories({
  state,
  patch,
  onBack,
  onNext,
}: {
  state: CalculatorState;
  patch: (p: Partial<CalculatorState>) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const acc = computeAccessories(state);
  const autoKeys = autoAccessoryKeys(state.shape);

  return (
    <div>
      <StepHeader
        n={5}
        title="Ridges, gutters & trim"
        help="These are worked out from your roof shape automatically. Every piece is bent from a 6m sheet, so longer runs need several pieces with a small overlap at each joint — that's already included below."
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        {autoKeys.map((key) => {
          const g = GLOSSARY.find((x) => x.key === key)!;
          const it = acc.items[key];
          return (
            <div key={key} className="rounded-sm border border-border bg-background p-3.5">
              <div className="flex items-center text-xs uppercase tracking-wide text-muted-foreground">
                {g.tech}
                {accBadge(g.common)}
              </div>
              <div className="mt-1 font-mono text-lg font-bold">
                {round2(it.length)} m &rarr; {it.pieces} piece{it.pieces === 1 ? "" : "s"}
              </div>
            </div>
          );
        })}
      </div>

      {state.shape === "hipext" && (
        <div className="mb-5">
          <Disclaimer>
            Valley flashing runs where the extension roof meets the main roof — this length depends on the exact
            join, so please measure it on site or estimate it below.
          </Disclaimer>
        </div>
      )}

      <div className="grid gap-x-6 sm:grid-cols-2">
        <Field label="Valley flashing length" hint="metres, 0 if none">
          <Input
            type="number"
            step="0.1"
            value={state.valleyLen}
            onChange={(e) => patch({ valleyLen: parseFloat(e.target.value) || 0 })}
          />
        </Field>
        <Field label="Wall / apron flashing length" hint="only if a wall meets the roof, metres">
          <Input
            type="number"
            step="0.1"
            value={state.wallFlashingLen}
            onChange={(e) => patch({ wallFlashingLen: parseFloat(e.target.value) || 0 })}
          />
        </Field>
        <Field label="Bending machine max length" hint="metres, default 6">
          <Input
            type="number"
            step="0.5"
            value={state.bendMax}
            onChange={(e) => patch({ bendMax: parseFloat(e.target.value) || 0 })}
          />
        </Field>
        <Field label="Overlap per joint" hint="metres taken up per bend joint">
          <Input
            type="number"
            step="0.05"
            value={state.bendLap}
            onChange={(e) => patch({ bendLap: parseFloat(e.target.value) || 0 })}
          />
        </Field>
      </div>

      <div className="max-w-[280px] rounded-sm border border-border bg-background p-3.5">
        <div className="flex items-center text-xs uppercase tracking-wide text-muted-foreground">
          Stop Ends / End Caps
          {accBadge("End caps")}
        </div>
        <div className="mt-1 font-mono text-lg font-bold">{acc.endCaps} pieces</div>
      </div>

      <NavRow onBack={onBack} onNext={onNext} nextLabel="See Result" />
    </div>
  );
}

/* ------------------------------ Step: Result -------------------------------- */

function WhyToggle({ id, openWhy, toggleWhy, children }: { id: string; openWhy: Set<string>; toggleWhy: (id: string) => void; children: React.ReactNode }) {
  const open = openWhy.has(id);
  return (
    <div className="mt-2">
      <button type="button" onClick={() => toggleWhy(id)} className="text-xs text-primary underline">
        Why this number?
      </button>
      {open && (
        <div className="mt-1.5 border-t border-dashed border-border pt-1.5 text-xs leading-relaxed text-muted-foreground">
          {children}
        </div>
      )}
    </div>
  );
}

function StepResult({
  state,
  openWhy,
  toggleWhy,
  onReset,
}: {
  state: CalculatorState;
  openWhy: Set<string>;
  toggleWhy: (id: string) => void;
  onReset: () => void;
}) {
  const r = computeResults(state);
  const acc = computeAccessories(state);
  const { shortSpan, longSpan } = getSpans(state);
  void shortSpan;
  void longSpan;

  return (
    <div>
      <StepHeader
        n={6}
        title="Your estimate"
        help="Based on what you entered. Treat this as a solid working estimate — confirm exact hip/valley cuts on site before final ordering."
      />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-sm bg-primary p-5 text-primary-foreground">
        <div>
          <div className="text-xs uppercase tracking-wide opacity-85">Sheets needed</div>
          <div className="font-mono text-4xl font-bold leading-none">{r.sheetsCount}</div>
        </div>
        {state.sheetLayout === "longspan" && r.totalLinearMeters != null && (
          <div>
            <div className="text-xs uppercase tracking-wide opacity-85">Total linear metres</div>
            <div className="font-mono text-4xl font-bold leading-none">{round2(r.totalLinearMeters)} m</div>
          </div>
        )}
        {r.materialCostKobo != null && (
          <div>
            <div className="text-xs uppercase tracking-wide opacity-85">Estimated material cost</div>
            <div className="font-mono text-4xl font-bold leading-none">{formatNaira(r.materialCostKobo)}</div>
          </div>
        )}
      </div>

      <div className="mb-5 grid gap-3.5 sm:grid-cols-2">
        <div className="rounded-sm border border-border bg-background p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Roof Area (sloped)</div>
          <div className="font-mono text-xl font-bold">{round2(r.roofArea)} m²</div>
          <WhyToggle id="w1" openWhy={openWhy} toggleWhy={toggleWhy}>
            Your footprint area is {round2(r.area)} m². Because the roof leans at {state.pitchDeg}°, its real
            surface is bigger than the flat footprint — we divide by cos({state.pitchDeg}°) to get the true sloped
            area.
          </WhyToggle>
        </div>
        <div className="rounded-sm border border-border bg-background p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Slope (rafter) length</div>
          <div className="font-mono text-xl font-bold">{round2(r.rafter)} m</div>
          <WhyToggle id="w2" openWhy={openWhy} toggleWhy={toggleWhy}>
            Half your eave width plus the overhang, stretched along the roof&rsquo;s angle instead of straight
            across — this is the actual length each sheet is cut to.
          </WhyToggle>
        </div>
        <div className="rounded-sm border border-border bg-background p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Approx. fasteners</div>
          <div className="font-mono text-xl font-bold">{r.fasteners.toLocaleString()}</div>
          <WhyToggle id="w3" openWhy={openWhy} toggleWhy={toggleWhy}>
            Standard rule of thumb: about 3 screws/bolts per square metre of sheeted roof area.
          </WhyToggle>
        </div>
        <div className="rounded-sm border border-border bg-background p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Sheet layout</div>
          <div className="text-sm font-semibold">{r.sheetsNote}</div>
        </div>
      </div>

      {r.materialCostKobo == null && (
        <div className="mb-5">
          <Disclaimer>
            No gauge was selected in the previous step, so a material cost couldn&rsquo;t be estimated. Sheet and
            area figures above are still accurate.
          </Disclaimer>
        </div>
      )}

      {state.shape !== "gable" && (
        <div className="mb-5">
          <Disclaimer>
            Hip roofs need shorter, angled sheet cuts where the slopes meet at the hip. That&rsquo;s folded into
            your {state.wastePct}% waste allowance — a roofer should still confirm exact hip cuts on site.
          </Disclaimer>
        </div>
      )}

      <h3 className="mb-2.5 mt-7 font-heading text-lg font-bold uppercase">Ridges, gutters &amp; trim</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {GLOSSARY.filter((g) => acc.items[g.key].length > 0).map((g) => {
          const it = acc.items[g.key];
          return (
            <div key={g.key} className="rounded-sm border border-border bg-background p-3.5">
              <div className="flex items-center text-xs uppercase tracking-wide text-muted-foreground">
                {g.tech}
                {accBadge(g.common)}
              </div>
              <div className="mt-1 font-mono text-base font-bold">
                {round2(it.length)} m &rarr; {it.pieces} pc
              </div>
            </div>
          );
        })}
        <div className="rounded-sm border border-border bg-background p-3.5">
          <div className="flex items-center text-xs uppercase tracking-wide text-muted-foreground">
            Stop Ends / End Caps
            {accBadge("End caps")}
          </div>
          <div className="mt-1 font-mono text-base font-bold">{acc.endCaps} pc</div>
        </div>
      </div>
      <div className="mt-3">
        <Disclaimer>
          All trim pieces are bent to a {state.bendMax}m maximum with {Math.round(state.bendLap * 1000)}mm overlap
          per joint — piece counts above already account for this.
        </Disclaimer>
      </div>

      <div className="mt-7 flex justify-between">
        <Button type="button" variant="outline" className="rounded-sm" onClick={onReset}>
          Start Over
        </Button>
        <Button
          type="button"
          onClick={() => window.print()}
          className="rounded-sm bg-accent font-heading font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90"
        >
          Print / Save
        </Button>
      </div>
    </div>
  );
}
