import React, { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from '@/utils'
import { Input } from '../Input'
import { Popover } from '../Popover'
import './ColorPicker.css'

// 颜色转换工具函数
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

const rgbToHex = (r: number, g: number, b: number) => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

const rgbToHsv = (r: number, g: number, b: number) => {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h = 0,
    s = 0
  const v = max
  const d = max - min
  s = max === 0 ? 0 : d / max
  if (max === min) {
    h = 0
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  return { h: h * 360, s: s * 100, v: v * 100 }
}

const hsvToRgb = (h: number, s: number, v: number) => {
  let r = 0,
    g = 0,
    b = 0
  const i = Math.floor(h / 60)
  const f = h / 60 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  switch (i % 6) {
    case 0:
      r = v
      g = t
      b = p
      break
    case 1:
      r = q
      g = v
      b = p
      break
    case 2:
      r = p
      g = v
      b = t
      break
    case 3:
      r = p
      g = q
      b = v
      break
    case 4:
      r = t
      g = p
      b = v
      break
    case 5:
      r = v
      g = p
      b = q
      break
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

export interface ColorPickerProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  presets?: string[]
  className?: string
  disabled?: boolean
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  defaultValue = '#1890ff',
  onChange,
  presets = [
    '#f5222d',
    '#fa541c',
    '#fa8c16',
    '#fadb14',
    '#52c41a',
    '#13c2c2',
    '#1890ff',
    '#2f54eb',
    '#722ed1',
    '#eb2f96',
  ],
  className,
  disabled,
}) => {
  const [color, setColor] = useState(value || defaultValue)
  const [hsv, setHsv] = useState({ h: 0, s: 100, v: 100 })
  const panelRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const isDraggingPanel = useRef(false)
  const isDraggingSlider = useRef(false)

  useEffect(() => {
    if (value) setColor(value)
  }, [value])

  useEffect(() => {
    const rgb = hexToRgb(color)
    if (rgb) {
      setHsv(rgbToHsv(rgb.r, rgb.g, rgb.b))
    }
  }, [color])

  const handleColorChange = useCallback((newColor: string) => {
    setColor(newColor)
    onChange?.(newColor)
  }, [onChange])

  const handlePanelMove = useCallback(
    (e: MouseEvent | React.MouseEvent) => {
      if (!panelRef.current) return
      const rect = panelRef.current.getBoundingClientRect()
      let x = e.clientX - rect.left
      let y = e.clientY - rect.top
      x = Math.max(0, Math.min(x, rect.width))
      y = Math.max(0, Math.min(y, rect.height))
      const s = (x / rect.width) * 100
      const v = 100 - (y / rect.height) * 100
      
      const rgb = hsvToRgb(hsv.h, s / 100, v / 100)
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
      handleColorChange(hex)
    },
    [hsv.h, handleColorChange]
  )

  const handleSliderMove = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    let x = e.clientX - rect.left
    x = Math.max(0, Math.min(x, rect.width))
    const h = (x / rect.width) * 360
    
    // 我们在这里不直接更新hsv state，而是通过计算新的hex来触发更新
    // 但为了UI流畅，我们也需要更新H
    // setHsv会通过 color -> hexToRgb -> rgbToHsv 间接更新，但也可能需要直接更新
    // 为了简化，我们先计算出RGB，然后更新Color
    
    // 这里有一个 tricky 的地方：如果颜色是黑色/白色，H值可能会丢失
    // 我们手动更新 HSV 的 H 值
    setHsv(prev => {
        // 使用新的 H 和旧的 S, V 计算颜色
        const rgb = hsvToRgb(h, prev.s / 100, prev.v / 100)
        const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
        handleColorChange(hex)
        return { ...prev, h }
    })
  }, [handleColorChange])

  const handlePanelMouseDown = (e: React.MouseEvent) => {
    isDraggingPanel.current = true
    handlePanelMove(e)
  }

  const handleSliderMouseDown = (e: React.MouseEvent) => {
    isDraggingSlider.current = true
    handleSliderMove(e)
  }

  useEffect(() => {
    const handleMouseUp = () => {
      isDraggingPanel.current = false
      isDraggingSlider.current = false
    }
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingPanel.current) handlePanelMove(e)
      if (isDraggingSlider.current) handleSliderMove(e)
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handlePanelMove, handleSliderMove])

  const content = (
    <div className="myui-color-picker-panel">
      <div
        ref={panelRef}
        className="myui-color-picker-saturation"
        title="Saturation / Brightness"
        onMouseDown={handlePanelMouseDown}
        style={{ backgroundColor: `hsl(${hsv.h}, 100%, 50%)` }}
      >
        <div className="myui-color-picker-saturation-white"></div>
        <div className="myui-color-picker-saturation-black"></div>
        <div
          className="myui-color-picker-pointer"
          style={{
            left: `${hsv.s}%`,
            top: `${100 - hsv.v}%`,
          }}
        ></div>
      </div>
      
      <div className="myui-color-picker-controls">
        <div className="myui-color-picker-preview">
           <div className="myui-color-swatch-inner" style={{ backgroundColor: color }} />
        </div>
        <div
            ref={sliderRef}
            className="myui-color-picker-hue"
            onMouseDown={handleSliderMouseDown}
        >
            <div 
                className="myui-color-picker-hue-pointer"
                style={{ left: `${(hsv.h / 360) * 100}%` }}
            />
        </div>
      </div>

      <div className="myui-color-picker-input-wrapper">
         <Input 
            value={color} 
            onChange={(e) => handleColorChange(e.target.value)}
            className="myui-color-picker-hex-input"
         />
      </div>

      <div className="myui-color-picker-presets">
        {presets.map((preset) => (
          <div
            key={preset}
            className="myui-color-picker-preset"
            style={{ backgroundColor: preset }}
            onClick={() => handleColorChange(preset)}
          />
        ))}
      </div>
    </div>
  )

  return (
    <div className={cn('myui-color-picker', className, { 'myui-color-picker--disabled': disabled })}>
      <Popover content={content} trigger="click" placement="bottom">
        <div className={cn("myui-color-picker-trigger", { "myui-color-picker-trigger--disabled": disabled })}>
          <div
            className="myui-color-picker-swatch"
            style={{ backgroundColor: color }}
          />
          <span className="myui-color-picker-value">{color}</span>
        </div>
      </Popover>
    </div>
  )
}

export default ColorPicker
