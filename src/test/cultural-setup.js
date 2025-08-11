import { vi } from 'vitest'

// Cultural testing specific setup
console.log('🌍 Setting up cultural sensitivity testing...')

// Mock i18n for multi-language testing
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        en: {
          'auth.signin': 'Sign In',
          'auth.signup': 'Sign Up',
          'dietary.halal': 'Halal',
          'dietary.kosher': 'Kosher',
          'dietary.vegetarian': 'Vegetarian',
          'cuisine.american': 'American',
          'cuisine.mexican': 'Mexican',
          'cuisine.middle_eastern': 'Middle Eastern',
        },
        es: {
          'auth.signin': 'Iniciar Sesión',
          'auth.signup': 'Registrarse',
          'dietary.halal': 'Halal',
          'dietary.kosher': 'Kosher',
          'dietary.vegetarian': 'Vegetariano',
          'cuisine.american': 'Americano',
          'cuisine.mexican': 'Mexicano',
          'cuisine.middle_eastern': 'Medio Oriente',
        },
        ar: {
          'auth.signin': 'تسجيل الدخول',
          'auth.signup': 'إنشاء حساب',
          'dietary.halal': 'حلال',
          'dietary.kosher': 'كوشر',
          'dietary.vegetarian': 'نباتي',
          'cuisine.american': 'أمريكي',
          'cuisine.mexican': 'مكسيكي',
          'cuisine.middle_eastern': 'شرق أوسطي',
        },
      }
      
      const currentLang = global.testLanguage || 'en'
      return translations[currentLang]?.[key] || key
    },
    i18n: {
      language: global.testLanguage || 'en',
      changeLanguage: vi.fn(),
    },
  }),
}))

// Cultural test utilities
global.culturalTestUtils = {
  // Test different cultural contexts
  testCulturalContexts: [
    {
      language: 'en',
      cuisine: 'american',
      dietary: ['vegetarian'],
      direction: 'ltr',
    },
    {
      language: 'es',
      cuisine: 'mexican',
      dietary: ['halal'],
      direction: 'ltr',
    },
    {
      language: 'ar',
      cuisine: 'middle_eastern',
      dietary: ['halal', 'dairy_free'],
      direction: 'rtl',
    },
    {
      language: 'zh',
      cuisine: 'chinese',
      dietary: ['vegetarian'],
      direction: 'ltr',
    },
  ],
  
  // Dietary restriction test data
  dietaryRestrictions: [
    'halal',
    'kosher',
    'vegetarian',
    'vegan',
    'gluten_free',
    'dairy_free',
    'nut_free',
    'organic',
  ],
  
  // Cuisine types test data
  cuisineTypes: [
    'american',
    'mexican',
    'chinese',
    'indian',
    'middle_eastern',
    'african',
    'european',
    'asian',
    'latin_american',
    'mediterranean',
  ],
  
  // Language codes test data
  supportedLanguages: [
    'en', // English
    'es', // Spanish
    'ar', // Arabic
    'zh', // Chinese
    'hi', // Hindi
    'fr', // French
  ],
  
  // Helper to set test language
  setTestLanguage: (lang) => {
    global.testLanguage = lang
  },
  
  // Helper to test RTL languages
  isRTL: (lang) => ['ar', 'he', 'fa'].includes(lang),
}