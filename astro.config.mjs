import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// The 10 supported languages. Hindi is the default/primary; English next.
const locales = ['hi', 'en', 'zh', 'es', 'ar', 'bn', 'pt', 'ru', 'fr', 'ja'];

// Right-to-left languages
const rtlLocales = ['ar'];

// GitHub Pages project site: https://<user>.github.io/vssn
// Override SITE and BASE via env at build time if using a custom domain.
const SITE = process.env.SITE_URL || 'https://mohitmehral.github.io';
const BASE = process.env.BASE_PATH ?? '/vssn';

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
