import React, { useState } from 'react'
import { cn } from '@/utils'
import './Icon.css'

export interface IconProps {
  /** 图标名称 */
  name?: string
  /** 自定义 SVG 路径（与 name 二选一） */
  path?: React.ReactNode
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
  /** 动画效果 */
  animation?: 'spin' | 'pulse' | 'bounce' | 'shake' | 'ping'
  /** 填充模式 */
  variant?: 'outline' | 'solid' | 'duotone'
  /** 描边宽度 */
  strokeWidth?: number
  /** 徽章内容（数字或点） */
  badge?: number | boolean
  /** 徽章位置 */
  badgePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  /** 自定义类名 */
  className?: string
  /** 点击事件 */
  onClick?: () => void
  /** 是否可复制（点击时复制图标代码） */
  copyable?: boolean
  /** 复制成功提示文本 */
  copyText?: string
  /** 其他 SVG 属性 */
  [key: string]: any
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
  ),

  // 更多基础图标
  'menu': (
    <path d="M4 6h16M4 12h16M4 18h16" />
  ),
  'close': (
    <path d="M6 18L18 6M6 6l12 12" />
  ),
  'filter': (
    <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  ),
  'more-vertical': (
    <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
  ),
  'more-horizontal': (
    <path d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
  ),
  'info': (
    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
  'question': (
    <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
  'check-circle': (
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
  'x-circle': (
    <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
  'exclamation': (
    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  ),
  'lock': (
    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  ),
  'unlock': (
    <path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
  ),
  'shield': (
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  ),
  'key': (
    <path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  ),
  'calendar': (
    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  ),
  'clock': (
    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
  'image': (
    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  ),
  'camera': (
    <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  ),
  'video': (
    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  ),
  'music': (
    <path d="M9 18V5l12-2v13M9 18c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-2c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 12l12-2" />
  ),
  'bookmark': (
    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  ),
  'tag': (
    <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  ),
  'shopping-cart': (
    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  ),
  'credit-card': (
    <path d="M3 10h18M7 15h1m2 0h1m4 0h1m-6 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  ),
  'gift': (
    <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
  ),
  'trophy': (
    <path d="M6 9H4.5a2.5 2.5 0 010-5H6m0 0h12m-12 0a2 2 0 110-4h12a2 2 0 110 4M6 9v10a2 2 0 002 2h8a2 2 0 002-2V9M6 9h12" />
  ),
  'thumbs-up': (
    <path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
  ),
  'thumbs-down': (
    <path d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
  ),
  'message': (
    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  ),
  'chat': (
    <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  ),
  'send': (
    <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  ),
  'save': (
    <path d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  ),
  'cloud': (
    <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  ),
  'wifi': (
    <path d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01M15.536 13.464a9 9 0 010 12.728M9.464 13.464a9 9 0 000 12.728M5.636 10.636a13 13 0 010 18.364M18.364 10.636a13 13 0 010 18.364" />
  ),
  'battery': (
    <path d="M19 10a2 2 0 012 2v2a2 2 0 01-2 2M19 10a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-2a2 2 0 012-2M19 10V8a2 2 0 00-2-2h-1M7 6H6a2 2 0 00-2 2v8a2 2 0 002 2h1" />
  ),
  'zap': (
    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
  ),
  'sun': (
    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  ),
  'moon': (
    <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  ),
  'grid': (
    <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  ),
  'list': (
    <path d="M4 6h16M4 12h16M4 18h16" />
  ),
  'layout': (
    <path d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
  )
} as const

export type IconName = keyof typeof ICONS

export const Icon: React.FC<IconProps> = ({
  name,
  path,
  size = 'md',
  color,
  spin = false,
  rotate,
  flip,
  animation,
  variant = 'outline',
  strokeWidth = 2,
  badge,
  badgePosition = 'top-right',
  className,
  onClick,
  copyable = false,
  copyText,
  ...rest
}) => {
  const [copied, setCopied] = useState(false)

  // 支持自定义路径或内置图标
  const iconPath = path || (name ? ICONS[name as IconName] : null)
  
  if (!iconPath && !name) {
    console.warn('Icon: Either "name" or "path" prop is required')
    return null
  }
  
  if (name && !ICONS[name as IconName] && !path) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  const sizeValue = typeof size === 'number' ? size : undefined
  
  // 确定使用的动画
  const activeAnimation = animation || (spin ? 'spin' : undefined)

  // 生成要复制的代码
  const generateCopyText = (): string => {
    if (copyText) return copyText
    
    const props: string[] = [`name="${name}"`]
    
    if (size && size !== 'md') {
      if (typeof size === 'number') {
        props.push(`size={${size}}`)
      } else {
        props.push(`size="${size}"`)
      }
    }
    
    if (color) {
      if (color.startsWith('#') || color.startsWith('rgb')) {
        props.push(`color="${color}"`)
      } else {
        props.push(`color="${color}"`)
      }
    }
    
    if (variant && variant !== 'outline') {
      props.push(`variant="${variant}"`)
    }
    
    if (animation) {
      props.push(`animation="${animation}"`)
    } else if (spin) {
      props.push('spin')
    }
    
    if (rotate) {
      props.push(`rotate={${rotate}}`)
    }
    
    if (flip) {
      props.push(`flip="${flip}"`)
    }
    
    if (badge !== undefined) {
      if (typeof badge === 'number') {
        props.push(`badge={${badge}}`)
      } else {
        props.push('badge={true}')
      }
    }
    
    return `<Icon ${props.join(' ')} />`
  }

  // 处理点击事件
  const handleClick = async () => {
    if (copyable) {
      try {
        const textToCopy = generateCopyText()
        await navigator.clipboard.writeText(textToCopy)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('复制失败:', err)
      }
    }
    onClick?.()
  }
  
  const iconClasses = cn(
    'myui-icon',
    {
      [`myui-icon--${size}`]: typeof size === 'string',
      [`myui-icon--${color}`]: color && !color.startsWith('#') && !color.startsWith('rgb'),
      [`myui-icon--${activeAnimation}`]: activeAnimation,
      [`myui-icon--flip-${flip}`]: flip,
      [`myui-icon--${variant}`]: variant,
      'myui-icon--clickable': onClick || copyable,
      'myui-icon--copyable': copyable,
      'myui-icon--badge': badge !== undefined
    },
    className
  )

  const iconStyle: React.CSSProperties = {
    ...(sizeValue && { width: sizeValue, height: sizeValue }),
    ...(color && (color.startsWith('#') || color.startsWith('rgb')) && { color }),
    ...(rotate && !activeAnimation && { transform: `rotate(${rotate}deg)` })
  }

  const svgContent = (
    <span 
      className="myui-icon-container" 
      style={{ position: 'relative', display: 'inline-block' }}
      title={copyable ? (copied ? '已复制！' : '点击复制代码') : undefined}
    >
      <svg
        className={iconClasses}
        style={iconStyle}
        fill={variant === 'solid' || variant === 'duotone' ? 'currentColor' : 'none'}
        fillOpacity={variant === 'duotone' ? 0.2 : undefined}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={variant === 'solid' ? 0 : strokeWidth}
        onClick={handleClick}
        role={onClick || copyable ? 'button' : undefined}
        tabIndex={onClick || copyable ? 0 : undefined}
        aria-label={name}
        {...rest}
      >
        {iconPath}
      </svg>
      {copyable && copied && (
        <span className="myui-icon-copy-tooltip">已复制！</span>
      )}
    </span>
  )

  // 如果有徽章，包装在容器中
  if (badge !== undefined) {
    return (
      <span className={cn('myui-icon-wrapper', `myui-icon-wrapper--${badgePosition}`)}>
        {svgContent}
        {typeof badge === 'number' ? (
          <span className="myui-icon-badge myui-icon-badge--number">
            {badge > 99 ? '99+' : badge}
          </span>
        ) : (
          <span className="myui-icon-badge myui-icon-badge--dot" />
        )}
      </span>
    )
  }

  return svgContent
}

export default Icon
