import React from 'react'
import './style.css'

export interface TimelineItemProps {
  /** 节点颜色 */
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'gray' | string
  /** 自定义节点图标 */
  dot?: React.ReactNode
  /** 标签内容 */
  label?: React.ReactNode
  /** 节点内容 */
  children?: React.ReactNode
  /** 是否为待处理状态 */
  pending?: boolean
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  style?: React.CSSProperties
}

export interface TimelineProps {
  /** 时间轴项 */
  items?: TimelineItemProps[]
  /** 子元素 */
  children?: React.ReactNode
  /** 模式 */
  mode?: 'left' | 'right' | 'alternate'
  /** 是否倒序 */
  reverse?: boolean
  /** 待处理项 */
  pending?: React.ReactNode
  /** 待处理项图标 */
  pendingDot?: React.ReactNode
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  style?: React.CSSProperties
}

// 默认待处理图标
const PendingIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" className="timeline-pending-icon">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

// 时间轴项组件
export const TimelineItem: React.FC<TimelineItemProps & { position?: 'left' | 'right' }> = ({
  color = 'primary',
  dot,
  label,
  children,
  pending = false,
  position = 'left',
  className = '',
  style,
}) => {
  // 判断是否为预设颜色
  const isPresetColor = ['primary', 'success', 'warning', 'danger', 'gray'].includes(color)
  
  const itemClass = [
    'timeline-item',
    `timeline-item--${position}`,
    pending && 'timeline-item--pending',
    className,
  ].filter(Boolean).join(' ')

  const dotClass = [
    'timeline-item__dot',
    isPresetColor && `timeline-item__dot--${color}`,
    dot && 'timeline-item__dot--custom',
  ].filter(Boolean).join(' ')

  const dotStyle = !isPresetColor ? { borderColor: color, color } : undefined

  return (
    <li className={itemClass} style={style}>
      {label && <div className="timeline-item__label">{label}</div>}
      <div className="timeline-item__tail" />
      <div className={dotClass} style={dotStyle}>
        {dot || (pending ? <PendingIcon /> : null)}
      </div>
      <div className="timeline-item__content">
        {children}
      </div>
    </li>
  )
}

// 时间轴组件
export const Timeline: React.FC<TimelineProps> = ({
  items,
  children,
  mode = 'left',
  reverse = false,
  pending,
  pendingDot,
  className = '',
  style,
}) => {
  // 获取时间轴项
  const getTimelineItems = () => {
    let timelineItems: React.ReactNode[] = []

    // 如果有 items prop，使用 items
    if (items && items.length > 0) {
      timelineItems = items.map((item, index) => {
        const position = mode === 'alternate' 
          ? (index % 2 === 0 ? 'left' : 'right')
          : mode
        
        return (
          <TimelineItem
            key={index}
            {...item}
            position={position}
          />
        )
      })
    } else if (children) {
      // 否则使用 children
      timelineItems = React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child
        
        const position = mode === 'alternate'
          ? (index % 2 === 0 ? 'left' : 'right')
          : mode

        return React.cloneElement(child as React.ReactElement<TimelineItemProps & { position?: string }>, {
          position,
        })
      }) || []
    }

    // 添加 pending 项
    if (pending) {
      const pendingPosition = mode === 'alternate'
        ? (timelineItems.length % 2 === 0 ? 'left' : 'right')
        : mode

      timelineItems.push(
        <TimelineItem
          key="pending"
          pending
          dot={pendingDot || <PendingIcon />}
          position={pendingPosition}
        >
          {typeof pending === 'boolean' ? null : pending}
        </TimelineItem>
      )
    }

    // 倒序
    if (reverse) {
      timelineItems = timelineItems.reverse()
    }

    return timelineItems
  }

  const timelineClass = [
    'timeline',
    `timeline--${mode}`,
    pending && 'timeline--pending',
    reverse && 'timeline--reverse',
    className,
  ].filter(Boolean).join(' ')

  return (
    <ul className={timelineClass} style={style}>
      {getTimelineItems()}
    </ul>
  )
}

Timeline.displayName = 'Timeline'
TimelineItem.displayName = 'TimelineItem'

export default Timeline
