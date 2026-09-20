import { motion } from 'framer-motion';

interface Era {
  id: string;
  period: string;
  title: string;
  summary: string;
  evidence: string;
}

interface Props {
  eyebrow: string;
  title: string;
  lead: string;
  evidenceLabel: string;
  eras: Era[];
}

export default function Timeline({ eyebrow, title, lead, evidenceLabel, eras }: Props) {
  return (
    <div className="container-x">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mx-auto mb-3 justify-center">{eyebrow}</p>
        <h2 className="heading-serif text-3xl font-semibold text-ink sm:text-4xl">{title}</h2>
        <p className="mt-4 text-ink-soft">{lead}</p>
      </div>

      <div className="relative mt-16">
        {/* Vertical animated line */}
        <motion.div
          className="absolute left-4 top-0 w-px origin-top bg-gradient-to-b from-accent-500 via-accent-500/40 to-transparent md:left-1/2"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          style={{ height: '100%' }}
        />

        <div className="space-y-12">
          {eras.map((era, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={era.id}
                className={`relative flex flex-col md:flex-row ${left ? 'md:justify-start' : 'md:justify-end'}`}
                initial={{ opacity: 0, x: left ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Node */}
                <span className="absolute left-4 top-2 z-10 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-accent-500 shadow-card md:left-1/2" />

                <div className={`ml-10 md:ml-0 md:w-[45%] ${left ? '' : 'md:pl-0'}`}>
                  <div className="card-sacred">
                    <span className="inline-block rounded-full border border-accent-500/30 px-3 py-0.5 text-xs font-semibold tracking-wide text-accent-600">
                      {era.period}
                    </span>
                    <h3 className="heading-serif mt-3 text-xl font-semibold text-ink">
                      {era.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{era.summary}</p>
                    <p className="mt-3 border-t border-ink/10 pt-3 text-xs leading-relaxed text-ink-faint">
                      <span className="font-semibold uppercase tracking-wider text-accent-600/80">
                        {evidenceLabel}:{' '}
                      </span>
                      {era.evidence}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
