import { useState } from 'react'
import { Rate } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const RateDocs = () => {
  const [value1, setValue1] = useState(3)
  const [value2, setValue2] = useState(2.5)

  const rateProps: PropItem[] = [
    { name: 'value', type: 'number', description: '当前值（受控模式）' },
    { name: 'defaultValue', type: 'number', default: '0', description: '默认值（非受控模式）' },
    { name: 'count', type: 'number', default: '5', description: '星星总数' },
    { name: 'allowHalf', type: 'boolean', default: 'false', description: '是否允许半选' },
    { name: 'allowClear', type: 'boolean', default: 'true', description: '是否允许再次点击清除' },
    { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
    { name: 'readonly', type: 'boolean', default: 'false', description: '是否只读' },
    { name: 'character', type: 'ReactNode | ((index: number) => ReactNode)', description: '自定义字符' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '尺寸' },
    { name: 'color', type: 'string', description: '自定义颜色' },
    { name: 'onChange', type: '(value: number) => void', description: '选中时回调' },
    { name: 'onHoverChange', type: '(value: number) => void', description: 'hover 时回调' },
    { name: 'tooltips', type: 'string[]', description: '提示信息数组' }
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Rate 评分</h1>
        <p style={docParagraphStyles.lead}>
          评分组件，用于对事物进行评级操作或展示评价结果。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="最简单的用法。"
        code={`import { Rate } from '@myui/components'

function App() {
  const [value, setValue] = useState(3)
  return <Rate value={value} onChange={setValue} />
}`}
      >
        <Rate value={value1} onChange={setValue1} />
      </CodeBlock>

      <CodeBlock
        title="半星"
        description="支持选中半星，通过 allowHalf 属性开启。"
        code={`<Rate allowHalf defaultValue={2.5} />`}
      >
        <Rate allowHalf value={value2} onChange={setValue2} />
      </CodeBlock>

      <CodeBlock
        title="只读"
        description="只读模式，无法进行鼠标交互。"
        code={`<Rate readonly defaultValue={3.5} allowHalf />`}
      >
        <Rate readonly defaultValue={3.5} allowHalf />
      </CodeBlock>

      <CodeBlock
        title="禁用状态"
        description="禁用状态的评分组件。"
        code={`<Rate disabled defaultValue={2} />`}
      >
        <Rate disabled defaultValue={2} />
      </CodeBlock>

      <CodeBlock
        title="尺寸"
        description="提供三种尺寸：sm、md、lg。"
        code={`<Rate defaultValue={3} size="sm" />
<Rate defaultValue={3} size="md" />
<Rate defaultValue={3} size="lg" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '60px', fontSize: '14px' }}>Small</span>
            <Rate defaultValue={3} size="sm" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '60px', fontSize: '14px' }}>Medium</span>
            <Rate defaultValue={3} size="md" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '60px', fontSize: '14px' }}>Large</span>
            <Rate defaultValue={3} size="lg" />
          </div>
        </div>
      </CodeBlock>

      <CodeBlock
        title="自定义数量"
        description="自定义星星数量。"
        code={`<Rate count={10} defaultValue={7} />`}
      >
        <Rate count={10} defaultValue={7} />
      </CodeBlock>

      <CodeBlock
        title="自定义颜色"
        description="可以自定义评分的颜色。"
        code={`<Rate defaultValue={4} color="#ff6b6b" />
<Rate defaultValue={3} color="#52c41a" />
<Rate defaultValue={5} color="#1890ff" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Rate defaultValue={4} color="#ff6b6b" />
          <Rate defaultValue={3} color="#52c41a" />
          <Rate defaultValue={5} color="#1890ff" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="文字提示"
        description="通过 tooltips 属性添加每个等级的提示文字。"
        code={`const tooltips = ['很差', '较差', '一般', '满意', '非常满意']

<Rate tooltips={tooltips} defaultValue={3} />`}
      >
        <Rate 
          tooltips={['很差', '较差', '一般', '满意', '非常满意']} 
          defaultValue={3} 
        />
      </CodeBlock>

      <CodeBlock
        title="自定义字符"
        description="可以将星星替换为其他字符，如字母、数字、字体图标甚至中文。"
        code={`<Rate character="A" defaultValue={3} />
<Rate character="好" defaultValue={4} />
<Rate character="♥" defaultValue={5} color="#ff4d4f" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Rate character="A" defaultValue={3} />
          <Rate character="好" defaultValue={4} />
          <Rate character="♥" defaultValue={5} color="#ff4d4f" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="动态字符"
        description="可以根据索引动态渲染不同字符。"
        code={`<Rate 
  character={(index) => index + 1} 
  defaultValue={3} 
/>`}
      >
        <Rate 
          character={(index) => <span style={{ fontSize: '0.8em' }}>{index + 1}</span>} 
          defaultValue={3} 
        />
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>API</h2>
        <PropsTable data={rateProps} />
      </div>
    </div>
  )
}

export default RateDocs
