import React, { FormEvent, ReactNode } from 'react'
import { cn } from '@/utils'
import { FormContext } from './FormContext'
import './Form.css'

// Form Props
export interface FormProps {
  children: ReactNode
  layout?: 'horizontal' | 'vertical' | 'inline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void
  onReset?: (e: FormEvent<HTMLFormElement>) => void
}

// Form Component
const Form: React.FC<FormProps> = ({
  children,
  layout = 'vertical',
  size = 'md',
  disabled = false,
  className,
  onSubmit,
  onReset,
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit?.(e)
  }

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onReset?.(e)
  }

  return (
    <FormContext.Provider value={{ layout, size, disabled }}>
      <form
        className={cn(
          'myui-form',
          `myui-form--${layout}`,
          `myui-form--${size}`,
          {
            'myui-form--disabled': disabled,
          },
          className
        )}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        {children}
      </form>
    </FormContext.Provider>
  )
}

Form.displayName = 'Form'

export default Form
