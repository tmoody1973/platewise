import { defineConfig } from 'vitest/config'
import path from 'path'

// Specialized config for API integration testing
export default defineConfig({
  test: {
    globals: true,
    environment: 'node', // Node environment for API testing
    setupFiles: ['./src/test/api-setup.js'],
    include: ['src/test/api/**/*.test.{js,jsx}'],
    // API testing specific settings
    testTimeout: 30000, // Longer timeout for API calls
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json'],
      include: [
        'src/services/**',
        'src/utils/pricing/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@test': path.resolve(__dirname, './src/test'),
    },
  },
})