import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface Props {
  eyebrow: string;
  title: string;
  lead: string;
  concepts: { key: string; label: string }[];
  showHeader?: boolean;
  /** Looping om chant played by the centre meditation control. */
  omLoopSrc?: string;
}

// A single meditative "slide": a floating guru/sage at the centre with the
// core Sanatan concepts (Dharma, Karma, Yoga, Moksha, Atman, Brahman, Vedas)
// orbiting around, molded into the warm neumorphic surface. Replaces the old
// concept-card grid with one calm, mesmerising panel.
function Sage({ chanting = false, reduce = false }: { chanting?: boolean; reduce?: boolean }) {
  const animate = chanting && !reduce;
  return (
    <svg viewBox="0 0 120 130" className="h-32 w-32 sm:h-40 sm:w-40" aria-hidden="true">
      <defs>
        <radialGradient id="headGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd79a" />
          <stop offset="100%" stopColor="#f59e42" />
        </radialGradient>
      </defs>

      {/* halo — brightens while chanting */}
      <motion.circle
        cx="60" cy="42" r="26" fill="none" stroke="#d4a017" strokeWidth="1.5"
        initial={false}
        animate={{ strokeOpacity: animate ? [0.4, 1, 0.4] : 0.4, r: animate ? [26, 30, 26] : 26 }}
        transition={{ duration: 4, repeat: animate ? Infinity : 0, ease: 'easeInOut' }}
      />
      {/* soft head glow behind the head, only while chanting */}
      {animate && (
        <motion.circle
          cx="60" cy="42" r="20" fill="url(#headGlow)"
          animate={{ opacity: [0, 0.55, 0], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '60px 42px' }}
        />
      )}

      {/* HEAD — fills from dark maroon → light saffron while chanting */}
      <motion.circle
        cx="60" cy="42" r="14" stroke="#7a2718" strokeWidth="2"
        initial={false}
        animate={{ fill: animate ? ['#5a1d10', '#f5b662', '#5a1d10'] : '#5a1d10' }}
        transition={{ duration: 4, repeat: animate ? Infinity : 0, ease: 'easeInOut' }}
      />
      {/* tilak */}
      <path d="M60 32 v10" stroke="#ffd79a" strokeWidth="2" strokeLinecap="round" />
      {/* body / shawl */}
      <path d="M60 56 C40 58 30 82 34 104 L86 104 C90 82 80 58 60 56 Z" fill="#e07a1f" stroke="#7a2718" strokeWidth="2" />
      {/* crossed legs (meditation) */}
      <path d="M34 104 C48 96 72 96 86 104 C74 114 46 114 34 104 Z" fill="#a13d27" stroke="#7a2718" strokeWidth="1.6" />
      {/* hands in dhyana mudra */}
      <ellipse cx="60" cy="98" rx="10" ry="4" fill="#efe1c9" stroke="#7a2718" strokeWidth="1.4" />
      {/* small om on chest */}
      <text x="60" y="82" textAnchor="middle" fontSize="12" fill="#fbeede" fontFamily="serif">ॐ</text>
    </svg>
  );
}

// The centre of the orbit: a floating sage that doubles as a meditation
// control. Tapping the sage plays/pauses a looping om chant. While playing, a
// soft saffron aura swells and gently resets on a breathing cycle, and tiny
// ॐ characters drift up from the guru — an elegant, organic sense of chanting.
function MeditationCenter({ src }: { src?: string }) {
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!src) return;
    const a = new Audio(src);
    a.loop = true;
    a.volume = 0.7;
    audioRef.current = a;
    return () => {
      a.pause();
      audioRef.current = null;
    };
  }, [src]);

  const toggle = () => {
    const a = audioRef.current;
    if (playing) {
      a?.pause();
      setPlaying(false);
    } else {
      a?.play().catch(() => {}); // silent until the mp3 is added; visuals still play
      setPlaying(true);
    }
  };

  // A few floating ॐ, staggered, rising from the sage's head while chanting.
  const oms = [
    { dx: -16, delay: 0 },
    { dx: 12, delay: 1.2 },
    { dx: -6, delay: 2.4 },
    { dx: 20, delay: 3.4 },
    { dx: 2, delay: 4.4 },
  ];

  return (
    <div className="relative z-10 grid place-items-center">
      {/* Breathing saffron aura centred on the guru's head — swells on a slow
          ~45s cycle with a faster inner shimmer, only while chanting. */}
      {playing && !reduce && (
        <>
          <motion.div
            className="pointer-events-none absolute -top-2 rounded-full blur-3xl"
            style={{ width: '12rem', height: '12rem', background: 'radial-gradient(circle, rgba(245,158,66,0.6), rgba(245,158,66,0) 68%)' }}
            animate={{ scale: [0.7, 1.5, 0.7], opacity: [0.3, 0.75, 0.3] }}
            transition={{ duration: 45, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="pointer-events-none absolute -top-2 rounded-full blur-2xl"
            style={{ width: '8rem', height: '8rem', background: 'radial-gradient(circle, rgba(255,215,154,0.7), rgba(255,215,154,0) 65%)' }}
            animate={{ scale: [0.85, 1.2, 0.85], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* floating sage + play/pause control */}
      <motion.button
        onClick={toggle}
        aria-label={playing ? 'Pause chant' : 'Play chant'}
        aria-pressed={playing}
        className="relative grid h-40 w-40 place-items-center rounded-full bg-clay shadow-neu transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-deep focus-visible:ring-offset-2 focus-visible:ring-offset-clay sm:h-48 sm:w-48"
        animate={reduce ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Sage chanting={playing} reduce={reduce} />
        {/* small play/pause hint */}
        <span className="absolute bottom-3 left-1/2 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full bg-clay text-xs font-semibold text-saffron-deep shadow-neu-sm">
          <span aria-hidden="true">{playing ? '❚❚' : '▶'}</span>
        </span>
      </motion.button>

      {/* floating ॐ rising from the guru's head — ABOVE the sage (z-20),
          overflow visible so they drift out of the circle. */}
      {playing && !reduce && (
        <div className="pointer-events-none absolute inset-0 z-20 overflow-visible">
          {oms.map((o, i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-[26%] -translate-x-1/2 text-xl font-bold"
              style={{ color: '#c2410c', textShadow: '0 1px 6px rgba(255,215,154,0.8)' }}
              initial={{ opacity: 0, x: o.dx, y: 0, scale: 0.6 }}
              animate={{ opacity: [0, 1, 0], y: [0, -90], x: [o.dx, o.dx * 1.4], scale: [0.6, 1.2] }}
              transition={{ duration: 5, delay: o.delay, repeat: Infinity, ease: 'easeOut' }}
            >
              ॐ
            </motion.span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SanatanOrbit({ eyebrow, title, lead, concepts, showHeader = true, omLoopSrc }: Props) {
  const reduce = useReducedMotion();
  const n = concepts.length;

  return (
    <div className="container-x">
      {showHeader && (
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mx-auto mb-3 justify-center">{eyebrow}</p>
          <h2 className="heading-serif text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
          <p className="mt-4 text-ink-soft">{lead}</p>
        </div>
      )}

      <div className={`${showHeader ? 'mt-12' : ''} flex justify-center`}>
        {/* Neumorphic stage */}
        <div className="relative grid aspect-square w-full max-w-[560px] place-items-center rounded-neu bg-clay shadow-neu-inset">
          {/* concentric molded rings */}
          <div className="absolute h-[86%] w-[86%] rounded-full shadow-neu-inset-sm" />
          <div className="absolute h-[62%] w-[62%] rounded-full shadow-neu" />
          <div className="absolute h-[38%] w-[38%] rounded-full shadow-neu-inset-sm" />

          {/* rotating orbit layer carrying the concept chips */}
          <motion.div
            className="absolute h-[74%] w-[74%]"
            animate={reduce ? {} : { rotate: 360 }}
            transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
          >
            {concepts.map((c, i) => {
              const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
              const x = 50 + 50 * Math.cos(angle);
              const y = 50 + 50 * Math.sin(angle);
              return (
                <div
                  key={c.key}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {/* counter-rotate so the label stays upright */}
                  <motion.span
                    className="inline-flex items-center rounded-full bg-clay px-3 py-1.5 text-xs font-semibold text-maroon shadow-neu sm:text-sm"
                    animate={reduce ? {} : { rotate: -360 }}
                    transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
                  >
                    {c.label}
                  </motion.span>
                </div>
              );
            })}
          </motion.div>

          {/* meditation centre: sage + om-chant play control + progress ring + aura */}
          <MeditationCenter src={omLoopSrc} />
        </div>
      </div>
    </div>
  );
}
