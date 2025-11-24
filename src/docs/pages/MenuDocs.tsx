import React, { useState } from "react";
import { Menu, MenuItem } from "@/components";
import { CodeBlock } from "@/components/CodeBlock";
import { PropsTable } from "@/components/PropsTable";

const MenuDocs: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("home");
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const basicItems: MenuItem[] = [
    { key: "home", label: "首页", icon: "home" },
    { key: "about", label: "关于", icon: "info" },
    { key: "contact", label: "联系", icon: "mail" },
  ];

  const horizontalItems: MenuItem[] = [
    { key: "home", label: "首页" },
    { key: "products", label: "产品" },
    { key: "about", label: "关于" },
    { key: "contact", label: "联系" },
  ];

  const submenuItems: MenuItem[] = [
    { key: "home", label: "首页", icon: "home" },
    {
      key: "products",
      label: "产品",
      icon: "box",
      children: [
        { key: "product-1", label: "产品 1" },
        { key: "product-2", label: "产品 2" },
        {
          key: "product-3",
          label: "产品分类",
          children: [
            { key: "category-1", label: "分类 1" },
            { key: "category-2", label: "分类 2" },
          ],
        },
      ],
    },
    { key: "about", label: "关于", icon: "info" },
  ];

  const dashboardItems: MenuItem[] = [
    { key: "home", label: "首页", icon: "home" },
    {
      key: "dashboard",
      label: "仪表盘",
      icon: "layout",
      children: [
        { key: "analytics", label: "数据分析" },
        { key: "monitor", label: "监控" },
      ],
    },
    {
      key: "system",
      label: "系统管理",
      icon: "settings",
      children: [
        { key: "users", label: "用户管理" },
        { key: "roles", label: "角色管理" },
      ],
    },
  ];

  const stateItems: MenuItem[] = [
    { key: "home", label: "首页", icon: "home" },
    { key: "disabled", label: "禁用项", icon: "x", disabled: true },
    { key: "delete", label: "删除", icon: "trash", danger: true },
  ];

  const menuProps = [
    {
      prop: "items",
      description: "菜单项列表",
      type: "MenuItem[]",
      default: "-",
    },
    {
      prop: "mode",
      description: "菜单类型",
      type: "horizontal | vertical | inline",
      default: "vertical",
    },
    {
      prop: "selectedKey",
      description: "当前选中的菜单项 key",
      type: "string",
      default: "-",
    },
    {
      prop: "defaultSelectedKey",
      description: "初始选中的菜单项 key",
      type: "string",
      default: "-",
    },
    {
      prop: "openKeys",
      description: "当前展开的子菜单 key 数组",
      type: "string[]",
      default: "-",
    },
    {
      prop: "defaultOpenKeys",
      description: "初始展开的子菜单 key 数组",
      type: "string[]",
      default: "[]",
    },
    {
      prop: "onSelect",
      description: "选中菜单项时的回调",
      type: "(key: string) => void",
      default: "-",
    },
    {
      prop: "onOpenChange",
      description: "子菜单展开/收起时的回调",
      type: "(openKeys: string[]) => void",
      default: "-",
    },
    {
      prop: "className",
      description: "自定义类名",
      type: "string",
      default: "-",
    },
    {
      prop: "inlineIndent",
      description: "inline 模式的缩进宽度",
      type: "number",
      default: "24",
    },
    {
      prop: "inlineCollapsed",
      description: "inline 模式是否收起",
      type: "boolean",
      default: "false",
    },
    {
      prop: "theme",
      description: "主题",
      type: "light | dark",
      default: "light",
    },
  ];

  const menuItemProps = [
    {
      prop: "key",
      description: "唯一标识",
      type: "string",
      default: "-",
    },
    {
      prop: "label",
      description: "菜单项标题",
      type: "string",
      default: "-",
    },
    {
      prop: "icon",
      description: "图标名称",
      type: "string",
      default: "-",
    },
    {
      prop: "disabled",
      description: "是否禁用",
      type: "boolean",
      default: "false",
    },
    {
      prop: "danger",
      description: "是否为危险项",
      type: "boolean",
      default: "false",
    },
    {
      prop: "path",
      description: "链接地址",
      type: "string",
      default: "-",
    },
    {
      prop: "children",
      description: "子菜单项",
      type: "MenuItem[]",
      default: "-",
    },
    {
      prop: "onClick",
      description: "点击回调",
      type: "() => void",
      default: "-",
    },
  ];

  return (
    <div className="docs-container">
      <h1>Menu 菜单</h1>
      <p className="docs-description">
        为页面和功能提供导航的菜单列表。
      </p>

      <section className="docs-section">
        <h2>基本使用</h2>
        <div className="docs-example">
          <Menu
            items={basicItems}
            defaultSelectedKey="home"
            onSelect={(key) => console.log("Selected:", key)}
            style={{ width: 256 }}
          />
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Menu } from '@myui/components';

const items = [
  { key: 'home', label: '首页', icon: 'home' },
  { key: 'about', label: '关于', icon: 'info' },
  { key: 'contact', label: '联系', icon: 'mail' }
];

function App() {
  return (
    <Menu
      items={items}
      defaultSelectedKey="home"
      onSelect={(key) => console.log('Selected:', key)}
    />
  );
}`}
        />
      </section>

      <section className="docs-section">
        <h2>水平菜单</h2>
        <div className="docs-example">
          <Menu items={horizontalItems} mode="horizontal" />
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Menu } from '@myui/components';

const items = [
  { key: 'home', label: '首页' },
  { key: 'products', label: '产品' },
  { key: 'about', label: '关于' },
  { key: 'contact', label: '联系' }
];

function App() {
  return <Menu items={items} mode="horizontal" />;
}`}
        />
      </section>

      <section className="docs-section">
        <h2>子菜单</h2>
        <div className="docs-example">
          <Menu
            items={submenuItems}
            mode="inline"
            defaultOpenKeys={["products"]}
            defaultSelectedKey="home"
            style={{ width: 256 }}
          />
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Menu } from '@myui/components';

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
];

function App() {
  return (
    <Menu
      items={items}
      mode="inline"
      defaultOpenKeys={['products']}
      defaultSelectedKey="home"
    />
  );
}`}
        />
      </section>

      <section className="docs-section">
        <h2>内联模式</h2>
        <div className="docs-example">
          <Menu
            items={dashboardItems}
            mode="inline"
            style={{ width: 256 }}
          />
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Menu } from '@myui/components';

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
];

function App() {
  return (
    <Menu
      items={items}
      mode="inline"
      style={{ width: 256 }}
    />
  );
}`}
        />
      </section>

      <section className="docs-section">
        <h2>折叠内联菜单</h2>
        <div className="docs-example">
          <div style={{ marginBottom: "16px" }}>
            <button
              onClick={() => setCollapsed(!collapsed)}
              style={{
                padding: "8px 16px",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              切换折叠
            </button>
          </div>
          <Menu
            items={dashboardItems}
            mode="inline"
            inlineCollapsed={collapsed}
            style={{ width: collapsed ? 64 : 256, transition: "width 0.2s" }}
          />
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Menu } from '@myui/components';
import { useState } from 'react';

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
];

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <button onClick={() => setCollapsed(!collapsed)}>
        切换折叠
      </button>
      <Menu
        items={items}
        mode="inline"
        inlineCollapsed={collapsed}
        style={{ width: collapsed ? 64 : 256 }}
      />
    </div>
  );
}`}
        />
      </section>

      <section className="docs-section">
        <h2>深色主题</h2>
        <div className="docs-example">
          <Menu
            items={dashboardItems}
            mode="inline"
            theme="dark"
            style={{ width: 256 }}
          />
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Menu } from '@myui/components';

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
];

function App() {
  return (
    <Menu
      items={items}
      mode="inline"
      theme="dark"
      style={{ width: 256 }}
    />
  );
}`}
        />
      </section>

      <section className="docs-section">
        <h2>禁用和危险项</h2>
        <div className="docs-example">
          <Menu items={stateItems} style={{ width: 256 }} />
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Menu } from '@myui/components';

const items = [
  { key: 'home', label: '首页', icon: 'home' },
  { key: 'disabled', label: '禁用项', icon: 'x', disabled: true },
  { key: 'delete', label: '删除', icon: 'trash', danger: true }
];

function App() {
  return <Menu items={items} />;
}`}
        />
      </section>

      <section className="docs-section">
        <h2>受控模式</h2>
        <div className="docs-example">
          <div style={{ marginBottom: "16px" }}>
            <p>当前选中: {selectedKey}</p>
          </div>
          <Menu
            items={submenuItems}
            mode="inline"
            selectedKey={selectedKey}
            openKeys={openKeys}
            onSelect={setSelectedKey}
            onOpenChange={setOpenKeys}
            style={{ width: 256 }}
          />
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Menu } from '@myui/components';
import { useState } from 'react';

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
];

function App() {
  const [selectedKey, setSelectedKey] = useState('home');
  const [openKeys, setOpenKeys] = useState<string[]>([]);

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
        style={{ width: 256 }}
      />
    </div>
  );
}`}
        />
      </section>

      <section className="docs-section">
        <h2>Props</h2>
        <PropsTable data={menuProps} />
      </section>

      <section className="docs-section">
        <h2>MenuItem</h2>
        <PropsTable data={menuItemProps} />
      </section>
    </div>
  );
};

export default MenuDocs;
