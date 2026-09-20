/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // "Living Manuscript" palette — warm ivory paper, ink type,
        // one deep accent (rubrication red used by old manuscript scribes),
        // and a quiet indigo-ink for structure. No gold, no purple-night.
        paper: {
          DEFAULT: '#f6efe0', // primary page background — warm ivory
          soft: '#efe6d1', // secondary surfaces / alt sections
          deep: '#e4d8ba', // borders, hairlines on paper
          white: '#fbf7ee', // card surfaces
        },
        ink: {
          DEFAULT: '#211a13', // primary text — warm near-black
          soft: '#4a4038', // secondary text
          faint: '#8b8072', // tertiary / captions
        },
        accent: {
          50: '#fbeae5',
          100: '#f3cfc3',
          200: '#e6a793',
          300: '#d47c63',
          400: '#bd5940',
          500: '#a13d27', // primary accent — rubrication red
          600: '#87301e',
          700: '#6b2517',
          800: '#4f1b11',
          900: '#38130b',
        },
        study: {
          DEFAULT: '#2a2540', // deep indigo-ink, used sparingly for structure
          light: '#3d3660',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', '"Marcellus"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        deva: ['"Tiro Devanagari Hindi"', '"Inter"', 'serif'],
        serif: ['"Fraunces"', 'serif'],
      },
      backgroundImage: {
        'paper-grain':
          'radial-gradient(circle at 20% 10%, rgba(161,61,39,0.05) 0%, transparent 45%), radial-gradient(circle at 85% 60%, rgba(42,37,64,0.05) 0%, transparent 40%)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(33, 26, 19, 0.04), 0 8px 24px -8px rgba(33, 26, 19, 0.10)',
        'card-lg': '0 12px 40px -12px rgba(33, 26, 19, 0.22)',
        underline: 'inset 0 -2px 0 0 rgba(161,61,39,0.25)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'ripple': {
          '0%': { transform: 'scale(0.3)', opacity: '0.9' },
          '100%': { transform: 'scale(2.6)', opacity: '0' },
        },
        'draw': {
          from: { strokeDashoffset: '1' },
          to: { strokeDashoffset: '0' },
        },
      },
      animation: {
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'fade-up': 'fade-up 0.7s ease forwards',
        ripple: 'ripple 2.4s cubic-bezier(0.2,0.6,0.4,1) infinite',
      },
    },
  },
  plugins: [],
};
