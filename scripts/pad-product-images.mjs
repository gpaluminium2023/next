/**
 * One-off: letterbox portrait product artwork onto the 4:3 canvas the store
 * renders in.
 *
 * components/store/product-card.tsx and product-gallery.tsx both draw product
 * images in an `aspect-4/3` box with `object-cover`, so a 3:4 portrait source
 * loses the top and bottom ~22% — which on these designs is the headline and
 * the footer band. Padding to 4:3 up front means object-cover has nothing to
 * crop and the full design survives.
 *
 * The pad colour is sampled from each image's own left/right edge columns so
 * the bars blend into the artwork rather than reading as a border.
 *
 * Run with: node scripts/pad-product-images.mjs
 * Safe to re-run — images already at (or wider than) 4:3 are skipped.
 */
import sharp from "sharp";
import { readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "new-materials");
const TARGET_W = 1448;
const TARGET_H = 1086; // 4:3, matching the images that are already correct
const TARGET_RATIO = TARGET_W / TARGET_H;

/**
 * Average colour of the top-left corner.
 *
 * Every one of these layouts puts its headline on a flat dark panel in the
 * top-left, which is exactly the tone the bars should be. The alternatives
 * both pick up photography instead: the full-height edge columns catch the
 * wooden bench the products sit on, and the top-right corner catches the
 * background of the product shot (a red diagonal on Land Gum, a bright office
 * on ABRO 1800). Either one produces a bar that reads as a mistake.
 */
async function sampleEdgeColour(file, width, height, strip = 12) {
  // stats() reads the *input* image and ignores queued operations, so the
  // crop has to be materialised into a buffer before measuring it.
  const crop = await sharp(file)
    .extract({ left: 0, top: 0, width: strip, height: Math.round(height * 0.15) })
    .png()
    .toBuffer();
  const { channels } = await sharp(crop).stats();
  const [r, g, b] = channels.slice(0, 3).map((c) => Math.round(c.mean));
  return { r, g, b, alpha: 1 };
}

// Reference material, not product artwork — never rendered by the store, so
// padding these would just corrupt a readable document.
const NOT_PRODUCTS = new Set([
  "accessories-price-list-source.png",
  "price-list-enugu-2026-04-19.jpeg",
]);

const files = (await readdir(DIR)).filter(
  (f) => /\.(png|jpe?g)$/i.test(f) && !NOT_PRODUCTS.has(f)
);

for (const name of files) {
  const file = join(DIR, name);
  const { width, height } = await sharp(file).metadata();

  if (width / height >= TARGET_RATIO - 0.01) {
    console.log(`= ${name} — already ${(width / height).toFixed(2)}, skipping`);
    continue;
  }

  const background = await sampleEdgeColour(file, width, height);
  const out = await sharp(file)
    .resize(TARGET_W, TARGET_H, { fit: "contain", background })
    .png()
    .toBuffer();

  await sharp(out).toFile(file);
  const { r, g, b } = background;
  console.log(
    `✓ ${name} — ${width}x${height} → ${TARGET_W}x${TARGET_H}, pad rgb(${r},${g},${b})`
  );
}
