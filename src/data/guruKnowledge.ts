// Knowledge base for the "digital guru" assistant (Option A: static, no LLM).
//
// HOW TO EXTEND: add an entry to `knowledge` with matching `keywords` (lower
// case, any language) and an `answer` per locale (en/hi required; others fall
// back to en). The matcher scores a user query by keyword hits and returns the
// best entry. Keep answers short, warm and simple.

export interface KnowledgeEntry {
  id: string;
  /** lowercase keywords/phrases (en + hi + transliterations) that map here */
  keywords: string[];
  answer: Record<string, string>;
}

export const knowledge: KnowledgeEntry[] = [
  // ---- Trust: services ----
  {
    id: 'services',
    keywords: [
      'service', 'services', 'offer', 'provide', 'facilities', 'suvidha',
      'सेवा', 'सेवाएं', 'सुविधा', 'सुविधाएं', 'योग', 'yoga', 'astrology',
      'ज्योतिष', 'vastu', 'वास्तु', 'tarot', 'meditation', 'ध्यान', 'healing', 'puja', 'पूजा',
    ],
    answer: {
      en: 'The Sansthan offers: Yoga, Astrology, Pranic Healing, Numerology, Vastu Shastra, Tarot Card Reading, Vedic Puja, Meditation, Classical Music, Counselling Sessions, and a Medical Helpline. You can see them all in the "Special Services" section above.',
      hi: 'संस्थान द्वारा प्रदान की जाने वाली सेवाएँ: योग, ज्योतिष, प्राणिक हीलिंग, अंक ज्योतिष, वास्तुशास्त्र, टैरो कार्ड रीडिंग, वैदिक पूजा, ध्यान, शास्त्रीय संगीत, काउंसलिंग सेशन, और मेडिकल हेल्पलाइन। ऊपर "विशेष सुविधायें" अनुभाग में सभी देखें।',
    },
  },
  // ---- Trust: about / purpose ----
  {
    id: 'about',
    keywords: [
      'about', 'who are you', 'trust', 'sansthan', 'sanstha', 'organisation', 'organization',
      'purpose', 'mission', 'objective', 'aim', 'परिचय', 'संस्थान', 'न्यास', 'उद्देश्य', 'लक्ष्य', 'कौन',
    ],
    answer: {
      en: 'Vishwa Sanatan Sansthanam is a religious and cultural trust (registered in India, est. 29 Jan 2026), inspired by Adi Guru Shankaracharya and Swami Vivekananda. Its guiding maxim is "Yato Dharmastato Jayah". It works to spread Sanatan Dharma and social harmony worldwide. Full introduction and objectives are in the "About & Purpose" section.',
      hi: 'विश्व सनातन संस्थानम् एक धार्मिक व सांस्कृतिक न्यास है (भारत में पंजीकृत, स्थापना 29 जनवरी 2026), जो आदिगुरु शंकराचार्य एवं स्वामी विवेकानंद से प्रेरित है। इसका आधारसूत्र है "यतो धर्मस्ततो जयः"। यह सनातन धर्म और सामाजिक समरसता के प्रसार हेतु कार्यरत है। पूर्ण परिचय एवं उद्देश्य "परिचय एवं उद्देश्य" अनुभाग में हैं।',
    },
  },
  // ---- Trust: members ----
  {
    id: 'members',
    keywords: [
      'member', 'members', 'team', 'people', 'president', 'adhyaksh', 'padadhikari', 'office bearer',
      'सदस्य', 'पदाधिकारी', 'अध्यक्ष', 'टीम', 'लोग', 'कौन कौन',
    ],
    answer: {
      en: 'The Sansthan is guided by 20 office-bearers — including the founder-president Dr. Santosh Acharya, national in-charge Dr. Shankar Kumar Mishra, and others. See their photos and roles in the "Trust Members" section.',
      hi: 'संस्थान का मार्गदर्शन 20 पदाधिकारी करते हैं — जिनमें संस्थापक अध्यक्ष डॉ. संतोष आचार्य, राष्ट्रीय प्रभारी डॉ. शंकर कुमार मिश्र आदि सम्मिलित हैं। उनके चित्र और पद "न्यास सदस्य" अनुभाग में देखें।',
    },
  },
  // ---- Trust: events ----
  {
    id: 'events',
    keywords: [
      'event', 'events', 'program', 'programme', 'function', 'gathering', 'satsang', 'photos', 'gallery',
      'आयोजन', 'कार्यक्रम', 'सत्संग', 'तस्वीर', 'फोटो', 'गैलरी',
    ],
    answer: {
      en: 'The Sansthan holds gatherings, seva and celebrations across regions. You can see recent event photos in the "Sansthan Events" gallery, and upcoming festival dates in the hero panel at the top.',
      hi: 'संस्थान विभिन्न क्षेत्रों में सत्संग, सेवा और उत्सव आयोजित करता है। हाल के आयोजनों की तस्वीरें "संस्थान के आयोजन" गैलरी में और आगामी त्योहारों की तिथियाँ ऊपर हीरो पैनल में देख सकते हैं।',
    },
  },
  // ---- Trust: contact ----
  {
    id: 'contact',
    keywords: [
      'contact', 'phone', 'call', 'number', 'email', 'reach', 'address', 'whatsapp', 'website',
      'संपर्क', 'फोन', 'नंबर', 'ईमेल', 'पता', 'व्हाट्सएप', 'वेबसाइट',
    ],
    answer: {
      en: 'You can reach Vishwa Sanatan Sansthanam by phone/WhatsApp at +91 7388735905, by email at vishwasanatansansthanam@gmail.com, or via www.vssn.org.in. Full details are in the footer below.',
      hi: 'विश्व सनातन संस्थानम् से संपर्क: फोन/व्हाट्सएप +91 7388735905, ईमेल vishwasanatansansthanam@gmail.com, या www.vssn.org.in पर। पूरी जानकारी नीचे फुटर में है।',
    },
  },

  // ---- Sanatan concepts (simple explanations) ----
  {
    id: 'moksha',
    keywords: ['moksha', 'liberation', 'mukti', 'salvation', 'मोक्ष', 'मुक्ति'],
    answer: {
      en: 'Moksha means liberation — freedom from the endless cycle of birth and death. In the simplest sense: realising your true, boundless self and becoming one with the infinite. It is considered the highest goal of life.',
      hi: 'मोक्ष का अर्थ है मुक्ति — जन्म-मृत्यु के अनंत चक्र से स्वतंत्रता। सरल शब्दों में: अपने सच्चे, असीम स्वरूप का बोध और अनंत से एकाकार हो जाना। इसे जीवन का परम लक्ष्य माना गया है।',
    },
  },
  {
    id: 'karma',
    keywords: ['karma', 'action', 'कर्म', 'कर्मा', 'karm'],
    answer: {
      en: 'Karma is the law of cause and effect: every action and intention shapes your future experience. Simply put — good deeds sow good outcomes, and we are responsible for our own becoming. It is not blind fate, but responsibility.',
      hi: 'कर्म कारण और प्रभाव का नियम है: हर कार्य और भाव भविष्य के अनुभव को गढ़ता है। सरल शब्दों में — अच्छे कर्म अच्छे फल बोते हैं, और हम अपने भविष्य के लिए स्वयं उत्तरदायी हैं। यह अंधा भाग्य नहीं, उत्तरदायित्व है।',
    },
  },
  {
    id: 'dharma',
    keywords: ['dharma', 'duty', 'righteousness', 'धर्म', 'कर्तव्य'],
    answer: {
      en: 'Dharma is right living — your duty, ethics, and the natural order that upholds life. It depends on your role and situation, but always points toward truth, harmony and doing what is right.',
      hi: 'धर्म का अर्थ है सम्यक जीवन — आपका कर्तव्य, नैतिकता, और वह प्राकृतिक व्यवस्था जो जीवन को धारण करती है। यह भूमिका और परिस्थिति पर निर्भर करता है, पर सदैव सत्य, समरसता और उचित कर्म की ओर उन्मुख।',
    },
  },
  {
    id: 'yoga',
    keywords: ['yoga', 'union', 'योग', 'yog'],
    answer: {
      en: 'Yoga means union — of body, mind and spirit. Far beyond exercise, it is a set of paths (knowledge, devotion, action, meditation) that quiet the mind and reveal the true self.',
      hi: 'योग का अर्थ है मिलन — तन, मन और आत्मा का। यह केवल व्यायाम नहीं, बल्कि मार्गों का समूह है (ज्ञान, भक्ति, कर्म, ध्यान) जो मन को शांत कर सच्चे स्वरूप को प्रकट करते हैं।',
    },
  },
  {
    id: 'atman',
    keywords: ['atman', 'atma', 'soul', 'self', 'आत्मा', 'आत्मन'],
    answer: {
      en: 'Atman is the innermost self — the changeless awareness within you, beyond body and mind. The Upanishads reveal that this inner self is, in truth, one with Brahman, the infinite reality.',
      hi: 'आत्मन् अंतरतम स्वरूप है — शरीर और मन से परे, आपके भीतर की अपरिवर्तनीय चेतना। उपनिषद कहते हैं कि यह अंतरात्मा वस्तुतः ब्रह्म, अर्थात् अनंत सत्य के साथ एक है।',
    },
  },
  {
    id: 'brahman',
    keywords: ['brahman', 'infinite', 'absolute', 'ब्रह्म', 'ब्रह्मन'],
    answer: {
      en: 'Brahman is the infinite, formless reality that underlies everything — the one source from which all arises. The great insight of Vedanta is that your inner self (Atman) and Brahman are ultimately one.',
      hi: 'ब्रह्म वह अनंत, निराकार सत्य है जो सबके मूल में है — वह एक स्रोत जिससे सब उत्पन्न होता है। वेदांत की महान अंतर्दृष्टि यह है कि आपकी अंतरात्मा (आत्मन्) और ब्रह्म अंततः एक ही हैं।',
    },
  },
  {
    id: 'vedas',
    keywords: ['veda', 'vedas', 'scripture', 'rigveda', 'वेद', 'शास्त्र', 'ऋग्वेद'],
    answer: {
      en: 'The Vedas — Rig, Yajur, Sama and Atharva — are among humanity\'s oldest scriptures, preserved orally for thousands of years. They hold hymns, philosophy and the roots of Sanatan Dharma.',
      hi: 'वेद — ऋग्, यजुर्, साम और अथर्व — मानवता के प्राचीनतम शास्त्रों में हैं, जो सहस्राब्दियों तक मौखिक रूप से संरक्षित रहे। इनमें स्तुतियाँ, दर्शन और सनातन धर्म की जड़ें हैं।',
    },
  },
  {
    id: 'sanatan',
    keywords: ['sanatan', 'sanatana', 'hindu', 'hinduism', 'dharma meaning', 'सनातन', 'हिंदू', 'हिन्दू'],
    answer: {
      en: 'Sanatan Dharma means the "eternal way" — the timeless spiritual tradition often called Hinduism. It is less a set of rules and more a way of seeing self, life and cosmos, centred on truth (satya), duty (dharma) and harmony.',
      hi: 'सनातन धर्म का अर्थ है "शाश्वत मार्ग" — वह कालातीत आध्यात्मिक परंपरा जिसे प्रायः हिंदू धर्म कहा जाता है। यह नियमों का समूह कम, और स्वयं, जीवन व ब्रह्मांड को देखने की दृष्टि अधिक है — सत्य, धर्म और समरसता पर केंद्रित।',
    },
  },
];

// Words that signal abuse/offensive intent → the guru simply chants Om.
export const abuseKeywords: string[] = [
  'fuck', 'fuk', 'shit', 'bitch', 'bastard', 'asshole', 'idiot', 'stupid', 'hate you',
  'sex', 'porn', 'nude', 'kill', 'die', 'abuse', 'mc', 'bc', 'bhosdi', 'madarchod',
  'behenchod', 'chutiya', 'gaali', 'गाली', 'मादरचोद', 'भोसड़ी', 'चूतिया',
];

// Topical anchor words — if a query contains NONE of these (and matches no
// entry), it is treated as out-of-scope rather than routed to the trust.
export const scopeKeywords: string[] = [
  'sanatan', 'dharma', 'dharm', 'hindu', 'trust', 'sansthan', 'vssn', 'vishwa',
  'moksha', 'karma', 'yoga', 'veda', 'atman', 'brahman', 'puja', 'seva', 'guru',
  'service', 'member', 'event', 'contact', 'donate', 'daan', 'temple', 'mandir',
  'festival', 'ekadashi', 'purnima', 'shankaracharya', 'vivekananda', 'om', 'mantra',
  'सनातन', 'धर्म', 'हिंदू', 'हिन्दू', 'न्यास', 'संस्थान', 'मोक्ष', 'कर्म', 'योग',
  'वेद', 'आत्मा', 'ब्रह्म', 'पूजा', 'सेवा', 'गुरु', 'सेवाएं', 'सदस्य', 'आयोजन',
  'संपर्क', 'दान', 'मंदिर', 'त्योहार', 'मंत्र',
];

/** Localized field getter with English fallback. */
export function gField(field: Record<string, string>, locale: string): string {
  return field[locale] ?? field.en;
}
