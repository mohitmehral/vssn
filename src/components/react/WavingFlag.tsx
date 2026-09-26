import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  className?: string;
}

// The saffron swallow-tail dhwaj (bhagwa dhvaj) exactly as in the VSS emblem:
// a dark staff on the RIGHT, the forked saffron flag flying to the LEFT, with
// two pointed tails on the fly edge. It ripples leftward. Holds still for
// users who prefer reduced motion.
//
// Geometry: staff at x≈96. Flag hoist (attached edge) at the staff, fly edge
// to the left with an upper and lower point and a notch between them.
export default function WavingFlag({ className = 'h-24 w-28' }: Props) {
  const reduce = useReducedMotion();

  // Three ripple keyframes — the fly edge and tails sway; hoist stays at staff.
  // Path: start top of hoist → sweep out to upper tail → notch → lower tail →
  // back down the hoist.
  const wave1 =
    'M96 26 C70 22 48 28 22 24 L40 40 L20 52 C46 50 70 58 96 56 Z';
  const wave2 =
    'M96 26 C70 30 48 22 22 30 L42 42 L20 60 C46 52 70 50 96 56 Z';
  const wave3 =
    'M96 26 C70 24 48 30 22 22 L38 40 L20 50 C46 54 70 54 96 56 Z';

  const foldA = 'M96 34 C74 32 56 36 34 34';
  const foldB = 'M96 34 C74 38 56 32 34 38';

  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Sanatan Dharma flag">
      <defs>
        <linearGradient id="flagSaffron" x1="1" y1="0" x2="0" y2="0.4">
          <stop offset="0%" stopColor="#c2410c" />
          <stop offset="45%" stopColor="#e07a1f" />
          <stop offset="100%" stopColor="#f59e42" />
        </linearGradient>
      </defs>

      {/* staff (right side), dark like the emblem, with a small finial */}
      <rect x="94" y="14" width="5" height="98" rx="2.5" fill="#7a2718" />
      <circle cx="96.5" cy="13" r="4.5" fill="#7a2718" />

      {/* waving swallow-tail flag, flying left */}
      <motion.path
        fill="url(#flagSaffron)"
        stroke="#7a2718"
        strokeWidth="1.2"
        strokeLinejoin="round"
        initial={{ d: wave1 }}
        animate={reduce ? { d: wave1 } : { d: [wave1, wave2, wave3, wave1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* soft highlight fold that ripples with the flag for depth */}
      <motion.path
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.28"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ d: foldA }}
        animate={reduce ? { d: foldA } : { d: [foldA, foldB, foldA] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
}
