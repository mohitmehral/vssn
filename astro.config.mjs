import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// The 10 supported languages. Hindi is the default/primary; English next.
const locales = ['hi', 'en', 'zh', 'es', 'ar', 'bn', 'pt', 'ru', 'fr', 'ja'];

// Right-to-left languages
const rtlLocales = ['ar'];

// Served on a custom domain at the ROOT (base '/'). Main domain:
// www.vishwasanatansansthanam.org (vssn.org.in + vssn.apnok.com 301-redirect
// to it via GoDaddy forwarding). To change it, update SITE here, SITE_URL in
// deploy.yml, public/CNAME, robots.txt and the GitHub Pages custom domain.
// Both can still be overridden via env at build time.
const SITE = process.env.SITE_URL || 'https://www.vishwasanatansansthanam.org';
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
