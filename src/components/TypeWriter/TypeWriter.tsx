import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils'
import './TypeWriter.css'

export interface TypeWriterProps {
  /** 要显示的文本内容 */
  text: string
  /** 每个字符的延迟时间（毫秒），默认 50ms */
  speed?: number
  /** 是否显示光标，默认 true */
  showCursor?: boolean
  /** 光标字符，默认 '|' */
  cursor?: string
  /** 光标闪烁速度（毫秒），默认 530ms */
  cursorBlinkSpeed?: number
  /** 完成后的回调 */
  onComplete?: () => void
  /** 自定义类名 */
  className?: string
  /** 是否循环播放，默认 false */
  loop?: boolean
  /** 循环时删除文字的速度（毫秒），默认 30ms */
  deleteSpeed?: number
  /** 循环时的暂停时间（毫秒），默认 1000ms */
  pauseTime?: number
  /** 是否立即开始，默认 true */
  startDelay?: number
  /** HTML 标签类型，默认 'span' */
  as?: keyof JSX.IntrinsicElements
  /** 自定义样式 */
  style?: React.CSSProperties
}

const TypeWriter = ({
  text,
  speed = 50,
  showCursor = true,
  cursor = '|',
  cursorBlinkSpeed = 530,
  onComplete,
  className,
  loop = false,
  deleteSpeed = 30,
  pauseTime = 1000,
  startDelay = 0,
  as: Component = 'span',
  style,
}: TypeWriterProps) => {
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const indexRef = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // 清理之前的定时器
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // 重置状态
    setDisplayText('')
    setIsDeleting(false)
    setIsDone(false)
    indexRef.current = 0

    // 开始延迟
    if (startDelay > 0) {
      timeoutRef.current = setTimeout(() => {
        startTyping()
      }, startDelay)
    } else {
      startTyping()
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [text, speed, deleteSpeed, loop, pauseTime, startDelay])

  const startTyping = () => {
    const typeNextChar = () => {
      if (isDeleting) {
        // 删除模式
        if (indexRef.current > 0) {
          indexRef.current--
          setDisplayText(text.substring(0, indexRef.current))
          timeoutRef.current = setTimeout(typeNextChar, deleteSpeed)
        } else {
          // 删除完成，重新开始打字
          setIsDeleting(false)
          timeoutRef.current = setTimeout(typeNextChar, speed)
        }
      } else {
        // 打字模式
        if (indexRef.current < text.length) {
          indexRef.current++
          setDisplayText(text.substring(0, indexRef.current))
          timeoutRef.current = setTimeout(typeNextChar, speed)
        } else {
          // 打字完成
          setIsDone(true)
          onComplete?.()
          
          if (loop) {
            // 循环模式：暂停后开始删除
            timeoutRef.current = setTimeout(() => {
              setIsDeleting(true)
              setIsDone(false)
              typeNextChar()
            }, pauseTime)
          }
        }
      }
    }

    typeNextChar()
  }

  return (
    <Component
      className={cn('myui-typewriter', className)}
      style={style}
    >
      <motion.span
        className="myui-typewriter__text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {displayText}
      </motion.span>
      {showCursor && (
        <motion.span
          className="myui-typewriter__cursor"
          animate={{
            opacity: isDone && !loop ? 1 : [1, 0, 1],
          }}
          transition={{
            duration: cursorBlinkSpeed / 1000,
            repeat: isDone && !loop ? 0 : Infinity,
            ease: 'linear',
          }}
        >
          {cursor}
        </motion.span>
      )}
    </Component>
  )
}

TypeWriter.displayName = 'TypeWriter'

export default TypeWriter
