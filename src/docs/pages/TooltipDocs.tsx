import React from 'react';
import { Tooltip, Button } from '@/components';
import { CodeBlock } from '@/components/CodeBlock';
import { PropsTable, type PropItem } from '@/components/PropsTable';
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles';

const TooltipDocs = () => {
  const tooltipProps: PropItem[] = [
    { name: 'title', type: 'ReactNode', description: '提示文字', required: true },
    { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", description: '提示框位置', default: "'top'" },
    { name: 'children', type: 'ReactNode', description: '触发提示的元素', required: true },
    { name: 'className', type: 'string', description: '自定义 Tooltip 的类名' },
    { name: 'style', type: 'React.CSSProperties', description: '自定义 Tooltip 触发器样式' },
  ];

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    marginBottom: '16px',
  };

  return (
    <div>
      <h1 style={docHeadingStyles.h1}>Tooltip 文字提示</h1>
      <p style={docParagraphStyles.lead}>简单的文字提示框，鼠标移入则显示提示，移出则隐藏，气泡浮层不承载复杂文本和操作。</p>

      <CodeBlock
        title="基本用法"
        description="最简单的用法。"
        code={`import { Tooltip, Button } from '@paidaxinghaha/my-ui-react';

<Tooltip title="This is a tooltip">
  <Button>Hover Me</Button>
</Tooltip>`}
      >
        <div style={containerStyle}>
          <Tooltip title="This is a tooltip">
            <Button>Hover Me</Button>
          </Tooltip>
        </div>
      </CodeBlock>

      <CodeBlock
        title="不同位置"
        description="支持上、下、左、右四个方向。"
        code={`import { Tooltip, Button } from '@paidaxinghaha/my-ui-react';

<Tooltip title="Top" placement="top">
  <Button>Top</Button>
</Tooltip>
<Tooltip title="Bottom" placement="bottom">
  <Button>Bottom</Button>
</Tooltip>
<Tooltip title="Left" placement="left">
  <Button>Left</Button>
</Tooltip>
<Tooltip title="Right" placement="right">
  <Button>Right</Button>
</Tooltip>
`}
      >
        <div style={containerStyle}>
          <Tooltip title="Top" placement="top">
            <Button>Top</Button>
          </Tooltip>
          <Tooltip title="Bottom" placement="bottom">
            <Button>Bottom</Button>
          </Tooltip>
          <Tooltip title="Left" placement="left">
            <Button>Left</Button>
          </Tooltip>
          <Tooltip title="Right" placement="right">
            <Button>Right</Button>
          </Tooltip>
        </div>
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={{ ...docHeadingStyles.h2, marginBottom: '24px' }}>API</h2>
        <PropsTable data={tooltipProps} />
      </div>
    </div>
  );
};

export default TooltipDocs;
