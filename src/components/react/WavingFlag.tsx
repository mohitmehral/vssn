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
  // Four strongly-curved keyframes form a travelling wave: the S-curve moves
  // along the cloth and the tails swing up and down.
  const wave1 = 'M96 26 C76 14 50 38 20 22 L40 40 L18 56 C48 44 72 68 96 56 Z';
  const wave2 = 'M96 26 C76 38 50 14 20 32 L42 44 L18 66 C48 70 72 46 96 56 Z';
  const wave3 = 'M96 26 C76 20 50 30 22 16 L38 36 L20 48 C48 58 72 50 96 56 Z';
  const wave4 = 'M96 26 C76 34 50 22 20 28 L40 42 L18 60 C48 56 72 60 96 56 Z';

  const foldA = 'M96 36 C76 26 54 46 30 32';
  const foldB = 'M96 36 C76 46 54 26 30 42';

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
        animate={reduce ? { d: wave1 } : { d: [wave1, wave2, wave3, wave4, wave1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
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
        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
}
