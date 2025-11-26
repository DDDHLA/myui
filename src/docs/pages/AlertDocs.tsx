import React from 'react'
import { Alert, Button } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const AlertDocs = () => {
  const alertProps: PropItem[] = [
    {
      name: 'title',
      type: 'ReactNode',
      description: '警告提示的标题'
    },
    {
      name: 'message',
      type: 'ReactNode',
      description: '警告提示的内容'
    },
    {
      name: 'type',
      type: "'success' | 'info' | 'warning' | 'error'",
      default: "'info'",
      description: '警告提示的类型'
    },
    {
      name: 'showIcon',
      type: 'boolean',
      default: 'true',
      description: '是否显示图标'
    },
    {
      name: 'icon',
      type: 'ReactNode',
      description: '自定义图标'
    },
    {
      name: 'closable',
      type: 'boolean',
      default: 'false',
      description: '是否可关闭'
    },
    {
      name: 'onClose',
      type: '() => void',
      description: '关闭时的回调'
    },
    {
      name: 'bordered',
      type: 'boolean',
      default: 'true',
      description: '是否显示边框'
    },
    {
      name: 'action',
      type: 'ReactNode',
      description: '辅助操作'
    }
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Alert 警告提示</h1>
        <p style={docParagraphStyles.lead}>
          警告提示,展现需要关注的信息。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="最简单的用法,适用于简短的警告提示。"
        code={`import { Alert } from '@myui/components'

function App() {
  return <Alert message="这是一条信息提示" />
}`}
      >
        <Alert message="这是一条信息提示" />
      </CodeBlock>

      <CodeBlock
        title="四种类型"
        description="共有四种样式:success、info、warning、error。"
        code={`import { Alert } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert type="success" message="Success Text" />
      <Alert type="info" message="Info Text" />
      <Alert type="warning" message="Warning Text" />
      <Alert type="error" message="Error Text" />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Alert type="success" message="Success Text" />
          <Alert type="info" message="Info Text" />
          <Alert type="warning" message="Warning Text" />
          <Alert type="error" message="Error Text" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="带标题"
        description="含有标题和辅助性文字介绍的警告提示。"
        code={`import { Alert } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert
        type="success"
        title="成功提示的标题"
        message="这是成功提示的详细描述,可以写很多文字来说明。"
      />
      <Alert
        type="info"
        title="信息提示的标题"
        message="这是信息提示的详细描述,可以写很多文字来说明。"
      />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Alert
            type="success"
            title="成功提示的标题"
            message="这是成功提示的详细描述,可以写很多文字来说明。"
          />
          <Alert
            type="info"
            title="信息提示的标题"
            message="这是信息提示的详细描述,可以写很多文字来说明。"
          />
          <Alert
            type="warning"
            title="警告提示的标题"
            message="这是警告提示的详细描述,可以写很多文字来说明。"
          />
          <Alert
            type="error"
            title="错误提示的标题"
            message="这是错误提示的详细描述,可以写很多文字来说明。"
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="可关闭"
        description="显示关闭按钮,点击可关闭警告提示。"
        code={`import { Alert } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert
        type="success"
        message="Success Text"
        closable
        onClose={() => console.log('closed')}
      />
      <Alert
        type="info"
        title="Info Title"
        message="Info Text"
        closable
      />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Alert
            type="success"
            message="Success Text"
            closable
            onClose={() => console.log('closed')}
          />
          <Alert
            type="info"
            title="Info Title"
            message="Info Text"
            closable
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="不显示图标"
        description="不显示图标的警告提示。"
        code={`import { Alert } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert type="success" message="Success Text" showIcon={false} />
      <Alert type="info" message="Info Text" showIcon={false} />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Alert type="success" message="Success Text" showIcon={false} />
          <Alert type="info" message="Info Text" showIcon={false} />
          <Alert type="warning" message="Warning Text" showIcon={false} />
          <Alert type="error" message="Error Text" showIcon={false} />
        </div>
      </CodeBlock>

      <CodeBlock
        title="无边框"
        description="不显示边框的警告提示。"
        code={`import { Alert } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert type="success" message="Success Text" bordered={false} />
      <Alert type="info" message="Info Text" bordered={false} />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Alert type="success" message="Success Text" bordered={false} />
          <Alert type="info" message="Info Text" bordered={false} />
          <Alert type="warning" message="Warning Text" bordered={false} />
          <Alert type="error" message="Error Text" bordered={false} />
        </div>
      </CodeBlock>

      <CodeBlock
        title="辅助操作"
        description="可以在右侧添加辅助操作。"
        code={`import { Alert, Button } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert
        type="info"
        message="信息提示"
        action={
          <Button size="sm" variant="link">
            查看详情
          </Button>
        }
      />
      <Alert
        type="warning"
        title="警告标题"
        message="警告内容说明"
        action={
          <Button size="sm" variant="link">
            处理
          </Button>
        }
      />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Alert
            type="info"
            message="信息提示"
            action={
              <Button size="sm" variant="link">
                查看详情
              </Button>
            }
          />
          <Alert
            type="warning"
            title="警告标题"
            message="警告内容说明"
            action={
              <Button size="sm" variant="link">
                处理
              </Button>
            }
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="自定义图标"
        description="可以自定义图标。"
        code={`import { Alert } from '@myui/components'

function App() {
  return (
    <Alert
      type="info"
      message="自定义图标的提示"
      icon={<CustomIcon />}
    />
  )
}`}
      >
        <Alert
          type="info"
          message="自定义图标的提示"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7l10 5 10-5-10-5z"
                stroke="currentColor"
                strokeWidth="2"
                fill="currentColor"
                opacity="0.2"
              />
              <path
                d="M2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          }
        />
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>API</h2>
        <PropsTable data={alertProps} />
      </div>
    </div>
  )
}

export default AlertDocs
