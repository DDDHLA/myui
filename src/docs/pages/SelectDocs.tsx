import { useState } from 'react'
import { Select } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import type { SelectOption } from '@/types'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const SelectDocs = () => {
  const [singleValue, setSingleValue] = useState<string | number>('')
  const [multipleValue, setMultipleValue] = useState<(string | number)[]>([])
  const [searchableValue, setSearchableValue] = useState<string | number>('')

  // 基础选项
  const basicOptions: SelectOption[] = [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
    { label: '选项四', value: '4' },
    { label: '选项五（禁用）', value: '5', disabled: true },
  ]

  // 城市选项
  const cityOptions: SelectOption[] = [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广州', value: 'guangzhou' },
    { label: '深圳', value: 'shenzhen' },
    { label: '杭州', value: 'hangzhou' },
    { label: '成都', value: 'chengdu' },
    { label: '武汉', value: 'wuhan' },
    { label: '西安', value: 'xian' },
  ]

  // 分组选项
  const groupedOptions: SelectOption[] = [
    { label: '苹果', value: 'apple', group: '水果' },
    { label: '香蕉', value: 'banana', group: '水果' },
    { label: '橙子', value: 'orange', group: '水果' },
    { label: '西红柿', value: 'tomato', group: '蔬菜' },
    { label: '黄瓜', value: 'cucumber', group: '蔬菜' },
    { label: '胡萝卜', value: 'carrot', group: '蔬菜' },
  ]

  const selectProps: PropItem[] = [
    {
      name: 'value',
      type: 'string | number | (string | number)[]',
      description: '选中的值（受控）'
    },
    {
      name: 'defaultValue',
      type: 'string | number | (string | number)[]',
      description: '默认选中的值（非受控）'
    },
    {
      name: 'onChange',
      type: '(value) => void',
      description: '值改变时的回调'
    },
    {
      name: 'options',
      type: 'SelectOption[]',
      description: '选项数据',
      required: true
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "'请选择'",
      description: '占位符文本'
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description: '是否多选'
    },
    {
      name: 'searchable',
      type: 'boolean',
      default: 'false',
      description: '是否可搜索'
    },
    {
      name: 'clearable',
      type: 'boolean',
      default: 'false',
      description: '是否可清空'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: '是否禁用'
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: '是否加载中'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: '组件尺寸'
    },
    {
      name: 'error',
      type: 'boolean',
      default: 'false',
      description: '是否显示错误状态'
    },
    {
      name: 'notFoundContent',
      type: 'ReactNode',
      default: "'暂无数据'",
      description: '无数据时的提示内容'
    },
    {
      name: 'maxTagCount',
      type: 'number',
      description: '多选时最多显示的标签数量'
    },
    {
      name: 'onSearch',
      type: '(value: string) => void',
      description: '搜索时的回调'
    },
    {
      name: 'onClear',
      type: '() => void',
      description: '清空时的回调'
    },
  ]

  const optionProps: PropItem[] = [
    {
      name: 'label',
      type: 'string',
      description: '显示的标签',
      required: true
    },
    {
      name: 'value',
      type: 'string | number',
      description: '选项的值',
      required: true
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: '是否禁用该选项'
    },
    {
      name: 'group',
      type: 'string',
      description: '所属分组名称'
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Select 选择器</h1>
        <p style={docParagraphStyles.lead}>
          下拉选择器，用于在多个选项中进行选择。支持单选、多选、搜索、分组等功能。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="最简单的选择器用法。"
        code={`import { Select } from '@paidaxinghaha/my-ui-react'

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]

function App() {
  return (
    <Select 
      options={options}
      placeholder="请选择" 
    />
  )
}`}
      >
        <div style={{ maxWidth: '300px' }}>
          <Select 
            options={basicOptions}
            placeholder="请选择"
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="受控模式"
        description="通过 value 和 onChange 控制选中的值。"
        code={`import { Select } from '@paidaxinghaha/my-ui-react'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState('')
  
  return (
    <div>
      <Select 
        value={value}
        onChange={setValue}
        options={options}
      />
      <p>当前选中: {value}</p>
    </div>
  )
}`}
      >
        <div style={{ maxWidth: '300px' }}>
          <Select 
            value={singleValue}
            onChange={(val) => setSingleValue(val as string | number)}
            options={basicOptions}
            placeholder="请选择"
          />
          <p style={{ marginTop: '12px', color: '#6b7280' }}>
            当前选中: <strong>{singleValue || '无'}</strong>
          </p>
        </div>
      </CodeBlock>

      <CodeBlock
        title="不同尺寸"
        description="提供三种尺寸：sm（小）、md（中）、lg（大）。"
        code={`import { Select } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Select size="sm" options={options} placeholder="小尺寸" />
      <Select size="md" options={options} placeholder="中尺寸(默认)" />
      <Select size="lg" options={options} placeholder="大尺寸" />
    </div>
  )
}`}
      >
        <div style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Select size="sm" options={basicOptions} placeholder="小尺寸" />
          <Select size="md" options={basicOptions} placeholder="中尺寸(默认)" />
          <Select size="lg" options={basicOptions} placeholder="大尺寸" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="多选模式"
        description="设置 multiple 属性启用多选功能。"
        code={`import { Select } from '@paidaxinghaha/my-ui-react'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState([])
  
  return (
    <div>
      <Select 
        multiple
        value={value}
        onChange={setValue}
        options={options}
        placeholder="请选择（可多选）"
      />
      <p>已选择 {value.length} 项</p>
    </div>
  )
}`}
      >
        <div style={{ maxWidth: '400px' }}>
          <Select 
            multiple
            value={multipleValue}
            onChange={(val) => setMultipleValue(val as (string | number)[])}
            options={cityOptions}
            placeholder="请选择（可多选）"
          />
          <p style={{ marginTop: '12px', color: '#6b7280' }}>
            已选择 <strong>{multipleValue.length}</strong> 项
          </p>
        </div>
      </CodeBlock>

      <CodeBlock
        title="可搜索"
        description="设置 searchable 属性启用搜索功能。"
        code={`import { Select } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Select 
      searchable
      options={cityOptions}
      placeholder="搜索城市"
    />
  )
}`}
      >
        <div style={{ maxWidth: '300px' }}>
          <Select 
            searchable
            value={searchableValue}
            onChange={(val) => setSearchableValue(val as string | number)}
            options={cityOptions}
            placeholder="搜索城市"
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="可清空"
        description="设置 clearable 属性显示清空按钮。"
        code={`import { Select } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Select 
      clearable
      options={options}
      placeholder="可清空选择"
    />
  )
}`}
      >
        <div style={{ maxWidth: '300px' }}>
          <Select 
            clearable
            options={basicOptions}
            placeholder="可清空选择"
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="禁用状态"
        description="通过 disabled 属性禁用选择器或禁用某个选项。"
        code={`import { Select } from '@paidaxinghaha/my-ui-react'

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三（禁用）', value: '3', disabled: true },
]

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Select options={options} placeholder="禁用某个选项" />
      <Select disabled options={options} placeholder="禁用整个选择器" />
    </div>
  )
}`}
      >
        <div style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Select options={basicOptions} placeholder="禁用某个选项" />
          <Select disabled options={basicOptions} placeholder="禁用整个选择器" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="分组选项"
        description="通过 group 属性对选项进行分组。"
        code={`import { Select } from '@paidaxinghaha/my-ui-react'

const options = [
  { label: '苹果', value: 'apple', group: '水果' },
  { label: '香蕉', value: 'banana', group: '水果' },
  { label: '西红柿', value: 'tomato', group: '蔬菜' },
  { label: '黄瓜', value: 'cucumber', group: '蔬菜' },
]

function App() {
  return (
    <Select 
      options={options}
      placeholder="选择食物"
    />
  )
}`}
      >
        <div style={{ maxWidth: '300px' }}>
          <Select 
            options={groupedOptions}
            placeholder="选择食物"
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="加载状态"
        description="使用 loading 属性显示加载状态。"
        code={`import { Select } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Select 
      loading
      options={options}
      placeholder="加载中..."
    />
  )
}`}
      >
        <div style={{ maxWidth: '300px' }}>
          <Select 
            loading
            options={basicOptions}
            placeholder="加载中..."
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="限制标签数量"
        description="多选模式下，使用 maxTagCount 限制显示的标签数量。"
        code={`import { Select } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Select 
      multiple
      maxTagCount={2}
      defaultValue={['beijing', 'shanghai', 'guangzhou']}
      options={cityOptions}
      placeholder="最多显示2个标签"
    />
  )
}`}
      >
        <div style={{ maxWidth: '400px' }}>
          <Select 
            multiple
            maxTagCount={2}
            defaultValue={['beijing', 'shanghai', 'guangzhou']}
            options={cityOptions}
            placeholder="最多显示2个标签"
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="错误状态"
        description="使用 error 属性显示错误状态。"
        code={`import { Select } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Select 
      error
      options={options}
      placeholder="错误状态"
    />
  )
}`}
      >
        <div style={{ maxWidth: '300px' }}>
          <Select 
            error
            options={basicOptions}
            placeholder="错误状态"
          />
        </div>
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>API</h2>
        
        <h3 style={docHeadingStyles.h3}>Select Props</h3>
        <PropsTable data={selectProps} />
        
        <h3 style={{ ...docHeadingStyles.h3, marginTop: '32px' }}>SelectOption</h3>
        <p style={docParagraphStyles.normal}>
          选项对象的属性说明：
        </p>
        <PropsTable data={optionProps} />

        <div style={{ 
          marginTop: '32px', 
          padding: '16px', 
          backgroundColor: 'var(--bg-secondary, #f3f4f6)', 
          borderRadius: '8px',
          borderLeft: '4px solid var(--color-primary, #3b82f6)'
        }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', fontWeight: '600' }}>💡 使用提示</h4>
          <ul style={{ margin: 0, paddingLeft: '24px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <li>使用受控模式（value + onChange）以便更好地管理状态</li>
            <li>多选模式下，value 和 onChange 的参数都是数组类型</li>
            <li>searchable 属性对选项较多的场景特别有用</li>
            <li>使用 group 属性可以让选项更有层次感和组织性</li>
            <li>支持键盘导航：Enter 选择，Esc 关闭，↑↓ 切换选项</li>
            <li>多选模式下按 Backspace 可以删除最后一个标签</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SelectDocs
