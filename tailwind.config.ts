import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#059669',
        'primary-light': '#10B981',
        accent: '#EA580C',
        surface: '#ECFDF5',
        fore: '#0F172A',
      },
      fontFamily: {
        heading: ['Lora', 'Georgia', 'serif'],
        body: ['Raleway', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
