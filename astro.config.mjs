import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// The 10 supported languages. Hindi is the default/primary; English next.
const locales = ['hi', 'en', 'zh', 'es', 'ar', 'bn', 'pt', 'ru', 'fr', 'ja'];

// Right-to-left languages
const rtlLocales = ['ar'];

// Served on a custom domain at the ROOT (base '/'). Current domain:
// vssn.apnok.com. To switch to a future domain (e.g. www.vssn.org.in), just
// change SITE below (and public/CNAME + the DNS record). Base stays '/'.
// Both can still be overridden via env at build time.
const SITE = process.env.SITE_URL || 'https://vssn.apnok.com';
const BASE = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  i18n: {
    defaultLocale: 'hi',
    locales,
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});

export { locales, rtlLocales };
