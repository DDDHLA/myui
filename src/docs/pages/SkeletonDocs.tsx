import { useState } from 'react'
import { Skeleton, SkeletonButton, SkeletonInput, SkeletonImage, Button } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const SkeletonDocs = () => {
  const [loading, setLoading] = useState(true)

  const skeletonProps: PropItem[] = [
    { name: 'active', type: 'boolean', default: 'true', description: '是否显示动画效果' },
    { name: 'loading', type: 'boolean', default: 'true', description: '是否加载中' },
    { name: 'rows', type: 'number', default: '3', description: '段落占位图行数' },
    { name: 'avatar', type: 'boolean | AvatarProps', default: 'false', description: '是否显示头像占位' },
    { name: 'title', type: 'boolean | TitleProps', default: 'true', description: '是否显示标题占位' },
    { name: 'paragraph', type: 'boolean | ParagraphProps', default: 'true', description: '是否显示段落占位' },
    { name: 'round', type: 'boolean', default: 'false', description: '是否圆角样式' }
  ]

  const buttonProps: PropItem[] = [
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '按钮尺寸' },
    { name: 'shape', type: "'default' | 'circle' | 'round'", default: "'default'", description: '按钮形状' },
    { name: 'active', type: 'boolean', default: 'true', description: '是否显示动画' },
    { name: 'block', type: 'boolean', default: 'false', description: '是否块级元素' }
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Skeleton 骨架屏</h1>
        <p style={docParagraphStyles.lead}>
          在需要等待加载内容的位置提供一个占位图形组合。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="最简单的占位效果。"
        code={`import { Skeleton } from '@paidaxinghaha/my-ui-react'

<Skeleton />`}
      >
        <Skeleton />
      </CodeBlock>

      <CodeBlock
        title="复杂组合"
        description="带头像的骨架屏。"
        code={`<Skeleton avatar />`}
      >
        <Skeleton avatar />
      </CodeBlock>

      <CodeBlock
        title="动画效果"
        description="显示动画效果，默认开启。"
        code={`<Skeleton active />
<Skeleton active={false} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px' }}>有动画（默认）</div>
            <Skeleton active />
          </div>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px' }}>无动画</div>
            <Skeleton active={false} />
          </div>
        </div>
      </CodeBlock>

      <CodeBlock
        title="自定义行数"
        description="通过 rows 属性设置段落行数。"
        code={`<Skeleton rows={2} />
<Skeleton rows={5} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Skeleton rows={2} />
          <Skeleton rows={5} />
        </div>
      </CodeBlock>

      <CodeBlock
        title="头像配置"
        description="自定义头像的大小和形状。"
        code={`<Skeleton avatar={{ size: 'lg', shape: 'circle' }} />
<Skeleton avatar={{ size: 48, shape: 'square' }} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Skeleton avatar={{ size: 'lg', shape: 'circle' }} />
          <Skeleton avatar={{ size: 48, shape: 'square' }} />
        </div>
      </CodeBlock>

      <CodeBlock
        title="圆角样式"
        description="使用圆角样式。"
        code={`<Skeleton round />`}
      >
        <Skeleton round />
      </CodeBlock>

      <CodeBlock
        title="按钮占位"
        description="按钮的骨架屏。"
        code={`import { SkeletonButton } from '@paidaxinghaha/my-ui-react'

<SkeletonButton size="sm" />
<SkeletonButton size="md" />
<SkeletonButton size="lg" />
<SkeletonButton shape="circle" />
<SkeletonButton shape="round" />`}
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <SkeletonButton size="sm" />
          <SkeletonButton size="md" />
          <SkeletonButton size="lg" />
          <SkeletonButton shape="circle" />
          <SkeletonButton shape="round" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="输入框占位"
        description="输入框的骨架屏。"
        code={`import { SkeletonInput } from '@paidaxinghaha/my-ui-react'

<SkeletonInput size="sm" />
<SkeletonInput size="md" />
<SkeletonInput size="lg" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
          <SkeletonInput size="sm" />
          <SkeletonInput size="md" />
          <SkeletonInput size="lg" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="图片占位"
        description="图片的骨架屏。"
        code={`import { SkeletonImage } from '@paidaxinghaha/my-ui-react'

<SkeletonImage />`}
      >
        <div style={{ maxWidth: '300px' }}>
          <SkeletonImage />
        </div>
      </CodeBlock>

      <CodeBlock
        title="包含子组件"
        description="加载完成后显示子组件内容。"
        code={`const [loading, setLoading] = useState(true)

<Button onClick={() => setLoading(!loading)}>
  切换加载状态
</Button>

<Skeleton loading={loading} avatar>
  <div>这里是加载完成后的内容</div>
</Skeleton>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Button onClick={() => setLoading(!loading)}>
            切换加载状态: {loading ? '加载中' : '已完成'}
          </Button>
          <Skeleton loading={loading} avatar>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}>
                U
              </div>
              <div>
                <h4 style={{ margin: '0 0 8px 0' }}>用户名称</h4>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                  这是一段用户的详细描述信息，可以包含很多内容。
                  Skeleton 组件在加载完成后会自动隐藏，显示真实内容。
                </p>
              </div>
            </div>
          </Skeleton>
        </div>
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>API</h2>
        
        <h3 style={{ ...docHeadingStyles.h3, marginTop: '24px' }}>Skeleton Props</h3>
        <PropsTable data={skeletonProps} />
        
        <h3 style={{ ...docHeadingStyles.h3, marginTop: '32px' }}>SkeletonButton Props</h3>
        <PropsTable data={buttonProps} />
      </div>
    </div>
  )
}

export default SkeletonDocs
