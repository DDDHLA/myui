import { FC, ImgHTMLAttributes, useState, ReactNode, SyntheticEvent } from 'react'
import { cn } from '@/utils'

interface CardImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: ReactNode
  height?: string | number
  cover?: boolean
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export const CardImage: FC<CardImageProps> = ({ 
  className,
  fallback,
  height = 200,
  cover = false,
  position = 'top',
  alt = '',
  onError,
  ...props 
}) => {
  const [hasError, setHasError] = useState(false)
  
  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    setHasError(true)
    onError?.(e)
  }
  
  if (hasError && fallback) {
    return <>{fallback}</>
  }
  
  return (
    <div 
      className={cn(
        'myui-card__image',
        `myui-card__image--${position}`,
        cover && 'myui-card__image--cover',
        className
      )}
      style={{
        height: typeof height === 'number' ? `${height}px` : height
      }}
    >
      <img 
        alt={alt}
        loading="lazy"
        onError={handleError}
        {...props}
      />
    </div>
  )
}

CardImage.displayName = 'CardImage'
