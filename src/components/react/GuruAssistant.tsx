import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { matchGuru } from '../../data/guruMatch';

interface Strings {
  open: string;
  title: string;
  mantra: string;
  greeting: string;
  placeholder: string;
  send: string;
  close: string;
  chips: { services: string; moksha: string; contact: string };
  outOfScope: string;
  routeIntro: string;
  callAcharya: string;
  emailQuery: string;
  chantNote: string;
}

interface Props {
  locale: string;
  t: Strings;
  phoneTel: string; // e.g. +917388735905
  email: string;
  omSrc: string; // public url to om chant audio
}

interface Msg {
  from: 'user' | 'guru';
  text: string;
  route?: boolean; // show contact buttons
  lastQuery?: string;
}

// A small seated-sage avatar for the button — cream line-art on the saffron
// disc so it reads clearly. Halo + head + meditation robe + a tiny ॐ.
function GuruFace() {
  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
      {/* golden halo */}
      <circle cx="32" cy="23" r="13" fill="none" stroke="#fff6e0" strokeOpacity="0.85" strokeWidth="1.5" />
      {/* head */}
      <circle cx="32" cy="23" r="7.5" fill="#fdf3dd" stroke="#7a2718" strokeWidth="1.4" />
      {/* tilak */}
      <path d="M32 18 v5" stroke="#c2410c" strokeWidth="1.6" strokeLinecap="round" />
      {/* robe / body */}
      <path d="M32 32 C21 33 16 47 18 57 L46 57 C48 47 43 33 32 32 Z" fill="#fdf3dd" stroke="#7a2718" strokeWidth="1.4" />
      {/* folded hands */}
      <ellipse cx="32" cy="50" rx="7" ry="2.6" fill="#f4dcae" stroke="#7a2718" strokeWidth="1.2" />
      {/* om on the robe */}
      <text x="32" y="45" textAnchor="middle" fontSize="9" fill="#c2410c" fontFamily="serif">ॐ</text>
    </svg>
  );
}

export default function GuruAssistant({ locale, t, phoneTel, email, omSrc }: Props) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [chanting, setChanting] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([{ from: 'guru', text: t.greeting }]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const a = new Audio(omSrc);
    a.volume = 0.55;
    audioRef.current = a;
    return () => {
      a.pause();
    };
  }, [omSrc]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  const doOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  // Small delay on hover-out so it doesn't snap shut when moving to the panel.
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 250);
  };

  const chant = () => {
    setChanting(true);
    audioRef.current?.play().catch(() => {});
    setTimeout(() => setChanting(false), 4000);
  };

  const respond = (query: string) => {
    const q = query.trim();
    if (!q) return;
    setMessages((m) => [...m, { from: 'user', text: q }]);
    const reply = matchGuru(q, locale);

    setTimeout(() => {
      if (reply.type === 'abuse') {
        chant();
        setMessages((m) => [...m, { from: 'guru', text: t.chantNote }]);
      } else if (reply.type === 'answer') {
        setMessages((m) => [...m, { from: 'guru', text: reply.text }]);
      } else if (reply.type === 'routeContact') {
        setMessages((m) => [...m, { from: 'guru', text: t.routeIntro, route: true, lastQuery: q }]);
      } else {
        setMessages((m) => [...m, { from: 'guru', text: t.outOfScope }]);
      }
    }, 400);
  };

  const onSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    respond(input);
    setInput('');
  };

  const mailHref = (q: string) =>
    `mailto:${email}?subject=${encodeURIComponent('Website query — VSSN')}&body=${encodeURIComponent(q)}`;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 hidden flex-col items-end gap-3 md:flex"
      onMouseEnter={doOpen}
      onMouseLeave={scheduleClose}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-[min(90vw,22rem)] flex-col overflow-hidden rounded-neu bg-clay shadow-neu"
            role="dialog"
            aria-label={t.title}
          >
            {/* header */}
            <div className="flex items-center gap-3 px-4 py-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-clay text-2xl text-saffron-deep shadow-neu-inset-deep">ॐ</span>
              <div className="min-w-0">
                <p className="heading-serif text-sm font-bold leading-tight text-ink">{t.title}</p>
                <p className="truncate text-[11px] text-saffron-deep">{t.mantra}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label={t.close}
                className="ml-auto grid h-8 w-8 place-items-center rounded-full bg-clay text-ink shadow-neu-sm transition hover:text-saffron-deep active:shadow-neu-inset"
              >
                ✕
              </button>
            </div>

            {/* messages */}
            <div ref={listRef} className="max-h-72 space-y-2.5 overflow-y-auto px-4 py-2">
              {messages.map((m, i) => (
                <div key={i} className={m.from === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'bg-saffron-deep text-clay shadow-neu-sm'
                        : 'bg-clay text-ink shadow-neu-inset-sm'
                    }`}
                  >
                    {m.text}
                    {m.route && (
                      <div className="mt-2 flex flex-col gap-2">
                        <a href={`tel:${phoneTel}`} className="rounded-xl bg-clay px-3 py-2 text-center text-xs font-semibold text-saffron-deep shadow-neu-sm">
                          {t.callAcharya}
                        </a>
                        <a href={mailHref(m.lastQuery || '')} className="rounded-xl bg-clay px-3 py-2 text-center text-xs font-semibold text-ink shadow-neu-sm">
                          {t.emailQuery}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {chanting && (
                <div className="flex justify-center py-2">
                  <motion.span
                    className="text-2xl text-saffron-deep"
                    animate={reduce ? {} : { scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  >
                    ॐ
                  </motion.span>
                </div>
              )}
            </div>

            {/* suggestion chips */}
            <div className="flex flex-wrap gap-2 px-4 pb-1 pt-1">
              {[
                [t.chips.services, t.chips.services],
                [t.chips.moksha, t.chips.moksha],
                [t.chips.contact, t.chips.contact],
              ].map(([label, q], i) => (
                <button
                  key={i}
                  onClick={() => respond(q)}
                  className="rounded-full bg-clay px-3 py-1.5 text-xs font-medium text-ink shadow-neu-sm transition hover:text-saffron-deep active:shadow-neu-inset"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* input */}
            <form onSubmit={onSend} className="flex items-center gap-2 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                aria-label={t.placeholder}
                className="min-w-0 flex-1 rounded-full bg-clay px-4 py-2.5 text-sm text-ink shadow-neu-inset placeholder:text-ink-faint focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron-deep"
              />
              <button
                type="submit"
                aria-label={t.send}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-saffron-deep text-clay shadow-neu transition hover:-translate-y-0.5 active:shadow-neu-inset"
              >
                ➤
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* floating guru button + label so users know it's the AI guru */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={t.open}
        aria-expanded={open}
        className="group flex items-center gap-3 rounded-full bg-clay py-2 pl-2 pr-5 shadow-neu transition hover:shadow-neu-hover active:shadow-neu-inset focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-deep focus-visible:ring-offset-2 focus-visible:ring-offset-clay"
        animate={reduce ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* avatar on a saffron gradient disc — clearly visible */}
        <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#f59e42] to-[#c2410c] shadow-neu-sm">
          <GuruFace />
          {/* om pulse ring */}
          {!reduce && (
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-saffron-deep/50"
              animate={{ scale: [1, 1.4], opacity: [0.7, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
        </span>
        {/* label */}
        <span className="flex flex-col items-start leading-tight">
          <span className="heading-serif text-sm font-bold text-ink">{t.title}</span>
          <span className="text-[11px] font-medium text-saffron-deep">{t.open}</span>
        </span>
      </motion.button>
    </div>
  );
}
