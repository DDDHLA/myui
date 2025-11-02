import { FC, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils'

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  actions?: ReactNode
  align?: 'left' | 'center' | 'right' | 'space-between'
}

export const CardFooter: FC<CardFooterProps> = ({ 
  className,
  actions,
  align = 'space-between',
  children,
  ...props 
}) => {
  return (
    <div 
      className={cn('myui-card__footer', className)} 
      style={{ justifyContent: align }}
      {...props}
    >
      {children}
      {actions && (
        <div className="myui-card__actions">
          {actions}
        </div>
      )}
    </div>
  )
}

CardFooter.displayName = 'CardFooter'
