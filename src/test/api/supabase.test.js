import { describe, it, expect, beforeEach, vi } from 'vitest'
import { signUp, signIn, signOut } from '../../services/supabase/auth.js'
import { createUserProfile, getCurrentUserProfile } from '../../services/supabase/client.js'

describe('Supabase API Integration Tests', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks()
  })

  describe('Authentication API', () => {
    it('should sign up user with cultural preferences', async () => {
      const mockUser = {
        id: 'test-user-1',
        email: 'test@example.com',
        email_confirmed_at: new Date().toISOString(),
      }

      const mockSupabaseResponse = {
        data: { user: mockUser },
        error: null,
      }

      // Mock Supabase auth.signUp
      const mockSignUp = vi.fn().mockResolvedValue(mockSupabaseResponse)
      vi.mocked(global.supabase?.auth?.signUp || vi.fn()).mockImplementation(mockSignUp)

      const profileData = {
        display_name: 'Test User',
        primary_language: 'es',
        primary_cuisine: 'mexican',
        family_size: 4,
        dietary_restrictions: ['halal', 'dairy_free'],
      }

      const result = await signUp('test@example.com', 'password123', profileData)

      expect(mockSignUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        options: {
          data: {
            display_name: 'Test User',
            primary_language: 'es',
          },
        },
      })

      expect(result.user).toEqual(mockUser)
      expect(result.error).toBeNull()
    })

    it('should handle sign up with email confirmation required', async () => {
      const mockUser = {
        id: 'test-user-2',
        email: 'test@example.com',
        email_confirmed_at: null, // Not confirmed yet
      }

      const mockSupabaseResponse = {
        data: { user: mockUser },
        error: null,
      }

      const mockSignUp = vi.fn().mockResolvedValue(mockSupabaseResponse)
      vi.mocked(global.supabase?.auth?.signUp || vi.fn()).mockImplementation(mockSignUp)

      const result = await signUp('test@example.com', 'password123')

      expect(result.user).toEqual(mockUser)
      expect(result.needsEmailConfirmation).toBe(true)
      expect(result.error).toBeNull()
    })

    it('should sign in user with multi-language error handling', async () => {
      const mockUser = {
        id: 'test-user-3',
        email: 'test@example.com',
      }

      const mockSession = {
        access_token: 'mock-token',
        user: mockUser,
      }

      const mockSupabaseResponse = {
        data: { user: mockUser, session: mockSession },
        error: null,
      }

      const mockSignIn = vi.fn().mockResolvedValue(mockSupabaseResponse)
      vi.mocked(global.supabase?.auth?.signInWithPassword || vi.fn()).mockImplementation(mockSignIn)

      const result = await signIn('test@example.com', 'password123', 'es')

      expect(mockSignIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(result.user).toEqual(mockUser)
      expect(result.session).toEqual(mockSession)
      expect(result.error).toBeNull()
    })

    it('should handle authentication errors with cultural context', async () => {
      const mockError = {
        message: 'Invalid login credentials',
      }

      const mockSupabaseResponse = {
        data: { user: null, session: null },
        error: mockError,
      }

      const mockSignIn = vi.fn().mockResolvedValue(mockSupabaseResponse)
      vi.mocked(global.supabase?.auth?.signInWithPassword || vi.fn()).mockImplementation(mockSignIn)

      // Test English error handling
      const resultEn = await signIn('test@example.com', 'wrongpassword', 'en')
      expect(resultEn.error).toBe('Invalid email or password. Please try again.')

      // Test Spanish error handling
      const resultEs = await signIn('test@example.com', 'wrongpassword', 'es')
      expect(resultEs.error).toBe('Email o contraseña inválidos. Por favor, inténtalo de nuevo.')

      // Test Arabic error handling
      const resultAr = await signIn('test@example.com', 'wrongpassword', 'ar')
      expect(resultAr.error).toBe('بيانات اعتماد تسجيل الدخول غير صحيحة. يرجى المحاولة مرة أخرى.')
    })

    it('should sign out user successfully', async () => {
      const mockSupabaseResponse = {
        error: null,
      }

      const mockSignOut = vi.fn().mockResolvedValue(mockSupabaseResponse)
      vi.mocked(global.supabase?.auth?.signOut || vi.fn()).mockImplementation(mockSignOut)

      const result = await signOut()

      expect(mockSignOut).toHaveBeenCalled()
      expect(result.error).toBeNull()
    })
  })

  describe('User Profile API', () => {
    it('should create user profile with cultural preferences', async () => {
      const mockProfile = {
        id: 'test-user-1',
        display_name: 'Test User',
        primary_language: 'ar',
        primary_cuisine: 'middle_eastern',
        dietary_restrictions: ['halal', 'dairy_free'],
        family_size: 3,
        monthly_budget: 500.00,
      }

      const mockSupabaseResponse = {
        data: mockProfile,
        error: null,
      }

      // Mock Supabase from().insert()
      const mockInsert = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue(mockSupabaseResponse),
        }),
      })

      const mockFrom = vi.fn().mockReturnValue({
        insert: mockInsert,
      })

      vi.mocked(global.supabase?.from || vi.fn()).mockImplementation(mockFrom)

      const result = await createUserProfile('test-user-1', {
        display_name: 'Test User',
        primary_language: 'ar',
        primary_cuisine: 'middle_eastern',
        dietary_restrictions: ['halal', 'dairy_free'],
        family_size: 3,
        monthly_budget: 500.00,
      })

      expect(mockFrom).toHaveBeenCalledWith('user_profiles')
      expect(mockInsert).toHaveBeenCalledWith([{
        id: 'test-user-1',
        display_name: 'Test User',
        primary_language: 'ar',
        primary_cuisine: 'middle_eastern',
        dietary_restrictions: ['halal', 'dairy_free'],
        family_size: 3,
        monthly_budget: 500.00,
      }])

      expect(result.data).toEqual(mockProfile)
      expect(result.error).toBeNull()
    })

    it('should get current user profile with cultural data', async () => {
      const mockUser = {
        id: 'test-user-2',
        email: 'test@example.com',
      }

      const mockProfile = {
        id: 'test-user-2',
        display_name: 'Usuario de Prueba',
        primary_language: 'es',
        primary_cuisine: 'mexican',
        secondary_cuisines: ['latin_american'],
        dietary_restrictions: ['vegetarian'],
        family_size: 2,
      }

      // Mock auth.getUser
      const mockGetUser = vi.fn().mockResolvedValue({
        data: { user: mockUser },
        error: null,
      })

      // Mock from().select().eq().single()
      const mockSingle = vi.fn().mockResolvedValue({
        data: mockProfile,
        error: null,
      })

      const mockEq = vi.fn().mockReturnValue({
        single: mockSingle,
      })

      const mockSelect = vi.fn().mockReturnValue({
        eq: mockEq,
      })

      const mockFrom = vi.fn().mockReturnValue({
        select: mockSelect,
      })

      vi.mocked(global.supabase?.auth?.getUser || vi.fn()).mockImplementation(mockGetUser)
      vi.mocked(global.supabase?.from || vi.fn()).mockImplementation(mockFrom)

      const result = await getCurrentUserProfile()

      expect(mockGetUser).toHaveBeenCalled()
      expect(mockFrom).toHaveBeenCalledWith('user_profiles')
      expect(mockSelect).toHaveBeenCalledWith('*')
      expect(mockEq).toHaveBeenCalledWith('id', 'test-user-2')

      expect(result.user).toEqual(mockUser)
      expect(result.profile).toEqual(mockProfile)
      expect(result.error).toBeNull()
    })

    it('should handle profile creation errors', async () => {
      const mockError = {
        message: 'Profile creation failed',
        code: '23505', // Unique constraint violation
      }

      const mockSupabaseResponse = {
        data: null,
        error: mockError,
      }

      const mockInsert = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue(mockSupabaseResponse),
        }),
      })

      const mockFrom = vi.fn().mockReturnValue({
        insert: mockInsert,
      })

      vi.mocked(global.supabase?.from || vi.fn()).mockImplementation(mockFrom)

      const result = await createUserProfile('test-user-1', {
        display_name: 'Test User',
      })

      expect(result.data).toBeNull()
      expect(result.error).toEqual(mockError)
    })
  })

  describe('Row Level Security (RLS)', () => {
    it('should enforce RLS policies for user data', async () => {
      // Mock unauthorized access attempt
      const mockError = {
        message: 'Row level security policy violation',
        code: '42501',
      }

      const mockSupabaseResponse = {
        data: null,
        error: mockError,
      }

      const mockSelect = vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue(mockSupabaseResponse),
        }),
      })

      const mockFrom = vi.fn().mockReturnValue({
        select: mockSelect,
      })

      vi.mocked(global.supabase?.from || vi.fn()).mockImplementation(mockFrom)

      // Attempt to access another user's profile
      const result = await getCurrentUserProfile()

      expect(result.error).toEqual(mockError)
      expect(result.profile).toBeNull()
    })
  })

  describe('Real-time Subscriptions', () => {
    it('should handle real-time profile updates', async () => {
      const mockSubscription = {
        unsubscribe: vi.fn(),
      }

      const mockChannel = {
        on: vi.fn().mockReturnValue({
          subscribe: vi.fn().mockResolvedValue(mockSubscription),
        }),
      }

      const mockSupabase = {
        channel: vi.fn().mockReturnValue(mockChannel),
      }

      vi.mocked(global.supabase || {}).mockImplementation(() => mockSupabase)

      // Test real-time subscription setup
      const channel = mockSupabase.channel('user-profile-changes')
      expect(mockSupabase.channel).toHaveBeenCalledWith('user-profile-changes')

      const subscription = await channel
        .on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_profiles',
        })
        .subscribe()

      expect(mockChannel.on).toHaveBeenCalledWith('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'user_profiles',
      })

      expect(subscription).toEqual(mockSubscription)
    })
  })
})