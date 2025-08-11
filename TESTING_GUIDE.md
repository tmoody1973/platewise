# PlateWise Testing Framework Guide

## 🧪 Comprehensive Testing for Cultural Inclusivity & Accessibility

PlateWise uses a specialized testing framework designed to ensure cultural sensitivity, accessibility compliance, and robust API integration.

## 🎯 Why This Testing Framework is Critical

### **Cultural Sensitivity Testing**
- Verify dietary restrictions work correctly (Halal, Kosher, Vegetarian, etc.)
- Test multi-language support (English, Spanish, Arabic, Chinese, Hindi, French)
- Ensure cultural color schemes avoid insensitive combinations
- Validate cuisine type handling across different cultures

### **Accessibility Compliance (WCAG 2.1 AA)**
- Screen reader compatibility testing
- Keyboard navigation verification
- High contrast mode support
- Touch target size compliance (44px minimum)
- Focus indicator visibility

### **API Integration Reliability**
- Supabase authentication with cultural data
- External API mocking (OpenAI, Kroger, Spoonacular, ElevenLabs)
- Error handling in multiple languages
- Real-time subscription testing

## 🚀 Quick Start

### Run All Tests
```bash
# Run all test suites
npm run test:all

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Specialized Test Suites
```bash
# Cultural sensitivity tests
npm run test:cultural

# Accessibility compliance tests
npm run test:accessibility

# API integration tests
npm run test:api

# Standard unit tests
npm test
```

## 📁 Test Structure

```
src/test/
├── setup.js                    # Global test configuration
├── cultural-setup.js           # Cultural testing utilities
├── accessibility-setup.js      # Accessibility testing utilities
├── api-setup.js                # API mocking and testing utilities
├── cultural/                   # Cultural sensitivity tests
│   └── CulturalBadge.test.jsx
├── accessibility/               # WCAG 2.1 AA compliance tests
│   └── AuthForm.test.jsx
├── api/                        # API integration tests
│   └── supabase.test.js
├── auth/                       # Authentication tests
├── components/                 # Component unit tests
└── ...
```

## 🌍 Cultural Sensitivity Testing

### **What We Test**
- **Dietary Restrictions**: Halal, Kosher, Vegetarian, Vegan, Gluten-Free
- **Cuisine Types**: American, Mexican, Chinese, Indian, Middle Eastern, etc.
- **Languages**: English, Spanish, Arabic, Chinese, Hindi, French
- **Cultural Colors**: Avoiding red/white combinations, using earth tones
- **RTL Support**: Arabic, Hebrew text direction

### **Example Test**
```javascript
describe('Cultural Badge Tests', () => {
  it('should display halal badge with correct cultural styling', () => {
    render(<CulturalBadge type="halal" />)
    
    const badge = screen.getByRole('img', { name: /halal dietary requirement/i })
    expect(badge).toHaveTextContent('🌙 Halal')
    expect(badge).toHaveClass('cultural-badge-halal')
  })
})
```

### **Running Cultural Tests**
```bash
# Run all cultural sensitivity tests
npm run test:cultural

# Test specific cultural contexts
npm run test:cultural -- --grep "halal"
npm run test:cultural -- --grep "arabic"
```

## ♿ Accessibility Testing

### **WCAG 2.1 AA Requirements We Test**
- **Color Contrast**: 4.5:1 for normal text, 3:1 for large text
- **Keyboard Navigation**: Tab order, focus management
- **Screen Reader Support**: ARIA labels, semantic HTML
- **Touch Targets**: 44px minimum size
- **Focus Indicators**: Visible focus states
- **High Contrast Mode**: Visibility in high contrast
- **Reduced Motion**: Respecting motion preferences

### **Example Test**
```javascript
describe('Accessibility Tests', () => {
  it('should support keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<AuthForm />)
    
    await user.tab()
    expect(screen.getByLabelText(/email/i)).toHaveFocus()
    
    await user.tab()
    expect(screen.getByLabelText(/password/i)).toHaveFocus()
  })
})
```

### **Running Accessibility Tests**
```bash
# Run all accessibility tests
npm run test:accessibility

# Test specific accessibility features
npm run test:accessibility -- --grep "keyboard"
npm run test:accessibility -- --grep "screen reader"
```

## 🔌 API Integration Testing

### **APIs We Test**
- **Supabase**: Authentication, database operations, real-time subscriptions
- **OpenAI ChatGPT-5**: Meal planning and budget optimization
- **Kroger Catalog**: Real-time grocery pricing
- **Spoonacular**: Recipe database and nutrition
- **ElevenLabs**: Text-to-speech for accessibility

### **Example Test**
```javascript
describe('Supabase API Tests', () => {
  it('should create user profile with cultural preferences', async () => {
    const result = await createUserProfile('user-id', {
      primary_language: 'es',
      primary_cuisine: 'mexican',
      dietary_restrictions: ['halal', 'dairy_free']
    })
    
    expect(result.data.primary_language).toBe('es')
    expect(result.data.dietary_restrictions).toContain('halal')
  })
})
```

### **Running API Tests**
```bash
# Run all API integration tests
npm run test:api

# Test specific APIs
npm run test:api -- --grep "supabase"
npm run test:api -- --grep "openai"
```

## 🛠️ Test Configuration Files

### **vitest.config.js** - Main test configuration
- Global test setup
- Coverage reporting
- Path aliases

### **vitest.cultural.config.js** - Cultural testing
- Multi-language test scenarios
- Cultural context utilities
- Dietary restriction testing

### **vitest.a11y.config.js** - Accessibility testing
- Screen reader simulation
- Keyboard navigation testing
- WCAG compliance validation

### **vitest.api.config.js** - API testing
- API mocking utilities
- Network error simulation
- Rate limiting scenarios

## 📊 Coverage Requirements

### **Minimum Coverage Targets**
- **Overall**: 80% line coverage
- **Cultural Components**: 90% coverage
- **Accessibility Features**: 95% coverage
- **Authentication**: 85% coverage
- **API Services**: 80% coverage

### **Coverage Reports**
```bash
# Generate coverage report
npm run test:coverage

# View HTML coverage report
open coverage/index.html
```

## 🔧 Test Utilities

### **Global Test Utilities**
```javascript
// Mock user profiles for different cultures
global.testUtils.mockUserProfiles.spanish
global.testUtils.mockUserProfiles.arabic

// Mock recipes for different cuisines
global.testUtils.mockRecipes.mexican
global.testUtils.mockRecipes.middle_eastern
```

### **Cultural Test Utilities**
```javascript
// Test different cultural contexts
global.culturalTestUtils.testCulturalContexts
global.culturalTestUtils.dietaryRestrictions
global.culturalTestUtils.setTestLanguage('ar')
```

### **Accessibility Test Utilities**
```javascript
// Simulate accessibility preferences
global.accessibilityTestUtils.simulateAccessibilityPreference('contrast', 'high')
global.accessibilityTestUtils.keyboard.tab
global.accessibilityTestUtils.getFocusableElements(container)
```

### **API Test Utilities**
```javascript
// Mock API responses
global.apiTestUtils.mockSuccessResponse(data)
global.apiTestUtils.mockErrorResponse(error, 500)
global.apiTestUtils.mockNetworkError()
```

## 🎯 Best Practices

### **Writing Cultural Tests**
1. **Test all supported languages** (en, es, ar, zh, hi, fr)
2. **Verify dietary restrictions** work correctly
3. **Check RTL language support** for Arabic/Hebrew
4. **Validate cultural color schemes** avoid red/white
5. **Test cuisine type handling** across cultures

### **Writing Accessibility Tests**
1. **Test keyboard navigation** for all interactive elements
2. **Verify ARIA labels** are present and correct
3. **Check focus management** and tab order
4. **Test screen reader announcements**
5. **Validate color contrast** meets WCAG standards

### **Writing API Tests**
1. **Mock all external APIs** to avoid rate limits
2. **Test error scenarios** and edge cases
3. **Verify cultural data** is handled correctly
4. **Test authentication flows** with cultural preferences
5. **Check real-time subscriptions** work properly

## 🚨 Common Issues & Solutions

### **Cultural Testing Issues**
```javascript
// ❌ Wrong: Not testing all languages
expect(badge).toHaveTextContent('Halal')

// ✅ Correct: Testing multiple languages
global.culturalTestUtils.supportedLanguages.forEach(lang => {
  global.culturalTestUtils.setTestLanguage(lang)
  // Test in each language
})
```

### **Accessibility Testing Issues**
```javascript
// ❌ Wrong: Not testing keyboard navigation
fireEvent.click(button)

// ✅ Correct: Testing keyboard interaction
await user.keyboard('{Enter}')
```

### **API Testing Issues**
```javascript
// ❌ Wrong: Making real API calls
const result = await fetch('https://api.openai.com/...')

// ✅ Correct: Using mocked responses
global.apiTestUtils.mockSuccessResponse(mockData)
const result = await openaiService.generateMealPlan()
```

## 📈 Continuous Integration

### **GitHub Actions Integration**
```yaml
# .github/workflows/test.yml
- name: Run Cultural Tests
  run: npm run test:cultural

- name: Run Accessibility Tests
  run: npm run test:accessibility

- name: Run API Tests
  run: npm run test:api

- name: Check Coverage
  run: npm run test:coverage
```

## 🎉 Success Metrics

### **Cultural Inclusivity**
- ✅ All dietary restrictions properly tested
- ✅ Multi-language support verified
- ✅ Cultural color schemes validated
- ✅ RTL language support confirmed

### **Accessibility Compliance**
- ✅ WCAG 2.1 AA standards met
- ✅ Screen reader compatibility verified
- ✅ Keyboard navigation working
- ✅ High contrast mode supported

### **API Reliability**
- ✅ All API integrations tested
- ✅ Error handling verified
- ✅ Cultural data properly handled
- ✅ Real-time features working

Your PlateWise application now has comprehensive testing that ensures cultural inclusivity, accessibility compliance, and robust API integration! 🌍♿🔌