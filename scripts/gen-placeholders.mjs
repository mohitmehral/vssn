// Generates lightweight placeholder PNGs for sample trust events so the
// showcase renders out of the box. Safe to delete once real photos are added.
// Uses only Node's built-in zlib — no dependencies.
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'docs', 'events');
mkdirSync(outDir, { recursive: true });

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}
function chunk(type, data) {
  const t = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}

// Solid-colour PNG with a subtle gradient feel via two bands.
function makePNG(w, h, [r, g, b]) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // colour type RGB
  const raw = Buffer.alloc((w * 3 + 1) * h);
  for (let y = 0; y < h; y++) {
    const rowStart = y * (w * 3 + 1);
    raw[rowStart] = 0; // filter none
    const shade = 1 - (y / h) * 0.35; // top brighter than bottom
    for (let x = 0; x < w; x++) {
      const i = rowStart + 1 + x * 3;
      raw[i] = Math.round(r * shade);
      raw[i + 1] = Math.round(g * shade);
      raw[i + 2] = Math.round(b * shade);
    }
  }
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// NOTE: The real VSS poster (2026-09-20-nisha-sanatan.jpg) was added by hand to
// docs/events/ and is the newest event. These remaining entries are only
// generic placeholders for older sample events — delete them when real photos
// for those exist. This script never overwrites hand-added real photos.
const samples = [
  ['2026-08-15_annadanam-seva.png', [15, 118, 110]],
  ['2026-03-03_holi-satsang.png', [42, 26, 94]],
  ['2026-01-14_makar-sankranti-bhandara.png', [154, 52, 18]],
];

for (const [name, colour] of samples) {
  writeFileSync(join(outDir, name), makePNG(800, 500, colour));
  console.log('wrote', name);
}
