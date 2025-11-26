import React from 'react'
import { Menu, MenuItem } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const MenuDocs = () => {
  const [collapsed, setCollapsed] = React.useState(false)
  const [selectedKey, setSelectedKey] = React.useState('home')
  const [openKeys, setOpenKeys] = React.useState<string[]>([])

  const basicItems: MenuItem[] = [
    { key: 'home', label: '首页', icon: 'home' },
    { key: 'about', label: '关于', icon: 'info' },
    { key: 'contact', label: '联系', icon: 'mail' }
  ]

  const horizontalItems: MenuItem[] = [
    { key: 'home', label: '首页' },
    { key: 'products', label: '产品' },
    { key: 'about', label: '关于' },
    { key: 'contact', label: '联系' }
  ]

  const submenuItems: MenuItem[] = [
    { key: 'home', label: '首页', icon: 'home' },
    {
      key: 'products',
      label: '产品',
      icon: 'box',
      children: [
        { key: 'product-1', label: '产品 1' },
        { key: 'product-2', label: '产品 2' },
        {
          key: 'product-3',
          label: '产品分类',
          children: [
            { key: 'category-1', label: '分类 1' },
            { key: 'category-2', label: '分类 2' }
          ]
        }
      ]
    },
    { key: 'about', label: '关于', icon: 'info' }
  ]

  const dashboardItems: MenuItem[] = [
    { key: 'home', label: '首页', icon: 'home' },
    {
      key: 'dashboard',
      label: '仪表盘',
      icon: 'layout',
      children: [
        { key: 'analytics', label: '数据分析' },
        { key: 'monitor', label: '监控' }
      ]
    },
    {
      key: 'system',
      label: '系统管理',
      icon: 'settings',
      children: [
        { key: 'users', label: '用户管理' },
        { key: 'roles', label: '角色管理' }
      ]
    }
  ]

  const stateItems: MenuItem[] = [
    { key: 'home', label: '首页', icon: 'home' },
    { key: 'disabled', label: '禁用项', icon: 'x', disabled: true },
    { key: 'delete', label: '删除', icon: 'trash', danger: true }
  ]

  const menuProps: PropItem[] = [
    {
      name: 'items',
      description: '菜单项列表',
      type: 'MenuItem[]',
      required: true
    },
    {
      name: 'mode',
      description: '菜单类型',
      type: "'horizontal' | 'vertical' | 'inline'",
      default: "'vertical'"
    },
    {
      name: 'selectedKey',
      description: '当前选中的菜单项 key',
      type: 'string'
    },
    {
      name: 'defaultSelectedKey',
      description: '初始选中的菜单项 key',
      type: 'string'
    },
    {
      name: 'openKeys',
      description: '当前展开的子菜单 key 数组',
      type: 'string[]'
    },
    {
      name: 'defaultOpenKeys',
      description: '初始展开的子菜单 key 数组',
      type: 'string[]',
      default: '[]'
    },
    {
      name: 'onSelect',
      description: '选中菜单项时的回调',
      type: '(key: string) => void'
    },
    {
      name: 'onOpenChange',
      description: '子菜单展开/收起时的回调',
      type: '(openKeys: string[]) => void'
    },
    {
      name: 'className',
      description: '自定义类名',
      type: 'string'
    },
    {
      name: 'inlineIndent',
      description: 'inline 模式的缩进宽度',
      type: 'number',
      default: '24'
    },
    {
      name: 'inlineCollapsed',
      description: 'inline 模式是否收起',
      type: 'boolean',
      default: 'false'
    },
    {
      name: 'theme',
      description: '主题',
      type: "'light' | 'dark'",
      default: "'light'"
    }
  ]

  const menuItemProps: PropItem[] = [
    {
      name: 'key',
      description: '唯一标识',
      type: 'string',
      required: true
    },
    {
      name: 'label',
      description: '菜单项标题',
      type: 'string',
      required: true
    },
    {
      name: 'icon',
      description: '图标名称',
      type: 'string'
    },
    {
      name: 'disabled',
      description: '是否禁用',
      type: 'boolean',
      default: 'false'
    },
    {
      name: 'danger',
      description: '是否为危险项',
      type: 'boolean',
      default: 'false'
    },
    {
      name: 'path',
      description: '链接地址',
      type: 'string'
    },
    {
      name: 'children',
      description: '子菜单项',
      type: 'MenuItem[]'
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
        <h1 style={docHeadingStyles.h1}>Menu 菜单</h1>
        <p style={docParagraphStyles.lead}>
          为页面和功能提供导航的菜单列表。
        </p>
      </div>

      <CodeBlock
        title="基本使用"
        description="最基础的垂直菜单。"
        code={`import { Menu } from '@myui/components'

const items = [
  { key: 'home', label: '首页', icon: 'home' },
  { key: 'about', label: '关于', icon: 'info' },
  { key: 'contact', label: '联系', icon: 'mail' }
]

function App() {
  return (
    <Menu
      items={items}
      defaultSelectedKey="home"
      onSelect={(key) => console.log('Selected:', key)}
    />
  )
}`}
      >
        <Menu
          items={basicItems}
          defaultSelectedKey="home"
          onSelect={(key) => console.log('Selected:', key)}
        />
      </CodeBlock>

      <CodeBlock
        title="水平菜单"
        description="水平排列的菜单。"
        code={`import { Menu } from '@myui/components'

const items = [
  { key: 'home', label: '首页' },
  { key: 'products', label: '产品' },
  { key: 'about', label: '关于' },
  { key: 'contact', label: '联系' }
]

function App() {
  return <Menu items={items} mode="horizontal" />
}`}
      >
        <Menu items={horizontalItems} mode="horizontal" />
      </CodeBlock>

      <CodeBlock
        title="子菜单"
        description="支持多级嵌套的菜单。"
        code={`import { Menu } from '@myui/components'

const items = [
  { key: 'home', label: '首页', icon: 'home' },
  {
    key: 'products',
    label: '产品',
    icon: 'box',
    children: [
      { key: 'product-1', label: '产品 1' },
      { key: 'product-2', label: '产品 2' },
      {
        key: 'product-3',
        label: '产品分类',
        children: [
          { key: 'category-1', label: '分类 1' },
          { key: 'category-2', label: '分类 2' }
        ]
      }
    ]
  },
  { key: 'about', label: '关于', icon: 'info' }
]

function App() {
  return (
    <Menu
      items={items}
      mode="inline"
      defaultOpenKeys={['products']}
      defaultSelectedKey="home"
    />
  )
}`}
      >
        <Menu
          items={submenuItems}
          mode="inline"
          defaultOpenKeys={['products']}
          defaultSelectedKey="home"
        />
      </CodeBlock>

      <CodeBlock
        title="内联模式"
        description="内联展开的菜单。"
        code={`import { Menu } from '@myui/components'

const items = [
  { key: 'home', label: '首页', icon: 'home' },
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: 'layout',
    children: [
      { key: 'analytics', label: '数据分析' },
      { key: 'monitor', label: '监控' }
    ]
  },
  {
    key: 'system',
    label: '系统管理',
    icon: 'settings',
    children: [
      { key: 'users', label: '用户管理' },
      { key: 'roles', label: '角色管理' }
    ]
  }
]

function App() {
  return <Menu items={items} mode="inline" />
}`}
      >
        <Menu items={dashboardItems} mode="inline" />
      </CodeBlock>

      <CodeBlock
        title="折叠内联菜单"
        description="内联菜单支持折叠功能。"
        code={`import { Menu } from '@myui/components'
import { useState } from 'react'

const items = [
  { key: 'home', label: '首页', icon: 'home' },
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: 'layout',
    children: [
      { key: 'analytics', label: '数据分析' },
      { key: 'monitor', label: '监控' }
    ]
  },
  { key: 'settings', label: '设置', icon: 'settings' }
]

function App() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div>
      <button onClick={() => setCollapsed(!collapsed)}>
        切换折叠
      </button>
      <Menu
        items={items}
        mode="inline"
        inlineCollapsed={collapsed}
      />
    </div>
  )
}`}
      >
        <div>
          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={() => setCollapsed(!collapsed)}
              style={{
                padding: '8px 16px',
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                background: '#fff',
                cursor: 'pointer'
              }}
            >
              切换折叠
            </button>
          </div>
          <Menu
            items={dashboardItems}
            mode="inline"
            inlineCollapsed={collapsed}
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="深色主题"
        description="深色风格的菜单。"
        code={`import { Menu } from '@myui/components'

const items = [
  { key: 'home', label: '首页', icon: 'home' },
  {
    key: 'products',
    label: '产品',
    icon: 'box',
    children: [
      { key: 'product-1', label: '产品 1' },
      { key: 'product-2', label: '产品 2' }
    ]
  },
  { key: 'about', label: '关于', icon: 'info' }
]

function App() {
  return (
    <Menu
      items={items}
      mode="inline"
      theme="dark"
    />
  )
}`}
      >
        <Menu items={dashboardItems} mode="inline" theme="dark" />
      </CodeBlock>

      <CodeBlock
        title="禁用和危险项"
        description="菜单项可以设置禁用或危险状态。"
        code={`import { Menu } from '@myui/components'

const items = [
  { key: 'home', label: '首页', icon: 'home' },
  { key: 'disabled', label: '禁用项', icon: 'x', disabled: true },
  { key: 'delete', label: '删除', icon: 'trash', danger: true }
]

function App() {
  return <Menu items={items} />
}`}
      >
        <Menu items={stateItems} />
      </CodeBlock>

      <CodeBlock
        title="受控模式"
        description="通过 selectedKey 和 openKeys 完全控制菜单状态。"
        code={`import { Menu } from '@myui/components'
import { useState } from 'react'

const items = [
  { key: 'home', label: '首页' },
  {
    key: 'products',
    label: '产品',
    children: [
      { key: 'product-1', label: '产品 1' },
      { key: 'product-2', label: '产品 2' }
    ]
  },
  { key: 'about', label: '关于' }
]

function App() {
  const [selectedKey, setSelectedKey] = useState('home')
  const [openKeys, setOpenKeys] = useState<string[]>([])

  return (
    <div>
      <p>当前选中: {selectedKey}</p>
      <Menu
        items={items}
        mode="inline"
        selectedKey={selectedKey}
        openKeys={openKeys}
        onSelect={setSelectedKey}
        onOpenChange={setOpenKeys}
      />
    </div>
  )
}`}
      >
        <div>
          <div style={{ marginBottom: '16px' }}>
            <p>当前选中: {selectedKey}</p>
          </div>
          <Menu
            items={submenuItems}
            mode="inline"
            selectedKey={selectedKey}
            openKeys={openKeys}
            onSelect={setSelectedKey}
            onOpenChange={setOpenKeys}
          />
        </div>
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>API</h2>
        
        <h3 style={docHeadingStyles.h3}>Menu Props</h3>
        <PropsTable data={menuProps} />
        
        <h3 style={{ ...docHeadingStyles.h3, marginTop: '32px' }}>MenuItem</h3>
        <PropsTable data={menuItemProps} />
      </div>
    </div>
  )
}

export default MenuDocs
