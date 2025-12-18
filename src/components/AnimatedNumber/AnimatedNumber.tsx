import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useSpring } from 'framer-motion'
import { cn } from '@/utils'
import './AnimatedNumber.css'

export interface AnimatedNumberProps {
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  separator?: string
  className?: string
  onAnimationComplete?: () => void
  springConfig?: {
    stiffness?: number
    damping?: number
    mass?: number
  }
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  className,
  onAnimationComplete,
  springConfig = {
    stiffness: 100,
    damping: 30,
    mass: 1,
  },
}) => {
  const [displayValue, setDisplayValue] = useState('0')
  const spring = useSpring(0, springConfig)
  const animationCompleteRef = useRef(false)

  // 格式化数字
  const formatNumber = useCallback((num: number): string => {
    const fixed = num.toFixed(decimals)
    const parts = fixed.split('.')
    
    // 添加千分位分隔符
    if (separator) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    }
    
    return parts.join('.')
  }, [decimals, separator])

  useEffect(() => {
    animationCompleteRef.current = false
    spring.set(0)
    
    const timer = setTimeout(() => {
      spring.set(value)
    }, 50)

    return () => clearTimeout(timer)
  }, [value, spring])

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      setDisplayValue(formatNumber(latest))
      
      // 检测动画是否完成
      if (Math.abs(latest - value) < 0.01 && !animationCompleteRef.current) {
        animationCompleteRef.current = true
        onAnimationComplete?.()
      }
    })

    return () => unsubscribe()
  }, [spring, value, formatNumber, onAnimationComplete])

  return (
    <span className={cn('myui-animated-number', className)}>
      {prefix && <span className="myui-animated-number__prefix">{prefix}</span>}
      <span className="myui-animated-number__value">{displayValue}</span>
      {suffix && <span className="myui-animated-number__suffix">{suffix}</span>}
    </span>
  )
}

AnimatedNumber.displayName = 'AnimatedNumber'

export default AnimatedNumber
