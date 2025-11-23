import React, { useState } from 'react';
import { Radio, RadioGroup } from '@/components';
import CodeBlock from '@/components/CodeBlock';
import PropsTable from '@/components/PropsTable';

const RadioDocs: React.FC = () => {
  const [value1, setValue1] = useState('apple');
  const [value2, setValue2] = useState('banana');
  const [value3, setValue3] = useState<string | number>();

  const radioProps = [
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
      name: 'onChange',
      type: '(checked: boolean, e: Event) => void',
      default: '-',
      description: '变化时的回调函数',
    },
    {
      name: 'value',
      type: 'string | number',
      default: '-',
      description: 'Radio 的值，用于 RadioGroup',
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
      name: 'name',
      type: 'string',
      default: '-',
      description: 'name 属性',
    },
  ];

  const radioGroupProps = [
    {
      name: 'value',
      type: 'string | number',
      default: '-',
      description: '指定选中的选项',
    },
    {
      name: 'defaultValue',
      type: 'string | number',
      default: '-',
      description: '默认选中的选项',
    },
    {
      name: 'onChange',
      type: '(value: string | number) => void',
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
      name: 'name',
      type: 'string',
      default: '-',
      description: 'name 属性',
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
      <h1>Radio 单选框</h1>
      <p className="docs-description">在一组可选项中进行单选。</p>

      {/* 基础用法 */}
      <section className="docs-section">
        <h2>基础用法</h2>
        <p>最简单的用法。</p>
        <div className="docs-example">
          <Radio defaultChecked>Radio</Radio>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Radio } from '@/components';

<Radio defaultChecked>Radio</Radio>`}
        />
      </section>

      {/* 禁用状态 */}
      <section className="docs-section">
        <h2>禁用状态</h2>
        <p>Radio 不可用状态。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', gap: '16px' }}>
            <Radio disabled>未选中禁用</Radio>
            <Radio disabled defaultChecked>
              选中禁用
            </Radio>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Radio disabled>未选中禁用</Radio>
<Radio disabled defaultChecked>选中禁用</Radio>`}
        />
      </section>

      {/* Radio 组 */}
      <section className="docs-section">
        <h2>Radio 组</h2>
        <p>一组互斥的 Radio 配合使用。</p>
        <div className="docs-example">
          <RadioGroup value={value1} onChange={(val) => setValue1(val as string)}>
            <Radio value="apple">苹果</Radio>
            <Radio value="banana">香蕉</Radio>
            <Radio value="orange">橙子</Radio>
            <Radio value="grape">葡萄</Radio>
          </RadioGroup>
          <div style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
            选中的值: {value1}
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`const [value, setValue] = useState('apple');

<RadioGroup value={value} onChange={setValue}>
  <Radio value="apple">苹果</Radio>
  <Radio value="banana">香蕉</Radio>
  <Radio value="orange">橙子</Radio>
  <Radio value="grape">葡萄</Radio>
</RadioGroup>`}
        />
      </section>

      {/* 使用 options 快速生成 */}
      <section className="docs-section">
        <h2>快速生成</h2>
        <p>通过 options 配置快速生成 Radio 组。</p>
        <div className="docs-example">
          <RadioGroup
            value={value2}
            onChange={(val) => setValue2(val as string)}
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
          code={`<RadioGroup
  value={value}
  onChange={setValue}
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
          <RadioGroup
            defaultValue="apple"
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
          code={`<RadioGroup
  defaultValue="apple"
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
            <Radio size="small" defaultChecked>
              Small
            </Radio>
            <Radio size="medium" defaultChecked>
              Medium
            </Radio>
            <Radio size="large" defaultChecked>
              Large
            </Radio>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Radio size="small" defaultChecked>Small</Radio>
<Radio size="medium" defaultChecked>Medium</Radio>
<Radio size="large" defaultChecked>Large</Radio>`}
        />
      </section>

      {/* 颜色主题 */}
      <section className="docs-section">
        <h2>颜色主题</h2>
        <p>提供多种颜色主题。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Radio color="primary" defaultChecked>
              Primary
            </Radio>
            <Radio color="success" defaultChecked>
              Success
            </Radio>
            <Radio color="warning" defaultChecked>
              Warning
            </Radio>
            <Radio color="danger" defaultChecked>
              Danger
            </Radio>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Radio color="primary" defaultChecked>Primary</Radio>
<Radio color="success" defaultChecked>Success</Radio>
<Radio color="warning" defaultChecked>Warning</Radio>
<Radio color="danger" defaultChecked>Danger</Radio>`}
        />
      </section>

      {/* 按钮样式（未来扩展） */}
      <section className="docs-section">
        <h2>全组禁用</h2>
        <p>整组禁用的 Radio 组。</p>
        <div className="docs-example">
          <RadioGroup
            disabled
            defaultValue="apple"
            options={[
              { label: '苹果', value: 'apple' },
              { label: '香蕉', value: 'banana' },
              { label: '橙子', value: 'orange' },
            ]}
          />
        </div>
        <CodeBlock
          language="tsx"
          code={`<RadioGroup
  disabled
  defaultValue="apple"
  options={[
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
    { label: '橙子', value: 'orange' },
  ]}
/>`}
        />
      </section>

      {/* Radio Props */}
      <section className="docs-section">
        <h2>Radio API</h2>
        <PropsTable data={radioProps} />
      </section>

      {/* RadioGroup Props */}
      <section className="docs-section">
        <h2>RadioGroup API</h2>
        <PropsTable data={radioGroupProps} />
      </section>
    </div>
  );
};

export default RadioDocs;
