import { motion } from 'framer-motion';
import { conceptIcons } from './concepts/ConceptIcons';

interface ConceptItem {
  key: string;
  title: string;
  short: string;
  body: string;
  example?: string;
}

interface Props {
  eyebrow: string;
  title: string;
  lead: string;
  readMore: string;
  exampleLabel: string;
  items: ConceptItem[];
}

export default function Concepts({ eyebrow, title, lead, exampleLabel, items }: Props) {
  return (
    // Warm, calm, spiritual section palette — saffron / maroon / cream / gold.
    <div className="container-x">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mx-auto mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#b3471f] before:block before:h-px before:w-6 before:bg-[#b3471f]/60">
          {eyebrow}
        </p>
        <h2 className="heading-serif text-3xl font-semibold text-[#5a1d10] sm:text-4xl">{title}</h2>
        <p className="mt-4 text-[#7a5b48]">{lead}</p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c, i) => {
          const Icon = conceptIcons[c.key];
          return (
            <motion.article
              key={c.key}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#e6c58f]/60 bg-gradient-to-b from-[#fdf6e7] to-[#fbeede] p-6 shadow-[0_1px_2px_rgba(90,29,16,0.05),0_10px_30px_-12px_rgba(122,39,24,0.18)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_44px_-14px_rgba(122,39,24,0.32)]"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* icon */}
              <div className="mb-4 grid h-24 place-items-center">
                {Icon ? <Icon /> : null}
              </div>

              <h3 className="heading-serif text-center text-xl font-semibold text-[#5a1d10]">{c.title}</h3>
              <p className="mt-1 text-center text-sm font-medium text-[#c25a24]">{c.short}</p>
              <p className="mt-3 text-center text-sm leading-relaxed text-[#6f5442]">{c.body}</p>

              {c.example && (
                <div className="mt-4 rounded-xl border border-[#e6c58f]/70 bg-[#f7e8cd]/60 px-4 py-3">
                  <p className="text-xs leading-relaxed text-[#7a5b48]">
                    <span className="font-semibold uppercase tracking-wide text-[#b3471f]">
                      {exampleLabel}:{' '}
                    </span>
                    {c.example}
                  </p>
                </div>
              )}
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
