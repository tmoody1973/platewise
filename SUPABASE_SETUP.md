# PlateWise Supabase Setup Guide

## 🚀 Complete Supabase Integration Setup

Your PlateWise development environment is configured with **hosted Supabase**! The setup is complete and ready for development.

### ✅ Setup Status: COMPLETE

- **✅ Hosted Supabase Project**: Connected to `vqelybuoijeevppccknh.supabase.co`
- **✅ Database Schema**: Applied with all cultural-inclusive tables
- **✅ Authentication**: Email/password and OAuth ready
- **✅ Environment Variables**: Configured in `.env.local`
- **✅ Row Level Security**: Enabled for data protection

### 🎯 Ready to Use

Your PlateWise application is now fully configured with:

```bash
# Your hosted Supabase configuration
VITE_SUPABASE_URL=https://vqelybuoijeevppccknh.supabase.co
VITE_SUPABASE_ANON_KEY=[configured]
SUPABASE_SERVICE_ROLE_KEY=[configured]
```

### 🚀 Start Development

```bash
# Start the development server
npm run dev

# Visit http://localhost:3000
# Test user registration with cultural preferences
```

## 🌐 Alternative: Local Development Setup

If you prefer local development with Docker:

### Step 1: Start Docker Desktop

1. **Install Docker Desktop** if not already installed:
   - Download from: https://docs.docker.com/desktop/
   - Install and start Docker Desktop

### Step 2: Start Supabase Local Development

```bash
# Start local Supabase instance
supabase start

# This will provide you with:
# - API URL: http://localhost:54321
# - Anon Key: [your-anon-key]
# - Service Role Key: [your-service-role-key]
# - Dashboard: http://localhost:54323
```

### Step 3: Update Environment Variables for Local

```bash
# Update these values in .env.local for local development
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=[paste-your-local-anon-key-here]
SUPABASE_SERVICE_ROLE_KEY=[paste-your-local-service-role-key-here]
```

### Step 5: Test the Connection

```bash
# Start the development server
npm run dev

# Visit http://localhost:3000
# Try creating an account to test the full flow
```

## 🌐 Production Setup (Optional)

For production deployment, create a Supabase project:

1. **Go to https://supabase.com**
2. **Create a new project**
3. **Get your project URL and keys**
4. **Update .env.local with production values**

## 📊 Database Schema Overview

PlateWise includes a comprehensive database schema with:

### Core Tables:
- **user_profiles**: Extended user information with cultural preferences
- **budget_categories**: Customizable budget categories
- **expenses**: Expense tracking with cultural context
- **recipes**: User recipes with cultural and dietary information
- **meal_plans**: AI-generated and user-created meal plans
- **shopping_lists**: Smart shopping lists with price tracking

### Cultural Features:
- **Multi-language support**: English, Spanish, Arabic, Chinese, Hindi, French
- **Dietary restrictions**: Halal, Kosher, Vegetarian, Vegan, Gluten-Free, etc.
- **Cuisine types**: American, Mexican, Chinese, Indian, Middle Eastern, etc.
- **Cultural calendar integration**: Religious holidays and cultural celebrations

### Security Features:
- **Row Level Security (RLS)**: Users can only access their own data
- **Authentication**: Email/password and OAuth (Google, Facebook)
- **Data encryption**: All sensitive data is encrypted

## 🔧 Troubleshooting

### Docker Issues:
```bash
# If Docker daemon isn't running
# Start Docker Desktop application

# If port conflicts occur
supabase stop
supabase start
```

### Database Issues:
```bash
# Reset database completely
supabase db reset

# Check migration status
supabase migration list
```

### Environment Issues:
```bash
# Verify environment variables are loaded
npm run dev
# Check browser console for any missing env var errors
```

## 🎯 Next Steps

Once Supabase is connected:

1. **Test user registration** with cultural preferences
2. **Verify profile creation** with dietary restrictions
3. **Test authentication flow** including OAuth
4. **Explore the database** via Supabase Dashboard (http://localhost:54323)
5. **Start building features** using the comprehensive feature checklist

## 📚 Useful Commands

```bash
# Supabase commands
supabase start          # Start local development
supabase stop           # Stop local development
supabase status         # Check service status
supabase db reset       # Reset database
supabase db push        # Apply migrations
supabase gen types      # Generate TypeScript types

# Development commands
npm run dev             # Start development server
npm run build           # Build for production
npm run test            # Run tests
```

Your PlateWise application is now ready for culturally-inclusive, AI-powered food budget management! 🎉