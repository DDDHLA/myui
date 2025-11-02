import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils'
import './Button.css'

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          'myui-button',
          `myui-button--${variant}`,
          `myui-button--${size}`,
          {
            'myui-button--full-width': fullWidth,
            'myui-button--loading': loading,
            'myui-button--disabled': isDisabled,
          },
          className
        )}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.1 }}
        {...props}
      >
        {loading && (
          <span className="myui-button__spinner">
            <svg
              className="myui-button__spinner-icon"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="31.416"
                strokeDashoffset="31.416"
              >
                <animate
                  attributeName="stroke-dasharray"
                  dur="2s"
                  values="0 31.416;15.708 15.708;0 31.416"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  dur="2s"
                  values="0;-15.708;-31.416"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </span>
        )}
        
        {leftIcon && !loading && (
          <span className="myui-button__icon myui-button__icon--left">
            {leftIcon}
          </span>
        )}
        
        <span className="myui-button__content">
          {children}
        </span>
        
        {rightIcon && !loading && (
          <span className="myui-button__icon myui-button__icon--right">
            {rightIcon}
          </span>
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button
