
import { Badge, Avatar } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const BadgeDocs = () => {
  const badgeProps: PropItem[] = [
    {
      name: 'count',
      type: 'number | ReactNode',
      description: '展示的数字，大于 overflowCount 时显示为 ${overflowCount}+，为 0 时隐藏',
      required: false
    },
    {
      name: 'overflowCount',
      type: 'number',
      default: '99',
      description: '展示封顶的数字值',
      required: false
    },
    {
      name: 'dot',
      type: 'boolean',
      default: 'false',
      description: '不展示数字，只有一个小红点',
      required: false
    },
    {
      name: 'status',
      type: "'success' | 'processing' | 'default' | 'error' | 'warning'",
      description: '设置 Badge 为状态点',
      required: false
    },
    {
      name: 'text',
      type: 'string',
      description: '在设置了 status 的前提下有效，设置状态点的文本',
      required: false
    },
    {
      name: 'color',
      type: 'string',
      description: '自定义小圆点的颜色',
      required: false
    }
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Badge 徽标数</h1>
        <p style={docParagraphStyles.lead}>
          图标右上角的圆形徽标数字。
        </p>
      </div>

      <CodeBlock
        title="基本用法"
        description="简单的徽章展示，当 count 为 0 时，默认不显示，但是可以使用 showZero 修改为显示。"
        code={`import { Badge, Avatar } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <Badge count={5}>
        <Avatar shape="square" size="lg" style={{ backgroundColor: '#fde3cf' }} />
      </Badge>
      <Badge count={0} showZero>
        <Avatar shape="square" size="lg" style={{ backgroundColor: '#fde3cf' }} />
      </Badge>
      <Badge count={<span style={{ color: '#f5222d' }}>4</span>}>
        <Avatar shape="square" size="lg" style={{ backgroundColor: '#fde3cf' }} />
      </Badge>
    </div>
  )
} `}
      >
        <div style={{ display: 'flex', gap: '24px' }}>
          <Badge count={5}>
            <Avatar shape="square" size="lg" style={{ backgroundColor: '#fde3cf' }} />
          </Badge>
          <Badge count={0}>
            <Avatar shape="square" size="lg" style={{ backgroundColor: '#fde3cf' }} />
          </Badge>
        </div>
      </CodeBlock>

      <CodeBlock
        title="封顶数字"
        description="超过 overflowCount 的会显示为 ${overflowCount}+，默认的 overflowCount 为 99。"
        code={`import { Badge, Avatar } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <Badge count={99}>
        <Avatar shape="square" size="lg" style={{ backgroundColor: '#fde3cf' }} />
      </Badge>
      <Badge count={100}>
        <Avatar shape="square" size="lg" style={{ backgroundColor: '#fde3cf' }} />
      </Badge>
      <Badge count={99} overflowCount={10}>
        <Avatar shape="square" size="lg" style={{ backgroundColor: '#fde3cf' }} />
      </Badge>
      <Badge count={1000} overflowCount={999}>
        <Avatar shape="square" size="lg" style={{ backgroundColor: '#fde3cf' }} />
      </Badge>
    </div>
  )
} `}
      >
        <div style={{ display: 'flex', gap: '24px' }}>
          <Badge count={99}>
            <Avatar shape="square" size="lg" style={{ backgroundColor: '#fde3cf' }} />
          </Badge>
          <Badge count={100}>
            <Avatar shape="square" size="lg" style={{ backgroundColor: '#fde3cf' }} />
          </Badge>
          <Badge count={99} overflowCount={10}>
            <Avatar shape="square" size="lg" style={{ backgroundColor: '#fde3cf' }} />
          </Badge>
          <Badge count={1000} overflowCount={999}>
            <Avatar shape="square" size="lg" style={{ backgroundColor: '#fde3cf' }} />
          </Badge>
        </div>
      </CodeBlock>

      <CodeBlock
        title="独立使用"
        description="不包裹任何元素即是独立使用，可自定样式展示。"
        code={`import { Badge } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Badge count={25} />
      <Badge count={4} style={{ backgroundColor: '#52c41a' }} />
      <Badge count={109} style={{ backgroundColor: '#52c41a' }} />
    </div>
  )
} `}
      >
        <div style={{ display: 'flex', gap: '16px' }}>
          <Badge count={25} />
          <Badge count={4} style={{ backgroundColor: '#52c41a' }} />
          <Badge count={109} style={{ backgroundColor: '#52c41a' }} />
        </div>
      </CodeBlock>

      <CodeBlock
        title="小红点"
        description="没有具体的数字。"
        code={`import { Badge, Avatar } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <Badge dot>
        <Avatar shape="square" size="lg" style={{ backgroundColor: '#fde3cf' }} />
      </Badge>
      <Badge dot>
        <a href="#">Link something</a>
      </Badge>
    </div>
  )
} `}
      >
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Badge dot>
            <Avatar shape="square" size="lg" style={{ backgroundColor: '#fde3cf' }} />
          </Badge>
          <Badge dot>
            <span style={{ color: 'var(--color-primary)' }}>Link something</span>
          </Badge>
        </div>
      </CodeBlock>

      <CodeBlock
        title="状态点"
        description="用于表示状态的小圆点。"
        code={`import { Badge } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Badge status="success" text="Success" />
      <Badge status="error" text="Error" />
      <Badge status="default" text="Default" />
      <Badge status="processing" text="Processing" />
      <Badge status="warning" text="Warning" />
    </div>
  )
} `}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Badge status="success" text="Success" />
          <Badge status="error" text="Error" />
          <Badge status="default" text="Default" />
          <Badge status="processing" text="Processing" />
          <Badge status="warning" text="Warning" />
        </div>
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={{ ...docHeadingStyles.h2, marginBottom: '24px' }}>API</h2>
        <PropsTable data={badgeProps} />
      </div>
    </div>
  )
}

export default BadgeDocs
