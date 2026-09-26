import { motion, useReducedMotion } from 'framer-motion';
import HeroEventsPanel, { type TrustSlide, type FestivalRow } from './HeroEventsPanel';
import WavingFlag from './WavingFlag';

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
  festivals: FestivalRow[];
}

export default function Hero(props: Props) {
  const reduce = useReducedMotion();
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
    <section className="relative overflow-hidden pt-24 pb-14 sm:pt-32 sm:pb-20 md:pt-36">
      {/* soft molded ambient blobs (very subtle, same-surface feel) */}
      <div className="pointer-events-none absolute -left-24 top-32 h-64 w-64 rounded-full bg-clay shadow-neu opacity-40 animate-float-slow" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-40 w-40 rounded-full bg-clay shadow-neu-inset opacity-40" />

      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div variants={container} initial="hidden" animate="show" className="relative max-w-2xl">
          {/* eyebrow + waving flag on one line — the dhwaj introduces the name */}
          <motion.div variants={item} className="mb-3 flex items-center gap-3">
            <WavingFlag className="h-12 w-14 shrink-0" />
            <p className="eyebrow">{props.eyebrow}</p>
          </motion.div>

          <h1 className="heading-serif break-words text-[1.9rem] font-extrabold leading-[1.1] text-ink sm:text-5xl md:text-6xl lg:text-[4rem] lg:leading-[1.04]">
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

          <motion.p variants={item} className="mt-4 text-lg text-saffron-deep sm:mt-5 sm:text-xl">
            {props.subtitle}
          </motion.p>

          <motion.p variants={item} className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
            {props.lead}
          </motion.p>

          <motion.div variants={item} className="mt-7 flex flex-wrap gap-3 sm:mt-9 sm:gap-4">
            <a href={props.exploreHref} className="btn-primary">
              {props.ctaExplore}
            </a>
            <a href={props.eventsHref} className="btn-secondary">
              {props.ctaEvents}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
