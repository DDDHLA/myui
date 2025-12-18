import React, { ReactNode } from 'react'
import { cn } from '@/utils'
import { useFormContext } from './Form'
import './Form.css'

export interface FormItemProps {
  children: ReactNode
  label?: string
  required?: boolean
  error?: string | boolean
  help?: string
  htmlFor?: string
  className?: string
  labelCol?: number
  wrapperCol?: number
}

const FormItem: React.FC<FormItemProps> = ({
  children,
  label,
  required = false,
  error,
  help,
  htmlFor,
  className,
  labelCol,
  wrapperCol,
}) => {
  const { layout } = useFormContext()
  const hasError = !!error

  const labelStyle = labelCol
    ? { flex: `0 0 ${(labelCol / 24) * 100}%` }
    : undefined

  const wrapperStyle = wrapperCol
    ? { flex: `0 0 ${(wrapperCol / 24) * 100}%` }
    : undefined

  return (
    <div
      className={cn(
        'myui-form-item',
        `myui-form-item--${layout}`,
        {
          'myui-form-item--required': required,
          'myui-form-item--error': hasError,
        },
        className
      )}
    >
      {label && (
        <label
          htmlFor={htmlFor}
          className="myui-form-item__label"
          style={labelStyle}
        >
          {required && <span className="myui-form-item__required-mark">*</span>}
          {label}
        </label>
      )}
      
      <div className="myui-form-item__content" style={wrapperStyle}>
        <div className="myui-form-item__control">{children}</div>
        
        {hasError && typeof error === 'string' && (
          <div className="myui-form-item__error">{error}</div>
        )}
        
        {!hasError && help && (
          <div className="myui-form-item__help">{help}</div>
        )}
      </div>
    </div>
  )
}

FormItem.displayName = 'FormItem'

export default FormItem
