import React, { useState, useEffect } from 'react'
import { useTheme } from '@/hooks'
import { cn } from '@/utils'
import './Layout.css'

interface LayoutProps {
  children: React.ReactNode
  currentPage: string
  onPageChange: (page: string) => void
}

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  currentPage: string
  onPageChange: (page: string) => void
}

interface HeaderProps {
  onMenuToggle: () => void
}

// 主题切换按钮组件
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const handleClick = () => {
    console.log('主题切换前:', theme)
    toggleTheme()
    console.log('主题切换后:', theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      onClick={handleClick}
      className="myui-layout-header__theme-btn"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        border: '1px solid var(--border-color, #e5e7eb)',
        background: 'var(--bg-primary, #ffffff)',
        color: 'var(--text-primary, #333333)',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out'
      }}
      title={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        {theme === 'light' ? (
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <circle
            cx="12"
            cy="12"
            r="5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  )
}

// 头部组件
function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="myui-layout-header">
      <div className="myui-layout-header__content">
        <button
          className="myui-layout-header__menu-btn"
          onClick={onMenuToggle}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="myui-layout-header__brand">
          <h1>MyUI</h1>
          <span>现代化的 React 组件库，提供高质量的组件和设计规范</span>
        </div>
        <div className="myui-layout-header__actions">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

// 侧边栏组件
function Sidebar({ collapsed, onToggle, currentPage, onPageChange }: SidebarProps) {
  const menuItems = [
    {
      title: '开始使用',
      key: 'getting-started',
      items: [
        { title: '组件总览', key: 'overview' },
        { title: '快速开始', key: 'quick-start' },
        { title: '安装', key: 'installation' }
      ]
    },
    {
      title: '通用组件',
      key: 'general',
      items: [
        { title: 'Button 按钮', key: 'button' },
        { title: 'Icon 图标', key: 'icon' }
      ]
    },
    {
      title: '数据录入',
      key: 'data-entry',
      items: [
        { title: 'Input 输入框', key: 'input' },
        { title: 'Select 选择器', key: 'select' },
        { title: 'TreeSelect 树选择', key: 'tree-select' },
        { title: 'Switch 开关', key: 'switch' },
        { title: 'Slider 滑块', key: 'slider' },
        { title: 'Transfer 穿梭框', key: 'transfer' }
      ]
    },
    {
      title: '数据展示',
      key: 'data-display',
      items: [
        { title: 'Card 卡片', key: 'card' },
        { title: 'Table 表格', key: 'table' },
        { title: 'Tabs 标签页', key: 'tabs' },
        { title: 'Calendar 日历', key: 'calendar' },
        { title: 'Avatar 头像', key: 'avatar' },
        { title: 'Badge 徽标数', key: 'badge' },
        { title: 'Tag 标签', key: 'tag' },
        { title: 'Watermark 水印', key: 'watermark' }
      ]
    },
    {
      title: '反馈',
      key: 'feedback',
      items: [
        { title: 'Modal 弹窗', key: 'modal' },
        { title: 'Message 全局提示', key: 'message' },
        { title: 'Tooltip 文字提示', key: 'tooltip' }
      ]
    }
  ]

  const handleMenuClick = (key: string, event: React.MouseEvent) => {
    event.preventDefault()
    onPageChange(key)
    // 在移动端点击菜单项后自动关闭侧边栏
    if (window.innerWidth <= 768) {
      onToggle()
    }
  }

  return (
    <aside className={cn('myui-layout-sidebar', {
      'myui-layout-sidebar--collapsed': collapsed
    })}>
      <div className="myui-layout-sidebar__content">
        <nav className="myui-layout-sidebar__nav">
          {menuItems.map(section => (
            <div key={section.key} className="myui-layout-sidebar__section">
              <div className="myui-layout-sidebar__section-title">
                {section.title}
              </div>
              <ul className="myui-layout-sidebar__menu">
                {section.items.map(item => (
                  <li key={item.key}>
                    <button
                      className={cn('myui-layout-sidebar__menu-item', {
                        'myui-layout-sidebar__menu-item--active': currentPage === item.key
                      })}
                      onClick={(e) => handleMenuClick(item.key, e)}
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}

// 主布局组件
export function Layout({ children, currentPage, onPageChange }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // 监听窗口大小变化，处理响应式侧边栏
  useEffect(() => {
    // 初始化时检查屏幕大小
    const isMobile = window.innerWidth <= 768
    // 桌面端默认展开，移动端默认收起
    setSidebarCollapsed(isMobile)
  }, []) // 只在组件挂载时执行一次

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768
      // 从移动端切换到桌面端时，自动展开侧边栏
      if (!isMobile && sidebarCollapsed) {
        setSidebarCollapsed(false)
      }
      // 从桌面端切换到移动端时，自动收起侧边栏
      if (isMobile && !sidebarCollapsed) {
        setSidebarCollapsed(true)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [sidebarCollapsed]) // 依赖 sidebarCollapsed

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const handleOverlayClick = () => {
    setSidebarCollapsed(true)
  }

  // 判断是否为移动端
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="myui-layout">
      <Header onMenuToggle={toggleSidebar} />
      <div className="myui-layout__body">
        {isMobile && (
          <div
            className={cn('myui-layout-overlay', {
              'myui-layout-overlay--visible': !sidebarCollapsed
            })}
            onClick={handleOverlayClick}
          />
        )}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
        <main className={cn('myui-layout__main', {
          'myui-layout__main--sidebar-collapsed': sidebarCollapsed
        })}>
          <div className="myui-layout__content">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
