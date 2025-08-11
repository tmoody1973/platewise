import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AuthForm from '../../components/auth/AuthForm.jsx'
import { AuthProvider } from '../../context/AuthContext.jsx'

// Mock the auth context
const MockAuthProvider = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

describe('AuthForm - Accessibility Tests', () => {
  beforeEach(() => {
    // Clear any previous screen reader announcements
    global.mockScreenReader.clear()
  })

  describe('WCAG 2.1 AA Compliance', () => {
    it('should have proper heading hierarchy', () => {
      render(
        <MockAuthProvider>
          <AuthForm mode="signin" />
        </MockAuthProvider>
      )
      
      // Should have a main heading
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Welcome Back')
    })

    it('should have proper form labels', () => {
      render(
        <MockAuthProvider>
          <AuthForm mode="signin" />
        </MockAuthProvider>
      )
      
      // All form inputs should have labels
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      
      expect(emailInput).toBeInTheDocument()
      expect(passwordInput).toBeInTheDocument()
      
      // Labels should be properly associated
      expect(emailInput).toHaveAttribute('id')
      expect(passwordInput).toHaveAttribute('id')
    })

    it('should have proper button accessibility', () => {
      render(
        <MockAuthProvider>
          <AuthForm mode="signin" />
        </MockAuthProvider>
      )
      
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      expect(submitButton).toBeInTheDocument()
      expect(submitButton).toHaveAttribute('type', 'submit')
    })

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup()
      
      render(
        <MockAuthProvider>
          <AuthForm mode="signin" />
        </MockAuthProvider>
      )
      
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      // Should be able to tab through form elements
      await user.tab()
      expect(emailInput).toHaveFocus()
      
      await user.tab()
      expect(passwordInput).toHaveFocus()
      
      await user.tab()
      expect(submitButton).toHaveFocus()
    })

    it('should have proper focus indicators', async () => {
      const user = userEvent.setup()
      
      render(
        <MockAuthProvider>
          <AuthForm mode="signin" />
        </MockAuthProvider>
      )
      
      const emailInput = screen.getByLabelText(/email/i)
      
      await user.click(emailInput)
      expect(emailInput).toHaveFocus()
      
      // Should have visible focus indicator (tested via CSS class)
      expect(emailInput).toHaveClass('form-input')
    })
  })

  describe('Screen Reader Support', () => {
    it('should announce form errors to screen readers', async () => {
      const user = userEvent.setup()
      
      render(
        <MockAuthProvider>
          <AuthForm mode="signin" />
        </MockAuthProvider>
      )
      
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      // Submit form without filling required fields
      await user.click(submitButton)
      
      // Should have error message with proper ARIA attributes
      const errorMessage = await screen.findByRole('alert')
      if (errorMessage) {
        expect(errorMessage).toBeInTheDocument()
        expect(errorMessage).toHaveAttribute('aria-live', 'polite')
      }
    })

    it('should have proper ARIA labels for cultural preferences', () => {
      render(
        <MockAuthProvider>
          <AuthForm mode="signup" />
        </MockAuthProvider>
      )
      
      // Cultural preference selects should have proper labels
      const languageSelect = screen.getByLabelText(/preferred language/i)
      const cuisineSelect = screen.getByLabelText(/primary cuisine preference/i)
      
      expect(languageSelect).toBeInTheDocument()
      expect(cuisineSelect).toBeInTheDocument()
      
      // Should have proper ARIA attributes
      expect(languageSelect).toHaveAttribute('aria-required', 'true')
      expect(cuisineSelect).toHaveAttribute('aria-required', 'true')
    })

    it('should announce dietary restrictions properly', () => {
      render(
        <MockAuthProvider>
          <AuthForm mode="signup" />
        </MockAuthProvider>
      )
      
      // Dietary restriction checkboxes should have proper labels
      const halalCheckbox = screen.getByLabelText(/🌙 halal/i)
      const kosherCheckbox = screen.getByLabelText(/✡️ kosher/i)
      const vegetarianCheckbox = screen.getByLabelText(/🥬 vegetarian/i)
      
      expect(halalCheckbox).toBeInTheDocument()
      expect(kosherCheckbox).toBeInTheDocument()
      expect(vegetarianCheckbox).toBeInTheDocument()
      
      // Should have proper ARIA attributes
      expect(halalCheckbox).toHaveAttribute('type', 'checkbox')
      expect(kosherCheckbox).toHaveAttribute('type', 'checkbox')
      expect(vegetarianCheckbox).toHaveAttribute('type', 'checkbox')
    })
  })

  describe('High Contrast Mode Support', () => {
    it('should be visible in high contrast mode', () => {
      // Simulate high contrast mode
      global.accessibilityTestUtils.simulateAccessibilityPreference('contrast', 'high')
      
      render(
        <MockAuthProvider>
          <AuthForm mode="signin" />
        </MockAuthProvider>
      )
      
      const form = screen.getByRole('form')
      expect(form).toBeInTheDocument()
      
      // Form should maintain visibility in high contrast
      const styles = window.getComputedStyle(form)
      expect(styles.visibility).not.toBe('hidden')
    })

    it('should maintain cultural badge visibility in high contrast', () => {
      global.accessibilityTestUtils.simulateAccessibilityPreference('contrast', 'high')
      
      render(
        <MockAuthProvider>
          <AuthForm mode="signup" />
        </MockAuthProvider>
      )
      
      // Cultural badges should remain visible
      const dietarySection = screen.getByText(/dietary restrictions/i)
      expect(dietarySection).toBeInTheDocument()
      
      const halalLabel = screen.getByLabelText(/🌙 halal/i)
      expect(halalLabel).toBeVisible()
    })
  })

  describe('Reduced Motion Support', () => {
    it('should respect reduced motion preferences', () => {
      global.accessibilityTestUtils.simulateAccessibilityPreference('reduced-motion', 'reduce')
      
      render(
        <MockAuthProvider>
          <AuthForm mode="signin" />
        </MockAuthProvider>
      )
      
      const form = screen.getByRole('form')
      expect(form).toBeInTheDocument()
      
      // Animations should be disabled or minimal
      const styles = window.getComputedStyle(form)
      expect(styles.animationDuration).toBe('0s')
    })
  })

  describe('Touch Target Size', () => {
    it('should have minimum 44px touch targets', () => {
      render(
        <MockAuthProvider>
          <AuthForm mode="signin" />
        </MockAuthProvider>
      )
      
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      const styles = window.getComputedStyle(submitButton)
      
      // Should meet minimum touch target size
      const minSize = global.accessibilityTestUtils.wcagRequirements.touchTarget.minSize
      expect(parseInt(styles.minHeight)).toBeGreaterThanOrEqual(minSize)
    })

    it('should have adequate spacing between interactive elements', () => {
      render(
        <MockAuthProvider>
          <AuthForm mode="signup" />
        </MockAuthProvider>
      )
      
      const checkboxes = screen.getAllByRole('checkbox')
      
      // Checkboxes should have adequate spacing
      checkboxes.forEach(checkbox => {
        const styles = window.getComputedStyle(checkbox)
        expect(parseInt(styles.margin)).toBeGreaterThan(0)
      })
    })
  })

  describe('Multi-language Accessibility', () => {
    it('should support RTL languages properly', () => {
      // Set Arabic language context
      global.culturalTestUtils.setTestLanguage('ar')
      
      render(
        <MockAuthProvider>
          <AuthForm mode="signin" />
        </MockAuthProvider>
      )
      
      const form = screen.getByRole('form')
      
      // Should have proper direction attribute for RTL
      if (global.culturalTestUtils.isRTL('ar')) {
        expect(form).toHaveAttribute('dir', 'rtl')
      }
    })

    it('should maintain accessibility in different languages', () => {
      const { supportedLanguages } = global.culturalTestUtils
      
      supportedLanguages.forEach(lang => {
        global.culturalTestUtils.setTestLanguage(lang)
        
        const { rerender } = render(
          <MockAuthProvider>
            <AuthForm mode="signin" />
          </MockAuthProvider>
        )
        
        // Form should remain accessible in all languages
        const emailInput = screen.getByLabelText(/email/i)
        const passwordInput = screen.getByLabelText(/password/i)
        
        expect(emailInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
        
        rerender(<div />)
      })
    })
  })
})