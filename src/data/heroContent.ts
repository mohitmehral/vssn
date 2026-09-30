// Hero content: key objectives of the Sansthan (a short digest of the 31
// objectives in aboutUs.ts) and upcoming Sansthan events for the hero panel.
// English + Hindi; other locales fall back to English.

type L = Record<string, string>;

export const heroMeta: L = {
  en: 'Est. 29 January 2026 · Registered trust in India',
  hi: 'स्थापना 29 जनवरी 2026 · भारत में पंजीकृत न्यास',
};

export const objectivesHeading: L = { en: 'Our key objectives', hi: 'हमारे मुख्य उद्देश्य' };
export const allObjectivesLabel: L = { en: 'All objectives', hi: 'सभी उद्देश्य देखें' };
export const introReadMore: L = { en: 'Read full', hi: 'पूरा पढ़ें' };
export const introReadLess: L = { en: 'Show less', hi: 'संक्षेप में' };

// Chosen for broad public interest (health, children, women, well-being).
export const heroObjectives: { icon: string; title: L }[] = [
  { icon: '🩺', title: { en: 'Free health & medical camps', hi: 'निःशुल्क स्वास्थ्य एवं चिकित्सा शिविर' } },
  { icon: '📚', title: { en: 'Education for every child', hi: 'हर बच्चे के लिए शिक्षा' } },
  { icon: '👩', title: { en: 'Skill training for women', hi: 'महिलाओं हेतु कौशल प्रशिक्षण' } },
  { icon: '🧘', title: { en: 'Yoga & meditation ashrams', hi: 'योग एवं ध्यान आश्रम' } },
];

// ---- Upcoming Sansthan events (hero panel) ----
// Edit this list as programmes are confirmed. Past dates drop off
// automatically (filtered against today at build time).
export const upcomingEventsHeading: L = { en: 'Upcoming events', hi: 'आगामी कार्यक्रम' };

export interface UpcomingEvent {
  id: string;
  date: string; // ISO YYYY-MM-DD
  title: L;
  place: L;
}

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: 'navratri-satsang',
    date: '2026-10-18',
    title: { en: 'Navratri Satsang & Kanya Pujan', hi: 'नवरात्रि सत्संग एवं कन्या पूजन' },
    place: { en: 'Venue to be announced', hi: 'स्थान शीघ्र घोषित' },
  },
  {
    id: 'deepotsav',
    date: '2026-11-08',
    title: { en: 'Deepotsav & Annadanam Seva', hi: 'दीपोत्सव एवं अन्नदान सेवा' },
    place: { en: 'Venue to be announced', hi: 'स्थान शीघ्र घोषित' },
  },
  {
    id: 'dev-deepawali',
    date: '2026-11-24',
    title: { en: 'Kartik Purnima Deep Daan', hi: 'कार्तिक पूर्णिमा दीपदान' },
    place: { en: 'Venue to be announced', hi: 'स्थान शीघ्र घोषित' },
  },
  {
    id: 'gita-jayanti',
    date: '2026-12-20',
    title: { en: 'Gita Jayanti Path & Pravachan', hi: 'गीता जयंती पाठ एवं प्रवचन' },
    place: { en: 'Venue to be announced', hi: 'स्थान शीघ्र घोषित' },
  },
];

export function hField(field: L, locale: string): string {
  return field[locale] ?? field.en;
}
