import React, { useState } from 'react';
import { Splitter, SplitterPanel } from '@/components/Splitter'; // Assuming Splitter is now in components/Splitter
import { CodeBlock } from '@/components/CodeBlock';
import { PropsTable, PropItem } from '@/components/PropsTable';
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles';

const SplitterDocs = () => {
  const [hSplitterSizes, setHSplitterSizes] = useState<number[]>([]);

  const splitterProps: PropItem[] = [
    {
      name: 'direction',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: '分割方向'
    },
    {
      name: 'splitterSize',
      type: 'number',
      default: '8',
      description: '分割器宽度/高度 (px)'
    },
    {
      name: 'onResize',
      type: '(sizes: (number | string)[]) => void',
      description: '面板尺寸变化时的回调'
    },
    {
      name: 'liveResize',
      type: 'boolean',
      default: 'true',
      description: '是否在拖动时显示实时预览'
    },
    {
      name: 'children',
      type: 'ReactNode',
      description: '子元素，通常是 SplitterPanel',
      required: true
    },
    {
      name: 'className',
      type: 'string',
      description: '自定义类名'
    },
    {
      name: 'style',
      type: 'React.CSSProperties',
      description: '自定义样式'
    },
  ];

  const splitterPanelProps: PropItem[] = [
    {
      name: 'minSize',
      type: 'number',
      description: '面板的最小尺寸 (px)'
    },
    {
      name: 'maxSize',
      type: 'number',
      description: '面板的最大尺寸 (px)'
    },
    {
      name: 'defaultSize',
      type: 'number | string',
      description: '面板的默认尺寸 (px 或 百分比，如 "50%")'
    },
    {
      name: 'collapsible',
      type: 'boolean',
      description: '面板是否可折叠'
    },
    {
      name: 'initialCollapsed',
      type: 'boolean',
      default: 'false',
      description: '面板是否默认折叠'
    },
    {
      name: 'panelId',
      type: 'string',
      description: '面板的唯一标识符'
    },
    {
      name: 'className',
      type: 'string',
      description: '自定义类名'
    },
    {
      name: 'children',
      type: 'ReactNode',
      description: '面板内容',
      required: true
    },
  ];

  const panelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f2f5',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    fontSize: '18px',
    color: '#595959',
    height: '100%', // 占满父容器高度
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Splitter 分隔面板</h1>
        <p style={docParagraphStyles.lead}>
          可拖拽调整尺寸的面板布局组件，支持水平和垂直方向分割，以及面板折叠功能。
        </p>
      </div>

      <CodeBlock
        title="基础用法 (水平)"
        description="最简单的水平分隔面板，两个面板平分空间。"
        code={`import { Splitter, SplitterPanel } from '@paidaxinghaha/my-ui-react';

function App() {
  return (
    <div style={{ height: '300px', border: '1px solid #eee' }}>
      <Splitter>
        <SplitterPanel defaultSize="40%">
          <div style={{ padding: '20px' }}>面板 A</div>
        </SplitterPanel>
        <SplitterPanel defaultSize="60%">
          <div style={{ padding: '20px' }}>面板 B</div>
        </SplitterPanel>
      </Splitter>
    </div>
  );
}`}
      >
        <div style={{ height: '400px', border: '1px solid #eee' }}>
          <Splitter>
            <SplitterPanel defaultSize="40%">
              <div style={panelStyle}>面板 A</div>
            </SplitterPanel>
            <SplitterPanel defaultSize="60%">
              <div style={panelStyle}>面板 B</div>
            </SplitterPanel>
          </Splitter>
        </div>
      </CodeBlock>

      <CodeBlock
        title="基础用法 (垂直)"
        description="设置 direction='vertical' 创建垂直分隔面板。"
        code={`import { Splitter, SplitterPanel } from '@paidaxinghaha/my-ui-react';

function App() {
  return (
    <div style={{ height: '300px', border: '1px solid #eee' }}>
      <Splitter direction="vertical">
        <SplitterPanel defaultSize="50%">
          <div style={{ padding: '20px' }}>面板 A (上)</div>
        </SplitterPanel>
        <SplitterPanel defaultSize="50%">
          <div style={{ padding: '20px' }}>面板 B (下)</div>
        </SplitterPanel>
      </Splitter>
    </div>
  );
}`}
      >
        <div style={{ height: '400px', border: '1px solid #eee' }}>
          <Splitter direction="vertical">
            <SplitterPanel defaultSize="50%">
              <div style={panelStyle}>面板 A (上)</div>
            </SplitterPanel>
            <SplitterPanel defaultSize="50%">
              <div style={panelStyle}>面板 B (下)</div>
            </SplitterPanel>
          </Splitter>
        </div>
      </CodeBlock>

      <CodeBlock
        title="默认尺寸和最小/最大尺寸"
        description="通过 defaultSize、minSize 和 maxSize 控制面板的初始尺寸及可调整范围。"
        code={`import { Splitter, SplitterPanel } from '@paidaxinghaha/my-ui-react';

function App() {
  const [sizes, setSizes] = useState<number[]>([]);
  return (
    <div style={{ height: '300px', border: '1px solid #eee' }}>
      <Splitter onResize={setSizes}>
        <SplitterPanel defaultSize={200} minSize={100} maxSize={300}>
          <div style={panelStyle}>
            面板 A (默认 200px, 最小 100px, 最大 300px)
            <p>当前尺寸: {sizes[0]?.toFixed(0)}px</p>
          </div>
        </SplitterPanel>
        <SplitterPanel defaultSize="30%">
          <div style={panelStyle}>
            面板 B (默认 30%)
            <p>当前尺寸: {sizes[1]?.toFixed(0)}px</p>
          </div>
        </SplitterPanel>
        <SplitterPanel>
          <div style={panelStyle}>
            面板 C (弹性伸缩)
            <p>当前尺寸: {sizes[2]?.toFixed(0)}px</p>
          </div>
        </SplitterPanel>
      </Splitter>
    </div>
  );
}`}
      >
        <div style={{ height: '400px', border: '1px solid #eee' }}>
          <Splitter onResize={(s) => setHSplitterSizes(s as number[])}>
            <SplitterPanel defaultSize={200} minSize={100} maxSize={300}>
              <div style={panelStyle}>
                面板 A (默认 200px, 最小 100px, 最大 300px)
                <p>当前尺寸: {hSplitterSizes[0]?.toFixed(0)}px</p>
              </div>
            </SplitterPanel>
            <SplitterPanel defaultSize="30%">
              <div style={panelStyle}>
                面板 B (默认 30%)
                <p>当前尺寸: {hSplitterSizes[1]?.toFixed(0)}px</p>
              </div>
            </SplitterPanel>
            <SplitterPanel>
              <div style={panelStyle}>
                面板 C (弹性伸缩)
                <p>当前尺寸: {hSplitterSizes[2]?.toFixed(0)}px</p>
              </div>
            </SplitterPanel>
          </Splitter>
        </div>
      </CodeBlock>

      <CodeBlock
        title="可折叠面板"
        description="设置 collapsible 属性使面板可折叠，并可通过 initialCollapsed 初始折叠。点击分割器上的箭头进行折叠/展开操作。"
        code={`import { Splitter, SplitterPanel } from '@paidaxinghaha/my-ui-react';

function App() {
  return (
    <div style={{ height: '300px', border: '1px solid #eee' }}>
      <Splitter>
        <SplitterPanel defaultSize={150} minSize={50} collapsible>
          <div style={panelStyle}>面板 A (可折叠)</div>
        </SplitterPanel>
        <SplitterPanel defaultSize={200} minSize={80}>
          <div style={panelStyle}>面板 B</div>
        </SplitterPanel>
        <SplitterPanel initialCollapsed collapsible>
          <div style={panelStyle}>面板 C (初始折叠)</div>
        </SplitterPanel>
      </Splitter>
    </div>
  );
}`}
      >
        <div style={{ height: '400px', border: '1px solid #eee' }}>
          <Splitter>
            <SplitterPanel defaultSize={150} minSize={50} collapsible>
              <div style={panelStyle}>面板 A (可折叠)</div>
            </SplitterPanel>
            <SplitterPanel defaultSize={200} minSize={80}>
              <div style={panelStyle}>面板 B</div>
            </SplitterPanel>
            <SplitterPanel initialCollapsed collapsible>
              <div style={panelStyle}>面板 C (初始折叠)</div>
            </SplitterPanel>
          </Splitter>
        </div>
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>Splitter API</h2>
        <PropsTable data={splitterProps} />
      </div>

      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>SplitterPanel API</h2>
        <PropsTable data={splitterPanelProps} />
      </div>
    </div>
  );
};

export default SplitterDocs;
