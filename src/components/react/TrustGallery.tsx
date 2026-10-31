import { useEffect, useRef, useState } from 'react';

interface TrustCard {
  date: string;
  title: string;
  src: string;
  mediaType?: 'image' | 'video';
}

interface Props {
  eyebrow: string;
  title: string;
  lead: string;
  noTrustEvents: string;
  locale: string;
  items: TrustCard[];
}

function formatDate(iso: string, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(iso + 'T00:00:00'));
  } catch {
    return iso;
  }
}

// Auto-scrolling gallery of Vishwa Sanatan Sansthanam event photos.
// (This is the trust half of the old Events section; the festivals/tithi grid
// was removed — that information now lives in the Panchang calendar + hero.)
export default function TrustGallery({ eyebrow, title, lead, noTrustEvents, locale, items }: Props) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const manualPauseUntilRef = useRef(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery || items.length === 0) return;
    let raf = 0;
    const speed = 0.4;
    const step = () => {
      if (!paused && Date.now() > manualPauseUntilRef.current) {
        gallery.scrollLeft += speed;
        const half = gallery.scrollWidth / 2;
        if (gallery.scrollLeft >= half) gallery.scrollLeft -= half;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused, items.length]);

  const pauseForManualNavigation = () => {
    manualPauseUntilRef.current = Date.now() + 4000;
  };

  const scrollGallery = (direction: -1 | 1) => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    pauseForManualNavigation();
    gallery.scrollBy({ left: direction * 296, behavior: 'smooth' });
  };

  const loop = [...items, ...items];

  return (
    <div className="container-x">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mx-auto mb-3 justify-center">{eyebrow}</p>
        <h2 className="heading-serif text-3xl font-semibold text-ink sm:text-4xl">{title}</h2>
        <p className="mt-4 text-ink-soft">{lead}</p>
      </div>

      <div className="mt-12">
        {items.length > 0 ? (
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-clay to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-clay to-transparent" />
            <button
              type="button"
              aria-label="Scroll gallery left"
              onClick={() => scrollGallery(-1)}
              className="absolute left-2 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-clay/95 text-2xl font-bold text-maroon shadow-neu transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-saffron"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Scroll gallery right"
              onClick={() => scrollGallery(1)}
              className="absolute right-2 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-clay/95 text-2xl font-bold text-maroon shadow-neu transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-saffron"
            >
              ›
            </button>
            <div
              ref={galleryRef}
              onPointerDown={pauseForManualNavigation}
              onTouchStart={pauseForManualNavigation}
              onWheel={pauseForManualNavigation}
              className="overflow-x-auto overscroll-x-contain scroll-smooth px-2 py-2 [scrollbar-width:thin] [touch-action:pan-x]"
            >
              <div className="flex w-max gap-6">
                {loop.map((e, i) => (
                  <figure
                    key={`${e.src}-${i}`}
                    className="group relative w-72 shrink-0 snap-start overflow-hidden rounded-neu bg-clay p-2 shadow-neu"
                  >
                    <div className="overflow-hidden rounded-2xl shadow-neu-inset">
                      {e.mediaType === 'video' ? (
                        <video
                          src={e.src}
                          aria-label={e.title}
                          preload="metadata"
                          loop
                          playsInline
                          controls
                          onPlay={() => setPaused(true)}
                          onPause={() => setPaused(false)}
                          className="h-52 w-full object-cover"
                        />
                      ) : (
                        <img
                          src={e.src}
                          alt={e.title}
                          loading="lazy"
                          className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                    </div>
                    <figcaption className="pointer-events-none absolute inset-x-2 bottom-2 rounded-b-2xl bg-gradient-to-t from-maroon-deep/90 to-transparent p-4">
                      <p className="text-xs text-clay/80">{formatDate(e.date, locale)}</p>
                      <p className="heading-serif text-sm font-bold text-clay">{e.title}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="py-16 text-center text-ink-faint">{noTrustEvents}</p>
        )}
      </div>
    </div>
  );
}
