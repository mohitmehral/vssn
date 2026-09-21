// Loads "trust event" photos from the docs/events/ folder at build time.
//
// PREFERRED naming:  YYYY-MM-DD_a-short-title.jpg   (.png/.webp/.jpeg too)
//   e.g.  2026-08-15_manish-kumar-varanasi.jpg  ->  caption "Manish Kumar Varanasi"
//
// Also tolerated: any filename that CONTAINS a YYYY-MM-DD date, including the
// WhatsApp-style  PHOTO-2026-09-14-10-08-10.jpg  (no title -> generic caption).
//
// The date drives ordering; the site always shows the LATEST-dated images
// first. docs/events/ is the single source of truth; scripts/sync-events.mjs
// copies these into public/events/ at build time. Add a file and rebuild.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export interface TrustEvent {
  date: string; // ISO YYYY-MM-DD
  title: string;
  src: string; // base-aware public URL
  sortKey: string; // date + time, for newest-first ordering
}

const EXT_RE = /\.(jpg|jpeg|png|webp)$/i;
// First YYYY-MM-DD found anywhere in the name.
const DATE_ANYWHERE_RE = /(\d{4})-(\d{2})-(\d{2})/;
// Optional time right after the date: -HH-MM-SS (WhatsApp export style),
// used only to order photos taken on the same day, newest first.
const TIME_AFTER_DATE_RE = /\d{4}-\d{2}-\d{2}[-_](\d{2})[-_](\d{2})[-_](\d{2})/;

function humanize(slug: string | undefined): string {
  if (!slug) return '';
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\d{1,2}[:.]?\d{0,2}[:.]?\d{0,2}\b/g, '') // strip stray time bits
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Derive a caption from the part of the filename that is not the date/time. */
function captionFrom(nameNoExt: string, matchIndex: number, matchLen: number): string {
  // Text before the date (e.g. "PHOTO") and after the date.
  const before = nameNoExt.slice(0, matchIndex).replace(/[-_]+$/, '');
  const after = nameNoExt.slice(matchIndex + matchLen).replace(/^[-_]+/, '');
  // Prefer the "after" segment if it looks like a real title (has letters).
  const afterTitle = humanize(after);
  if (/[A-Za-z\u00C0-\uFFFF]/.test(afterTitle) && afterTitle.length > 1) return afterTitle;
  const beforeTitle = humanize(before);
  if (beforeTitle && beforeTitle.toUpperCase() !== 'PHOTO') return beforeTitle;
  return 'Sansthan Event';
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
    if (!EXT_RE.test(filename)) return null;
    const nameNoExt = filename.replace(EXT_RE, '');
    const m = nameNoExt.match(DATE_ANYWHERE_RE);
    if (!m) return null;
    const [full, y, mo, d] = m;
    const date = `${y}-${mo}-${d}`;
    const tm = nameNoExt.match(TIME_AFTER_DATE_RE);
    const time = tm ? `${tm[1]}${tm[2]}${tm[3]}` : '000000';
    return {
      date,
      title: captionFrom(nameNoExt, m.index ?? 0, full.length),
      src: `${base}/events/${filename}`,
      sortKey: `${date}-${time}`,
    };
  })
  .filter((e): e is TrustEvent => e !== null)
  // Latest first (by date, then time-of-day for same-day photos).
  .sort((a, b) => (a.sortKey < b.sortKey ? 1 : a.sortKey > b.sortKey ? -1 : 0));
