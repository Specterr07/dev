// Turns the raw ~25 MB Figma frame exports in art-source/frames/ into
// web-sized, pixel-aligned WebP variants in public/frames/.
//
// art-source/ is gitignored (it's ~380 MB of source material, regeneration
// input only). The committed / deployed assets are the WebPs in public/frames/.
//
// Every export shares the same forest painting; Figma just gave each frame a
// different amount of black padding (and stages 5/7/9/10 a wider right edge for
// the fired arrow). We crop all of them to ONE common content rectangle so the
// background + archer stay locked in place across all 15 stages and only the
// pose / text changes. The scroll "blink to black" hides the rest.
//
//   node scripts/prepare-frames.mjs

import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const SRC_DIR = resolve('art-source/frames');
const OUT_DIR = resolve('public/frames');

// Common content rect, measured from the exports (see script header).
// Content is y 0..2624 in every file. The painting starts at x=498 in every
// file EXCEPT "Stage 1" (exported 498px narrower, so x=0). Width 7442 reaches
// the far-right edge of stages 5/7/9 where the answer text / fired arrow sits;
// narrower frames just carry a thin dark strip there that cover-crop hides.
const CROP_W = 7442;
const CROP_H = 2624;
const LEFT_DEFAULT = 498;
const LEFT_STAGE1 = 0;

const WIDTHS = [1600, 2560, 3840];
const QUALITY = 80;

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const files = (await readdir(SRC_DIR))
    .filter((f) => /^Stage \d+.*\.png$/i.test(f))
    .map((f) => ({ f, n: parseInt(f.match(/Stage (\d+)/i)[1], 10) }))
    .sort((a, b) => a.n - b.n);

  if (files.length === 0) {
    console.error(`No "Stage N …png" files found in ${SRC_DIR}`);
    process.exit(1);
  }

  const manifest = [];

  for (const { f, n } of files) {
    const id = String(n).padStart(2, '0');
    const src = join(SRC_DIR, f);
    const meta = await sharp(src).metadata();
    const left = n === 1 ? LEFT_STAGE1 : LEFT_DEFAULT;

    // Guard against an export that doesn't match the measured rect.
    const w = Math.min(CROP_W, meta.width - left);
    const h = Math.min(CROP_H, meta.height);

    const base = sharp(src).extract({ left, top: 0, width: w, height: h });

    for (const width of WIDTHS) {
      const out = join(OUT_DIR, `${id}-${width}.webp`);
      await base
        .clone()
        .resize({ width })
        .webp({ quality: QUALITY })
        .toFile(out);
    }

    // Tiny blurred placeholder, inlined as a data URI in the manifest.
    const blurBuf = await base
      .clone()
      .resize({ width: 32 })
      .blur(2)
      .webp({ quality: 40 })
      .toBuffer();

    manifest.push({
      id,
      stage: n,
      name: f.replace(/^Stage \d+[:_]?\s*/i, '').replace(/\.png$/i, '').trim(),
      width: w,
      height: h,
      aspect: +(w / h).toFixed(4),
      blur: `data:image/webp;base64,${blurBuf.toString('base64')}`,
    });

    console.log(`  ${id}  ${f}  ->  ${w}x${h}  (${WIDTHS.join('/')} webp)`);
  }

  await writeFile(
    join(OUT_DIR, 'manifest.json'),
    JSON.stringify({ widths: WIDTHS, frames: manifest }, null, 2)
  );
  console.log(`\nWrote ${manifest.length} frames + manifest.json to public/frames/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
