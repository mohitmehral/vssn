// Central i18n configuration for the Sanatan Dharma site.

export const locales = [
  'en',
  'hi',
  'zh',
  'es',
  'ar',
  'bn',
  'pt',
  'ru',
  'fr',
  'ja',
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const rtlLocales: Locale[] = ['ar'];

// Metadata for each language: native name, English name, flag, text direction, font class.
export const localeMeta: Record<
  Locale,
  { native: string; english: string; flag: string; dir: 'ltr' | 'rtl'; font: string }
> = {
  en: { native: 'English', english: 'English', flag: '🇬🇧', dir: 'ltr', font: 'font-sans' },
  hi: { native: 'हिन्दी', english: 'Hindi', flag: '🇮🇳', dir: 'ltr', font: 'font-deva' },
  zh: { native: '中文', english: 'Chinese', flag: '🇨🇳', dir: 'ltr', font: 'font-sans' },
  es: { native: 'Español', english: 'Spanish', flag: '🇪🇸', dir: 'ltr', font: 'font-sans' },
  ar: { native: 'العربية', english: 'Arabic', flag: '🇸🇦', dir: 'rtl', font: 'font-sans' },
  bn: { native: 'বাংলা', english: 'Bengali', flag: '🇧🇩', dir: 'ltr', font: 'font-sans' },
  pt: { native: 'Português', english: 'Portuguese', flag: '🇵🇹', dir: 'ltr', font: 'font-sans' },
  ru: { native: 'Русский', english: 'Russian', flag: '🇷🇺', dir: 'ltr', font: 'font-sans' },
  fr: { native: 'Français', english: 'French', flag: '🇫🇷', dir: 'ltr', font: 'font-sans' },
  ja: { native: '日本語', english: 'Japanese', flag: '🇯🇵', dir: 'ltr', font: 'font-sans' },
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function getDir(locale: Locale): 'ltr' | 'rtl' {
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
}
