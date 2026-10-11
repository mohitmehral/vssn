import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MemberItem {
  no: number;
  photo: string;
  country: string;
}

interface Props {
  eyebrow: string;
  title: string;
  lead: string;
  altPrefix: string;
  items: MemberItem[];
}

// Country flags as inline SVG (renders on every OS, unlike flag emoji).
const FLAGS: Record<string, { label: string; svg: ReactNode }> = {
  india: {
    label: 'India',
    svg: (
      <>
        <rect width="30" height="6.67" fill="#FF9933" />
        <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
        <rect y="13.33" width="30" height="6.67" fill="#138808" />
        <circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" strokeWidth="0.6" />
        <circle cx="15" cy="10" r="0.5" fill="#000080" />
      </>
    ),
  },
  usa: {
    label: 'USA',
    svg: (
      <>
        <rect width="30" height="20" fill="#FFFFFF" />
        {[0, 2, 4, 6, 8, 10, 12].map((i) => (
          <rect key={i} y={(i * 20) / 13} width="30" height={20 / 13} fill="#B22234" />
        ))}
        <rect width="12" height={(20 / 13) * 7} fill="#3C3B6E" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3].map((c) => <circle key={`${r}${c}`} cx={1.8 + c * 2.8} cy={2 + r * 3.4} r="0.55" fill="#FFFFFF" />)
        )}
      </>
    ),
  },
  sweden: {
    label: 'Sweden',
    svg: (
      <>
        <rect width="30" height="20" fill="#006AA7" />
        <rect x="9" width="3.5" height="20" fill="#FECC00" />
        <rect y="8.25" width="30" height="3.5" fill="#FECC00" />
      </>
    ),
  },
};

function CountryFlag({ country }: { country: string }) {
  const flag = FLAGS[country];
  if (!flag) return null;
  return (
    <span
      title={flag.label}
      className="absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-full bg-clay/90 shadow-neu-sm backdrop-blur-sm"
    >
      <svg viewBox="0 0 30 20" className="h-3 w-[1.125rem] overflow-hidden rounded-[2px] ring-1 ring-ink/10" role="img" aria-label={flag.label}>
        {flag.svg}
      </svg>
    </span>
  );
}

// Portrait member cards: name + role are printed on each photo, so no caption.
export default function Members({ eyebrow, title, lead, altPrefix, items }: Props) {
  return (
    <div className="container-x">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mx-auto mb-3 justify-center">{eyebrow}</p>
        <h2 className="heading-serif text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
        <p className="mt-4 text-ink-soft">{lead}</p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
        {items.map((m, i) => (
          <motion.figure
            key={m.photo}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: (i % 5) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="group relative w-full max-w-[160px] rounded-2xl bg-clay p-1.5 shadow-neu transition-all duration-300 hover:-translate-y-1 hover:shadow-neu-hover"
          >
            <div className="aspect-[2/3] overflow-hidden rounded-xl shadow-neu-inset-sm">
              <img
                src={m.photo}
                alt={`${altPrefix} ${i + 1}${FLAGS[m.country] && m.country !== 'india' ? ` (${FLAGS[m.country].label})` : ''}`}
                width={400}
                height={600}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <CountryFlag country={m.country} />
          </motion.figure>
        ))}
      </div>
    </div>
  );
}
