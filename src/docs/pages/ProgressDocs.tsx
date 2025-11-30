import React from 'react'
import { Progress } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const ProgressDocs = () => {
  const [percent, setPercent] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) return 0
        return prev + 10
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const progressProps: PropItem[] = [
    {
      name: 'percent',
      type: 'number',
      default: '0',
      description: '当前进度百分比 (0-100)'
    },
    {
      name: 'type',
      type: "'line' | 'circle' | 'dashboard'",
      default: "'line'",
      description: '进度条类型'
    },
    {
      name: 'status',
      type: "'normal' | 'success' | 'error' | 'warning'",
      default: "'normal'",
      description: '进度条状态'
    },
    {
      name: 'showInfo',
      type: 'boolean',
      default: 'true',
      description: '是否显示进度文字'
    },
    {
      name: 'strokeWidth',
      type: 'number',
      default: 'line: 8, circle: 6',
      description: '进度条线的宽度'
    },
    {
      name: 'strokeColor',
      type: 'string',
      description: '进度条的颜色'
    },
    {
      name: 'trailColor',
      type: 'string',
      default: "'#f0f0f0'",
      description: '未完成部分的颜色'
    },
    {
      name: 'width',
      type: 'number',
      default: '120',
      description: '圆形进度条画布宽度'
    },
    {
      name: 'format',
      type: '(percent?: number) => ReactNode',
      description: '自定义进度文字格式'
    }
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Progress 进度条</h1>
        <p style={docParagraphStyles.lead}>
          展示操作的当前进度。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="标准的进度条。"
        code={`import { Progress } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Progress percent={30} />
      <Progress percent={50} />
      <Progress percent={70} />
      <Progress percent={100} />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Progress percent={30} />
          <Progress percent={50} />
          <Progress percent={70} />
          <Progress percent={100} />
        </div>
      </CodeBlock>

      <CodeBlock
        title="进度条状态"
        description="不同状态的进度条。"
        code={`import { Progress } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Progress percent={30} status="normal" />
      <Progress percent={50} status="success" />
      <Progress percent={70} status="warning" />
      <Progress percent={100} status="error" />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Progress percent={30} status="normal" />
          <Progress percent={50} status="success" />
          <Progress percent={70} status="warning" />
          <Progress percent={100} status="error" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="圆形进度条"
        description="圆形的进度条。"
        code={`import { Progress } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <Progress type="circle" percent={25} />
      <Progress type="circle" percent={50} />
      <Progress type="circle" percent={75} />
      <Progress type="circle" percent={100} status="success" />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <Progress type="circle" percent={25} />
          <Progress type="circle" percent={50} />
          <Progress type="circle" percent={75} />
          <Progress type="circle" percent={100} status="success" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="仪表盘"
        description="仪表盘样式的进度条。"
        code={`import { Progress } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <Progress type="dashboard" percent={25} />
      <Progress type="dashboard" percent={50} />
      <Progress type="dashboard" percent={75} />
      <Progress type="dashboard" percent={100} status="success" />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <Progress type="dashboard" percent={25} />
          <Progress type="dashboard" percent={50} />
          <Progress type="dashboard" percent={75} />
          <Progress type="dashboard" percent={100} status="success" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="动态进度"
        description="会动的进度条。"
        code={`import { Progress } from '@paidaxinghaha/my-ui-react'
import { useState, useEffect } from 'react'

function App() {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) return 0
        return prev + 10
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Progress percent={percent} />
      <div style={{ display: 'flex', gap: '16px' }}>
        <Progress type="circle" percent={percent} />
        <Progress type="dashboard" percent={percent} />
      </div>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Progress percent={percent} />
          <div style={{ display: 'flex', gap: '16px' }}>
            <Progress type="circle" percent={percent} />
            <Progress type="dashboard" percent={percent} />
          </div>
        </div>
      </CodeBlock>

      <CodeBlock
        title="自定义文字格式"
        description="通过 format 属性自定义进度文字。"
        code={`import { Progress } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Progress percent={75} format={(p) => \`\${p} 天\`} />
      <Progress
        type="circle"
        percent={80}
        format={(p) => \`\${p} 分\`}
      />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Progress percent={75} format={(p) => `${p} 天`} />
          <Progress
            type="circle"
            percent={80}
            format={(p) => `${p} 分`}
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="不同尺寸"
        description="线形进度条和圆形进度条都支持自定义尺寸。"
        code={`import { Progress } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Progress percent={60} strokeWidth={4} />
        <Progress percent={60} strokeWidth={8} />
        <Progress percent={60} strokeWidth={12} />
      </div>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <Progress type="circle" percent={75} width={80} strokeWidth={4} />
        <Progress type="circle" percent={75} width={120} strokeWidth={6} />
        <Progress type="circle" percent={75} width={160} strokeWidth={8} />
      </div>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Progress percent={60} strokeWidth={4} />
            <Progress percent={60} strokeWidth={8} />
            <Progress percent={60} strokeWidth={12} />
          </div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <Progress type="circle" percent={75} width={80} strokeWidth={4} />
            <Progress type="circle" percent={75} width={120} strokeWidth={6} />
            <Progress type="circle" percent={75} width={160} strokeWidth={8} />
          </div>
        </div>
      </CodeBlock>

      <CodeBlock
        title="自定义颜色"
        description="通过 strokeColor 自定义进度条颜色。"
        code={`import { Progress } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Progress percent={60} strokeColor="#722ed1" />
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <Progress type="circle" percent={75} strokeColor="#13c2c2" />
        <Progress type="dashboard" percent={75} strokeColor="#eb2f96" />
      </div>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Progress percent={60} strokeColor="#722ed1" />
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <Progress type="circle" percent={75} strokeColor="#13c2c2" />
            <Progress type="dashboard" percent={75} strokeColor="#eb2f96" />
          </div>
        </div>
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>API</h2>
        <PropsTable data={progressProps} />
      </div>
    </div>
  )
}

export default ProgressDocs
