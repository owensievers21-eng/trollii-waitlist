import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#059669',
        fore: '#0F172A',
        surface: '#ECFDF5',
      },
    },
  },
  plugins: [],
} satisfies Config
