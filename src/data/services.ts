// Special services offered by Vishwa Sanatan Sansthanam ("विशेष सुविधायें").
// Wording follows the trust's own banner. English + Hindi provided; other
// locales fall back to English (like other long-form content).

export interface Service {
  key: string;
  icon: string;
  label: Record<string, string>;
}

export const services: Service[] = [
  { key: 'yoga', icon: '🧘', label: { en: 'Yoga Service', hi: 'योगा सर्विस' } },
  { key: 'astrology', icon: '🔮', label: { en: 'Astrology', hi: 'एस्ट्रोलॉजी' } },
  { key: 'pranic', icon: '✋', label: { en: 'Pranic Healing', hi: 'प्राणिक हीलिंग' } },
  { key: 'numerology', icon: '🔢', label: { en: 'Numerology', hi: 'अंक ज्योतिष' } },
  { key: 'vastu', icon: '🧭', label: { en: 'Vastu Shastra', hi: 'वास्तुशास्त्र' } },
  { key: 'tarot', icon: '🃏', label: { en: 'Tarot Card Reading', hi: 'टैरो कार्ड रीडिंग' } },
  { key: 'vedicpuja', icon: '🕉️', label: { en: 'Vedic Puja', hi: 'वैदिक पूजा' } },
  { key: 'meditation', icon: '🪷', label: { en: 'Meditation', hi: 'मैडिटेशन' } },
  { key: 'music', icon: '🎵', label: { en: 'Classical Music', hi: 'क्लासिकल म्यूजिक' } },
  { key: 'counselling', icon: '💬', label: { en: 'Counselling Session', hi: 'काउंसलिंग सेसन' } },
  { key: 'medical', icon: '⚕️', label: { en: 'Medical Helpline', hi: 'मेडिकल हेल्पलाइन' } },
];

export function sField(field: Record<string, string>, locale: string): string {
  return field[locale] ?? field.en;
}
