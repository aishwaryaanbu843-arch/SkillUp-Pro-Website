/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: {
          50: '#eef1f8',
          100: '#d6dcef',
          200: '#aeb9de',
          300: '#7e8cc7',
          400: '#5566ad',
          500: '#3a4a8f',
          600: '#2c3870',
          700: '#1f2856',
          800: '#151b3d',
          900: '#0c1029',
          950: '#070a1c',
        },
        crimson: {
          50: '#fef2f3',
          100: '#fde0e3',
          200: '#fbc7cd',
          300: '#f79faa',
          400: '#f06b7e',
          500: '#e23d56',
          600: '#c81e3a',
          700: '#a51530',
          800: '#88132e',
          900: '#73142c',
        },
        ember: {
          50: '#fff6ed',
          100: '#ffe9d4',
          200: '#ffceaa',
          300: '#ffaa74',
          400: '#ff7a3c',
          500: '#fb5a1a',
          600: '#ec420c',
          700: '#c3300c',
          800: '#9a2811',
          900: '#7c2412',
        },
        cream: {
          50: '#fdfbf7',
          100: '#faf5ec',
          200: '#f4ead6',
          300: '#ecdab9',
          400: '#e1c394',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 4px 24px -8px rgba(12, 16, 41, 0.12)',
        'lift': '0 16px 48px -16px rgba(12, 16, 41, 0.25)',
        'glow-ember': '0 0 40px -8px rgba(251, 90, 26, 0.45)',
        'glow-crimson': '0 0 40px -8px rgba(226, 61, 86, 0.4)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.5s ease both',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'float': 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 1.8s ease-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
};
