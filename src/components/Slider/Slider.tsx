import { forwardRef, useState, useRef, useCallback, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn, generateId } from '@/utils'
import type { SliderProps } from '@/types'
import './Slider.css'

const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = 0,
      onChange,
      onAfterChange,
      min = 0,
      max = 100,
      step = 1,
      range = false,
      disabled = false,
      vertical = false,
      reverse = false,
      included = true,
      marks,
      dots = false,
      tooltip,
      variant = 'primary',
      size = 'md',
      trackColor,
      railColor,
      handleColor,
      showInput = false,
      inputWidth,
      label,
      description,
      id,
      ...props
    },
    ref
  ) => {
    // Refs
    const sliderRef = useRef<HTMLDivElement>(null)
    const dragHandleRef = useRef<number | null>(null)

    // 状态管理
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
    const isControlled = controlledValue !== undefined
    const currentValue = isControlled ? controlledValue : uncontrolledValue

    // 确保值是数组形式以统一处理
    const valueArray = useMemo(() => {
      if (Array.isArray(currentValue)) {
        return currentValue
      }
      return range ? [min, currentValue as number] : [currentValue as number]
    }, [currentValue, range, min])

    // Tooltip 状态
    const [activeHandle, setActiveHandle] = useState<number | null>(null)
    const [isDragging, setIsDragging] = useState(false)

    // 合并ref
    useEffect(() => {
      if (ref && sliderRef.current) {
        if (typeof ref === 'function') {
          ref(sliderRef.current)
        } else {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = sliderRef.current
        }
      }
    }, [ref])

    // 生成唯一ID
    const sliderId = id || generateId('slider')
    const descriptionId = description ? `${sliderId}-description` : undefined

    // 计算步长
    const getStepValue = useCallback(() => {
      if (step === null) return null
      return Math.max(step, (max - min) / 1000)
    }, [step, min, max])

    // 将值限制在范围内
    const constrainValue = useCallback(
      (val: number) => {
        let constrained = Math.max(min, Math.min(max, val))
        const stepVal = getStepValue()
        
        if (stepVal !== null) {
          const steps = Math.round((constrained - min) / stepVal)
          constrained = min + steps * stepVal
        }
        
        return constrained
      },
      [min, max, getStepValue]
    )

    // 计算百分比
    const getPercentage = useCallback(
      (val: number) => {
        const percentage = ((val - min) / (max - min)) * 100
        return reverse ? 100 - percentage : percentage
      },
      [min, max, reverse]
    )

    // 从位置获取值
    const getValueFromPosition = useCallback(
      (clientX: number, clientY: number) => {
        if (!sliderRef.current) return min

        const rect = sliderRef.current.getBoundingClientRect()
        let percentage: number

        if (vertical) {
          percentage = ((rect.bottom - clientY) / rect.height) * 100
        } else {
          percentage = ((clientX - rect.left) / rect.width) * 100
        }

        if (reverse) {
          percentage = 100 - percentage
        }

        const value = min + (percentage / 100) * (max - min)
        return constrainValue(value)
      },
      [vertical, reverse, min, max, constrainValue]
    )

    // 更新值
    const updateValue = useCallback(
      (newValue: number | [number, number]) => {
        if (disabled) return

        if (!isControlled) {
          setUncontrolledValue(newValue)
        }

        onChange?.(newValue)
      },
      [disabled, isControlled, onChange]
    )

    // 处理鼠标按下
    const handleMouseDown = useCallback(
      (handleIndex: number) => (e: React.MouseEvent | React.TouchEvent) => {
        if (disabled) return

        e.preventDefault()
        setIsDragging(true)
        setActiveHandle(handleIndex)
        dragHandleRef.current = handleIndex

        let animationFrameId: number | null = null
        let latestValue: number | [number, number] | null = null

        const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
          // 取消之前的动画帧
          if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId)
          }

          const clientX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX
          const clientY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY

          // 使用 requestAnimationFrame 来优化性能
          animationFrameId = requestAnimationFrame(() => {
            const newValue = getValueFromPosition(clientX, clientY)
            
            if (range) {
              const newValues = [...valueArray] as [number, number]
              newValues[handleIndex] = newValue
              
              // 确保范围值不交叉
              if (handleIndex === 0 && newValue > newValues[1]) {
                newValues[0] = newValues[1]
              } else if (handleIndex === 1 && newValue < newValues[0]) {
                newValues[1] = newValues[0]
              }
              
              latestValue = newValues
              updateValue(newValues)
            } else {
              latestValue = newValue
              updateValue(newValue)
            }
          })
        }

        const handleUp = () => {
          // 取消待处理的动画帧
          if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId)
          }

          setIsDragging(false)
          setActiveHandle(null)
          dragHandleRef.current = null
          
          // 使用最新值或当前值
          const finalValue = latestValue !== null ? latestValue : (range ? valueArray as [number, number] : valueArray[0])
          onAfterChange?.(finalValue)
          
          document.removeEventListener('mousemove', handleMove)
          document.removeEventListener('mouseup', handleUp)
          document.removeEventListener('touchmove', handleMove)
          document.removeEventListener('touchend', handleUp)
        }

        document.addEventListener('mousemove', handleMove, { passive: false })
        document.addEventListener('mouseup', handleUp)
        document.addEventListener('touchmove', handleMove, { passive: false })
        document.addEventListener('touchend', handleUp)
      },
      [disabled, range, valueArray, getValueFromPosition, updateValue, onAfterChange]
    )

    // 处理轨道点击
    const handleRailClick = useCallback(
      (e: React.MouseEvent) => {
        if (disabled || e.target !== e.currentTarget) return

        const newValue = getValueFromPosition(e.clientX, e.clientY)
        
        if (range) {
          const [val0, val1] = valueArray as [number, number]
          const mid = (val0 + val1) / 2
          
          if (newValue < mid) {
            updateValue([newValue, val1])
          } else {
            updateValue([val0, newValue])
          }
        } else {
          updateValue(newValue)
        }
        
        onAfterChange?.(range ? valueArray as [number, number] : newValue)
      },
      [disabled, range, valueArray, getValueFromPosition, updateValue, onAfterChange]
    )

    // 键盘支持
    const handleKeyDown = useCallback(
      (handleIndex: number) => (e: React.KeyboardEvent) => {
        if (disabled) return

        const stepVal = getStepValue() || 1
        let handled = false
        let newValue = valueArray[handleIndex]

        switch (e.key) {
          case 'ArrowUp':
          case 'ArrowRight':
            newValue = constrainValue(newValue + stepVal)
            handled = true
            break
          case 'ArrowDown':
          case 'ArrowLeft':
            newValue = constrainValue(newValue - stepVal)
            handled = true
            break
          case 'PageUp':
            newValue = constrainValue(newValue + stepVal * 10)
            handled = true
            break
          case 'PageDown':
            newValue = constrainValue(newValue - stepVal * 10)
            handled = true
            break
          case 'Home':
            newValue = min
            handled = true
            break
          case 'End':
            newValue = max
            handled = true
            break
        }

        if (handled) {
          e.preventDefault()
          
          if (range) {
            const newValues = [...valueArray] as [number, number]
            newValues[handleIndex] = newValue
            
            // 确保范围值不交叉
            if (handleIndex === 0 && newValue > newValues[1]) {
              newValues[0] = newValues[1]
            } else if (handleIndex === 1 && newValue < newValues[0]) {
              newValues[1] = newValues[0]
            }
            
            updateValue(newValues)
          } else {
            updateValue(newValue)
          }
        }
      },
      [disabled, range, valueArray, getStepValue, constrainValue, min, max, updateValue]
    )

    // 渲染刻度
    const renderMarks = () => {
      if (!marks) return null

      return Object.entries(marks).map(([key, mark]) => {
        const value = Number(key)
        const percentage = getPercentage(value)
        const markLabel = mark && typeof mark === 'object' && 'label' in mark ? mark.label : mark

        return (
          <div
            key={key}
            className={cn('myui-slider__mark', {
              'myui-slider__mark--active': included && (
                range
                  ? value >= valueArray[0] && value <= valueArray[1]
                  : value <= valueArray[0]
              ),
            })}
            style={{
              [vertical ? 'bottom' : 'left']: `${percentage}%`,
            }}
          >
            <span className="myui-slider__mark-point" />
            {markLabel && (
              <span className="myui-slider__mark-label">{String(markLabel)}</span>
            )}
          </div>
        )
      })
    }

    // 渲染刻度点
    const renderDots = () => {
      if (!dots || step === null) return null

      const dotElements = []
      for (let value = min; value <= max; value += step) {
        const percentage = getPercentage(value)
        const isActive = included && (
          range
            ? value >= valueArray[0] && value <= valueArray[1]
            : value <= valueArray[0]
        )

        dotElements.push(
          <span
            key={value}
            className={cn('myui-slider__dot', {
              'myui-slider__dot--active': isActive,
            })}
            style={{
              [vertical ? 'bottom' : 'left']: `${percentage}%`,
            }}
          />
        )
      }

      return dotElements
    }

    // 渲染滑块手柄
    const renderHandles = () => {
      const handles = range ? valueArray : [valueArray[0]]

      return handles.map((value, index) => {
        const percentage = getPercentage(value)
        const isActive = activeHandle === index
        const showTooltip = tooltip?.open !== false && (isActive || isDragging)

        return (
          <motion.div
            key={index}
            className={cn('myui-slider__handle', {
              'myui-slider__handle--active': isActive,
              'myui-slider__handle--disabled': disabled,
              [`myui-slider__handle--${size}`]: size,
            })}
            style={{
              [vertical ? 'bottom' : 'left']: `${percentage}%`,
              backgroundColor: handleColor,
            }}
            onMouseDown={handleMouseDown(index)}
            onTouchStart={handleMouseDown(index)}
            onKeyDown={handleKeyDown(index)}
            onMouseEnter={() => setActiveHandle(index)}
            onMouseLeave={() => !isDragging && setActiveHandle(null)}
            tabIndex={disabled ? -1 : 0}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-disabled={disabled}
            aria-orientation={vertical ? 'vertical' : 'horizontal'}
            whileHover={{ scale: disabled ? 1 : 1.1 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
          >
            {showTooltip && (
              <div
                className={cn('myui-slider__tooltip', {
                  [`myui-slider__tooltip--${tooltip?.placement || (vertical ? 'right' : 'top')}`]: true,
                })}
              >
                {tooltip?.formatter ? tooltip.formatter(value) : value}
              </div>
            )}
          </motion.div>
        )
      })
    }

    // 渲染轨道
    const renderTrack = () => {
      if (!included) return null

      const start = range ? valueArray[0] : min
      const end = range ? valueArray[1] : valueArray[0]

      const startPercentage = getPercentage(start)
      const endPercentage = getPercentage(end)

      return (
        <div
          className={cn('myui-slider__track', {
            [`myui-slider__track--${variant}`]: variant,
          })}
          style={{
            [vertical ? 'bottom' : 'left']: `${Math.min(startPercentage, endPercentage)}%`,
            [vertical ? 'height' : 'width']: `${Math.abs(endPercentage - startPercentage)}%`,
            backgroundColor: trackColor,
          }}
        />
      )
    }

    // 获取小数位数
    const getDecimalPlaces = useCallback(() => {
      if (step === null || step === undefined) return 0
      const stepStr = step.toString()
      const decimalIndex = stepStr.indexOf('.')
      return decimalIndex >= 0 ? stepStr.length - decimalIndex - 1 : 0
    }, [step])

    // 格式化数值 - 限制小数位数
    const formatValue = useCallback((val: number) => {
      const decimalPlaces = getDecimalPlaces()
      if (decimalPlaces === 0) {
        return Math.round(val)
      }
      return parseFloat(val.toFixed(decimalPlaces))
    }, [getDecimalPlaces])

    // 渲染输入框
    const renderInput = () => {
      if (!showInput) return null

      const handleInputChange = (index: number, inputValue: string) => {
        const numValue = parseFloat(inputValue)
        if (isNaN(numValue)) return

        const newValue = constrainValue(numValue)

        if (range) {
          const newValues = [...valueArray] as [number, number]
          newValues[index] = newValue

          // 确保范围值不交叉
          if (index === 0 && newValue > newValues[1]) {
            newValues[0] = newValues[1]
          } else if (index === 1 && newValue < newValues[0]) {
            newValues[1] = newValues[0]
          }

          updateValue(newValues)
        } else {
          updateValue(newValue)
        }
      }

      if (range) {
        return (
          <div className="myui-slider__input-group">
            <input
              type="number"
              className="myui-slider__input"
              value={formatValue(valueArray[0])}
              onChange={(e) => handleInputChange(0, e.target.value)}
              min={min}
              max={max}
              step={step || undefined}
              disabled={disabled}
              style={{ width: inputWidth }}
            />
            <span className="myui-slider__input-separator">-</span>
            <input
              type="number"
              className="myui-slider__input"
              value={formatValue(valueArray[1])}
              onChange={(e) => handleInputChange(1, e.target.value)}
              min={min}
              max={max}
              step={step || undefined}
              disabled={disabled}
              style={{ width: inputWidth }}
            />
          </div>
        )
      }

      return (
        <input
          type="number"
          className="myui-slider__input"
          value={formatValue(valueArray[0])}
          onChange={(e) => handleInputChange(0, e.target.value)}
          min={min}
          max={max}
          step={step || undefined}
          disabled={disabled}
          style={{ width: inputWidth }}
        />
      )
    }

    return (
      <div
        className={cn(
          'myui-slider-wrapper',
          {
            'myui-slider-wrapper--vertical': vertical,
            'myui-slider-wrapper--disabled': disabled,
            'myui-slider-wrapper--with-input': showInput,
            [`myui-slider-wrapper--${size}`]: size,
          },
          className
        )}
        {...props}
      >
        {label && (
          <label className="myui-slider__label" htmlFor={sliderId}>
            {label}
          </label>
        )}

        <div className="myui-slider-container">
          <div
            ref={sliderRef}
            id={sliderId}
            className={cn('myui-slider', {
              'myui-slider--vertical': vertical,
              'myui-slider--disabled': disabled,
              [`myui-slider--${size}`]: size,
            })}
            onClick={handleRailClick}
            aria-describedby={descriptionId}
          >
            <div
              className="myui-slider__rail"
              style={{ backgroundColor: railColor }}
            />
            {renderTrack()}
            {renderDots()}
            {renderMarks()}
            {renderHandles()}
          </div>

          {renderInput()}
        </div>

        {description && (
          <div id={descriptionId} className="myui-slider__description">
            {description}
          </div>
        )}
      </div>
    )
  }
)

Slider.displayName = 'Slider'

export default Slider
