/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Reviwa Brand Colors - following UI guidelines
        primary: '#00B26F', // Emerald Green - growth and sustainability
        secondary: '#0E1C2F', // Midnight Navy - trust and modernity
        accent: '#F5F5E6', // Light Sand - light and breathable

        // Neutral Colors - WCAG AA+ compliant
        charcoal: '#333333',
        'mist-gray': '#F2F3F5',

        // Extended emerald palette for gradients and variations
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#00B26F', // Primary brand color
          600: '#009965',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },

        // Extended navy palette
        navy: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0E1C2F', // Secondary brand color
          950: '#020617',
        },

        // Sand palette for accent color
        sand: {
          50: '#F5F5E6', // Primary accent color
          100: '#f0f0e1',
          200: '#e6e6d2',
          300: '#d9d9bd',
          400: '#c9c9a3',
          500: '#b8b887',
          600: '#a3a36e',
          700: '#8a8a58',
          800: '#70704a',
          900: '#5c5c3e',
        }
      },

      fontFamily: {
        // Typography following UI guidelines
        'heading': ['Inter', 'sans-serif'], // For headings - geometric and clean
        'body': ['DM Sans', 'sans-serif'], // For body text - legible and approachable
        'sans': ['Inter', 'DM Sans', 'sans-serif'], // Fallback hierarchy
      },

      fontWeight: {
        'heading-normal': '600', // For headings
        'heading-bold': '700',   // For headings
        'body-normal': '400',    // For body text
        'body-medium': '500',    // For body text
      },

      borderRadius: {
        // Premium rounded corners as per component guidelines
        'button': '0.75rem', // 12px - for buttons
        'card': '1rem',      // 16px - for cards
        'input': '0.5rem',   // 8px - for inputs
      },

      boxShadow: {
        // Glassmorphism and premium shadows
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'premium': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },

      backdropBlur: {
        'glass': '8px', // For glassmorphism components
      },

      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },

      spacing: {
        '18': '4.5rem',   // 72px
        '88': '22rem',    // 352px
        '128': '32rem',   // 512px
      },

      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}