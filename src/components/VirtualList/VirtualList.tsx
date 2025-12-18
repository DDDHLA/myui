import React, { useState, useRef, useMemo, UIEvent } from 'react'
import { cn } from '@/utils'
import './VirtualList.css'

export interface VirtualListProps<T> {
  height: number | string
  itemHeight: number
  data: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  className?: string
  style?: React.CSSProperties
  onScroll?: (e: UIEvent<HTMLDivElement>) => void
  /** 滚动到底部时的回调 */
  onEndReached?: () => void
  /** 距离底部多少像素触发回调，默认 50 */
  threshold?: number
}

export function VirtualList<T>({
  height,
  itemHeight,
  data,
  renderItem,
  className,
  style,
  onScroll,
  onEndReached,
  threshold = 50,
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // 防止重复触发
  const loadingRef = useRef(false)
  // 记录上一次的数据长度，用于重置loading状态
  const prevDataLength = useRef(data.length)

  // 当数据长度变化时，重置loading锁
  if (data.length !== prevDataLength.current) {
    loadingRef.current = false
    prevDataLength.current = data.length
  }

  // ... (containerHeight, totalHeight, visibleCount, startIndex, endIndex 计算保持不变)
  const containerHeight = useMemo(() => {
    if (typeof height === 'number') return height
    return parseInt(height as string) || 400
  }, [height])

  const totalHeight = data.length * itemHeight
  const visibleCount = Math.ceil(containerHeight / itemHeight) + 2
  const startIndex = Math.floor(scrollTop / itemHeight)
  const endIndex = Math.min(data.length, startIndex + visibleCount)

  const visibleData = useMemo(() => {
    return data.slice(startIndex, endIndex).map((item, index) => ({
      item,
      index: startIndex + index,
      top: (startIndex + index) * itemHeight
    }))
  }, [data, startIndex, endIndex, itemHeight])

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop: currentScrollTop, scrollHeight, clientHeight } = e.currentTarget
    setScrollTop(currentScrollTop)
    onScroll?.(e)

    // 检测是否触底
    // scrollHeight: 内容总高度
    // currentScrollTop: 卷去的高度
    // clientHeight: 可视高度
    if (onEndReached && !loadingRef.current) {
      if (scrollHeight - currentScrollTop - clientHeight <= threshold) {
        loadingRef.current = true
        onEndReached()
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn('myui-virtual-list', className)}
      style={{ height, ...style }}
      onScroll={handleScroll}
    >
      <div 
        className="myui-virtual-list__phantom"
        style={{ height: totalHeight }}
      />
      <div 
        className="myui-virtual-list__content"
        style={{ transform: `translateY(${startIndex * itemHeight}px)` }}
      >
        {visibleData.map(({ item, index }) => (
          <div 
            key={index} 
            className="myui-virtual-list__item"
            style={{ height: itemHeight }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default VirtualList
