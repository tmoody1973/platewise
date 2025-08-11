#!/bin/bash

# PlateWise Deployment Script
# This script simulates the CI/CD pipeline locally for testing

set -e

echo "🚀 PlateWise Local Deployment Simulation"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Step 1: Code Quality Check
print_status "Step 1: Running code quality checks..."
if npm run lint; then
    print_success "Code quality checks passed ✅"
else
    print_error "Code quality checks failed ❌"
    exit 1
fi

# Step 2: Cultural Sensitivity Tests
print_status "Step 2: Running cultural sensitivity tests..."
if npm run test:cultural -- --run; then
    print_success "Cultural sensitivity tests passed ✅"
else
    print_error "Cultural sensitivity tests failed ❌"
    print_warning "Please ensure all dietary restrictions and languages are properly tested"
    exit 1
fi

# Step 3: Accessibility Compliance Tests
print_status "Step 3: Running accessibility compliance tests..."
if npm run test:accessibility -- --run; then
    print_success "Accessibility compliance tests passed ✅"
else
    print_error "Accessibility compliance tests failed ❌"
    print_warning "Please ensure WCAG 2.1 AA compliance is maintained"
    exit 1
fi

# Step 4: API Integration Tests
print_status "Step 4: Running API integration tests..."
if npm run test:api -- --run; then
    print_success "API integration tests passed ✅"
else
    print_error "API integration tests failed ❌"
    print_warning "Please check Supabase and external API integrations"
    exit 1
fi

# Step 5: Build Application
print_status "Step 5: Building application..."
if npm run build; then
    print_success "Application build successful ✅"
else
    print_error "Application build failed ❌"
    exit 1
fi

# Step 6: Generate Coverage Report
print_status "Step 6: Generating test coverage report..."
if npm run test:coverage; then
    print_success "Coverage report generated ✅"
    print_status "Coverage report available at: coverage/index.html"
else
    print_warning "Coverage report generation failed ⚠️"
fi

# Step 7: Security Check (if available)
print_status "Step 7: Running security checks..."
if command -v npm audit &> /dev/null; then
    if npm audit --audit-level moderate; then
        print_success "Security audit passed ✅"
    else
        print_warning "Security vulnerabilities detected ⚠️"
        print_status "Run 'npm audit fix' to resolve issues"
    fi
else
    print_warning "npm audit not available, skipping security check"
fi

# Final Summary
echo ""
echo "🎉 Local Deployment Simulation Complete!"
echo "========================================"
print_success "✅ Code quality checks passed"
print_success "✅ Cultural sensitivity tests passed"
print_success "✅ Accessibility compliance verified"
print_success "✅ API integration tests passed"
print_success "✅ Application build successful"
print_success "✅ Ready for deployment!"

echo ""
print_status "Next steps:"
echo "  1. Push to 'develop' branch for staging deployment"
echo "  2. Create PR to 'main' branch for production deployment"
echo "  3. Monitor GitHub Actions for automated deployment"
echo ""
print_status "Staging URL: https://platewise-staging.vercel.app"
print_status "Production URL: https://platewise.app"
echo ""
print_success "PlateWise is ready to serve culturally-inclusive food budget management! 🌍♿🍽️"