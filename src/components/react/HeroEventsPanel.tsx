import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface TrustSlide {
  key: string;
  image: string;
  dateLabel: string;
  title: string;
}

export interface FestivalRow {
  key: string;
  glyph: string;
  dateLabel: string;
  name: string;
  meaning: string;
}

interface Props {
  trustName: string;
  trustTagline: string;
  eventsHeading: string;
  upcomingHeading: string;
  logoSrc: string;
  trustSlides: TrustSlide[];
  festivals: FestivalRow[];
  intervalMs?: number;
}

// The "Living Calendar" — enlarged to visually balance the hero copy on the
// left. Two zones:
//   TOP  = branded, auto-rotating showcase of Vishwa Sanatan Sansthanam events
//   BOTTOM = a compact list of upcoming festivals (name + date + short meaning,
//            deliberately WITHOUT scriptural source here).
export default function HeroEventsPanel({
  trustName,
  trustTagline,
  eventsHeading,
  upcomingHeading,
  logoSrc,
  trustSlides,
  festivals,
  intervalMs = 4200,
}: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = trustSlides.length;

  useEffect(() => {
    if (paused || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), intervalMs);
    return () => clearInterval(id);
  }, [paused, count, intervalMs]);

  const active = trustSlides[index];

  return (
    <div className="w-full max-w-md overflow-hidden rounded-neu bg-clay shadow-neu">
      {/* Brand header */}
      <div className="flex items-center gap-3 px-5 py-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-clay shadow-neu-inset-deep">
          <img src={logoSrc} alt={trustName} className="h-full w-full rounded-full object-cover" loading="eager" />
        </div>
        <div className="min-w-0">
          <p className="heading-serif truncate text-sm font-bold text-ink">{trustName}</p>
          <p className="truncate text-[11px] text-saffron-deep">{trustTagline}</p>
        </div>
      </div>

      {/* TOP zone — auto-rotating trust events */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex items-center justify-between px-5 pt-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
            {eventsHeading}
          </span>
          <span className="flex gap-1">
            {trustSlides.map((s, i) => (
              <button
                key={s.key}
                aria-label={`Event ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-4 bg-saffron-deep' : 'w-1.5 bg-ink/15'
                }`}
              />
            ))}
          </span>
        </div>

        <div className="relative mt-3 h-56 overflow-hidden">
          <AnimatePresence mode="wait">
            {active && (
              <motion.figure
                key={active.key}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 mx-5 overflow-hidden rounded-2xl shadow-neu-inset"
              >
                <img src={active.image} alt={active.title} className="h-full w-full object-cover" loading="lazy" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-maroon-deep/90 via-maroon-deep/40 to-transparent p-4">
                  <span className="rounded-full bg-clay/95 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-soft">
                    {active.dateLabel}
                  </span>
                  <p className="heading-serif mt-1.5 text-sm font-bold text-clay">{active.title}</p>
                </figcaption>
              </motion.figure>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* BOTTOM zone — upcoming festivals, no source */}
      <div className="mt-2 px-5 pb-5 pt-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
          {upcomingHeading}
        </span>
        <ul className="mt-2.5 space-y-2.5">
          {festivals.map((f) => (
            <li key={f.key} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-clay text-base text-saffron-deep shadow-neu-inset-sm">
                {f.glyph}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="heading-serif truncate text-sm font-bold text-ink">{f.name}</p>
                  <span className="shrink-0 text-[11px] font-medium text-saffron-deep">{f.dateLabel}</span>
                </div>
                <p className="truncate text-xs text-ink-soft">{f.meaning}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
