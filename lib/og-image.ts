/**
 * Turn a product/article image URL into one a link-preview scraper will
 * actually render.
 *
 * WhatsApp (and to a lesser extent X and LinkedIn) cap preview images at a few
 * hundred KB and abandon the fetch rather than showing a partial image. The
 * seeded product artwork in public/new-materials is 1.6–3.1 MB PNG, which is
 * why those links previewed with a title and no picture — the page's own
 * <Image> tags were fine because Next optimises those on the fly, but the OG
 * tag points at the raw file.
 *
 * Two sources to handle:
 *  - Cloudinary (admin uploads) — resize via URL transform, no build step.
 *  - Local files (seeded artwork) — served from the derivatives that
 *    `node scripts/make-og-images.mjs` writes into public/og.
 */

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

const CLOUDINARY_UPLOAD = "/upload/";

// c_pad rather than c_fill: the artwork is 4:3 and puts its headline and
// footer band at the very top and bottom, so cropping to 1.91:1 would cut
// both. b_auto samples the pad colour from the image itself.
const CLOUDINARY_TRANSFORM = `f_jpg,q_auto:good,w_${OG_IMAGE_WIDTH},h_${OG_IMAGE_HEIGHT},c_pad,b_auto`;

/** Local source directory whose files have derivatives in public/og. */
const LOCAL_SOURCE_PREFIX = "/new-materials/";
const LOCAL_OG_PREFIX = "/og/";

export function ogImageUrl(url: string): string {
  if (url.includes("res.cloudinary.com") && url.includes(CLOUDINARY_UPLOAD)) {
    // Don't stack transforms if one is somehow already present.
    const [base, rest] = url.split(CLOUDINARY_UPLOAD);
    if (rest.startsWith(`${CLOUDINARY_TRANSFORM}/`)) return url;
    return `${base}${CLOUDINARY_UPLOAD}${CLOUDINARY_TRANSFORM}/${rest}`;
  }

  if (url.startsWith(LOCAL_SOURCE_PREFIX)) {
    const file = url.slice(LOCAL_SOURCE_PREFIX.length).replace(/\.(png|jpe?g|webp)$/i, ".jpg");
    return `${LOCAL_OG_PREFIX}${file}`;
  }

  // Everything else (public/images/*.jpg, the logo) is already small enough.
  return url;
}
