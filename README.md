# PlateWise

## AI-Driven Food Budget Management Platform

PlateWise is a culturally-inclusive web application designed to empower families and individuals to make informed food purchasing decisions while maintaining their dietary preferences and cultural traditions. Built for the Code with Kiro Hackathon.

### 🌟 Key Features

- **Intelligent Budget Optimization**: Real-time grocery pricing via Kroger Catalog API
- **Cultural Inclusivity**: Multilingual support with culturally appropriate meal planning
- **AI-Powered Meal Planning**: OpenAI ChatGPT-5 API for personalized recommendations
- **Nutritional Analysis**: Comprehensive dietary tracking via Spoonacular and Edamam APIs
- **Accessibility**: ElevenLabs text-to-speech for multilingual recipe narration
- **Community Focus**: Special attention to immigrant families and food assistance organizations

### 🛠️ Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Supabase (Database, Auth, Real-time)
- **AI/ML**: OpenAI ChatGPT-5 API
- **APIs**: Kroger Catalog, Spoonacular, Edamam, ElevenLabs
- **Design System**: Bento-style layout with cultural sensitivity

### 🚀 Getting Started

#### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase CLI
- Git

#### Installation

1. Clone the repository:
```bash
git clone https://github.com/tmoody1973/platewise.git
cd platewise
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your API keys
```

4. Set up Supabase:
```bash
supabase init
supabase start
supabase db push
```

5. Start the development server:
```bash
npm run dev
```

### 📁 Project Structure

```
.
├── .kiro/                    # Kiro AI assistant configuration
├── public/                   # Static assets
├── src/                      # Source code
│   ├── components/           # Reusable UI components
│   ├── pages/               # Main app pages/routes
│   ├── services/            # API integration services
│   ├── utils/               # Utility functions
│   ├── styles/              # Tailwind CSS styles
│   └── hooks/               # Custom React hooks
├── supabase/                # Supabase configuration
└── tests/                   # Test suites
```

### 🌍 Cultural Inclusivity

PlateWise is designed with cultural sensitivity at its core:

- **Multilingual Support**: Interface available in multiple languages
- **Cultural Dietary Preferences**: Halal, Kosher, Vegetarian, Vegan options
- **Culturally Appropriate Colors**: Avoiding red/white combinations, using earth tones
- **RTL Language Support**: Proper layout for Arabic, Hebrew, and other RTL languages
- **Cultural Calendar Integration**: Religious holidays and cultural celebrations

### ♿ Accessibility

- **WCAG 2.1 AA Compliance**: All features meet accessibility standards
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast Mode**: Support for users with visual impairments
- **Text-to-Speech**: Recipe narration in multiple languages

### 🧪 Testing

```bash
# Run all tests
npm test

# Run cultural sensitivity tests
npm run test:cultural

# Run accessibility tests
npm run test:accessibility

# Run API integration tests
npm run test:api
```

### 📊 Development Progress

Track development progress using our comprehensive feature checklist:
- 🔴 Critical (MVP): Core functionality required for hackathon demo
- 🟡 Important: Enhanced features that improve user experience
- 🟢 Nice-to-Have: Advanced features for future development

See `.kiro/steering/PlateWise - Comprehensive Feature Checklist.md` for detailed progress tracking.

### 🤝 Contributing

This project is developed using Kiro IDE's spec-driven development approach:

1. **Feature Planning**: Reference the comprehensive feature checklist
2. **Spec Creation**: Use `.kiro/specs/` for complex feature planning
3. **Cultural Review**: Test all features with diverse user scenarios
4. **Accessibility Testing**: Validate WCAG 2.1 AA compliance

### 📝 License

This project is developed for the Code with Kiro Hackathon.

### 🏆 Hackathon Information

- **Event**: Code with Kiro Hackathon
- **Timeline**: August 9 - September 15, 2025
- **Focus**: Demonstrating Kiro IDE capabilities while addressing food insecurity
- **Social Impact**: Helping families make informed food budget decisions

### 📞 Support

For questions about PlateWise development or cultural sensitivity considerations, please refer to the steering documents in `.kiro/steering/`.

---

**Built with ❤️ using Kiro IDE for the Code with Kiro Hackathon**