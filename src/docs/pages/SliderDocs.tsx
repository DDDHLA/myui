import React from 'react'
import { Slider } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const SliderDocs = () => {
  const [value1, setValue1] = React.useState(30)
  const [value2, setValue2] = React.useState(50)
  const [rangeValue, setRangeValue] = React.useState<[number, number]>([20, 60])
  const [verticalValue, setVerticalValue] = React.useState(40)

  const sliderProps: PropItem[] = [
    { name: 'value', type: 'number | [number, number]', description: '当前值（受控模式）' },
    { name: 'defaultValue', type: 'number | [number, number]', default: '0', description: '默认值（非受控模式）' },
    { name: 'onChange', type: '(value: number | [number, number]) => void', description: '值改变时的回调' },
    { name: 'min', type: 'number', default: '0', description: '最小值' },
    { name: 'max', type: 'number', default: '100', description: '最大值' },
    { name: 'step', type: 'number | null', default: '1', description: '步长，为null时可以连续滑动' },
    { name: 'range', type: 'boolean', default: 'false', description: '是否为范围选择' },
    { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
    { name: 'vertical', type: 'boolean', default: 'false', description: '是否垂直显示' },
    { name: 'marks', type: 'Record<number, ReactNode | SliderMark>', description: '刻度标记' },
    { name: 'dots', type: 'boolean', default: 'false', description: '是否显示间断点' },
    { name: 'variant', type: "'primary' | 'success' | 'warning' | 'danger' | 'info'", default: "'primary'", description: '颜色变体' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '滑块尺寸' },
    { name: 'showInput', type: 'boolean', default: 'false', description: '是否显示输入框' },
    { name: 'tooltip', type: '{ formatter?: (value: number) => ReactNode }', description: '提示框配置' }
  ]

  const marks = { 0: '0°C', 26: '26°C', 37: '37°C', 100: '100°C' }
  const percentMarks = { 0: '0%', 25: '25%', 50: '50%', 75: '75%', 100: '100%' }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Slider 滑块</h1>
        <p style={docParagraphStyles.lead}>
          滑块组件，用于在一个范围内选择数值。支持单值和范围选择，提供丰富的自定义选项。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="最简单的滑块用法。"
        code={`import { Slider } from '@myui/components'

function App() {
  const [value, setValue] = useState(30)
  return (
    <>
      <Slider value={value} onChange={setValue} />
      <div>当前值: {value}</div>
    </>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Slider value={value1} onChange={(val) => setValue1(val as number)} />
          <div style={{ fontSize: '14px', color: '#666' }}>当前值: {value1}</div>
        </div>
      </CodeBlock>

      <CodeBlock
        title="禁用状态"
        description="通过 disabled 属性禁用滑块。"
        code={`<Slider defaultValue={40} disabled />`}
      >
        <Slider defaultValue={40} disabled />
      </CodeBlock>

      <CodeBlock
        title="带标签和描述"
        description="可以添加标签和描述文本。"
        code={`<Slider 
  label="音量"
  description="调节系统音量大小"
  value={value}
  onChange={setValue}
/>`}
      >
        <Slider 
          label="音量"
          description="调节系统音量大小"
          value={value2}
          onChange={(val) => setValue2(val as number)}
        />
      </CodeBlock>

      <CodeBlock
        title="范围选择"
        description="通过 range 属性启用范围选择模式。"
        code={`const [range, setRange] = useState<[number, number]>([20, 60])

<Slider 
  range
  value={range}
  onChange={setRange}
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Slider range value={rangeValue} onChange={(val) => setRangeValue(val as [number, number])} />
          <div style={{ fontSize: '14px', color: '#666' }}>范围: [{rangeValue[0]}, {rangeValue[1]}]</div>
        </div>
      </CodeBlock>

      <CodeBlock
        title="步长设置"
        description="通过 step 属性设置步长，设置为 null 可以连续滑动。"
        code={`<Slider defaultValue={30} step={10} />
<Slider defaultValue={0.5} min={0} max={1} step={0.1} />
<Slider defaultValue={50} step={null} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>步长: 10</div>
            <Slider defaultValue={30} step={10} />
          </div>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>连续滑动</div>
            <Slider defaultValue={50} step={null} />
          </div>
        </div>
      </CodeBlock>

      <CodeBlock
        title="刻度标记"
        description="通过 marks 属性添加刻度标记。"
        code={`const marks = { 0: '0°C', 26: '26°C', 37: '37°C', 100: '100°C' }

<Slider defaultValue={37} marks={marks} />`}
      >
        <Slider defaultValue={37} marks={marks} />
      </CodeBlock>

      <CodeBlock
        title="间断点"
        description="通过 dots 属性显示步长间断点。"
        code={`<Slider defaultValue={50} step={10} dots marks={percentMarks} />`}
      >
        <Slider defaultValue={50} step={10} dots marks={percentMarks} />
      </CodeBlock>

      <CodeBlock
        title="尺寸"
        description="提供三种尺寸：sm、md、lg。"
        code={`<Slider defaultValue={30} size="sm" />
<Slider defaultValue={50} size="md" />
<Slider defaultValue={70} size="lg" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Small</div>
            <Slider defaultValue={30} size="sm" />
          </div>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Medium</div>
            <Slider defaultValue={50} size="md" />
          </div>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Large</div>
            <Slider defaultValue={70} size="lg" />
          </div>
        </div>
      </CodeBlock>

      <CodeBlock
        title="颜色变体"
        description="提供多种颜色变体。"
        code={`<Slider defaultValue={30} variant="primary" />
<Slider defaultValue={50} variant="success" />
<Slider defaultValue={60} variant="warning" />
<Slider defaultValue={80} variant="danger" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Slider defaultValue={30} variant="primary" />
          <Slider defaultValue={50} variant="success" />
          <Slider defaultValue={60} variant="warning" />
          <Slider defaultValue={80} variant="danger" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="垂直模式"
        description="通过 vertical 属性启用垂直模式。"
        code={`<Slider vertical value={value} onChange={setValue} />
<Slider vertical defaultValue={60} variant="success" />`}
      >
        <div style={{ display: 'flex', gap: '32px', height: '200px' }}>
          <Slider vertical value={verticalValue} onChange={(val) => setVerticalValue(val as number)} />
          <Slider vertical defaultValue={60} variant="success" />
          <Slider vertical range defaultValue={[20, 80]} variant="warning" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="带输入框"
        description="通过 showInput 属性显示输入框，可以直接输入数值。"
        code={`<Slider defaultValue={30} showInput />
<Slider range defaultValue={[20, 80]} showInput />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Slider defaultValue={30} showInput />
          <Slider range defaultValue={[20, 80]} showInput />
        </div>
      </CodeBlock>

      <CodeBlock
        title="自定义颜色"
        description="可以自定义轨道、滑块等各部分的颜色。"
        code={`<Slider 
  defaultValue={50}
  trackColor="#ff6b6b"
  handleColor="#ff6b6b"
/>

<Slider 
  defaultValue={70}
  trackColor="linear-gradient(90deg, #667eea, #764ba2)"
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Slider defaultValue={50} trackColor="#ff6b6b" handleColor="#ff6b6b" />
          <Slider defaultValue={70} trackColor="linear-gradient(90deg, #667eea 0%, #764ba2 100%)" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="自定义提示框"
        description="可以自定义提示框的格式化方式。"
        code={`<Slider 
  defaultValue={30}
  tooltip={{ formatter: (value) => \`\${value}%\` }}
/>

<Slider 
  defaultValue={75}
  tooltip={{ formatter: (value) => \`\${value}°C\` }}
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Slider defaultValue={30} tooltip={{ formatter: (value) => `${value}%` }} />
          <Slider defaultValue={75} tooltip={{ formatter: (value) => `${value}°C` }} />
        </div>
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>API</h2>
        <PropsTable data={sliderProps} />
      </div>
    </div>
  )
}

export default SliderDocs
