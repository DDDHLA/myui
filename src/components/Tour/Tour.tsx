import { forwardRef, useState, useEffect, useCallback, ReactNode, CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/utils'
import Button from '../Button/Button'
import './Tour.css'

export interface TourStep {
  target: string | (() => HTMLElement | null)
  title?: ReactNode
  description: ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  cover?: ReactNode
  nextButtonProps?: {
    children?: ReactNode
    onClick?: () => void
  }
  prevButtonProps?: {
    children?: ReactNode
    onClick?: () => void
  }
  style?: CSSProperties
  className?: string
}

export interface TourProps {
  open?: boolean
  current?: number
  steps?: TourStep[]
  onChange?: (current: number) => void
  onClose?: () => void
  onFinish?: () => void
  mask?: boolean
  maskClosable?: boolean
  closeIcon?: ReactNode
  indicatorsRender?: (current: number, total: number) => ReactNode
  className?: string
  style?: CSSProperties
}

const Tour = forwardRef<HTMLDivElement, TourProps>(
  (
    {
      open = false,
      current = 0,
      steps = [],
      onChange,
      onClose,
      onFinish,
      mask = true,
      maskClosable = true,
      closeIcon,
      indicatorsRender,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [currentStep, setCurrentStep] = useState(current)
    const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 })

    useEffect(() => {
      setCurrentStep(current)
    }, [current])

    // 获取目标元素
    useEffect(() => {
      if (!open || !steps[currentStep]) return

      const step = steps[currentStep]
      let element: HTMLElement | null = null

      if (typeof step.target === 'string') {
        element = document.querySelector(step.target)
      } else if (typeof step.target === 'function') {
        element = step.target()
      }

      setTargetElement(element)
    }, [open, currentStep, steps])

    // 计算弹窗位置
    useEffect(() => {
      if (!targetElement || !open) return

      const calculatePosition = () => {
        const rect = targetElement.getBoundingClientRect()
        const step = steps[currentStep]
        const placement = step?.placement || 'bottom'
        const offset = 12

        let top = 0
        let left = 0

        switch (placement) {
          case 'top':
            top = rect.top - offset
            left = rect.left + rect.width / 2
            break
          case 'bottom':
            top = rect.bottom + offset
            left = rect.left + rect.width / 2
            break
          case 'left':
            top = rect.top + rect.height / 2
            left = rect.left - offset
            break
          case 'right':
            top = rect.top + rect.height / 2
            left = rect.right + offset
            break
          case 'center':
            top = window.innerHeight / 2
            left = window.innerWidth / 2
            break
        }

        setPopupPosition({ top, left })
      }

      calculatePosition()
      window.addEventListener('resize', calculatePosition)
      window.addEventListener('scroll', calculatePosition, true)

      return () => {
        window.removeEventListener('resize', calculatePosition)
        window.removeEventListener('scroll', calculatePosition, true)
      }
    }, [targetElement, currentStep, steps, open])

    const handleNext = useCallback(() => {
      const nextStep = currentStep + 1
      if (nextStep < steps.length) {
        setCurrentStep(nextStep)
        onChange?.(nextStep)
      } else {
        onFinish?.()
        onClose?.()
      }
    }, [currentStep, steps.length, onChange, onFinish, onClose])

    const handlePrev = useCallback(() => {
      const prevStep = currentStep - 1
      if (prevStep >= 0) {
        setCurrentStep(prevStep)
        onChange?.(prevStep)
      }
    }, [currentStep, onChange])

    const handleClose = useCallback(() => {
      onClose?.()
    }, [onClose])

    const handleMaskClick = useCallback(() => {
      if (maskClosable) {
        handleClose()
      }
    }, [maskClosable, handleClose])

    if (!open || steps.length === 0) return null

    const step = steps[currentStep]
    if (!step) return null

    const placement = step.placement || 'bottom'
    const isFirst = currentStep === 0
    const isLast = currentStep === steps.length - 1

    // 渲染遮罩
    const renderMask = () => {
      if (!mask) return null

      return (
        <>
          <div className="myui-tour__mask" onClick={handleMaskClick} />
          {targetElement && (
            <div
              className="myui-tour__spotlight"
              style={{
                top: targetElement.getBoundingClientRect().top,
                left: targetElement.getBoundingClientRect().left,
                width: targetElement.offsetWidth,
                height: targetElement.offsetHeight
              }}
            />
          )}
        </>
      )
    }

    // 渲染指示器
    const renderIndicators = () => {
      if (indicatorsRender) {
        return indicatorsRender(currentStep, steps.length)
      }

      return (
        <div className="myui-tour__indicators">
          {steps.map((_, index) => (
            <span
              key={index}
              className={cn('myui-tour__indicator', {
                'myui-tour__indicator--active': index === currentStep
              })}
            />
          ))}
        </div>
      )
    }

    // 渲染弹窗内容
    const renderPopup = () => {
      return (
        <div
          ref={ref}
          className={cn(
            'myui-tour__popup',
            `myui-tour__popup--${placement}`,
            step.className,
            className
          )}
          style={{
            top: popupPosition.top,
            left: popupPosition.left,
            ...style,
            ...step.style
          }}
          {...props}
        >
          <div className="myui-tour__content">
            {/* 关闭按钮 */}
            <button className="myui-tour__close" onClick={handleClose}>
              {closeIcon || (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>

            {/* 封面 */}
            {step.cover && <div className="myui-tour__cover">{step.cover}</div>}

            {/* 标题 */}
            {step.title && <div className="myui-tour__title">{step.title}</div>}

            {/* 描述 */}
            <div className="myui-tour__description">{step.description}</div>

            {/* 底部 */}
            <div className="myui-tour__footer">
              {renderIndicators()}

              <div className="myui-tour__buttons">
                {!isFirst && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handlePrev}
                    {...step.prevButtonProps}
                  >
                    {step.prevButtonProps?.children || '上一步'}
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={handleNext}
                  {...step.nextButtonProps}
                >
                  {step.nextButtonProps?.children || (isLast ? '完成' : '下一步')}
                </Button>
              </div>
            </div>
          </div>

          {/* 箭头 */}
          {placement !== 'center' && <div className="myui-tour__arrow" />}
        </div>
      )
    }

    return createPortal(
      <div className="myui-tour">
        {renderMask()}
        {renderPopup()}
      </div>,
      document.body
    )
  }
)

Tour.displayName = 'Tour'

export default Tour
