import { FC, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils'

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  description?: ReactNode
  tags?: string[]
}

export const CardBody: FC<CardBodyProps> = ({ 
  className,
  description,
  tags,
  children,
  ...props 
}) => {
  return (
    <div className={cn('myui-card__body', className)} {...props}>
      {description && (
        <div className="myui-card__description">
          {description}
        </div>
      )}
      {tags && tags.length > 0 && (
        <div className="myui-card__tags">
          {tags.map((tag, index) => (
            <span key={index} className="myui-card__tag">
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="myui-card__content">
        {children}
      </div>
    </div>
  )
}

CardBody.displayName = 'CardBody'
