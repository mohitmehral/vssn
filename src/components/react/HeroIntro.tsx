import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Props {
  heading: string;
  body: string;
  readMore: string;
  readLess: string;
}

const IDLE_MS = 6500; // start auto-scroll after the reader has lingered this long
const END_PAUSE_MS = 2500; // rest at the end before rewinding
const SPEED = 16; // px per second — slow, reading pace
const COLLAPSED_RATIO = 0.55; // collapsed box shows 55% of the full text height

// परिचय card: justified text in a box at 75% of its natural height. After the
// hero has been in view for ~6.5s it gently auto-scrolls (teleprompter style),
// pausing on hover/touch/focus. "Read full" expands it completely.
export default function HeroIntro({ heading, body, readMore, readLess }: Props) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const [heights, setHeights] = useState<{ natural: number; collapsed: number } | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [inView, setInView] = useState(false);
  const [hold, setHold] = useState(false);
  const [progress, setProgress] = useState(0);

  // Measure the natural text height (re-measure on resize and after fonts load).
  useEffect(() => {
    const measure = () => {
      const el = box.current;
      if (!el) return;
      const prev = el.style.maxHeight;
      el.style.maxHeight = 'none';
      const natural = el.scrollHeight;
      el.style.maxHeight = prev;
      // On small screens also cap by viewport so the CTA buttons stay on the first screen.
      const cap = window.innerWidth < 1024 ? window.innerHeight * 0.26 : Infinity;
      setHeights({ natural, collapsed: Math.round(Math.min(natural * COLLAPSED_RATIO, cap)) });
    };
    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [body]);

  // Only auto-scroll while the card is actually on screen.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Teleprompter auto-scroll loop.
  useEffect(() => {
    const el = box.current;
    if (!el || reduce || expanded || !inView || hold || !heights) return;
    let raf = 0;
    let timer = 0;
    let last = 0;
    let pos = 0;

    const step = (t: number) => {
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) return;
      const dt = last ? (t - last) / 1000 : 0;
      last = t;
      pos = Math.min(max, pos + SPEED * dt);
      el.scrollTop = pos;
      if (pos >= max - 0.5) {
        timer = window.setTimeout(() => {
          el.scrollTo({ top: 0, behavior: 'smooth' });
          timer = window.setTimeout(start, IDLE_MS);
        }, END_PAUSE_MS);
        return;
      }
      raf = requestAnimationFrame(step);
    };
    const start = () => {
      last = 0;
      pos = el.scrollTop; // resume from wherever the reader left it
      raf = requestAnimationFrame(step);
    };

    timer = window.setTimeout(start, IDLE_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [reduce, expanded, inView, hold, heights]);

  const onScroll = () => {
    const el = box.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? el.scrollTop / max : 1);
  };

  const toggle = () => {
    setExpanded((v) => !v);
    box.current?.scrollTo({ top: 0 });
    setProgress(0);
  };

  const maxHeight = heights ? (expanded ? heights.natural : heights.collapsed) : '15rem';

  return (
    <div className="relative mt-4 rounded-2xl bg-clay shadow-neu-inset-sm">
      <div className="flex items-center justify-between gap-3 px-4 pt-3 sm:px-5">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-maroon">
          <span className="text-saffron-deep" aria-hidden="true">॥</span>
          {heading}
        </p>
        <button
          type="button"
          onClick={toggle}
          aria-expanded={expanded}
          aria-controls="hero-intro"
          className="shrink-0 rounded-full bg-clay px-3 py-1 text-xs font-semibold text-saffron-deep shadow-neu-sm transition hover:shadow-neu-inset-sm"
        >
          {expanded ? readLess : readMore} {expanded ? '↑' : '↓'}
        </button>
      </div>

      <div
        ref={box}
        id="hero-intro"
        tabIndex={0}
        aria-label={heading}
        onScroll={onScroll}
        onMouseEnter={() => setHold(true)}
        onMouseLeave={() => setHold(false)}
        onFocus={() => setHold(true)}
        onBlur={() => setHold(false)}
        onTouchStart={() => setHold(true)}
        onTouchEnd={() => setHold(false)}
        style={{ maxHeight, scrollbarWidth: 'none' }}
        className="overflow-y-auto px-4 pb-4 pt-1.5 outline-none transition-[max-height] duration-500 ease-out focus-visible:ring-2 focus-visible:ring-saffron/40 sm:px-5"
      >
        <p className="hyphens-auto break-words text-justify text-[14px] leading-[1.85] text-ink-soft sm:text-[15px]">
          {body}
        </p>
      </div>

      {/* soft fade + reading-progress line while collapsed */}
      {!expanded && (
        <>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12 rounded-b-2xl bg-gradient-to-t from-clay to-transparent transition-opacity"
            style={{ opacity: progress > 0.98 ? 0 : 1 }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-x-4 bottom-1.5 h-0.5 overflow-hidden rounded-full bg-ink/5 sm:inset-x-5" aria-hidden="true">
            <div className="h-full rounded-full bg-saffron-deep/70" style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
        </>
      )}
    </div>
  );
}
