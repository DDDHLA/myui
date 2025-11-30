import { useState } from 'react';
import { Popover, Button } from '@/components';
import { CodeBlock } from '@/components/CodeBlock';
import { PropsTable, type PropItem } from '@/components/PropsTable';
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles';

const PopoverDocs = () => {
  const [open, setOpen] = useState(false);

  const popoverProps: PropItem[] = [
    { name: 'title', type: 'ReactNode', description: '标题' },
    { name: 'content', type: 'ReactNode', description: '内容', required: true },
    { name: 'trigger', type: "'hover' | 'click' | 'focus'", description: '触发方式', default: "'hover'" },
    { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", description: '气泡位置', default: "'top'" },
    { name: 'open', type: 'boolean', description: '受控模式下,气泡是否显示' },
    { name: 'defaultOpen', type: 'boolean', description: '默认是否显示', default: 'false' },
    { name: 'onOpenChange', type: '(open: boolean) => void', description: '显示状态改变时的回调' },
    { name: 'disabled', type: 'boolean', description: '是否禁用', default: 'false' },
    { name: 'children', type: 'ReactNode', description: '触发元素', required: true },
    { name: 'className', type: 'string', description: '自定义类名' },
  ];

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    marginBottom: '16px',
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Popover 气泡卡片</h1>
        <p style={docParagraphStyles.lead}>
          点击/鼠标移入元素,弹出气泡式的卡片浮层。可以承载更复杂的内容,如链接、按钮等。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="最简单的用法,鼠标移入触发。"
        code={`import { Popover, Button } from '@paidaxinghaha/my-ui-react';

<Popover
  title="标题"
  content="这是一段气泡卡片的内容,可以包含更多信息。"
>
  <Button>Hover Me</Button>
</Popover>`}
      >
        <div style={containerStyle}>
          <Popover
            title="标题"
            content="这是一段气泡卡片的内容,可以包含更多信息。"
          >
            <Button>Hover Me</Button>
          </Popover>
        </div>
      </CodeBlock>

      <CodeBlock
        title="不同触发方式"
        description="支持 hover、click、focus 三种触发方式。"
        code={`import { Popover, Button } from '@paidaxinghaha/my-ui-react';

<Popover trigger="hover" content="鼠标移入触发">
  <Button>Hover</Button>
</Popover>

<Popover trigger="click" content="点击触发">
  <Button>Click</Button>
</Popover>

<Popover trigger="focus" content="聚焦触发">
  <Button>Focus</Button>
</Popover>`}
      >
        <div style={containerStyle}>
          <Popover trigger="hover" content="鼠标移入触发">
            <Button>Hover</Button>
          </Popover>
          <Popover trigger="click" content="点击触发">
            <Button>Click</Button>
          </Popover>
          <Popover trigger="focus" content="聚焦触发">
            <Button>Focus</Button>
          </Popover>
        </div>
      </CodeBlock>

      <CodeBlock
        title="不同位置"
        description="支持上、下、左、右四个方向。"
        code={`import { Popover, Button } from '@paidaxinghaha/my-ui-react';

<Popover placement="top" content="Top">
  <Button>Top</Button>
</Popover>

<Popover placement="bottom" content="Bottom">
  <Button>Bottom</Button>
</Popover>

<Popover placement="left" content="Left">
  <Button>Left</Button>
</Popover>

<Popover placement="right" content="Right">
  <Button>Right</Button>
</Popover>`}
      >
        <div style={containerStyle}>
          <Popover placement="top" content="Top">
            <Button>Top</Button>
          </Popover>
          <Popover placement="bottom" content="Bottom">
            <Button>Bottom</Button>
          </Popover>
          <Popover placement="left" content="Left">
            <Button>Left</Button>
          </Popover>
          <Popover placement="right" content="Right">
            <Button>Right</Button>
          </Popover>
        </div>
      </CodeBlock>

      <CodeBlock
        title="带标题"
        description="可以设置标题,使内容更清晰。"
        code={`import { Popover, Button } from '@paidaxinghaha/my-ui-react';

<Popover
  title="提示标题"
  content="这是气泡卡片的详细内容,可以包含更多的文字说明。"
>
  <Button>带标题的气泡</Button>
</Popover>`}
      >
        <div style={containerStyle}>
          <Popover
            title="提示标题"
            content="这是气泡卡片的详细内容,可以包含更多的文字说明。"
          >
            <Button>带标题的气泡</Button>
          </Popover>
        </div>
      </CodeBlock>

      <CodeBlock
        title="自定义内容"
        description="content 可以是任意 ReactNode,支持复杂的内容。"
        code={`import { Popover, Button } from '@paidaxinghaha/my-ui-react';

const content = (
  <div>
    <p style={{ margin: '0 0 8px 0' }}>这是自定义内容</p>
    <Button size="sm" variant="primary">操作按钮</Button>
  </div>
);

<Popover title="自定义内容" content={content}>
  <Button>自定义内容</Button>
</Popover>`}
      >
        <div style={containerStyle}>
          <Popover
            title="自定义内容"
            content={
              <div>
                <p style={{ margin: '0 0 8px 0' }}>这是自定义内容</p>
                <Button size="sm" variant="primary">
                  操作按钮
                </Button>
              </div>
            }
          >
            <Button>自定义内容</Button>
          </Popover>
        </div>
      </CodeBlock>

      <CodeBlock
        title="受控模式"
        description="通过 open 和 onOpenChange 控制气泡的显示状态。"
        code={`import { Popover, Button } from '@paidaxinghaha/my-ui-react';
import { useState } from 'react';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Popover
        title="受控模式"
        content="这是一个受控的气泡卡片"
        trigger="click"
        open={open}
        onOpenChange={setOpen}
      >
        <Button>点击控制</Button>
      </Popover>
      <p>当前状态: {open ? '显示' : '隐藏'}</p>
    </div>
  );
}`}
      >
        <div style={{ textAlign: 'center' }}>
          <Popover
            title="受控模式"
            content="这是一个受控的气泡卡片"
            trigger="click"
            open={open}
            onOpenChange={setOpen}
          >
            <Button>点击控制</Button>
          </Popover>
          <p style={{ marginTop: '12px', color: '#6b7280' }}>
            当前状态: <strong>{open ? '显示' : '隐藏'}</strong>
          </p>
        </div>
      </CodeBlock>

      <CodeBlock
        title="禁用状态"
        description="设置 disabled 禁用气泡卡片。"
        code={`import { Popover, Button } from '@paidaxinghaha/my-ui-react';

<Popover content="这个气泡被禁用了" disabled>
  <Button>禁用的气泡</Button>
</Popover>`}
      >
        <div style={containerStyle}>
          <Popover content="这个气泡被禁用了" disabled>
            <Button>禁用的气泡</Button>
          </Popover>
        </div>
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={{ ...docHeadingStyles.h2, marginBottom: '24px' }}>API</h2>
        <PropsTable data={popoverProps} />

        <div
          style={{
            marginTop: '32px',
            padding: '16px',
            backgroundColor: 'var(--bg-secondary, #f3f4f6)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--color-primary, #3b82f6)',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', fontWeight: '600' }}>
            💡 使用提示
          </h4>
          <ul
            style={{
              margin: 0,
              paddingLeft: '24px',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
            }}
          >
            <li>Popover 适合承载较复杂的内容,如果只是简单文字提示,建议使用 Tooltip</li>
            <li>click 触发方式会在点击外部区域时自动关闭</li>
            <li>使用受控模式可以更灵活地控制显示状态</li>
            <li>气泡会自动计算位置,避免超出视口</li>
            <li>支持暗色主题,会自动适配当前主题</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PopoverDocs;
