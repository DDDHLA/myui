import React from 'react'
import './style.css'

export interface SkeletonProps {
  /** 是否显示动画效果 */
  active?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 段落占位图行数 */
  rows?: number
  /** 是否显示头像占位 */
  avatar?: boolean | SkeletonAvatarProps
  /** 是否显示标题占位 */
  title?: boolean | SkeletonTitleProps
  /** 是否显示段落占位 */
  paragraph?: boolean | SkeletonParagraphProps
  /** 是否圆角 */
  round?: boolean
  /** 子元素（加载完成后显示） */
  children?: React.ReactNode
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  style?: React.CSSProperties
}

export interface SkeletonAvatarProps {
  /** 头像尺寸 */
  size?: 'sm' | 'md' | 'lg' | number
  /** 头像形状 */
  shape?: 'circle' | 'square'
}

export interface SkeletonTitleProps {
  /** 标题宽度 */
  width?: number | string
}

export interface SkeletonParagraphProps {
  /** 段落行数 */
  rows?: number
  /** 每行宽度，可以是数组 */
  width?: number | string | (number | string)[]
}

export interface SkeletonButtonProps {
  /** 按钮尺寸 */
  size?: 'sm' | 'md' | 'lg'
  /** 按钮形状 */
  shape?: 'default' | 'circle' | 'round'
  /** 是否显示动画 */
  active?: boolean
  /** 是否块级 */
  block?: boolean
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  style?: React.CSSProperties
}

export interface SkeletonInputProps {
  /** 输入框尺寸 */
  size?: 'sm' | 'md' | 'lg'
  /** 是否显示动画 */
  active?: boolean
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  style?: React.CSSProperties
}

export interface SkeletonImageProps {
  /** 是否显示动画 */
  active?: boolean
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  style?: React.CSSProperties
}

// 头像占位组件
const SkeletonAvatar: React.FC<SkeletonAvatarProps & { active?: boolean }> = ({
  size = 'md',
  shape = 'circle',
  active = true,
}) => {
  const sizeValue = typeof size === 'number' ? size : { sm: 32, md: 40, lg: 48 }[size]
  
  return (
    <div
      className={`skeleton-avatar skeleton-avatar--${shape} ${active ? 'skeleton--active' : ''}`}
      style={{ width: sizeValue, height: sizeValue }}
    />
  )
}

// 标题占位组件
const SkeletonTitle: React.FC<SkeletonTitleProps & { active?: boolean }> = ({
  width = '40%',
  active = true,
}) => {
  return (
    <div
      className={`skeleton-title ${active ? 'skeleton--active' : ''}`}
      style={{ width }}
    />
  )
}

// 段落占位组件
const SkeletonParagraph: React.FC<SkeletonParagraphProps & { active?: boolean }> = ({
  rows = 3,
  width,
  active = true,
}) => {
  const getRowWidth = (index: number): string | number => {
    if (Array.isArray(width)) {
      return width[index] ?? '100%'
    }
    // 最后一行默认 60% 宽度
    if (index === rows - 1) {
      return width ?? '60%'
    }
    return '100%'
  }

  return (
    <div className="skeleton-paragraph">
      {Array.from({ length: rows }, (_, index) => (
        <div
          key={index}
          className={`skeleton-paragraph__row ${active ? 'skeleton--active' : ''}`}
          style={{ width: getRowWidth(index) }}
        />
      ))}
    </div>
  )
}

// 按钮占位组件
export const SkeletonButton: React.FC<SkeletonButtonProps> = ({
  size = 'md',
  shape = 'default',
  active = true,
  block = false,
  className = '',
  style,
}) => {
  const btnClass = [
    'skeleton-button',
    `skeleton-button--${size}`,
    `skeleton-button--${shape}`,
    block && 'skeleton-button--block',
    active && 'skeleton--active',
    className,
  ].filter(Boolean).join(' ')

  return <div className={btnClass} style={style} />
}

// 输入框占位组件
export const SkeletonInput: React.FC<SkeletonInputProps> = ({
  size = 'md',
  active = true,
  className = '',
  style,
}) => {
  const inputClass = [
    'skeleton-input',
    `skeleton-input--${size}`,
    active && 'skeleton--active',
    className,
  ].filter(Boolean).join(' ')

  return <div className={inputClass} style={style} />
}

// 图片占位组件
export const SkeletonImage: React.FC<SkeletonImageProps> = ({
  active = true,
  className = '',
  style,
}) => {
  const imageClass = [
    'skeleton-image',
    active && 'skeleton--active',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={imageClass} style={style}>
      <svg viewBox="0 0 1098 1024" fill="currentColor" className="skeleton-image__icon">
        <path d="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z" />
      </svg>
    </div>
  )
}

// 主 Skeleton 组件
export const Skeleton: React.FC<SkeletonProps> = ({
  active = true,
  loading = true,
  rows = 3,
  avatar = false,
  title = true,
  paragraph = true,
  round = false,
  children,
  className = '',
  style,
}) => {
  // 如果不是加载状态，直接显示子元素
  if (!loading) {
    return <>{children}</>
  }

  // 解析头像配置
  const avatarProps: SkeletonAvatarProps = typeof avatar === 'object' ? avatar : {}
  const showAvatar = !!avatar

  // 解析标题配置
  const titleProps: SkeletonTitleProps = typeof title === 'object' ? title : {}
  const showTitle = !!title

  // 解析段落配置
  const paragraphProps: SkeletonParagraphProps = typeof paragraph === 'object' 
    ? paragraph 
    : { rows }
  const showParagraph = !!paragraph

  const skeletonClass = [
    'skeleton',
    showAvatar && 'skeleton--with-avatar',
    round && 'skeleton--round',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={skeletonClass} style={style}>
      {showAvatar && (
        <div className="skeleton__avatar">
          <SkeletonAvatar {...avatarProps} active={active} />
        </div>
      )}
      <div className="skeleton__content">
        {showTitle && <SkeletonTitle {...titleProps} active={active} />}
        {showParagraph && <SkeletonParagraph {...paragraphProps} active={active} />}
      </div>
    </div>
  )
}

Skeleton.displayName = 'Skeleton'
SkeletonButton.displayName = 'SkeletonButton'
SkeletonInput.displayName = 'SkeletonInput'
SkeletonImage.displayName = 'SkeletonImage'

export default Skeleton
