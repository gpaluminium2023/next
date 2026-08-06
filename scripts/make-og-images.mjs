/**
 * Build 1200x630 JPEG link-preview derivatives of the product artwork.
 *
 * The sources in public/new-materials are 1.6-3.1 MB PNGs. WhatsApp abandons a
 * preview image well below that, which is why store product links previewed
 * with a title and no picture. These derivatives land around 60-120 KB.
 *
 * Run with: node scripts/make-og-images.mjs
 * Re-run after adding artwork to public/new-materials.
 *
 * Pairs with ogImageUrl() in lib/og-image.ts, which maps
 * /new-materials/x.png -> /og/x.jpg. Cloudinary uploads don't come through
 * here; those are resized by URL transform at request time.
 */
import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import { join, dirname, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = join(ROOT, "public", "new-materials");
const OUT_DIR = join(ROOT, "public", "og");

const WIDTH = 1200;
const HEIGHT = 630;

/**
 * Average colour of the top-left corner, used for the letterbox bars.
 *
 * Same choice as pad-product-images.mjs and for the same reason: every one of
 * these layouts puts its headline on a flat dark panel top-left, so that patch
 * is the tone the bars should be. Sampling the full edge columns instead picks
 * up the wooden bench the products sit on.
 */
async function sampleCornerColour(file, strip = 24) {
  const crop = await sharp(file)
    .extract({ left: 0, top: 0, width: strip, height: strip })
    .toBuffer();
  const { channels } = await sharp(crop).stats();
  return {
    r: Math.round(channels[0].mean),
    g: Math.round(channels[1].mean),
    b: Math.round(channels[2].mean),
  };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const entries = (await readdir(SRC_DIR)).filter((f) => /\.(png|jpe?g)$/i.test(f));
  if (entries.length === 0) {
    console.log("No source artwork found in public/new-materials.");
    return;
  }

  for (const file of entries) {
    const src = join(SRC_DIR, file);
    const out = join(OUT_DIR, `${basename(file, extname(file))}.jpg`);

    const background = await sampleCornerColour(src);

    await sharp(src)
      .resize(WIDTH, HEIGHT, { fit: "contain", background })
      .flatten({ background })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(out);

    const [before, after] = await Promise.all([stat(src), stat(out)]);
    console.log(
      `  ✓ ${file}  ${(before.size / 1048576).toFixed(2)} MB -> ${(after.size / 1024).toFixed(0)} KB`,
    );
  }

  console.log(`\n${entries.length} preview image(s) written to public/og.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
