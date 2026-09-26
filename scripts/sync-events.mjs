// Copies photos from docs/<folder>/ (the source of truth) into
// public/<folder>/ so they are published with the static site.
// Runs automatically before every build via the "prebuild" npm script.
import { readdirSync, mkdirSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ALLOWED = new Set(['.jpg', '.jpeg', '.png', '.webp']);

// Folders under docs/ that mirror into public/.
const FOLDERS = ['events', 'members'];

for (const folder of FOLDERS) {
  const srcDir = join(__dirname, '..', 'docs', folder);
  const outDir = join(__dirname, '..', 'public', folder);

  // Clean and recreate the mirror so deletions propagate.
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
  console.log(`[sync] copied ${copied} image(s) to public/${folder}/`);
}
