import React, { useState } from 'react';
import { Tag } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const TagDocs = () => {
  const [editableTagText, setEditableTagText] = useState('Editable Tag');
  const tagProps: PropItem[] = [
    {
      name: 'closable',
      type: 'boolean',
      default: 'false',
      description: '标签是否可以关闭',
      required: false
    },
    {
      name: 'color',
      type: 'string',
      description: '标签色',
      required: false
    },
    {
      name: 'onClose',
      type: '(e) => void',
      description: '关闭时的回调',
      required: false
    },
    {
      name: 'icon',
      type: 'ReactNode',
      description: '设置图标',
      required: false
    },
    {
      name: 'visible',
      type: 'boolean',
      default: 'true',
      description: '是否显示标签',
      required: false
    },
    {
      name: 'editable',
      type: 'boolean',
      default: 'false',
      description: '标签是否可编辑',
      required: false
    },
    {
      name: 'onConfirm',
      type: '(text: string) => void',
      description: '编辑确认时的回调',
      required: false
    },
  ]

  const log = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Tag 标签</h1>
        <p style={docParagraphStyles.lead}>
          进行标记和分类的小标签。
        </p>
      </div>

      <CodeBlock
        title="基本用法"
        description="基本标签的用法，可以通过添加 closable 变为可关闭标签。可关闭标签具有 onClose 事件。"
        code={`import { Tag } from '@paidaxinghaha/my-ui-react'

function App() {
  const log = (e) => {
    console.log(e);
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Tag>Tag 1</Tag>
      <Tag>
        <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
      </Tag>
      <Tag closable onClose={log}>
        Tag 2
      </Tag>
      <Tag closable onClose={(e) => e.preventDefault()}>
        Prevent Default
      </Tag>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <Tag>Tag 1</Tag>
          <Tag>
            <a href="#" onClick={(e) => e.preventDefault()}>Link</a>
          </Tag>
          <Tag closable onClose={log}>
            Tag 2
          </Tag>
          <Tag closable onClose={(e) => e.preventDefault()}>
            Prevent Default
          </Tag>
        </div>
      </CodeBlock>

      <CodeBlock
        title="多彩标签"
        description="我们添加了多种预设色彩的标签样式，用作不同场景使用。"
        code={`import { Tag } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Tag color="blue">blue</Tag>
      <Tag color="green">green</Tag>
      <Tag color="red">red</Tag>
      <Tag color="orange">orange</Tag>
      <Tag color="purple">purple</Tag>
      <Tag color="#f50">#f50</Tag>
      <Tag color="#2db7f5">#2db7f5</Tag>
      <Tag color="#87d068">#87d068</Tag>
      <Tag color="#108ee9">#108ee9</Tag>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Tag color="blue">blue</Tag>
          <Tag color="green">green</Tag>
          <Tag color="red">red</Tag>
          <Tag color="orange">orange</Tag>
          <Tag color="purple">purple</Tag>
          <Tag color="#f50">#f50</Tag>
          <Tag color="#2db7f5">#2db7f5</Tag>
          <Tag color="#87d068">#87d068</Tag>
          <Tag color="#108ee9">#108ee9</Tag>
        </div>
      </CodeBlock>

      <CodeBlock
        title="图标按钮"
        description="当需要在 Tag 内嵌入 Icon 时，可以设置 icon 属性。"
        code={`import { Tag } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Tag icon={<span>★</span>} color="warning">Star</Tag>
      <Tag icon={<span>☀</span>} color="success">Sun</Tag>
      <Tag icon={<span>☁</span>} color="blue">Cloud</Tag>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <Tag icon={<span>★</span>} color="orange">Star</Tag>
          <Tag icon={<span>☀</span>} color="green">Sun</Tag>
          <Tag icon={<span>☁</span>} color="blue">Cloud</Tag>
        </div>
      </CodeBlock>

      <CodeBlock
        title="可编辑标签"
        description="通过设置 editable 属性，用户可以双击编辑标签文本。编辑完成后，调用 onConfirm 回调。"
        code={`import React, { useState } from 'react';
import { Tag } from '@paidaxinghaha/my-ui-react';

function App() {
  const [tagText, setTagText] = useState('Editable Tag');

  return (
    <Tag
      editable
      onConfirm={(text) => setTagText(text)}
    >
      {tagText}
    </Tag>
  );
}
`}
      >
        <Tag
          editable
          onConfirm={(text) => setEditableTagText(text)}
        >
          {editableTagText}
        </Tag>
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={{ ...docHeadingStyles.h2, marginBottom: '24px' }}>API</h2>
        <PropsTable data={tagProps} />
      </div>
    </div>
  )
}

export default TagDocs
