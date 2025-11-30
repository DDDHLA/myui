import React from 'react'
import { Switch } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const SwitchDocs = () => {
  const [checked1, setChecked1] = React.useState(false)
  const [checked2, setChecked2] = React.useState(true)
  const [loading, setLoading] = React.useState(false)

  const handleLoadingDemo = (checked: boolean) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setChecked2(checked)
    }, 1000)
  }

  const switchProps: PropItem[] = [
    {
      name: 'checked',
      type: 'boolean',
      description: '指定当前是否选中（受控模式）'
    },
    {
      name: 'defaultChecked',
      type: 'boolean',
      default: 'false',
      description: '初始是否选中（非受控模式）'
    },
    {
      name: 'onChange',
      type: '(checked: boolean, event: ChangeEvent) => void',
      description: '变化时的回调函数'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: '开关的尺寸大小'
    },
    {
      name: 'variant',
      type: "'primary' | 'success' | 'warning' | 'danger'",
      default: "'primary'",
      description: '开关的颜色变体'
    },
    {
      name: 'checkedLabel',
      type: 'ReactNode',
      description: '选中时在开关内显示的标签文本'
    },
    {
      name: 'uncheckedLabel',
      type: 'ReactNode',
      description: '未选中时在开关内显示的标签文本'
    },
    {
      name: 'label',
      type: 'string',
      description: '开关旁边的文字标签'
    },
    {
      name: 'checkedIcon',
      type: 'ReactNode',
      description: '选中时在滑块中显示的图标'
    },
    {
      name: 'uncheckedIcon',
      type: 'ReactNode',
      description: '未选中时在滑块中显示的图标'
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
      name: 'checkedColor',
      type: 'string',
      description: '选中时的自定义背景色'
    },
    {
      name: 'uncheckedColor',
      type: 'string',
      description: '未选中时的自定义背景色'
    },
    {
      name: 'tooltip',
      type: 'string',
      description: '鼠标悬停时显示的提示文本'
    },
    {
      name: 'description',
      type: 'string',
      description: '开关下方的描述文本'
    }
  ]

  const CheckIcon = (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  const CloseIcon = (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Switch 开关</h1>
        <p style={docParagraphStyles.lead}>
          开关选择器，用于在两个互斥的选项中进行选择。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="最简单的用法。"
        code={`import { Switch } from '@paidaxinghaha/my-ui-react'
import { useState } from 'react'

function App() {
  const [checked, setChecked] = useState(false)

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Switch
        checked={checked}
        onChange={setChecked}
      />
      <span>状态: {checked ? '开启' : '关闭'}</span>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Switch
            checked={checked1}
            onChange={setChecked1}
          />
          <span>状态: {checked1 ? '开启' : '关闭'}</span>
        </div>
      </CodeBlock>

      <CodeBlock
        title="带文字标签"
        description="可以为开关添加文字说明。"
        code={`import { Switch } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Switch label="开启通知" defaultChecked />
      <Switch label="接收邮件" />
      <Switch label="自动更新" defaultChecked />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Switch label="开启通知" defaultChecked />
          <Switch label="接收邮件" />
          <Switch label="自动更新" defaultChecked />
        </div>
      </CodeBlock>

      <CodeBlock
        title="不同尺寸"
        description="开关有大、中、小三种尺寸。"
        code={`import { Switch } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Switch size="sm" defaultChecked />
      <Switch size="md" defaultChecked />
      <Switch size="lg" defaultChecked />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Switch size="sm" defaultChecked />
          <Switch size="md" defaultChecked />
          <Switch size="lg" defaultChecked />
        </div>
      </CodeBlock>

      <CodeBlock
        title="颜色变体"
        description="开关支持多种颜色变体。"
        code={`import { Switch } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Switch variant="primary" defaultChecked />
      <Switch variant="success" defaultChecked />
      <Switch variant="warning" defaultChecked />
      <Switch variant="danger" defaultChecked />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Switch variant="primary" defaultChecked />
          <Switch variant="success" defaultChecked />
          <Switch variant="warning" defaultChecked />
          <Switch variant="danger" defaultChecked />
        </div>
      </CodeBlock>

      <CodeBlock
        title="自定义颜色"
        description="可以自定义开关选中和未选中时的颜色。"
        code={`import { Switch } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Switch
        defaultChecked
        checkedColor="#8b5cf6"
        uncheckedColor="#e5e7eb"
      />
      <Switch
        defaultChecked
        checkedColor="#ec4899"
        uncheckedColor="#d1d5db"
      />
      <Switch
        defaultChecked
        checkedColor="#14b8a6"
        uncheckedColor="#cbd5e1"
      />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Switch
            defaultChecked
            checkedColor="#8b5cf6"
            uncheckedColor="#e5e7eb"
          />
          <Switch
            defaultChecked
            checkedColor="#ec4899"
            uncheckedColor="#d1d5db"
          />
          <Switch
            defaultChecked
            checkedColor="#14b8a6"
            uncheckedColor="#cbd5e1"
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="带图标"
        description="可以在滑块中显示图标。"
        code={`import { Switch } from '@paidaxinghaha/my-ui-react'

function App() {
  const CheckIcon = (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )

  const CloseIcon = (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Switch
        defaultChecked
        checkedIcon={CheckIcon}
        uncheckedIcon={CloseIcon}
      />
      <Switch
        defaultChecked
        size="lg"
        checkedIcon={CheckIcon}
        uncheckedIcon={CloseIcon}
      />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Switch
            defaultChecked
            checkedIcon={CheckIcon}
            uncheckedIcon={CloseIcon}
          />
          <Switch
            defaultChecked
            size="lg"
            checkedIcon={CheckIcon}
            uncheckedIcon={CloseIcon}
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="内置标签文本"
        description="可以在开关内部显示文本。"
        code={`import { Switch } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Switch
        size="lg"
        defaultChecked
        checkedLabel="ON"
        uncheckedLabel="OFF"
      />
      <Switch
        size="lg"
        checkedLabel="开"
        uncheckedLabel="关"
      />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Switch
            size="lg"
            defaultChecked
            checkedLabel="ON"
            uncheckedLabel="OFF"
          />
          <Switch
            size="lg"
            checkedLabel="开"
            uncheckedLabel="关"
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="禁用状态"
        description="开关不可用状态。"
        code={`import { Switch } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Switch disabled />
      <Switch disabled defaultChecked />
      <Switch disabled label="已禁用" />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Switch disabled />
          <Switch disabled defaultChecked />
          <Switch disabled label="已禁用" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="加载状态"
        description="开关处于加载状态时的表现。"
        code={`import { Switch } from '@paidaxinghaha/my-ui-react'
import { useState } from 'react'

function App() {
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(true)

  const handleChange = (checked: boolean) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setChecked(checked)
    }, 1000)
  }

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Switch
        checked={checked}
        loading={loading}
        onChange={handleChange}
        label="切换需要加载"
      />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Switch
            checked={checked2}
            loading={loading}
            onChange={handleLoadingDemo}
            label="切换需要加载"
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="带描述"
        description="可以为开关添加描述文本。"
        code={`import { Switch } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Switch
        label="推送通知"
        description="接收系统推送的各类通知消息"
        defaultChecked
      />
      <Switch
        label="邮件订阅"
        description="订阅每周精选内容和产品更新"
      />
      <Switch
        label="隐私模式"
        description="开启后，您的在线状态将对其他用户不可见"
        defaultChecked
      />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Switch
            label="推送通知"
            description="接收系统推送的各类通知消息"
            defaultChecked
          />
          <Switch
            label="邮件订阅"
            description="订阅每周精选内容和产品更新"
          />
          <Switch
            label="隐私模式"
            description="开启后，您的在线状态将对其他用户不可见"
            defaultChecked
          />
        </div>
      </CodeBlock>

      <PropsTable data={switchProps} />
    </div>
  )
}

export default SwitchDocs
