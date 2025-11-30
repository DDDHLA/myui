# Breadcrumb 面包屑

显示当前页面在系统层级结构中的位置，并能向上返回。

## 基本使用

```tsx
import { Breadcrumb } from '@paidaxinghaha/my-ui-react';

const items = [
  { label: '首页', path: '/' },
  { label: '产品', path: '/products' },
  { label: '详情' }
];

function App() {
  return <Breadcrumb items={items} />;
}
```

## 带图标

```tsx
import { Breadcrumb } from '@paidaxinghaha/my-ui-react';

const items = [
  { label: '首页', path: '/', icon: 'home' },
  { label: '产品', path: '/products', icon: 'box' },
  { label: '详情', icon: 'file' }
];

function App() {
  return <Breadcrumb items={items} />;
}
```

## 自定义分隔符

```tsx
import { Breadcrumb } from '@paidaxinghaha/my-ui-react';

const items = [
  { label: '首页', path: '/' },
  { label: '产品', path: '/products' },
  { label: '详情' }
];

function App() {
  return (
    <>
      <Breadcrumb items={items} separator=">" />
      <Breadcrumb items={items} separator="-" />
      <Breadcrumb items={items} separator="•" />
    </>
  );
}
```

## 最大显示数量

当面包屑项过多时，可以设置最大显示数量，中间部分会被省略。

```tsx
import { Breadcrumb } from '@paidaxinghaha/my-ui-react';

const items = [
  { label: '首页', path: '/' },
  { label: '产品分类', path: '/categories' },
  { label: '电子产品', path: '/categories/electronics' },
  { label: '手机', path: '/categories/electronics/phones' },
  { label: 'iPhone', path: '/categories/electronics/phones/iphone' },
  { label: 'iPhone 15 Pro' }
];

function App() {
  return <Breadcrumb items={items} maxItems={3} />;
}
```

## 自定义渲染

```tsx
import { Breadcrumb, BreadcrumbItem } from '@paidaxinghaha/my-ui-react';

const items = [
  { label: '首页', path: '/' },
  { label: '产品', path: '/products' },
  { label: '详情' }
];

function App() {
  return (
    <Breadcrumb
      items={items}
      itemRender={(item: BreadcrumbItem, index: number) => (
        <strong>{item.label}</strong>
      )}
    />
  );
}
```

## 点击事件

```tsx
import { Breadcrumb } from '@paidaxinghaha/my-ui-react';

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
];

function App() {
  return <Breadcrumb items={items} />;
}
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 面包屑项列表 | `BreadcrumbItem[]` | - |
| separator | 分隔符 | `ReactNode` | `/` |
| className | 自定义类名 | `string` | - |
| maxItems | 最大显示数量 | `number` | - |
| itemRender | 自定义渲染函数 | `(item: BreadcrumbItem, index: number) => ReactNode` | - |

## BreadcrumbItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 文本内容 | `string` | - |
| path | 链接地址 | `string` | - |
| icon | 图标名称 | `string` | - |
| onClick | 点击回调 | `() => void` | - |
