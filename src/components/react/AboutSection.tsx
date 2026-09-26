import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface AboutBlock {
  id: string;
  heading: string;
  body?: string;
  points?: string[];
}

interface Props {
  sections: AboutBlock[];
  showAllLabel: string;
  showLessLabel: string;
  // Trust header (top of the unified tile)
  trustEyebrow: string;
  trustName: string;
  trustTagline: string;
  trustLead: string;
  values: string[];
  logoSrc: string;
}

const INITIAL_POINTS = 8;

// One unified "About & Purpose" tile: trust header (logo + name + tagline +
// work line + values) → परिचय (Introduction) → कार्ययोजना एवं उद्देश्य
// (Objectives) as a scannable numbered grid with a show-all toggle.
export default function AboutSection({
  sections,
  showAllLabel,
  showLessLabel,
  trustEyebrow,
  trustName,
  trustTagline,
  trustLead,
  values,
  logoSrc,
}: Props) {
  const intro = sections.find((s) => s.body);
  const objectives = sections.find((s) => s.points);
  const [expanded, setExpanded] = useState(false);

  const points = objectives?.points ?? [];
  const visible = expanded ? points : points.slice(0, INITIAL_POINTS);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-12 max-w-5xl rounded-neu bg-clay p-6 shadow-neu sm:p-10"
    >
      {/* Trust header */}
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <span className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-full bg-clay shadow-neu-inset-deep">
          <img src={logoSrc} alt={trustName} className="h-full w-full rounded-full object-cover" />
        </span>
        <div>
          <p className="eyebrow mb-2">{trustEyebrow}</p>
          <h3 className="heading-serif text-2xl font-bold text-ink">{trustName}</h3>
          <p className="mt-1 text-lg text-saffron-deep">{trustTagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{trustLead}</p>
        </div>
      </div>

      {/* Values */}
      <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {values.map((v) => (
          <span
            key={v}
            className="rounded-2xl bg-clay px-3 py-2.5 text-center text-sm font-medium text-ink shadow-neu-inset-sm"
          >
            {v}
          </span>
        ))}
      </div>

      {/* Introduction */}
      {intro && (
        <div className="mt-8 border-t border-ink/5 pt-8">
          <h4 className="heading-serif mb-3 flex items-center gap-3 text-lg font-bold text-ink sm:text-xl">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-clay text-saffron-deep shadow-neu-inset-sm">॥</span>
            {intro.heading}
          </h4>
          <p className="text-[15px] leading-[1.9] text-ink-soft">{intro.body}</p>
        </div>
      )}

      {/* Objectives — numbered tiles */}
      {objectives && (
        <div className="mt-8 border-t border-ink/5 pt-8">
          <h4 className="heading-serif mb-6 flex items-center gap-3 text-lg font-bold text-ink sm:text-xl">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-clay text-saffron-deep shadow-neu-inset-sm">✦</span>
            {objectives.heading}
          </h4>

          <div className="grid gap-4 sm:grid-cols-2">
            <AnimatePresence initial={false}>
              {visible.map((p, i) => (
                <motion.div
                  key={i}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: (i % 2) * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-4 rounded-2xl bg-clay p-4 shadow-neu-inset-sm"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-clay text-sm font-bold text-saffron-deep shadow-neu">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-ink-soft">{p}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {points.length > INITIAL_POINTS && (
            <div className="mt-8 text-center">
              <button onClick={() => setExpanded((v) => !v)} className="btn-secondary">
                {expanded ? showLessLabel : `${showAllLabel} (${points.length})`}
              </button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
