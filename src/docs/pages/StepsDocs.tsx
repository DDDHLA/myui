import { useState } from 'react';
import { Steps, Button } from '@/components';
import { CodeBlock } from '@/components/CodeBlock';
import { PropsTable } from '@/components/PropsTable';
import type { PropItem } from '@/components/PropsTable';
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles';

const StepsDocs = () => {
  const [current1, setCurrent1] = useState(0);
  const [current2, setCurrent2] = useState(1);
  const [current3, setCurrent3] = useState(0);
  const [current4, setCurrent4] = useState(1);

  const stepsProps: PropItem[] = [
    {
      name: 'current',
      type: 'number',
      default: '0',
      description: '当前步骤',
      required: false,
    },
    {
      name: 'status',
      type: "'wait' | 'process' | 'finish' | 'error'",
      default: "'process'",
      description: '当前步骤的状态',
      required: false,
    },
    {
      name: 'direction',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: '步骤条方向',
      required: false,
    },
    {
      name: 'size',
      type: "'default' | 'small'",
      default: "'default'",
      description: '步骤条大小',
      required: false,
    },
    {
      name: 'labelPlacement',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: '标签放置位置',
      required: false,
    },
    {
      name: 'items',
      type: 'StepItem[]',
      description: '步骤条配置项',
      required: false,
    },
    {
      name: 'onChange',
      type: '(current: number) => void',
      description: '点击步骤时触发的回调',
      required: false,
    },
    {
      name: 'progressDot',
      type: 'boolean | ((iconDot, info) => ReactNode)',
      default: 'false',
      description: '点状步骤条',
      required: false,
    },
    {
      name: 'type',
      type: "'default' | 'navigation'",
      default: "'default'",
      description: '步骤条类型',
      required: false,
    },
  ];

  const stepItemProps: PropItem[] = [
    {
      name: 'title',
      type: 'string',
      description: '步骤标题',
      required: true,
    },
    {
      name: 'description',
      type: 'string',
      description: '步骤描述',
      required: false,
    },
    {
      name: 'icon',
      type: 'ReactNode',
      description: '步骤图标',
      required: false,
    },
    {
      name: 'status',
      type: "'wait' | 'process' | 'finish' | 'error'",
      description: '指定步骤的状态',
      required: false,
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: '禁用点击',
      required: false,
    },
  ];

  const basicSteps = [
    { title: '已完成', description: '这是描述信息' },
    { title: '进行中', description: '这是描述信息' },
    { title: '待进行', description: '这是描述信息' },
  ];

  const steps = [
    { title: '第一步', description: '这是第一步的描述' },
    { title: '第二步', description: '这是第二步的描述' },
    { title: '第三步', description: '这是第三步的描述' },
    { title: '第四步', description: '这是第四步的描述' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Steps 步骤条</h1>
        <p style={docParagraphStyles.lead}>引导用户按照流程完成任务的导航条。</p>
      </div>

      <CodeBlock
        title="基本用法"
        description="简单的步骤条。"
        code={`import { Steps } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Steps
      current={1}
      items={[
        { title: '已完成', description: '这是描述信息' },
        { title: '进行中', description: '这是描述信息' },
        { title: '待进行', description: '这是描述信息' },
      ]}
    />
  )
}`}
      >
        <Steps current={1} items={basicSteps} />
      </CodeBlock>

      <CodeBlock
        title="迷你版"
        description="迷你版的步骤条，通过设置 size='small' 启用。"
        code={`import { Steps } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Steps
      size="small"
      current={1}
      items={[
        { title: '已完成' },
        { title: '进行中' },
        { title: '待进行' },
      ]}
    />
  )
}`}
      >
        <Steps
          size="small"
          current={1}
          items={[
            { title: '已完成' },
            { title: '进行中' },
            { title: '待进行' },
          ]}
        />
      </CodeBlock>

      <CodeBlock
        title="带图标的步骤条"
        description="通过设置 items 的 icon 属性，可以启用自定义图标。"
        code={`import { Steps } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Steps
      current={1}
      items={[
        {
          title: '登录',
          icon: <span>👤</span>,
          description: '用户登录'
        },
        {
          title: '验证',
          icon: <span>🔐</span>,
          description: '身份验证'
        },
        {
          title: '完成',
          icon: <span>✨</span>,
          description: '操作完成'
        },
      ]}
    />
  )
}`}
      >
        <Steps
          current={1}
          items={[
            {
              title: '登录',
              icon: <span>👤</span>,
              description: '用户登录',
            },
            {
              title: '验证',
              icon: <span>🔐</span>,
              description: '身份验证',
            },
            {
              title: '完成',
              icon: <span>✨</span>,
              description: '操作完成',
            },
          ]}
        />
      </CodeBlock>

      <CodeBlock
        title="步骤切换"
        description="通常配合内容及按钮使用，表示一个流程的处理进度。"
        code={`import { useState } from 'react'
import { Steps, Button } from '@paidaxinghaha/my-ui-react'

function App() {
  const [current, setCurrent] = useState(0)

  const steps = [
    { title: '第一步', description: '这是第一步的描述' },
    { title: '第二步', description: '这是第二步的描述' },
    { title: '第三步', description: '这是第三步的描述' },
  ]

  return (
    <>
      <Steps current={current} items={steps} />
      <div style={{ marginTop: '24px' }}>
        {current > 0 && (
          <Button onClick={() => setCurrent(current - 1)}>
            上一步
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button
            variant="primary"
            onClick={() => setCurrent(current + 1)}
            style={{ marginLeft: '8px' }}
          >
            下一步
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            variant="primary"
            style={{ marginLeft: '8px' }}
          >
            完成
          </Button>
        )}
      </div>
    </>
  )
}`}
      >
        <div>
          <Steps current={current1} items={basicSteps} />
          <div style={{ marginTop: '24px' }}>
            {current1 > 0 && (
              <Button onClick={() => setCurrent1(current1 - 1)}>上一步</Button>
            )}
            {current1 < basicSteps.length - 1 && (
              <Button
                variant="primary"
                onClick={() => setCurrent1(current1 + 1)}
                style={{ marginLeft: '8px' }}
              >
                下一步
              </Button>
            )}
            {current1 === basicSteps.length - 1 && (
              <Button variant="primary" style={{ marginLeft: '8px' }}>
                完成
              </Button>
            )}
          </div>
        </div>
      </CodeBlock>

      <CodeBlock
        title="垂直方向的步骤条"
        description="简单的垂直方向的步骤条。"
        code={`import { Steps } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Steps
      direction="vertical"
      current={1}
      items={[
        { title: '已完成', description: '这是描述信息' },
        { title: '进行中', description: '这是描述信息' },
        { title: '待进行', description: '这是描述信息' },
      ]}
    />
  )
}`}
      >
        <Steps
          direction="vertical"
          current={1}
          items={[
            { title: '已完成', description: '这是描述信息' },
            { title: '进行中', description: '这是描述信息' },
            { title: '待进行', description: '这是描述信息' },
          ]}
        />
      </CodeBlock>

      <CodeBlock
        title="步骤运行错误"
        description="使用 status 可以指定当前步骤的状态。"
        code={`import { Steps } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Steps
      current={1}
      status="error"
      items={[
        { title: '已完成', description: '这是描述信息' },
        { title: '进行中', description: '这是描述信息' },
        { title: '待进行', description: '这是描述信息' },
      ]}
    />
  )
}`}
      >
        <Steps
          current={1}
          status="error"
          items={[
            { title: '已完成', description: '这是描述信息' },
            { title: '进行中', description: '这是描述信息' },
            { title: '待进行', description: '这是描述信息' },
          ]}
        />
      </CodeBlock>

      <CodeBlock
        title="点状步骤条"
        description="包含步骤点的进度条。"
        code={`import { Steps } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Steps
      progressDot
      current={1}
      items={[
        { title: '已完成', description: '这是描述信息' },
        { title: '进行中', description: '这是描述信息' },
        { title: '待进行', description: '这是描述信息' },
      ]}
    />
  )
}`}
      >
        <Steps
          progressDot
          current={1}
          items={[
            { title: '已完成', description: '这是描述信息' },
            { title: '进行中', description: '这是描述信息' },
            { title: '待进行', description: '这是描述信息' },
          ]}
        />
      </CodeBlock>

      <CodeBlock
        title="点状步骤条（垂直）"
        description="垂直方向的点状步骤条。"
        code={`import { Steps } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Steps
      progressDot
      direction="vertical"
      current={1}
      items={[
        { title: '已完成', description: '这是描述信息' },
        { title: '进行中', description: '这是描述信息' },
        { title: '待进行', description: '这是描述信息' },
      ]}
    />
  )
}`}
      >
        <Steps
          progressDot
          direction="vertical"
          current={1}
          items={[
            { title: '已完成', description: '这是描述信息' },
            { title: '进行中', description: '这是描述信息' },
            { title: '待进行', description: '这是描述信息' },
          ]}
        />
      </CodeBlock>

      <CodeBlock
        title="可点击的步骤条"
        description="设置 onChange 后，Steps 变为可点击状态。"
        code={`import { useState } from 'react'
import { Steps } from '@paidaxinghaha/my-ui-react'

function App() {
  const [current, setCurrent] = useState(1)

  return (
    <Steps
      current={current}
      onChange={setCurrent}
      items={[
        { title: '第一步', description: '这是第一步的描述' },
        { title: '第二步', description: '这是第二步的描述' },
        { title: '第三步', description: '这是第三步的描述' },
        { title: '第四步', description: '这是第四步的描述' },
      ]}
    />
  )
}`}
      >
        <Steps current={current2} onChange={setCurrent2} items={steps} />
      </CodeBlock>

      <CodeBlock
        title="导航步骤条"
        description="导航类型的步骤条。"
        code={`import { useState } from 'react'
import { Steps } from '@paidaxinghaha/my-ui-react'

function App() {
  const [current, setCurrent] = useState(0)

  return (
    <Steps
      type="navigation"
      current={current}
      onChange={setCurrent}
      items={[
        { title: '步骤 1' },
        { title: '步骤 2' },
        { title: '步骤 3' },
        { title: '步骤 4' },
      ]}
    />
  )
}`}
      >
        <Steps
          type="navigation"
          current={current3}
          onChange={setCurrent3}
          items={[
            { title: '步骤 1' },
            { title: '步骤 2' },
            { title: '步骤 3' },
            { title: '步骤 4' },
          ]}
        />
      </CodeBlock>

      <CodeBlock
        title="垂直标签布局"
        description="标签放置在图标下方的步骤条。"
        code={`import { Steps } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Steps
      labelPlacement="vertical"
      current={1}
      items={[
        { title: '已完成', description: '这是描述' },
        { title: '进行中', description: '这是描述' },
        { title: '待进行', description: '这是描述' },
      ]}
    />
  )
}`}
      >
        <Steps
          labelPlacement="vertical"
          current={current4}
          onChange={setCurrent4}
          items={[
            { title: '已完成', description: '这是描述' },
            { title: '进行中', description: '这是描述' },
            { title: '待进行', description: '这是描述' },
          ]}
        />
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={{ ...docHeadingStyles.h2, marginBottom: '24px' }}>API</h2>
        <h3 style={{ ...docHeadingStyles.h3, marginBottom: '16px' }}>Steps</h3>
        <PropsTable data={stepsProps} />

        <h3 style={{ ...docHeadingStyles.h3, marginTop: '32px', marginBottom: '16px' }}>StepItem</h3>
        <PropsTable data={stepItemProps} />
      </div>
    </div>
  );
};

export default StepsDocs;
