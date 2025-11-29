import { Spin, Button, Card } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'
import { useState } from 'react'

const SpinDocs = () => {
  const [loading, setLoading] = useState(false)

  const spinProps: PropItem[] = [
    {
      name: 'spinning',
      type: 'boolean',
      default: 'true',
      description: '是否为加载中状态'
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      default: "'medium'",
      description: '加载指示器的大小'
    },
    {
      name: 'tip',
      type: 'ReactNode',
      description: '加载时显示的提示文本'
    },
    {
      name: 'delay',
      type: 'number',
      default: '0',
      description: '延迟显示加载效果的时间（毫秒）'
    },
    {
      name: 'indicator',
      type: 'ReactNode',
      description: '自定义加载指示器'
    },
    {
      name: 'fullscreen',
      type: 'boolean',
      default: 'false',
      description: '是否全屏显示'
    },
    {
      name: 'children',
      type: 'ReactNode',
      description: '子元素，Spin 会在其上方显示加载状态'
    }
  ]

  const basicExample = `import { Spin } from '@/components'

function App() {
  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <Spin size="small" />
      <Spin size="medium" />
      <Spin size="large" />
    </div>
  )
}`

  const withContentExample = `import { Spin, Card } from '@/components'
import { useState } from 'react'

function App() {
  const [loading, setLoading] = useState(false)

  return (
    <div>
      <Button onClick={() => setLoading(!loading)}>
        切换加载状态
      </Button>
      <Spin spinning={loading} tip="加载中...">
        <Card>
          <p>这是一些内容</p>
          <p>加载时会显示遮罩层</p>
        </Card>
      </Spin>
    </div>
  )
}`

  const delayExample = `import { Spin } from '@/components'

function App() {
  return (
    <Spin delay={500} tip="延迟 500ms 显示">
      <Card>内容区域</Card>
    </Spin>
  )
}`

  const fullscreenExample = `import { Spin } from '@/components'
import { useState } from 'react'

function App() {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <Button onClick={() => setLoading(true)}>
        显示全屏加载
      </Button>
      <Spin fullscreen spinning={loading} tip="加载中..." />
    </>
  )
}`

  return (
    <div>
      <h1 style={docHeadingStyles.h1}>Spin 加载中</h1>
      <p style={docParagraphStyles.lead}>用于页面和区块的加载中状态。</p>

      <h2 style={docHeadingStyles.h2}>何时使用</h2>
      <ul style={docParagraphStyles.normal}>
        <li>页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。</li>
      </ul>

      <CodeBlock
        title="基础用法"
        description="简单的加载状态。"
        code={basicExample}
        language="tsx"
      >
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Spin size="small" />
          <Spin size="medium" />
          <Spin size="large" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="包裹内容"
        description="可以直接把内容包裹在 Spin 中，Spin 会在内容上方显示加载状态。"
        code={withContentExample}
        language="tsx"
      >
        <div style={{ padding: '24px', background: '#f5f5f5', borderRadius: '8px', width: '100%' }}>
          <Button onClick={() => setLoading(!loading)} style={{ marginBottom: '16px' }}>
            切换加载状态
          </Button>
          <Spin spinning={loading} tip="加载中...">
            <Card>
              <h3>卡片标题</h3>
              <p>这是一些内容</p>
              <p>加载时会显示遮罩层</p>
            </Card>
          </Spin>
        </div>
      </CodeBlock>

      <CodeBlock
        title="延迟显示"
        description="延迟显示 loading 效果，防止闪烁。"
        code={delayExample}
        language="tsx"
      >
        <Spin delay={500} tip="延迟 500ms 显示">
          <Card>内容区域</Card>
        </Spin>
      </CodeBlock>

      <CodeBlock
        title="全屏加载"
        description="使用 fullscreen 属性可以全屏显示加载状态。"
        code={fullscreenExample}
        language="tsx"
      >
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button onClick={() => setLoading(true)}>
            显示全屏加载
          </Button>
          <Spin fullscreen spinning={loading} tip="加载中..." />
        </div>
      </CodeBlock>

      <h2 style={docHeadingStyles.h2}>API</h2>
      <PropsTable data={spinProps} />
    </div>
  )
}

export default SpinDocs
