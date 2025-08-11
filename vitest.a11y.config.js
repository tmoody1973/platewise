import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// Specialized config for accessibility testing
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js', './src/test/accessibility-setup.js'],
    css: true,
    include: ['src/test/accessibility/**/*.test.{js,jsx}'],
    // Accessibility testing specific settings
    testTimeout: 15000, // Longer timeout for screen reader simulation
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json'],
      include: [
        'src/components/**',
        'src/pages/**',
        'src/utils/accessibility/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@test': path.resolve(__dirname, './src/test'),
    },
  },
})