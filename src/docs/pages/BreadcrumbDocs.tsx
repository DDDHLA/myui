import React from "react";
import { Breadcrumb, BreadcrumbItem } from "@/components";
import { CodeBlock } from "@/components/CodeBlock";
import { PropsTable } from "@/components/PropsTable";

const BreadcrumbDocs: React.FC = () => {
  const handleItemClick = (label: string) => {
    console.log(`Clicked: ${label}`);
  };

  const basicItems: BreadcrumbItem[] = [
    { label: "首页", path: "/" },
    { label: "产品", path: "/products" },
    { label: "详情" },
  ];

  const iconItems: BreadcrumbItem[] = [
    { label: "首页", path: "/", icon: "home" },
    { label: "产品", path: "/products", icon: "box" },
    { label: "详情", icon: "file" },
  ];

  const longItems: BreadcrumbItem[] = [
    { label: "首页", path: "/" },
    { label: "产品分类", path: "/categories" },
    { label: "电子产品", path: "/categories/electronics" },
    { label: "手机", path: "/categories/electronics/phones" },
    { label: "iPhone", path: "/categories/electronics/phones/iphone" },
    { label: "iPhone 15 Pro" },
  ];

  const clickableItems: BreadcrumbItem[] = [
    {
      label: "首页",
      onClick: () => handleItemClick("首页"),
    },
    {
      label: "产品",
      onClick: () => handleItemClick("产品"),
    },
    { label: "详情" },
  ];

  const breadcrumbProps = [
    {
      prop: "items",
      description: "面包屑项列表",
      type: "BreadcrumbItem[]",
      default: "-",
    },
    {
      prop: "separator",
      description: "分隔符",
      type: "ReactNode",
      default: "/",
    },
    {
      prop: "className",
      description: "自定义类名",
      type: "string",
      default: "-",
    },
    {
      prop: "maxItems",
      description: "最大显示数量",
      type: "number",
      default: "-",
    },
    {
      prop: "itemRender",
      description: "自定义渲染函数",
      type: "(item: BreadcrumbItem, index: number) => ReactNode",
      default: "-",
    },
  ];

  const breadcrumbItemProps = [
    {
      prop: "label",
      description: "文本内容",
      type: "string",
      default: "-",
    },
    {
      prop: "path",
      description: "链接地址",
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
      prop: "onClick",
      description: "点击回调",
      type: "() => void",
      default: "-",
    },
  ];

  return (
    <div className="docs-container">
      <h1>Breadcrumb 面包屑</h1>
      <p className="docs-description">
        显示当前页面在系统层级结构中的位置,并能向上返回。
      </p>

      <section className="docs-section">
        <h2>基本使用</h2>
        <div className="docs-example">
          <Breadcrumb items={basicItems} />
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Breadcrumb } from '@myui/components';

const items = [
  { label: '首页', path: '/' },
  { label: '产品', path: '/products' },
  { label: '详情' }
];

function App() {
  return <Breadcrumb items={items} />;
}`}
        />
      </section>

      <section className="docs-section">
        <h2>带图标</h2>
        <div className="docs-example">
          <Breadcrumb items={iconItems} />
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Breadcrumb } from '@myui/components';

const items = [
  { label: '首页', path: '/', icon: 'home' },
  { label: '产品', path: '/products', icon: 'box' },
  { label: '详情', icon: 'file' }
];

function App() {
  return <Breadcrumb items={items} />;
}`}
        />
      </section>

      <section className="docs-section">
        <h2>自定义分隔符</h2>
        <div className="docs-example" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Breadcrumb items={basicItems} separator=">" />
          <Breadcrumb items={basicItems} separator="-" />
          <Breadcrumb items={basicItems} separator="•" />
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Breadcrumb } from '@myui/components';

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
}`}
        />
      </section>

      <section className="docs-section">
        <h2>最大显示数量</h2>
        <p>当面包屑项过多时,可以设置最大显示数量,中间部分会被省略。</p>
        <div className="docs-example">
          <Breadcrumb items={longItems} maxItems={3} />
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Breadcrumb } from '@myui/components';

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
}`}
        />
      </section>

      <section className="docs-section">
        <h2>点击事件</h2>
        <div className="docs-example">
          <Breadcrumb items={clickableItems} />
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Breadcrumb } from '@myui/components';

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
}`}
        />
      </section>

      <section className="docs-section">
        <h2>Props</h2>
        <PropsTable data={breadcrumbProps} />
      </section>

      <section className="docs-section">
        <h2>BreadcrumbItem</h2>
        <PropsTable data={breadcrumbItemProps} />
      </section>
    </div>
  );
};

export default BreadcrumbDocs;
