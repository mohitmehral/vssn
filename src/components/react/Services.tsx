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
        <p className="mx-auto mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#b3471f] before:block before:h-px before:w-6 before:bg-[#b3471f]/60">
          {eyebrow}
        </p>
        {/* Banner-style plaque heading */}
        <h2 className="heading-serif inline-block rounded-xl bg-[#7a2718] px-8 py-3 text-2xl font-semibold text-[#fbeede] shadow-[0_10px_30px_-12px_rgba(122,39,24,0.5)] sm:text-3xl">
          {title}
        </h2>
        <p className="mt-5 text-[#7a5b48]">{lead}</p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {items.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 rounded-xl border border-[#e6c58f]/70 bg-gradient-to-b from-[#fdf6e7] to-[#fbeede] px-4 py-3.5 shadow-[0_1px_2px_rgba(90,29,16,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c25a24]/50 hover:shadow-[0_12px_30px_-14px_rgba(122,39,24,0.3)]"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#f7e8cd] text-lg">
              {s.icon}
            </span>
            <span className="text-sm font-medium leading-snug text-[#5a1d10]">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
