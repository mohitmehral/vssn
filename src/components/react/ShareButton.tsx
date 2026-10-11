import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  locale: string;
  title: string; // page/site title used in the share sheet
}

// en + hi labels; other locales fall back to en.
const T: Record<string, Record<string, string>> = {
  share: { en: 'Share', hi: 'साझा करें' },
  text: {
    en: 'Vishwa Sanatan Sansthanam: Sanatan Dharma, seva and sanskar. Take a look:',
    hi: 'विश्व सनातन संस्थानम् — सनातन धर्म, सेवा और संस्कार। अवश्य देखें:',
  },
  copy: { en: 'Copy link', hi: 'लिंक कॉपी करें' },
  copied: { en: 'Link copied', hi: 'लिंक कॉपी हो गया' },
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const icon = {
  share: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="2.6" /><circle cx="6" cy="12" r="2.6" /><circle cx="18" cy="19" r="2.6" />
      <path d="M8.3 10.8l7.4-4.4M8.3 13.2l7.4 4.4" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.2 21.8l5.1-1.3A9.7 9.7 0 1 0 12 2.2Zm4.4 11.7c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.2.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path d="M17.8 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.9 3h6.4l4.4 5.9zm-1.1 16.2h1.7L7.4 4.7H5.6z" />
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M21.6 4.2 18.4 19.4c-.2 1-.9 1.3-1.7.8l-4.8-3.6-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2L6.3 13 1.6 11.5c-1-.3-1-1 .2-1.5L20.3 3c.9-.3 1.6.2 1.3 1.2Z" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" /><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  ),
};

// Share button: native share sheet on phones (WhatsApp, Instagram, SMS…),
// a small menu of share targets + copy-link on desktop.
export default function ShareButton({ locale, title }: Props) {
  const t = (k: string) => T[k][locale] ?? T[k].en;
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Share the page itself (without #section) so links always open at the top.
    setUrl(window.location.origin + window.location.pathname);
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const track = (method: string) => window.gtag?.('event', 'share', { method, content_type: 'page', item_id: url });

  const onShare = async () => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (navigator.share && isTouch) {
      try {
        await navigator.share({ title, text: t('text'), url });
        track('native');
      } catch {
        /* user closed the sheet */
      }
      return;
    }
    setOpen((v) => !v);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    track('copy_link');
    setTimeout(() => setCopied(false), 2000);
  };

  const u = encodeURIComponent(url);
  const msg = encodeURIComponent(`${t('text')} ${url}`);
  const targets = [
    { id: 'whatsapp', name: 'WhatsApp', href: `https://wa.me/?text=${msg}`, color: 'hover:bg-[#25d366]' },
    { id: 'facebook', name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, color: 'hover:bg-[#1877f2]' },
    { id: 'x', name: 'X', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(t('text'))}&url=${u}`, color: 'hover:bg-ink' },
    { id: 'telegram', name: 'Telegram', href: `https://t.me/share/url?url=${u}&text=${encodeURIComponent(t('text'))}`, color: 'hover:bg-[#229ed9]' },
  ] as const;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={onShare}
        aria-label={t('share')}
        aria-expanded={open}
        aria-haspopup="menu"
        title={t('share')}
        className="grid h-11 w-11 place-items-center rounded-full bg-clay text-ink shadow-neu transition hover:-translate-y-0.5 hover:text-saffron-deep hover:shadow-neu-hover active:shadow-neu-inset focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-deep focus-visible:ring-offset-2 focus-visible:ring-offset-clay"
      >
        {icon.share}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 z-50 mt-3 w-64 rounded-2xl bg-clay p-3 shadow-neu max-sm:fixed max-sm:inset-x-4 max-sm:top-20 max-sm:mt-0 max-sm:w-auto"
          >
            <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-maroon">{t('share')}</p>
            <div className="grid grid-cols-4 gap-2">
              {targets.map((s) => (
                <a
                  key={s.id}
                  role="menuitem"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    track(s.id);
                    setOpen(false);
                  }}
                  className="flex flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] text-ink-soft"
                >
                  <span className={`grid h-10 w-10 place-items-center rounded-xl bg-clay text-ink-soft shadow-neu-sm transition hover:text-white ${s.color}`}>
                    {icon[s.id]}
                  </span>
                  {s.name}
                </a>
              ))}
            </div>

            <button
              type="button"
              role="menuitem"
              onClick={copy}
              className="mt-3 flex w-full items-center gap-2 rounded-xl bg-clay px-3 py-2.5 text-left text-xs shadow-neu-inset-sm transition hover:text-saffron-deep"
            >
              <span className={copied ? 'text-[#138808]' : 'text-saffron-deep'}>{copied ? icon.check : icon.link}</span>
              <span className="min-w-0 flex-1 truncate text-ink-soft">{copied ? t('copied') : url.replace(/^https?:\/\//, '')}</span>
              {!copied && <span className="shrink-0 font-semibold text-saffron-deep">{t('copy')}</span>}
            </button>
            <span className="sr-only" aria-live="polite">{copied ? t('copied') : ''}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
