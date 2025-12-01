import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Scandinavian Warmth Palette
        'gold': {
          50: '#faf8f4',
          100: '#f5f0e6',
          200: '#ebe0ca',
          300: '#dcc9a3',
          400: '#d4af7a', // Primary gold
          500: '#c69962',
          600: '#b88350',
          700: '#9a6a43',
          800: '#7d563a',
          900: '#664731',
        },
        'warmwood': {
          50: '#fdf7f4',
          100: '#f9ebe4',
          200: '#f3d7c9',
          300: '#e9b9a1',
          400: '#de936f',
          500: '#c67d4a', // Primary warmwood
          600: '#b36a3d',
          700: '#955634',
          800: '#784630',
          900: '#623a29',
        },
        'forest': {
          50: '#f3f7f6',
          100: '#e1ebe8',
          200: '#c4d7d2',
          300: '#9dbab3',
          400: '#729890',
          500: '#547a73',
          600: '#2d5f4f', // Primary forest
          700: '#264d41',
          800: '#213f36',
          900: '#1d352e',
        },
        'nordic': {
          50: '#f4f8fa',
          100: '#e6eff4',
          200: '#cee0e9',
          300: '#a7c8d9',
          400: '#7aa9c5',
          500: '#5a8fb4',
          600: '#4a7c9e', // Primary nordic blue
          700: '#3f6886',
          800: '#37576f',
          900: '#31495d',
        },
        'cream': {
          50: '#fcfcfb',
          100: '#f9f8f6',
          200: '#f5f1e8', // Primary cream background
          300: '#ede7d9',
          400: '#e3d8c3',
          500: '#d6c5a7',
          600: '#c4ad8a',
          700: '#a88f6e',
          800: '#8a755b',
          900: '#71604b',
        },
        'graphite': {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3a3a3a', // Primary graphite
          950: '#262626',
        },
      },
      fontFamily: {
        'sans': ['var(--font-inter)', 'system-ui', 'sans-serif'],
        'serif': ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'nordic': '0 4px 6px -1px rgba(74, 124, 158, 0.1), 0 2px 4px -1px rgba(74, 124, 158, 0.06)',
        'nordic-lg': '0 10px 15px -3px rgba(74, 124, 158, 0.1), 0 4px 6px -2px rgba(74, 124, 158, 0.05)',
        'gold': '0 4px 6px -1px rgba(212, 175, 122, 0.2), 0 2px 4px -1px rgba(212, 175, 122, 0.1)',
        'gold-lg': '0 10px 15px -3px rgba(212, 175, 122, 0.2), 0 4px 6px -2px rgba(212, 175, 122, 0.1)',
      },
    },
  },
  plugins: [],
}

export default config