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
        <p className="mx-auto mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#b3471f] before:block before:h-px before:w-6 before:bg-[#b3471f]/60">
          {eyebrow}
        </p>
        <h2 className="heading-serif text-3xl font-semibold text-[#5a1d10] sm:text-4xl">{title}</h2>
        <p className="mt-4 text-[#7a5b48]">{lead}</p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((m, i) => (
          <motion.figure
            key={m.no}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: (i % 5) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            {/* circular avatar with saffron ring */}
            <div className="relative">
              <div className="rounded-full bg-gradient-to-b from-[#e07a1f] to-[#7a2718] p-[3px] shadow-[0_8px_24px_-10px_rgba(122,39,24,0.5)]">
                <div className="h-24 w-24 overflow-hidden rounded-full bg-[#fbeede] sm:h-28 sm:w-28">
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-gradient-to-b from-[#fdf3dd] to-[#f4dcae]">
                      <span className="heading-serif text-2xl font-semibold text-[#7a2718]">
                        {m.initial}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <figcaption className="mt-3">
              <p className="text-sm font-semibold leading-tight text-[#5a1d10]">{m.name}</p>
              <p className="mt-0.5 text-xs leading-snug text-[#c25a24]">{m.role}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}
