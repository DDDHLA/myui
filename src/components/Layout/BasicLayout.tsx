import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/hooks'
import { cn } from '@/utils'
import { Layout } from './Layout'
import Header from './Header'
import Sider from './Sider'
import Content from './Content'
import './BasicLayout.css'

interface BasicLayoutProps {
  children: React.ReactNode
  currentPage: string
  onPageChange: (page: string) => void
}

const MENU_ITEMS = [
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
      { title: 'Form 表单', key: 'form' },
      { title: 'Input 输入框', key: 'input' },
      { title: 'Checkbox 复选框', key: 'checkbox' },
      { title: 'Radio 单选框', key: 'radio' },
      { title: 'Select 选择器', key: 'select' },
      { title: 'TreeSelect 树选择', key: 'tree-select' },
      { title: 'Switch 开关', key: 'switch' },
      { title: 'Slider 滑块', key: 'slider' },
      { title: 'Transfer 穿梭框', key: 'transfer' },
      { title: 'Upload 上传', key: 'upload' },
      { title: 'Rate 评分', key: 'rate' },
      { title: 'DatePicker 日期选择器', key: 'datepicker' },
      { title: 'Cascader 级联选择', key: 'cascader' },
      { title: 'Mentions 提及', key: 'mentions' },
      { title: 'ColorPicker 颜色选择器', key: 'color-picker' },
      { title: 'Recorder 录音', key: 'recorder' }
    ]
  },
  {
    title: '数据展示',
    key: 'data-display',
    items: [
      { title: 'Card 卡片', key: 'card' },
      { title: 'Splitter 分隔面板', key: 'splitter' },
      { title: 'Table 表格', key: 'table' },
      { title: 'Tabs 标签页', key: 'tabs' },
      { title: 'Calendar 日历', key: 'calendar' },
      { title: 'Avatar 头像', key: 'avatar' },
      { title: 'Badge 徽标数', key: 'badge' },
      { title: 'Tag 标签', key: 'tag' },
      { title: 'Watermark 水印', key: 'watermark' },
      { title: 'Empty 空状态', key: 'empty' },
      { title: 'Timeline 时间轴', key: 'timeline' },
      { title: 'Carousel 走马灯', key: 'carousel' },
      { title: 'Statistic 统计数值', key: 'statistic' },
      { title: 'AnimatedNumber 数字滚动', key: 'animated-number' },
      { title: 'Collapse 折叠面板', key: 'collapse' },
      { title: 'Descriptions 描述列表', key: 'descriptions' },
      { title: 'TypeWriter 流式输出', key: 'typewriter' },
      { title: 'VirtualList 虚拟列表', key: 'virtual-list' },
      { title: 'Masonry 瀑布流', key: 'masonry' }
    ]
  },
  {
    title: '导航',
    key: 'navigation',
    items: [
      { title: 'Breadcrumb 面包屑', key: 'breadcrumb' },
      { title: 'Menu 菜单', key: 'menu' },
      { title: 'Dropdown 下拉菜单', key: 'dropdown' },
      { title: 'Steps 步骤条', key: 'steps' },
      { title: 'Pagination 分页', key: 'pagination' },
      { title: 'Affix 固钉', key: 'affix' },
      { title: 'BackTop 回到顶部', key: 'backtop' },
      { title: 'Tour 漫游式引导', key: 'tour' }
    ]
  },
  {
    title: '反馈',
    key: 'feedback',
    items: [
      { title: 'Alert 警告提示', key: 'alert' },
      { title: 'Modal 弹窗', key: 'modal' },
      { title: 'Message 全局提示', key: 'message' },
      { title: 'Notification 通知', key: 'notification' },
      { title: 'Tooltip 文字提示', key: 'tooltip' },
      { title: 'Popover 气泡卡片', key: 'popover' },
      { title: 'Popconfirm 气泡确认框', key: 'popconfirm' },
      { title: 'Drawer 抽屉', key: 'drawer' },
      { title: 'Progress 进度条', key: 'progress' },
      { title: 'Skeleton 骨架屏', key: 'skeleton' },
      { title: 'Spin 加载中', key: 'spin' }
    ]
  },
  {
    title: '布局',
    key: 'layout',
    items: [
      { title: 'Layout 布局', key: 'layout' },
      { title: 'Divider 分割线', key: 'divider' },
      { title: 'Space 间距', key: 'space' }
    ]
  },
  {
    title: '其他',
    key: 'other',
    items: [
      { title: 'Image 图片', key: 'image' },
      { title: 'Parallax 视差滚动', key: 'parallax' }
    ]
  }
]

// 搜索组件
function Search({ onPageChange }: { onPageChange: (page: string) => void }) {
  const [value, setValue] = useState('')
  const [results, setResults] = useState<{ title: string; key: string }[]>([])
  const [focused, setFocused] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (text: string) => {
    setValue(text)
    if (!text) {
      setResults([])
      return
    }

    const flatItems: { title: string; key: string }[] = []
    MENU_ITEMS.forEach(section => {
      section.items.forEach(item => {
        if (
          item.title.toLowerCase().includes(text.toLowerCase()) ||
          item.key.toLowerCase().includes(text.toLowerCase())
        ) {
          flatItems.push(item)
        }
      })
    })
    setResults(flatItems)
  }

  const handleSelect = (key: string) => {
    onPageChange(key)
    setValue('')
    setResults([])
    setFocused(false)
  }

  return (
    <div className="myui-search" ref={wrapperRef}>
      <div className={cn('myui-search__input-wrapper', { 'myui-search__input-wrapper--focused': focused })}>
        <svg className="myui-search__icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          className="myui-search__input"
          placeholder="搜索组件..."
          value={value}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setFocused(true)}
        />
      </div>
      {focused && value && (
        <div className="myui-search__dropdown">
          {results.length > 0 ? (
            <ul className="myui-search__list">
              {results.map((item) => (
                <li key={item.key}>
                  <button
                    className="myui-search__item"
                    onClick={() => handleSelect(item.key)}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="myui-search__empty">未找到相关组件</div>
          )}
        </div>
      )}
    </div>
  )
}

// 主题切换按钮组件
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const handleClick = () => {
    toggleTheme()
  }

  return (
    <button
      onClick={handleClick}
      className="myui-layout-header__theme-btn"
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

// 主布局组件
export function BasicLayout({ children, currentPage, onPageChange }: BasicLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // 初始化时检查屏幕大小
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      setSidebarCollapsed(mobile)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const handleOverlayClick = () => {
    setSidebarCollapsed(true)
  }

  const handleMenuClick = (key: string, event: React.MouseEvent) => {
    event.preventDefault()
    onPageChange(key)
    if (isMobile) {
      setSidebarCollapsed(true)
    }
  }

  return (
    <Layout className="myui-basic-layout">
      <Header className="myui-layout-header">
        <div className="myui-layout-header__content" style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            className="myui-layout-header__menu-btn"
            onClick={toggleSidebar}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div className="myui-layout-header__brand" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <h1>MyUI</h1>
            <span>现代化的 React 组件库</span>
          </div>
          <div className="myui-layout-header__actions" style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            <Search onPageChange={onPageChange} />
            <ThemeToggle />
          </div>
        </div>
      </Header>
      
      <Layout className="myui-layout__body" hasSider>
        {isMobile && (
          <div
            className={cn('myui-layout-overlay', {
              'myui-layout-overlay--visible': !sidebarCollapsed
            })}
            onClick={handleOverlayClick}
          />
        )}
        
        <Sider 
          width={sidebarCollapsed ? 0 : 240} 
          collapsed={sidebarCollapsed}
          className="myui-layout-sidebar"
          style={{ 
            overflowX: 'hidden',
            overflowY: 'auto',
            borderRight: sidebarCollapsed ? 'none' : undefined
          }}
        >
          <div className="myui-layout-sidebar__content">
            <nav className="myui-layout-sidebar__nav">
              {MENU_ITEMS.map(section => (
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
        </Sider>
        
        <Content 
          className={cn('myui-layout__main', {
            'myui-layout__main--sidebar-collapsed': sidebarCollapsed
          })}
          style={{ marginLeft: sidebarCollapsed ? 0 : 240 }}
        >
          <div className="myui-layout__content">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
