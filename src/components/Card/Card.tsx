import { forwardRef, useState, useEffect, useCallback } from 'react'
import { cn } from '@/utils'
import { CardProps } from '@/types'
import './Card.css'

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      variant = 'default',
      padding = 'md',
      header,
      footer,
      
      // 媒体内容
      image,
      imageAlt,
      imagePosition = 'top',
      imageHeight = 200,
      cover = false,
      
      // 交互
      hoverable = false,
      clickable = false,
      onClick,
      disabled = false,
      
      // 状态
      loading = false,
      selected = false,
      
      // 额外内容
      cardTitle,
      subtitle,
      description,
      actions,
      badge,
      tags,
      
      // 功能
      collapsible = false,
      defaultCollapsed = false,
      onCollapseChange,
      
      // 样式
      shadow = 'md',
      borderRadius = 'lg',
      bordered = false,
      
      ...props
    },
    ref
  ) => {
    const [collapsed, setCollapsed] = useState(defaultCollapsed)
    const [imageError, setImageError] = useState(false)
    
    useEffect(() => {
      setCollapsed(defaultCollapsed)
    }, [defaultCollapsed])
    
    const handleClick = useCallback(() => {
      if (!disabled && clickable && onClick) {
        onClick()
      }
    }, [disabled, clickable, onClick])
    
    const handleCollapse = useCallback(() => {
      if (collapsible && !disabled) {
        const newCollapsed = !collapsed
        setCollapsed(newCollapsed)
        onCollapseChange?.(newCollapsed)
      }
    }, [collapsible, collapsed, disabled, onCollapseChange])
    
    const handleImageError = useCallback(() => {
      setImageError(true)
    }, [])
    
    const renderImage = () => {
      if (!image || imageError) return null
      
      return (
        <div 
          className={cn(
            'myui-card__image',
            `myui-card__image--${imagePosition}`,
            cover && 'myui-card__image--cover'
          )}
          style={{
            height: typeof imageHeight === 'number' ? `${imageHeight}px` : imageHeight
          }}
        >
          <img 
            src={image} 
            alt={imageAlt || ''}
            onError={handleImageError}
            loading="lazy"
          />
        </div>
      )
    }
    
    const renderHeader = () => {
      if (!header && !cardTitle && !subtitle && !badge && !collapsible) return null
      
      return (
        <div className="myui-card__header">
          <div className="myui-card__header-content">
            {badge && <div className="myui-card__badge">{badge}</div>}
            {(cardTitle || subtitle) && (
              <div className="myui-card__titles">
                {cardTitle && <h3 className="myui-card__title">{cardTitle}</h3>}
                {subtitle && <p className="myui-card__subtitle">{subtitle}</p>}
              </div>
            )}
            {header}
          </div>
          {collapsible && (
            <button
              className="myui-card__collapse-btn"
              onClick={handleCollapse}
              disabled={disabled}
              aria-expanded={!collapsed}
              aria-label={collapsed ? 'Expand' : 'Collapse'}
            >
              <svg 
                className={cn(
                  'myui-card__collapse-icon',
                  collapsed && 'myui-card__collapse-icon--collapsed'
                )}
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          )}
        </div>
      )
    }
    
    const renderTags = () => {
      if (!tags || tags.length === 0) return null
      
      return (
        <div className="myui-card__tags">
          {tags.map((tag, index) => (
            <span key={index} className="myui-card__tag">
              {tag}
            </span>
          ))}
        </div>
      )
    }
    
    const renderContent = () => {
      if (collapsed) return null
      
      return (
        <>
          {description && (
            <div className="myui-card__description">
              {description}
            </div>
          )}
          {renderTags()}
          <div className="myui-card__content">
            {children}
          </div>
        </>
      )
    }
    
    const renderFooter = () => {
      if (collapsed) return null
      if (!footer && !actions) return null
      
      return (
        <div className="myui-card__footer">
          {footer}
          {actions && (
            <div className="myui-card__actions">
              {actions}
            </div>
          )}
        </div>
      )
    }
    
    const renderLoadingOverlay = () => {
      if (!loading) return null
      
      return (
        <div className="myui-card__loading">
          <div className="myui-card__spinner">
            <svg 
              className="myui-card__spinner-svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="myui-card__spinner-circle" 
                cx="12" 
                cy="12" 
                r="10" 
                strokeWidth="3" 
                fill="none"
              />
            </svg>
          </div>
        </div>
      )
    }
    
    const cardContent = (
      <>
        {imagePosition === 'top' && renderImage()}
        {renderHeader()}
        {imagePosition === 'left' && renderImage()}
        {renderContent()}
        {imagePosition === 'right' && renderImage()}
        {renderFooter()}
        {imagePosition === 'bottom' && renderImage()}
        {renderLoadingOverlay()}
      </>
    )
    
    const isImageSide = imagePosition === 'left' || imagePosition === 'right'
    
    return (
      <div
        ref={ref}
        className={cn(
          'myui-card',
          `myui-card--${variant}`,
          `myui-card--padding-${padding}`,
          `myui-card--shadow-${shadow}`,
          `myui-card--radius-${borderRadius}`,
          hoverable && 'myui-card--hoverable',
          clickable && 'myui-card--clickable',
          disabled && 'myui-card--disabled',
          selected && 'myui-card--selected',
          bordered && 'myui-card--bordered',
          loading && 'myui-card--loading',
          isImageSide && 'myui-card--horizontal',
          className
        )}
        onClick={handleClick}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable && !disabled ? 0 : undefined}
        aria-disabled={disabled}
        aria-selected={selected}
        {...props}
      >
        {cardContent}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
