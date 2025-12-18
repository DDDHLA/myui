import React, { forwardRef, useState } from 'react'
import { cn, generateId } from '@/utils'
import { InputProps } from '@/types'
import './Input.css'

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size = 'md',
      error = false,
      helperText,
      label,
      leftIcon,
      rightIcon,
      id,
      disabled,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false)
    const inputId = id || generateId('input')
    const helperTextId = helperText ? `${inputId}-helper` : undefined

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false)
      onBlur?.(e)
    }

    return (
      <div className={cn('myui-input-wrapper', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn('myui-input-label', {
              'myui-input-label--disabled': disabled,
              'myui-input-label--error': error,
            })}
          >
            {label}
          </label>
        )}
        
        <div
          className={cn(
            'myui-input-container',
            `myui-input-container--${size}`,
            {
              'myui-input-container--focused': focused,
              'myui-input-container--error': error,
              'myui-input-container--disabled': disabled,
              'myui-input-container--with-left-icon': leftIcon,
              'myui-input-container--with-right-icon': rightIcon,
            }
          )}
        >
          {leftIcon && (
            <span className="myui-input-icon myui-input-icon--left">
              {leftIcon}
            </span>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className="myui-input"
            disabled={disabled}
            aria-describedby={helperTextId}
            aria-invalid={!!error}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          
          {rightIcon && (
            <span className="myui-input-icon myui-input-icon--right">
              {rightIcon}
            </span>
          )}
        </div>
        
        {helperText && (
          <div
            id={helperTextId}
            className={cn('myui-input-helper-text', {
              'myui-input-helper-text--error': error,
            })}
          >
            {helperText}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
