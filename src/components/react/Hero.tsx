import { motion } from 'framer-motion';
import HeroEventsPanel, { type TrustSlide, type FestivalRow } from './HeroEventsPanel';

interface Props {
  eyebrow: string;
  title: string;
  subtitle: string;
  lead: string;
  ctaExplore: string;
  ctaEvents: string;
  scroll: string;
  exploreHref: string;
  eventsHref: string;
  // Trust panel
  trustName: string;
  trustTagline: string;
  eventsHeading: string;
  upcomingHeading: string;
  logoSrc: string;
  trustSlides: TrustSlide[];
  festivals: FestivalRow[];
}

// A single quiet line-drawn glyph, not a spinning wheel — a mark of respect,
// not a decoration. Drawn once on load via SVG stroke animation.
function InkMark() {
  return (
    <svg viewBox="0 0 120 120" className="h-14 w-14" aria-hidden="true">
      <motion.circle
        cx="60"
        cy="60"
        r="46"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="text-accent-500/70"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.text
        x="60"
        y="76"
        textAnchor="middle"
        fontSize="46"
        className="fill-ink font-display"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        ॐ
      </motion.text>
    </svg>
  );
}

export default function Hero(props: Props) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
          <motion.div variants={item} className="mb-6">
            <InkMark />
          </motion.div>

          <motion.p variants={item} className="eyebrow mb-4">
            {props.eyebrow}
          </motion.p>

          <motion.h1
            variants={item}
            className="heading-serif text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl md:text-[4.2rem]"
          >
            {props.title}
          </motion.h1>

          <motion.p variants={item} className="mt-5 font-serif text-xl italic text-ink-soft sm:text-2xl">
            {props.subtitle}
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
            {props.lead}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <a href={props.exploreHref} className="btn-primary">
              {props.ctaExplore}
            </a>
            <a href={props.eventsHref} className="btn-ghost">
              {props.ctaEvents}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-full justify-self-center lg:justify-self-end"
        >
          <HeroEventsPanel
            trustName={props.trustName}
            trustTagline={props.trustTagline}
            eventsHeading={props.eventsHeading}
            upcomingHeading={props.upcomingHeading}
            logoSrc={props.logoSrc}
            trustSlides={props.trustSlides}
            festivals={props.festivals}
          />
        </motion.div>
      </div>
    </section>
  );
}
