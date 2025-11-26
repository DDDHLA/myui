import React from 'react'
import './style.css'

export interface EmptyProps {
  /** 自定义图片地址 */
  image?: React.ReactNode
  /** 图片样式 */
  imageStyle?: React.CSSProperties
  /** 自定义描述内容 */
  description?: React.ReactNode
  /** 底部内容 */
  children?: React.ReactNode
  /** 预设类型 */
  preset?: 'default' | 'simple' | 'search' | 'error' | 'network'
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg'
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  style?: React.CSSProperties
}

// 默认空状态图标
const DefaultIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 184 152" fill="none">
    <g fill="none" fillRule="evenodd">
      <g transform="translate(24 31.67)">
        <ellipse cx="67.797" cy="106.89" rx="67.797" ry="12.668" fill="#f5f5f5" />
        <path
          d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225H42.422c-1.767 0-3.445.84-4.593 2.225L13.904 69.674V95h108.13V69.674z"
          fill="#aeb8c2"
        />
        <path
          d="M33.83 0h67.933a4 4 0 014 4v93.344a4 4 0 01-4 4H33.83a4 4 0 01-4-4V4a4 4 0 014-4z"
          fill="#f5f7fa"
        />
        <path
          d="M42.678 9.953h50.237a2 2 0 012 2V36.91a2 2 0 01-2 2H42.678a2 2 0 01-2-2V11.953a2 2 0 012-2zM42.94 49.767h49.713a2.262 2.262 0 110 4.524H42.94a2.262 2.262 0 010-4.524zM42.94 61.53h49.713a2.262 2.262 0 110 4.525H42.94a2.262 2.262 0 010-4.525zM121.813 69.674V95H14.125V69.674h15.164a4.34 4.34 0 014.233 3.391l2.06 8.745a4.34 4.34 0 004.233 3.391h52.093a4.34 4.34 0 004.233-3.391l2.06-8.745a4.34 4.34 0 014.233-3.391h23.38z"
          fill="#dce0e6"
        />
      </g>
      <path
        d="M149.121 33.292l-6.83 2.65a1 1 0 01-1.317-1.23l1.937-6.207a1 1 0 00-.26-1.008c-1.18-1.1-1.923-2.657-1.923-4.377 0-3.36 2.834-6.09 6.327-6.09s6.327 2.73 6.327 6.09c0 3.36-2.834 6.09-6.327 6.09a6.561 6.561 0 01-1.748-.238 1 1 0 00-.899.175l-.287.144z"
        fill="#dce0e6"
      />
      <path
        d="M37.678 19.87a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
        fill="#dce0e6"
      />
    </g>
  </svg>
)

// 简洁图标
const SimpleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 64 41" fill="none">
    <g transform="translate(0 1)" fill="none" fillRule="evenodd">
      <ellipse cx="32" cy="33" rx="32" ry="7" fill="#f5f5f5" />
      <g fillRule="nonzero" stroke="#d9d9d9">
        <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
        <path
          d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35H11.95C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
          fill="#fafafa"
        />
      </g>
    </g>
  </svg>
)

// 搜索无结果图标
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none">
    <circle cx="28" cy="28" r="20" stroke="#d9d9d9" strokeWidth="4" fill="none" />
    <line x1="42" y1="42" x2="56" y2="56" stroke="#d9d9d9" strokeWidth="4" strokeLinecap="round" />
    <path d="M20 28h16M28 20v16" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
  </svg>
)

// 错误图标
const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="28" stroke="#ff4d4f" strokeWidth="2" fill="none" opacity="0.2" />
    <circle cx="32" cy="32" r="20" stroke="#ff4d4f" strokeWidth="2" fill="none" opacity="0.4" />
    <path d="M24 24l16 16M40 24L24 40" stroke="#ff4d4f" strokeWidth="3" strokeLinecap="round" />
  </svg>
)

// 网络错误图标
const NetworkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none">
    <path
      d="M32 8c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24S45.255 8 32 8z"
      stroke="#d9d9d9"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M16 32c0-8.837 7.163-16 16-16M48 32c0-8.837-7.163-16-16-16"
      stroke="#d9d9d9"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="32" cy="32" r="4" fill="#d9d9d9" />
    <path d="M20 44l24-24" stroke="#ff4d4f" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

// 预设配置
const presetConfig = {
  default: {
    icon: DefaultIcon,
    description: '暂无数据',
  },
  simple: {
    icon: SimpleIcon,
    description: '暂无数据',
  },
  search: {
    icon: SearchIcon,
    description: '搜索无结果',
  },
  error: {
    icon: ErrorIcon,
    description: '加载失败',
  },
  network: {
    icon: NetworkIcon,
    description: '网络异常',
  },
}

export const Empty: React.FC<EmptyProps> = ({
  image,
  imageStyle,
  description,
  children,
  preset = 'default',
  size = 'md',
  className = '',
  style,
}) => {
  const config = presetConfig[preset]
  const IconComponent = config.icon

  const emptyClass = [
    'empty',
    `empty--${size}`,
    `empty--${preset}`,
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={emptyClass} style={style}>
      <div className="empty__image" style={imageStyle}>
        {image !== undefined ? image : <IconComponent className="empty__icon" />}
      </div>
      {description !== false && (
        <div className="empty__description">
          {description ?? config.description}
        </div>
      )}
      {children && (
        <div className="empty__footer">
          {children}
        </div>
      )}
    </div>
  )
}

// 预设实例
Empty.displayName = 'Empty'

// 简洁空状态
export const EmptySimple: React.FC<Omit<EmptyProps, 'preset'>> = (props) => (
  <Empty {...props} preset="simple" />
)

EmptySimple.displayName = 'EmptySimple'

export default Empty
