import React from 'react'
import { Avatar, AvatarGroup } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const AvatarDocs = () => {
  const avatarProps: PropItem[] = [
    {
      name: 'src',
      type: 'string',
      description: '图片地址',
      required: false
    },
    {
      name: 'icon',
      type: 'ReactNode',
      description: '设置头像的图标',
      required: false
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg' | 'xl'",
      default: "'md'",
      description: '设置头像的大小',
      required: false
    },
    {
      name: 'shape',
      type: "'circle' | 'square'",
      default: "'circle'",
      description: '指定头像的形状',
      required: false
    },
    {
      name: 'alt',
      type: 'string',
      description: '图像无法显示时的替代文本',
      required: false
    }
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Avatar 头像</h1>
        <p style={docParagraphStyles.lead}>
          用来代表用户或事物，支持图片、图标或字符展示。
        </p>
      </div>

      <CodeBlock
        title="基本用法"
        description="支持三种类型：图片、图标和字符。"
        code={`import { Avatar } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
      <Avatar icon={<span>User</span>} />
      <Avatar>U</Avatar>
      <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>USER</Avatar>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
          <Avatar icon={<span>User</span>} />
          <Avatar>U</Avatar>
          <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>USER</Avatar>
        </div>
      </CodeBlock>

      <CodeBlock
        title="尺寸"
        description="头像有四种尺寸：sm、md、lg、xl。"
        code={`import { Avatar } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar size="sm" icon={<span>S</span>} />
      <Avatar size="md" icon={<span>M</span>} />
      <Avatar size="lg" icon={<span>L</span>} />
      <Avatar size="xl" icon={<span>XL</span>} />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Avatar size="sm" icon={<span>S</span>} />
          <Avatar size="md" icon={<span>M</span>} />
          <Avatar size="lg" icon={<span>L</span>} />
          <Avatar size="xl" icon={<span>XL</span>} />
        </div>
      </CodeBlock>

      <CodeBlock
        title="形状"
        description="支持两种形状：circle（圆形）和 square（方形）。"
        code={`import { Avatar } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar shape="circle" icon={<span>C</span>} />
      <Avatar shape="square" icon={<span>S</span>} />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Avatar shape="circle" icon={<span>C</span>} />
          <Avatar shape="square" icon={<span>S</span>} />
        </div>
      </CodeBlock>

      <CodeBlock
        title="头像组"
        description="头像组可以把多个头像叠在一起显示。"
        code={`import { Avatar, AvatarGroup } from '@myui/components'

function App() {
  return (
    <AvatarGroup>
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" />
      <Avatar style={{ backgroundColor: '#1890ff' }}>A</Avatar>
      <Avatar style={{ backgroundColor: '#87d068' }}>B</Avatar>
    </AvatarGroup>
  )
}`}
      >
        <AvatarGroup>
          <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
          <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" />
          <Avatar style={{ backgroundColor: '#1890ff' }}>A</Avatar>
          <Avatar style={{ backgroundColor: '#87d068' }}>B</Avatar>
        </AvatarGroup>
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={{ ...docHeadingStyles.h2, marginBottom: '24px' }}>API</h2>
        <PropsTable data={avatarProps} />
      </div>
    </div>
  )
}

export default AvatarDocs
