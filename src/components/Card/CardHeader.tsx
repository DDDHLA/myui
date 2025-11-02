import { FC, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils'

interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  subtitle?: ReactNode
  extra?: ReactNode
  badge?: ReactNode
}

export const CardHeader: FC<CardHeaderProps> = ({ 
  className,
  title,
  subtitle,
  extra,
  badge,
  children,
  ...props 
}) => {
  return (
    <div className={cn('myui-card__header', className)} {...props}>
      <div className="myui-card__header-content">
        {badge && <div className="myui-card__badge">{badge}</div>}
        {(title || subtitle) && (
          <div className="myui-card__titles">
            {title && <h3 className="myui-card__title">{title}</h3>}
            {subtitle && <p className="myui-card__subtitle">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
      {extra}
    </div>
  )
}

CardHeader.displayName = 'CardHeader'
