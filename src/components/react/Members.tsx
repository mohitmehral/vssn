import { motion } from 'framer-motion';

interface MemberItem {
  no: number;
  name: string;
  role: string;
  initial: string;
  photo?: string;
}

interface Props {
  eyebrow: string;
  title: string;
  lead: string;
  items: MemberItem[];
}

export default function Members({ eyebrow, title, lead, items }: Props) {
  return (
    <div className="container-x">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mx-auto mb-3 justify-center">{eyebrow}</p>
        <h2 className="heading-serif text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
        <p className="mt-4 text-ink-soft">{lead}</p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((m, i) => (
          <motion.figure
            key={m.no}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: (i % 5) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col items-center text-center"
          >
            {/* neumorphic circular frame — extruded disc holding an inset photo well */}
            <div className="grid h-28 w-28 place-items-center rounded-full bg-clay shadow-neu transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-neu-hover sm:h-32 sm:w-32">
              <div className="h-24 w-24 overflow-hidden rounded-full shadow-neu-inset sm:h-28 sm:w-28">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-clay">
                    <span className="heading-serif text-2xl font-bold text-maroon">{m.initial}</span>
                  </div>
                )}
              </div>
            </div>

            <figcaption className="mt-3">
              <p className="text-sm font-bold leading-tight text-ink">{m.name}</p>
              <p className="mt-0.5 text-xs leading-snug text-saffron-deep">{m.role}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}
