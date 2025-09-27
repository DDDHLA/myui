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
    console.log('从 localStorage 读取的主题:', stored)
    if (stored && ['light', 'dark'].includes(stored)) {
      console.log('使用存储的主题:', stored)
      return stored
    }
    
    // 其次检查系统偏好
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      console.log('使用系统深色主题')
      return 'dark'
    }
    
    console.log('使用默认浅色主题')
    return 'light'
  })

  const toggleTheme = () => {
    console.log('toggleTheme 被调用，当前主题:', theme)
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light'
      console.log('切换到新主题:', newTheme)
      return newTheme
    })
  }

  // 初始化时立即应用主题
  useEffect(() => {
    const root = document.documentElement
    console.log('初始化应用主题:', theme)
    root.setAttribute('data-theme', theme)
    localStorage.setItem('myui-theme', theme)
  }, [])

  // 应用主题到 DOM
  useEffect(() => {
    const root = document.documentElement
    console.log('设置主题到 DOM:', theme)
    console.log('当前 data-theme 属性:', root.getAttribute('data-theme'))
    root.setAttribute('data-theme', theme)
    localStorage.setItem('myui-theme', theme)
    console.log('设置后 data-theme 属性:', root.getAttribute('data-theme'))
    
    // 强制重新计算样式
    root.style.display = 'none'
    root.offsetHeight // 触发重排
    root.style.display = ''
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
