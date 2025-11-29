import { Space, Button, Card, Divider } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const SpaceDocs = () => {
  const spaceProps: PropItem[] = [
    {
      name: 'size',
      type: "'small' | 'medium' | 'large' | number | [number, number]",
      default: "'medium'",
      description: '间距大小，可以是预设值或自定义数值'
    },
    {
      name: 'direction',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: '间距方向'
    },
    {
      name: 'align',
      type: "'start' | 'end' | 'center' | 'baseline'",
      description: '对齐方式'
    },
    {
      name: 'wrap',
      type: 'boolean',
      default: 'false',
      description: '是否自动换行，仅在 horizontal 时有效'
    },
    {
      name: 'split',
      type: 'ReactNode',
      description: '设置分隔符'
    },
    {
      name: 'children',
      type: 'ReactNode',
      description: '子元素'
    }
  ]

  const basicExample = `import { Space, Button } from '@/components'

function App() {
  return (
    <Space>
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
      <Button>按钮 3</Button>
    </Space>
  )
}`

  const sizeExample = `import { Space, Button } from '@/components'

function App() {
  return (
    <div>
      <Space size="small">
        <Button>Small</Button>
        <Button>Small</Button>
        <Button>Small</Button>
      </Space>
      
      <Space size="medium">
        <Button>Medium</Button>
        <Button>Medium</Button>
        <Button>Medium</Button>
      </Space>
      
      <Space size="large">
        <Button>Large</Button>
        <Button>Large</Button>
        <Button>Large</Button>
      </Space>
      
      <Space size={32}>
        <Button>Custom</Button>
        <Button>Custom</Button>
        <Button>Custom</Button>
      </Space>
    </div>
  )
}`

  const verticalExample = `import { Space, Card } from '@/components'

function App() {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card>卡片 1</Card>
      <Card>卡片 2</Card>
      <Card>卡片 3</Card>
    </Space>
  )
}`

  const alignExample = `import { Space, Button } from '@/components'

function App() {
  return (
    <div>
      <Space align="start">
        <Button>Start</Button>
        <Button style={{ height: '60px' }}>Tall</Button>
        <Button>Start</Button>
      </Space>
      
      <Space align="center">
        <Button>Center</Button>
        <Button style={{ height: '60px' }}>Tall</Button>
        <Button>Center</Button>
      </Space>
      
      <Space align="end">
        <Button>End</Button>
        <Button style={{ height: '60px' }}>Tall</Button>
        <Button>End</Button>
      </Space>
    </div>
  )
}`

  const wrapExample = `import { Space, Button } from '@/components'

function App() {
  return (
    <Space wrap>
      {Array.from({ length: 20 }, (_, i) => (
        <Button key={i}>按钮 {i + 1}</Button>
      ))}
    </Space>
  )
}`

  const splitExample = `import { Space, Button, Divider } from '@/components'

function App() {
  return (
    <Space split={<Divider type="vertical" />}>
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
      <Button>按钮 3</Button>
    </Space>
  )
}`

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Space 间距</h1>
        <p style={docParagraphStyles.lead}>设置组件之间的间距。</p>
      </div>

      <h2 style={docHeadingStyles.h2}>何时使用</h2>
      <ul style={docParagraphStyles.normal}>
        <li>避免组件紧贴在一起，拉开统一的空间。</li>
        <li>适合行内元素的水平间距。</li>
        <li>可以设置各种水平对齐方式。</li>
      </ul>

      <CodeBlock
        title="基础用法"
        description="相邻组件水平间距。"
        code={basicExample}
        language="tsx"
      >
        <Space>
          <Button>按钮 1</Button>
          <Button>按钮 2</Button>
          <Button>按钮 3</Button>
        </Space>
      </CodeBlock>

      <CodeBlock
        title="间距大小"
        description="可以设置不同的间距大小。"
        code={sizeExample}
        language="tsx"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Space size="small">
            <Button>Small</Button>
            <Button>Small</Button>
            <Button>Small</Button>
          </Space>

          <Space size="medium">
            <Button>Medium</Button>
            <Button>Medium</Button>
            <Button>Medium</Button>
          </Space>

          <Space size="large">
            <Button>Large</Button>
            <Button>Large</Button>
            <Button>Large</Button>
          </Space>

          <Space size={32}>
            <Button>Custom 32px</Button>
            <Button>Custom 32px</Button>
            <Button>Custom 32px</Button>
          </Space>
        </div>
      </CodeBlock>

      <CodeBlock
        title="垂直间距"
        description="可以设置垂直方向的间距。"
        code={verticalExample}
        language="tsx"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Card>卡片 1</Card>
          <Card>卡片 2</Card>
          <Card>卡片 3</Card>
        </Space>
      </CodeBlock>

      <CodeBlock
        title="对齐方式"
        description="设置子元素的对齐方式。"
        code={alignExample}
        language="tsx"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Space align="start">
            <Button>Start</Button>
            <Button style={{ height: '60px' }}>Tall</Button>
            <Button>Start</Button>
          </Space>

          <Space align="center">
            <Button>Center</Button>
            <Button style={{ height: '60px' }}>Tall</Button>
            <Button>Center</Button>
          </Space>

          <Space align="end">
            <Button>End</Button>
            <Button style={{ height: '60px' }}>Tall</Button>
            <Button>End</Button>
          </Space>
        </div>
      </CodeBlock>

      <CodeBlock
        title="自动换行"
        description="自动换行。"
        code={wrapExample}
        language="tsx"
      >
        <Space wrap>
          {Array.from({ length: 20 }, (_, i) => (
            <Button key={i}>按钮 {i + 1}</Button>
          ))}
        </Space>
      </CodeBlock>

      <CodeBlock
        title="分隔符"
        description="设置分隔符。"
        code={splitExample}
        language="tsx"
      >
        <Space split={<Divider type="vertical" />}>
          <Button>按钮 1</Button>
          <Button>按钮 2</Button>
          <Button>按钮 3</Button>
        </Space>
      </CodeBlock>

      <h2 style={docHeadingStyles.h2}>API</h2>
      <PropsTable data={spaceProps} />
    </div>
  )
}

export default SpaceDocs
