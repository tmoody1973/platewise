-- PlateWise Initial Database Schema
-- Cultural-inclusive food budget management platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types for cultural preferences
CREATE TYPE dietary_restriction AS ENUM (
  'halal',
  'kosher', 
  'vegetarian',
  'vegan',
  'gluten_free',
  'dairy_free',
  'nut_free',
  'organic',
  'none'
);

CREATE TYPE cuisine_type AS ENUM (
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
  'other'
);

CREATE TYPE language_code AS ENUM (
  'en', -- English
  'es', -- Spanish
  'ar', -- Arabic
  'zh', -- Chinese
  'hi', -- Hindi
  'fr', -- French
  'pt', -- Portuguese
  'ru', -- Russian
  'ja', -- Japanese
  'ko'  -- Korean
);

-- Users table (extends Supabase auth.users)
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Basic profile information
  display_name TEXT,
  family_size INTEGER DEFAULT 1 CHECK (family_size > 0),
  location TEXT, -- City, State format
  
  -- Cultural preferences
  primary_language language_code DEFAULT 'en',
  secondary_languages language_code[] DEFAULT '{}',
  primary_cuisine cuisine_type DEFAULT 'american',
  secondary_cuisines cuisine_type[] DEFAULT '{}',
  dietary_restrictions dietary_restriction[] DEFAULT '{}',
  
  -- Budget settings
  monthly_budget DECIMAL(10,2) CHECK (monthly_budget >= 0),
  currency_code TEXT DEFAULT 'USD',
  
  -- Accessibility preferences
  enable_text_to_speech BOOLEAN DEFAULT FALSE,
  high_contrast_mode BOOLEAN DEFAULT FALSE,
  large_text_mode BOOLEAN DEFAULT FALSE,
  
  -- Privacy settings
  share_recipes BOOLEAN DEFAULT TRUE,
  public_profile BOOLEAN DEFAULT FALSE
);

-- Budget categories table
CREATE TABLE public.budget_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  name TEXT NOT NULL,
  allocated_amount DECIMAL(10,2) NOT NULL CHECK (allocated_amount >= 0),
  spent_amount DECIMAL(10,2) DEFAULT 0 CHECK (spent_amount >= 0),
  category_order INTEGER DEFAULT 0,
  
  UNIQUE(user_id, name)
);

-- Expenses table
CREATE TABLE public.expenses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.budget_categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
  description TEXT NOT NULL,
  store_name TEXT,
  receipt_url TEXT, -- For receipt image storage
  expense_date DATE DEFAULT CURRENT_DATE,
  
  -- Cultural context
  cuisine_type cuisine_type,
  dietary_tags dietary_restriction[] DEFAULT '{}'
);

-- Recipes table (user favorites and custom recipes)
CREATE TABLE public.recipes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Recipe details
  title TEXT NOT NULL,
  description TEXT,
  instructions TEXT,
  prep_time_minutes INTEGER CHECK (prep_time_minutes >= 0),
  cook_time_minutes INTEGER CHECK (cook_time_minutes >= 0),
  servings INTEGER DEFAULT 4 CHECK (servings > 0),
  
  -- Cultural information
  cuisine_type cuisine_type NOT NULL,
  dietary_restrictions dietary_restriction[] DEFAULT '{}',
  cultural_notes TEXT,
  
  -- External API references
  spoonacular_id INTEGER,
  edamam_id TEXT,
  
  -- Cost and nutrition
  estimated_cost_per_serving DECIMAL(8,2),
  calories_per_serving INTEGER,
  
  -- User interaction
  is_favorite BOOLEAN DEFAULT FALSE,
  times_cooked INTEGER DEFAULT 0,
  user_rating INTEGER CHECK (user_rating >= 1 AND user_rating <= 5)
);

-- Recipe ingredients table
CREATE TABLE public.recipe_ingredients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  recipe_id UUID REFERENCES public.recipes(id) ON DELETE CASCADE,
  
  ingredient_name TEXT NOT NULL,
  amount DECIMAL(8,2),
  unit TEXT,
  notes TEXT,
  
  -- Cost tracking
  estimated_cost DECIMAL(8,2),
  
  ingredient_order INTEGER DEFAULT 0
);

-- Meal plans table
CREATE TABLE public.meal_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  title TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_estimated_cost DECIMAL(10,2),
  
  -- AI generation context
  generated_by_ai BOOLEAN DEFAULT FALSE,
  ai_prompt TEXT,
  
  CHECK (end_date >= start_date)
);

-- Meal plan items table
CREATE TABLE public.meal_plan_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  meal_plan_id UUID REFERENCES public.meal_plans(id) ON DELETE CASCADE,
  recipe_id UUID REFERENCES public.recipes(id) ON DELETE CASCADE,
  
  meal_date DATE NOT NULL,
  meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  servings INTEGER DEFAULT 1 CHECK (servings > 0),
  
  notes TEXT
);

-- Shopping lists table
CREATE TABLE public.shopping_lists (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  title TEXT NOT NULL,
  total_estimated_cost DECIMAL(10,2) DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  
  -- Generated from meal plan
  meal_plan_id UUID REFERENCES public.meal_plans(id) ON DELETE SET NULL
);

-- Shopping list items table
CREATE TABLE public.shopping_list_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  shopping_list_id UUID REFERENCES public.shopping_lists(id) ON DELETE CASCADE,
  
  item_name TEXT NOT NULL,
  quantity DECIMAL(8,2) DEFAULT 1,
  unit TEXT,
  estimated_price DECIMAL(8,2),
  actual_price DECIMAL(8,2),
  
  is_purchased BOOLEAN DEFAULT FALSE,
  store_name TEXT,
  notes TEXT,
  
  item_order INTEGER DEFAULT 0
);

-- Create Row Level Security (RLS) policies
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_plan_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shopping_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shopping_list_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for budget_categories
CREATE POLICY "Users can manage own budget categories" ON public.budget_categories
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for expenses
CREATE POLICY "Users can manage own expenses" ON public.expenses
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for recipes
CREATE POLICY "Users can manage own recipes" ON public.recipes
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view shared recipes" ON public.recipes
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = recipes.user_id AND share_recipes = TRUE
    )
  );

-- RLS Policies for recipe_ingredients
CREATE POLICY "Users can manage recipe ingredients" ON public.recipe_ingredients
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.recipes 
      WHERE id = recipe_ingredients.recipe_id AND user_id = auth.uid()
    )
  );

-- RLS Policies for meal_plans
CREATE POLICY "Users can manage own meal plans" ON public.meal_plans
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for meal_plan_items
CREATE POLICY "Users can manage meal plan items" ON public.meal_plan_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.meal_plans 
      WHERE id = meal_plan_items.meal_plan_id AND user_id = auth.uid()
    )
  );

-- RLS Policies for shopping_lists
CREATE POLICY "Users can manage own shopping lists" ON public.shopping_lists
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for shopping_list_items
CREATE POLICY "Users can manage shopping list items" ON public.shopping_list_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.shopping_lists 
      WHERE id = shopping_list_items.shopping_list_id AND user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_user_profiles_primary_language ON public.user_profiles(primary_language);
CREATE INDEX idx_user_profiles_primary_cuisine ON public.user_profiles(primary_cuisine);
CREATE INDEX idx_expenses_user_date ON public.expenses(user_id, expense_date);
CREATE INDEX idx_expenses_category ON public.expenses(category_id);
CREATE INDEX idx_recipes_cuisine_type ON public.recipes(cuisine_type);
CREATE INDEX idx_recipes_dietary_restrictions ON public.recipes USING GIN(dietary_restrictions);
CREATE INDEX idx_meal_plan_items_date ON public.meal_plan_items(meal_date);

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_budget_categories_updated_at BEFORE UPDATE ON public.budget_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_expenses_updated_at BEFORE UPDATE ON public.expenses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recipes_updated_at BEFORE UPDATE ON public.recipes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meal_plans_updated_at BEFORE UPDATE ON public.meal_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shopping_lists_updated_at BEFORE UPDATE ON public.shopping_lists
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();