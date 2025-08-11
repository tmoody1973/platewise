import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import CulturalBadge from '../../components/cultural/CulturalBadge.jsx'

describe('CulturalBadge - Cultural Sensitivity Tests', () => {
  beforeEach(() => {
    // Reset any global test state
    global.culturalTestUtils.setTestLanguage('en')
  })

  describe('Dietary Restriction Badges', () => {
    it('should display halal badge with correct icon and styling', () => {
      render(<CulturalBadge type="halal" />)
      
      const badge = screen.getByRole('img', { name: /halal dietary requirement/i })
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveTextContent('🌙')
      expect(badge).toHaveTextContent('Halal')
      expect(badge).toHaveClass('cultural-badge-halal')
    })

    it('should display kosher badge with correct icon and styling', () => {
      render(<CulturalBadge type="kosher" />)
      
      const badge = screen.getByRole('img', { name: /kosher dietary requirement/i })
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveTextContent('✡️')
      expect(badge).toHaveTextContent('Kosher')
      expect(badge).toHaveClass('cultural-badge-kosher')
    })

    it('should display vegetarian badge with correct icon and styling', () => {
      render(<CulturalBadge type="vegetarian" />)
      
      const badge = screen.getByRole('img', { name: /vegetarian dietary requirement/i })
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveTextContent('🥬')
      expect(badge).toHaveTextContent('Vegetarian')
      expect(badge).toHaveClass('cultural-badge-vegetarian')
    })

    it('should display vegan badge with correct icon and styling', () => {
      render(<CulturalBadge type="vegan" />)
      
      const badge = screen.getByRole('img', { name: /vegan dietary requirement/i })
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveTextContent('🌱')
      expect(badge).toHaveTextContent('Vegan')
      expect(badge).toHaveClass('cultural-badge-vegan')
    })

    it('should display gluten-free badge with correct icon and styling', () => {
      render(<CulturalBadge type="gluten-free" />)
      
      const badge = screen.getByRole('img', { name: /gluten-free dietary requirement/i })
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveTextContent('🌾')
      expect(badge).toHaveTextContent('Gluten-Free')
      expect(badge).toHaveClass('cultural-badge-gluten-free')
    })
  })

  describe('Cultural Sensitivity', () => {
    it('should handle all supported dietary restrictions', () => {
      const { dietaryRestrictions } = global.culturalTestUtils
      
      dietaryRestrictions.forEach(restriction => {
        const { rerender } = render(<CulturalBadge type={restriction} />)
        
        // Each badge should have proper ARIA labeling
        const badge = screen.getByRole('img')
        expect(badge).toHaveAttribute('aria-label', expect.stringContaining('dietary requirement'))
        
        // Each badge should have appropriate styling
        expect(badge).toHaveClass('cultural-badge')
        
        rerender(<div />)
      })
    })

    it('should support custom text while maintaining cultural context', () => {
      render(<CulturalBadge type="halal">حلال</CulturalBadge>)
      
      const badge = screen.getByRole('img', { name: /halal dietary requirement/i })
      expect(badge).toHaveTextContent('🌙')
      expect(badge).toHaveTextContent('حلال') // Arabic text for Halal
    })

    it('should fallback gracefully for unknown dietary types', () => {
      render(<CulturalBadge type="unknown" />)
      
      // Should fallback to vegetarian styling (default)
      const badge = screen.getByRole('img')
      expect(badge).toHaveClass('cultural-badge-vegetarian')
    })
  })

  describe('Accessibility Compliance', () => {
    it('should have proper ARIA labels for screen readers', () => {
      render(<CulturalBadge type="halal" />)
      
      const badge = screen.getByRole('img', { name: /halal dietary requirement/i })
      expect(badge).toHaveAttribute('aria-label', 'Halal dietary requirement')
    })

    it('should have proper semantic structure', () => {
      render(<CulturalBadge type="kosher" />)
      
      const badge = screen.getByRole('img')
      expect(badge.tagName).toBe('SPAN')
      
      // Icon should be hidden from screen readers
      const icon = badge.querySelector('[aria-hidden="true"]')
      expect(icon).toBeInTheDocument()
    })

    it('should support keyboard navigation when interactive', () => {
      const handleClick = vi.fn()
      render(<CulturalBadge type="vegan" onClick={handleClick} />)
      
      const badge = screen.getByRole('img')
      expect(badge).toBeInTheDocument()
      
      // Should be focusable if interactive
      if (handleClick) {
        expect(badge).toHaveAttribute('tabIndex', '0')
      }
    })
  })

  describe('Visual Design Compliance', () => {
    it('should avoid culturally insensitive colors', () => {
      render(<CulturalBadge type="halal" />)
      
      const badge = screen.getByRole('img')
      const styles = window.getComputedStyle(badge)
      
      // Should not use pure red or white backgrounds
      expect(styles.backgroundColor).not.toBe('rgb(255, 0, 0)') // Pure red
      expect(styles.backgroundColor).not.toBe('rgb(255, 255, 255)') // Pure white
    })

    it('should use earth tones and culturally appropriate colors', () => {
      render(<CulturalBadge type="halal" />)
      
      const badge = screen.getByRole('img')
      expect(badge).toHaveClass('cultural-badge-halal')
      
      // Should use green theme for halal (universally positive)
      const styles = window.getComputedStyle(badge)
      expect(styles.color).toContain('green') // Should contain green color values
    })
  })
})