# PlateWise Design System - AI Assistant Guidelines

## Overview
PlateWise is a culturally-inclusive food delivery platform using a **Bento-style layout system** with strong emphasis on cultural sensitivity, accessibility, and modern design. Always prioritize cultural inclusivity and accessibility in every design decision.

## Core Design Philosophy
- **Cultural Inclusivity First**: Every component must consider diverse cultural backgrounds
- **Accessibility Standard**: WCAG 2.1 AA compliance mandatory
- **Bento Organization**: Clean, compartmentalized layouts with distinct sections
- **Responsive Harmony**: Seamless experience across all devices
- **Visual Clarity**: Reduce cognitive load with clean, uncluttered design

## Color System (Tailwind CSS Configuration)
```js
// tailwind.config.js
module.exports = {
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
      }
    }
  }
}
```

## Typography System (Tailwind CSS)
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // Font Stack - Excellent multilingual support
        primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        secondary: ['Noto Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        // Type Scale (Tailwind default + custom)
        'xs': '0.75rem',     'sm': '0.875rem',    'base': '1rem',
        'lg': '1.125rem',    'xl': '1.25rem',     '2xl': '1.5rem',
        '3xl': '1.875rem',   '4xl': '2.25rem',    '5xl': '3rem',
        // Mobile Scale (responsive variants)
        'mobile-sm': ['1rem', { lineHeight: '1.5' }],
        'mobile-base': ['1.125rem', { lineHeight: '1.5' }],
        'mobile-lg': ['1.25rem', { lineHeight: '1.4' }],
      }
    }
  }
}
```

## Spacing System (Tailwind CSS - 4px Grid)
```js
// tailwind.config.js - Uses default Tailwind spacing + custom bento spacing
module.exports = {
  theme: {
    extend: {
      spacing: {
        // Bento-specific spacing
        'bento-gap-sm': '0.75rem',   // 12px - Mobile
        'bento-gap-md': '1rem',      // 16px - Tablet  
        'bento-gap-lg': '1.5rem',    // 24px - Desktop
      }
    }
  }
}

// Usage: gap-bento-gap-sm md:gap-bento-gap-md lg:gap-bento-gap-lg
```

## Bento Layout Patterns (Tailwind CSS)

### Standard Bento Grid
```jsx
// Component with Tailwind classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-bento-gap-sm md:gap-bento-gap-md lg:gap-bento-gap-lg">
  {/* Bento cards */}
</div>
```

### Bento Card Base
```jsx
// Tailwind CSS component classes
<div className="bg-white rounded-3xl p-6 shadow-lg border border-neutral-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
  {/* Card content */}
</div>
```

### Custom Component Styles (components.css)
```css
@layer components {
  .bento-grid {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-bento-gap-sm md:gap-bento-gap-md lg:gap-bento-gap-lg;
  }
  
  .bento-card {
    @apply bg-white rounded-3xl p-6 shadow-lg border border-neutral-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl;
  }
}
```

## Cultural Design Guidelines

### Color Usage Rules
- **AVOID**: Red (negative in some cultures), pure white backgrounds (death associations)
- **PREFER**: Earth tones, natural greens, warm oranges for food contexts
- **ALWAYS**: Test color combinations with diverse cultural groups

### Cultural Badge System
```jsx
// Standard cultural dietary badges
<CulturalBadge type="halal" />     // Green theme
<CulturalBadge type="kosher" />    // Blue theme  
<CulturalBadge type="vegetarian" /> // Emerald theme
<CulturalBadge type="vegan" />     // Lime theme
<CulturalBadge type="gluten-free" /> // Amber theme
```

### Iconography Standards
- Use universal food symbols: 🍽️ 🥗 🍜 🌮 🥘
- Avoid culturally specific religious symbols as primary elements
- Always provide text alternatives for icons
- Test icons with diverse user groups

## Component Standards

### Button Variants
```jsx
<Button variant="primary" />     // Primary blue
<Button variant="secondary" />   // Primary green  
<Button variant="cultural" />    // Cultural earth tone
<Button variant="outline" />     // Outlined style
```

### Layout Components
```jsx
<BentoGrid columns={{mobile: 1, tablet: 2, desktop: 3}}>
  <BentoCard variant="cultural" size="lg">
    {/* Chef profiles, cuisine features */}
  </BentoCard>
</BentoGrid>
```

## Accessibility Requirements (MANDATORY)

### Color & Contrast
- Minimum 4.5:1 contrast ratio for normal text
- Never use color alone to convey information
- Support high contrast mode

### Keyboard & Screen Readers
```jsx
// Always include proper ARIA labels and keyboard support
<button 
  aria-label="Order from Chef Ahmad - Halal Middle Eastern cuisine"
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
```

### Internationalization
```jsx
// Support RTL languages
<div dir={language === 'ar' ? 'rtl' : 'ltr'}>
// Account for 30% text expansion in translations
// Use Noto Sans for comprehensive character support
```

## Responsive Breakpoints
```css
--breakpoint-sm: 640px;    /* Mobile landscape */
--breakpoint-md: 768px;    /* Tablet portrait */
--breakpoint-lg: 1024px;   /* Desktop */
--breakpoint-xl: 1280px;   /* Large desktop */
```

## Food & Chef-Specific Guidelines

### Chef Profile Cards
- Always include cultural cuisine specialty
- Display dietary certifications prominently
- Use diverse, inclusive photography
- Include ratings and cultural authenticity indicators

### Cuisine Categories
- Represent cuisines authentically, avoid stereotypes
- Use appropriate cultural colors and symbols
- Include dietary restriction filters
- Show availability and variety counts

### Price Display
```jsx
<PriceDisplay 
  price={12.99} 
  currency="$" 
  showSavings={true}
  culturalContext="US" 
/>
```

## Animation & Interaction Standards
```css
/* Smooth, respectful animations */
.interactive {
  transition: all 0.2s ease-in-out;
}

/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .interactive { transition: none; }
}
```

## Implementation Notes for AI Assistants

1. **Always start with cultural sensitivity** - Consider how design choices affect different cultural groups
2. **Use Tailwind CSS classes** - Leverage the configured color palette and spacing system
3. **Follow the bento grid patterns** - Use `.bento-grid` and `.bento-card` component classes
4. **Include accessibility attributes** - Every interactive element needs proper ARIA labels
5. **Test responsive behavior** - Use Tailwind's responsive prefixes (sm:, md:, lg:, xl:)
6. **Use semantic HTML** - Proper heading hierarchy and landmark elements
7. **Include cultural badges** when displaying food items or chef profiles
8. **Support RTL languages** - Use Tailwind's `rtl:` prefix for RTL-specific styles
9. **Component-first approach** - Create reusable components with @apply directive
10. **Mobile-first responsive design** - Start with mobile classes, add larger breakpoints

## Example Usage Context
When building PlateWise components, think "culturally inclusive food delivery platform" where users from diverse backgrounds discover authentic cuisine from local chefs. Every design decision should welcome and include rather than exclude any cultural group.
