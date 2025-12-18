import React, { useEffect, useRef, useState, ReactNode } from 'react'
import { cn } from '@/utils'
import './Parallax.css'

export interface ParallaxProps {
  children: ReactNode
  speed?: number
  direction?: 'vertical' | 'horizontal'
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
  bgImage?: string
  strength?: number // for container background parallax specifically
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 0.5,
  direction = 'vertical',
  className,
  style,
  disabled = false,
  bgImage,
  strength = 200,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (disabled) return

    const handleScroll = () => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const windowWidth = window.innerWidth
      
      // 检查元素是否在视口内（或附近）
      const isInView = 
        rect.top < windowHeight && 
        rect.bottom > 0 &&
        rect.left < windowWidth && 
        rect.right > 0

      if (isInView) {
        // 计算相对于视口中心的偏移
        // 当元素中心在视口中心时，calculateOffset应该接近0
        // 这通常用于背景视差
        
        // 简单的视差：根据滚动位置移动
        // 使用 window.scrollY 会导致绝对位置移动，适合 sticky 效果
        // 但对于一般的视差，我们可以基于元素在视口中的位置
        
        let newOffset = 0
        if (direction === 'vertical') {
          // let scrolled = window.scrollY
          // newOffset = scrolled * speed
          
          // 基于视口位置的视差（更适合进入/离开效果）
          // const center = windowHeight / 2
          // const elementCenter = rect.top + rect.height / 2
          // newOffset = (elementCenter - center) * speed
          
           // 简化版：直接使用scrollY * speed，但这需要父级是relative的，且不是fixed
           // 最通用的方式：监听滚动，改变transform
           newOffset = window.scrollY * speed
        } else {
           newOffset = window.scrollX * speed
        }
        
        setOffset(newOffset)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // 初始化一次
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed, direction, disabled])

  // 背景视差模式
  if (bgImage) {
    return (
      <div 
        ref={ref}
        className={cn('myui-parallax-bg', className)} 
        style={{ ...style, overflow: 'hidden', position: 'relative' }}
      >
        <div 
            className="myui-parallax-bg-image"
            style={{
                backgroundImage: `url(${bgImage})`,
                transform: `translate3d(0, ${(offset * (strength / 1000) * -1)}px, 0)`,
                // 这里的计算方式稍微调整，使其更自然
                // 为了让背景图不动或动得慢：
                // background-attachment: fixed 是最简单的，但在移动端有问题
                // js模拟：
            }}
        ></div>
        <div className="myui-parallax-content">{children}</div>
      </div>
    )
  }

  // 元素视差模式
  return (
    <div
      ref={ref}
      className={cn('myui-parallax', className)}
      style={{
        ...style,
        transform: disabled 
            ? undefined 
            : direction === 'vertical' 
                ? `translate3d(0, ${offset}px, 0)` 
                : `translate3d(${offset}px, 0, 0)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}

// 帮助组件：ParallaxLayer
// 用于构建多层视差
export interface ParallaxLayerProps extends React.HTMLAttributes<HTMLDivElement> {
    speed?: number
    offset?: number
}
export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({ 
    children, 
    speed = 0.5, 
    offset = 0,
    className,
    style,
    ...props 
}) => {
    // 暂时忽略未使用变量，为了保持API完整性，或者我们可以使用它们
    // 为了消除lint错误，我们实际上可以使用它们或者注释掉默认值
    return <div {...props} className={cn(className)} style={{ ...style, transform: `translateY(${offset * speed}px)` }}>{children}</div>
}

export default Parallax
