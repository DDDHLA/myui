import React, { forwardRef } from 'react'
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
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'myui-card',
          `myui-card--${variant}`,
          `myui-card--padding-${padding}`,
          className
        )}
        {...props}
      >
        {header && (
          <div className="myui-card__header">
            {header}
          </div>
        )}
        
        <div className="myui-card__content">
          {children}
        </div>
        
        {footer && (
          <div className="myui-card__footer">
            {footer}
          </div>
        )}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
