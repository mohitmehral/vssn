import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { locales, localeMeta, type Locale } from '../../i18n/config';

interface Props {
  current: Locale;
  base: string;
  /** path segment after the locale, e.g. '' or 'events' */
  pathAfterLocale: string;
  label: string;
}

export default function LanguageSwitcher({ current, base, pathAfterLocale, label }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const cleanBase = base.replace(/\/$/, '');
  const sub = pathAfterLocale ? `/${pathAfterLocale.replace(/^\/+/, '')}` : '';
  const hrefFor = (loc: Locale) => `${cleanBase}/${loc}${sub}`;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={label}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink transition hover:border-accent-500/50 hover:bg-accent-50"
      >
        <span className="text-base">{localeMeta[current].flag}</span>
        <span className="hidden sm:inline">{localeMeta[current].native}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 z-50 mt-2 grid max-h-80 w-56 grid-cols-1 gap-1 overflow-auto rounded-2xl border border-ink/10 bg-paper-white p-2 shadow-card-lg"
          >
            {locales.map((loc) => (
              <li key={loc}>
                <a
                  href={hrefFor(loc)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                    loc === current
                      ? 'bg-accent-50 text-accent-600'
                      : 'text-ink-soft hover:bg-paper'
                  }`}
                >
                  <span className="text-base">{localeMeta[loc].flag}</span>
                  <span className="flex-1">{localeMeta[loc].native}</span>
                  <span className="text-xs text-ink-faint">{localeMeta[loc].english}</span>
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
