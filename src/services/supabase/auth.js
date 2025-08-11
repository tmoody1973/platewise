import { supabase, createUserProfile, handleSupabaseError } from './client.js'

// Sign up with email and password
export const signUp = async (email, password, profileData = {}) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: profileData.display_name || '',
          primary_language: profileData.primary_language || 'en',
        },
      },
    })

    if (error) {
      return { user: null, error: handleSupabaseError(error, profileData.primary_language) }
    }

    // Create user profile if signup successful
    if (data.user && !data.user.email_confirmed_at) {
      // User needs to confirm email first
      return { 
        user: data.user, 
        error: null,
        needsEmailConfirmation: true 
      }
    }

    if (data.user) {
      const { data: profile, error: profileError } = await createUserProfile(
        data.user.id,
        {
          display_name: profileData.display_name || '',
          primary_language: profileData.primary_language || 'en',
          primary_cuisine: profileData.primary_cuisine || 'american',
          family_size: profileData.family_size || 1,
          monthly_budget: profileData.monthly_budget || null,
          dietary_restrictions: profileData.dietary_restrictions || [],
        }
      )

      if (profileError) {
        console.error('Error creating user profile:', profileError)
      }

      return { user: data.user, profile, error: null }
    }

    return { user: null, error: 'Unknown error occurred during signup' }
  } catch (error) {
    console.error('Signup error:', error)
    return { user: null, error: error.message }
  }
}

// Sign in with email and password
export const signIn = async (email, password, language = 'en') => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { user: null, session: null, error: handleSupabaseError(error, language) }
    }

    return { user: data.user, session: data.session, error: null }
  } catch (error) {
    console.error('Sign in error:', error)
    return { user: null, session: null, error: error.message }
  }
}

// Sign in with OAuth (Google, Facebook, etc.)
export const signInWithOAuth = async (provider, options = {}) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        ...options,
      },
    })

    if (error) {
      return { error: error.message }
    }

    return { error: null }
  } catch (error) {
    console.error('OAuth sign in error:', error)
    return { error: error.message }
  }
}

// Sign out
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      return { error: error.message }
    }

    return { error: null }
  } catch (error) {
    console.error('Sign out error:', error)
    return { error: error.message }
  }
}

// Reset password
export const resetPassword = async (email, language = 'en') => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      return { error: handleSupabaseError(error, language) }
    }

    return { error: null }
  } catch (error) {
    console.error('Reset password error:', error)
    return { error: error.message }
  }
}

// Update password
export const updatePassword = async (newPassword) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      return { user: null, error: error.message }
    }

    return { user: data.user, error: null }
  } catch (error) {
    console.error('Update password error:', error)
    return { user: null, error: error.message }
  }
}

// Get current session
export const getCurrentSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      return { session: null, error: error.message }
    }

    return { session, error: null }
  } catch (error) {
    console.error('Get session error:', error)
    return { session: null, error: error.message }
  }
}

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session)
  })
}

// Refresh session
export const refreshSession = async () => {
  try {
    const { data, error } = await supabase.auth.refreshSession()
    
    if (error) {
      return { session: null, error: error.message }
    }

    return { session: data.session, error: null }
  } catch (error) {
    console.error('Refresh session error:', error)
    return { session: null, error: error.message }
  }
}