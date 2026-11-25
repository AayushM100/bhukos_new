/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core Surfaces (Unbleached Paper & Ink)
        surface: '#FFF8F5',
        'surface-dim': '#E0D8D5',
        'surface-container-low': '#FAF2EE',
        'surface-container-lowest': '#FFFFFF',

        // Primary Ink / High Contrast
        onSurface: '#1C1917',
        'on-surface': '#1C1917',
        'on-surface-variant': '#57534E',
        outline: '#78716C',
        'outline-secondary': '#A8A29E',

        // Culinary Accent Colors
        primary: '#78350F',
        secondary: '#C2410C',
        accent: '#D97706',
        olive: '#3F6212',
        'olive-primary': '#4D7C0F',

        // Rarity Badge Colors (from design.md)
        rarity: {
          common: '#57534E',
          uncommon: '#15803D',
          rare: '#9F1239',
          epic: '#B45309',
          legendary: '#1C1917',
        },
      },
      fontFamily: {
        display: ['Newsreader', 'Playfair Display', 'serif'],
        body: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};