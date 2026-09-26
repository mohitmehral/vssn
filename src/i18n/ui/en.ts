// English — the base dictionary. Its shape defines the type for all locales.
export const en = {
  meta: {
    title: 'Vishwa Sanatan Sansthanam — Sanatan Dharma, told for today',
    description:
      'Vishwa Sanatan Sansthanam — a trust carrying Sanatan Dharma forward through seva and celebration, and sharing its civilization, the Vedas, Karma, Dharma and living festivals in a modern, animated way.',
    keywords:
      'Sanatan Dharma, Hinduism, Vedas, Karma, Dharma, Indian civilization, Ekadashi, Poornima, festivals, spirituality',
  },
  nav: {
    home: 'Home',
    concepts: 'Concepts',
    timeline: 'Civilization',
    events: 'Events',
    about: 'About',
    language: 'Language',
  },
  hero: {
    eyebrow: 'The Eternal Order',
    title: 'Sanatan Dharma',
    subtitle: 'The timeless way of living, understood anew',
    lead: 'Ancient wisdom, told for the modern mind. Explore the civilization, scriptures and living traditions of Sanatan Dharma through motion, light and clarity.',
    ctaExplore: 'Begin the Journey',
    ctaEvents: 'Upcoming Events',
    scroll: 'Scroll to explore',
  },
  concepts: {
    eyebrow: 'Core Wisdom',
    title: 'Concepts that shape a lifetime',
    lead: 'Not rules, but a way of seeing. Each idea below is a doorway into a deeper understanding of self and cosmos.',
    items: {
      vedas: {
        title: 'The Vedas',
        short: 'The oldest layer of knowledge',
        body: 'The Vedas — Rig, Yajur, Sama and Atharva — are among humanity\'s oldest preserved texts, transmitted orally with astonishing precision for millennia. They hold hymns, philosophy and the seeds of science and sound.',
      },
      karma: {
        title: 'Karma',
        short: 'Action and consequence',
        body: 'Karma is the moral law of cause and effect: every intention and action shapes future experience. It is not fate, but responsibility — the freedom to author your own becoming.',
      },
      dharma: {
        title: 'Dharma',
        short: 'The way of right living',
        body: 'Dharma is duty, ethics and the natural order that upholds life. It is contextual — what is right depends on role, time and circumstance — yet always oriented toward harmony.',
      },
      atman: {
        title: 'Atman & Brahman',
        short: 'The self and the infinite',
        body: 'Atman is the innermost self; Brahman is the infinite reality underlying all. The great insight of the Upanishads is that these two are, in truth, one.',
      },
      yoga: {
        title: 'Yoga',
        short: 'Union of body, mind and spirit',
        body: 'Far beyond posture, yoga is a science of union — pathways of knowledge, devotion, action and meditation that still the mind and reveal the self.',
      },
      moksha: {
        title: 'Moksha',
        short: 'Liberation',
        body: 'Moksha is freedom from the cycle of birth and death — the realization of one\'s true, unbounded nature. It is considered the highest aim of human life.',
      },
    },
    readMore: 'Explore',
    exampleLabel: 'In real life',
  },
  timeline: {
    eyebrow: 'A Living Civilization',
    title: 'How it began, how it evolved',
    lead: 'A journey across millennia — with the evidence that anchors each era.',
    evidenceLabel: 'Evidence',
  },
  events: {
    eyebrow: 'The Living Calendar',
    title: 'Festivals & sacred dates',
    lead: 'Hover any date to learn its meaning, drawn from authentic scripture.',
    festivalsTab: 'Festivals & Tithis',
    trustTab: 'Our Trust Events',
    sourceLabel: 'Source',
    upcoming: 'Upcoming',
    noTrustEvents: 'New event photos will appear here soon.',
  },
  trust: {
    name: 'Vishwa Sanatan Sansthanam',
    tagline: 'Social harmony is the true identity of Sanatan.',
    eyebrow: 'Our Sansthan',
    eventsHeading: 'Sansthan Events',
    upcomingHeading: 'Upcoming Festivals',
    lead: 'The work of Vishwa Sanatan Sansthanam — gatherings, seva and celebrations that carry the living tradition forward.',
    values: {
      dharma: 'Dharma',
      sanskar: 'Sanskar',
      harmony: 'Harmony',
      seva: 'Seva',
      nation: 'Nation-building',
    },
  },
  calendar: {
    eyebrow: 'The Panchang',
    title: 'How the Hindu calendar works',
    lead: 'A lunisolar calendar: months follow the moon, marked by fortnights (paksha) and lunar days (tithi). Sacred days and festivals fall on specific tithis.',
    prev: 'Previous month',
    next: 'Next month',
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    legend: {
      ekadashi: 'Ekadashi',
      purnima: 'Purnima (full moon)',
      amavasya: 'Amavasya (new moon)',
      festival: 'Festival',
    },
    note: 'Tithi and festival dates follow the lunisolar Panchang and are approximate; confirm with a local Panchang.',
    today: 'Today',
  },
  services: {
    eyebrow: 'What we offer',
    title: 'Special Services',
    lead: 'Guidance and practices offered by the Sansthan — for wellbeing of body, mind and spirit.',
  },
  about: {
    eyebrow: 'Our Purpose',
    title: 'Why this exists',
    lead: 'To present the depth of Sanatan Dharma with clarity, beauty and honesty — free from noise, grounded in sources, open to every seeker.',
  },
  footer: {
    tagline: 'Sanatan Dharma — the eternal way, told for today.',
    rights: 'Made with devotion. Knowledge shared freely.',
    sources: 'Sources & references',
  },
} as const;

export type UISchema = typeof en;
