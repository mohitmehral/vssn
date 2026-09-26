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
  /** id of the section open by default (optional) */
  defaultOpen?: string;
}

// Expandable "About Us" — each section is collapsed by default; the user
// clicks a heading to expand it. Long objective lists stay tucked away until
// asked for.
export default function AboutAccordion({ sections, defaultOpen }: Props) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);

  return (
    <div className="mx-auto mt-10 max-w-3xl space-y-3 text-left">
      {sections.map((s) => {
        const isOpen = open === s.id;
        return (
          <div
            key={s.id}
            className="overflow-hidden rounded-2xl border border-ink/10 bg-paper-white shadow-card"
          >
            <button
              onClick={() => setOpen(isOpen ? null : s.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-paper sm:px-6"
            >
              <span className="heading-serif text-lg font-semibold text-ink">{s.heading}</span>
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-accent-500/40 text-accent-600 transition-transform duration-300 ${
                  isOpen ? 'rotate-45' : ''
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="border-t border-ink/10 px-5 py-5 sm:px-6">
                    {s.body && (
                      <p className="text-sm leading-relaxed text-ink-soft">{s.body}</p>
                    )}
                    {s.points && (
                      <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-ink-soft marker:font-semibold marker:text-accent-600">
                        {s.points.map((p, i) => (
                          <li key={i} className="pl-1">{p}</li>
                        ))}
                      </ol>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
