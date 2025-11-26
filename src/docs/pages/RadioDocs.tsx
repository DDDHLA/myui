import React from 'react'
import { Radio, RadioGroup } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const RadioDocs = () => {
  const [value1, setValue1] = React.useState('apple')
  const [value2, setValue2] = React.useState('banana')

  const radioProps: PropItem[] = [
    {
      name: 'checked',
      type: 'boolean',
      description: '指定当前是否选中'
    },
    {
      name: 'defaultChecked',
      type: 'boolean',
      default: 'false',
      description: '初始是否选中'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: '是否禁用'
    },
    {
      name: 'onChange',
      type: '(checked: boolean, e: Event) => void',
      description: '变化时的回调函数'
    },
    {
      name: 'value',
      type: 'string | number',
      description: 'Radio 的值,用于 RadioGroup'
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      default: "'medium'",
      description: '尺寸大小'
    },
    {
      name: 'color',
      type: "'primary' | 'success' | 'warning' | 'danger'",
      default: "'primary'",
      description: '颜色主题'
    },
    {
      name: 'name',
      type: 'string',
      description: 'name 属性'
    }
  ]

  const radioGroupProps: PropItem[] = [
    {
      name: 'value',
      type: 'string | number',
      description: '指定选中的选项'
    },
    {
      name: 'defaultValue',
      type: 'string | number',
      description: '默认选中的选项'
    },
    {
      name: 'onChange',
      type: '(value: string | number) => void',
      description: '变化时的回调函数'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: '整组禁用'
    },
    {
      name: 'direction',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: '排列方向'
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      default: "'medium'",
      description: '尺寸大小'
    },
    {
      name: 'color',
      type: "'primary' | 'success' | 'warning' | 'danger'",
      default: "'primary'",
      description: '颜色主题'
    },
    {
      name: 'name',
      type: 'string',
      description: 'name 属性'
    },
    {
      name: 'options',
      type: 'Array<{label: string, value: string | number, disabled?: boolean}>',
      description: '选项配置(用于快速生成)'
    }
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Radio 单选框</h1>
        <p style={docParagraphStyles.lead}>
          在一组可选项中进行单选。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="最简单的用法。"
        code={`import { Radio } from '@myui/components'

function App() {
  return <Radio defaultChecked>Radio</Radio>
}`}
      >
        <Radio defaultChecked>Radio</Radio>
      </CodeBlock>

      <CodeBlock
        title="禁用状态"
        description="Radio 不可用状态。"
        code={`import { Radio } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Radio disabled>未选中禁用</Radio>
      <Radio disabled defaultChecked>选中禁用</Radio>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '16px' }}>
          <Radio disabled>未选中禁用</Radio>
          <Radio disabled defaultChecked>
            选中禁用
          </Radio>
        </div>
      </CodeBlock>

      <CodeBlock
        title="Radio 组"
        description="一组互斥的 Radio 配合使用。"
        code={`import { Radio, RadioGroup } from '@myui/components'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState('apple')

  return (
    <div>
      <RadioGroup value={value} onChange={setValue}>
        <Radio value="apple">苹果</Radio>
        <Radio value="banana">香蕉</Radio>
        <Radio value="orange">橙子</Radio>
        <Radio value="grape">葡萄</Radio>
      </RadioGroup>
      <p>选中的值: {value}</p>
    </div>
  )
}`}
      >
        <div>
          <RadioGroup value={value1} onChange={(val) => setValue1(val as string)}>
            <Radio value="apple">苹果</Radio>
            <Radio value="banana">香蕉</Radio>
            <Radio value="orange">橙子</Radio>
            <Radio value="grape">葡萄</Radio>
          </RadioGroup>
          <div style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
            选中的值: {value1}
          </div>
        </div>
      </CodeBlock>

      <CodeBlock
        title="快速生成"
        description="通过 options 配置快速生成 Radio 组。"
        code={`import { RadioGroup } from '@myui/components'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState('banana')

  return (
    <RadioGroup
      value={value}
      onChange={setValue}
      options={[
        { label: '苹果', value: 'apple' },
        { label: '香蕉', value: 'banana' },
        { label: '橙子', value: 'orange' },
        { label: '葡萄', value: 'grape', disabled: true },
      ]}
    />
  )
}`}
      >
        <RadioGroup
          value={value2}
          onChange={(val) => setValue2(val as string)}
          options={[
            { label: '苹果', value: 'apple' },
            { label: '香蕉', value: 'banana' },
            { label: '橙子', value: 'orange' },
            { label: '葡萄', value: 'grape', disabled: true },
          ]}
        />
      </CodeBlock>

      <CodeBlock
        title="垂直排列"
        description="通过 direction 属性设置垂直排列。"
        code={`import { RadioGroup } from '@myui/components'

function App() {
  return (
    <RadioGroup
      defaultValue="apple"
      direction="vertical"
      options={[
        { label: '苹果', value: 'apple' },
        { label: '香蕉', value: 'banana' },
        { label: '橙子', value: 'orange' },
      ]}
    />
  )
}`}
      >
        <RadioGroup
          defaultValue="apple"
          direction="vertical"
          options={[
            { label: '苹果', value: 'apple' },
            { label: '香蕉', value: 'banana' },
            { label: '橙子', value: 'orange' },
          ]}
        />
      </CodeBlock>

      <CodeBlock
        title="三种尺寸"
        description="提供三种尺寸:small、medium、large。"
        code={`import { Radio } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Radio size="small" defaultChecked>Small</Radio>
      <Radio size="medium" defaultChecked>Medium</Radio>
      <Radio size="large" defaultChecked>Large</Radio>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Radio size="small" defaultChecked>
            Small
          </Radio>
          <Radio size="medium" defaultChecked>
            Medium
          </Radio>
          <Radio size="large" defaultChecked>
            Large
          </Radio>
        </div>
      </CodeBlock>

      <CodeBlock
        title="颜色主题"
        description="提供多种颜色主题。"
        code={`import { Radio } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Radio color="primary" defaultChecked>Primary</Radio>
      <Radio color="success" defaultChecked>Success</Radio>
      <Radio color="warning" defaultChecked>Warning</Radio>
      <Radio color="danger" defaultChecked>Danger</Radio>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Radio color="primary" defaultChecked>
            Primary
          </Radio>
          <Radio color="success" defaultChecked>
            Success
          </Radio>
          <Radio color="warning" defaultChecked>
            Warning
          </Radio>
          <Radio color="danger" defaultChecked>
            Danger
          </Radio>
        </div>
      </CodeBlock>

      <CodeBlock
        title="全组禁用"
        description="整组禁用的 Radio 组。"
        code={`import { RadioGroup } from '@myui/components'

function App() {
  return (
    <RadioGroup
      disabled
      defaultValue="apple"
      options={[
        { label: '苹果', value: 'apple' },
        { label: '香蕉', value: 'banana' },
        { label: '橙子', value: 'orange' },
      ]}
    />
  )
}`}
      >
        <RadioGroup
          disabled
          defaultValue="apple"
          options={[
            { label: '苹果', value: 'apple' },
            { label: '香蕉', value: 'banana' },
            { label: '橙子', value: 'orange' },
          ]}
        />
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>API</h2>
        
        <h3 style={docHeadingStyles.h3}>Radio Props</h3>
        <PropsTable data={radioProps} />
        
        <h3 style={{ ...docHeadingStyles.h3, marginTop: '32px' }}>RadioGroup Props</h3>
        <PropsTable data={radioGroupProps} />
      </div>
    </div>
  )
}

export default RadioDocs
