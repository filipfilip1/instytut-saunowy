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
        'wood': {
          50: '#fdf8f3',
          100: '#f9e8d8',
          200: '#f3d0aa',
          300: '#e9ad70',
          400: '#de8442',
          500: '#d4622a',
          600: '#b94a20',
          700: '#98391d',
          800: '#7b301d',
          900: '#672919',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config