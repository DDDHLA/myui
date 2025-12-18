import React, { useState } from 'react'
import ColorPicker from './ColorPicker'
import { Card } from '../Card'
import { CodeBlock } from '../CodeBlock'
import { PropsTable, type PropItem } from '../PropsTable'
import './ColorPicker.css'

const ColorPickerDemo: React.FC = () => {
  const [color, setColor] = useState('#1890ff')

  return (
    <div className="color-picker-demo">
      <CodeBlock
        title="基础用法"
        description="用于选择颜色的组件，支持HEX格式输入、色板选择和预设颜色。"
        code={`import { ColorPicker } from '@paidaxinghaha/my-ui-react'
import { useState } from 'react'

function App() {
  const [color, setColor] = useState('#1890ff')

  return (
    <div>
      <ColorPicker 
        value={color} 
        onChange={setColor} 
      />
      <div style={{ marginTop: 16 }}>
        当前颜色: <span style={{ color: color, fontWeight: 'bold' }}>{color}</span>
      </div>
    </div>
  )
}`}
      >
        <Card>
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
             <ColorPicker 
                value={color} 
                onChange={setColor} 
             />
             <div>
                当前颜色: <span style={{ color: color, fontWeight: 'bold' }}>{color}</span>
             </div>
             <div style={{
                width: 100, 
                height: 100, 
                backgroundColor: color, 
                borderRadius: 8,
                transition: 'background-color 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
             }}>
                Preview
             </div>
          </div>
        </Card>
      </CodeBlock>

      <PropsTable
        title="ColorPicker Props"
        data={[
          {
            name: 'value',
            type: 'string',
            description: '当前颜色值（HEX格式）',
          },
          {
            name: 'defaultValue',
            type: 'string',
            default: "'#1890ff'",
            description: '默认颜色值',
          },
          {
            name: 'onChange',
            type: '(value: string) => void',
            description: '颜色变化回调',
          },
          {
            name: 'presets',
            type: 'string[]',
            description: '预设颜色列表',
          },
          {
            name: 'className',
            type: 'string',
            description: '自定义类名',
          },
          {
            name: 'disabled',
            type: 'boolean',
            description: '是否禁用',
          },
        ] as PropItem[]}
      />
    </div>
  )
}

export default ColorPickerDemo
