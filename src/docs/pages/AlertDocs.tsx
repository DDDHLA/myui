import React from 'react';
import { Alert, Button } from '@/components';
import CodeBlock from '@/components/CodeBlock';
import PropsTable from '@/components/PropsTable';

const AlertDocs: React.FC = () => {
  const alertProps = [
    {
      name: 'title',
      type: 'ReactNode',
      default: '-',
      description: '警告提示的标题',
    },
    {
      name: 'message',
      type: 'ReactNode',
      default: '-',
      description: '警告提示的内容',
    },
    {
      name: 'type',
      type: "'success' | 'info' | 'warning' | 'error'",
      default: "'info'",
      description: '警告提示的类型',
    },
    {
      name: 'showIcon',
      type: 'boolean',
      default: 'true',
      description: '是否显示图标',
    },
    {
      name: 'icon',
      type: 'ReactNode',
      default: '-',
      description: '自定义图标',
    },
    {
      name: 'closable',
      type: 'boolean',
      default: 'false',
      description: '是否可关闭',
    },
    {
      name: 'onClose',
      type: '() => void',
      default: '-',
      description: '关闭时的回调',
    },
    {
      name: 'bordered',
      type: 'boolean',
      default: 'true',
      description: '是否显示边框',
    },
    {
      name: 'action',
      type: 'ReactNode',
      default: '-',
      description: '辅助操作',
    },
  ];

  return (
    <div className="docs-content">
      <h1>Alert 警告提示</h1>
      <p className="docs-description">警告提示，展现需要关注的信息。</p>

      {/* 基础用法 */}
      <section className="docs-section">
        <h2>基础用法</h2>
        <p>最简单的用法，适用于简短的警告提示。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Alert message="这是一条信息提示" />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Alert } from '@/components';

<Alert message="这是一条信息提示" />`}
        />
      </section>

      {/* 四种类型 */}
      <section className="docs-section">
        <h2>四种类型</h2>
        <p>共有四种样式：success、info、warning、error。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Alert type="success" message="Success Text" />
            <Alert type="info" message="Info Text" />
            <Alert type="warning" message="Warning Text" />
            <Alert type="error" message="Error Text" />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Alert type="success" message="Success Text" />
<Alert type="info" message="Info Text" />
<Alert type="warning" message="Warning Text" />
<Alert type="error" message="Error Text" />`}
        />
      </section>

      {/* 带标题 */}
      <section className="docs-section">
        <h2>带标题</h2>
        <p>含有标题和辅助性文字介绍的警告提示。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Alert
              type="success"
              title="成功提示的标题"
              message="这是成功提示的详细描述，可以写很多文字来说明。"
            />
            <Alert
              type="info"
              title="信息提示的标题"
              message="这是信息提示的详细描述，可以写很多文字来说明。"
            />
            <Alert
              type="warning"
              title="警告提示的标题"
              message="这是警告提示的详细描述，可以写很多文字来说明。"
            />
            <Alert
              type="error"
              title="错误提示的标题"
              message="这是错误提示的详细描述，可以写很多文字来说明。"
            />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Alert
  type="success"
  title="成功提示的标题"
  message="这是成功提示的详细描述，可以写很多文字来说明。"
/>
<Alert
  type="info"
  title="信息提示的标题"
  message="这是信息提示的详细描述，可以写很多文字来说明。"
/>`}
        />
      </section>

      {/* 可关闭 */}
      <section className="docs-section">
        <h2>可关闭</h2>
        <p>显示关闭按钮，点击可关闭警告提示。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Alert
              type="success"
              message="Success Text"
              closable
              onClose={() => console.log('closed')}
            />
            <Alert
              type="info"
              title="Info Title"
              message="Info Text"
              closable
            />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Alert
  type="success"
  message="Success Text"
  closable
  onClose={() => console.log('closed')}
/>
<Alert
  type="info"
  title="Info Title"
  message="Info Text"
  closable
/>`}
        />
      </section>

      {/* 不显示图标 */}
      <section className="docs-section">
        <h2>不显示图标</h2>
        <p>不显示图标的警告提示。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Alert type="success" message="Success Text" showIcon={false} />
            <Alert type="info" message="Info Text" showIcon={false} />
            <Alert type="warning" message="Warning Text" showIcon={false} />
            <Alert type="error" message="Error Text" showIcon={false} />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Alert type="success" message="Success Text" showIcon={false} />
<Alert type="info" message="Info Text" showIcon={false} />`}
        />
      </section>

      {/* 无边框 */}
      <section className="docs-section">
        <h2>无边框</h2>
        <p>不显示边框的警告提示。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Alert type="success" message="Success Text" bordered={false} />
            <Alert type="info" message="Info Text" bordered={false} />
            <Alert type="warning" message="Warning Text" bordered={false} />
            <Alert type="error" message="Error Text" bordered={false} />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Alert type="success" message="Success Text" bordered={false} />
<Alert type="info" message="Info Text" bordered={false} />`}
        />
      </section>

      {/* 辅助操作 */}
      <section className="docs-section">
        <h2>辅助操作</h2>
        <p>可以在右侧添加辅助操作。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Alert
              type="info"
              message="信息提示"
              action={
                <Button size="small" variant="text">
                  查看详情
                </Button>
              }
            />
            <Alert
              type="warning"
              title="警告标题"
              message="警告内容说明"
              action={
                <Button size="small" variant="text">
                  处理
                </Button>
              }
            />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Alert
  type="info"
  message="信息提示"
  action={
    <Button size="small" variant="text">
      查看详情
    </Button>
  }
/>
<Alert
  type="warning"
  title="警告标题"
  message="警告内容说明"
  action={
    <Button size="small" variant="text">
      处理
    </Button>
  }
/>`}
        />
      </section>

      {/* 自定义图标 */}
      <section className="docs-section">
        <h2>自定义图标</h2>
        <p>可以自定义图标。</p>
        <div className="docs-example">
          <Alert
            type="info"
            message="自定义图标的提示"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="currentColor"
                  opacity="0.2"
                />
                <path
                  d="M2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
          />
        </div>
        <CodeBlock
          language="tsx"
          code={`<Alert
  type="info"
  message="自定义图标的提示"
  icon={<CustomIcon />}
/>`}
        />
      </section>

      {/* Alert Props */}
      <section className="docs-section">
        <h2>Alert API</h2>
        <PropsTable data={alertProps} />
      </section>
    </div>
  );
};

export default AlertDocs;
