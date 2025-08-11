import React from 'react'
import PropTypes from 'prop-types'

/**
 * CulturalBadge - Displays dietary and cultural preferences
 * Supports multiple cultural and dietary requirements
 */
const CulturalBadge = ({ type, children, className = '', ...props }) => {
  const badgeConfig = {
    halal: {
      className: 'cultural-badge-halal',
      icon: '🌙',
      label: 'Halal',
    },
    kosher: {
      className: 'cultural-badge-kosher', 
      icon: '✡️',
      label: 'Kosher',
    },
    vegetarian: {
      className: 'cultural-badge-vegetarian',
      icon: '🥬',
      label: 'Vegetarian',
    },
    vegan: {
      className: 'cultural-badge-vegan',
      icon: '🌱',
      label: 'Vegan',
    },
    'gluten-free': {
      className: 'cultural-badge-gluten-free',
      icon: '🌾',
      label: 'Gluten-Free',
    },
    organic: {
      className: 'bg-green-100 text-green-800 border border-green-200',
      icon: '🌿',
      label: 'Organic',
    },
    'dairy-free': {
      className: 'bg-blue-100 text-blue-800 border border-blue-200',
      icon: '🥛',
      label: 'Dairy-Free',
    },
    'nut-free': {
      className: 'bg-orange-100 text-orange-800 border border-orange-200',
      icon: '🥜',
      label: 'Nut-Free',
    },
  }

  const config = badgeConfig[type] || badgeConfig.vegetarian
  const displayText = children || config.label

  return (
    <span
      className={`cultural-badge ${config.className} ${className}`}
      role="img"
      aria-label={`${config.label} dietary requirement`}
      {...props}
    >
      <span className="mr-1" aria-hidden="true">
        {config.icon}
      </span>
      <span>{displayText}</span>
    </span>
  )
}

CulturalBadge.propTypes = {
  type: PropTypes.oneOf([
    'halal',
    'kosher', 
    'vegetarian',
    'vegan',
    'gluten-free',
    'organic',
    'dairy-free',
    'nut-free',
  ]).isRequired,
  children: PropTypes.string,
  className: PropTypes.string,
}

export default CulturalBadge