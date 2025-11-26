import { Breadcrumb, BreadcrumbItem } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const BreadcrumbDocs = () => {
  const handleItemClick = (label: string) => {
    console.log(`Clicked: ${label}`)
  }

  const basicItems: BreadcrumbItem[] = [
    { label: '首页', path: '/' },
    { label: '产品', path: '/products' },
    { label: '详情' }
  ]

  const iconItems: BreadcrumbItem[] = [
    { label: '首页', path: '/', icon: 'home' },
    { label: '产品', path: '/products', icon: 'box' },
    { label: '详情', icon: 'file' }
  ]

  const longItems: BreadcrumbItem[] = [
    { label: '首页', path: '/' },
    { label: '产品分类', path: '/categories' },
    { label: '电子产品', path: '/categories/electronics' },
    { label: '手机', path: '/categories/electronics/phones' },
    { label: 'iPhone', path: '/categories/electronics/phones/iphone' },
    { label: 'iPhone 15 Pro' }
  ]

  const clickableItems: BreadcrumbItem[] = [
    {
      label: '首页',
      onClick: () => handleItemClick('首页')
    },
    {
      label: '产品',
      onClick: () => handleItemClick('产品')
    },
    { label: '详情' }
  ]

  const breadcrumbProps: PropItem[] = [
    {
      name: 'items',
      description: '面包屑项列表',
      type: 'BreadcrumbItem[]',
      required: true
    },
    {
      name: 'separator',
      description: '分隔符',
      type: 'ReactNode',
      default: '/'
    },
    {
      name: 'className',
      description: '自定义类名',
      type: 'string'
    },
    {
      name: 'maxItems',
      description: '最大显示数量',
      type: 'number'
    },
    {
      name: 'itemRender',
      description: '自定义渲染函数',
      type: '(item: BreadcrumbItem, index: number) => ReactNode'
    }
  ]

  const breadcrumbItemProps: PropItem[] = [
    {
      name: 'label',
      description: '文本内容',
      type: 'string',
      required: true
    },
    {
      name: 'path',
      description: '链接地址',
      type: 'string'
    },
    {
      name: 'icon',
      description: '图标名称',
      type: 'string'
    },
    {
      name: 'onClick',
      description: '点击回调',
      type: '() => void'
    }
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Breadcrumb 面包屑</h1>
        <p style={docParagraphStyles.lead}>
          显示当前页面在系统层级结构中的位置,并能向上返回。
        </p>
      </div>

      <CodeBlock
        title="基本使用"
        description="最基础的面包屑导航。"
        code={`import { Breadcrumb } from '@myui/components'

const items = [
  { label: '首页', path: '/' },
  { label: '产品', path: '/products' },
  { label: '详情' }
]

function App() {
  return <Breadcrumb items={items} />
}`}
      >
        <Breadcrumb items={basicItems} />
      </CodeBlock>

      <CodeBlock
        title="带图标"
        description="面包屑项可以配置图标。"
        code={`import { Breadcrumb } from '@myui/components'

const items = [
  { label: '首页', path: '/', icon: 'home' },
  { label: '产品', path: '/products', icon: 'box' },
  { label: '详情', icon: 'file' }
]

function App() {
  return <Breadcrumb items={items} />
}`}
      >
        <Breadcrumb items={iconItems} />
      </CodeBlock>

      <CodeBlock
        title="自定义分隔符"
        description="可以自定义分隔符。"
        code={`import { Breadcrumb } from '@myui/components'

const items = [
  { label: '首页', path: '/' },
  { label: '产品', path: '/products' },
  { label: '详情' }
]

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Breadcrumb items={items} separator=">" />
      <Breadcrumb items={items} separator="-" />
      <Breadcrumb items={items} separator="•" />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Breadcrumb items={basicItems} separator=">" />
          <Breadcrumb items={basicItems} separator="-" />
          <Breadcrumb items={basicItems} separator="•" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="最大显示数量"
        description="当面包屑项过多时,可以设置最大显示数量,中间部分会被省略。"
        code={`import { Breadcrumb } from '@myui/components'

const items = [
  { label: '首页', path: '/' },
  { label: '产品分类', path: '/categories' },
  { label: '电子产品', path: '/categories/electronics' },
  { label: '手机', path: '/categories/electronics/phones' },
  { label: 'iPhone', path: '/categories/electronics/phones/iphone' },
  { label: 'iPhone 15 Pro' }
]

function App() {
  return <Breadcrumb items={items} maxItems={3} />
}`}
      >
        <Breadcrumb items={longItems} maxItems={3} />
      </CodeBlock>

      <CodeBlock
        title="点击事件"
        description="可以为面包屑项添加点击事件。"
        code={`import { Breadcrumb } from '@myui/components'

const items = [
  {
    label: '首页',
    onClick: () => console.log('Navigate to home')
  },
  {
    label: '产品',
    onClick: () => console.log('Navigate to products')
  },
  { label: '详情' }
]

function App() {
  return <Breadcrumb items={items} />
}`}
      >
        <Breadcrumb items={clickableItems} />
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>API</h2>
        
        <h3 style={docHeadingStyles.h3}>Breadcrumb Props</h3>
        <PropsTable data={breadcrumbProps} />
        
        <h3 style={{ ...docHeadingStyles.h3, marginTop: '32px' }}>BreadcrumbItem</h3>
        <PropsTable data={breadcrumbItemProps} />
      </div>
    </div>
  )
}

export default BreadcrumbDocs
