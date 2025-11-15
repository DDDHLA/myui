import React, { useState, useCallback, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils'
import { Icon } from '../Icon'
import './Tabs.css'

export interface TabItem {
  /** 标签的唯一标识 */
  key: string
  /** 标签显示文本 */
  label: ReactNode
  /** 标签内容 */
  children?: ReactNode
  /** 是否禁用 */
  disabled?: boolean
  /** 左侧图标 */
  leftIcon?: ReactNode
  /** 右侧图标 */
  rightIcon?: ReactNode
  /** 是否可关闭（仅当 closable 为 true 时生效） */
  closable?: boolean
  /** 徽章内容 */
  badge?: number | boolean
}

export interface TabsProps {
  /** 标签项列表 */
  items: TabItem[]
  /** 当前激活的标签 key */
  activeKey?: string
  /** 默认激活的标签 key */
  defaultActiveKey?: string
  /** 激活标签改变时的回调 */
  onChange?: (key: string) => void
  /** 标签关闭时的回调（仅当 closable 为 true 时生效） */
  onClose?: (key: string) => void
  /** 标签样式 */
  variant?: 'line' | 'card' | 'button' | 'pill'
  /** 标签大小 */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** 布局方向 */
  orientation?: 'horizontal' | 'vertical'
  /** 是否可关闭标签 */
  closable?: boolean
  /** 是否显示底部边框 */
  bordered?: boolean
  /** 是否懒加载内容 */
  lazy?: boolean
  /** 是否居中显示 */
  centered?: boolean
  /** 自定义类名 */
  className?: string
  /** 标签栏自定义类名 */
  tabBarClassName?: string
  /** 内容区域自定义类名 */
  contentClassName?: string
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeKey: controlledActiveKey,
  defaultActiveKey,
  onChange,
  onClose,
  variant = 'line',
  size = 'md',
  orientation = 'horizontal',
  closable = false,
  bordered = true,
  lazy = false,
  centered = false,
  className,
  tabBarClassName,
  contentClassName,
}) => {
  const [internalActiveKey, setInternalActiveKey] = useState<string>(
    defaultActiveKey || items.find(item => !item.disabled)?.key || items[0]?.key || ''
  )
  const [loadedKeys, setLoadedKeys] = useState<Set<string>>(
    lazy ? new Set([internalActiveKey]) : new Set(items.map(item => item.key))
  )

  const isControlled = controlledActiveKey !== undefined
  const activeKey = isControlled ? controlledActiveKey : internalActiveKey

  const handleTabClick = useCallback((key: string, disabled?: boolean) => {
    if (disabled) return
    
    if (!isControlled) {
      setInternalActiveKey(key)
    }
    
    if (lazy && !loadedKeys.has(key)) {
      setLoadedKeys(prev => new Set([...prev, key]))
    }
    
    onChange?.(key)
  }, [isControlled, lazy, loadedKeys, onChange])

  const handleClose = useCallback((e: React.MouseEvent, key: string) => {
    e.stopPropagation()
    
    const currentIndex = items.findIndex(item => item.key === key)
    const nextActiveKey = items.find((item, index) => 
      index > currentIndex && !item.disabled
    )?.key || items.find((item, index) => 
      index < currentIndex && !item.disabled
    )?.key || items.find(item => !item.disabled)?.key

    if (nextActiveKey && !isControlled) {
      setInternalActiveKey(nextActiveKey)
    }
    
    onClose?.(key)
  }, [items, isControlled, onClose])

  const activeTab = items.find(item => item.key === activeKey)

  return (
    <div 
      className={cn(
        'myui-tabs',
        `myui-tabs--${variant}`,
        `myui-tabs--${size}`,
        `myui-tabs--${orientation}`,
        {
          'myui-tabs--bordered': bordered,
          'myui-tabs--centered': centered,
        },
        className
      )}
    >
      <div className={cn('myui-tabs__bar', tabBarClassName)}>
        {items.map((item) => {
          const isActive = item.key === activeKey
          const canClose = closable || item.closable
          const itemDisabled = item.disabled

          return (
            <div
              key={item.key}
              className={cn('myui-tabs__tab', {
                'myui-tabs__tab--active': isActive,
                'myui-tabs__tab--disabled': itemDisabled,
              })}
              onClick={() => handleTabClick(item.key, itemDisabled)}
            >
              {item.leftIcon && (
                <span className="myui-tabs__tab-icon myui-tabs__tab-icon--left">
                  {item.leftIcon}
                </span>
              )}
              <span className="myui-tabs__tab-label">{item.label}</span>
              {item.badge !== undefined && (
                <span className="myui-tabs__tab-badge">
                  {typeof item.badge === 'number' ? (
                    item.badge > 99 ? '99+' : item.badge
                  ) : (
                    <span className="myui-tabs__tab-badge-dot" />
                  )}
                </span>
              )}
              {item.rightIcon && (
                <span className="myui-tabs__tab-icon myui-tabs__tab-icon--right">
                  {item.rightIcon}
                </span>
              )}
              {canClose && (
                <button
                  className="myui-tabs__tab-close"
                  onClick={(e) => handleClose(e, item.key)}
                  aria-label="关闭标签"
                >
                  <Icon name="x" size="xs" />
                </button>
              )}
              {variant === 'line' && isActive && (
                <motion.div
                  className="myui-tabs__indicator"
                  layoutId="tabs-indicator"
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
            </div>
          )
        })}
      </div>

      {activeTab?.children !== undefined && (
        <div className={cn('myui-tabs__content', contentClassName)}>
          <AnimatePresence mode="wait">
            {lazy ? (
              loadedKeys.has(activeKey) && (
                <motion.div
                  key={activeKey}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="myui-tabs__panel"
                >
                  {activeTab.children}
                </motion.div>
              )
            ) : (
              <motion.div
                key={activeKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="myui-tabs__panel"
              >
                {activeTab.children}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default Tabs

