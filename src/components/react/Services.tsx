import { motion } from 'framer-motion';

interface ServiceItem {
  key: string;
  icon: string;
  label: string;
}

interface Props {
  eyebrow: string;
  title: string;
  lead: string;
  items: ServiceItem[];
}

export default function Services({ eyebrow, title, lead, items }: Props) {
  return (
    <div className="container-x">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mx-auto mb-3 justify-center">{eyebrow}</p>
        <h2 className="heading-serif text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
        <p className="mt-4 text-ink-soft">{lead}</p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group flex items-center gap-4 rounded-neu bg-clay p-5 shadow-neu transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-neu-hover"
          >
            {/* inset icon well — "drilled" into the card */}
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-clay text-2xl shadow-neu-inset-deep transition-transform duration-300 group-hover:scale-105">
              {s.icon}
            </span>
            <span className="heading-serif text-base font-bold leading-snug text-ink">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
