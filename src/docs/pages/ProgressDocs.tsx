import React, { useState, useEffect } from 'react';
import { Progress, Button } from '@/components';
import CodeBlock from '@/components/CodeBlock';
import PropsTable from '@/components/PropsTable';

const ProgressDocs: React.FC = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) return 0;
        return prev + 10;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const progressProps = [
    {
      name: 'percent',
      type: 'number',
      default: '0',
      description: '当前进度百分比 (0-100)',
    },
    {
      name: 'type',
      type: "'line' | 'circle' | 'dashboard'",
      default: "'line'",
      description: '进度条类型',
    },
    {
      name: 'status',
      type: "'normal' | 'success' | 'error' | 'warning'",
      default: "'normal'",
      description: '进度条状态',
    },
    {
      name: 'showInfo',
      type: 'boolean',
      default: 'true',
      description: '是否显示进度文字',
    },
    {
      name: 'strokeWidth',
      type: 'number',
      default: 'line: 8, circle: 6',
      description: '进度条线的宽度',
    },
    {
      name: 'strokeColor',
      type: 'string',
      default: '-',
      description: '进度条的颜色',
    },
    {
      name: 'trailColor',
      type: 'string',
      default: "'#f0f0f0'",
      description: '未完成部分的颜色',
    },
    {
      name: 'width',
      type: 'number',
      default: '120',
      description: '圆形进度条画布宽度',
    },
    {
      name: 'format',
      type: '(percent?: number) => ReactNode',
      default: '-',
      description: '自定义进度文字格式',
    },
  ];

  return (
    <div className="docs-content">
      <h1>Progress 进度条</h1>
      <p className="docs-description">展示操作的当前进度。</p>

      {/* 基础用法 */}
      <section className="docs-section">
        <h2>基础用法</h2>
        <p>标准的进度条。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Progress percent={30} />
            <Progress percent={50} />
            <Progress percent={70} />
            <Progress percent={100} />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Progress } from '@/components';

<Progress percent={30} />
<Progress percent={50} />
<Progress percent={70} />
<Progress percent={100} />`}
        />
      </section>

      {/* 进度条状态 */}
      <section className="docs-section">
        <h2>进度条状态</h2>
        <p>不同状态的进度条。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Progress percent={30} status="normal" />
            <Progress percent={50} status="success" />
            <Progress percent={70} status="warning" />
            <Progress percent={100} status="error" />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Progress percent={30} status="normal" />
<Progress percent={50} status="success" />
<Progress percent={70} status="warning" />
<Progress percent={100} status="error" />`}
        />
      </section>

      {/* 圆形进度条 */}
      <section className="docs-section">
        <h2>圆形进度条</h2>
        <p>圆形的进度条。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <Progress type="circle" percent={25} />
            <Progress type="circle" percent={50} />
            <Progress type="circle" percent={75} />
            <Progress type="circle" percent={100} status="success" />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Progress type="circle" percent={25} />
<Progress type="circle" percent={50} />
<Progress type="circle" percent={75} />
<Progress type="circle" percent={100} status="success" />`}
        />
      </section>

      {/* 仪表盘 */}
      <section className="docs-section">
        <h2>仪表盘</h2>
        <p>仪表盘样式的进度条。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <Progress type="dashboard" percent={25} />
            <Progress type="dashboard" percent={50} />
            <Progress type="dashboard" percent={75} />
            <Progress type="dashboard" percent={100} status="success" />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Progress type="dashboard" percent={25} />
<Progress type="dashboard" percent={50} />
<Progress type="dashboard" percent={75} />
<Progress type="dashboard" percent={100} status="success" />`}
        />
      </section>

      {/* 动态进度 */}
      <section className="docs-section">
        <h2>动态进度</h2>
        <p>会动的进度条。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Progress percent={percent} />
            <div style={{ display: 'flex', gap: '16px' }}>
              <Progress type="circle" percent={percent} />
              <Progress type="dashboard" percent={percent} />
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`const [percent, setPercent] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setPercent((prev) => {
      if (prev >= 100) return 0;
      return prev + 10;
    });
  }, 1000);

  return () => clearInterval(timer);
}, []);

<Progress percent={percent} />
<Progress type="circle" percent={percent} />
<Progress type="dashboard" percent={percent} />`}
        />
      </section>

      {/* 自定义文字格式 */}
      <section className="docs-section">
        <h2>自定义文字格式</h2>
        <p>通过 format 属性自定义进度文字。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Progress percent={75} format={(p) => `${p} 天`} />
            <Progress
              type="circle"
              percent={80}
              format={(p) => `${p} 分`}
            />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Progress percent={75} format={(p) => \`\${p} 天\`} />
<Progress
  type="circle"
  percent={80}
  format={(p) => \`\${p} 分\`}
/>`}
        />
      </section>

      {/* 不同尺寸 */}
      <section className="docs-section">
        <h2>不同尺寸</h2>
        <p>线形进度条和圆形进度条都支持自定义尺寸。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Progress percent={60} strokeWidth={4} />
              <Progress percent={60} strokeWidth={8} />
              <Progress percent={60} strokeWidth={12} />
            </div>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <Progress type="circle" percent={75} width={80} strokeWidth={4} />
              <Progress type="circle" percent={75} width={120} strokeWidth={6} />
              <Progress type="circle" percent={75} width={160} strokeWidth={8} />
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Progress percent={60} strokeWidth={4} />
<Progress percent={60} strokeWidth={8} />
<Progress percent={60} strokeWidth={12} />

<Progress type="circle" percent={75} width={80} strokeWidth={4} />
<Progress type="circle" percent={75} width={120} strokeWidth={6} />
<Progress type="circle" percent={75} width={160} strokeWidth={8} />`}
        />
      </section>

      {/* 自定义颜色 */}
      <section className="docs-section">
        <h2>自定义颜色</h2>
        <p>通过 strokeColor 自定义进度条颜色。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Progress percent={60} strokeColor="#722ed1" />
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <Progress type="circle" percent={75} strokeColor="#13c2c2" />
              <Progress type="dashboard" percent={75} strokeColor="#eb2f96" />
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<Progress percent={60} strokeColor="#722ed1" />
<Progress type="circle" percent={75} strokeColor="#13c2c2" />
<Progress type="dashboard" percent={75} strokeColor="#eb2f96" />`}
        />
      </section>

      {/* Progress Props */}
      <section className="docs-section">
        <h2>Progress API</h2>
        <PropsTable data={progressProps} />
      </section>
    </div>
  );
};

export default ProgressDocs;
