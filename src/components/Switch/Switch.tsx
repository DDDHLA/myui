import { forwardRef, useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn, generateId } from '@/utils'
import type { SwitchProps } from '@/types'
import './Switch.css'

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      size = 'md',
      variant = 'primary',
      checkedLabel,
      uncheckedLabel,
      label,
      checkedIcon,
      uncheckedIcon,
      disabled = false,
      loading = false,
      checkedColor,
      uncheckedColor,
      tooltip,
      description,
      id,
      style,
      ...props
    },
    ref
  ) => {
    // 受控/非受控状态管理
    const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked)
    const isControlled = controlledChecked !== undefined
    const checked = isControlled ? controlledChecked : uncontrolledChecked

    // 生成唯一ID
    const switchId = id || generateId('switch')
    const descriptionId = description ? `${switchId}-description` : undefined

    // 是否禁用
    const isDisabled = disabled || loading

    // 处理变化
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isDisabled) return

        const newChecked = event.target.checked

        if (!isControlled) {
          setUncontrolledChecked(newChecked)
        }

        onChange?.(newChecked, event)
      },
      [isDisabled, isControlled, onChange]
    )

    // 动态样式
    const customStyle = {
      ...style,
      ...(checked && checkedColor ? { '--switch-checked-bg': checkedColor } : {}),
      ...(!checked && uncheckedColor ? { '--switch-unchecked-bg': uncheckedColor } : {}),
    } as React.CSSProperties

    // 渲染加载动画
    const renderLoadingSpinner = () => (
      <motion.div
        className="myui-switch__spinner"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="8"
            cy="8"
            r="6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="9.42 31.42"
          />
        </svg>
      </motion.div>
    )

    // 渲染滑块内容
    const renderThumbContent = () => {
      if (loading) {
        return renderLoadingSpinner()
      }

      if (checked && checkedIcon) {
        return <span className="myui-switch__icon">{checkedIcon}</span>
      }

      if (!checked && uncheckedIcon) {
        return <span className="myui-switch__icon">{uncheckedIcon}</span>
      }

      return null
    }

    // 渲染标签文本
    const renderLabel = () => {
      if (checked && checkedLabel) {
        return <span className="myui-switch__label-text">{checkedLabel}</span>
      }

      if (!checked && uncheckedLabel) {
        return <span className="myui-switch__label-text">{uncheckedLabel}</span>
      }

      return null
    }

    return (
      <div
        className={cn(
          'myui-switch-wrapper',
          {
            [`myui-switch-wrapper--${size}`]: size,
            'myui-switch-wrapper--with-label': label,
          },
          className
        )}
        title={tooltip}
      >
        <label
          className={cn('myui-switch-container', {
            'myui-switch-container--disabled': isDisabled,
          })}
          htmlFor={switchId}
        >
          <input
            ref={ref}
            type="checkbox"
            id={switchId}
            className="myui-switch__input"
            checked={checked}
            onChange={handleChange}
            disabled={isDisabled}
            aria-checked={checked}
            aria-disabled={isDisabled}
            aria-describedby={descriptionId}
            {...props}
          />

          <motion.span
            className={cn('myui-switch', {
              'myui-switch--checked': checked,
              'myui-switch--disabled': isDisabled,
              'myui-switch--loading': loading,
              [`myui-switch--${size}`]: size,
              [`myui-switch--${variant}`]: variant,
            })}
            style={customStyle}
            animate={{
              backgroundColor: checked
                ? checkedColor || undefined
                : uncheckedColor || undefined,
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="myui-switch__thumb"
              animate={{
                x: checked
                  ? size === 'sm'
                    ? 16
                    : size === 'lg'
                    ? 28
                    : 22
                  : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
            >
              {renderThumbContent()}
            </motion.span>

            {renderLabel()}
          </motion.span>

          {label && <span className="myui-switch__label">{label}</span>}
        </label>

        {description && (
          <div id={descriptionId} className="myui-switch__description">
            {description}
          </div>
        )}
      </div>
    )
  }
)

Switch.displayName = 'Switch'

export default Switch
