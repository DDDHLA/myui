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
  variant?: 'default' | 'outlined' | 'elevated' | 'filled' | 'gradient'
  padding?: Size | 'none'
  header?: ReactNode
  footer?: ReactNode
  
  // 媒体内容
  image?: string
  imageAlt?: string
  imagePosition?: 'top' | 'bottom' | 'left' | 'right'
  imageHeight?: string | number
  cover?: boolean
  
  // 交互
  hoverable?: boolean
  clickable?: boolean
  onClick?: () => void
  disabled?: boolean
  
  // 状态
  loading?: boolean
  selected?: boolean
  
  // 额外内容
  cardTitle?: ReactNode
  subtitle?: ReactNode
  description?: ReactNode
  actions?: ReactNode
  badge?: ReactNode
  tags?: string[]
  
  // 功能
  collapsible?: boolean
  defaultCollapsed?: boolean
  onCollapseChange?: (collapsed: boolean) => void
  
  // 样式
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  bordered?: boolean
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

// Table 组件类型
export interface TableColumn<T = any> {
  key: string
  title: ReactNode
  dataIndex?: string
  width?: string | number
  align?: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right'
  sortable?: boolean
  render?: (value: any, record: T, index: number) => ReactNode
  onHeaderClick?: () => void
}

export type SortOrder = 'ascend' | 'descend' | null

export interface TableProps<T = any> extends BaseProps {
  // 数据
  columns: TableColumn<T>[]
  dataSource: T[]
  rowKey?: string | ((record: T) => string)
  
  // 样式
  bordered?: boolean
  striped?: boolean
  hoverable?: boolean
  size?: Size
  
  // 加载和空状态
  loading?: boolean
  empty?: ReactNode
  
  // 分页
  pagination?: boolean | {
    current?: number
    pageSize?: number
    total?: number
    showSizeChanger?: boolean
    showQuickJumper?: boolean
    onChange?: (page: number, pageSize: number) => void
    onShowSizeChange?: (current: number, size: number) => void
  }
  
  // 排序
  sortOrder?: SortOrder
  sortColumn?: string
  onSort?: (column: string, order: SortOrder) => void
  
  // 选择
  rowSelection?: {
    selectedRowKeys?: string[]
    onChange?: (selectedRowKeys: string[], selectedRows: T[]) => void
    type?: 'checkbox' | 'radio'
    fixed?: boolean
    columnWidth?: string | number
  }
  
  // 交互
  onRow?: (record: T, index: number) => {
    onClick?: (event: React.MouseEvent) => void
    onDoubleClick?: (event: React.MouseEvent) => void
    onMouseEnter?: (event: React.MouseEvent) => void
    onMouseLeave?: (event: React.MouseEvent) => void
  }
  
  // 滚动
  scroll?: {
    x?: string | number | true
    y?: string | number
  }
}

// Select 组件类型
export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
  group?: string
}

export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  // 基础属性
  value?: string | number | (string | number)[]
  defaultValue?: string | number | (string | number)[]
  onChange?: (value: string | number | (string | number)[]) => void
  
  // 选项
  options: SelectOption[]
  placeholder?: string
  
  // 功能
  multiple?: boolean
  searchable?: boolean
  clearable?: boolean
  disabled?: boolean
  loading?: boolean
  
  // 样式
  size?: Size
  error?: boolean
  
  // 文本
  notFoundContent?: ReactNode
  maxTagCount?: number
  maxTagPlaceholder?: (omittedValues: any[]) => ReactNode
  
  // 回调
  onSearch?: (value: string) => void
  onClear?: () => void
  onDropdownVisibleChange?: (open: boolean) => void
}

// 主题上下文类型
export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}
