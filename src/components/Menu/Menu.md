# Menu 菜单

为页面和功能提供导航的菜单列表。

## 基本使用

```tsx
import { Menu } from '@myui/components';

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
}
```

## 水平菜单

```tsx
import { Menu } from '@myui/components';

const items = [
  { key: 'home', label: '首页' },
  { key: 'products', label: '产品' },
  { key: 'about', label: '关于' },
  { key: 'contact', label: '联系' }
];

function App() {
  return <Menu items={items} mode="horizontal" />;
}
```

## 子菜单

```tsx
import { Menu } from '@myui/components';

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
}
```

## 内联模式

内联模式展开的子菜单会显示在菜单内部。

```tsx
import { Menu } from '@myui/components';

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
}
```

## 折叠内联菜单

```tsx
import { Menu } from '@myui/components';
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
}
```

## 深色主题

```tsx
import { Menu } from '@myui/components';

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
}
```

## 禁用和危险项

```tsx
import { Menu } from '@myui/components';

const items = [
  { key: 'home', label: '首页', icon: 'home' },
  { key: 'disabled', label: '禁用项', icon: 'x', disabled: true },
  { key: 'delete', label: '删除', icon: 'trash', danger: true }
];

function App() {
  return <Menu items={items} />;
}
```

## 受控模式

```tsx
import { Menu } from '@myui/components';
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
}
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 菜单项列表 | `MenuItem[]` | - |
| mode | 菜单类型 | `horizontal` \| `vertical` \| `inline` | `vertical` |
| selectedKey | 当前选中的菜单项 key | `string` | - |
| defaultSelectedKey | 初始选中的菜单项 key | `string` | - |
| openKeys | 当前展开的子菜单 key 数组 | `string[]` | - |
| defaultOpenKeys | 初始展开的子菜单 key 数组 | `string[]` | `[]` |
| onSelect | 选中菜单项时的回调 | `(key: string) => void` | - |
| onOpenChange | 子菜单展开/收起时的回调 | `(openKeys: string[]) => void` | - |
| className | 自定义类名 | `string` | - |
| inlineIndent | inline 模式的缩进宽度 | `number` | `24` |
| inlineCollapsed | inline 模式是否收起 | `boolean` | `false` |
| theme | 主题 | `light` \| `dark` | `light` |

## MenuItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 唯一标识 | `string` | - |
| label | 菜单项标题 | `string` | - |
| icon | 图标名称 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| danger | 是否为危险项 | `boolean` | `false` |
| path | 链接地址 | `string` | - |
| children | 子菜单项 | `MenuItem[]` | - |
| onClick | 点击回调 | `() => void` | - |
