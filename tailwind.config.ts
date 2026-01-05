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
        // === WARM PREMIUM PALETTE - "Fire & Earth Ritual" ===

        // Primary: Oat/Warm White - Raw linen, oatmeal texture
        'oat': {
          DEFAULT: '#F0ECE2',
          50: '#FDFCFA',
          100: '#F8F5ED',
          200: '#F0ECE2', // Canvas - main background
          300: '#E8E2D4',
          400: '#DFD8C6',
          500: '#D6CEB8',
          600: '#C5BBA3',
          700: '#B4A88E',
          800: '#A39579',
          900: '#928264',
        },

        // Primary Dark: Wood/Smoked Oak - Smoked wood finish
        'wood': {
          DEFAULT: '#2C2622',
          50: '#F5F4F3',
          100: '#E6E4E2',
          200: '#CCC7C3',
          300: '#B3AAA4',
          400: '#998D85',
          500: '#807066',
          600: '#665847',
          700: '#4D4028',
          800: '#2C2622', // Primary dark - main dark color
          900: '#1E1A17',
          950: '#0F0D0B',
        },

        // Accent: Copper - Glowing copper/amber
        'copper': {
          DEFAULT: '#C47F52',
          50: '#FDF6F2',
          100: '#FAEDE5',
          200: '#F5DBCB',
          300: '#EFC9B1',
          400: '#E9B797',
          500: '#E4A57D',
          600: '#DE9363',
          700: '#C47F52', // Primary accent
          800: '#A96B45',
          900: '#8F5738',
          950: '#74432B',
        },

        // Secondary: Sage - Dried sage
        'sage': {
          DEFAULT: '#7C8C80',
          50: '#F3F5F4',
          100: '#E7EBE8',
          200: '#CFD7D1',
          300: '#B7C3BA',
          400: '#9FAFA3',
          500: '#879B8C',
          600: '#7C8C80', // Secondary - supporting backgrounds
          700: '#697870',
          800: '#566460',
          900: '#435050',
          950: '#303C40',
        },

        // UI: Stone - Subtle borders and separators
        'stone': {
          DEFAULT: '#D6D1C9',
          50: '#FAFAF9',
          100: '#F5F4F2',
          200: '#EBE9E5',
          300: '#E0DED8',
          400: '#D6D1C9', // UI borders
          500: '#C8C2B8',
          600: '#BAB3A7',
          700: '#ACA496',
          800: '#9E9585',
          900: '#908674',
        },

        // Legacy colors (will be gradually removed during rebranding)
        'gold': {
          50: '#faf8f4',
          100: '#f5f0e6',
          200: '#ebe0ca',
          300: '#dcc9a3',
          400: '#d4af7a',
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
          500: '#c67d4a',
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
          600: '#2d5f4f',
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
          600: '#4a7c9e',
          700: '#3f6886',
          800: '#37576f',
          900: '#31495d',
        },
        'cream': {
          50: '#fcfcfb',
          100: '#f9f8f6',
          200: '#f5f1e8',
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
          900: '#3a3a3a',
          950: '#262626',
        },
      },
      fontFamily: {
        'sans': ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        'serif': ['var(--font-fraunces)', 'Georgia', 'serif'],
        'fraunces': ['var(--font-fraunces)', 'Georgia', 'serif'],
        'manrope': ['var(--font-manrope)', 'system-ui', 'sans-serif'],
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
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}

export default config