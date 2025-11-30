import React from 'react'
import { Input } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const InputDocs = () => {
  const [value, setValue] = React.useState('')

  const inputProps: PropItem[] = [
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: '输入框的尺寸大小'
    },
    {
      name: 'error',
      type: 'boolean',
      default: 'false',
      description: '是否显示错误状态'
    },
    {
      name: 'helperText',
      type: 'string',
      description: '辅助文本信息'
    },
    {
      name: 'label',
      type: 'string',
      description: '输入框标签'
    },
    {
      name: 'leftIcon',
      type: 'ReactNode',
      description: '左侧图标'
    },
    {
      name: 'rightIcon',
      type: 'ReactNode',
      description: '右侧图标'
    },
    {
      name: 'placeholder',
      type: 'string',
      description: '占位符文本'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: '是否禁用输入框'
    },
    {
      name: 'value',
      type: 'string',
      description: '输入框的值'
    },
    {
      name: 'onChange',
      type: '(event: ChangeEvent) => void',
      description: '值变化时的回调函数'
    }
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Input 输入框</h1>
        <p style={docParagraphStyles.lead}>
          通过鼠标或键盘输入内容，是最基础的表单域的包装。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="基本使用。"
        code={`import { Input } from '@paidaxinghaha/my-ui-react'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState('')

  return (
    <Input
      placeholder="请输入内容"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}`}
      >
        <Input
          placeholder="请输入内容"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </CodeBlock>

      <CodeBlock
        title="带标签的输入框"
        description="输入框可以配置标签和辅助文本。"
        code={`import { Input } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ maxWidth: '300px' }}>
      <Input
        label="用户名"
        placeholder="请输入用户名"
        helperText="用户名长度为 3-20 个字符"
      />
    </div>
  )
}`}
      >
        <div style={{ maxWidth: '300px' }}>
          <Input
            label="用户名"
            placeholder="请输入用户名"
            helperText="用户名长度为 3-20 个字符"
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="带图标的输入框"
        description="输入框可以配置左侧或右侧图标。"
        code={`import { Input } from '@paidaxinghaha/my-ui-react'

function App() {
  const SearchIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
      <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
  
  const LockIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="16" r="1" fill="currentColor"/>
    </svg>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
      <Input
        placeholder="搜索..."
        leftIcon={SearchIcon}
      />
      <Input
        type="password"
        placeholder="请输入密码"
        rightIcon={LockIcon}
      />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
          <Input
            placeholder="搜索..."
            leftIcon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
          />
          <Input
            type="password"
            placeholder="请输入密码"
            rightIcon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="16" r="1" fill="currentColor"/>
              </svg>
            }
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="不同尺寸"
        description="输入框有大、中、小三种尺寸。"
        code={`import { Input } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
      <Input size="sm" placeholder="小尺寸" />
      <Input size="md" placeholder="中尺寸" />
      <Input size="lg" placeholder="大尺寸" />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
          <Input size="sm" placeholder="小尺寸" />
          <Input size="md" placeholder="中尺寸" />
          <Input size="lg" placeholder="大尺寸" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="错误状态"
        description="输入框可以显示错误状态和错误信息。"
        code={`import { Input } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
      <Input
        label="邮箱地址"
        placeholder="请输入邮箱"
        error
        helperText="请输入有效的邮箱地址"
      />
      <Input
        label="密码"
        type="password"
        placeholder="请输入密码"
        disabled
        helperText="此输入框已被禁用"
      />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
          <Input
            label="邮箱地址"
            placeholder="请输入邮箱"
            error
            helperText="请输入有效的邮箱地址"
          />
          <Input
            label="密码"
            type="password"
            placeholder="请输入密码"
            disabled
            helperText="此输入框已被禁用"
          />
        </div>
      </CodeBlock>

      <PropsTable data={inputProps} />
    </div>
  )
}

export default InputDocs
