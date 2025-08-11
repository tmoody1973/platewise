import { vi } from 'vitest'
import { configure } from '@testing-library/react'

// Accessibility testing specific setup
console.log('♿ Setting up accessibility testing...')

// Configure testing library for accessibility
configure({
  // Increase timeout for accessibility tests
  asyncUtilTimeout: 5000,
  // Show more helpful error messages
  getElementError: (message, container) => {
    const error = new Error(message)
    error.name = 'AccessibilityTestError'
    return error
  },
})

// Mock axe-core for accessibility testing
vi.mock('@axe-core/react', () => ({
  default: vi.fn(),
}))

// Mock screen reader announcements
const mockAnnouncements = []
global.mockScreenReader = {
  announcements: mockAnnouncements,
  announce: (message) => {
    mockAnnouncements.push(message)
  },
  clear: () => {
    mockAnnouncements.length = 0
  },
}

// Mock ARIA live regions
Object.defineProperty(window, 'speechSynthesis', {
  writable: true,
  value: {
    speak: vi.fn((utterance) => {
      global.mockScreenReader.announce(utterance.text)
    }),
    cancel: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    getVoices: vi.fn(() => []),
  },
})

// Accessibility test utilities
global.accessibilityTestUtils = {
  // WCAG 2.1 AA compliance requirements
  wcagRequirements: {
    colorContrast: {
      normal: 4.5, // 4.5:1 for normal text
      large: 3.0,  // 3:1 for large text
    },
    focusIndicator: {
      minWidth: 2, // 2px minimum focus indicator
    },
    touchTarget: {
      minSize: 44, // 44px minimum touch target size
    },
  },
  
  // Keyboard navigation test helpers
  keyboard: {
    tab: { key: 'Tab', code: 'Tab', keyCode: 9 },
    shiftTab: { key: 'Tab', code: 'Tab', keyCode: 9, shiftKey: true },
    enter: { key: 'Enter', code: 'Enter', keyCode: 13 },
    space: { key: ' ', code: 'Space', keyCode: 32 },
    escape: { key: 'Escape', code: 'Escape', keyCode: 27 },
    arrowUp: { key: 'ArrowUp', code: 'ArrowUp', keyCode: 38 },
    arrowDown: { key: 'ArrowDown', code: 'ArrowDown', keyCode: 40 },
    arrowLeft: { key: 'ArrowLeft', code: 'ArrowLeft', keyCode: 37 },
    arrowRight: { key: 'ArrowRight', code: 'ArrowRight', keyCode: 39 },
  },
  
  // Screen reader test scenarios
  screenReaderScenarios: [
    {
      name: 'NVDA (Windows)',
      userAgent: 'NVDA',
      capabilities: ['text', 'headings', 'landmarks', 'forms'],
    },
    {
      name: 'JAWS (Windows)',
      userAgent: 'JAWS',
      capabilities: ['text', 'headings', 'landmarks', 'forms', 'tables'],
    },
    {
      name: 'VoiceOver (macOS/iOS)',
      userAgent: 'VoiceOver',
      capabilities: ['text', 'headings', 'landmarks', 'forms', 'gestures'],
    },
    {
      name: 'TalkBack (Android)',
      userAgent: 'TalkBack',
      capabilities: ['text', 'headings', 'landmarks', 'forms', 'gestures'],
    },
  ],
  
  // Color blindness simulation
  colorBlindnessTypes: [
    'protanopia',    // Red-blind
    'deuteranopia',  // Green-blind
    'tritanopia',    // Blue-blind
    'achromatopsia', // Complete color blindness
  ],
  
  // High contrast mode simulation
  highContrastModes: [
    'high-contrast-black',
    'high-contrast-white',
    'high-contrast-custom',
  ],
  
  // Reduced motion preferences
  motionPreferences: [
    'no-preference',
    'reduce',
  ],
  
  // Helper to simulate accessibility preferences
  simulateAccessibilityPreference: (preference, value) => {
    const mediaQuery = `(prefers-${preference}: ${value})`
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === mediaQuery,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  },
  
  // Helper to test focus management
  getFocusableElements: (container) => {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ]
    
    return container.querySelectorAll(focusableSelectors.join(', '))
  },
}