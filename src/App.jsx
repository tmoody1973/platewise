import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

// Import pages (will be created later)
// import HomePage from './pages/HomePage'
// import BudgetDashboard from './pages/budget/BudgetDashboard'
// import RecipeSearch from './pages/recipes/RecipeSearch'
// import MealPlanning from './pages/meal-planning/MealPlanning'
// import Profile from './pages/profile/Profile'

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

// Temporary welcome component
const WelcomePage = () => (
  <div className="min-h-screen bg-gradient-to-br from-primary-green to-primary-blue flex items-center justify-center">
    <div className="text-center text-white p-8">
      <h1 className="text-5xl font-bold mb-4 font-primary">
        Welcome to PlateWise
      </h1>
      <p className="text-xl mb-8 font-secondary max-w-2xl">
        AI-Driven Food Budget Management Platform for Community Organizations
      </p>
      <div className="bg-white/10 backdrop-blur-sm rounded-bento p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">🚀 Development Environment Ready!</h2>
        <ul className="text-left space-y-2">
          <li>✅ React + Vite configured</li>
          <li>✅ Tailwind CSS with cultural design system</li>
          <li>✅ Project structure created</li>
          <li>✅ Bento-style components ready</li>
          <li>✅ Cultural inclusivity built-in</li>
          <li>✅ Accessibility standards enabled</li>
        </ul>
      </div>
      <p className="mt-6 text-sm opacity-80">
        Built with ❤️ using Kiro IDE for the Code with Kiro Hackathon
      </p>
    </div>
  </div>
)

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            {/* Future routes will be added here */}
            {/* <Route path="/budget" element={<BudgetDashboard />} />
            <Route path="/recipes" element={<RecipeSearch />} />
            <Route path="/meal-planning" element={<MealPlanning />} />
            <Route path="/profile" element={<Profile />} /> */}
          </Routes>
        </div>
      </Router>
      {/* React Query DevTools - only in development */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}

export default App