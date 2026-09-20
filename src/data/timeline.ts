// Civilization timeline of Sanatan Dharma / the Indian subcontinent.
// Each era carries an "evidence" note so claims are anchored to archaeology,
// texts or scholarship rather than assertion. Dates are scholarly ranges and
// are intentionally described as approximate.

export interface TimelineEra {
  id: string;
  period: string;
  title: Record<string, string>;
  summary: Record<string, string>;
  evidence: Record<string, string>;
}

export const timeline: TimelineEra[] = [
  {
    id: 'mehrgarh',
    period: 'c. 7000 BCE',
    title: {
      en: 'Neolithic roots — Mehrgarh',
      hi: 'नवपाषाण मूल — मेहरगढ़',
    },
    summary: {
      en: 'Settled farming villages appear in the northwest of the subcontinent, among the earliest in South Asia, laying cultural foundations.',
      hi: 'उपमहाद्वीप के उत्तर-पश्चिम में स्थायी कृषि गाँव उभरते हैं, जो दक्षिण एशिया के प्राचीनतम में से हैं और सांस्कृतिक नींव रखते हैं।',
    },
    evidence: {
      en: 'Archaeological excavations at Mehrgarh (Balochistan) — pottery, granaries and dentistry finds, dated by stratigraphy.',
      hi: 'मेहरगढ़ (बलूचिस्तान) में पुरातात्विक उत्खनन — मृद्भांड, अन्नागार और दंतचिकित्सा के प्रमाण, स्तरविज्ञान द्वारा तिथि-निर्धारित।',
    },
  },
  {
    id: 'indus',
    period: 'c. 3300–1300 BCE',
    title: {
      en: 'Indus–Sarasvati Civilization',
      hi: 'सिंधु–सरस्वती सभ्यता',
    },
    summary: {
      en: 'One of the world\'s great early urban civilizations — planned cities, standardized weights, water engineering and a still-undeciphered script.',
      hi: 'विश्व की महान आरंभिक नगरीय सभ्यताओं में एक — नियोजित नगर, मानकीकृत बाट, जल-अभियांत्रिकी और अब तक अपठित लिपि।',
    },
    evidence: {
      en: 'Excavated sites Harappa, Mohenjo-daro, Dholavira and Rakhigarhi; seals and the Great Bath, dated by radiocarbon and stratigraphy.',
      hi: 'उत्खनित स्थल हड़प्पा, मोहनजोदड़ो, धौलावीरा और राखीगढ़ी; मुद्राएँ और महास्नानागार, रेडियोकार्बन व स्तरविज्ञान से तिथि-निर्धारित।',
    },
  },
  {
    id: 'vedic',
    period: 'c. 1500–500 BCE',
    title: {
      en: 'Vedic Period',
      hi: 'वैदिक काल',
    },
    summary: {
      en: 'Composition and oral transmission of the Vedas. The hymns, rituals and early philosophy that form the bedrock of Sanatan thought take shape.',
      hi: 'वेदों की रचना और मौखिक परंपरा। स्तुतियाँ, यज्ञ और आरंभिक दर्शन आकार लेते हैं, जो सनातन विचार की आधारशिला हैं।',
    },
    evidence: {
      en: 'The Rigveda itself, preserved through rigorous oral recitation traditions; linguistic dating of Vedic Sanskrit by comparative philology.',
      hi: 'ऋग्वेद स्वयं, कठोर मौखिक पाठ-परंपरा से संरक्षित; तुलनात्मक भाषाविज्ञान द्वारा वैदिक संस्कृत का भाषिक तिथि-निर्धारण।',
    },
  },
  {
    id: 'upanishadic',
    period: 'c. 800–200 BCE',
    title: {
      en: 'Upanishadic & Epic Age',
      hi: 'औपनिषदिक व महाकाव्य युग',
    },
    summary: {
      en: 'The Upanishads turn inward to self and cosmos; the Ramayana and Mahabharata (with the Bhagavad Gita) shape ethics and story for millennia.',
      hi: 'उपनिषद आत्मा और ब्रह्मांड की ओर अंतर्मुख होते हैं; रामायण और महाभारत (भगवद्गीता सहित) सहस्राब्दियों तक नैतिकता और कथा को गढ़ते हैं।',
    },
    evidence: {
      en: 'Textual analysis of the principal Upanishads and epic recensions; cross-references in later commentarial literature.',
      hi: 'प्रमुख उपनिषदों और महाकाव्य पाठांतरों का विश्लेषण; परवर्ती भाष्य-साहित्य में संदर्भ।',
    },
  },
  {
    id: 'classical',
    period: 'c. 320 BCE–650 CE',
    title: {
      en: 'Classical Flourishing',
      hi: 'शास्त्रीय उत्कर्ष',
    },
    summary: {
      en: 'Maurya and Gupta ages: advances in mathematics (zero, decimals), astronomy, medicine, grammar and temple art across the subcontinent.',
      hi: 'मौर्य व गुप्त युग: गणित (शून्य, दशमलव), खगोल, चिकित्सा, व्याकरण और मंदिर-कला में प्रगति।',
    },
    evidence: {
      en: 'Ashokan edicts, Aryabhata\'s and Varahamihira\'s treatises, Gupta-era temples and inscriptions dated epigraphically.',
      hi: 'अशोक के शिलालेख, आर्यभट व वराहमिहिर के ग्रंथ, गुप्तकालीन मंदिर व अभिलेख, अभिलेखविज्ञान से तिथि-निर्धारित।',
    },
  },
  {
    id: 'living',
    period: '650 CE – present',
    title: {
      en: 'Bhakti to the Living Tradition',
      hi: 'भक्ति से जीवंत परंपरा तक',
    },
    summary: {
      en: 'Bhakti and devotional movements, great temple traditions, philosophy and reform — an unbroken, evolving practice carried into the present day.',
      hi: 'भक्ति और भक्ति आंदोलन, महान मंदिर परंपराएँ, दर्शन और सुधार — एक अखंड, विकसित होती परंपरा जो आज तक जीवित है।',
    },
    evidence: {
      en: 'Continuous manuscript traditions, standing temples, and living oral and ritual practice documented across regions.',
      hi: 'सतत पांडुलिपि परंपराएँ, विद्यमान मंदिर, तथा क्षेत्रों में प्रलेखित जीवंत मौखिक व अनुष्ठानिक अभ्यास।',
    },
  },
];

/** Localized getter with English fallback. */
export function tField(field: Record<string, string>, locale: string): string {
  return field[locale] ?? field.en;
}
