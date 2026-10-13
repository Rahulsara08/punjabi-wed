import type { Config } from 'tailwindcss';

// Colours are CSS variables defined in theme/phulkari.css so a re-skin only
// touches the token file (see PRD §10).
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: 'rgb(var(--c-bg-rgb) / <alpha-value>)',
        malmal: 'rgb(var(--c-surface-rgb) / <alpha-value>)',
        ink: 'rgb(var(--c-ink-rgb) / <alpha-value>)',
        maroon: 'rgb(var(--c-maroon-rgb) / <alpha-value>)',
        gold: 'rgb(var(--c-gold-rgb) / <alpha-value>)',
        goldtext: 'rgb(var(--c-gold-text-rgb) / <alpha-value>)',
        sarson: 'rgb(var(--c-sarson-rgb) / <alpha-value>)',
        gulabi: 'rgb(var(--c-gulabi-rgb) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        script: ['var(--font-script)', 'cursive'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        gurmukhi: ['var(--font-gurmukhi)', 'serif'],
        devanagari: ['var(--font-devanagari)', 'serif'],
      },
      boxShadow: {
        paper: '0 2px 14px rgba(46, 38, 34, 0.08)',
        'paper-sm': '0 1px 6px rgba(46, 38, 34, 0.06)',
      },
      maxWidth: {
        column: '640px',
      },
      padding: {
        section: 'var(--section-pad)',
      },
    },
  },
  plugins: [],
};

export default config;
