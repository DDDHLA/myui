import { useState } from 'react';
import { Mentions, type MentionOption } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const mockUsers: MentionOption[] = [
  {
    value: 'zhangsan',
    label: '张三',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan',
  },
  {
    value: 'lisi',
    label: '李四',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisi',
  },
  {
    value: 'wangwu',
    label: '王五',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangwu',
  },
];

const MentionsDocs = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [loading, setLoading] = useState(false);

  const mentionsProps: PropItem[] = [
    {
      name: 'value',
      type: 'string',
      description: '设置当前值',
      required: false
    },
    {
      name: 'defaultValue',
      type: 'string',
      default: "''",
      description: '默认值',
      required: false
    },
    {
      name: 'onChange',
      type: '(value: string) => void',
      description: '值改变时的回调',
      required: false
    },
    {
      name: 'onSelect',
      type: '(option: MentionOption, prefix: string) => void',
      description: '选择选项时的回调',
      required: false
    },
    {
      name: 'onSearch',
      type: '(text: string, prefix: string) => void',
      description: '搜索时的回调',
      required: false
    },
    {
      name: 'options',
      type: 'MentionOption[]',
      default: '[]',
      description: '选项数据',
      required: false
    },
    {
      name: 'prefix',
      type: 'string | string[]',
      default: "'@'",
      description: '触发关键字',
      required: false
    },
    {
      name: 'split',
      type: 'string',
      default: "' '",
      description: '选中项前后的分隔符',
      required: false
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: '加载状态',
      required: false
    },
    {
      name: 'placement',
      type: "'top' | 'bottom'",
      default: "'bottom'",
      description: '弹出层位置',
      required: false
    },
  ];

  const handleAsyncSearch = (_text: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Mentions 提及</h1>
        <p style={docParagraphStyles.lead}>
          用于在输入中提及某人或某事，常用于评论或聊天系统。
        </p>
      </div>

      <CodeBlock
        title="基本用法"
        description="最简单的用法，通过 @ 触发提及。"
        code={`import { useState } from 'react'
import { Mentions } from '@paidaxinghaha/my-ui-react'

const users = [
  { value: 'zhangsan', label: '张三' },
  { value: 'lisi', label: '李四' },
  { value: 'wangwu', label: '王五' },
]

function App() {
  const [value, setValue] = useState('')

  return (
    <Mentions
      value={value}
      onChange={setValue}
      options={users}
      placeholder="输入 @ 来提及某人..."
    />
  )
}`}
      >
        <Mentions
          value={value1}
          onChange={setValue1}
          options={mockUsers}
          placeholder="输入 @ 来提及某人..."
        />
      </CodeBlock>

      <CodeBlock
        title="自定义前缀"
        description="可以自定义触发字符，支持单个字符或字符数组。"
        code={`import { useState } from 'react'
import { Mentions } from '@paidaxinghaha/my-ui-react'

const tags = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
]

function App() {
  const [value, setValue] = useState('')

  return (
    <Mentions
      value={value}
      onChange={setValue}
      options={tags}
      prefix="#"
      placeholder="输入 # 来添加标签..."
    />
  )
}`}
      >
        <Mentions
          value={value2}
          onChange={setValue2}
          options={[
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' },
            { value: 'angular', label: 'Angular' },
          ]}
          prefix="#"
          placeholder="输入 # 来添加标签..."
        />
      </CodeBlock>

      <CodeBlock
        title="异步加载"
        description="匹配内容列表可以异步加载。"
        code={`import { useState } from 'react'
import { Mentions } from '@paidaxinghaha/my-ui-react'

const users = [
  { value: 'zhangsan', label: '张三' },
  { value: 'lisi', label: '李四' },
  { value: 'wangwu', label: '王五' },
]

function App() {
  const [loading, setLoading] = useState(false)

  const handleSearch = (text) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <Mentions
      loading={loading}
      onSearch={handleSearch}
      options={users}
      placeholder="输入 @ 触发异步搜索..."
    />
  )
}`}
      >
        <Mentions
          loading={loading}
          onSearch={handleAsyncSearch}
          options={mockUsers}
          placeholder="输入 @ 触发异步搜索..."
        />
      </CodeBlock>

      <CodeBlock
        title="自定义渲染"
        description="自定义下拉列表选项的渲染内容。"
        code={`import { Mentions } from '@paidaxinghaha/my-ui-react'

const users = [
  {
    value: 'zhangsan',
    label: '张三',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan',
  },
  {
    value: 'lisi',
    label: '李四',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisi',
  },
  {
    value: 'wangwu',
    label: '王五',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangwu',
  },
]

function App() {
  return (
    <Mentions
      options={users}
      placeholder="自定义选项渲染..."
      renderOption={(option) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img 
            src={option.avatar} 
            alt={option.label}
            style={{ width: 24, height: 24, borderRadius: '50%' }} 
          />
          <span>{option.label}</span>
          <span style={{ color: '#999', fontSize: 12 }}>@{option.value}</span>
        </div>
      )}
    />
  )
}`}
      >
        <Mentions
          options={mockUsers}
          placeholder="自定义选项渲染..."
          renderOption={(option) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {option.avatar && (
                <img 
                  src={option.avatar as string} 
                  alt={option.label}
                  style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                />
              )}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>{option.label}</span>
                <span style={{ fontSize: '12px', color: '#999' }}>@{option.value}</span>
              </div>
            </div>
          )}
        />
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={{ ...docHeadingStyles.h2, marginBottom: '24px' }}>API</h2>
        <PropsTable data={mentionsProps} />
      </div>
    </div>
  )
}

export default MentionsDocs
