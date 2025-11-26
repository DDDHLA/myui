import React, { useState, useCallback, useMemo } from 'react'
import './style.css'

export interface RateProps {
  /** 当前值 */
  value?: number
  /** 默认值 */
  defaultValue?: number
  /** 星星总数 */
  count?: number
  /** 是否允许半选 */
  allowHalf?: boolean
  /** 是否允许再次点击清除 */
  allowClear?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只读 */
  readonly?: boolean
  /** 自定义字符 */
  character?: React.ReactNode | ((index: number) => React.ReactNode)
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg'
  /** 颜色 */
  color?: string
  /** 选中时回调 */
  onChange?: (value: number) => void
  /** hover 时回调 */
  onHoverChange?: (value: number) => void
  /** 提示信息 */
  tooltips?: string[]
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  style?: React.CSSProperties
}

const StarIcon: React.FC<{ filled?: boolean; half?: boolean }> = ({ filled, half }) => (
  <svg viewBox="0 0 24 24" fill="none" className="rate-star-svg">
    {half ? (
      <>
        <defs>
          <linearGradient id="halfGradient">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="url(#halfGradient)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ) : (
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </svg>
)

export const Rate: React.FC<RateProps> = ({
  value,
  defaultValue = 0,
  count = 5,
  allowHalf = false,
  allowClear = true,
  disabled = false,
  readonly = false,
  character,
  size = 'md',
  color,
  onChange,
  onHoverChange,
  tooltips,
  className = '',
  style,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [hoverValue, setHoverValue] = useState<number | null>(null)

  // 受控/非受控
  const currentValue = value !== undefined ? value : internalValue
  const displayValue = hoverValue !== null ? hoverValue : currentValue

  const isInteractive = !disabled && !readonly

  // 处理点击
  const handleClick = useCallback((index: number, isHalf: boolean) => {
    if (!isInteractive) return

    const newValue = isHalf ? index + 0.5 : index + 1

    // 允许清除：再次点击相同值时清零
    const finalValue = allowClear && newValue === currentValue ? 0 : newValue

    if (value === undefined) {
      setInternalValue(finalValue)
    }
    onChange?.(finalValue)
  }, [isInteractive, allowClear, currentValue, value, onChange])

  // 处理鼠标移入
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLSpanElement>, index: number) => {
    if (!isInteractive) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const isHalf = allowHalf && x < rect.width / 2

    const newHoverValue = isHalf ? index + 0.5 : index + 1
    setHoverValue(newHoverValue)
    onHoverChange?.(newHoverValue)
  }, [isInteractive, allowHalf, onHoverChange])

  // 处理鼠标离开
  const handleMouseLeave = useCallback(() => {
    if (!isInteractive) return
    setHoverValue(null)
    onHoverChange?.(0)
  }, [isInteractive, onHoverChange])

  // 渲染单个星星
  const renderStar = useCallback((index: number) => {
    const isFull = displayValue >= index + 1
    const isHalf = allowHalf && displayValue === index + 0.5

    const starContent = character
      ? typeof character === 'function'
        ? character(index)
        : character
      : <StarIcon filled={isFull} half={isHalf} />

    const starClass = [
      'rate-star',
      isFull && 'rate-star--full',
      isHalf && 'rate-star--half',
      !isFull && !isHalf && 'rate-star--empty',
    ].filter(Boolean).join(' ')

    const tooltip = tooltips?.[Math.ceil(displayValue) - 1]

    return (
      <span
        key={index}
        className={starClass}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const x = e.clientX - rect.left
          const isHalfClick = allowHalf && x < rect.width / 2
          handleClick(index, isHalfClick)
        }}
        onMouseMove={(e) => handleMouseMove(e, index)}
        title={tooltip}
      >
        {starContent}
      </span>
    )
  }, [displayValue, allowHalf, character, tooltips, handleClick, handleMouseMove])

  // 渲染所有星星
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, index) => renderStar(index))
  }, [count, renderStar])

  const rateClass = [
    'rate',
    `rate--${size}`,
    disabled && 'rate--disabled',
    readonly && 'rate--readonly',
    className,
  ].filter(Boolean).join(' ')

  const rateStyle: React.CSSProperties = {
    ...style,
    ...(color && { '--rate-color': color } as React.CSSProperties),
  }

  return (
    <div
      className={rateClass}
      style={rateStyle}
      onMouseLeave={handleMouseLeave}
      role="radiogroup"
      aria-label="Rating"
      aria-valuenow={currentValue}
      aria-valuemin={0}
      aria-valuemax={count}
    >
      {stars}
      {tooltips && displayValue > 0 && (
        <span className="rate-text">
          {tooltips[Math.ceil(displayValue) - 1]}
        </span>
      )}
    </div>
  )
}

Rate.displayName = 'Rate'

export default Rate
