# Technology Stack

## Core Technologies
- **Frontend**: React + Vite for modern web application development
- **Styling**: Tailwind CSS for utility-first responsive design
- **Backend**: Supabase for database, authentication, and real-time features
- **Authentication**: Supabase Auth with social login support
- **AI/ML**: OpenAI ChatGPT-5 API for intelligent meal planning and budget optimization
- **APIs**: 
  - Kroger Catalog API for real-time grocery pricing
  - Spoonacular API for recipe database and nutritional analysis
  - Edamam API for additional nutritional data
  - ElevenLabs API for multilingual text-to-speech
- **Development Environment**: Kiro IDE with MCP integration
- **Design System**: Bento-style layout with cultural inclusivity focus

## Development Environment
- **IDE**: Kiro with AI-powered development capabilities
- **MCP Integration**: Enhanced tooling for API integration and testing
- **Spec-Driven Development**: Requirements → Design → Implementation workflow
- **Agent Hooks**: Automated workflow triggers for testing and deployment

## API Integration Requirements

### Backend & Database
- **Supabase**: PostgreSQL database with real-time subscriptions
- **Supabase Auth**: User authentication with email, social login (Google, Facebook)
- **Row Level Security**: Secure data access based on user permissions
- **Edge Functions**: Serverless functions for API integrations

### Kroger Catalog API
- Real-time grocery pricing data
- Product availability and location mapping
- Coupon and deal integration

### AI & Recipe APIs
- OpenAI ChatGPT-5: Intelligent meal planning, budget optimization, and personalized recommendations
- Spoonacular: Recipe search, meal planning, nutritional analysis
- Edamam: Additional nutritional data and dietary restriction filtering

### Accessibility APIs
- ElevenLabs: Multilingual text-to-speech for recipe narration
- Support for Spanish, Arabic, Mandarin, and other languages

## Common Commands

### Development Workflow
```bash
# Development server with Vite
npm run dev

# Build for production
npm run build

# Database migrations (Supabase)
supabase db reset
supabase db push

# Tailwind CSS utilities
npx tailwindcss -i ./src/styles/input.css -o ./src/styles/output.css --watch

# API testing and integration
npm run test:api

# Cultural testing
npm run test:i18n
npm run test:accessibility

# Preview production build
npm run preview
```

### Kiro-Specific Commands
- Use spec-driven development for feature planning
- Leverage agent hooks for automated testing
- Access cultural design guidelines via steering rules

## Design System Integration
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Bento Layout**: Grid-based, compartmentalized UI components using Tailwind Grid
- **Cultural Colors**: Custom Tailwind color palette avoiding red/white, preferring earth tones and greens
- **Typography**: Inter + Noto Sans fonts configured in Tailwind for multilingual support
- **Accessibility**: WCAG 2.1 AA compliance with RTL language support via Tailwind directives

## Development Timeline
- **Project Duration**: 37 days (August 9 - September 15, 2025)
- **Target**: Code with Kiro Hackathon submission
- **Milestone Tracking**: Use comprehensive feature checklist for progress monitoring

## Feature Implementation Priority
1. **Phase 1 (MVP - Weeks 1-3)**: Core infrastructure, user auth, basic budget tracking
2. **Phase 2 (Enhanced - Weeks 4-5)**: Recipe discovery, meal planning, shopping features
3. **Phase 3 (Advanced - Week 6)**: Cultural features, accessibility, community elements

## Quality Assurance Requirements
- **Unit Test Coverage**: >80% for all core functionality
- **Cross-Platform Testing**: iOS, Android, desktop browsers
- **Accessibility Testing**: WCAG 2.1 AA compliance validation
- **Cultural Testing**: Multi-language and cultural sensitivity validation
- **Performance Testing**: Optimize for lower-end devices

## Best Practices
- **Cultural Sensitivity**: Test all features with diverse user groups
- **API Efficiency**: Cache pricing data, optimize API calls
- **Database Security**: Use Supabase Row Level Security (RLS) for data protection
- **Real-time Features**: Leverage Supabase real-time subscriptions for live updates
- **Progressive Web App**: Implement PWA features for offline support and mobile-like experience
- **Performance**: Leverage Vite's fast build times and hot module replacement
- **Responsive Design**: Mobile-first approach that scales to desktop
- **Security**: Protect user dietary and financial information with Supabase Auth
- **Feature Tracking**: Use checklist to monitor development progress
- **Spec-Driven Development**: Create specs for complex features before implementation