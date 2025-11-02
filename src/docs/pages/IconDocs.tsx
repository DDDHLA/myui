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
      description: '是否旋转动画'
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
        code={`import { Icon } from '@myui/components'

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
        description="支持旋转动画和自定义角度。"
        code={`<Icon name="loading" spin />
<Icon name="refresh" spin />
<Icon name="arrow-right" rotate={45} />
<Icon name="arrow-right" rotate={90} />
<Icon name="arrow-right" rotate={180} />`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Icon name="loading" spin />
          <Icon name="refresh" spin />
          <Icon name="arrow-right" rotate={45} />
          <Icon name="arrow-right" rotate={90} />
          <Icon name="arrow-right" rotate={180} />
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
        description="内置丰富的图标集合，涵盖常用场景。"
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
              <Icon name="home" size="lg" />
              <Icon name="user" size="lg" />
              <Icon name="search" size="lg" />
              <Icon name="bell" size="lg" />
              <Icon name="mail" size="lg" />
              <Icon name="phone" size="lg" />
            </div>
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>箭头图标</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Icon name="arrow-up" size="lg" />
              <Icon name="arrow-down" size="lg" />
              <Icon name="arrow-left" size="lg" />
              <Icon name="arrow-right" size="lg" />
              <Icon name="chevron-up" size="lg" />
              <Icon name="chevron-down" size="lg" />
            </div>
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>操作图标</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Icon name="plus" size="lg" />
              <Icon name="minus" size="lg" />
              <Icon name="x" size="lg" />
              <Icon name="check" size="lg" />
              <Icon name="edit" size="lg" />
              <Icon name="trash" size="lg" />
            </div>
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>文件图标</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Icon name="folder" size="lg" />
              <Icon name="document" size="lg" />
              <Icon name="download" size="lg" />
              <Icon name="upload" size="lg" />
              <Icon name="copy" size="lg" />
              <Icon name="link" size="lg" />
            </div>
          </div>
        </div>
      </CodeBlock>

      <PropsTable data={iconProps} />
    </div>
  )
}

export default IconDocs
