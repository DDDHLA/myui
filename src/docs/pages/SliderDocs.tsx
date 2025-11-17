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
    {
      name: 'value',
      type: 'number | [number, number]',
      description: '当前值（受控模式）'
    },
    {
      name: 'defaultValue',
      type: 'number | [number, number]',
      default: '0',
      description: '默认值（非受控模式）'
    },
    {
      name: 'onChange',
      type: '(value: number | [number, number]) => void',
      description: '值改变时的回调'
    },
    {
      name: 'onAfterChange',
      type: '(value: number | [number, number]) => void',
      description: '拖动结束后的回调'
    },
    {
      name: 'min',
      type: 'number',
      default: '0',
      description: '最小值'
    },
    {
      name: 'max',
      type: 'number',
      default: '100',
      description: '最大值'
    },
    {
      name: 'step',
      type: 'number | null',
      default: '1',
      description: '步长，为null时可以连续滑动'
    },
    {
      name: 'range',
      type: 'boolean',
      default: 'false',
      description: '是否为范围选择'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: '是否禁用'
    },
    {
      name: 'vertical',
      type: 'boolean',
      default: 'false',
      description: '是否垂直显示'
    },
    {
      name: 'reverse',
      type: 'boolean',
      default: 'false',
      description: '是否反向坐标轴'
    },
    {
      name: 'included',
      type: 'boolean',
      default: 'true',
      description: '是否包含关系（显示激活轨道）'
    },
    {
      name: 'marks',
      type: 'Record<number, ReactNode | SliderMark>',
      description: '刻度标记'
    },
    {
      name: 'dots',
      type: 'boolean',
      default: 'false',
      description: '是否显示间断点'
    },
    {
      name: 'tooltip',
      type: '{ open?: boolean; formatter?: (value: number) => ReactNode; placement?: "top" | "bottom" | "left" | "right" }',
      description: '提示框配置'
    },
    {
      name: 'variant',
      type: "'primary' | 'success' | 'warning' | 'danger' | 'info'",
      default: "'primary'",
      description: '颜色变体'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: '滑块尺寸'
    },
    {
      name: 'trackColor',
      type: 'string',
      description: '激活轨道的颜色'
    },
    {
      name: 'railColor',
      type: 'string',
      description: '背景轨道的颜色'
    },
    {
      name: 'handleColor',
      type: 'string',
      description: '滑块手柄的颜色'
    },
    {
      name: 'showInput',
      type: 'boolean',
      default: 'false',
      description: '是否显示输入框'
    },
    {
      name: 'inputWidth',
      type: 'number | string',
      description: '输入框宽度'
    },
    {
      name: 'label',
      type: 'string',
      description: '标签文本'
    },
    {
      name: 'description',
      type: 'string',
      description: '描述文本'
    }
  ]

  const marks = {
    0: '0°C',
    26: '26°C',
    37: '37°C',
    100: '100°C'
  }

  const percentMarks = {
    0: '0%',
    25: '25%',
    50: '50%',
    75: '75%',
    100: '100%'
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 style={docHeadingStyles.h1}>Slider 滑块</h1>
        <p style={docParagraphStyles.normal}>
          滑块组件，用于在一个范围内选择数值。支持单值和范围选择，提供丰富的自定义选项。
        </p>
      </div>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 style={docHeadingStyles.h2}>基础用法</h2>
        <p style={docParagraphStyles.normal}>最简单的滑块用法。</p>
        
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-4">
          <Slider value={value1} onChange={(val) => setValue1(val as number)} />
          <div className="text-sm text-gray-600 dark:text-gray-400">当前值: {value1}</div>
        </div>

        <CodeBlock language="tsx" code={`import { Slider } from '@/components'

function App() {
  const [value, setValue] = useState(30)

  return (
    <>
      <Slider value={value} onChange={setValue} />
      <div>当前值: {value}</div>
    </>
  )
}`} />
      </section>

      {/* 禁用状态 */}
      <section className="space-y-4">
        <h2 style={docHeadingStyles.h2}>禁用状态</h2>
        <p style={docParagraphStyles.normal}>通过 disabled 属性禁用滑块。</p>
        
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Slider defaultValue={40} disabled />
        </div>

        <CodeBlock language="tsx" code={`<Slider defaultValue={40} disabled />`} />
      </section>

      {/* 带标签 */}
      <section className="space-y-4">
        <h2 style={docHeadingStyles.h2}>带标签和描述</h2>
        <p style={docParagraphStyles.normal}>可以添加标签和描述文本。</p>
        
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Slider 
            label="音量"
            description="调节系统音量大小"
            value={value2}
            onChange={(val) => setValue2(val as number)}
          />
        </div>

        <CodeBlock language="tsx" code={`<Slider 
  label="音量"
  description="调节系统音量大小"
  value={value}
  onChange={setValue}
/>`} />
      </section>

      {/* 范围选择 */}
      <section className="space-y-4">
        <h2 style={docHeadingStyles.h2}>范围选择</h2>
        <p style={docParagraphStyles.normal}>通过 range 属性启用范围选择模式。</p>
        
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-4">
          <Slider 
            range
            value={rangeValue}
            onChange={(val) => setRangeValue(val as [number, number])}
          />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            范围: [{rangeValue[0]}, {rangeValue[1]}]
          </div>
        </div>

        <CodeBlock language="tsx" code={`const [range, setRange] = useState<[number, number]>([20, 60])

<Slider 
  range
  value={range}
  onChange={setRange}
/>`} />
      </section>

      {/* 步长 */}
      <section className="space-y-4">
        <h2 style={docHeadingStyles.h2}>步长设置</h2>
        <p style={docParagraphStyles.normal}>通过 step 属性设置步长，设置为 null 可以连续滑动。</p>
        
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-6">
          <div>
            <div className="mb-2 text-sm font-medium">步长: 10</div>
            <Slider defaultValue={30} step={10} />
          </div>
          <div>
            <div className="mb-2 text-sm font-medium">步长: 0.1</div>
            <Slider defaultValue={0.5} min={0} max={1} step={0.1} />
          </div>
          <div>
            <div className="mb-2 text-sm font-medium">连续滑动</div>
            <Slider defaultValue={50} step={null} />
          </div>
        </div>

        <CodeBlock language="tsx" code={`<Slider defaultValue={30} step={10} />
<Slider defaultValue={0.5} min={0} max={1} step={0.1} />
<Slider defaultValue={50} step={null} />`} />
      </section>

      {/* 刻度标记 */}
      <section className="space-y-4">
        <h2 style={docHeadingStyles.h2}>刻度标记</h2>
        <p style={docParagraphStyles.normal}>通过 marks 属性添加刻度标记。</p>
        
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Slider defaultValue={37} marks={marks} />
        </div>

        <CodeBlock language="tsx" code={`const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: '100°C'
}

<Slider defaultValue={37} marks={marks} />`} />
      </section>

      {/* 间断点 */}
      <section className="space-y-4">
        <h2 style={docHeadingStyles.h2}>间断点</h2>
        <p style={docParagraphStyles.normal}>通过 dots 属性显示步长间断点。</p>
        
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Slider defaultValue={50} step={10} dots marks={percentMarks} />
        </div>

        <CodeBlock language="tsx" code={`<Slider defaultValue={50} step={10} dots marks={percentMarks} />`} />
      </section>

      {/* 尺寸 */}
      <section className="space-y-4">
        <h2 style={docHeadingStyles.h2}>尺寸</h2>
        <p style={docParagraphStyles.normal}>提供三种尺寸：sm、md、lg。</p>
        
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-6">
          <div>
            <div className="mb-2 text-sm font-medium">Small</div>
            <Slider defaultValue={30} size="sm" />
          </div>
          <div>
            <div className="mb-2 text-sm font-medium">Medium (默认)</div>
            <Slider defaultValue={50} size="md" />
          </div>
          <div>
            <div className="mb-2 text-sm font-medium">Large</div>
            <Slider defaultValue={70} size="lg" />
          </div>
        </div>

        <CodeBlock language="tsx" code={`<Slider defaultValue={30} size="sm" />
<Slider defaultValue={50} size="md" />
<Slider defaultValue={70} size="lg" />`} />
      </section>

      {/* 颜色变体 */}
      <section className="space-y-4">
        <h2 style={docHeadingStyles.h2}>颜色变体</h2>
        <p style={docParagraphStyles.normal}>提供多种颜色变体。</p>
        
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-6">
          <div>
            <div className="mb-2 text-sm font-medium">Primary</div>
            <Slider defaultValue={30} variant="primary" />
          </div>
          <div>
            <div className="mb-2 text-sm font-medium">Success</div>
            <Slider defaultValue={50} variant="success" />
          </div>
          <div>
            <div className="mb-2 text-sm font-medium">Warning</div>
            <Slider defaultValue={60} variant="warning" />
          </div>
          <div>
            <div className="mb-2 text-sm font-medium">Danger</div>
            <Slider defaultValue={80} variant="danger" />
          </div>
          <div>
            <div className="mb-2 text-sm font-medium">Info</div>
            <Slider defaultValue={40} variant="info" />
          </div>
        </div>

        <CodeBlock language="tsx" code={`<Slider defaultValue={30} variant="primary" />
<Slider defaultValue={50} variant="success" />
<Slider defaultValue={60} variant="warning" />
<Slider defaultValue={80} variant="danger" />
<Slider defaultValue={40} variant="info" />`} />
      </section>

      {/* 垂直模式 */}
      <section className="space-y-4">
        <h2 style={docHeadingStyles.h2}>垂直模式</h2>
        <p style={docParagraphStyles.normal}>通过 vertical 属性启用垂直模式。</p>
        
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex gap-8">
            <Slider 
              vertical
              value={verticalValue}
              onChange={(val) => setVerticalValue(val as number)}
            />
            <Slider vertical defaultValue={60} variant="success" />
            <Slider vertical range defaultValue={[20, 80]} variant="warning" />
          </div>
        </div>

        <CodeBlock language="tsx" code={`<Slider vertical value={value} onChange={setValue} />
<Slider vertical defaultValue={60} variant="success" />
<Slider vertical range defaultValue={[20, 80]} variant="warning" />`} />
      </section>

      {/* 带输入框 */}
      <section className="space-y-4">
        <h2 style={docHeadingStyles.h2}>带输入框</h2>
        <p style={docParagraphStyles.normal}>通过 showInput 属性显示输入框，可以直接输入数值。</p>
        
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-6">
          <Slider defaultValue={30} showInput />
          <Slider range defaultValue={[20, 80]} showInput />
        </div>

        <CodeBlock language="tsx" code={`<Slider defaultValue={30} showInput />
<Slider range defaultValue={[20, 80]} showInput />`} />
      </section>

      {/* 自定义颜色 */}
      <section className="space-y-4">
        <h2 style={docHeadingStyles.h2}>自定义颜色</h2>
        <p style={docParagraphStyles.normal}>可以自定义轨道、滑块等各部分的颜色。</p>
        
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-6">
          <Slider 
            defaultValue={50}
            trackColor="#ff6b6b"
            handleColor="#ff6b6b"
          />
          <Slider 
            defaultValue={70}
            trackColor="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
          />
        </div>

        <CodeBlock language="tsx" code={`<Slider 
  defaultValue={50}
  trackColor="#ff6b6b"
  handleColor="#ff6b6b"
/>

<Slider 
  defaultValue={70}
  trackColor="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
/>`} />
      </section>

      {/* 提示框 */}
      <section className="space-y-4">
        <h2 style={docHeadingStyles.h2}>自定义提示框</h2>
        <p style={docParagraphStyles.normal}>可以自定义提示框的格式化方式。</p>
        
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-6">
          <Slider 
            defaultValue={30}
            tooltip={{
              formatter: (value) => `${value}%`
            }}
          />
          <Slider 
            defaultValue={75}
            tooltip={{
              formatter: (value) => `${value}°C`
            }}
          />
        </div>

        <CodeBlock language="tsx" code={`<Slider 
  defaultValue={30}
  tooltip={{
    formatter: (value) => \`\${value}%\`
  }}
/>

<Slider 
  defaultValue={75}
  tooltip={{
    formatter: (value) => \`\${value}°C\`
  }}
/>`} />
      </section>

      {/* Props 表格 */}
      <section className="space-y-4">
        <h2 style={docHeadingStyles.h2}>API</h2>
        <PropsTable data={sliderProps} />
      </section>
    </div>
  )
}

export default SliderDocs
