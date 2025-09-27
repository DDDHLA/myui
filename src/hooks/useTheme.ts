import { createContext, useContext, useEffect, useState } from 'react'
import { Theme, ThemeContextType } from '@/types'

// 创建主题上下文
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

/**
 * 主题 Hook
 * 提供主题切换功能
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  
  return context
}

/**
 * 主题状态管理 Hook
 * 用于 ThemeProvider 内部
 */
export function useThemeState() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'
    
    // 优先从 localStorage 读取
    const stored = localStorage.getItem('myui-theme') as Theme
    if (stored && ['light', 'dark'].includes(stored)) {
      return stored
    }
    
    // 其次检查系统偏好
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    
    return 'light'
  })

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  // 应用主题到 DOM
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    localStorage.setItem('myui-theme', theme)
  }, [theme])

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      // 只有在没有手动设置主题时才跟随系统
      const stored = localStorage.getItem('myui-theme')
      if (!stored) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return {
    theme,
    setTheme,
    toggleTheme,
  }
}
