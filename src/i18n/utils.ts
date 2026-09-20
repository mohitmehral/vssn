import { en, type UISchema } from './ui/en';
import { hi } from './ui/hi';
import { zh } from './ui/zh';
import { es } from './ui/es';
import { ar } from './ui/ar';
import { bn } from './ui/bn';
import { pt } from './ui/pt';
import { ru } from './ui/ru';
import { fr } from './ui/fr';
import { ja } from './ui/ja';
import { defaultLocale, isLocale, type Locale } from './config';

export const dictionaries: Record<Locale, UISchema> = {
  en,
  hi,
  zh,
  es,
  ar,
  bn,
  pt,
  ru,
  fr,
  ja,
};

/** Returns the full UI dictionary for a locale, falling back to English. */
export function getDict(locale: Locale): UISchema {
  return dictionaries[locale] ?? en;
}

/** Extract the locale from an Astro URL pathname. */
export function getLocaleFromUrl(url: URL): Locale {
  const [, maybeLocale] = url.pathname.split('/').filter(Boolean).length
    ? [null, url.pathname.replace(/^\/+/, '').split('/')[0]]
    : [null, ''];
  return isLocale(maybeLocale) ? maybeLocale : defaultLocale;
}

/**
 * Build a locale-aware path. Astro's `base` is applied separately by the
 * consumer via import.meta.env.BASE_URL, so this returns a path relative to base.
 */
export function localizedPath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+/, '');
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}
