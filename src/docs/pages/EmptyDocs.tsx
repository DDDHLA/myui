import { Empty, Button } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const EmptyDocs = () => {
  const emptyProps: PropItem[] = [
    { name: 'image', type: 'ReactNode', description: '自定义图片' },
    { name: 'imageStyle', type: 'CSSProperties', description: '图片样式' },
    { name: 'description', type: 'ReactNode', description: '自定义描述内容，设为 false 可隐藏' },
    { name: 'children', type: 'ReactNode', description: '底部内容' },
    { name: 'preset', type: "'default' | 'simple' | 'search' | 'error' | 'network'", default: "'default'", description: '预设类型' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '尺寸' }
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Empty 空状态</h1>
        <p style={docParagraphStyles.lead}>
          空状态时的占位提示，用于在没有数据时给予用户友好的提示。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="简单的展示空状态。"
        code={`import { Empty } from '@myui/components'

<Empty />`}
      >
        <Empty />
      </CodeBlock>

      <CodeBlock
        title="自定义描述"
        description="自定义描述内容。"
        code={`<Empty description="没有找到相关内容" />`}
      >
        <Empty description="没有找到相关内容" />
      </CodeBlock>

      <CodeBlock
        title="尺寸"
        description="三种尺寸：sm、md、lg。"
        code={`<Empty size="sm" description="小尺寸" />
<Empty size="md" description="中尺寸" />
<Empty size="lg" description="大尺寸" />`}
      >
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Empty size="sm" description="小尺寸" />
          <Empty size="md" description="中尺寸" />
          <Empty size="lg" description="大尺寸" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="预设类型"
        description="内置多种预设类型，适用于不同场景。"
        code={`<Empty preset="default" />
<Empty preset="simple" />
<Empty preset="search" />
<Empty preset="error" />
<Empty preset="network" />`}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '24px' }}>
          <div style={{ textAlign: 'center' }}>
            <Empty preset="default" size="sm" />
            <div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>default</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Empty preset="simple" size="sm" />
            <div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>simple</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Empty preset="search" size="sm" />
            <div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>search</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Empty preset="error" size="sm" />
            <div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>error</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Empty preset="network" size="sm" />
            <div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>network</div>
          </div>
        </div>
      </CodeBlock>

      <CodeBlock
        title="带操作按钮"
        description="可以通过 children 添加操作按钮。"
        code={`<Empty description="暂无数据">
  <Button variant="primary">立即创建</Button>
</Empty>`}
      >
        <Empty description="暂无数据">
          <Button variant="primary">立即创建</Button>
        </Empty>
      </CodeBlock>

      <CodeBlock
        title="搜索无结果"
        description="搜索场景下的空状态。"
        code={`<Empty preset="search" description="未找到相关结果，请尝试其他关键词">
  <Button>清空搜索</Button>
</Empty>`}
      >
        <Empty preset="search" description="未找到相关结果，请尝试其他关键词">
          <Button>清空搜索</Button>
        </Empty>
      </CodeBlock>

      <CodeBlock
        title="加载失败"
        description="数据加载失败时的空状态。"
        code={`<Empty preset="error" description="数据加载失败，请稍后重试">
  <Button variant="primary">重新加载</Button>
</Empty>`}
      >
        <Empty preset="error" description="数据加载失败，请稍后重试">
          <Button variant="primary">重新加载</Button>
        </Empty>
      </CodeBlock>

      <CodeBlock
        title="网络异常"
        description="网络异常时的空状态。"
        code={`<Empty preset="network" description="网络连接异常，请检查网络设置">
  <Button variant="primary">刷新页面</Button>
</Empty>`}
      >
        <Empty preset="network" description="网络连接异常，请检查网络设置">
          <Button variant="primary">刷新页面</Button>
        </Empty>
      </CodeBlock>

      <CodeBlock
        title="自定义图片"
        description="使用自定义图片或图标。"
        code={`<Empty 
  image={<span style={{ fontSize: 64 }}>🎉</span>}
  description="恭喜！任务已全部完成"
/>`}
      >
        <Empty 
          image={<span style={{ fontSize: 64 }}>🎉</span>}
          description="恭喜！任务已全部完成"
        />
      </CodeBlock>

      <CodeBlock
        title="无描述"
        description="隐藏描述文字。"
        code={`<Empty description={false} />`}
      >
        <Empty description={false} />
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>API</h2>
        <PropsTable data={emptyProps} />
      </div>
    </div>
  )
}

export default EmptyDocs
