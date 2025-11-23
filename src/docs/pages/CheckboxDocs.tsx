import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@/components';
import CodeBlock from '@/components/CodeBlock';
import PropsTable from '@/components/PropsTable';

const CheckboxDocs: React.FC = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkedList, setCheckedList] = useState<(string | number)[]>(['apple']);
  const [checkAll, setCheckAll] = useState(false);

  const fruits = ['apple', 'banana', 'orange', 'grape'];

  const handleCheckAllChange = (checked: boolean) => {
    setCheckedList(checked ? fruits : []);
    setCheckAll(checked);
    setIndeterminate(false);
  };

  const handleGroupChange = (list: (string | number)[]) => {
    setCheckedList(list);
    setIndeterminate(list.length > 0 && list.length < fruits.length);
    setCheckAll(list.length === fruits.length);
  };

  const checkboxProps = [
    {
      name: 'checked',
      type: 'boolean',
      default: '-',
      description: '指定当前是否选中',
    },
    {
      name: 'defaultChecked',
      type: 'boolean',
      default: 'false',
      description: '初始是否选中',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: '是否禁用',
    },
    {
      name: 'indeterminate',
      type: 'boolean',
      default: 'false',
      description: '设置 indeterminate 状态，只负责样式控制',
    },
    {
      name: 'onChange',
      type: '(checked: boolean, e: Event) => void',
      default: '-',
      description: '变化时的回调函数',
    },
    {
      name: 'value',
      type: 'string | number',
      default: '-',
      description: 'Checkbox 的值，用于 CheckboxGroup',
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      default: "'medium'",
      description: '尺寸大小',
    },
    {
      name: 'color',
      type: "'primary' | 'success' | 'warning' | 'danger'",
      default: "'primary'",
      description: '颜色主题',
    },
  ];

  const checkboxGroupProps = [
    {
      name: 'value',
      type: '(string | number)[]',
      default: '-',
      description: '指定选中的选项',
    },
    {
      name: 'defaultValue',
      type: '(string | number)[]',
      default: '[]',
      description: '默认选中的选项',
    },
    {
      name: 'onChange',
      type: '(value: (string | number)[]) => void',
      default: '-',
      description: '变化时的回调函数',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: '整组禁用',
    },
    {
      name: 'direction',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: '排列方向',
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      default: "'medium'",
      description: '尺寸大小',
    },
    {
      name: 'color',
      type: "'primary' | 'success' | 'warning' | 'danger'",
      default: "'primary'",
      description: '颜色主题',
    },
    {
      name: 'options',
      type: 'Array<{label: string, value: string | number, disabled?: boolean}>',
      default: '-',
      description: '选项配置（用于快速生成）',
    },
  ];

  return (
    <div className="docs-content">
      <h1>Checkbox 复选框</h1>
      <p className="docs-description">在一组可选项中进行多项选择时使用。</p>

      {/* 基础用法 */}
      <section className="docs-section">
        <h2>基础用法</h2>
        <p>最简单的用法。</p>
        <div className="docs-example">
          <Checkbox
            checked={checked1}
            onChange={(checked) => setChecked1(checked)}
          >
            Checkbox
          </Checkbox>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Checkbox } from '@/components';

function App() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      checked={checked}
      onChange={(checked) => setChecked(checked)}
    >
      Checkbox
    </Checkbox>
  );
}`}
        />
      </section>

      {/* 禁用状态 */}
      <section className="docs-section">
        <h2>禁用状态</h2>
        <p>Checkbox 不可用状态。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', gap: '16px' }}>
            <Checkbox disabled>未选中禁用</Checkbox>
            <Checkbox disabled checked={checked2} onChange={() => {}}>
              选中禁用
            </Checkbox>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Checkbox disabled>未选中禁用</Checkbox>
<Checkbox disabled checked>选中禁用</Checkbox>`}
        />
      </section>

      {/* 半选状态 */}
      <section className="docs-section">
        <h2>全选与半选</h2>
        <p>在实现全选效果时，通过 indeterminate 属性来表示半选状态。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Checkbox
              indeterminate={indeterminate}
              checked={checkAll}
              onChange={handleCheckAllChange}
            >
              全选
            </Checkbox>
            <div style={{ paddingLeft: '24px' }}>
              <CheckboxGroup
                value={checkedList}
                onChange={handleGroupChange}
                direction="vertical"
              >
                {fruits.map((fruit) => (
                  <Checkbox key={fruit} value={fruit}>
                    {fruit}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`const [checkedList, setCheckedList] = useState(['apple']);
const [checkAll, setCheckAll] = useState(false);
const [indeterminate, setIndeterminate] = useState(true);

const fruits = ['apple', 'banana', 'orange', 'grape'];

const handleCheckAllChange = (checked: boolean) => {
  setCheckedList(checked ? fruits : []);
  setCheckAll(checked);
  setIndeterminate(false);
};

const handleGroupChange = (list: (string | number)[]) => {
  setCheckedList(list);
  setIndeterminate(list.length > 0 && list.length < fruits.length);
  setCheckAll(list.length === fruits.length);
};

<Checkbox
  indeterminate={indeterminate}
  checked={checkAll}
  onChange={handleCheckAllChange}
>
  全选
</Checkbox>
<CheckboxGroup
  value={checkedList}
  onChange={handleGroupChange}
  direction="vertical"
>
  {fruits.map(fruit => (
    <Checkbox key={fruit} value={fruit}>{fruit}</Checkbox>
  ))}
</CheckboxGroup>`}
        />
      </section>

      {/* Checkbox 组 */}
      <section className="docs-section">
        <h2>Checkbox 组</h2>
        <p>方便的从数组生成 Checkbox 组。</p>
        <div className="docs-example">
          <CheckboxGroup
            defaultValue={['apple', 'orange']}
            options={[
              { label: '苹果', value: 'apple' },
              { label: '香蕉', value: 'banana' },
              { label: '橙子', value: 'orange' },
              { label: '葡萄', value: 'grape', disabled: true },
            ]}
          />
        </div>
        <CodeBlock
          language="tsx"
          code={`<CheckboxGroup
  defaultValue={['apple', 'orange']}
  options={[
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
    { label: '橙子', value: 'orange' },
    { label: '葡萄', value: 'grape', disabled: true },
  ]}
/>`}
        />
      </section>

      {/* 垂直排列 */}
      <section className="docs-section">
        <h2>垂直排列</h2>
        <p>通过 direction 属性设置垂直排列。</p>
        <div className="docs-example">
          <CheckboxGroup
            defaultValue={['apple']}
            direction="vertical"
            options={[
              { label: '苹果', value: 'apple' },
              { label: '香蕉', value: 'banana' },
              { label: '橙子', value: 'orange' },
            ]}
          />
        </div>
        <CodeBlock
          language="tsx"
          code={`<CheckboxGroup
  defaultValue={['apple']}
  direction="vertical"
  options={[
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
    { label: '橙子', value: 'orange' },
  ]}
/>`}
        />
      </section>

      {/* 尺寸 */}
      <section className="docs-section">
        <h2>三种尺寸</h2>
        <p>提供三种尺寸：small、medium、large。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Checkbox size="small" defaultChecked>
              Small
            </Checkbox>
            <Checkbox size="medium" defaultChecked>
              Medium
            </Checkbox>
            <Checkbox size="large" defaultChecked>
              Large
            </Checkbox>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Checkbox size="small" defaultChecked>Small</Checkbox>
<Checkbox size="medium" defaultChecked>Medium</Checkbox>
<Checkbox size="large" defaultChecked>Large</Checkbox>`}
        />
      </section>

      {/* 颜色主题 */}
      <section className="docs-section">
        <h2>颜色主题</h2>
        <p>提供多种颜色主题。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Checkbox color="primary" defaultChecked>
              Primary
            </Checkbox>
            <Checkbox color="success" defaultChecked>
              Success
            </Checkbox>
            <Checkbox color="warning" defaultChecked>
              Warning
            </Checkbox>
            <Checkbox color="danger" defaultChecked>
              Danger
            </Checkbox>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Checkbox color="primary" defaultChecked>Primary</Checkbox>
<Checkbox color="success" defaultChecked>Success</Checkbox>
<Checkbox color="warning" defaultChecked>Warning</Checkbox>
<Checkbox color="danger" defaultChecked>Danger</Checkbox>`}
        />
      </section>

      {/* Checkbox Props */}
      <section className="docs-section">
        <h2>Checkbox API</h2>
        <PropsTable data={checkboxProps} />
      </section>

      {/* CheckboxGroup Props */}
      <section className="docs-section">
        <h2>CheckboxGroup API</h2>
        <PropsTable data={checkboxGroupProps} />
      </section>
    </div>
  );
};

export default CheckboxDocs;
