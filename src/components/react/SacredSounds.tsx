import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Track {
  id: 'om' | 'shiva';
  title: string;
  src: string;
  float: string; // floating symbol/text while playing
}

interface Props {
  eyebrow: string;
  title: string;
  lead: string;
  download: string;
  omTitle: string;
  shivaTitle: string;
  omSrc: string;
  shivaSrc: string;
}

// ---- Thumbnails (SVG) ----
function OmThumb() {
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="omBg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffd79a" />
          <stop offset="100%" stopColor="#c2410c" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="80" height="80" fill="url(#omBg)" />
      <text x="40" y="56" textAnchor="middle" fontSize="46" fontFamily="'Tiro Devanagari Hindi', serif" fontWeight="700" fill="#fff6e6">ॐ</text>
    </svg>
  );
}

function ShivaThumb() {
  // A calm Shiva motif: crescent moon, third eye, trishul + damaru silhouette.
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="shivaBg" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#3b2a63" />
          <stop offset="100%" stopColor="#1c1230" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="80" height="80" fill="url(#shivaBg)" />
      {/* crescent moon */}
      <path d="M28 20 a8 8 0 1 0 0 15 a6 6 0 1 1 0 -15Z" fill="#ffe9b0" />
      {/* head silhouette */}
      <circle cx="40" cy="42" r="12" fill="#0e0a1c" stroke="#e6c36a" strokeWidth="1" />
      {/* third eye */}
      <path d="M40 38 l3 4 -3 2 -3 -2Z" fill="#e34234" />
      {/* tripundra (three lines) */}
      <g stroke="#e6c36a" strokeWidth="1.2" strokeLinecap="round" opacity="0.9">
        <line x1="34" y1="35" x2="46" y2="35" />
        <line x1="34" y1="37.5" x2="46" y2="37.5" />
        <line x1="34" y1="40" x2="46" y2="40" />
      </g>
      {/* trishul */}
      <g stroke="#e6c36a" strokeWidth="1.6" strokeLinecap="round" fill="none">
        <line x1="62" y1="18" x2="62" y2="60" />
        <path d="M56 24 C56 18 58 16 62 16 C66 16 68 18 68 24" />
        <line x1="56" y1="20" x2="56" y2="26" />
        <line x1="68" y1="20" x2="68" y2="26" />
      </g>
    </svg>
  );
}

function Thumb({ id }: { id: Track['id'] }) {
  return id === 'om' ? <OmThumb /> : <ShivaThumb />;
}

// ---- One player row ----
const BARS = 110;

// A stable pseudo-random bar pattern (used until the real audio fingerprint is
// decoded). Deterministic per track id so it doesn't flicker between renders.
function placeholderBars(seed: number): number[] {
  const out: number[] = [];
  let s = seed * 9301 + 49297;
  for (let i = 0; i < BARS; i++) {
    s = (s * 9301 + 49297) % 233280;
    const rnd = s / 233280;
    // envelope so the middle is a bit taller, like a real waveform
    const env = 0.55 + 0.45 * Math.sin((i / BARS) * Math.PI);
    out.push(0.2 + rnd * 0.8 * env);
  }
  return out;
}

function fmt(t: number): string {
  if (!Number.isFinite(t)) return '0:00';
  const m = Math.floor(t / 60);
  const s = String(Math.floor(t % 60)).padStart(2, '0');
  return `${m}:${s}`;
}

function Player({
  track,
  active,
  onPlay,
  onPause,
  download,
}: {
  track: Track;
  active: boolean;
  onPlay: () => void;
  onPause: () => void;
  download: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const barsRef = useRef<number[]>(placeholderBars(track.id === 'om' ? 7 : 23));

  // Decode the mp3 into a real bar fingerprint (once, best-effort).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(track.src);
        if (!res.ok) return; // file not present yet — keep placeholder bars
        const buf = await res.arrayBuffer();
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        const audioBuf = await ctx.decodeAudioData(buf);
        const raw = audioBuf.getChannelData(0);
        const block = Math.floor(raw.length / BARS);
        const bars: number[] = [];
        let max = 0;
        for (let i = 0; i < BARS; i++) {
          let sum = 0;
          for (let j = 0; j < block; j++) sum += Math.abs(raw[i * block + j] || 0);
          const v = sum / block;
          bars.push(v);
          if (v > max) max = v;
        }
        const norm = bars.map((v) => (max ? 0.12 + (v / max) * 0.88 : 0.3));
        if (!cancelled) {
          barsRef.current = norm;
          drawBars();
        }
        ctx.close().catch(() => {});
      } catch {
        /* keep placeholder */
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track.src]);

  useEffect(() => {
    const a = new Audio(track.src);
    a.preload = 'metadata';
    a.addEventListener('loadedmetadata', () => setDuration(a.duration || 0));
    a.addEventListener('timeupdate', () => setCurrent(a.currentTime));
    // Loop continuously so a mantra can run for a long meditation session.
    a.loop = true;
    audioRef.current = a;
    return () => {
      a.pause();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track.src]);

  // Play/pause driven by parent (single-play coordination).
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (active) a.play().catch(() => {});
    else a.pause();
  }, [active]);

  const progress = duration ? current / duration : 0;

  // Draw the bar waveform with a saffron progress fill (audio.com style).
  const drawBars = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const c = canvas.getContext('2d');
    if (!c) return;
    const W = canvas.width;
    const H = canvas.height;
    const bars = barsRef.current;
    // Sleek: thin bars, wider gaps. Bar width derives from spacing per slot.
    const slot = W / BARS;
    const bw = Math.max(1.4, slot * 0.36); // thin
    const mid = H / 2;
    const a = audioRef.current;
    const prog = a && a.duration ? a.currentTime / a.duration : progress;

    c.clearRect(0, 0, W, H);
    for (let i = 0; i < BARS; i++) {
      const played = i / BARS < prog;
      let h = bars[i] * H * 0.9; // use most of the height
      if (active && Math.abs(i / BARS - prog) < 0.02) h = Math.min(H, h * 1.25);
      const x = i * slot + (slot - bw) / 2;
      // mirrored around the centerline (symmetric up/down) — premium look
      const y = mid - h / 2;
      c.fillStyle = played ? '#c2410c' : 'rgba(122,39,24,0.22)';
      c.beginPath();
      c.roundRect(x, y, bw, Math.max(2, h), bw / 2);
      c.fill();
    }
    if (active) rafRef.current = requestAnimationFrame(drawBars);
  };

  // Redraw when active/progress changes; animate while playing.
  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (active) rafRef.current = requestAnimationFrame(drawBars);
    else drawBars();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, progress]);

  // Click / drag to seek along the waveform.
  const seek = (clientX: number, el: HTMLElement) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const rect = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    a.currentTime = ratio * a.duration;
    setCurrent(a.currentTime);
    drawBars();
  };

  const floats = [
    { dx: -18, delay: 0 },
    { dx: 14, delay: 1.3 },
    { dx: -4, delay: 2.6 },
    { dx: 22, delay: 3.6 },
  ];

  return (
    <div className="relative overflow-visible rounded-neu bg-clay p-5 shadow-neu sm:p-6">
      {/* title + time */}
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <p className="heading-serif truncate text-base font-bold text-ink">{track.title}</p>
        <span className="shrink-0 text-xs tabular-nums text-ink-faint">
          {fmt(current)} / {fmt(duration)}
        </span>
      </div>

      {/* row: thumbnail with translucent play overlay + full-width waveform + download */}
      <div className="flex items-center gap-4">
        <button
          onClick={active ? onPause : onPlay}
          aria-label={active ? 'Pause' : 'Play'}
          aria-pressed={active}
          className="group relative h-14 w-14 shrink-0 rounded-2xl transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-deep focus-visible:ring-offset-2 focus-visible:ring-offset-clay"
        >
          {/* thumbnail — rounded square (squircle), fully visible */}
          <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl shadow-neu transition group-hover:shadow-neu-hover group-active:shadow-neu-inset">
            <Thumb id={track.id} />
          </span>
          {/* small play/pause badge in the corner — does not cover the thumbnail */}
          <span className="absolute -bottom-1.5 -right-1.5 grid h-7 w-7 place-items-center rounded-full bg-clay text-xs text-saffron-deep shadow-neu ring-2 ring-clay transition group-hover:scale-110">
            <span aria-hidden="true">{active ? '❚❚' : '▶'}</span>
          </span>
          {/* floating symbols while active */}
          {active &&
            floats.map((f, i) => (
              <motion.span
                key={i}
                className="pointer-events-none absolute left-1/2 top-0 text-sm font-bold text-saffron-deep"
                initial={{ opacity: 0, x: f.dx, y: 0, scale: 0.6 }}
                animate={{ opacity: [0, 1, 0], y: [-4, -46], scale: [0.6, 1.1] }}
                transition={{ duration: 4, delay: f.delay, repeat: Infinity, ease: 'easeOut' }}
                style={{ textShadow: '0 1px 6px rgba(255,215,154,0.8)' }}
              >
                {track.float}
              </motion.span>
            ))}
        </button>

        {/* full-width waveform (click to seek) */}
        <div
          className="min-w-0 flex-1 cursor-pointer"
          onClick={(e) => seek(e.clientX, e.currentTarget)}
          role="slider"
          aria-label={track.title}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <canvas ref={canvasRef} width={720} height={64} className="h-16 w-full" />
        </div>

        {/* download */}
        <a
          href={track.src}
          download
          aria-label={download}
          title={download}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-clay text-ink shadow-neu transition hover:-translate-y-0.5 hover:text-saffron-deep hover:shadow-neu-hover active:shadow-neu-inset"
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M9 2v9M5 8l4 4 4-4M3 15h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function SacredSounds(props: Props) {
  const [activeId, setActiveId] = useState<Track['id'] | null>(null);

  const tracks: Track[] = [
    { id: 'om', title: props.omTitle, src: props.omSrc, float: 'ॐ' },
    { id: 'shiva', title: props.shivaTitle, src: props.shivaSrc, float: 'ॐ नमः शिवाय' },
  ];

  return (
    <div className="container-x">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mx-auto mb-3 justify-center">{props.eyebrow}</p>
        <h2 className="heading-serif text-3xl font-bold text-ink sm:text-4xl">{props.title}</h2>
        <p className="mt-4 text-ink-soft">{props.lead}</p>
      </div>

      <div className="mx-auto mt-10 grid max-w-3xl gap-5">
        {tracks.map((tk) => (
          <Player
            key={tk.id}
            track={tk}
            active={activeId === tk.id}
            onPlay={() => setActiveId(tk.id)} // starting one pauses the other
            onPause={() => setActiveId((cur) => (cur === tk.id ? null : cur))}
            download={props.download}
          />
        ))}
      </div>
    </div>
  );
}
