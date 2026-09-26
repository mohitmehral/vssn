/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Warm Neumorphism (Soft UI) — the whole surface is molded from one
        // warm "cream clay"; saffron/maroon/gold are the only real colours,
        // used sparingly. Tuned to the VSS logo.
        clay: {
          DEFAULT: '#f2e7d3', // base surface — everything is molded from this
          soft: '#efe1c9',
          deep: '#e7d6ba',
        },
        ink: {
          DEFAULT: '#4a2c1a', // primary text — deep warm brown/maroon (AAA on clay)
          soft: '#7a5b43', // secondary
          faint: '#9c8265', // tertiary / captions (AA)
        },
        saffron: {
          light: '#f59e42',
          DEFAULT: '#e07a1f',
          deep: '#c2410c',
        },
        maroon: {
          light: '#b5482f',
          DEFAULT: '#a13d27',
          deep: '#7a2718',
        },
        gold: {
          light: '#e6c36a',
          DEFAULT: '#d4a017',
          deep: '#a97e12',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        deva: ['"Tiro Devanagari Hindi"', '"DM Sans"', 'serif'],
      },
      boxShadow: {
        // Dual opposing warm shadows: light warm-white top-left, warm sand
        // bottom-right. rgba for smooth blending (never opaque hex).
        neu: '9px 9px 18px rgba(190,164,120,0.55), -9px -9px 18px rgba(255,250,240,0.9)',
        'neu-hover': '12px 12px 22px rgba(190,164,120,0.6), -12px -12px 22px rgba(255,250,240,0.95)',
        'neu-sm': '5px 5px 10px rgba(190,164,120,0.5), -5px -5px 10px rgba(255,250,240,0.85)',
        'neu-inset': 'inset 6px 6px 10px rgba(190,164,120,0.55), inset -6px -6px 10px rgba(255,250,240,0.9)',
        'neu-inset-deep': 'inset 10px 10px 20px rgba(190,164,120,0.62), inset -10px -10px 20px rgba(255,250,240,0.92)',
        'neu-inset-sm': 'inset 3px 3px 6px rgba(190,164,120,0.5), inset -3px -3px 6px rgba(255,250,240,0.85)',
      },
      borderRadius: {
        neu: '32px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'spin-rev-slow': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'float-slow': 'float-slow 4.5s ease-in-out infinite',
        'spin-slow': 'spin-slow 40s linear infinite',
        'spin-rev-slow': 'spin-rev-slow 40s linear infinite',
        'fade-up': 'fade-up 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
};
