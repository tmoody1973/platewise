import React, { useState } from 'react'
import { signIn, signUp, signInWithOAuth } from '../../services/supabase/auth.js'
import { useAuth } from '../../context/AuthContext.jsx'
import BentoCard from '../bento/BentoCard.jsx'

const AuthForm = ({ mode = 'signin', onSuccess, onModeChange }) => {
  const { getUserLanguage } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    primaryLanguage: 'en',
    primaryCuisine: 'american',
    familySize: 1,
    monthlyBudget: '',
    dietaryRestrictions: [],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox') {
      if (name === 'dietaryRestrictions') {
        setFormData(prev => ({
          ...prev,
          dietaryRestrictions: checked
            ? [...prev.dietaryRestrictions, value]
            : prev.dietaryRestrictions.filter(item => item !== value)
        }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (mode === 'signup') {
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match')
          setLoading(false)
          return
        }

        const { user, error: signUpError, needsEmailConfirmation } = await signUp(
          formData.email,
          formData.password,
          {
            display_name: formData.displayName,
            primary_language: formData.primaryLanguage,
            primary_cuisine: formData.primaryCuisine,
            family_size: parseInt(formData.familySize),
            monthly_budget: formData.monthlyBudget ? parseFloat(formData.monthlyBudget) : null,
            dietary_restrictions: formData.dietaryRestrictions,
          }
        )

        if (signUpError) {
          setError(signUpError)
        } else if (needsEmailConfirmation) {
          setSuccess('Please check your email and click the confirmation link to complete your registration.')
        } else {
          setSuccess('Account created successfully!')
          onSuccess?.(user)
        }
      } else {
        const { user, error: signInError } = await signIn(
          formData.email,
          formData.password,
          getUserLanguage()
        )

        if (signInError) {
          setError(signInError)
        } else {
          setSuccess('Signed in successfully!')
          onSuccess?.(user)
        }
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Auth error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthSignIn = async (provider) => {
    setLoading(true)
    setError('')

    const { error: oauthError } = await signInWithOAuth(provider)
    
    if (oauthError) {
      setError(oauthError)
      setLoading(false)
    }
    // OAuth redirect will handle the rest
  }

  const dietaryOptions = [
    { value: 'halal', label: '🌙 Halal' },
    { value: 'kosher', label: '✡️ Kosher' },
    { value: 'vegetarian', label: '🥬 Vegetarian' },
    { value: 'vegan', label: '🌱 Vegan' },
    { value: 'gluten_free', label: '🌾 Gluten-Free' },
    { value: 'dairy_free', label: '🥛 Dairy-Free' },
    { value: 'nut_free', label: '🥜 Nut-Free' },
  ]

  const cuisineOptions = [
    { value: 'american', label: 'American' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'indian', label: 'Indian' },
    { value: 'middle_eastern', label: 'Middle Eastern' },
    { value: 'african', label: 'African' },
    { value: 'european', label: 'European' },
    { value: 'asian', label: 'Asian' },
    { value: 'latin_american', label: 'Latin American' },
    { value: 'mediterranean', label: 'Mediterranean' },
  ]

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'ar', label: 'العربية' },
    { value: 'zh', label: '中文' },
    { value: 'hi', label: 'हिन्दी' },
    { value: 'fr', label: 'Français' },
  ]

  return (
    <BentoCard variant="cultural" size="lg" className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">
          {mode === 'signup' ? 'Join PlateWise' : 'Welcome Back'}
        </h2>
        <p className="text-neutral-600">
          {mode === 'signup' 
            ? 'Create your culturally-inclusive food budget account' 
            : 'Sign in to your PlateWise account'
          }
        </p>
      </div>

      {error && (
        <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-success/10 border border-success/20 text-success px-4 py-3 rounded-lg mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <>
            <div>
              <label className="form-label">Display Name</label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                className="form-input"
                required
                placeholder="How should we address you?"
              />
            </div>

            <div>
              <label className="form-label">Preferred Language</label>
              <select
                name="primaryLanguage"
                value={formData.primaryLanguage}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                {languageOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Primary Cuisine Preference</label>
              <select
                name="primaryCuisine"
                value={formData.primaryCuisine}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                {cuisineOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Family Size</label>
              <input
                type="number"
                name="familySize"
                value={formData.familySize}
                onChange={handleInputChange}
                className="form-input"
                min="1"
                max="20"
                required
              />
            </div>

            <div>
              <label className="form-label">Monthly Food Budget (Optional)</label>
              <input
                type="number"
                name="monthlyBudget"
                value={formData.monthlyBudget}
                onChange={handleInputChange}
                className="form-input"
                min="0"
                step="0.01"
                placeholder="e.g., 400.00"
              />
            </div>

            <div>
              <label className="form-label">Dietary Restrictions</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {dietaryOptions.map(option => (
                  <label key={option.value} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      name="dietaryRestrictions"
                      value={option.value}
                      checked={formData.dietaryRestrictions.includes(option.value)}
                      onChange={handleInputChange}
                      className="rounded border-neutral-300 text-primary-blue focus:ring-primary-blue"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
            required
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="form-input"
            required
            minLength="6"
            placeholder="At least 6 characters"
          />
        </div>

        {mode === 'signup' && (
          <div>
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="form-input"
              required
              minLength="6"
              placeholder="Confirm your password"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? 'Processing...' : (mode === 'signup' ? 'Create Account' : 'Sign In')}
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-neutral-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleOAuthSignIn('google')}
            disabled={loading}
            className="btn-outline w-full"
          >
            Google
          </button>
          <button
            type="button"
            onClick={() => handleOAuthSignIn('facebook')}
            disabled={loading}
            className="btn-outline w-full"
          >
            Facebook
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => onModeChange?.(mode === 'signup' ? 'signin' : 'signup')}
          className="text-primary-blue hover:text-primary-blue/80 text-sm"
        >
          {mode === 'signup' 
            ? 'Already have an account? Sign in' 
            : "Don't have an account? Sign up"
          }
        </button>
      </div>
    </BentoCard>
  )
}

export default AuthForm