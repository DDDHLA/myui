import React from 'react'
import { Checkbox, CheckboxGroup } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const CheckboxDocs = () => {
  const [checked1, setChecked1] = React.useState(false)
  const [checked2] = React.useState(true)
  const [indeterminate, setIndeterminate] = React.useState(true)
  const [checkedList, setCheckedList] = React.useState<(string | number)[]>(['apple'])
  const [checkAll, setCheckAll] = React.useState(false)

  const fruits = ['apple', 'banana', 'orange', 'grape']

  const handleCheckAllChange = (checked: boolean) => {
    setCheckedList(checked ? fruits : [])
    setCheckAll(checked)
    setIndeterminate(false)
  }

  const handleGroupChange = (list: (string | number)[]) => {
    setCheckedList(list)
    setIndeterminate(list.length > 0 && list.length < fruits.length)
    setCheckAll(list.length === fruits.length)
  }

  const checkboxProps: PropItem[] = [
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
      name: 'indeterminate',
      type: 'boolean',
      default: 'false',
      description: '设置 indeterminate 状态,只负责样式控制'
    },
    {
      name: 'onChange',
      type: '(checked: boolean, e: Event) => void',
      description: '变化时的回调函数'
    },
    {
      name: 'value',
      type: 'string | number',
      description: 'Checkbox 的值,用于 CheckboxGroup'
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
    }
  ]

  const checkboxGroupProps: PropItem[] = [
    {
      name: 'value',
      type: '(string | number)[]',
      description: '指定选中的选项'
    },
    {
      name: 'defaultValue',
      type: '(string | number)[]',
      default: '[]',
      description: '默认选中的选项'
    },
    {
      name: 'onChange',
      type: '(value: (string | number)[]) => void',
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
      name: 'options',
      type: 'Array<{label: string, value: string | number, disabled?: boolean}>',
      description: '选项配置(用于快速生成)'
    }
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Checkbox 复选框</h1>
        <p style={docParagraphStyles.lead}>
          在一组可选项中进行多项选择时使用。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="最简单的用法。"
        code={`import { Checkbox } from '@paidaxinghaha/my-ui-react'
import { useState } from 'react'

function App() {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox
      checked={checked}
      onChange={(checked) => setChecked(checked)}
    >
      Checkbox
    </Checkbox>
  )
}`}
      >
        <Checkbox
          checked={checked1}
          onChange={(checked) => setChecked1(checked)}
        >
          Checkbox
        </Checkbox>
      </CodeBlock>

      <CodeBlock
        title="禁用状态"
        description="Checkbox 不可用状态。"
        code={`import { Checkbox } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Checkbox disabled>未选中禁用</Checkbox>
      <Checkbox disabled checked>选中禁用</Checkbox>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '16px' }}>
          <Checkbox disabled>未选中禁用</Checkbox>
          <Checkbox disabled checked={checked2} onChange={() => {}}>
            选中禁用
          </Checkbox>
        </div>
      </CodeBlock>

      <CodeBlock
        title="全选与半选"
        description="在实现全选效果时,通过 indeterminate 属性来表示半选状态。"
        code={`import { Checkbox, CheckboxGroup } from '@paidaxinghaha/my-ui-react'
import { useState } from 'react'

function App() {
  const [checkedList, setCheckedList] = useState(['apple'])
  const [checkAll, setCheckAll] = useState(false)
  const [indeterminate, setIndeterminate] = useState(true)

  const fruits = ['apple', 'banana', 'orange', 'grape']

  const handleCheckAllChange = (checked: boolean) => {
    setCheckedList(checked ? fruits : [])
    setCheckAll(checked)
    setIndeterminate(false)
  }

  const handleGroupChange = (list) => {
    setCheckedList(list)
    setIndeterminate(list.length > 0 && list.length < fruits.length)
    setCheckAll(list.length === fruits.length)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox
        indeterminate={indeterminate}
        checked={checkAll}
        onChange={handleCheckAllChange}
      >
        全选
      </Checkbox>
      <div style={{ paddingLeft: '24px' }}>
        <CheckboxGroup
          value={checkedList}
          onChange={handleGroupChange}
          direction="vertical"
        >
          {fruits.map(fruit => (
            <Checkbox key={fruit} value={fruit}>{fruit}</Checkbox>
          ))}
        </CheckboxGroup>
      </div>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Checkbox
            indeterminate={indeterminate}
            checked={checkAll}
            onChange={handleCheckAllChange}
          >
            全选
          </Checkbox>
          <div style={{ paddingLeft: '24px' }}>
            <CheckboxGroup
              value={checkedList}
              onChange={handleGroupChange}
              direction="vertical"
            >
              {fruits.map((fruit) => (
                <Checkbox key={fruit} value={fruit}>
                  {fruit}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
        </div>
      </CodeBlock>

      <CodeBlock
        title="Checkbox 组"
        description="方便的从数组生成 Checkbox 组。"
        code={`import { CheckboxGroup } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <CheckboxGroup
      defaultValue={['apple', 'orange']}
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
        <CheckboxGroup
          defaultValue={['apple', 'orange']}
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
        code={`import { CheckboxGroup } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <CheckboxGroup
      defaultValue={['apple']}
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
        <CheckboxGroup
          defaultValue={['apple']}
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
        code={`import { Checkbox } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox size="small" defaultChecked>Small</Checkbox>
      <Checkbox size="medium" defaultChecked>Medium</Checkbox>
      <Checkbox size="large" defaultChecked>Large</Checkbox>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Checkbox size="small" defaultChecked>
            Small
          </Checkbox>
          <Checkbox size="medium" defaultChecked>
            Medium
          </Checkbox>
          <Checkbox size="large" defaultChecked>
            Large
          </Checkbox>
        </div>
      </CodeBlock>

      <CodeBlock
        title="颜色主题"
        description="提供多种颜色主题。"
        code={`import { Checkbox } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Checkbox color="primary" defaultChecked>Primary</Checkbox>
      <Checkbox color="success" defaultChecked>Success</Checkbox>
      <Checkbox color="warning" defaultChecked>Warning</Checkbox>
      <Checkbox color="danger" defaultChecked>Danger</Checkbox>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Checkbox color="primary" defaultChecked>
            Primary
          </Checkbox>
          <Checkbox color="success" defaultChecked>
            Success
          </Checkbox>
          <Checkbox color="warning" defaultChecked>
            Warning
          </Checkbox>
          <Checkbox color="danger" defaultChecked>
            Danger
          </Checkbox>
        </div>
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>API</h2>
        
        <h3 style={docHeadingStyles.h3}>Checkbox Props</h3>
        <PropsTable data={checkboxProps} />
        
        <h3 style={{ ...docHeadingStyles.h3, marginTop: '32px' }}>CheckboxGroup Props</h3>
        <PropsTable data={checkboxGroupProps} />
      </div>
    </div>
  )
}

export default CheckboxDocs
