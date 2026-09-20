import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

interface FestivalMark {
  date: string; // ISO
  name: string;
  glyph: string;
}

interface Props {
  eyebrow: string;
  title: string;
  lead: string;
  prev: string;
  next: string;
  today: string;
  note: string;
  weekdays: string[];
  legend: { ekadashi: string; purnima: string; amavasya: string; festival: string };
  locale: string;
  festivals: FestivalMark[];
  startYear: number;
  startMonth: number; // 0-indexed
}

// Approximate lunar phase, to mark tithis illustratively (display only).
const SYNODIC = 29.530588853;
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14) / 86400000;

function lunarAge(date: Date): number {
  const days = date.getTime() / 86400000;
  return ((days - KNOWN_NEW_MOON) % SYNODIC + SYNODIC) % SYNODIC;
}

type Mark = 'purnima' | 'amavasya' | 'ekadashi' | null;

function tithiMark(date: Date): Mark {
  const age = lunarAge(date);
  if (age < 0.9 || age > SYNODIC - 0.9) return 'amavasya';
  if (Math.abs(age - SYNODIC / 2) < 0.9) return 'purnima';
  const tithi = age / (SYNODIC / 30);
  const inFortnight = tithi % 15;
  if (Math.abs(inFortnight - 11) < 0.5) return 'ekadashi';
  return null;
}

// Paksha (waxing/waning) for the info rail.
function paksha(date: Date): 'shukla' | 'krishna' {
  return lunarAge(date) < SYNODIC / 2 ? 'shukla' : 'krishna';
}

// A small sun/moon dial that reflects the current month's mid-phase.
function PhaseDial({ age }: { age: number }) {
  const frac = age / SYNODIC; // 0..1
  const waxing = frac < 0.5;
  return (
    <div className="relative grid h-16 w-16 place-items-center rounded-full border border-gold/50 bg-gradient-to-b from-[#fff6e0] to-[#f3e2bb]">
      <motion.span
        className="text-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {frac < 0.06 || frac > 0.94 ? '🌑' : frac < 0.44 ? (waxing ? '🌒' : '🌘') : frac < 0.56 ? '🌕' : waxing ? '🌔' : '🌖'}
      </motion.span>
    </div>
  );
}

export default function PanchangCalendar(props: Props) {
  const [cursor, setCursor] = useState({ y: props.startYear, m: props.startMonth });

  const festByDate = useMemo(() => {
    const map = new Map<string, FestivalMark>();
    props.festivals.forEach((f) => map.set(f.date, f));
    return map;
  }, [props.festivals]);

  const monthLabel = useMemo(() => {
    try {
      return new Intl.DateTimeFormat(props.locale, { month: 'long', year: 'numeric' }).format(
        new Date(cursor.y, cursor.m, 1)
      );
    } catch {
      return `${cursor.y}-${cursor.m + 1}`;
    }
  }, [cursor, props.locale]);

  // Mid-month reference for the phase dial + samvat label.
  const midDate = new Date(cursor.y, cursor.m, 15);
  const samvat = cursor.y + 57; // Vikram Samvat ≈ Gregorian + 57
  const monthFestivals = useMemo(
    () =>
      props.festivals
        .filter((f) => {
          const d = new Date(f.date + 'T00:00:00');
          return d.getFullYear() === cursor.y && d.getMonth() === cursor.m;
        })
        .sort((a, b) => (a.date < b.date ? -1 : 1)),
    [props.festivals, cursor]
  );

  const cells = useMemo(() => {
    const first = new Date(cursor.y, cursor.m, 1);
    const startDow = first.getDay();
    const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate();
    const todayIso = new Date().toISOString().slice(0, 10);
    const arr: Array<{
      day: number | null;
      iso?: string;
      mark?: Mark;
      fest?: FestivalMark;
      isToday?: boolean;
    }> = [];
    for (let i = 0; i < startDow; i++) arr.push({ day: null });
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(cursor.y, cursor.m, d);
      const iso = `${cursor.y}-${String(cursor.m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      arr.push({ day: d, iso, mark: tithiMark(date), fest: festByDate.get(iso), isToday: iso === todayIso });
    }
    return arr;
  }, [cursor, festByDate]);

  const move = (delta: number) => {
    setCursor((c) => {
      const m = c.m + delta;
      const y = c.y + Math.floor(m / 12);
      return { y, m: ((m % 12) + 12) % 12 };
    });
  };

  const markColor: Record<Exclude<Mark, null>, string> = {
    purnima: 'bg-gold',
    amavasya: 'bg-study',
    ekadashi: 'bg-accent-400',
  };

  return (
    <div className="container-x">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <p className="eyebrow mx-auto mb-3 justify-center">{props.eyebrow}</p>
        <h2 className="heading-serif text-3xl font-semibold text-ink sm:text-4xl">{props.title}</h2>
      </div>

      {/* Panchang "plate": ornate frame, two columns (info rail + grid). */}
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-gold/40 bg-paper-white shadow-card-lg ring-1 ring-inset ring-gold/20">
        {/* decorative top band */}
        <div className="flex items-center justify-between bg-gradient-to-r from-accent-700 via-accent-500 to-accent-700 px-5 py-2 text-paper-white">
          <button onClick={() => move(-1)} aria-label={props.prev} className="grid h-8 w-8 place-items-center rounded-full bg-paper-white/15 transition hover:bg-paper-white/30">‹</button>
          <span className="heading-serif text-sm font-semibold tracking-widest">॥ पञ्चाङ्ग ॥</span>
          <button onClick={() => move(1)} aria-label={props.next} className="grid h-8 w-8 place-items-center rounded-full bg-paper-white/15 transition hover:bg-paper-white/30">›</button>
        </div>

        <div className="grid gap-0 md:grid-cols-[1fr_2fr]">
          {/* Info rail */}
          <div className="flex flex-col gap-4 border-b border-gold/20 bg-gradient-to-b from-[#fdf3dd] to-[#f7e8c8] p-5 md:border-b-0 md:border-r">
            <div className="flex items-center gap-4">
              <PhaseDial age={lunarAge(midDate)} />
              <div>
                <h3 className="heading-serif text-lg font-semibold capitalize leading-tight text-ink">{monthLabel}</h3>
                <p className="text-xs text-ink-soft">Vikram Samvat {samvat}</p>
                <p className="mt-1 text-xs font-medium text-accent-600">
                  {paksha(midDate) === 'shukla' ? 'Shukla Paksha' : 'Krishna Paksha'}
                </p>
              </div>
            </div>

            {/* Month's festivals list */}
            <div className="rounded-xl border border-gold/25 bg-paper-white/70 p-3">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
                {props.legend.festival}
              </p>
              {monthFestivals.length > 0 ? (
                <ul className="space-y-1.5">
                  {monthFestivals.map((f) => (
                    <li key={f.date} className="flex items-center gap-2 text-xs text-ink">
                      <span className="text-sm">{f.glyph}</span>
                      <span className="flex-1 truncate">{f.name}</span>
                      <span className="text-[11px] text-accent-600">
                        {new Intl.DateTimeFormat(props.locale, { day: 'numeric' }).format(new Date(f.date + 'T00:00:00'))}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-ink-faint">—</p>
              )}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-ink-soft">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent-400" />{props.legend.ekadashi}</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-gold" />{props.legend.purnima}</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-study" />{props.legend.amavasya}</span>
            </div>
          </div>

          {/* Grid */}
          <div className="p-4 sm:p-5">
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wide text-accent-700">
              {props.weekdays.map((w) => (
                <div key={w} className="py-1">{w}</div>
              ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-1">
              {cells.map((c, i) => {
                if (c.day === null) return <div key={`e${i}`} />;
                const hasFest = !!c.fest;
                return (
                  <motion.div
                    key={c.iso}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: (i % 7) * 0.008 }}
                    className={`group relative flex aspect-square flex-col items-center justify-center rounded-lg border text-center transition ${
                      hasFest
                        ? 'border-accent-500/50 bg-accent-50'
                        : c.isToday
                        ? 'border-accent-600 bg-paper ring-1 ring-accent-500'
                        : 'border-gold/15 bg-paper/40 hover:border-gold/40'
                    }`}
                  >
                    <span className={`text-xs font-medium ${c.isToday ? 'text-accent-700' : 'text-ink-soft'}`}>{c.day}</span>
                    {hasFest && <span className="text-sm leading-none">{c.fest!.glyph}</span>}
                    {c.mark && !hasFest && (
                      <span className={`absolute right-1 top-1 h-1.5 w-1.5 rounded-full ${markColor[c.mark]}`} aria-hidden="true" />
                    )}
                    {hasFest && (
                      <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink px-2 py-1 text-[11px] font-medium text-paper-white group-hover:block">
                        {c.fest!.name}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
            <p className="mt-3 text-[10px] leading-relaxed text-ink-faint">{props.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
