// One-off asset generator: favicons + social/OG images from the source avatar.
// Run: node scripts/gen-icons.mjs
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = process.argv[2] || resolve(process.env.HOME, "Downloads/avatar.jpg");
const out = (p) => resolve(root, "public", p);

const BG = "#111111";
const ACCENT = "#38bdf8";

// --- square PNG icons (avatar is already square) ---
const pngSizes = {
  "favicon-16x16.png": 16,
  "favicon-32x32.png": 32,
  "favicon-48x48.png": 48,
  "apple-touch-icon.png": 180,
  "icon-192.png": 192,
  "icon-512.png": 512,
};

const pngBuffers = {};
for (const [name, size] of Object.entries(pngSizes)) {
  const buf = await sharp(SRC)
    .resize(size, size, { fit: "cover" })
    .png()
    .toBuffer();
  pngBuffers[size] = buf;
  writeFileSync(out(`assets/${name}`), buf);
}

// --- favicon.ico (PNG-encoded entries: 16/32/48) ---
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);

  const dir = Buffer.alloc(16 * entries.length);
  let offset = 6 + dir.length;
  const dataChunks = [];
  entries.forEach((e, i) => {
    const b = i * 16;
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, b + 0);
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, b + 1);
    dir.writeUInt8(0, b + 2); // palette
    dir.writeUInt8(0, b + 3); // reserved
    dir.writeUInt16LE(1, b + 4); // color planes
    dir.writeUInt16LE(32, b + 6); // bits per pixel
    dir.writeUInt32LE(e.data.length, b + 8);
    dir.writeUInt32LE(offset, b + 12);
    offset += e.data.length;
    dataChunks.push(e.data);
  });
  return Buffer.concat([header, dir, ...dataChunks]);
}

writeFileSync(
  out("favicon.ico"),
  buildIco([
    { size: 16, data: pngBuffers[16] },
    { size: 32, data: pngBuffers[32] },
    { size: 48, data: pngBuffers[48] },
  ])
);

// --- favicon.svg: wrap the raster avatar so the existing svg <link> keeps working ---
const avatarB64 = pngBuffers[192].toString("base64");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192">
  <image width="192" height="192" href="data:image/png;base64,${avatarB64}"/>
</svg>`;
writeFileSync(out("favicon.svg"), svg);

// --- OG / social image 1200x630 ---
const OG_W = 1200, OG_H = 630;
const AV = 300; // avatar size on the card
const avRounded = await sharp(
  await sharp(SRC).resize(AV, AV, { fit: "cover" }).png().toBuffer()
)
  .composite([
    {
      input: Buffer.from(
        `<svg><rect x="0" y="0" width="${AV}" height="${AV}" rx="36" ry="36"/></svg>`
      ),
      blend: "dest-in",
    },
  ])
  .png()
  .toBuffer();

const ogBg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}">
  <rect width="${OG_W}" height="${OG_H}" fill="${BG}"/>
  <rect width="${OG_W}" height="8" y="${OG_H - 8}" fill="${ACCENT}"/>
  <text x="${120 + AV + 60}" y="280" font-family="'Space Grotesk','Helvetica Neue',Arial,sans-serif" font-size="76" font-weight="700" fill="#f0f0f0">Paolo Pontarollo</text>
  <text x="${120 + AV + 60}" y="350" font-family="'Space Grotesk','Helvetica Neue',Arial,sans-serif" font-size="40" font-weight="400" fill="${ACCENT}">Full Stack Developer</text>
  <text x="${120 + AV + 60}" y="410" font-family="'Helvetica Neue',Arial,sans-serif" font-size="28" font-weight="400" fill="#a3a3a3">Laravel · Vue · Nuxt · TypeScript · Docker</text>
</svg>`);

await sharp(ogBg)
  .composite([{ input: avRounded, left: 120, top: Math.round((OG_H - AV) / 2) }])
  .png()
  .toBuffer()
  .then((b) => writeFileSync(out("assets/og-image.png"), b));

// JPEG variant (smaller, broad compatibility)
await sharp(out("assets/og-image.png"))
  .jpeg({ quality: 88 })
  .toBuffer()
  .then((b) => writeFileSync(out("assets/og-image.jpg"), b));

console.log("Generated favicons + OG images.");
