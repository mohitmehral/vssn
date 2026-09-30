import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import HeroEventsPanel, { type TrustSlide, type EventRow } from './HeroEventsPanel';
import WavingFlag from './WavingFlag';
import HeroIntro from './HeroIntro';

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
  trustName: string;
  trustTagline: string;
  eventsHeading: string;
  upcomingHeading: string;
  logoSrc: string;
  trustSlides: TrustSlide[];
  events: EventRow[];
  objectivesHeading: string;
  allObjectivesLabel: string;
  objectives: { icon: string; title: string }[];
  introHeading: string;
  introBody: string;
  introReadMore: string;
  introReadLess: string;
  allObjectivesHeading: string;
  allObjectives: string[];
  showLessLabel: string;
}

export default function Hero(props: Props) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };
  // Word-by-word reveal for the title.
  const words = props.title.split(' ');

  return (
    <section className="relative overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16">
      {/* soft molded ambient blobs (very subtle, same-surface feel) */}
      <div className="pointer-events-none absolute -left-24 top-32 h-64 w-64 rounded-full bg-clay shadow-neu opacity-40 animate-float-slow" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-40 w-40 rounded-full bg-clay shadow-neu-inset opacity-40" />

      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <motion.div variants={container} initial="hidden" animate="show" className="relative min-w-0 max-w-2xl">
          {/* eyebrow + waving flag on one line — the dhwaj introduces the name */}
          <motion.div variants={item} className="mb-2 flex items-center gap-3">
            <WavingFlag className="h-12 w-14 shrink-0" />
            <p className="eyebrow">{props.eyebrow}</p>
          </motion.div>

          <h1 className="heading-serif break-words text-[1.8rem] font-extrabold leading-[1.1] text-ink sm:text-[2.6rem] lg:text-[3.1rem] lg:leading-[1.06]">
            {words.map((w, i) => (
              <motion.span
                key={i}
                className="mr-[0.25em] inline-block"
                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p variants={item} className="mt-2 break-words text-base text-saffron-deep sm:mt-3 sm:text-lg">
            {props.subtitle}
          </motion.p>

          {/* परिचय — justified, 55% height, auto-scrolls after ~6.5s, click to expand */}
          <motion.div variants={item} id="about" className="scroll-mt-24">
            <HeroIntro
              heading={props.introHeading}
              body={props.introBody}
              readMore={props.introReadMore}
              readLess={props.introReadLess}
            />
          </motion.div>


          {/* Key objectives — a digest of the Sansthan's purpose */}
          <motion.div variants={item} className="mt-4">
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-maroon">{props.objectivesHeading}</p>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="hero-all-objectives"
                className="shrink-0 text-xs font-semibold text-saffron-deep hover:underline"
              >
                {open ? props.showLessLabel : `${props.allObjectivesLabel} (${props.allObjectives.length})`} {open ? '↑' : '↓'}
              </button>
            </div>
            <ul className="grid grid-cols-2 gap-2.5">
              {props.objectives.map((o) => (
                <li
                  key={o.title}
                  className="flex min-w-0 items-center gap-2.5 rounded-2xl bg-clay px-3 py-2 shadow-neu-sm"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-clay text-base shadow-neu-inset-sm" aria-hidden="true">
                    {o.icon}
                  </span>
                  <span className="min-w-0 break-words text-[13px] font-semibold leading-snug text-ink sm:text-sm">
                    {o.title}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={item} className="mt-5 flex flex-wrap gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => {
                setOpen(true);
                setTimeout(
                  () => document.getElementById('hero-all-objectives')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
                  120
                );
              }}
              aria-controls="hero-all-objectives"
              aria-expanded={open}
              className="btn-primary"
            >
              {props.ctaExplore}
            </button>
            <a href={props.eventsHref} className="btn-secondary">
              {props.ctaEvents}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full min-w-0 justify-self-center lg:justify-self-end"
        >
          <HeroEventsPanel
            trustName={props.trustName}
            trustTagline={props.trustTagline}
            eventsHeading={props.eventsHeading}
            upcomingHeading={props.upcomingHeading}
            logoSrc={props.logoSrc}
            trustSlides={props.trustSlides}
            events={props.events}
          />
        </motion.div>
      </div>

      {/* All objectives — revealed on click, full width under the hero */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="hero-all-objectives"
            key="all"
            style={{ scrollMarginTop: '5rem' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="container-x overflow-hidden"
          >
            <div className="mt-10 rounded-neu bg-clay p-5 shadow-neu sm:p-8">
              <h2 className="heading-serif mb-6 flex items-center gap-3 text-lg font-bold text-ink sm:text-xl">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-clay text-saffron-deep shadow-neu-inset-sm" aria-hidden="true">✦</span>
                {props.allObjectivesHeading}
              </h2>
              <ol className="grid gap-4 sm:grid-cols-2">
                {props.allObjectives.map((p, i) => (
                  <li key={i} className="flex min-w-0 gap-4 rounded-2xl bg-clay p-4 shadow-neu-inset-sm">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-clay text-sm font-bold text-saffron-deep shadow-neu">
                      {i + 1}
                    </span>
                    <p className="min-w-0 break-words text-sm leading-relaxed text-ink-soft">{p}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-6 text-center">
                <button type="button" onClick={() => setOpen(false)} className="btn-secondary">
                  {props.showLessLabel}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
