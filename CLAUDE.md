# CLAUDE.md — Project context for Sanatan Dharma website

This file gives an AI assistant (or any new contributor) the context needed to
work on this project effectively. Keep it updated as the project evolves.

## Design system: "Living Manuscript"

The site went through one redesign already (v1 was a dark indigo/gold/mandala
theme that read as astrology-adjacent — explicitly rejected). The current
direction:

- **Palette** (`tailwind.config.mjs`): `paper` (warm ivory background, several
  shades), `ink` (near-black warm text, 3 shades), `accent` (a single deep
  rubrication red, `#a13d27` family — the color of manuscript scribe ink, not
  gold/saffron), `study` (deep indigo, used _sparingly_ for structure only).
  **No gold, no shimmer, no dark purple-night gradient, no spinning imagery.**
- **Typography:** Fraunces (editorial serif, display/headings) + Inter (clean
  sans, body). Loaded in `Layout.astro`.
- **The ॐ mark:** appears once in the hero as a static, line-drawn SVG
  (`InkMark` in `Hero.tsx`) that draws in on load and never spins — a quiet
  mark of respect, not a decorative wheel. Also appears small/static in
  `Nav.astro` and `Footer.astro`. Do not reintroduce rotation/glow on it.
- **Concept animations are bespoke, not decorative.** Each of the 6 concepts
  in `src/components/react/concepts/ConceptVisuals.tsx` has a purpose-built
  SVG + Framer Motion animation that *demonstrates* the idea:
  - Vedas → sound rings from a point become a drawn, permanent line (oral → text)
  - Karma → an action travels out, then a return arc curves back to source
  - Dharma → an off-balance beam self-corrects to level
  - Atman/Brahman → a small point is revealed to sit inside one larger circle
  - Yoga → three separate strands weave into a single line
  - Moksha → a bound loop dissolves and releases into open points
  These run once on scroll-into-view (`useInView`) and are keyed by the
  concept's `key` in `src/i18n/ui/en.ts` (`vedas`, `karma`, `dharma`, `atman`,
  `yoga`, `moksha`) via the `conceptVisuals` map. If you add a 7th concept,
  add both the i18n entry AND a matching visual, or it silently renders blank.
- **Hero layout:** two columns. Left = eyebrow / title / subtitle / lead / CTAs.
  Right = `HeroEventsPanel.tsx` — a compact, auto-cycling card (festival +
  latest trust-photo slides interleaved, dot navigation, pauses on hover).
  This is the "quick summary" of festivals/events; the full festival grid and
  photo marquee still exist further down the page (`Events.tsx`, `#events`
  section) for anyone who wants to go deeper — the panel doesn't replace it.

## What this is

A modern, animated, multilingual awareness website about **Sanatan Dharma** —
its civilization, scriptures, and living concepts — designed for an educated,
curious audience. The aesthetic is a deliberate **modern + ancient fusion**
(deep indigo night sky, gold shimmer, parchment, mandala/sacred geometry).

- **Brand name:** "Sanatan Dharma" (NOT "Sanatan Dham"). In each language use
  the native form: सनातन धर्म (hi), সনাতন ধর্ম (bn), Санатан Дхарма (ru),
  سناتان دهارما (ar), 萨那坦达摩 (zh), サナータナ・ダルマ (ja), "Sanatan Dharma"
  (en/es/fr/pt).
- **Deploy target:** GitHub Pages **project site** at
  `https://mohitmehral.github.io/sanatan/` (repo name: `sanatan`, base `/sanatan`).

## Tech stack

- **Astro 4** (static output) — `astro.config.mjs`
- **React islands** for interactivity (`client:load` / `client:visible`)
- **Framer Motion** for animation (GSAP is installed and available if needed)
- **Tailwind CSS** with a custom theme — `tailwind.config.mjs`
- **@astrojs/sitemap PINNED to 3.2.1** — do NOT bump. 3.7.x breaks on Astro
  4.16's `astro:build:done` hook (`_routes.reduce` of undefined).
- **i18n:** Astro's built-in i18n routing, `prefixDefaultLocale: true`.

## Commands

```bash
npm install
npm run dev      # http://localhost:4321/sanatan  (runs sync-events first)
npm run build    # prebuild sync-events -> astro build into dist/
npm run preview  # preview production build
```

## Project structure

```
astro.config.mjs         # i18n locales, base=/sanatan, site, sitemap
tailwind.config.mjs      # sacred palette + keyframe animations
scripts/
  sync-events.mjs        # prebuild: copies docs/events/* -> public/events/
  gen-placeholders.mjs   # generates 3 sample event PNGs (delete when real ones added)
docs/events/             # SOURCE OF TRUTH for trust-event photos (see below)
public/                  # favicon.svg, og-default.svg, robots.txt, .nojekyll
                         # public/events/ is generated + gitignored
src/
  i18n/
    config.ts            # locales[], localeMeta, getDir, isLocale
    utils.ts             # getDict(), localizedPath(), dictionaries map
    ui/<locale>.ts       # UI dictionaries; en.ts defines UISchema (type source)
  data/
    timeline.ts          # civilization eras w/ cited evidence (en/hi + fallback)
    festivals.ts         # festivals/tithis w/ meaning + scriptural source
    trustEvents.ts       # reads docs/events/ via fs, sorts newest-first
  components/
    SEO.astro            # title/desc/keywords, canonical, hreflang, OG, JSON-LD
    Layout.astro         # html shell, fonts, dir=rtl for ar, Nav + Footer
    Nav.astro            # logo, anchor links, LanguageSwitcher island
    Footer.astro
    react/
      Hero.tsx           # rotating SVG mandala + particle motes (VFX)
      Concepts.tsx       # scroll-reveal concept cards
      Timeline.tsx       # animated vertical timeline
      Events.tsx         # tabs: festival tiles (hover tooltip) + TrustMarquee
      LanguageSwitcher.tsx
  pages/
    index.astro          # root: browser-language redirect to /<locale>
    [locale]/index.astro # single-page site per locale (getStaticPaths x10)
    404.astro
.github/workflows/deploy.yml  # build + deploy to GitHub Pages
```

## The 10 languages

`en` (default), `hi` (primary), `zh`, `es`, `ar` (RTL), `bn`, `pt`, `ru`, `fr`, `ja`.
Defined in BOTH `src/i18n/config.ts` and `astro.config.mjs` — keep in sync.

- UI strings: `src/i18n/ui/<locale>.ts`. `en.ts` is the schema; TypeScript
  enforces every locale implements every key. Missing → type error.
- Long-form content (timeline, festivals): `{ en: '...', hi: '...' }` maps in
  `src/data/*.ts`, with English fallback via `tField` / `fField`.

## The Trust: Vishwa Sanatan Sansthanam (VSS)

This is **first and foremost the website of the trust "Vishwa Sanatan
Sansthanam"**, and only secondarily a general Dharma info site. Trust identity
and events take priority in the layout.

- **Emblem/logo:** `public/static/vss-logo.svg` — a recreated (not photographic)
  version of the VSS emblem: laurel wreath, dark ring bearing "विश्व सनातन
  संस्थानम्" (top) and "VISHWA SANATANA SANSTHANAM" (bottom), ॐ + 卐 flanking a
  radiant sun with a saffron flag. Used via `src/components/VssLogo.astro`.
  **To use the real logo instead:** drop `vss-logo.png` (transparent bg) into
  `public/static/` and change `LOGO_FILE` in `VssLogo.astro` to `'vss-logo.png'`.
- **Tagline (from the official poster):** "सामाजिक समरसता ही सनातन की पहचान है" —
  in English strings, "Social harmony is the true identity of Sanatan."
- **Five values** (from the poster): Dharma, Sanskar, Harmony (Samarasta),
  Seva, Nation-building — rendered as chips in the About section's trust band.
- **i18n:** all of the above lives under the `trust` key in every
  `src/i18n/ui/<locale>.ts`. The org name stays transliterated
  ("Vishwa Sanatan Sansthanam") in Latin-script languages.
- Where trust shows up: the nav logo, the hero "Living Calendar" panel header
  + top carousel, the Events section (defaults to the trust tab, listed first),
  and the About trust band.

## Hero "Living Calendar" panel (`HeroEventsPanel.tsx`)

Enlarged to balance the hero copy. Two zones:
- **TOP:** branded header (VSS logo + name + tagline) then an auto-rotating
  carousel of trust-event photos (newest first), dot navigation, pause on hover.
- **BOTTOM:** a compact list of upcoming festivals — name + date + short
  meaning, **deliberately without the scriptural source** (source still shows
  in the full Events section's festival cards).

## Concepts section ("shape a lifetime")

Redesigned away from Lottie (the animations were removed — they didn't relate
to the cards and were heavy). Now a **warm-palette icon card grid**:

- **Warm section palette** (only this section): saffron/orange (#e07a1f, #b3471f,
  #c25a24), deep maroon (#5a1d10, #7a2718), cream (#fbf3e2, #fdf6e7), soft gold
  (#d9a441). Hard-coded hex in `Concepts.tsx`/`ConceptIcons.tsx` and the section
  wrapper gradient, intentionally distinct from the site's ivory/ink theme.
- **Relevant SVG icons** per concept in `concepts/ConceptIcons.tsx` (`conceptIcons`
  map): vedas=open book, karma=balance scales, dharma=path/road, atman=lamp
  flame, brahman=ocean+sky+sun, yoga=seated meditation, moksha=bird+sky. Icons
  do a gentle stroke-draw on scroll-into-view.
- **Content unchanged** (title/short/body from `t.concepts.items`) — kept short
  per the user. Plus a **one-line real-life example** per concept from
  `src/data/conceptExamples.ts` (en/hi + English fallback), labeled by
  `t.concepts.exampleLabel` ("In real life").
- Lottie is fully removed: no `lottie-web`/`lottie-react` deps, no
  `public/lottie/`, no `scripts/gen-lottie.mjs`. The concepts JS chunk is tiny
  again (~2 KB gzip). Don't reintroduce Lottie unless truly needed.
- Note: the `atman` card uses the flame icon; a separate `brahman` icon exists
  in the map for when/if Atman & Brahman are split into two cards.

## Trust gallery (`TrustGallery.tsx`, `#events` section)

The old tabbed "Living Calendar — Festivals & sacred dates" section (Events.tsx)
was removed. The **festival/tithi grid is gone** (that info now lives in the
Panchang calendar + the hero panel). What remains at `#events` is
`TrustGallery.tsx`: just the auto-scrolling Vishwa Sanatan Sansthanam
event-photo marquee (pause on hover), titled with `t.trust.eventsHeading`, fed
all photos via `trustGalleryItems`. `Events.tsx` is deleted — don't reference it.

## Panchang calendar (`PanchangCalendar.tsx`, `#panchang` section)

Designed to fit within **one screen (no scroll)** and look like a real
traditional panchang with modern polish — a framed "plate":
- Ornate top band (accent gradient) with "॥ पञ्चाङ्ग ॥" and prev/next controls.
- Two columns: an **info rail** (moon-phase dial, month + Vikram Samvat [Gregorian
  year + 57] + paksha [shukla/krishna], the month's festival list, legend) and
  a **compact month grid** (aspect-square cells, festival glyphs + tithi dots,
  today ring).
- Tithi dots (Ekadashi/Purnima/Amavasya) are **approximate** from a synodic
  calculation (`lunarAge`/`tithiMark`) — illustrative; festival dates are exact
  from `festivals.ts`. Localized "approximate" note is shown.
- Section padding is `py-16` (tighter than others) to help the one-screen fit.
  If you add rows/content, re-check it still fits common viewports.
- Strings under the `calendar` key in every `src/i18n/ui/<locale>.ts` (incl. a
  localized `weekdays` array). The `lead` prop is passed but currently unused.

## Upcoming events rule

"Upcoming" means **dated today or later**. The hero panel's bottom list filters
`nextDate >= todayIso`, sorts soonest-first, and shows the **year** in dates.
When refreshing `festivals.ts` yearly, make sure enough `nextDate`s are in the
future or the hero list will look sparse.

## Trust-event photos (the docs/ folder convention)

`docs/events/` is the single source of truth. Naming:

```
YYYY-MM-DD_short-title.ext        (ext: jpg|jpeg|png|webp)
```

- Date prefix → sort order (newest first). Title after `_` → caption.
- `scripts/sync-events.mjs` (prebuild) mirrors these into `public/events/`.
- `src/data/trustEvents.ts` reads the folder at build time and produces
  base-aware `src` URLs (`/sanatan/events/<file>`).
- Sample placeholder PNGs exist; delete them when real photos are added.

## Festivals / scriptural sources

`src/data/festivals.ts` — each festival/tithi carries a `source` field citing
the authentic scripture (e.g. Ekadashi → Padma Purana; Navratri → Devi
Mahatmya / Markandeya Purana). Shown in the hover tooltip. **Keep citations
accurate.** `nextDate` values are lunisolar and must be refreshed yearly from a
Panchang.

## SEO

Per-locale title/description/keywords, canonical URL, `hreflang` alternates for
all 10 locales + `x-default`, Open Graph + Twitter cards, JSON-LD WebSite
schema, `sitemap-index.xml`, `robots.txt`. All handled in `SEO.astro`.

## Deployment

`.github/workflows/deploy.yml` builds on push to `main` and deploys to Pages.
Repo Settings → Pages → Source = **GitHub Actions**. Build env sets
`SITE_URL=https://mohitmehral.github.io` and `BASE_PATH=/sanatan`.
`.nojekyll` is added so `_astro/` assets aren't stripped.

**Custom domain:** set `BASE_PATH=/`, update `SITE_URL`, add `public/CNAME`,
update `robots.txt` sitemap URL.

## Conventions / gotchas

- Don't unpin `@astrojs/sitemap` (see above).
- React island text is serialized as escaped JSON in the HTML (Unicode-escaped
  for non-Latin scripts) — it's there, just not as plain inline text. Verify
  translations via `<title>` / static Astro sections, or in the browser.
- `prefixDefaultLocale: true` means English lives at `/en`, not `/`.
- Respect `prefers-reduced-motion` (already handled in global.css).

## Status

All 10 tasks complete; build is green (12 pages + sitemap). Not yet pushed to a
git repo. Next steps if desired: real content depth per concept, real event
photos, yearly Panchang date refresh, optional per-concept detail pages.
