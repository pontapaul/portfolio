import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const WIDTH = 200;

// Crop: shoulders up (top ~60% of 1446x1920)
const { data, info } = await sharp('./public/assets/nobg.png')
  .extract({ left: 0, top: 0, width: 1446, height: 1200 })
  .resize(WIDTH, null)
  .ensureAlpha()
  .greyscale()
  .raw()
  .toBuffer({ resolveWithObject: true });

const ch = info.channels;
const w = info.width;
const h = info.height;

const rows = [];
for (let y = 0; y < h; y++) {
  const row = [];
  for (let x = 0; x < w; x++) {
    const i = (y * w + x) * ch;
    const gray = data[i];
    const alpha = data[i + 1];
    if (alpha < 128) {
      row.push(0);
    } else {
      // Brightness maps directly to opacity (light = bright, dark = dim)
      // Range 0.2–1.0 so even dark areas (polo, hair) are visible
      const opacity = Math.round((0.2 + (gray / 255) * 0.8) * 100) / 100;
      row.push(opacity);
    }
  }
  rows.push(row);
}

writeFileSync('./src/data/ascii-portrait.json', JSON.stringify(rows));
console.log(`Generated ${w}x${rows.length} portrait grid`);
