/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cosmos: {
          950: '#05050f',
          900: '#0a0a1e',
          800: '#0f0f2e',
          700: '#16163e',
          600: '#1e1e52',
        },
        surface: {
          DEFAULT: '#12122a',
          raised: '#1a1a38',
          overlay: '#222248',
        },
        hd: {
          DEFAULT: '#8b5cf6',
          dim: '#4c1d95',
          glow: '#a78bfa',
        },
        natal: {
          DEFAULT: '#f59e0b',
          dim: '#78350f',
          glow: '#fcd34d',
        },
        ennea: {
          DEFAULT: '#06b6d4',
          dim: '#164e63',
          glow: '#67e8f9',
        },
        extra: {
          DEFAULT: '#10b981',
          dim: '#064e3b',
          glow: '#6ee7b7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(139, 92, 246, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.7)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
