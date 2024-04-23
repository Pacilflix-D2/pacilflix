import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['selector'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
        xs: '475px',
      },
    },
    extend: {
      screens: {
        '2xl': '1400px',
      },
      backgroundImage: {
        'gradien-primary':
          'linear-gradient(145deg, #FF74EC 2.36%, #00CEF5 100%)',
        'gradien-primary-reverse':
          'linear-gradient(215deg, #FF74EC 2.36%, #00CEF5 100%)',
        'border-gradient-light':
          'linear-gradient(90deg, rgba(234, 234, 234, 0.5) 0.43%, rgba(0, 206, 245, 0.5) 25.59%, rgba(255, 88, 232, 0.5) 74.95%, rgba(234, 234, 234, 0.5) 100%)',
        'border-gradient-dark':
          'linear-gradient(90deg, rgba(39, 50, 52, 0.5) 0.43%, rgba(0, 206, 245, 0.5) 25.59%, rgba(255, 88, 232, 0.5) 74.95%, rgba(39, 50, 52, 0.5) 100%)',
        timeline: 'linear-gradient(90deg, #00CEF5 0%, #FF58E8 101.86%)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
      boxShadow: {
        'timeline-light': 'inset 0px 0px 10px 0px rgba(14, 25, 28, 0.30)',
        'timeline-dark': 'inset 0px 0px 10px 0px rgba(247, 245, 254, 0.30)',
      },
      dropShadow: {
        'timeline-light': '0px 0px 10px #48ADF1',
        'timeline-dark': '0px 0px 4.706px #FFEDFD',
      },
      colors: {
        white1: '#DDF7F9',
        black1: '#1A2223',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
