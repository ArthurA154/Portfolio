import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#06080f',
        mist: '#8ba6c4',
        cyanGlow: '#38bdf8',
      },
      fontFamily: {
        sans: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        aura: '0 0 40px rgba(56, 189, 248, 0.22)',
      },
    },
  },
  plugins: [],
} satisfies Config;
