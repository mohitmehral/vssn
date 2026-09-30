// Special services offered by Vishwa Sanatan Sansthanam ("विशेष सुविधायें").
// Wording follows the trust's own banner. English + Hindi provided; other
// locales fall back to English (like other long-form content).

export interface Service {
  key: string;
  icon: string;
  label: Record<string, string>;
  desc: Record<string, string>;
}

export const services: Service[] = [
  { key: 'yoga', icon: '🧘', label: { en: 'Yoga Service', hi: 'योगा सर्विस' }, desc: { en: 'Guided yoga for body and breath', hi: 'शरीर व श्वास हेतु निर्देशित योग' } },
  { key: 'astrology', icon: '🔮', label: { en: 'Astrology', hi: 'एस्ट्रोलॉजी' }, desc: { en: 'Vedic jyotish guidance', hi: 'वैदिक ज्योतिष परामर्श' } },
  { key: 'pranic', icon: '✋', label: { en: 'Pranic Healing', hi: 'प्राणिक हीलिंग' }, desc: { en: 'Energy-based healing sessions', hi: 'ऊर्जा आधारित उपचार सत्र' } },
  { key: 'numerology', icon: '🔢', label: { en: 'Numerology', hi: 'अंक ज्योतिष' }, desc: { en: 'Insight through numbers', hi: 'अंकों के माध्यम से मार्गदर्शन' } },
  { key: 'vastu', icon: '🧭', label: { en: 'Vastu Shastra', hi: 'वास्तुशास्त्र' }, desc: { en: 'Harmony for home and workplace', hi: 'घर व कार्यस्थल हेतु वास्तु' } },
  { key: 'tarot', icon: '🃏', label: { en: 'Tarot Card Reading', hi: 'टैरो कार्ड रीडिंग' }, desc: { en: 'Reflective card readings', hi: 'कार्ड द्वारा चिंतन व मार्गदर्शन' } },
  { key: 'vedicpuja', icon: '🕉️', label: { en: 'Vedic Puja', hi: 'वैदिक पूजा' }, desc: { en: 'Pujas by learned acharyas', hi: 'विद्वान आचार्यों द्वारा पूजन' } },
  { key: 'meditation', icon: '🪷', label: { en: 'Meditation', hi: 'मैडिटेशन' }, desc: { en: 'Stillness and inner peace', hi: 'स्थिरता एवं आंतरिक शांति' } },
  { key: 'music', icon: '🎵', label: { en: 'Classical Music', hi: 'क्लासिकल म्यूजिक' }, desc: { en: 'Classical and devotional music', hi: 'शास्त्रीय एवं भक्ति संगीत' } },
  { key: 'counselling', icon: '💬', label: { en: 'Counselling Session', hi: 'काउंसलिंग सेसन' }, desc: { en: 'Personal and family guidance', hi: 'व्यक्तिगत व पारिवारिक परामर्श' } },
  { key: 'medical', icon: '⚕️', label: { en: 'Medical Helpline', hi: 'मेडिकल हेल्पलाइन' }, desc: { en: 'Health help when you need it', hi: 'आवश्यकता पर स्वास्थ्य सहायता' } },
];

// Closing "book a service" tile (completes a 12-tile grid).
export const servicesCta: Record<string, { title: string; sub: string; call: string; whatsapp: string }> = {
  en: { title: 'Book a service', sub: 'Speak with Acharya ji', call: 'Call', whatsapp: 'WhatsApp' },
  hi: { title: 'सेवा बुक करें', sub: 'आचार्य जी से संपर्क करें', call: 'कॉल करें', whatsapp: 'व्हाट्सएप' },
};

export function sField<T>(field: Record<string, T>, locale: string): T {
  return field[locale] ?? field.en;
}
