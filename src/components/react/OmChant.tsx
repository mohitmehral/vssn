import { useEffect, useRef, useState } from 'react';

interface Props {
  src: string;
  playLabel: string;
  pauseLabel: string;
  /** Attempt to autoplay (browsers usually block until interaction). */
  autoplay?: boolean;
}

// A small ॐ button that plays/pauses a chant loop. Autoplay is attempted but
// browsers block audio until the user interacts, so it gracefully falls back
// to a tap-to-play control. Respects the file at `src` (public/static/...).
export default function OmChant({ src, playLabel, pauseLabel, autoplay = true }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.6;
    audio.addEventListener('error', () => setAvailable(false));
    audioRef.current = audio;

    if (autoplay) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false)); // blocked — user taps to start
    }
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src, autoplay]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => setAvailable(false));
    }
  };

  if (!available) return null;

  return (
    <button
      onClick={toggle}
      aria-label={playing ? pauseLabel : playLabel}
      aria-pressed={playing}
      className="group inline-flex items-center gap-2 rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-saffron-deep shadow-neu transition-all duration-300 hover:-translate-y-0.5 hover:shadow-neu-hover active:shadow-neu-inset focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-deep focus-visible:ring-offset-2 focus-visible:ring-offset-clay"
    >
      <span className={`text-lg ${playing ? 'animate-float-slow' : ''}`}>ॐ</span>
      {playing ? pauseLabel : playLabel}
    </button>
  );
}
