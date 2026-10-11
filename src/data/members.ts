// Vishwa Sanatan Sansthanam trust members.
//
// PHOTOS live in public/members/ (the only copy; no sync step):
//   www.vssn.org.in-member-<sequence>.jpg            -> India flag (default)
//   www.vssn.org.in-member-<country>-<sequence>.jpg  -> that country's flag
// e.g. www.vssn.org.in-member-usa-19.jpg. Shown in order of <sequence>.
// Flags are defined in components/react/Members.tsx (FLAGS).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export interface Member {
  no: number;
  photo: string; // public URL
  country: string; // lower-case tag from the filename; 'india' when absent
}

const PATTERN = /^www\.vssn\.org\.in-member-(?:([a-z-]+?)-)?(\d+)\.(jpe?g|png|webp)$/i;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const membersDir = path.resolve(__dirname, '../../public/members');
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

let files: string[] = [];
try {
  files = fs.readdirSync(membersDir);
} catch {
  files = [];
}

export const members: Member[] = files
  .map((f) => ({ f, m: PATTERN.exec(f) }))
  .filter((x): x is { f: string; m: RegExpExecArray } => x.m !== null)
  .map(({ f, m }) => ({
    no: Number(m[2]),
    country: (m[1] ?? 'india').toLowerCase(),
    photo: `${base}/members/${f}`,
  }))
  .sort((a, b) => a.no - b.no || Number(a.country !== 'india') - Number(b.country !== 'india'));
