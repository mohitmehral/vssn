// Copies event photos from docs/events/ (the source of truth) into
// public/events/ so they are published with the static site.
// Runs automatically before every build via the "prebuild" npm script.
import { readdirSync, mkdirSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, '..', 'docs', 'events');
const outDir = join(__dirname, '..', 'public', 'events');

const ALLOWED = new Set(['.jpg', '.jpeg', '.png', '.webp']);

// Clean and recreate the public/events mirror so deletions propagate.
if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

let copied = 0;
if (existsSync(srcDir)) {
  for (const name of readdirSync(srcDir)) {
    if (!ALLOWED.has(extname(name).toLowerCase())) continue;
    copyFileSync(join(srcDir, name), join(outDir, name));
    copied++;
  }
}
console.log(`[sync-events] copied ${copied} event image(s) to public/events/`);
