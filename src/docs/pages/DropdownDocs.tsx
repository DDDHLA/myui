import React from 'react';
import { Dropdown, Button, type DropdownMenuItem } from '@/components';
import CodeBlock from '@/components/CodeBlock';
import PropsTable from '@/components/PropsTable';

const DropdownDocs: React.FC = () => {
  const basicMenu: DropdownMenuItem[] = [
    {
      key: '1',
      label: '菜单项 1',
    },
    {
      key: '2',
      label: '菜单项 2',
    },
    {
      key: '3',
      label: '菜单项 3',
    },
  ];

  const menuWithIcons: DropdownMenuItem[] = [
    {
      key: 'edit',
      label: '编辑',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      key: 'copy',
      label: '复制',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
          <path
            d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      key: 'divider-1',
      label: '',
      divider: true,
    },
    {
      key: 'delete',
      label: '删除',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  const menuWithDisabled: DropdownMenuItem[] = [
    {
      key: '1',
      label: '菜单项 1',
    },
    {
      key: '2',
      label: '菜单项 2（禁用）',
      disabled: true,
    },
    {
      key: '3',
      label: '菜单项 3',
    },
  ];

  const menuWithSubmenu: DropdownMenuItem[] = [
    {
      key: '1',
      label: '菜单项 1',
    },
    {
      key: '2',
      label: '更多操作',
      children: [
        {
          key: '2-1',
          label: '子菜单 1',
        },
        {
          key: '2-2',
          label: '子菜单 2',
        },
      ],
    },
    {
      key: '3',
      label: '菜单项 3',
    },
  ];

  const handleSelect = (key: string, item: DropdownMenuItem) => {
    console.log('Selected:', key, item);
  };

  const dropdownProps = [
    {
      name: 'menu',
      type: 'DropdownMenuItem[]',
      default: '-',
      description: '下拉菜单选项',
    },
    {
      name: 'onSelect',
      type: '(key: string, item: DropdownMenuItem) => void',
      default: '-',
      description: '点击菜单项时的回调',
    },
    {
      name: 'trigger',
      type: "'hover' | 'click'",
      default: "'hover'",
      description: '触发方式',
    },
    {
      name: 'placement',
      type: "'bottom' | 'bottomLeft' | 'bottomRight' | 'top' | 'topLeft' | 'topRight'",
      default: "'bottomLeft'",
      description: '弹出位置',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: '是否禁用',
    },
  ];

  const menuItemProps = [
    {
      name: 'key',
      type: 'string',
      default: '-',
      description: '菜单项的唯一标识',
    },
    {
      name: 'label',
      type: 'ReactNode',
      default: '-',
      description: '菜单项显示的文本',
    },
    {
      name: 'icon',
      type: 'ReactNode',
      default: '-',
      description: '菜单项图标',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: '是否禁用',
    },
    {
      name: 'divider',
      type: 'boolean',
      default: 'false',
      description: '是否为分割线',
    },
    {
      name: 'children',
      type: 'DropdownMenuItem[]',
      default: '-',
      description: '子菜单',
    },
  ];

  return (
    <div className="docs-content">
      <h1>Dropdown 下拉菜单</h1>
      <p className="docs-description">向下弹出的列表。</p>

      {/* 基础用法 */}
      <section className="docs-section">
        <h2>基础用法</h2>
        <p>最简单的下拉菜单。</p>
        <div className="docs-example">
          <Dropdown menu={basicMenu} onSelect={handleSelect}>
            <Button>悬停显示菜单</Button>
          </Dropdown>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Dropdown, Button } from '@/components';

const menu = [
  { key: '1', label: '菜单项 1' },
  { key: '2', label: '菜单项 2' },
  { key: '3', label: '菜单项 3' },
];

<Dropdown menu={menu} onSelect={(key, item) => console.log(key, item)}>
  <Button>悬停显示菜单</Button>
</Dropdown>`}
        />
      </section>

      {/* 触发方式 */}
      <section className="docs-section">
        <h2>触发方式</h2>
        <p>通过 trigger 属性设置触发方式，可以是 hover 或 click。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', gap: '16px' }}>
            <Dropdown menu={basicMenu} trigger="hover">
              <Button>Hover</Button>
            </Dropdown>
            <Dropdown menu={basicMenu} trigger="click">
              <Button>Click</Button>
            </Dropdown>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Dropdown menu={menu} trigger="hover">
  <Button>Hover</Button>
</Dropdown>

<Dropdown menu={menu} trigger="click">
  <Button>Click</Button>
</Dropdown>`}
        />
      </section>

      {/* 带图标的菜单 */}
      <section className="docs-section">
        <h2>带图标的菜单</h2>
        <p>为菜单项添加图标。</p>
        <div className="docs-example">
          <Dropdown menu={menuWithIcons} onSelect={handleSelect}>
            <Button>操作菜单</Button>
          </Dropdown>
        </div>
        <CodeBlock
          language="tsx"
          code={`const menuWithIcons = [
  {
    key: 'edit',
    label: '编辑',
    icon: <EditIcon />,
  },
  {
    key: 'copy',
    label: '复制',
    icon: <CopyIcon />,
  },
  {
    key: 'divider-1',
    label: '',
    divider: true,
  },
  {
    key: 'delete',
    label: '删除',
    icon: <DeleteIcon />,
  },
];

<Dropdown menu={menuWithIcons} onSelect={handleSelect}>
  <Button>操作菜单</Button>
</Dropdown>`}
        />
      </section>

      {/* 禁用状态 */}
      <section className="docs-section">
        <h2>禁用状态</h2>
        <p>可以禁用整个下拉菜单或单个菜单项。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', gap: '16px' }}>
            <Dropdown menu={menuWithDisabled}>
              <Button>部分禁用</Button>
            </Dropdown>
            <Dropdown menu={basicMenu} disabled>
              <Button>全部禁用</Button>
            </Dropdown>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`const menuWithDisabled = [
  { key: '1', label: '菜单项 1' },
  { key: '2', label: '菜单项 2（禁用）', disabled: true },
  { key: '3', label: '菜单项 3' },
];

<Dropdown menu={menuWithDisabled}>
  <Button>部分禁用</Button>
</Dropdown>

<Dropdown menu={menu} disabled>
  <Button>全部禁用</Button>
</Dropdown>`}
        />
      </section>

      {/* 弹出位置 */}
      <section className="docs-section">
        <h2>弹出位置</h2>
        <p>通过 placement 属性设置弹出位置。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Dropdown menu={basicMenu} placement="bottomLeft">
              <Button>Bottom Left</Button>
            </Dropdown>
            <Dropdown menu={basicMenu} placement="bottom">
              <Button>Bottom</Button>
            </Dropdown>
            <Dropdown menu={basicMenu} placement="bottomRight">
              <Button>Bottom Right</Button>
            </Dropdown>
            <Dropdown menu={basicMenu} placement="topLeft">
              <Button>Top Left</Button>
            </Dropdown>
            <Dropdown menu={basicMenu} placement="top">
              <Button>Top</Button>
            </Dropdown>
            <Dropdown menu={basicMenu} placement="topRight">
              <Button>Top Right</Button>
            </Dropdown>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Dropdown menu={menu} placement="bottomLeft">
  <Button>Bottom Left</Button>
</Dropdown>
<Dropdown menu={menu} placement="top">
  <Button>Top</Button>
</Dropdown>`}
        />
      </section>

      {/* 子菜单 */}
      <section className="docs-section">
        <h2>子菜单</h2>
        <p>支持多级菜单。</p>
        <div className="docs-example">
          <Dropdown menu={menuWithSubmenu} onSelect={handleSelect}>
            <Button>多级菜单</Button>
          </Dropdown>
        </div>
        <CodeBlock
          language="tsx"
          code={`const menuWithSubmenu = [
  { key: '1', label: '菜单项 1' },
  {
    key: '2',
    label: '更多操作',
    children: [
      { key: '2-1', label: '子菜单 1' },
      { key: '2-2', label: '子菜单 2' },
    ],
  },
  { key: '3', label: '菜单项 3' },
];

<Dropdown menu={menuWithSubmenu}>
  <Button>多级菜单</Button>
</Dropdown>`}
        />
      </section>

      {/* Dropdown Props */}
      <section className="docs-section">
        <h2>Dropdown API</h2>
        <PropsTable data={dropdownProps} />
      </section>

      {/* DropdownMenuItem Props */}
      <section className="docs-section">
        <h2>DropdownMenuItem API</h2>
        <PropsTable data={menuItemProps} />
      </section>
    </div>
  );
};

export default DropdownDocs;
