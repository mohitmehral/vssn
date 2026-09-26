// Vishwa Sanatan Sansthanam trust members (from the official members banner).
// Names and roles are kept in Hindi (as on the banner) for all locales.
//
// PHOTOS (optional, slot in later): drop a JPEG/PNG/WEBP into  docs/members/
// named with the member's numeric prefix, e.g.  01_kripa-shankar-singh.jpg.
// The loader in this file matches by the leading number and uses the photo if
// present; otherwise a circular initial-avatar placeholder is shown.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export interface Member {
  no: number;
  name: string; // Hindi
  role: string; // Hindi
  initial: string; // fallback avatar glyph
  photo?: string; // resolved public URL if a photo exists
}

const roster: Array<{ no: number; name: string; role: string; initial: string }> = [
  { no: 1, name: 'IPS कृपा शंकर सिंह', role: 'संरक्षक मण्डल', initial: 'कृ' },
  { no: 2, name: 'डॉ. के.एस. राणा', role: 'संरक्षक', initial: 'रा' },
  { no: 3, name: 'डॉ. शंकर कुमार मिश्र', role: 'राष्ट्रीय प्रभारी', initial: 'शं' },
  { no: 4, name: 'डॉ. संतोष आचार्य', role: 'संस्थापक अध्यक्ष', initial: 'सं' },
  { no: 5, name: 'यशराज सिंह गोहिल', role: 'राष्ट्रीय महामंत्री', initial: 'य' },
  { no: 6, name: 'महंत अभेदानन्द गिरी', role: 'संयोजक धर्माचार्य उ.प्र.', initial: 'अ' },
  { no: 7, name: 'आनन्द सिंह', role: 'जिलाप्रभारी', initial: 'आ' },
  { no: 8, name: 'विमलेश सिंह', role: 'राष्ट्रीय उपाध्यक्ष', initial: 'वि' },
  { no: 9, name: 'डॉ. हिमांशु शेखर सिंह', role: 'राष्ट्रीय कोषाध्यक्ष', initial: 'हि' },
  { no: 10, name: 'पं. राजन मिश्र', role: 'प्रदेश संयोजक उ.प्र.', initial: 'रा' },
  { no: 11, name: 'विनोद गुप्ता', role: 'प्रदेश उपाध्यक्ष उ.प्र.', initial: 'वि' },
  { no: 12, name: 'एडवोकेट सुभासुर्यवंश', role: 'राष्ट्रीय अध्यक्ष मातृ प्र.', initial: 'सु' },
  { no: 13, name: 'सरोजा प्रधान', role: 'राष्ट्रीय महामंत्री मातृ प्र.', initial: 'स' },
  { no: 14, name: 'डॉ. प्राची चतुर्वेदी', role: 'राष्ट्रीय संयोजक', initial: 'प्रा' },
  { no: 15, name: 'महामण्डलेश्वर भवानी माँ', role: 'राष्ट्रीय संयोजक किन्नर प्र.', initial: 'भ' },
  { no: 16, name: 'सुमन द्विवेदी', role: 'प्रदेश प्रभारी मा. प्र.', initial: 'सु' },
  { no: 17, name: 'श्रीमती दिपा सिंह', role: 'राष्ट्रीय उपाध्यक्ष मा. प्र.', initial: 'दि' },
  { no: 18, name: 'राधिका भट्टराई', role: 'प्रदेश उपाध्यक्ष मा. प्र.', initial: 'रा' },
  { no: 19, name: 'खुशबू सोनी', role: 'प्रदेश अध्यक्ष, गुजरात मा. प्र.', initial: 'खु' },
  { no: 20, name: 'ममता सिंह', role: 'प्रदेश संयोजक मा. प्र.', initial: 'म' },
];

// Match optional photos in docs/members/ by leading number (e.g. "01_...", "1-...").
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const membersDir = path.resolve(__dirname, '../../docs/members');
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

let photoFiles: string[] = [];
try {
  photoFiles = fs.readdirSync(membersDir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
} catch {
  photoFiles = [];
}

function photoFor(no: number): string | undefined {
  const file = photoFiles.find((f) => {
    const m = f.match(/^0*(\d+)/);
    return m && Number(m[1]) === no;
  });
  return file ? `${base}/members/${file}` : undefined;
}

export const members: Member[] = roster.map((m) => ({
  ...m,
  photo: photoFor(m.no),
}));
