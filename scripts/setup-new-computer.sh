#!/bin/bash

# PlateWise New Computer Setup Script
# Run this script after cloning the repository on your new computer

set -e

echo "🚀 PlateWise New Computer Setup"
echo "=============================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the PlateWise project root directory"
    exit 1
fi

print_status "Setting up PlateWise development environment..."

# Step 1: Install dependencies
print_status "Installing Node.js dependencies..."
if npm install; then
    print_success "Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Step 2: Check for environment file
if [ ! -f ".env.local" ]; then
    print_warning "No .env.local file found"
    print_status "Creating .env.local from template..."
    cp .env.example .env.local
    print_warning "Please edit .env.local and add your actual API keys"
    print_status "You'll need to add:"
    echo "  - Supabase URL and keys"
    echo "  - OpenAI API key"
    echo "  - Kroger, Spoonacular, Edamam, ElevenLabs API keys"
else
    print_success ".env.local file already exists"
fi

# Step 3: Check Supabase CLI
print_status "Checking Supabase CLI..."
if command -v supabase &> /dev/null; then
    print_success "Supabase CLI is installed"
    print_status "To link to your Supabase project, run:"
    echo "  supabase login"
    echo "  supabase link --project-ref vqelybuoijeevppccknh"
else
    print_warning "Supabase CLI not found"
    print_status "Install with: brew install supabase/tap/supabase"
fi

# Step 4: Test the setup
print_status "Testing the development setup..."
if npm run lint; then
    print_success "Linting passed"
else
    print_warning "Linting issues found - check your code"
fi

# Step 5: Verify project structure
print_status "Verifying project structure..."
required_dirs=(".kiro/steering" "src/components" "src/services" "supabase")
for dir in "${required_dirs[@]}"; do
    if [ -d "$dir" ]; then
        print_success "✓ $dir directory exists"
    else
        echo "❌ Missing directory: $dir"
    fi
done

# Step 6: Check Git configuration
print_status "Checking Git configuration..."
if git config user.name &> /dev/null && git config user.email &> /dev/null; then
    print_success "Git is configured"
    print_status "User: $(git config user.name) <$(git config user.email)>"
else
    print_warning "Git user not configured"
    print_status "Configure with:"
    echo "  git config --global user.name 'Your Name'"
    echo "  git config --global user.email 'your.email@example.com'"
fi

echo ""
print_success "🎉 PlateWise setup complete!"
echo "=============================="
print_status "Next steps:"
echo "  1. Edit .env.local with your API keys"
echo "  2. Run 'supabase login' and link your project"
echo "  3. Start development with 'npm run dev'"
echo "  4. Test everything with 'npm run deploy:simulate'"
echo ""
print_status "Your culturally-inclusive food budget management platform is ready! 🌍🍽️"