import React from 'react'
import PropTypes from 'prop-types'

/**
 * BentoCard - A reusable card component following the Bento design system
 * Supports cultural sensitivity and accessibility standards
 */
const BentoCard = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className = '',
  onClick,
  ariaLabel,
  ...props 
}) => {
  const baseClasses = 'bento-card'
  
  const variantClasses = {
    default: '',
    cultural: 'border-cultural-earth/20 bg-cultural-warm/50',
    fresh: 'border-primary-green/20 bg-cultural-fresh/50',
    warm: 'border-primary-orange/20 bg-cultural-warm',
  }
  
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  }
  
  const combinedClasses = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${sizeClasses[size]} 
    ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''} 
    ${className}
  `.trim()

  const CardComponent = onClick ? 'button' : 'div'

  return (
    <CardComponent
      className={combinedClasses}
      onClick={onClick}
      aria-label={ariaLabel}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(e)
        }
      } : undefined}
      {...props}
    >
      {children}
    </CardComponent>
  )
}

BentoCard.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'cultural', 'fresh', 'warm']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
}

export default BentoCard