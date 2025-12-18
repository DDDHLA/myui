import React, { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from '@/utils'
import './Masonry.css'

export interface MasonryProps {
  children: React.ReactNode
  columns?: number
  gap?: number
  responsive?: {
    [breakpoint: number]: number // breakpoint: columns
  }
  className?: string
}

const Masonry: React.FC<MasonryProps> = ({
  children,
  columns = 3,
  gap = 16,
  responsive,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentColumns, setCurrentColumns] = useState(columns)

  // 响应式列数计算
  const updateColumns = useCallback(() => {
    if (!responsive || !containerRef.current) {
      setCurrentColumns(columns)
      return
    }

    const width = containerRef.current.offsetWidth
    const breakpoints = Object.keys(responsive)
      .map(Number)
      .sort((a, b) => b - a)

    for (const breakpoint of breakpoints) {
      if (width >= breakpoint) {
        setCurrentColumns(responsive[breakpoint])
        return
      }
    }

    setCurrentColumns(columns)
  }, [columns, responsive])

  useEffect(() => {
    updateColumns()

    const resizeObserver = new ResizeObserver(updateColumns)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [updateColumns])

  // 将子元素分配到各列
  const childrenArray = React.Children.toArray(children)
  const columnWrappers: React.ReactNode[][] = Array.from(
    { length: currentColumns },
    () => []
  )

  childrenArray.forEach((child, index) => {
    const columnIndex = index % currentColumns
    columnWrappers[columnIndex].push(child)
  })

  return (
    <div
      ref={containerRef}
      className={cn('myui-masonry', className)}
      style={{
        gap: `${gap}px`,
      }}
    >
      {columnWrappers.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className="myui-masonry__column"
          style={{
            gap: `${gap}px`,
          }}
        >
          {column.map((child, itemIndex) => (
            <div key={itemIndex} className="myui-masonry__item">
              {child}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

Masonry.displayName = 'Masonry'

export default Masonry
