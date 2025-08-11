import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChange, getCurrentSession } from '../services/supabase/auth.js'
import { getCurrentUserProfile } from '../services/supabase/client.js'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get current session
        const { session: currentSession, error: sessionError } = await getCurrentSession()
        
        if (sessionError) {
          setError(sessionError)
          setLoading(false)
          return
        }

        if (currentSession) {
          setSession(currentSession)
          setUser(currentSession.user)
          
          // Get user profile
          const { user: authUser, profile: userProfile, error: profileError } = await getCurrentUserProfile()
          
          if (profileError) {
            console.error('Error fetching user profile:', profileError)
            setError(profileError.message)
          } else {
            setProfile(userProfile)
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email)
      
      setSession(session)
      setUser(session?.user ?? null)
      setError(null)

      if (session?.user) {
        // Fetch user profile when user signs in
        const { profile: userProfile, error: profileError } = await getCurrentUserProfile()
        
        if (profileError) {
          console.error('Error fetching user profile:', profileError)
          setError(profileError.message)
          setProfile(null)
        } else {
          setProfile(userProfile)
        }
      } else {
        // Clear profile when user signs out
        setProfile(null)
      }

      setLoading(false)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  // Helper function to refresh user profile
  const refreshProfile = async () => {
    if (!user) return { profile: null, error: 'No authenticated user' }

    const { profile: userProfile, error: profileError } = await getCurrentUserProfile()
    
    if (profileError) {
      setError(profileError.message)
      return { profile: null, error: profileError.message }
    }

    setProfile(userProfile)
    return { profile: userProfile, error: null }
  }

  // Helper function to check if user has completed profile setup
  const isProfileComplete = () => {
    if (!profile) return false
    
    return !!(
      profile.display_name &&
      profile.primary_language &&
      profile.primary_cuisine &&
      profile.family_size &&
      profile.monthly_budget
    )
  }

  // Helper function to get user's preferred language
  const getUserLanguage = () => {
    return profile?.primary_language || 'en'
  }

  // Helper function to get user's cultural preferences
  const getCulturalPreferences = () => {
    if (!profile) return null

    return {
      primaryCuisine: profile.primary_cuisine,
      secondaryCuisines: profile.secondary_cuisines || [],
      dietaryRestrictions: profile.dietary_restrictions || [],
      primaryLanguage: profile.primary_language,
      secondaryLanguages: profile.secondary_languages || [],
    }
  }

  const value = {
    // Auth state
    user,
    profile,
    session,
    loading,
    error,
    
    // Helper functions
    refreshProfile,
    isProfileComplete,
    getUserLanguage,
    getCulturalPreferences,
    
    // Computed values
    isAuthenticated: !!user,
    isProfileSetupComplete: isProfileComplete(),
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}