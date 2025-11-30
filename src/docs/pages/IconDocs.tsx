import { Icon } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'

const IconDocs = () => {
  const iconProps: PropItem[] = [
    {
      name: 'name',
      type: 'IconName',
      default: '-',
      description: '图标名称，支持内置图标集合'
    },
    {
      name: 'path',
      type: 'React.ReactNode',
      default: '-',
      description: '自定义 SVG 路径（与 name 二选一）'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number",
      default: "'md'",
      description: '图标大小，可以是预设尺寸或自定义数值'
    },
    {
      name: 'color',
      type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | string",
      default: '-',
      description: '图标颜色，可以是预设颜色或自定义颜色值'
    },
    {
      name: 'spin',
      type: 'boolean',
      default: 'false',
      description: '是否旋转动画（已废弃，使用 animation="spin"）'
    },
    {
      name: 'rotate',
      type: 'number',
      default: '-',
      description: '旋转角度（度）'
    },
    {
      name: 'flip',
      type: "'horizontal' | 'vertical' | 'both'",
      default: '-',
      description: '翻转方向'
    },
    {
      name: 'animation',
      type: "'spin' | 'pulse' | 'bounce' | 'shake' | 'ping'",
      default: '-',
      description: '动画效果类型'
    },
    {
      name: 'variant',
      type: "'outline' | 'solid' | 'duotone'",
      default: "'outline'",
      description: '填充模式：outline（描边）、solid（填充）、duotone（双色）'
    },
    {
      name: 'strokeWidth',
      type: 'number',
      default: '2',
      description: '描边宽度'
    },
    {
      name: 'badge',
      type: 'number | boolean',
      default: '-',
      description: '徽章内容，数字或布尔值（显示点）'
    },
    {
      name: 'badgePosition',
      type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'",
      default: "'top-right'",
      description: '徽章位置'
    },
    {
      name: 'className',
      type: 'string',
      default: '-',
      description: '自定义类名'
    },
    {
      name: 'onClick',
      type: '() => void',
      default: '-',
      description: '点击事件回调'
    },
    {
      name: 'copyable',
      type: 'boolean',
      default: 'false',
      description: '是否可复制（点击时复制图标代码到剪贴板）'
    },
    {
      name: 'copyText',
      type: 'string',
      default: '-',
      description: '自定义复制文本（不设置则自动生成图标代码）'
    }
  ]

  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
        Icon 图标
      </h1>
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.75', marginBottom: '32px' }}>
        丰富的图标集合，支持多种尺寸、颜色和交互效果。
      </p>

      <CodeBlock
        title="基础用法"
        description="最简单的用法，指定图标名称即可。"
        code={`import { Icon } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div>
      <Icon name="home" />
      <Icon name="user" />
      <Icon name="settings" />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Icon name="home" />
          <Icon name="user" />
          <Icon name="settings" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="不同尺寸"
        description="通过 size 属性控制图标大小。"
        code={`<Icon name="star" size="xs" />
<Icon name="star" size="sm" />
<Icon name="star" size="md" />
<Icon name="star" size="lg" />
<Icon name="star" size="xl" />
<Icon name="star" size={32} />`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Icon name="star" size="xs" />
          <Icon name="star" size="sm" />
          <Icon name="star" size="md" />
          <Icon name="star" size="lg" />
          <Icon name="star" size="xl" />
          <Icon name="star" size={32} />
        </div>
      </CodeBlock>

      <CodeBlock
        title="不同颜色"
        description="使用预设颜色或自定义颜色值。"
        code={`<Icon name="heart" color="primary" />
<Icon name="heart" color="success" />
<Icon name="heart" color="warning" />
<Icon name="heart" color="danger" />
<Icon name="heart" color="#8b5cf6" />
<Icon name="heart" color="rgb(236, 72, 153)" />`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Icon name="heart" color="primary" />
          <Icon name="heart" color="success" />
          <Icon name="heart" color="warning" />
          <Icon name="heart" color="danger" />
          <Icon name="heart" color="#8b5cf6" />
          <Icon name="heart" color="rgb(236, 72, 153)" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="动画效果"
        description="支持多种动画效果：旋转、脉冲、弹跳、震动、ping。"
        code={`<Icon name="loading" animation="spin" />
<Icon name="heart" animation="pulse" color="danger" />
<Icon name="bell" animation="bounce" color="warning" />
<Icon name="refresh" animation="shake" />
<Icon name="zap" animation="ping" color="primary" />
<Icon name="arrow-right" rotate={45} />`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Icon name="loading" animation="spin" />
          <Icon name="heart" animation="pulse" color="danger" />
          <Icon name="bell" animation="bounce" color="warning" />
          <Icon name="refresh" animation="shake" />
          <Icon name="zap" animation="ping" color="primary" />
          <Icon name="arrow-right" rotate={45} />
        </div>
      </CodeBlock>

      <CodeBlock
        title="翻转效果"
        description="支持水平、垂直或双向翻转。"
        code={`<Icon name="arrow-right" />
<Icon name="arrow-right" flip="horizontal" />
<Icon name="arrow-right" flip="vertical" />
<Icon name="arrow-right" flip="both" />`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Icon name="arrow-right" />
          <Icon name="arrow-right" flip="horizontal" />
          <Icon name="arrow-right" flip="vertical" />
          <Icon name="arrow-right" flip="both" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="填充模式"
        description="支持三种填充模式：outline（描边）、solid（填充）、duotone（双色）。"
        code={`<Icon name="heart" variant="outline" color="danger" />
<Icon name="heart" variant="solid" color="danger" />
<Icon name="heart" variant="duotone" color="danger" />
<Icon name="star" variant="outline" color="warning" />
<Icon name="star" variant="solid" color="warning" />
<Icon name="star" variant="duotone" color="warning" />`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Icon name="heart" variant="outline" color="danger" size="lg" />
          <Icon name="heart" variant="solid" color="danger" size="lg" />
          <Icon name="heart" variant="duotone" color="danger" size="lg" />
          <Icon name="star" variant="outline" color="warning" size="lg" />
          <Icon name="star" variant="solid" color="warning" size="lg" />
          <Icon name="star" variant="duotone" color="warning" size="lg" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="图标徽章"
        description="为图标添加数字或点标记徽章，常用于通知、消息等场景。"
        code={`<Icon name="bell" badge={5} />
<Icon name="mail" badge={99} />
<Icon name="mail" badge={150} />
<Icon name="message" badge={true} />
<Icon name="shopping-cart" badge={3} badgePosition="top-left" />
<Icon name="heart" badge={true} badgePosition="bottom-right" />`}
      >
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Icon name="bell" badge={5} size="lg" />
          <Icon name="mail" badge={99} size="lg" />
          <Icon name="mail" badge={150} size="lg" />
          <Icon name="message" badge={true} size="lg" />
          <Icon name="shopping-cart" badge={3} badgePosition="top-left" size="lg" />
          <Icon name="heart" badge={true} badgePosition="bottom-right" size="lg" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="自定义图标"
        description="支持通过 path 属性传入自定义 SVG 路径。"
        code={`<Icon 
  path={<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />}
  size="lg"
  color="primary"
/>`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Icon 
            path={<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />}
            size="lg"
            color="primary"
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="可复制图标"
        description="设置 copyable 属性，点击图标即可复制图标代码到剪贴板。"
        code={`<Icon name="home" copyable />
<Icon name="user" copyable size="lg" />
<Icon name="heart" copyable color="danger" variant="solid" />
<Icon name="bell" copyable badge={5} />
<Icon name="star" copyable copyText="自定义复制文本" />`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Icon name="home" copyable />
          <Icon name="user" copyable size="lg" />
          <Icon name="heart" copyable color="danger" variant="solid" />
          <Icon name="bell" copyable badge={5} />
          <Icon name="star" copyable copyText="自定义复制文本" />
        </div>
        <p style={{ marginTop: '12px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          💡 提示：点击上面的图标试试，代码会自动复制到剪贴板！
        </p>
      </CodeBlock>

      <CodeBlock
        title="可点击图标"
        description="添加 onClick 事件使图标可点击。"
        code={`<Icon 
  name="bell" 
  size="lg" 
  color="primary" 
  onClick={() => alert('通知点击')} 
/>
<Icon 
  name="settings" 
  size="lg" 
  color="secondary" 
  onClick={() => alert('设置点击')} 
/>`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Icon 
            name="bell" 
            size="lg" 
            color="primary" 
            onClick={() => alert('通知点击')} 
          />
          <Icon 
            name="settings" 
            size="lg" 
            color="secondary" 
            onClick={() => alert('设置点击')} 
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="图标集合展示"
        description="内置丰富的图标集合，涵盖常用场景。所有图标都支持 copyable 属性，点击即可复制代码。"
        code={`// 基础图标
<Icon name="home" />
<Icon name="user" />
<Icon name="search" />
<Icon name="bell" />

// 箭头图标  
<Icon name="arrow-up" />
<Icon name="arrow-down" />
<Icon name="chevron-left" />
<Icon name="chevron-right" />

// 操作图标
<Icon name="plus" />
<Icon name="edit" />
<Icon name="trash" />
<Icon name="copy" />

// 文件图标
<Icon name="folder" />
<Icon name="document" />
<Icon name="download" />
<Icon name="upload" />

// 状态图标
<Icon name="heart" />
<Icon name="star" />
<Icon name="eye" />
<Icon name="share" />`}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          <div>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>基础图标</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Icon name="home" size="lg" copyable />
              <Icon name="user" size="lg" copyable />
              <Icon name="search" size="lg" copyable />
              <Icon name="bell" size="lg" copyable />
              <Icon name="mail" size="lg" copyable />
              <Icon name="phone" size="lg" copyable />
              <Icon name="menu" size="lg" copyable />
              <Icon name="settings" size="lg" copyable />
            </div>
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>箭头图标</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Icon name="arrow-up" size="lg" copyable />
              <Icon name="arrow-down" size="lg" copyable />
              <Icon name="arrow-left" size="lg" copyable />
              <Icon name="arrow-right" size="lg" copyable />
              <Icon name="chevron-up" size="lg" copyable />
              <Icon name="chevron-down" size="lg" copyable />
            </div>
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>操作图标</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Icon name="plus" size="lg" copyable />
              <Icon name="minus" size="lg" copyable />
              <Icon name="x" size="lg" copyable />
              <Icon name="check" size="lg" copyable />
              <Icon name="edit" size="lg" copyable />
              <Icon name="trash" size="lg" copyable />
              <Icon name="copy" size="lg" copyable />
              <Icon name="save" size="lg" copyable />
            </div>
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>文件图标</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Icon name="folder" size="lg" copyable />
              <Icon name="document" size="lg" copyable />
              <Icon name="download" size="lg" copyable />
              <Icon name="upload" size="lg" copyable />
              <Icon name="image" size="lg" copyable />
              <Icon name="camera" size="lg" copyable />
              <Icon name="video" size="lg" copyable />
              <Icon name="music" size="lg" copyable />
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>状态图标</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Icon name="heart" size="lg" copyable />
              <Icon name="star" size="lg" copyable />
              <Icon name="eye" size="lg" copyable />
              <Icon name="share" size="lg" copyable />
              <Icon name="thumbs-up" size="lg" copyable />
              <Icon name="thumbs-down" size="lg" copyable />
              <Icon name="bookmark" size="lg" copyable />
              <Icon name="tag" size="lg" copyable />
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>社交与通信</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Icon name="message" size="lg" copyable />
              <Icon name="chat" size="lg" copyable />
              <Icon name="send" size="lg" copyable />
              <Icon name="mail" size="lg" copyable />
              <Icon name="phone" size="lg" copyable />
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>系统图标</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Icon name="lock" size="lg" copyable />
              <Icon name="unlock" size="lg" copyable />
              <Icon name="shield" size="lg" copyable />
              <Icon name="key" size="lg" copyable />
              <Icon name="calendar" size="lg" copyable />
              <Icon name="clock" size="lg" copyable />
              <Icon name="sun" size="lg" copyable />
              <Icon name="moon" size="lg" copyable />
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>其他图标</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Icon name="shopping-cart" size="lg" copyable />
              <Icon name="credit-card" size="lg" copyable />
              <Icon name="gift" size="lg" copyable />
              <Icon name="trophy" size="lg" copyable />
              <Icon name="cloud" size="lg" copyable />
              <Icon name="wifi" size="lg" copyable />
              <Icon name="battery" size="lg" copyable />
              <Icon name="zap" size="lg" copyable />
            </div>
          </div>
        </div>
      </CodeBlock>

      <PropsTable data={iconProps} />
    </div>
  )
}

export default IconDocs
