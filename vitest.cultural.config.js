import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// Specialized config for cultural sensitivity testing
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js', './src/test/cultural-setup.js'],
    css: true,
    include: ['src/test/cultural/**/*.test.{js,jsx}'],
    // Cultural testing specific settings
    testTimeout: 10000, // Longer timeout for cultural data loading
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json'],
      include: [
        'src/components/cultural/**',
        'src/utils/cultural/**',
        'src/services/supabase/**',
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