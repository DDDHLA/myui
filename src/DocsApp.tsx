import React from 'react'
import { ThemeProvider, Button, Input, Card, Icon, useTheme } from './components'
import { Layout } from './components/Layout'
import { CodeBlock } from './components/CodeBlock'
import { PropsTable } from './components/PropsTable'
import type { PropItem } from './components/PropsTable'

// 主题切换按钮组件
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <Button
      variant="outline"
      size="sm"
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
      {theme === 'light' ? '深色' : '浅色'}
    </Button>
  )
}

// Button 组件文档页面
function ButtonDocs() {
  const [loading, setLoading] = React.useState(false)

  const handleLoadingDemo = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  const buttonProps: PropItem[] = [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'outline' | 'ghost' | 'link'",
      default: "'primary'",
      description: '按钮的样式类型'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: '按钮的尺寸大小'
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: '是否显示加载状态'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: '是否禁用按钮'
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      default: 'false',
      description: '是否占满容器宽度'
    },
    {
      name: 'leftIcon',
      type: 'ReactNode',
      description: '左侧图标'
    },
    {
      name: 'rightIcon',
      type: 'ReactNode',
      description: '右侧图标'
    },
    {
      name: 'children',
      type: 'ReactNode',
      description: '按钮内容',
      required: true
    },
    {
      name: 'onClick',
      type: '(event: MouseEvent) => void',
      description: '点击事件处理函数'
    }
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
          Button 按钮
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.75' }}>
          按钮用于开始一个即时操作。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="按钮的基础用法，支持多种类型和状态。"
        code={`import { Button } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="primary">主要按钮</Button>
      <Button variant="secondary">次要按钮</Button>
      <Button variant="success">成功按钮</Button>
      <Button variant="warning">警告按钮</Button>
      <Button variant="danger">危险按钮</Button>
      <Button variant="info">信息按钮</Button>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary">主要按钮</Button>
          <Button variant="secondary">次要按钮</Button>
          <Button variant="success">成功按钮</Button>
          <Button variant="warning">警告按钮</Button>
          <Button variant="danger">危险按钮</Button>
          <Button variant="info">信息按钮</Button>
        </div>
      </CodeBlock>

      <CodeBlock
        title="按钮类型"
        description="按钮有多种类型：轮廓按钮、幽灵按钮和链接按钮。"
        code={`import { Button } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="outline">轮廓按钮</Button>
      <Button variant="ghost">幽灵按钮</Button>
      <Button variant="link">链接按钮</Button>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="outline">轮廓按钮</Button>
          <Button variant="ghost">幽灵按钮</Button>
          <Button variant="link">链接按钮</Button>
        </div>
      </CodeBlock>

      <CodeBlock
        title="按钮尺寸"
        description="按钮有大、中、小三种尺寸。"
        code={`import { Button } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="sm">小按钮</Button>
      <Button size="md">中按钮</Button>
      <Button size="lg">大按钮</Button>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button size="sm">小按钮</Button>
          <Button size="md">中按钮</Button>
          <Button size="lg">大按钮</Button>
        </div>
      </CodeBlock>

      <CodeBlock
        title="带图标的按钮"
        description="按钮可以配置左侧或右侧图标。"
        code={`import { Button } from '@myui/components'

function App() {
  const SearchIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
      <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
  
  const ArrowIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )

  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button leftIcon={SearchIcon}>搜索</Button>
      <Button rightIcon={ArrowIcon}>下一步</Button>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button leftIcon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
            </svg>
          }>搜索</Button>
          <Button rightIcon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="2"/>
            </svg>
          }>下一步</Button>
        </div>
      </CodeBlock>

      <CodeBlock
        title="加载状态"
        description="点击按钮后进行数据加载操作，在按钮上显示加载状态。"
        code={`import { Button } from '@myui/components'
import { useState } from 'react'

function App() {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button loading={loading} onClick={handleClick}>
        {loading ? '加载中...' : '点击加载'}
      </Button>
      <Button disabled>禁用按钮</Button>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button loading={loading} onClick={handleLoadingDemo}>
            {loading ? '加载中...' : '点击加载'}
          </Button>
          <Button disabled>禁用按钮</Button>
        </div>
      </CodeBlock>

      <CodeBlock
        title="块级按钮"
        description="按钮可以占满容器的宽度。"
        code={`import { Button } from '@myui/components'

function App() {
  return (
    <div style={{ width: '300px' }}>
      <Button fullWidth>全宽按钮</Button>
    </div>
  )
}`}
      >
        <div style={{ width: '300px' }}>
          <Button fullWidth>全宽按钮</Button>
        </div>
      </CodeBlock>

      <PropsTable data={buttonProps} />
    </div>
  )
}

// Input 组件文档页面
function InputDocs() {
  const [value, setValue] = React.useState('')

  const inputProps: PropItem[] = [
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: '输入框的尺寸大小'
    },
    {
      name: 'error',
      type: 'boolean',
      default: 'false',
      description: '是否显示错误状态'
    },
    {
      name: 'helperText',
      type: 'string',
      description: '辅助文本信息'
    },
    {
      name: 'label',
      type: 'string',
      description: '输入框标签'
    },
    {
      name: 'leftIcon',
      type: 'ReactNode',
      description: '左侧图标'
    },
    {
      name: 'rightIcon',
      type: 'ReactNode',
      description: '右侧图标'
    },
    {
      name: 'placeholder',
      type: 'string',
      description: '占位符文本'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: '是否禁用输入框'
    },
    {
      name: 'value',
      type: 'string',
      description: '输入框的值'
    },
    {
      name: 'onChange',
      type: '(event: ChangeEvent) => void',
      description: '值变化时的回调函数'
    }
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
          Input 输入框
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.75' }}>
          通过鼠标或键盘输入内容，是最基础的表单域的包装。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="基本使用。"
        code={`import { Input } from '@myui/components'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState('')

  return (
    <Input
      placeholder="请输入内容"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}`}
      >
        <Input
          placeholder="请输入内容"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </CodeBlock>

      <CodeBlock
        title="带标签的输入框"
        description="输入框可以配置标签和辅助文本。"
        code={`import { Input } from '@myui/components'

function App() {
  return (
    <div style={{ maxWidth: '300px' }}>
      <Input
        label="用户名"
        placeholder="请输入用户名"
        helperText="用户名长度为 3-20 个字符"
      />
    </div>
  )
}`}
      >
        <div style={{ maxWidth: '300px' }}>
          <Input
            label="用户名"
            placeholder="请输入用户名"
            helperText="用户名长度为 3-20 个字符"
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="带图标的输入框"
        description="输入框可以配置左侧或右侧图标。"
        code={`import { Input } from '@myui/components'

function App() {
  const SearchIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
      <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
  
  const LockIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="16" r="1" fill="currentColor"/>
    </svg>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
      <Input
        placeholder="搜索..."
        leftIcon={SearchIcon}
      />
      <Input
        type="password"
        placeholder="请输入密码"
        rightIcon={LockIcon}
      />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
          <Input
            placeholder="搜索..."
            leftIcon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
          />
          <Input
            type="password"
            placeholder="请输入密码"
            rightIcon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="16" r="1" fill="currentColor"/>
              </svg>
            }
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="不同尺寸"
        description="输入框有大、中、小三种尺寸。"
        code={`import { Input } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
      <Input size="sm" placeholder="小尺寸" />
      <Input size="md" placeholder="中尺寸" />
      <Input size="lg" placeholder="大尺寸" />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
          <Input size="sm" placeholder="小尺寸" />
          <Input size="md" placeholder="中尺寸" />
          <Input size="lg" placeholder="大尺寸" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="错误状态"
        description="输入框可以显示错误状态和错误信息。"
        code={`import { Input } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
      <Input
        label="邮箱地址"
        placeholder="请输入邮箱"
        error
        helperText="请输入有效的邮箱地址"
      />
      <Input
        label="密码"
        type="password"
        placeholder="请输入密码"
        disabled
        helperText="此输入框已被禁用"
      />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
          <Input
            label="邮箱地址"
            placeholder="请输入邮箱"
            error
            helperText="请输入有效的邮箱地址"
          />
          <Input
            label="密码"
            type="password"
            placeholder="请输入密码"
            disabled
            helperText="此输入框已被禁用"
          />
        </div>
      </CodeBlock>

      <PropsTable data={inputProps} />
    </div>
  )
}

// 组件总览页面
function OverviewDocs() {
  return (
    <div style={{ marginBottom: '64px' }}>
      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
              MyUI
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.75', margin: 0 }}>
              现代化的 React 组件库，提供高质量的组件和设计规范
            </p>
          </div>
          <ThemeToggle />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '32px' }}>
          <Card variant="outlined" padding="lg">
            <h3 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>🎨 现代化设计</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              基于最新的设计趋势，提供美观且一致的用户界面组件。
            </p>
          </Card>
          
          <Card variant="outlined" padding="lg">
            <h3 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>🔧 TypeScript 支持</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              完整的 TypeScript 类型定义，提供更好的开发体验。
            </p>
          </Card>
          
          <Card variant="outlined" padding="lg">
            <h3 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>🌙 主题支持</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              内置浅色和深色主题，支持自定义主题配置。
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

// 快速开始页面
function QuickStartDocs() {
  return (
    <div style={{ marginBottom: '64px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
        快速开始
      </h1>
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.75', marginBottom: '32px' }}>
        欢迎使用 MyUI！按照以下步骤快速开始使用我们的组件库。
      </p>
      
      <CodeBlock
        title="安装"
        description="使用 npm 或 yarn 安装 MyUI 组件库。"
        code={`# 使用 npm
npm install @myui/components

# 使用 yarn
yarn add @myui/components

# 使用 pnpm
pnpm add @myui/components`}
        language="bash"
      >
        <div style={{ padding: '16px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
          <code>npm install @myui/components</code>
        </div>
      </CodeBlock>
      
      <CodeBlock
        title="基础使用"
        description="在你的 React 应用中导入和使用 MyUI 组件。"
        code={`import React from 'react'
import { ThemeProvider, Button, Input } from '@myui/components'
import '@myui/components/dist/style.css'

function App() {
  return (
    <ThemeProvider>
      <div style={{ padding: '20px' }}>
        <h1>Hello MyUI!</h1>
        <Input placeholder="输入一些内容..." />
        <Button variant="primary">点击我</Button>
      </div>
    </ThemeProvider>
  )
}

export default App`}
      >
        <div style={{ padding: '20px', border: '1px dashed var(--border-color)', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 16px 0' }}>Hello MyUI!</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px' }}>
            <Input placeholder="输入一些内容..." />
            <Button variant="primary">点击我</Button>
          </div>
        </div>
      </CodeBlock>
    </div>
  )
}

// Icon 组件文档
function IconDocs() {
  const iconProps: PropItem[] = [
    {
      name: 'name',
      type: 'IconName',
      default: '-',
      description: '图标名称，支持内置图标集合'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number",
      default: "'md'",
      description: '图标大小，可以是预设尺寸或自定义数值'
    },
    {
      name: 'color',
      type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | string",
      default: '-',
      description: '图标颜色，可以是预设颜色或自定义颜色值'
    },
    {
      name: 'spin',
      type: 'boolean',
      default: 'false',
      description: '是否旋转动画'
    },
    {
      name: 'rotate',
      type: 'number',
      default: '-',
      description: '旋转角度（度）'
    },
    {
      name: 'flip',
      type: "'horizontal' | 'vertical' | 'both'",
      default: '-',
      description: '翻转方向'
    },
    {
      name: 'className',
      type: 'string',
      default: '-',
      description: '自定义类名'
    },
    {
      name: 'onClick',
      type: '() => void',
      default: '-',
      description: '点击事件回调'
    }
  ]

  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
        Icon 图标
      </h1>
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.75', marginBottom: '32px' }}>
        丰富的图标集合，支持多种尺寸、颜色和交互效果。
      </p>

      <CodeBlock
        title="基础用法"
        description="最简单的用法，指定图标名称即可。"
        code={`import { Icon } from '@myui/components'

function App() {
  return (
    <div>
      <Icon name="home" />
      <Icon name="user" />
      <Icon name="settings" />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Icon name="home" />
          <Icon name="user" />
          <Icon name="settings" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="不同尺寸"
        description="通过 size 属性控制图标大小。"
        code={`<Icon name="star" size="xs" />
<Icon name="star" size="sm" />
<Icon name="star" size="md" />
<Icon name="star" size="lg" />
<Icon name="star" size="xl" />
<Icon name="star" size={32} />`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Icon name="star" size="xs" />
          <Icon name="star" size="sm" />
          <Icon name="star" size="md" />
          <Icon name="star" size="lg" />
          <Icon name="star" size="xl" />
          <Icon name="star" size={32} />
        </div>
      </CodeBlock>

      <CodeBlock
        title="不同颜色"
        description="使用预设颜色或自定义颜色值。"
        code={`<Icon name="heart" color="primary" />
<Icon name="heart" color="success" />
<Icon name="heart" color="warning" />
<Icon name="heart" color="danger" />
<Icon name="heart" color="#8b5cf6" />
<Icon name="heart" color="rgb(236, 72, 153)" />`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Icon name="heart" color="primary" />
          <Icon name="heart" color="success" />
          <Icon name="heart" color="warning" />
          <Icon name="heart" color="danger" />
          <Icon name="heart" color="#8b5cf6" />
          <Icon name="heart" color="rgb(236, 72, 153)" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="动画效果"
        description="支持旋转动画和自定义角度。"
        code={`<Icon name="loading" spin />
<Icon name="refresh" spin />
<Icon name="arrow-right" rotate={45} />
<Icon name="arrow-right" rotate={90} />
<Icon name="arrow-right" rotate={180} />`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Icon name="loading" spin />
          <Icon name="refresh" spin />
          <Icon name="arrow-right" rotate={45} />
          <Icon name="arrow-right" rotate={90} />
          <Icon name="arrow-right" rotate={180} />
        </div>
      </CodeBlock>

      <CodeBlock
        title="翻转效果"
        description="支持水平、垂直或双向翻转。"
        code={`<Icon name="arrow-right" />
<Icon name="arrow-right" flip="horizontal" />
<Icon name="arrow-right" flip="vertical" />
<Icon name="arrow-right" flip="both" />`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Icon name="arrow-right" />
          <Icon name="arrow-right" flip="horizontal" />
          <Icon name="arrow-right" flip="vertical" />
          <Icon name="arrow-right" flip="both" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="可点击图标"
        description="添加 onClick 事件使图标可点击。"
        code={`<Icon 
  name="bell" 
  size="lg" 
  color="primary" 
  onClick={() => alert('通知点击')} 
/>
<Icon 
  name="settings" 
  size="lg" 
  color="secondary" 
  onClick={() => alert('设置点击')} 
/>`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Icon 
            name="bell" 
            size="lg" 
            color="primary" 
            onClick={() => alert('通知点击')} 
          />
          <Icon 
            name="settings" 
            size="lg" 
            color="secondary" 
            onClick={() => alert('设置点击')} 
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="图标集合展示"
        description="内置丰富的图标集合，涵盖常用场景。"
        code={`// 基础图标
<Icon name="home" />
<Icon name="user" />
<Icon name="search" />
<Icon name="bell" />

// 箭头图标  
<Icon name="arrow-up" />
<Icon name="arrow-down" />
<Icon name="chevron-left" />
<Icon name="chevron-right" />

// 操作图标
<Icon name="plus" />
<Icon name="edit" />
<Icon name="trash" />
<Icon name="copy" />

// 文件图标
<Icon name="folder" />
<Icon name="document" />
<Icon name="download" />
<Icon name="upload" />

// 状态图标
<Icon name="heart" />
<Icon name="star" />
<Icon name="eye" />
<Icon name="share" />`}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          <div>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>基础图标</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Icon name="home" size="lg" />
              <Icon name="user" size="lg" />
              <Icon name="search" size="lg" />
              <Icon name="bell" size="lg" />
              <Icon name="mail" size="lg" />
              <Icon name="phone" size="lg" />
            </div>
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>箭头图标</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Icon name="arrow-up" size="lg" />
              <Icon name="arrow-down" size="lg" />
              <Icon name="arrow-left" size="lg" />
              <Icon name="arrow-right" size="lg" />
              <Icon name="chevron-up" size="lg" />
              <Icon name="chevron-down" size="lg" />
            </div>
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>操作图标</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Icon name="plus" size="lg" />
              <Icon name="minus" size="lg" />
              <Icon name="x" size="lg" />
              <Icon name="check" size="lg" />
              <Icon name="edit" size="lg" />
              <Icon name="trash" size="lg" />
            </div>
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>文件图标</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Icon name="folder" size="lg" />
              <Icon name="document" size="lg" />
              <Icon name="download" size="lg" />
              <Icon name="upload" size="lg" />
              <Icon name="copy" size="lg" />
              <Icon name="link" size="lg" />
            </div>
          </div>
        </div>
      </CodeBlock>

      <PropsTable data={iconProps} />
    </div>
  )
}

// 安装页面
function InstallationDocs() {
  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
        安装
      </h1>
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.75', marginBottom: '32px' }}>
        MyUI 支持多种安装方式，选择最适合你的项目的方式。
      </p>
      
      <CodeBlock
        title="NPM 安装"
        description="推荐使用 npm 包管理器安装 MyUI。"
        code={`npm install @myui/components`}
        language="bash"
      >
        <div style={{ padding: '16px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
          <code>npm install @myui/components</code>
        </div>
      </CodeBlock>
      
      <CodeBlock
        title="Yarn 安装"
        description="如果你使用 Yarn 作为包管理器。"
        code={`yarn add @myui/components`}
        language="bash"
      >
        <div style={{ padding: '16px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
          <code>yarn add @myui/components</code>
        </div>
      </CodeBlock>
    </div>
  )
}

// 页面路由组件
function PageRouter({ currentPage }: { currentPage: string }) {
  switch (currentPage) {
    case 'overview':
      return <OverviewDocs />
    case 'quick-start':
      return <QuickStartDocs />
    case 'installation':
      return <InstallationDocs />
    case 'button':
      return <ButtonDocs />
    case 'input':
      return <InputDocs />
    case 'icon':
      return <IconDocs />
    case 'select':
      return (
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
            Select 选择器
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.75' }}>
            选择器组件正在开发中...
          </p>
        </div>
      )
    case 'card':
      return (
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
            Card 卡片
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.75' }}>
            卡片组件正在开发中...
          </p>
        </div>
      )
    case 'table':
      return (
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
            Table 表格
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.75' }}>
            表格组件正在开发中...
          </p>
        </div>
      )
    default:
      return <OverviewDocs />
  }
}

function DocsApp() {
  const [currentPage, setCurrentPage] = React.useState('overview')

  return (
    <ThemeProvider>
      <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
        <PageRouter currentPage={currentPage} />
      </Layout>
    </ThemeProvider>
  )
}

export default DocsApp
