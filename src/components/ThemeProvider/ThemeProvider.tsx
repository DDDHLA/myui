import React from 'react'
import { ThemeContext, useThemeState } from '@/hooks'

interface ThemeProviderProps {
  children: React.ReactNode
}

/**
 * 主题提供者组件
 * 为应用提供主题上下文
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const themeState = useThemeState()

  console.log('ThemeProvider 渲染，当前主题状态:', themeState)

  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
