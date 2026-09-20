// Loads "trust event" photos from the docs/events/ folder at build time.
//
// CONVENTION: drop image files into  docs/events/  named as:
//     YYYY-MM-DD_a-short-title.jpg   (or .png/.webp/.jpeg)
//   e.g.  2026-01-14_makar-sankranti-bhandara.webp
//
// The date prefix drives ordering; the site always shows the LATEST-dated
// images first. The title after the underscore becomes the caption.
//
// docs/events/ is the single source of truth. A prebuild step
// (scripts/sync-events.mjs) copies these images into public/events/ so they
// are published with the static site. Just add a file and rebuild (or push —
// the GitHub Action rebuilds automatically). No code changes required.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export interface TrustEvent {
  date: string; // ISO YYYY-MM-DD
  title: string;
  src: string; // base-aware public URL
}

const DATE_RE = /^(\d{4}-\d{2}-\d{2})[_-]?(.*)?\.(jpg|jpeg|png|webp)$/i;

function humanize(slug: string | undefined): string {
  if (!slug) return 'Event';
  return slug
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const eventsDir = path.resolve(__dirname, '../../docs/events');

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

let files: string[] = [];
try {
  files = fs.readdirSync(eventsDir);
} catch {
  files = [];
}

export const trustEvents: TrustEvent[] = files
  .map((filename) => {
    const m = filename.match(DATE_RE);
    if (!m) return null;
    return {
      date: m[1],
      title: humanize(m[2]),
      src: `${base}/events/${filename}`,
    };
  })
  .filter((e): e is TrustEvent => e !== null)
  // Latest date first.
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
