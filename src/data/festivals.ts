// Festivals and sacred tithis (lunar days) with meanings sourced to
// authentic scripture. Each entry cites the primary textual source so the
// hover tooltip carries a verifiable reference rather than folklore.
//
// NOTE on dates: Hindu festivals follow the lunisolar Panchang, so Gregorian
// dates shift each year. `nextDate` values below are illustrative placeholders
// for the current cycle and should be refreshed yearly from a Panchang source.
// Recurring tithis (Ekadashi, Poornima, Amavasya, Pradosh) are marked recurring.

export interface Festival {
  id: string;
  glyph: string;
  recurring?: boolean;
  /** ISO date (YYYY-MM-DD) of the next occurrence, or null for recurring tithis. */
  nextDate: string | null;
  name: Record<string, string>;
  meaning: Record<string, string>;
  /** Authentic scriptural / textual source for the meaning. */
  source: Record<string, string>;
}

export const festivals: Festival[] = [
  {
    id: 'ekadashi',
    glyph: '☽',
    recurring: true,
    nextDate: null,
    name: { en: 'Ekadashi', hi: 'एकादशी' },
    meaning: {
      en: 'The eleventh lunar day of each fortnight, observed as a fast dedicated to Vishnu. It is held to purify the mind and body and to loosen the bonds of past karma.',
      hi: 'प्रत्येक पक्ष की ग्यारहवीं तिथि, भगवान विष्णु को समर्पित व्रत के रूप में मनाई जाती है। इसे मन-शरीर की शुद्धि और पूर्व कर्मों के बंधन शिथिल करने वाला माना जाता है।',
    },
    source: {
      en: 'Padma Purana — the origin of Ekadashi Devi, who manifested from Vishnu; also praised in the Bhavishya and Skanda Puranas.',
      hi: 'पद्म पुराण — एकादशी देवी की उत्पत्ति, जो विष्णु से प्रकट हुईं; भविष्य व स्कंद पुराण में भी महिमा वर्णित।',
    },
  },
  {
    id: 'poornima',
    glyph: '🌕',
    recurring: true,
    nextDate: null,
    name: { en: 'Poornima', hi: 'पूर्णिमा' },
    meaning: {
      en: 'The full-moon day, considered highly auspicious for worship, charity and vows. Several major observances (Guru Purnima, Kartik Purnima) fall on this tithi.',
      hi: 'पूर्ण चंद्र का दिन, पूजा, दान और व्रत के लिए अत्यंत शुभ माना जाता है। गुरु पूर्णिमा, कार्तिक पूर्णिमा जैसे अनेक पर्व इसी तिथि पर आते हैं।',
    },
    source: {
      en: 'Skanda Purana and Puranic vrata literature, which detail the merits of full-moon observances.',
      hi: 'स्कंद पुराण और पौराणिक व्रत-साहित्य, जिनमें पूर्णिमा व्रतों का माहात्म्य वर्णित है।',
    },
  },
  {
    id: 'amavasya',
    glyph: '🌑',
    recurring: true,
    nextDate: null,
    name: { en: 'Amavasya', hi: 'अमावस्या' },
    meaning: {
      en: 'The new-moon day, traditionally devoted to remembering ancestors (pitru) through tarpana and to inner reflection.',
      hi: 'अमावस्या का दिन, परंपरागत रूप से तर्पण द्वारा पितरों के स्मरण और आत्मचिंतन को समर्पित।',
    },
    source: {
      en: 'Garuda Purana and Dharmashastra texts on pitru-karya (ancestral rites).',
      hi: 'गरुड़ पुराण और पितृ-कार्य पर धर्मशास्त्र ग्रंथ।',
    },
  },
  {
    id: 'diwali',
    glyph: '🪔',
    nextDate: '2026-11-08',
    name: { en: 'Diwali (Deepavali)', hi: 'दीपावली' },
    meaning: {
      en: 'The festival of lights, celebrating the triumph of light over darkness and knowledge over ignorance; associated with Lakshmi and, in many regions, Rama\'s return to Ayodhya.',
      hi: 'दीपों का पर्व, अंधकार पर प्रकाश और अज्ञान पर ज्ञान की विजय का उत्सव; लक्ष्मी और अनेक क्षेत्रों में श्रीराम के अयोध्या-आगमन से संबद्ध।',
    },
    source: {
      en: 'Ramayana (Valmiki) for Rama\'s return; Puranic and Dharmashastra sources for Lakshmi-puja.',
      hi: 'श्रीराम के आगमन हेतु वाल्मीकि रामायण; लक्ष्मी-पूजा हेतु पौराणिक व धर्मशास्त्र स्रोत।',
    },
  },
  {
    id: 'dussehra',
    glyph: '🏹',
    nextDate: '2026-10-20',
    name: { en: 'Dussehra (Vijayadashami)', hi: 'दशहरा (विजयादशमी)' },
    meaning: {
      en: 'The tenth day marking the victory of Rama over Ravana, and of Durga over Mahishasura — the triumph of righteousness over evil.',
      hi: 'दसवाँ दिन, रावण पर श्रीराम और महिषासुर पर दुर्गा की विजय — असत्य पर धर्म की जीत।',
    },
    source: {
      en: 'Ramayana (Valmiki) and the Devi Mahatmya (Markandeya Purana).',
      hi: 'वाल्मीकि रामायण और देवी माहात्म्य (मार्कण्डेय पुराण)।',
    },
  },
  {
    id: 'holi',
    glyph: '🎨',
    nextDate: '2027-03-22',
    name: { en: 'Holi', hi: 'होली' },
    meaning: {
      en: 'The festival of colours and spring, marking the victory of devotion (Prahlada) over arrogance and the burning away of negativity (Holika Dahan).',
      hi: 'रंगों और वसंत का पर्व, अहंकार पर भक्ति (प्रह्लाद) की विजय और नकारात्मकता के दहन (होलिका दहन) का प्रतीक।',
    },
    source: {
      en: 'Bhagavata Purana and Vishnu Purana — the story of Prahlada and Holika.',
      hi: 'भागवत पुराण और विष्णु पुराण — प्रह्लाद और होलिका की कथा।',
    },
  },
  {
    id: 'navratri',
    glyph: '🔱',
    nextDate: '2026-10-11',
    name: { en: 'Navratri', hi: 'नवरात्रि' },
    meaning: {
      en: 'Nine nights honouring the Divine Mother in her nine forms, celebrating the victory of Durga over the buffalo-demon Mahishasura.',
      hi: 'देवी माँ के नौ रूपों की आराधना की नौ रातें, महिषासुर पर दुर्गा की विजय का उत्सव।',
    },
    source: {
      en: 'Devi Mahatmya (Durga Saptashati), within the Markandeya Purana.',
      hi: 'देवी माहात्म्य (दुर्गा सप्तशती), मार्कण्डेय पुराण के अंतर्गत।',
    },
  },
  {
    id: 'janmashtami',
    glyph: '🦚',
    nextDate: '2027-08-25',
    name: { en: 'Krishna Janmashtami', hi: 'कृष्ण जन्माष्टमी' },
    meaning: {
      en: 'The birth of Sri Krishna, avatar of Vishnu, celebrated at midnight with fasting, devotion and remembrance of his teachings.',
      hi: 'विष्णु के अवतार श्रीकृष्ण का जन्म, मध्यरात्रि को उपवास, भक्ति और उनकी शिक्षाओं के स्मरण के साथ मनाया जाता है।',
    },
    source: {
      en: 'Bhagavata Purana (Canto 10) and the Mahabharata / Bhagavad Gita for his teachings.',
      hi: 'भागवत पुराण (दशम स्कंध) और उनकी शिक्षाओं हेतु महाभारत / भगवद्गीता।',
    },
  },
  {
    id: 'mahashivratri',
    glyph: '🔱',
    nextDate: '2027-03-06',
    name: { en: 'Maha Shivratri', hi: 'महाशिवरात्रि' },
    meaning: {
      en: 'The great night of Shiva, observed with night-long vigil, fasting and meditation, marking auspicious remembrance of the auspicious one.',
      hi: 'शिव की महान रात्रि, रात्रि-जागरण, उपवास और ध्यान के साथ मनाई जाती है।',
    },
    source: {
      en: 'Shiva Purana and Skanda Purana, which describe the merits of the Shivratri vrata.',
      hi: 'शिव पुराण और स्कंद पुराण, जिनमें शिवरात्रि व्रत का माहात्म्य वर्णित है।',
    },
  },
  {
    id: 'ganesh',
    glyph: '🐘',
    nextDate: '2027-09-04',
    name: { en: 'Ganesh Chaturthi', hi: 'गणेश चतुर्थी' },
    meaning: {
      en: 'The birth of Ganesha, remover of obstacles, welcomed with clay idols, devotion and joyful processions.',
      hi: 'विघ्नहर्ता गणेश का जन्मोत्सव, मिट्टी की प्रतिमाओं, भक्ति और उल्लासमय शोभायात्राओं के साथ मनाया जाता है।',
    },
    source: {
      en: 'Ganesha Purana and Skanda Purana.',
      hi: 'गणेश पुराण और स्कंद पुराण।',
    },
  },
  {
    id: 'gurupurnima',
    glyph: '📿',
    nextDate: '2027-07-18',
    name: { en: 'Guru Purnima', hi: 'गुरु पूर्णिमा' },
    meaning: {
      en: 'A full-moon day of gratitude to the guru and to Veda Vyasa, who compiled the Vedas and the Mahabharata.',
      hi: 'गुरु और वेदव्यास के प्रति कृतज्ञता की पूर्णिमा, जिन्होंने वेदों और महाभारत का संकलन किया।',
    },
    source: {
      en: 'Puranic tradition honouring Veda Vyasa (Vyasa Purnima).',
      hi: 'वेदव्यास को समर्पित पौराणिक परंपरा (व्यास पूर्णिमा)।',
    },
  },
];

/** Localized field getter with English fallback. */
export function fField(field: Record<string, string>, locale: string): string {
  return field[locale] ?? field.en;
}
