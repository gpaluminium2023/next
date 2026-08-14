# Factory video assets

The five factory clips shot in August 2026 arrived as 848x480 h264+aac —
roughly 480p, almost certainly downscaled by WhatsApp in transit. That
resolution is the constraint every decision below works around.

## The rules that follow from 848x480

1. **Never crop and upscale.** Filling a tall column with a 16:9 source via
   `object-cover` throws away ~40% of the width and then stretches what's left.
   On soft footage that reads as cheap, which is the opposite of what these
   clips are for. Every placement sizes its container to the clip's native
   aspect (`aspect-video`, or `aspect-[480/848]` for the portrait one).
2. **No full-bleed hero video.** A 848px source across a 1440px viewport is a
   1.7x upscale. If higher-resolution footage is ever shot, that becomes
   viable; until then the hero clip lives in a contained 16:9 panel roughly
   640px wide, which is a *downscale* and therefore sharp.
3. **Autoplaying clips carry no audio track.** They can never be unmuted, so
   the track is pure weight. Only `coil-stock` keeps audio, because it is
   click-to-play and the machine noise is part of what it proves.

## Encoding recipe

Masters live in `public/videos/` with their original filenames and are
gitignored (see `public/videos/.gitignore`). Derivatives are committed.

```bash
V=public/videos

# Ambient clips: trimmed to the window that shows the claim, audio stripped.
ffmpeg -y -ss 0 -i "$V/<master>.mp4" -t <seconds> \
  -c:v libx264 -crf 27 -preset veryslow -profile:v main -level 3.1 \
  -pix_fmt yuv420p -movflags +faststart -an -metadata:s:v rotate=0 \
  "$V/<name>.mp4"

# Poster (this is the only byte cost until a clip is armed).
ffmpeg -y -ss <seconds> -i "$V/<master>.mp4" -frames:v 1 -q:v 6 "$V/<name>.jpg"
```

The portrait master carries `rotation=-90` in its metadata. Browsers do honour
that, but relying on it means the shape is only correct at runtime, so it is
baked in instead: add `-noautorotate -vf transpose=1` to both commands. Output
is 480x848.

`coil-stock` is the exception — full length, `-crf 28`, and `-c:a aac -b:a 64k
-ac 1` instead of `-an`.

## What each clip is for

| File | Source | Out | Where | Mode |
|---|---|---|---|---|
| `hero-corrugation` | `longspan-live-corrugation-process` | 8.5s, 661KB | Homepage hero | ambient |
| `cut-to-length` | `portrait-...cutting-60m...` | 10.5s, 1.06MB | "Cut to your measurement" band | ambient |
| `coil-feed` | `feeding-a-coil-into0the-...` | 9.5s, 343KB | Process → "On our floor", left | ambient |
| `sheet-inspection` | `a-factory-worker-watching-...` | 9s, 598KB | Process → "On our floor", right | ambient |
| `coil-stock` | `coils-in-our-factory` | 33.9s, 2.85MB | About → "The stock behind the quote" | feature |

All five are also listed in `lib/videos-data.ts`, which is what gives them
`VideoObject` entries and a rendered section on `/gallery`.

## Loading behaviour

`components/factory-video.tsx` owns this. A clip has no `src` attribute until
it is *armed*, and with `preload="none"` an unarmed clip costs exactly one
~30KB poster. Ambient clips arm themselves via `IntersectionObserver` — but
only above 768px and only when `prefers-reduced-motion` is not set, so phones
and reduced-motion visitors get the still until they tap it. Feature clips
never arm on their own.

The upshot: a first paint of the homepage on a phone downloads five posters
(~170KB) and no video at all. On a desktop it downloads the hero clip
(661KB) and picks up the rest only as they are scrolled to.
