import { motion } from 'framer-motion';

// Clean, relevant line-and-fill icons for each concept, in the warm section
// palette (saffron/orange, deep maroon, soft gold, cream). Simple and
// readable — a quiet gentle motion on view, nothing distracting.

const SAFFRON = '#e07a1f';
const MAROON = '#7a2718';
const GOLD = '#d9a441';
const CREAM = '#fbf3e2';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
};

function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <motion.svg
      viewBox="0 0 96 96"
      className="h-20 w-20"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      aria-hidden="true"
    >
      {children}
    </motion.svg>
  );
}

/** VEDAS — an open book / scripture */
export function VedasIcon() {
  return (
    <Wrap>
      <motion.path d="M48 30 C40 24 28 24 20 28 L20 66 C28 62 40 62 48 68 Z" fill={CREAM} stroke={MAROON} strokeWidth="2.5" variants={draw} />
      <motion.path d="M48 30 C56 24 68 24 76 28 L76 66 C68 62 56 62 48 68 Z" fill={CREAM} stroke={MAROON} strokeWidth="2.5" variants={draw} />
      <motion.line x1="48" y1="30" x2="48" y2="68" stroke={MAROON} strokeWidth="2.5" variants={draw} />
      {[38, 45, 52].map((y) => (
        <motion.line key={y} x1="27" y1={y} x2="42" y2={y - 2} stroke={SAFFRON} strokeWidth="1.6" strokeLinecap="round" variants={draw} />
      ))}
      {[38, 45, 52].map((y) => (
        <motion.line key={`r${y}`} x1="54" y1={y - 2} x2="69" y2={y} stroke={SAFFRON} strokeWidth="1.6" strokeLinecap="round" variants={draw} />
      ))}
      <motion.circle cx="48" cy="22" r="3" fill={GOLD} variants={draw} />
    </Wrap>
  );
}

/** KARMA — balanced scales (action & consequence) */
export function KarmaIcon() {
  return (
    <Wrap>
      <motion.line x1="48" y1="20" x2="48" y2="70" stroke={MAROON} strokeWidth="2.5" variants={draw} />
      <motion.line x1="26" y1="30" x2="70" y2="30" stroke={MAROON} strokeWidth="2.5" strokeLinecap="round" variants={draw} />
      <motion.path d="M26 30 L18 48 L34 48 Z" fill={CREAM} stroke={SAFFRON} strokeWidth="2" variants={draw} />
      <motion.path d="M70 30 L62 48 L78 48 Z" fill={CREAM} stroke={SAFFRON} strokeWidth="2" variants={draw} />
      <motion.path d="M38 72 L58 72 L54 78 L42 78 Z" fill={MAROON} variants={draw} />
      <motion.circle cx="48" cy="30" r="3.5" fill={GOLD} variants={draw} />
    </Wrap>
  );
}

/** DHARMA — a path/road forward */
export function DharmaIcon() {
  return (
    <Wrap>
      <motion.path d="M40 78 L30 22 L66 22 L56 78 Z" fill={CREAM} stroke={MAROON} strokeWidth="2.5" variants={draw} />
      {[70, 56, 42, 30].map((y, i) => (
        <motion.line key={y} x1="48" y1={y} x2="48" y2={y - 7} stroke={SAFFRON} strokeWidth="2.4" strokeLinecap="round" variants={draw} style={{ opacity: 1 - i * 0.12 }} />
      ))}
      <motion.circle cx="48" cy="18" r="4" fill={GOLD} variants={draw} />
    </Wrap>
  );
}

/** ATMAN — an inner flame / lamp of the self */
export function AtmanIcon() {
  return (
    <Wrap>
      <motion.path d="M28 66 C28 60 68 60 68 66 C68 74 28 74 28 66 Z" fill={CREAM} stroke={MAROON} strokeWidth="2.5" variants={draw} />
      <motion.path d="M44 66 C40 60 40 52 48 44 C50 52 60 54 52 64 Z" fill={SAFFRON} stroke={MAROON} strokeWidth="2" variants={draw} />
      <motion.path d="M48 60 C46 56 47 52 50 48 C51 53 54 55 50 60 Z" fill={GOLD} variants={draw} />
      <motion.circle cx="48" cy="30" r="2.5" fill={GOLD} variants={draw} />
    </Wrap>
  );
}

/** BRAHMAN — ocean meeting sky (the boundless whole) */
export function BrahmanIcon() {
  return (
    <Wrap>
      <motion.circle cx="48" cy="34" r="10" fill={GOLD} variants={draw} />
      <motion.path d="M18 60 C30 54 40 66 52 60 C62 55 72 64 78 60" fill="none" stroke={SAFFRON} strokeWidth="2.4" strokeLinecap="round" variants={draw} />
      <motion.path d="M18 70 C30 64 40 76 52 70 C62 65 72 74 78 70" fill="none" stroke={MAROON} strokeWidth="2.4" strokeLinecap="round" variants={draw} />
      <motion.line x1="20" y1="48" x2="76" y2="48" stroke={MAROON} strokeWidth="1.6" strokeDasharray="3 4" variants={draw} />
    </Wrap>
  );
}

/** YOGA — a person seated in meditation */
export function YogaIcon() {
  return (
    <Wrap>
      <motion.circle cx="48" cy="28" r="8" fill={CREAM} stroke={MAROON} strokeWidth="2.5" variants={draw} />
      <motion.path d="M48 38 C36 40 30 52 32 64 L64 64 C66 52 60 40 48 38 Z" fill={SAFFRON} stroke={MAROON} strokeWidth="2.5" variants={draw} />
      <motion.path d="M30 66 C40 60 56 60 66 66 C58 72 38 72 30 66 Z" fill={MAROON} variants={draw} />
      <motion.circle cx="48" cy="16" r="3" fill={GOLD} variants={draw} />
    </Wrap>
  );
}

/** MOKSHA — a bird rising into open sky */
export function MokshaIcon() {
  return (
    <Wrap>
      <motion.circle cx="66" cy="26" r="7" fill={GOLD} variants={draw} />
      <motion.path d="M24 58 C34 46 42 46 48 54 C54 46 62 46 72 58" fill="none" stroke={MAROON} strokeWidth="3" strokeLinecap="round" variants={draw} />
      <motion.path d="M34 70 C40 62 44 62 48 68 C52 62 56 62 62 70" fill="none" stroke={SAFFRON} strokeWidth="2.4" strokeLinecap="round" variants={draw} />
    </Wrap>
  );
}

export const conceptIcons: Record<string, React.ComponentType> = {
  vedas: VedasIcon,
  karma: KarmaIcon,
  dharma: DharmaIcon,
  atman: AtmanIcon,
  brahman: BrahmanIcon,
  yoga: YogaIcon,
  moksha: MokshaIcon,
};
