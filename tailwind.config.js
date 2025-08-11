/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Culturally Neutral
        primary: {
          green: '#2D7D32',    // Growth, prosperity (universal positive)
          blue: '#1976D2',     // Trust, stability (universal)
          orange: '#F57C00',   // Energy, warmth (appetite stimulating)
        },
        // Secondary Colors
        secondary: {
          teal: '#00695C',     // Calm, balance
          purple: '#7B1FA2',   // Creativity, wisdom
          amber: '#FF8F00',    // Optimism, clarity
        },
        // Neutral Palette
        neutral: {
          50: '#FAFAFA',   100: '#F5F5F5',   200: '#EEEEEE',
          300: '#E0E0E0',  400: '#BDBDBD',   500: '#9E9E9E',
          600: '#757575',  700: '#616161',   800: '#424242',
          900: '#212121',
        },
        // Cultural Sensitivity Colors
        cultural: {
          warm: '#FFF3E0',     // Warm, welcoming backgrounds
          earth: '#8D6E63',    // Earth tones for natural foods
          fresh: '#E8F5E8',    // Fresh, healthy food indication
        },
        // Semantic Colors
        success: '#4CAF50',  warning: '#FF9800',  
        error: '#F44336',    info: '#2196F3',
      },
      fontFamily: {
        // Font Stack - Excellent multilingual support
        primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        secondary: ['Noto Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        // Mobile Scale (responsive variants)
        'mobile-sm': ['1rem', { lineHeight: '1.5' }],
        'mobile-base': ['1.125rem', { lineHeight: '1.5' }],
        'mobile-lg': ['1.25rem', { lineHeight: '1.4' }],
      },
      spacing: {
        // Bento-specific spacing
        'bento-gap-sm': '0.75rem',   // 12px - Mobile
        'bento-gap-md': '1rem',      // 16px - Tablet  
        'bento-gap-lg': '1.5rem',    // 24px - Desktop
      },
      borderRadius: {
        'bento': '1.25rem',  // 20px - Standard bento card radius
      },
      boxShadow: {
        'bento': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'bento-hover': '0 12px 35px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
  // Support for RTL languages
  corePlugins: {
    // Enable all core plugins including direction utilities
  },
}