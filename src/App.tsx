import React from 'react'
import { ThemeProvider, Button, Input, Card, useTheme } from './components'
import { docLayoutStyles, docHeadingStyles } from './styles/docStyles'
import './styles/globals.css'
import CardDemo from './CardDemo'
import MessageDemo from './components/Message/MessageDemo'

// 主题切换按钮组件
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="outline"
      onClick={toggleTheme}
      rightIcon={
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
      }
    >
      {theme === 'light' ? '切换到深色' : '切换到浅色'}
    </Button>
  )
}

// 组件展示区域
function ComponentShowcase() {
  const [inputValue, setInputValue] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [showCardDemo, setShowCardDemo] = React.useState(false)
  const [showMessageDemo, setShowMessageDemo] = React.useState(false)

  const handleLoadingDemo = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  if (showCardDemo) {
    return (
      <>
        <div style={{ padding: '1rem', position: 'fixed', top: 0, right: 0, zIndex: 1000 }}>
          <Button onClick={() => setShowCardDemo(false)} variant="outline">
            返回组件展示
          </Button>
        </div>
        <CardDemo />
      </>
    )
  }

  if (showMessageDemo) {
    return (
      <>
        <div style={{ padding: '1rem', position: 'fixed', top: 0, right: 0, zIndex: 1000 }}>
          <Button onClick={() => setShowMessageDemo(false)} variant="outline">
            返回组件展示
          </Button>
        </div>
        <MessageDemo />
      </>
    )
  }

  return (
    <div style={docLayoutStyles.container}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ ...docHeadingStyles.h1, margin: 0 }}>
          MyUI 组件库
        </h1>
        <ThemeToggle />
      </div>

      <div style={{ ...docLayoutStyles.grid, gap: '2rem' }}>
        {/* Button 组件展示 */}
        <Card header={<h2>Button 按钮组件</h2>} variant="outlined">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <Button variant="primary">主要按钮</Button>
            <Button variant="secondary">次要按钮</Button>
            <Button variant="success">成功按钮</Button>
            <Button variant="warning">警告按钮</Button>
            <Button variant="danger">危险按钮</Button>
            <Button variant="info">信息按钮</Button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <Button variant="outline">轮廓按钮</Button>
            <Button variant="ghost">幽灵按钮</Button>
            <Button variant="link">链接按钮</Button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <Button size="sm">小按钮</Button>
            <Button size="md">中按钮</Button>
            <Button size="lg">大按钮</Button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <Button
              loading={loading}
              onClick={handleLoadingDemo}
              leftIcon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2v6m0 8v6m8-10h-6m-8 0H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              }
            >
              {loading ? '加载中...' : '带图标按钮'}
            </Button>
            <Button disabled>禁用按钮</Button>
            <Button fullWidth>全宽按钮</Button>
          </div>
        </Card>

        {/* Input 组件展示 */}
        <Card header={<h2>Input 输入框组件</h2>} variant="outlined">
          <div style={{ display: 'grid', gap: '1rem', maxWidth: '400px' }}>
            <Input
              label="基础输入框"
              placeholder="请输入内容"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <Input
              label="带图标的输入框"
              placeholder="搜索..."
              leftIcon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                  <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" />
                </svg>
              }
            />

            <Input
              label="密码输入框"
              type="password"
              placeholder="请输入密码"
              rightIcon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="16" r="1" fill="currentColor" />
                </svg>
              }
            />

            <Input
              label="错误状态"
              placeholder="输入有误"
              error
              helperText="这是一个错误提示信息"
            />

            <Input
              label="禁用状态"
              placeholder="禁用输入框"
              disabled
              helperText="这个输入框已被禁用"
            />

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Input size="sm" placeholder="小尺寸" />
              <Input size="md" placeholder="中尺寸" />
              <Input size="lg" placeholder="大尺寸" />
            </div>
          </div>
        </Card>

        {/* Card 组件展示 */}
        <Card header={<h2>Card 卡片组件</h2>} variant="outlined">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <Card variant="default">
              <h3>默认卡片</h3>
              <p>这是一个默认样式的卡片组件，没有边框和阴影。</p>
            </Card>

            <Card variant="outlined">
              <h3>轮廓卡片</h3>
              <p>这是一个带边框的卡片组件，适合在浅色背景上使用。</p>
            </Card>

            <Card variant="elevated">
              <h3>阴影卡片</h3>
              <p>这是一个带阴影的卡片组件，悬停时会有动画效果。</p>
            </Card>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <Card
              variant="outlined"
              header={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0 }}>完整卡片示例</h3>
                  <Button size="sm" variant="ghost">操作</Button>
                </div>
              }
              footer={
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                  <Button size="sm" variant="outline">取消</Button>
                  <Button size="sm">确认</Button>
                </div>
              }
            >
              <p>这是一个包含头部和底部的完整卡片示例。头部通常用于显示标题和操作按钮，底部用于放置操作按钮。</p>
              <p>卡片内容可以是任意的 React 元素，支持复杂的布局和交互。</p>
            </Card>
          </div>
        </Card>
      </div>

      <h1 style={docHeadingStyles.h1}>MyUI 组件库示例</h1>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        一个现代化的 React 组件库，支持主题切换和 TypeScript
      </p>

      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <Button onClick={() => setShowCardDemo(true)} variant="primary">
          查看完整Card组件演示
        </Button>
        <Button onClick={() => setShowMessageDemo(true)} variant="primary">
          查看Message组件演示
        </Button>
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <p>🎉 MyUI 组件库 v1.0.0 - 现代化的 React 组件库</p>
        <p>支持 TypeScript、主题切换、响应式设计</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <ComponentShowcase />
    </ThemeProvider>
  )
}

export default App
