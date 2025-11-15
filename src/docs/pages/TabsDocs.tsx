import { useState } from 'react'
import { Tabs, Icon } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'
import type { TabItem } from '@/components/Tabs'

const TabsDocs = () => {
  const [activeKey, setActiveKey] = useState('tab1')
  const [items, setItems] = useState<TabItem[]>([
    { key: 'tab1', label: '标签一', children: <div>这是标签一的内容</div> },
    { key: 'tab2', label: '标签二', children: <div>这是标签二的内容</div> },
    { key: 'tab3', label: '标签三', children: <div>这是标签三的内容</div> },
  ])

  const tabsProps: PropItem[] = [
    {
      name: 'items',
      type: 'TabItem[]',
      default: '-',
      description: '标签项列表',
      required: true
    },
    {
      name: 'activeKey',
      type: 'string',
      default: '-',
      description: '当前激活的标签 key（受控模式）'
    },
    {
      name: 'defaultActiveKey',
      type: 'string',
      default: '-',
      description: '默认激活的标签 key（非受控模式）'
    },
    {
      name: 'onChange',
      type: '(key: string) => void',
      default: '-',
      description: '激活标签改变时的回调'
    },
    {
      name: 'onClose',
      type: '(key: string) => void',
      default: '-',
      description: '标签关闭时的回调（仅当 closable 为 true 时生效）'
    },
    {
      name: 'variant',
      type: "'line' | 'card' | 'button' | 'pill'",
      default: "'line'",
      description: '标签样式类型'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg'",
      default: "'md'",
      description: '标签大小'
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: '布局方向'
    },
    {
      name: 'closable',
      type: 'boolean',
      default: 'false',
      description: '是否可关闭标签'
    },
    {
      name: 'bordered',
      type: 'boolean',
      default: 'true',
      description: '是否显示底部边框'
    },
    {
      name: 'lazy',
      type: 'boolean',
      default: 'false',
      description: '是否懒加载内容'
    },
    {
      name: 'centered',
      type: 'boolean',
      default: 'false',
      description: '是否居中显示'
    },
    {
      name: 'className',
      type: 'string',
      default: '-',
      description: '自定义类名'
    },
    {
      name: 'tabBarClassName',
      type: 'string',
      default: '-',
      description: '标签栏自定义类名'
    },
    {
      name: 'contentClassName',
      type: 'string',
      default: '-',
      description: '内容区域自定义类名'
    }
  ]

  const tabItemProps: PropItem[] = [
    {
      name: 'key',
      type: 'string',
      description: '标签的唯一标识',
      required: true
    },
    {
      name: 'label',
      type: 'ReactNode',
      description: '标签显示文本',
      required: true
    },
    {
      name: 'children',
      type: 'ReactNode',
      description: '标签内容'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: '是否禁用'
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
      name: 'closable',
      type: 'boolean',
      description: '是否可关闭（仅当 closable 为 true 时生效）'
    },
    {
      name: 'badge',
      type: 'number | boolean',
      description: '徽章内容'
    }
  ]

  const handleClose = (key: string) => {
    setItems(items.filter(item => item.key !== key))
    if (activeKey === key) {
      const newItems = items.filter(item => item.key !== key)
      setActiveKey(newItems[0]?.key || '')
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Tabs 标签页</h1>
        <p style={docParagraphStyles.lead}>
          标签页用于组织和切换不同视图的内容。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="最简单的标签页用法。"
        code={`import { Tabs } from '@myui/components'

function App() {
  const items = [
    { key: 'tab1', label: '标签一', children: <div>内容一</div> },
    { key: 'tab2', label: '标签二', children: <div>内容二</div> },
    { key: 'tab3', label: '标签三', children: <div>内容三</div> },
  ]

  return <Tabs items={items} />
}`}
      >
        <Tabs
          items={[
            { key: 'tab1', label: '标签一', children: <div>这是标签一的内容</div> },
            { key: 'tab2', label: '标签二', children: <div>这是标签二的内容</div> },
            { key: 'tab3', label: '标签三', children: <div>这是标签三的内容</div> },
          ]}
        />
      </CodeBlock>

      <CodeBlock
        title="不同样式"
        description="支持 line、card、button、pill 四种样式。"
        code={`<Tabs variant="line" items={items} />
<Tabs variant="card" items={items} />
<Tabs variant="button" items={items} />
<Tabs variant="pill" items={items} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <h4 style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>Line 样式</h4>
            <Tabs
              variant="line"
              items={[
                { key: 'tab1', label: '标签一', children: <div>Line 样式内容</div> },
                { key: 'tab2', label: '标签二', children: <div>Line 样式内容</div> },
                { key: 'tab3', label: '标签三', children: <div>Line 样式内容</div> },
              ]}
            />
          </div>
          <div>
            <h4 style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>Card 样式</h4>
            <Tabs
              variant="card"
              items={[
                { key: 'tab1', label: '标签一', children: <div>Card 样式内容</div> },
                { key: 'tab2', label: '标签二', children: <div>Card 样式内容</div> },
                { key: 'tab3', label: '标签三', children: <div>Card 样式内容</div> },
              ]}
            />
          </div>
          <div>
            <h4 style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>Button 样式</h4>
            <Tabs
              variant="button"
              items={[
                { key: 'tab1', label: '标签一', children: <div>Button 样式内容</div> },
                { key: 'tab2', label: '标签二', children: <div>Button 样式内容</div> },
                { key: 'tab3', label: '标签三', children: <div>Button 样式内容</div> },
              ]}
            />
          </div>
          <div>
            <h4 style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>Pill 样式</h4>
            <Tabs
              variant="pill"
              items={[
                { key: 'tab1', label: '标签一', children: <div>Pill 样式内容</div> },
                { key: 'tab2', label: '标签二', children: <div>Pill 样式内容</div> },
                { key: 'tab3', label: '标签三', children: <div>Pill 样式内容</div> },
              ]}
            />
          </div>
        </div>
      </CodeBlock>

      <CodeBlock
        title="不同尺寸"
        description="支持 xs、sm、md、lg 四种尺寸。"
        code={`<Tabs size="xs" items={items} />
<Tabs size="sm" items={items} />
<Tabs size="md" items={items} />
<Tabs size="lg" items={items} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h4 style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>XS 尺寸</h4>
            <Tabs
              size="xs"
              items={[
                { key: 'tab1', label: '标签一', children: <div>XS 尺寸内容</div> },
                { key: 'tab2', label: '标签二', children: <div>XS 尺寸内容</div> },
              ]}
            />
          </div>
          <div>
            <h4 style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>SM 尺寸</h4>
            <Tabs
              size="sm"
              items={[
                { key: 'tab1', label: '标签一', children: <div>SM 尺寸内容</div> },
                { key: 'tab2', label: '标签二', children: <div>SM 尺寸内容</div> },
              ]}
            />
          </div>
          <div>
            <h4 style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>MD 尺寸</h4>
            <Tabs
              size="md"
              items={[
                { key: 'tab1', label: '标签一', children: <div>MD 尺寸内容</div> },
                { key: 'tab2', label: '标签二', children: <div>MD 尺寸内容</div> },
              ]}
            />
          </div>
          <div>
            <h4 style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>LG 尺寸</h4>
            <Tabs
              size="lg"
              items={[
                { key: 'tab1', label: '标签一', children: <div>LG 尺寸内容</div> },
                { key: 'tab2', label: '标签二', children: <div>LG 尺寸内容</div> },
              ]}
            />
          </div>
        </div>
      </CodeBlock>

      <CodeBlock
        title="带图标"
        description="标签支持左侧和右侧图标。"
        code={`<Tabs
  items={[
    {
      key: 'tab1',
      label: '首页',
      leftIcon: <Icon name="home" />,
      children: <div>首页内容</div>
    },
    {
      key: 'tab2',
      label: '设置',
      leftIcon: <Icon name="settings" />,
      children: <div>设置内容</div>
    },
  ]}
/>`}
      >
        <Tabs
          items={[
            {
              key: 'tab1',
              label: '首页',
              leftIcon: <Icon name="home" size="sm" />,
              children: <div>这是首页的内容</div>
            },
            {
              key: 'tab2',
              label: '消息',
              leftIcon: <Icon name="message" size="sm" />,
              children: <div>这是消息的内容</div>
            },
            {
              key: 'tab3',
              label: '设置',
              leftIcon: <Icon name="settings" size="sm" />,
              rightIcon: <Icon name="chevron-right" size="xs" />,
              children: <div>这是设置的内容</div>
            },
          ]}
        />
      </CodeBlock>

      <CodeBlock
        title="带徽章"
        description="标签支持数字或点标记徽章。"
        code={`<Tabs
  items={[
    { key: 'tab1', label: '消息', badge: 5, children: <div>内容</div> },
    { key: 'tab2', label: '通知', badge: true, children: <div>内容</div> },
  ]}
/>`}
      >
        <Tabs
          items={[
            { key: 'tab1', label: '消息', badge: 5, children: <div>您有 5 条新消息</div> },
            { key: 'tab2', label: '通知', badge: 99, children: <div>您有 99+ 条通知</div> },
            { key: 'tab3', label: '提醒', badge: true, children: <div>您有新的提醒</div> },
          ]}
        />
      </CodeBlock>

      <CodeBlock
        title="可关闭标签"
        description="设置 closable 属性，标签可以关闭。"
        code={`const [items, setItems] = useState([
  { key: 'tab1', label: '标签一', children: <div>内容一</div> },
  { key: 'tab2', label: '标签二', children: <div>内容二</div> },
  { key: 'tab3', label: '标签三', children: <div>内容三</div> },
])

const handleClose = (key: string) => {
  setItems(items.filter(item => item.key !== key))
}

<Tabs items={items} closable onClose={handleClose} />`}
      >
        <Tabs
          items={items}
          closable
          onClose={handleClose}
          activeKey={activeKey}
          onChange={setActiveKey}
        />
      </CodeBlock>

      <CodeBlock
        title="禁用标签"
        description="可以禁用某个标签。"
        code={`<Tabs
  items={[
    { key: 'tab1', label: '可用', children: <div>内容</div> },
    { key: 'tab2', label: '禁用', disabled: true, children: <div>内容</div> },
    { key: 'tab3', label: '可用', children: <div>内容</div> },
  ]}
/>`}
      >
        <Tabs
          items={[
            { key: 'tab1', label: '可用标签', children: <div>这个标签可以点击</div> },
            { key: 'tab2', label: '禁用标签', disabled: true, children: <div>这个标签被禁用了</div> },
            { key: 'tab3', label: '可用标签', children: <div>这个标签可以点击</div> },
          ]}
        />
      </CodeBlock>

      <CodeBlock
        title="垂直布局"
        description="设置 orientation 为 vertical 可以垂直排列标签。"
        code={`<Tabs
  orientation="vertical"
  items={items}
/>`}
      >
        <div style={{ height: '300px' }}>
          <Tabs
            orientation="vertical"
            items={[
              { key: 'tab1', label: '标签一', children: <div>这是垂直布局的标签一内容</div> },
              { key: 'tab2', label: '标签二', children: <div>这是垂直布局的标签二内容</div> },
              { key: 'tab3', label: '标签三', children: <div>这是垂直布局的标签三内容</div> },
            ]}
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="懒加载"
        description="设置 lazy 属性，标签内容会在首次激活时才加载。"
        code={`<Tabs
  lazy
  items={[
    { key: 'tab1', label: '标签一', children: <div>懒加载内容一</div> },
    { key: 'tab2', label: '标签二', children: <div>懒加载内容二</div> },
  ]}
/>`}
      >
        <Tabs
          lazy
          items={[
            { key: 'tab1', label: '标签一', children: <div>这是懒加载的内容一，只有在点击时才会加载</div> },
            { key: 'tab2', label: '标签二', children: <div>这是懒加载的内容二，只有在点击时才会加载</div> },
            { key: 'tab3', label: '标签三', children: <div>这是懒加载的内容三，只有在点击时才会加载</div> },
          ]}
        />
      </CodeBlock>

      <CodeBlock
        title="居中显示"
        description="设置 centered 属性，标签会居中显示。"
        code={`<Tabs
  centered
  items={items}
/>`}
      >
        <Tabs
          centered
          items={[
            { key: 'tab1', label: '标签一', children: <div>居中显示的标签一</div> },
            { key: 'tab2', label: '标签二', children: <div>居中显示的标签二</div> },
            { key: 'tab3', label: '标签三', children: <div>居中显示的标签三</div> },
          ]}
        />
      </CodeBlock>

      <CodeBlock
        title="受控模式"
        description="通过 activeKey 和 onChange 实现受控模式。"
        code={`const [activeKey, setActiveKey] = useState('tab1')

<Tabs
  activeKey={activeKey}
  onChange={setActiveKey}
  items={items}
/>`}
      >
        <div>
          <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
            当前激活的标签: {activeKey}
          </p>
          <Tabs
            activeKey={activeKey}
            onChange={setActiveKey}
            items={[
              { key: 'tab1', label: '标签一', children: <div>受控模式：标签一</div> },
              { key: 'tab2', label: '标签二', children: <div>受控模式：标签二</div> },
              { key: 'tab3', label: '标签三', children: <div>受控模式：标签三</div> },
            ]}
          />
        </div>
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={{ ...docHeadingStyles.h2, marginBottom: '24px' }}>API</h2>
        <h3 style={{ ...docHeadingStyles.h3, marginBottom: '16px' }}>Tabs Props</h3>
        <PropsTable data={tabsProps} />
        <h3 style={{ ...docHeadingStyles.h3, marginTop: '32px', marginBottom: '16px' }}>TabItem</h3>
        <PropsTable data={tabItemProps} />
      </div>
    </div>
  )
}

export default TabsDocs

