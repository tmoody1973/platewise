import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { AuthProvider } from './context/AuthContext.jsx'

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

import { useAuth } from './context/AuthContext.jsx'
import AuthForm from './components/auth/AuthForm.jsx'

// Temporary welcome component
const WelcomePage = () => {
  const { isAuthenticated, user, profile, loading } = useAuth()
  const [authMode, setAuthMode] = React.useState('signin')

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-green to-primary-blue flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading PlateWise...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-green to-primary-blue flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          {/* Welcome Content */}
          <div className="text-center lg:text-left text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 font-primary">
              Welcome to PlateWise
            </h1>
            <p className="text-xl lg:text-2xl mb-8 font-secondary">
              AI-Driven Food Budget Management Platform for Community Organizations
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-bento p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">🌍 Culturally Inclusive Features</h2>
              <ul className="text-left space-y-2">
                <li>🌙 Halal & Kosher meal planning</li>
                <li>🥬 Vegetarian & Vegan options</li>
                <li>🗣️ Multi-language support</li>
                <li>💰 Smart budget optimization</li>
                <li>🤖 AI-powered recommendations</li>
                <li>♿ Full accessibility compliance</li>
              </ul>
            </div>
            <p className="text-sm opacity-80">
              Built with ❤️ using Kiro IDE for the Code with Kiro Hackathon
            </p>
          </div>

          {/* Auth Form */}
          <div className="w-full">
            <AuthForm 
              mode={authMode}
              onSuccess={() => {
                // Will redirect to dashboard once user is authenticated
                console.log('Authentication successful!')
              }}
              onModeChange={setAuthMode}
            />
          </div>
        </div>
      </div>
    )
  }

  // Authenticated user dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-green to-primary-blue flex items-center justify-center">
      <div className="text-center text-white p-8">
        <h1 className="text-5xl font-bold mb-4 font-primary">
          Welcome back, {profile?.display_name || user?.email}!
        </h1>
        <p className="text-xl mb-8 font-secondary max-w-2xl">
          Your culturally-inclusive food budget management dashboard
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-bento p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4">🎉 Supabase Connected!</h2>
          <ul className="text-left space-y-2">
            <li>✅ User authenticated</li>
            <li>✅ Profile loaded</li>
            <li>✅ Database connected</li>
            <li>✅ Cultural preferences saved</li>
            <li>✅ Ready for feature development</li>
          </ul>
          <div className="mt-4 p-3 bg-white/20 rounded-lg text-sm">
            <p><strong>Language:</strong> {profile?.primary_language || 'en'}</p>
            <p><strong>Cuisine:</strong> {profile?.primary_cuisine || 'american'}</p>
            <p><strong>Family Size:</strong> {profile?.family_size || 1}</p>
          </div>
        </div>
        <button 
          onClick={() => {
            import('./services/supabase/auth.js').then(({ signOut }) => signOut())
          }}
          className="mt-6 btn-outline text-white border-white hover:bg-white hover:text-primary-blue"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
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
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App