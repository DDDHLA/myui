import React from 'react'
import { cn } from '@/utils'
import './Icon.css'

export interface IconProps {
  /** 图标名称 */
  name: string
  /** 图标大小 */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number
  /** 图标颜色 */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | string
  /** 是否旋转 */
  spin?: boolean
  /** 旋转角度 */
  rotate?: number
  /** 是否翻转 */
  flip?: 'horizontal' | 'vertical' | 'both'
  /** 自定义类名 */
  className?: string
  /** 点击事件 */
  onClick?: () => void
}

// 内置图标集合
const ICONS = {
  // 基础图标
  'home': (
    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  ),
  'user': (
    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  ),
  'settings': (
    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  ),
  'search': (
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  ),
  'bell': (
    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  ),
  'mail': (
    <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  ),
  'phone': (
    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  ),
  
  // 箭头图标
  'arrow-up': (
    <path d="M7 14l5-5 5 5" />
  ),
  'arrow-down': (
    <path d="M17 10l-5 5-5-5" />
  ),
  'arrow-left': (
    <path d="M14 7l-5 5 5 5" />
  ),
  'arrow-right': (
    <path d="M10 17l5-5-5-5" />
  ),
  'chevron-up': (
    <path d="M18 15l-6-6-6 6" />
  ),
  'chevron-down': (
    <path d="M6 9l6 6 6-6" />
  ),
  'chevron-left': (
    <path d="M15 18l-6-6 6-6" />
  ),
  'chevron-right': (
    <path d="M9 18l6-6-6-6" />
  ),

  // 操作图标
  'plus': (
    <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  ),
  'minus': (
    <path d="M18 12H6" />
  ),
  'x': (
    <path d="M6 18L18 6M6 6l12 12" />
  ),
  'check': (
    <path d="M5 13l4 4L19 7" />
  ),
  'edit': (
    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  ),
  'trash': (
    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  ),
  'copy': (
    <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  ),

  // 文件图标
  'folder': (
    <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  ),
  'document': (
    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  ),
  'download': (
    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  ),
  'upload': (
    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  ),

  // 状态图标
  'heart': (
    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  ),
  'star': (
    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  ),
  'eye': (
    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  ),
  'eye-off': (
    <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
  ),

  // 社交图标
  'share': (
    <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  ),
  'external-link': (
    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  ),
  'link': (
    <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  ),

  // 媒体图标
  'play': (
    <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293L12 11l.707-.707A1 1 0 0113.414 10H15a1 1 0 011 1v.586a1 1 0 01-.293.707L15 13l.707.707A1 1 0 0116 14.414V15a1 1 0 01-1 1h-1.586a1 1 0 01-.707-.293L12 15l-.707.707A1 1 0 0110.586 16H9a1 1 0 01-1-1v-.586a1 1 0 01.293-.707L9 13l-.707-.707A1 1 0 018 11.414V11a1 1 0 011-1z" />
  ),
  'pause': (
    <path d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
  'stop': (
    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
  ),
  'volume': (
    <path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z" />
  ),

  // 加载图标
  'loading': (
    <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  ),
  'refresh': (
    <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  )
} as const

export type IconName = keyof typeof ICONS

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color,
  spin = false,
  rotate,
  flip,
  className,
  onClick
}) => {
  const iconPath = ICONS[name as IconName]
  
  if (!iconPath) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  const sizeValue = typeof size === 'number' ? size : undefined
  
  const iconClasses = cn(
    'myui-icon',
    {
      [`myui-icon--${size}`]: typeof size === 'string',
      [`myui-icon--${color}`]: color && !color.startsWith('#') && !color.startsWith('rgb'),
      'myui-icon--spin': spin,
      [`myui-icon--flip-${flip}`]: flip,
      'myui-icon--clickable': onClick
    },
    className
  )

  const iconStyle: React.CSSProperties = {
    ...(sizeValue && { width: sizeValue, height: sizeValue }),
    ...(color && (color.startsWith('#') || color.startsWith('rgb')) && { color }),
    ...(rotate && { transform: `rotate(${rotate}deg)` })
  }

  return (
    <svg
      className={iconClasses}
      style={iconStyle}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {iconPath}
    </svg>
  )
}

export default Icon
