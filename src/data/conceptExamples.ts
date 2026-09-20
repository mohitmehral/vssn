// One-line, relatable real-life example per concept. Kept intentionally short.
// Localized with English fallback (like timeline/festivals).

export const conceptExamples: Record<string, Record<string, string>> = {
  vedas: {
    en: 'Like a recipe passed down by heart for generations — remembered, then written.',
    hi: 'पीढ़ियों से कंठस्थ किसी नुस्खे की तरह — पहले स्मृति में, फिर लिखित।',
  },
  karma: {
    en: 'Plant a mango seed, get mangoes — every choice sows tomorrow.',
    hi: 'आम बोओगे तो आम मिलेंगे — हर चुनाव कल का बीज है।',
  },
  dharma: {
    en: 'A doctor heals, a teacher guides — right action fits the role you hold.',
    hi: 'वैद्य उपचार करे, शिक्षक मार्ग दिखाए — कर्तव्य भूमिका के अनुसार।',
  },
  atman: {
    en: 'Like a lamp flame — unchanged even as the wick and wax burn away.',
    hi: 'दीप की लौ की तरह — बाती और मोम क्षीण हों, फिर भी अपरिवर्तित।',
  },
  yoga: {
    en: 'Like tuning a scattered mind the way you steady your breath before a big moment.',
    hi: 'बड़े क्षण से पहले साँस साधने की तरह — बिखरे मन को एकाग्र करना।',
  },
  moksha: {
    en: 'Like a bird leaving an open cage — free, and finally at home in the sky.',
    hi: 'खुले पिंजरे से उड़ते पक्षी की तरह — मुक्त, और आकाश में स्वगृह।',
  },
};

export function exField(key: string, locale: string): string | undefined {
  const f = conceptExamples[key];
  if (!f) return undefined;
  return f[locale] ?? f.en;
}
