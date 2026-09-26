// Vishwa Sanatan Sansthanam trust members (from the official members banner).
// Names and roles are kept in Hindi (as on the banner) for all locales.
//
// PHOTOS: face crops live in docs/members/ with English-label filenames
// (see docs/members/manifest.json). Each roster entry names its photo `file`;
// if that file exists it is shown, else a circular initial-avatar placeholder.
// docs/members/ is mirrored into public/members/ by scripts/sync-events.mjs.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export interface Member {
  no: number;
  name: string; // Hindi
  role: string; // Hindi
  initial: string; // fallback avatar glyph
  photo?: string; // resolved public URL if the photo file exists
}

// no · Hindi name · Hindi role · fallback initial · photo filename (docs/members/)
const roster: Array<{ no: number; name: string; role: string; initial: string; file: string }> = [
  { no: 1, name: 'IPS कृपा शंकर सिंह', role: 'संरक्षक मण्डल', initial: 'कृ', file: 'ips_krupa_shankar_singh.png' },
  { no: 2, name: 'डॉ. के.एस. राणा', role: 'संरक्षक', initial: 'रा', file: 'dr_ks_rana.png' },
  { no: 3, name: 'डॉ. शंकर कुमार मिश्र', role: 'राष्ट्रीय प्रभारी', initial: 'शं', file: 'dr_shankar_kumar_mishra.png' },
  { no: 4, name: 'डॉ. संतोष आचार्य', role: 'संस्थापक अध्यक्ष', initial: 'सं', file: 'dr_santosh_acharya.png' },
  { no: 5, name: 'यशराज सिंह गोहिल', role: 'राष्ट्रीय महामंत्री', initial: 'य', file: 'yashraj_singh_gohil.png' },
  { no: 6, name: 'महंत अभेदानन्द गिरी', role: 'संयोजक धर्माचार्य उ.प्र.', initial: 'अ', file: 'mahant_amreshnand_giri.png' },
  { no: 7, name: 'आनन्द सिंह', role: 'जिलाप्रभारी', initial: 'आ', file: 'anand_singh.png' },
  { no: 8, name: 'विमलेश सिंह', role: 'राष्ट्रीय उपाध्यक्ष', initial: 'वि', file: 'vimlesh_singh.png' },
  { no: 9, name: 'डॉ. हिमांशु शेखर सिंह', role: 'राष्ट्रीय कोषाध्यक्ष', initial: 'हि', file: 'dr_himanshu_shekhar_singh.png' },
  { no: 10, name: 'पं. राजन मिश्र', role: 'प्रदेश संयोजक उ.प्र.', initial: 'रा', file: 'pan_rajan_mishra.png' },
  { no: 11, name: 'विनोद गुप्ता', role: 'प्रदेश उपाध्यक्ष उ.प्र.', initial: 'वि', file: 'vinod_gupta.png' },
  { no: 12, name: 'एडवोकेट सुभासुर्यवंश', role: 'राष्ट्रीय अध्यक्ष मातृ प्र.', initial: 'सु', file: 'face_12_row3_col2.png' },
  { no: 13, name: 'सरोजा प्रधान', role: 'राष्ट्रीय महामंत्री मातृ प्र.', initial: 'स', file: 'saroj_pradhan.png' },
  { no: 14, name: 'डॉ. प्राची चतुर्वेदी', role: 'राष्ट्रीय संयोजक', initial: 'प्रा', file: 'dr_prachi_chaturvedi.png' },
  { no: 15, name: 'महामण्डलेश्वर भवानी माँ', role: 'राष्ट्रीय संयोजक किन्नर प्र.', initial: 'भ', file: 'mahamandaleshwar_bhavani_maa.png' },
  { no: 16, name: 'सुमन द्विवेदी', role: 'प्रदेश प्रभारी मा. प्र.', initial: 'सु', file: 'suman_dwivedi.png' },
  { no: 17, name: 'श्रीमती दिपा सिंह', role: 'राष्ट्रीय उपाध्यक्ष मा. प्र.', initial: 'दि', file: 'shrimati_deepa_singh.png' },
  { no: 18, name: 'राधिका भट्टराई', role: 'प्रदेश उपाध्यक्ष मा. प्र.', initial: 'रा', file: 'radhika_bhattai.png' },
  { no: 19, name: 'खुशबू सोनी', role: 'प्रदेश अध्यक्ष, गुजरात मा. प्र.', initial: 'खु', file: 'khushbu_soni.png' },
  { no: 20, name: 'ममता सिंह', role: 'प्रदेश संयोजक मा. प्र.', initial: 'म', file: 'mamta_singh.png' },
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const membersDir = path.resolve(__dirname, '../../docs/members');
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

let photoFiles = new Set<string>();
try {
  photoFiles = new Set(fs.readdirSync(membersDir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f)));
} catch {
  photoFiles = new Set();
}

export const members: Member[] = roster.map(({ file, ...m }) => ({
  ...m,
  photo: photoFiles.has(file) ? `${base}/members/${file}` : undefined,
}));
