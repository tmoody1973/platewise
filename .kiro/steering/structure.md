# Project Structure

## Directory Organization

```
.
├── .kiro/                          # Kiro AI assistant configuration
│   ├── settings/                   # MCP and other Kiro settings
│   │   └── mcp.json               # MCP server configurations
│   ├── steering/                   # AI guidance documents
│   │   ├── product.md             # PlateWise product overview
│   │   ├── tech.md                # Technology stack and APIs
│   │   ├── structure.md           # This file - project organization
│   │   └── platewise-design-system-prompt.md  # Design system guidelines
│   └── specs/                      # Feature specifications
│       └── [feature-name]/         # Individual feature specs
│           ├── requirements.md     # EARS format requirements
│           ├── design.md          # Technical design document
│           └── tasks.md           # Implementation task list
├── public/                        # Static assets (Vite)
│   ├── index.html                # Main HTML template
│   ├── favicon.ico               # App favicon
│   └── assets/                   # Public images and icons
├── src/                           # Source code (React + Vite)
│   ├── components/                # Reusable UI components
│   │   ├── bento/                # Bento-style layout components
│   │   ├── cultural/             # Cultural-specific components
│   │   ├── accessibility/        # Accessibility-focused components
│   │   └── auth/                 # Authentication components
│   ├── pages/                     # Main app pages/routes
│   │   ├── auth/                 # Login, signup, password reset
│   │   ├── budget/               # Budget management pages
│   │   ├── meal-planning/        # Meal planning interface
│   │   ├── recipes/              # Recipe browsing and details
│   │   └── profile/              # User preferences and settings
│   ├── services/                  # API integration services
│   │   ├── supabase/             # Supabase client and auth
│   │   ├── kroger/               # Kroger Catalog API
│   │   ├── spoonacular/          # Recipe and nutrition API
│   │   ├── edamam/               # Additional nutrition API
│   │   ├── elevenlabs/           # Text-to-speech API
│   │   └── openai/               # OpenAI ChatGPT-5 API
│   ├── utils/                     # Utility functions
│   │   ├── cultural/             # Cultural adaptation helpers
│   │   ├── accessibility/        # Accessibility utilities
│   │   └── pricing/              # Price comparison logic
│   ├── assets/                    # Images, fonts, cultural icons
│   │   ├── images/               # App imagery
│   │   ├── fonts/                # Inter, Noto Sans fonts
│   │   └── cultural/             # Cultural symbols and badges
│   ├── styles/                    # Tailwind CSS and design system
│   │   ├── globals.css           # Global styles and Tailwind imports
│   │   ├── components.css        # Custom component styles with @apply
│   │   └── utilities.css         # Custom utility classes
│   ├── hooks/                     # Custom React hooks
│   ├── context/                   # React context providers
│   ├── App.jsx                    # Main App component
│   └── main.jsx                   # Vite entry point
├── supabase/                      # Supabase configuration
│   ├── migrations/               # Database migration files
│   ├── functions/                # Edge functions
│   └── config.toml               # Supabase project configuration
├── tests/                         # Test suites
│   ├── cultural/                 # Cultural sensitivity tests
│   ├── accessibility/            # WCAG compliance tests
│   ├── api/                      # API integration tests
│   └── auth/                     # Authentication tests
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── vite.config.js                # Vite configuration
├── package.json                  # Dependencies and scripts
└── .vscode/                      # VSCode workspace settings
    └── settings.json             # Editor configuration
```

## Key Directories

### `.kiro/specs/`
- **Purpose**: Feature specifications using Kiro's spec-driven development
- **Structure**: Each feature has requirements, design, and tasks documents
- **Workflow**: Requirements → Design → Implementation planning

### `src/components/`
- **bento/**: Grid layouts, cards, and compartmentalized UI elements
- **cultural/**: Badges, dietary indicators, language-specific components
- **accessibility/**: Screen reader support, keyboard navigation, high contrast

### `src/pages/`
- **Route-based organization**: Each major feature has its own page directory
- **Responsive layouts**: Mobile-first design that scales to desktop
- **Progressive enhancement**: Core functionality works without JavaScript

### `src/services/`
- **Supabase Integration**: Database operations, authentication, and real-time subscriptions
- **API Integration**: Separate service files for each external API
- **AI Integration**: OpenAI ChatGPT-5 service for meal planning and recommendations
- **Error Handling**: Consistent error handling across all API calls
- **Caching**: Implement caching for pricing and recipe data

### `src/utils/cultural/`
- **Language Detection**: Automatic language preference detection
- **Cultural Adaptation**: Ingredient substitution suggestions
- **Dietary Filtering**: Halal, kosher, vegetarian, vegan filtering logic

## File Naming Conventions
- **Components**: PascalCase (e.g., `BentoCard.jsx`, `CulturalBadge.jsx`)
- **Pages**: PascalCase (e.g., `BudgetDashboard.jsx`, `RecipeSearch.jsx`)
- **Services**: camelCase (e.g., `krogerApi.js`, `openaiService.js`)
- **Utilities**: camelCase with descriptive names (e.g., `culturalHelpers.js`)
- **Styles**: kebab-case CSS files (e.g., `globals.css`, `components.css`)
- **Tailwind Classes**: Use semantic class names with @apply directive
- **Specs**: kebab-case directories (e.g., `meal-planning-system/`)
- **Tests**: Match source file names with `.test.js` suffix

## Organization Principles
- **Cultural Sensitivity**: Separate cultural logic for easy maintenance and testing
- **API Separation**: Each external API has its own service module
- **Database Security**: Use Supabase RLS policies for secure data access
- **Authentication Flow**: Centralized auth logic with Supabase Auth
- **Accessibility First**: Dedicated directories for accessibility features
- **Spec-Driven**: Use Kiro specs for complex feature development
- **Component Reusability**: Bento-style components designed for reuse
- **Multilingual Support**: Structure supports easy addition of new languages
- **Progressive Web App**: Optimized for web performance and mobile experience
- **Vite Optimization**: Leverage Vite's fast build and hot reload capabilities

## Development Workflow
1. **Feature Planning**: Reference comprehensive feature checklist for scope
2. **Spec Creation**: Use `.kiro/specs/` for complex feature planning
3. **Priority Assessment**: Follow 🔴 Critical → 🟡 Important → 🟢 Nice-to-Have
4. **Cultural Review**: Test all features with diverse user scenarios
5. **Accessibility Testing**: Validate WCAG 2.1 AA compliance
6. **API Integration**: Implement and test each API service independently
7. **Design System**: Follow bento layout and cultural design guidelines

## Feature Categories & File Organization
- **Core Infrastructure** → `/src/core/`, `/tests/infrastructure/`, `/supabase/`
- **User Management** → `/src/pages/auth/`, `/src/components/auth/`, `/src/services/supabase/`
- **Budget System** → `/src/pages/budget/`, `/src/services/supabase/`
- **Recipe Features** → `/src/pages/recipes/`, `/src/pages/meal-planning/`
- **Shopping Features** → `/src/pages/shopping/`, `/src/services/`
- **Cultural Features** → `/src/components/cultural/`, `/src/utils/cultural/`
- **Community Features** → `/src/pages/community/`, `/src/services/supabase/`

## Progress Tracking
- Use feature checklist to track development progress
- Mark completed features with ✅ in checklist
- Document any feature modifications or scope changes
- Regular progress reviews against hackathon timeline