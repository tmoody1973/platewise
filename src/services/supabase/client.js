import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.'
  )
}

// Create Supabase client with cultural-inclusive configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Enable automatic token refresh
    autoRefreshToken: true,
    // Persist session in localStorage
    persistSession: true,
    // Detect session from URL on redirect
    detectSessionInUrl: true,
    // Custom redirect URL for cultural-specific flows
    redirectTo: `${window.location.origin}/auth/callback`,
  },
  // Real-time configuration for live updates
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
  // Global configuration
  global: {
    headers: {
      'X-Client-Info': 'platewise-web@1.0.0',
    },
  },
})

// Helper function to get current user profile
export const getCurrentUserProfile = async () => {
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    return { user: null, profile: null, error: authError }
  }

  const { data: profile, error: profileError } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return { user, profile, error: profileError }
}

// Helper function to create user profile after signup
export const createUserProfile = async (userId, profileData) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert([
      {
        id: userId,
        ...profileData,
      },
    ])
    .select()
    .single()

  return { data, error }
}

// Helper function to update user profile
export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  return { data, error }
}

// Helper function for cultural-sensitive error handling
export const handleSupabaseError = (error, language = 'en') => {
  if (!error) return null

  // Error messages in multiple languages
  const errorMessages = {
    en: {
      'Invalid login credentials': 'Invalid email or password. Please try again.',
      'Email not confirmed': 'Please check your email and click the confirmation link.',
      'User already registered': 'An account with this email already exists.',
      'Password should be at least 6 characters': 'Password must be at least 6 characters long.',
    },
    es: {
      'Invalid login credentials': 'Email o contraseña inválidos. Por favor, inténtalo de nuevo.',
      'Email not confirmed': 'Por favor, revisa tu email y haz clic en el enlace de confirmación.',
      'User already registered': 'Ya existe una cuenta con este email.',
      'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres.',
    },
    ar: {
      'Invalid login credentials': 'بيانات اعتماد تسجيل الدخول غير صحيحة. يرجى المحاولة مرة أخرى.',
      'Email not confirmed': 'يرجى التحقق من بريدك الإلكتروني والنقر على رابط التأكيد.',
      'User already registered': 'يوجد حساب بهذا البريد الإلكتروني بالفعل.',
      'Password should be at least 6 characters': 'يجب أن تكون كلمة المرور 6 أحرف على الأقل.',
    },
  }

  const messages = errorMessages[language] || errorMessages.en
  return messages[error.message] || error.message
}

export default supabase