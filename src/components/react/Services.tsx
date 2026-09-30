import { motion } from 'framer-motion';

interface ServiceItem {
  key: string;
  icon: string;
  label: string;
  desc: string;
}

interface Props {
  eyebrow: string;
  title: string;
  lead: string;
  items: ServiceItem[];
  cta: { title: string; sub: string; call: string; whatsapp: string };
  phoneTel: string; // e.g. +917388735905
}

// 11 services + a closing "book a service" tile = an even 12-tile grid
// (2 cols on phones, 3 on tablets, 4 on desktop).
export default function Services({ eyebrow, title, lead, items, cta, phoneTel }: Props) {
  const wa = `https://wa.me/${phoneTel.replace(/\D/g, '')}`;

  return (
    <div className="container-x">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mx-auto mb-3 justify-center">{eyebrow}</p>
        <h2 className="heading-serif text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
        <p className="mt-4 text-ink-soft">{lead}</p>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {items.map((s, i) => (
          <motion.article
            key={s.key}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: (i % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col items-center rounded-3xl bg-clay px-3 pb-5 pt-6 text-center shadow-neu transition-all duration-300 hover:-translate-y-1 hover:shadow-neu-hover sm:px-5 sm:pb-6 sm:pt-7"
          >
            {/* index */}
            <span className="absolute left-4 top-3 text-[10px] font-semibold tabular-nums text-ink-faint/70">
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* icon in a deep inset well */}
            <span className="grid h-14 w-14 place-items-center rounded-full bg-clay text-2xl shadow-neu-inset-deep transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16 sm:text-3xl" aria-hidden="true">
              {s.icon}
            </span>

            <h3 className="heading-serif mt-4 break-words text-sm font-bold leading-snug text-ink sm:text-base">
              {s.label}
            </h3>
            <p className="mt-1.5 break-words text-[11px] leading-snug text-ink-soft sm:text-xs">{s.desc}</p>

            {/* saffron accent that grows on hover */}
            <span className="mt-4 h-0.5 w-6 rounded-full bg-saffron-deep/50 transition-all duration-300 group-hover:w-12 group-hover:bg-saffron-deep" />
          </motion.article>
        ))}

        {/* 12th tile — book a service */}
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-saffron to-maroon px-3 py-6 text-center text-clay shadow-neu sm:px-5"
        >
          <span className="text-2xl" aria-hidden="true">🙏</span>
          <h3 className="heading-serif mt-2 text-sm font-bold sm:text-base">{cta.title}</h3>
          <p className="mt-1 text-[11px] text-clay/85 sm:text-xs">{cta.sub}</p>
          <div className="mt-4 flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
            <a
              href={`tel:${phoneTel}`}
              className="rounded-full bg-clay/95 px-4 py-2 text-xs font-semibold text-maroon transition hover:bg-clay"
            >
              {cta.call}
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-clay/70 px-4 py-2 text-xs font-semibold text-clay transition hover:bg-clay/15"
            >
              {cta.whatsapp}
            </a>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
