import { ReactNode, HTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes } from 'react'

// 基础类型
export type Size = 'sm' | 'md' | 'lg'
export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
export type Color = Variant | 'gray'

// 主题类型
export type Theme = 'light' | 'dark'

// 基础组件 Props
export interface BaseProps {
  className?: string
  children?: ReactNode
}

// Button 组件类型
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'>, BaseProps {
  variant?: Variant | 'outline' | 'ghost' | 'link'
  size?: Size
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

// Input 组件类型
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, BaseProps {
  size?: Size
  error?: boolean
  helperText?: string
  label?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

// Card 组件类型
export interface CardProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: Size | 'none'
  header?: ReactNode
  footer?: ReactNode
}

// Modal 组件类型
export interface ModalProps extends BaseProps {
  open: boolean
  onClose: () => void
  title?: string
  size?: Size | 'xs' | 'xl' | 'full'
  closable?: boolean
  maskClosable?: boolean
  footer?: ReactNode
}

// Tooltip 组件类型
export interface TooltipProps extends BaseProps {
  content: ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'hover' | 'click' | 'focus'
  disabled?: boolean
}

// 主题上下文类型
export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}
