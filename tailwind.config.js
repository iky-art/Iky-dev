/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0a0a0f',
          900: '#111118',
          850: '#16161f',
          800: '#1a1a24',
          700: '#2a2a38',
          600: '#3a3a4c',
          500: '#5a5a72',
          400: '#8a8aa0',
          300: '#b0b0c4',
          100: '#eaeaf4',
        },
        electric: {
          300: '#8ab4ff',
          400: '#5b93ff',
          500: '#3576ff',
          600: '#2458d6',
          700: '#1a3fa0',
        },
        paper: '#f8f7f4',
        surface: '#ffffff',
        line: '#e5e4e8',
        'line-strong': '#cbd2e4',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
