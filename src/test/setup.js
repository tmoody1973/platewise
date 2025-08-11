import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers)

// Clean up after each test case
afterEach(() => {
  cleanup()
})

// Mock environment variables for testing
vi.mock('import.meta', () => ({
  env: {
    VITE_SUPABASE_URL: 'http://localhost:54321',
    VITE_SUPABASE_ANON_KEY: 'test-anon-key',
    VITE_DEFAULT_LANGUAGE: 'en',
    VITE_SUPPORTED_LANGUAGES: 'en,es,ar,zh,hi',
    DEV: true,
  },
}))

// Mock Supabase client for testing
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    auth: {
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      signInWithOAuth: vi.fn(),
      signOut: vi.fn(),
      getUser: vi.fn(),
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
      refreshSession: vi.fn(),
      resetPasswordForEmail: vi.fn(),
      updateUser: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
    })),
  })),
}))

// Mock React Router for testing
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/' }),
    BrowserRouter: ({ children }) => children,
  }
})

// Global test utilities
global.testUtils = {
  // Mock user profiles for testing
  mockUserProfiles: {
    english: {
      id: 'test-user-1',
      display_name: 'Test User',
      primary_language: 'en',
      primary_cuisine: 'american',
      family_size: 2,
      dietary_restrictions: ['vegetarian'],
    },
    spanish: {
      id: 'test-user-2',
      display_name: 'Usuario de Prueba',
      primary_language: 'es',
      primary_cuisine: 'mexican',
      family_size: 4,
      dietary_restrictions: ['halal'],
    },
    arabic: {
      id: 'test-user-3',
      display_name: 'مستخدم تجريبي',
      primary_language: 'ar',
      primary_cuisine: 'middle_eastern',
      family_size: 3,
      dietary_restrictions: ['halal', 'dairy_free'],
    },
  },
  
  // Mock recipes for testing
  mockRecipes: {
    american: {
      id: 'recipe-1',
      title: 'Classic Burger',
      cuisine_type: 'american',
      dietary_restrictions: [],
      prep_time_minutes: 15,
      cook_time_minutes: 10,
    },
    mexican: {
      id: 'recipe-2',
      title: 'Tacos de Pollo',
      cuisine_type: 'mexican',
      dietary_restrictions: ['gluten_free'],
      prep_time_minutes: 20,
      cook_time_minutes: 15,
    },
    middle_eastern: {
      id: 'recipe-3',
      title: 'Hummus Bowl',
      cuisine_type: 'middle_eastern',
      dietary_restrictions: ['vegan', 'halal'],
      prep_time_minutes: 10,
      cook_time_minutes: 0,
    },
  },
}