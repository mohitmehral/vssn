import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  eyebrow: string;
  title: string;
  lead: string;
  concepts: { key: string; label: string }[];
  showHeader?: boolean;
}

// A single meditative "slide": a floating guru/sage at the centre with the
// core Sanatan concepts (Dharma, Karma, Yoga, Moksha, Atman, Brahman, Vedas)
// orbiting around, molded into the warm neumorphic surface. Replaces the old
// concept-card grid with one calm, mesmerising panel.
function Sage() {
  // A serene seated sage in line art (SVG), neumorphic-friendly.
  return (
    <svg viewBox="0 0 120 130" className="h-32 w-32 sm:h-40 sm:w-40" aria-hidden="true">
      {/* halo */}
      <circle cx="60" cy="42" r="26" fill="none" stroke="#d4a017" strokeOpacity="0.55" strokeWidth="1.5" />
      {/* head */}
      <circle cx="60" cy="42" r="14" fill="#efe1c9" stroke="#7a2718" strokeWidth="2" />
      {/* tilak */}
      <path d="M60 32 v10" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" />
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

export default function SanatanOrbit({ eyebrow, title, lead, concepts, showHeader = true }: Props) {
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

          {/* floating sage at the centre */}
          <motion.div
            className="relative z-10 grid h-40 w-40 place-items-center rounded-full bg-clay shadow-neu sm:h-52 sm:w-52"
            animate={reduce ? {} : { y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sage />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
