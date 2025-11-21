import React from 'react';
import { Watermark, Button } from '@/components';
import { CodeBlock } from '@/components/CodeBlock';
import { PropsTable, type PropItem } from '@/components/PropsTable';
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles';

const WatermarkDocs = () => {
  const watermarkProps: PropItem[] = [
    { name: 'children', type: 'ReactNode', description: '内容' },
    { name: 'text', type: 'string | string[]', description: '水印文字' },
    { name: 'image', type: 'string', description: '图片水印地址' },
    { name: 'fontSize', type: 'number', description: '文字大小', default: '16' },
    { name: 'fontColor', type: 'string', description: '文字颜色', default: 'rgba(0,0,0,0.15)' },
    { name: 'gap', type: '[number, number]', description: '水印间距', default: '[100, 100]' },
    { name: 'opacity', type: 'number', description: '水印透明度', default: '1' },
    { name: 'rotate', type: 'number', description: '旋转角度', default: '-22' },
    { name: 'width', type: 'number', description: '水印宽度', default: '120' },
    { name: 'height', type: 'number', description: '水印高度', default: '64' },
    { name: 'className', type: 'string', description: '自定义类名' },
    { name: 'style', type: 'React.CSSProperties', description: '自定义样式' },
  ];

  const demoContentStyle: React.CSSProperties = {
    padding: '24px',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius)',
  };

  return (
    <div>
      <h1 style={docHeadingStyles.h1}>Watermark 水印</h1>
      <p style={docParagraphStyles.lead}>在内容区域添加特定的文字或图片标识，可用于版权声明、防伪等场景。</p>

      <CodeBlock
        title="文字水印"
        description="最基础的用法，在内容上添加文字水印。"
        code={`import { Watermark } from '@myui/components';

<Watermark text="MyUI">
  <div style={{ height: 300 }}>
    <p>Some content text...</p>
    <p>Some content text...</p>
  </div>
</Watermark>`}
      >
        <Watermark text="MyUI">
          <div style={{...demoContentStyle, height: 300}}>
            <p>这是一段示例文本，水印会覆盖在上方。</p>
            <p>This is some sample content, and the watermark will be overlaid on top.</p>
          </div>
        </Watermark>
      </CodeBlock>

      <CodeBlock
        title="多行文字水印"
        description="通过传递一个字符串数组来创建多行水印。"
        code={`import { Watermark } from '@myui/components';

<Watermark text={['MyUI', 'Internal Use Only']}>
  <div style={{ height: 300 }}>
    <p>Some content text...</p>
  </div>
</Watermark>`}
      >
        <Watermark text={['MyUI', 'Internal Use Only']}>
          <div style={{...demoContentStyle, height: 300}}>
            <p>这个例子展示了如何创建多行水印。</p>
            <p>This example shows how to create a multi-line watermark.</p>
          </div>
        </Watermark>
      </CodeBlock>

      <CodeBlock
        title="自定义样式"
        description="可以自定义水印的字体大小、颜色、旋转角度和间距。"
        code={`import { Watermark } from '@myui/components';

<Watermark 
  text="Custom Style"
  fontSize={24}
  fontColor="rgba(255, 0, 0, 0.2)"
  rotate={-30}
  gap={[150, 150]}
>
  <div style={{ height: 300 }}>
    <p>Some content text...</p>
  </div>
</Watermark>`}
      >
        <Watermark 
          text="Custom Style"
          fontSize={24}
          fontColor="rgba(255, 0, 0, 0.2)"
          rotate={-30}
          gap={[150, 150]}
        >
          <div style={{...demoContentStyle, height: 300}}>
            <p>这里的水印具有自定义的样式。</p>
            <p>The watermark here has custom styles applied.</p>
          </div>
        </Watermark>
      </CodeBlock>
      
      <div style={{ marginTop: '48px' }}>
        <h2 style={{ ...docHeadingStyles.h2, marginBottom: '24px' }}>API</h2>
        <PropsTable data={watermarkProps} />
      </div>
    </div>
  );
};

export default WatermarkDocs;
