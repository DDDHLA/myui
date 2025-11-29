import React from 'react'
import { Button } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const ButtonDocs = () => {
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
        <h1 style={docHeadingStyles.h1}>Button 按钮</h1>
        <p style={docParagraphStyles.lead}>
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

      <h2 style={docHeadingStyles.h2}>块级按钮</h2>
      <p style={docParagraphStyles}>按钮可以占满容器的宽度。</p>
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

export default ButtonDocs
