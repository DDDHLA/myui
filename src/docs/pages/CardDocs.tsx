import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, CardImage, Button } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const CardDocs = () => {
  const [collapsed, setCollapsed] = React.useState(false)

  const cardProps: PropItem[] = [
    {
      name: 'variant',
      type: "'default' | 'outlined' | 'elevated' | 'filled' | 'gradient'",
      default: "'default'",
      description: '卡片的样式变体'
    },
    {
      name: 'padding',
      type: "'sm' | 'md' | 'lg' | 'none'",
      default: "'md'",
      description: '卡片内容的内边距大小'
    },
    {
      name: 'shadow',
      type: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
      default: "'md'",
      description: '卡片的阴影大小'
    },
    {
      name: 'borderRadius',
      type: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
      default: "'lg'",
      description: '卡片的圆角大小'
    },
    {
      name: 'hoverable',
      type: 'boolean',
      default: 'false',
      description: '鼠标悬停时是否显示悬浮效果'
    },
    {
      name: 'clickable',
      type: 'boolean',
      default: 'false',
      description: '是否可点击（会显示指针光标）'
    },
    {
      name: 'onClick',
      type: '() => void',
      description: '点击事件处理函数'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: '是否禁用卡片'
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: '是否显示加载状态'
    },
    {
      name: 'selected',
      type: 'boolean',
      default: 'false',
      description: '是否选中状态'
    },
    {
      name: 'bordered',
      type: 'boolean',
      default: 'false',
      description: '是否显示边框'
    },
    {
      name: 'cardTitle',
      type: 'ReactNode',
      description: '卡片标题'
    },
    {
      name: 'subtitle',
      type: 'ReactNode',
      description: '卡片副标题'
    },
    {
      name: 'description',
      type: 'ReactNode',
      description: '卡片描述文本'
    },
    {
      name: 'badge',
      type: 'ReactNode',
      description: '徽章内容'
    },
    {
      name: 'tags',
      type: 'string[]',
      description: '标签列表'
    },
    {
      name: 'image',
      type: 'string',
      description: '图片URL'
    },
    {
      name: 'imageAlt',
      type: 'string',
      description: '图片alt属性'
    },
    {
      name: 'imagePosition',
      type: "'top' | 'bottom' | 'left' | 'right'",
      default: "'top'",
      description: '图片位置'
    },
    {
      name: 'imageHeight',
      type: 'string | number',
      default: '200',
      description: '图片高度'
    },
    {
      name: 'cover',
      type: 'boolean',
      default: 'false',
      description: '图片是否覆盖模式'
    },
    {
      name: 'header',
      type: 'ReactNode',
      description: '自定义头部内容'
    },
    {
      name: 'footer',
      type: 'ReactNode',
      description: '自定义底部内容'
    },
    {
      name: 'actions',
      type: 'ReactNode',
      description: '操作区域内容'
    },
    {
      name: 'collapsible',
      type: 'boolean',
      default: 'false',
      description: '是否可折叠'
    },
    {
      name: 'defaultCollapsed',
      type: 'boolean',
      default: 'false',
      description: '默认是否折叠'
    },
    {
      name: 'onCollapseChange',
      type: '(collapsed: boolean) => void',
      description: '折叠状态改变时的回调'
    }
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Card 卡片</h1>
        <p style={docParagraphStyles.lead}>
          卡片是一个容器组件，用于显示相关信息的集合。支持多种样式、布局和交互方式。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="最简单的卡片用法，展示基本内容。"
        code={`import { Card } from '@myui/components'

function App() {
  return (
    <Card variant="default" padding="md">
      <h3>卡片标题</h3>
      <p>这是卡片的内容区域，可以放置任何内容。</p>
    </Card>
  )
}`}
      >
        <Card variant="default" padding="md">
          <h3 style={{ margin: '0 0 8px 0' }}>卡片标题</h3>
          <p style={{ margin: 0 }}>这是卡片的内容区域，可以放置任何内容。</p>
        </Card>
      </CodeBlock>

      <CodeBlock
        title="不同变体"
        description="Card 组件支持多种视觉样式变体。"
        code={`import { Card } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(2, 1fr)' }}>
      <Card variant="default">
        <h4>Default 默认</h4>
        <p>默认样式的卡片</p>
      </Card>
      
      <Card variant="outlined">
        <h4>Outlined 轮廓</h4>
        <p>带边框的卡片</p>
      </Card>
      
      <Card variant="elevated">
        <h4>Elevated 提升</h4>
        <p>带阴影的卡片</p>
      </Card>
      
      <Card variant="filled">
        <h4>Filled 填充</h4>
        <p>填充背景的卡片</p>
      </Card>
      
      <Card variant="gradient" style={{ gridColumn: 'span 2' }}>
        <h4>Gradient 渐变</h4>
        <p>渐变背景的卡片</p>
      </Card>
    </div>
  )
}`}
      >
        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <Card variant="default">
            <h4 style={{ margin: '0 0 8px 0' }}>Default 默认</h4>
            <p style={{ margin: 0 }}>默认样式的卡片</p>
          </Card>
          
          <Card variant="outlined">
            <h4 style={{ margin: '0 0 8px 0' }}>Outlined 轮廓</h4>
            <p style={{ margin: 0 }}>带边框的卡片</p>
          </Card>
          
          <Card variant="elevated">
            <h4 style={{ margin: '0 0 8px 0' }}>Elevated 提升</h4>
            <p style={{ margin: 0 }}>带阴影的卡片</p>
          </Card>
          
          <Card variant="filled">
            <h4 style={{ margin: '0 0 8px 0' }}>Filled 填充</h4>
            <p style={{ margin: 0 }}>填充背景的卡片</p>
          </Card>
          
          <Card variant="gradient" style={{ gridColumn: 'span 2' }}>
            <h4 style={{ margin: '0 0 8px 0' }}>Gradient 渐变</h4>
            <p style={{ margin: 0 }}>渐变背景的卡片</p>
          </Card>
        </div>
      </CodeBlock>

      <CodeBlock
        title="带标题和描述"
        description="使用 cardTitle、subtitle 和 description 属性快速创建结构化内容。"
        code={`import { Card } from '@myui/components'

function App() {
  return (
    <Card 
      variant="outlined"
      cardTitle="功能丰富的卡片"
      subtitle="支持多种配置选项"
      description="这个卡片展示了标题、副标题和描述文本的组合使用。"
      hoverable
    >
      <p>卡片主体内容区域</p>
    </Card>
  )
}`}
      >
        <Card 
          variant="outlined"
          cardTitle="功能丰富的卡片"
          subtitle="支持多种配置选项"
          description="这个卡片展示了标题、副标题和描述文本的组合使用。"
          hoverable
        >
          <p style={{ margin: 0 }}>卡片主体内容区域</p>
        </Card>
      </CodeBlock>

      <CodeBlock
        title="带图片的卡片"
        description="支持在卡片中显示图片，可以设置图片位置和高度。"
        code={`import { Card } from '@myui/components'

function App() {
  return (
    <Card 
      variant="elevated"
      image="https://via.placeholder.com/400x200"
      imageAlt="示例图片"
      cardTitle="带图片的卡片"
      description="图片在顶部的卡片布局"
      hoverable
    >
      <p>卡片内容区域</p>
    </Card>
  )
}`}
      >
        <Card 
          variant="elevated"
          image="https://via.placeholder.com/400x200"
          imageAlt="示例图片"
          cardTitle="带图片的卡片"
          description="图片在顶部的卡片布局"
          hoverable
        >
          <p style={{ margin: 0 }}>卡片内容区域</p>
        </Card>
      </CodeBlock>

      <CodeBlock
        title="带操作按钮"
        description="使用 actions 属性在卡片底部添加操作按钮。"
        code={`import { Card, Button } from '@myui/components'

function App() {
  return (
    <Card 
      variant="default"
      cardTitle="操作卡片"
      description="带有操作按钮的卡片"
      actions={
        <>
          <Button size="sm" variant="ghost">取消</Button>
          <Button size="sm" variant="primary">确认</Button>
        </>
      }
    >
      <p>需要用户操作的内容</p>
    </Card>
  )
}`}
      >
        <Card 
          variant="default"
          cardTitle="操作卡片"
          description="带有操作按钮的卡片"
          actions={
            <>
              <Button size="sm" variant="ghost">取消</Button>
              <Button size="sm" variant="primary">确认</Button>
            </>
          }
        >
          <p style={{ margin: 0 }}>需要用户操作的内容</p>
        </Card>
      </CodeBlock>

      <CodeBlock
        title="带标签和徽章"
        description="使用 tags 和 badge 属性添加标签和徽章。"
        code={`import { Card } from '@myui/components'

function App() {
  return (
    <Card
      variant="outlined"
      cardTitle="技术栈"
      subtitle="前端开发技术"
      tags={['React', 'TypeScript', 'Vite', 'CSS3']}
      badge={<span>推荐</span>}
      hoverable
    >
      <p>展示标签和徽章，适合分类和标记。</p>
    </Card>
  )
}`}
      >
        <Card
          variant="outlined"
          cardTitle="技术栈"
          subtitle="前端开发技术"
          tags={['React', 'TypeScript', 'Vite', 'CSS3']}
          badge={<span>推荐</span>}
          hoverable
        >
          <p style={{ margin: 0 }}>展示标签和徽章，适合分类和标记。</p>
        </Card>
      </CodeBlock>

      <CodeBlock
        title="可折叠卡片"
        description="使用 collapsible 属性创建可折叠的卡片。"
        code={`import { Card } from '@myui/components'

function App() {
  const [collapsed, setCollapsed] = useState(false)
  
  return (
    <Card
      variant="default"
      cardTitle="可折叠内容"
      subtitle="点击右侧按钮展开/折叠"
      collapsible
      defaultCollapsed={collapsed}
      onCollapseChange={setCollapsed}
    >
      <p>这是可以展开和折叠的内容区域。</p>
      <p>适合展示详细信息或长内容。</p>
    </Card>
  )
}`}
      >
        <Card
          variant="default"
          cardTitle="可折叠内容"
          subtitle="点击右侧按钮展开/折叠"
          collapsible
          defaultCollapsed={collapsed}
          onCollapseChange={setCollapsed}
        >
          <p style={{ margin: '0 0 8px 0' }}>这是可以展开和折叠的内容区域。</p>
          <p style={{ margin: 0 }}>适合展示详细信息或长内容。</p>
        </Card>
      </CodeBlock>

      <CodeBlock
        title="不同状态"
        description="Card 组件支持多种交互状态。"
        code={`import { Card } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <Card 
        variant="outlined"
        cardTitle="可点击卡片"
        clickable
        onClick={() => alert('卡片被点击')}
      >
        <p>点击我试试</p>
      </Card>
      
      <Card 
        variant="outlined"
        cardTitle="选中状态"
        selected
      >
        <p>这个卡片处于选中状态</p>
      </Card>
      
      <Card 
        variant="outlined"
        cardTitle="加载状态"
        loading
      >
        <p>内容正在加载</p>
      </Card>
      
      <Card 
        variant="outlined"
        cardTitle="禁用状态"
        disabled
      >
        <p>这个卡片已被禁用</p>
      </Card>
    </div>
  )
}`}
      >
        <div style={{ display: 'grid', gap: '16px' }}>
          <Card 
            variant="outlined"
            cardTitle="可点击卡片"
            clickable
            onClick={() => alert('卡片被点击')}
          >
            <p style={{ margin: 0 }}>点击我试试</p>
          </Card>
          
          <Card 
            variant="outlined"
            cardTitle="选中状态"
            selected
          >
            <p style={{ margin: 0 }}>这个卡片处于选中状态</p>
          </Card>
          
          <Card 
            variant="outlined"
            cardTitle="加载状态"
            loading
          >
            <p style={{ margin: 0 }}>内容正在加载</p>
          </Card>
          
          <Card 
            variant="outlined"
            cardTitle="禁用状态"
            disabled
          >
            <p style={{ margin: 0 }}>这个卡片已被禁用</p>
          </Card>
        </div>
      </CodeBlock>

      <CodeBlock
        title="使用子组件"
        description="使用 CardHeader、CardBody、CardFooter、CardImage 子组件构建更灵活的布局。"
        code={`import { Card, CardHeader, CardBody, CardFooter, CardImage, Button } from '@myui/components'

function App() {
  return (
    <Card variant="elevated" padding="none">
      <CardImage 
        src="https://via.placeholder.com/400x200" 
        height={200}
        cover
      />
      <CardHeader 
        title="使用子组件"
        subtitle="更灵活的组合方式"
        badge={<span>精选</span>}
      />
      <CardBody 
        description="通过子组件可以更灵活地组合卡片内容"
        tags={['组合', '灵活', '模块化']}
      >
        <p>CardBody 中的内容</p>
      </CardBody>
      <CardFooter 
        actions={
          <>
            <Button size="sm" variant="link">了解更多</Button>
            <Button size="sm" variant="primary">立即开始</Button>
          </>
        }
      >
        <span style={{ color: '#666', fontSize: '14px' }}>2024-01-01</span>
      </CardFooter>
    </Card>
  )
}`}
      >
        <Card variant="elevated" padding="none">
          <CardImage 
            src="https://via.placeholder.com/400x200" 
            height={200}
            cover
          />
          <CardHeader 
            title="使用子组件"
            subtitle="更灵活的组合方式"
            badge={<span>精选</span>}
          />
          <CardBody 
            description="通过子组件可以更灵活地组合卡片内容"
            tags={['组合', '灵活', '模块化']}
          >
            <p style={{ margin: 0 }}>CardBody 中的内容</p>
          </CardBody>
          <CardFooter 
            actions={
              <>
                <Button size="sm" variant="link">了解更多</Button>
                <Button size="sm" variant="primary">立即开始</Button>
              </>
            }
          >
            <span style={{ color: '#666', fontSize: '14px' }}>2024-01-01</span>
          </CardFooter>
        </Card>
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>API</h2>
        
        <h3 style={docHeadingStyles.h3}>Card Props</h3>
        <PropsTable data={cardProps} />
        
        <h3 style={{ ...docHeadingStyles.h3, marginTop: '32px' }}>Card 子组件</h3>
        <p style={docParagraphStyles.normal}>
          Card 组件采用组合式设计，提供了以下子组件用于构建更灵活、更模块化的卡片布局。每个子组件都可以独立使用，也可以组合使用。
        </p>
        
        <div style={{ marginTop: '24px' }}>
          <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '8px', color: 'var(--text-primary)' }}>
            CardHeader
          </h4>
          <p style={{ ...docParagraphStyles.normal, marginBottom: '8px' }}>
            卡片头部组件，用于展示卡片的标题和元信息。
          </p>
          <ul style={{ ...docParagraphStyles.normal, paddingLeft: '24px', marginBottom: '16px' }}>
            <li><code>title</code> - 主标题内容</li>
            <li><code>subtitle</code> - 副标题内容</li>
            <li><code>badge</code> - 徽章/标签，通常用于状态标识</li>
            <li><code>extra</code> - 额外内容，显示在头部右侧</li>
          </ul>
          
          <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '8px', color: 'var(--text-primary)' }}>
            CardBody
          </h4>
          <p style={{ ...docParagraphStyles.normal, marginBottom: '8px' }}>
            卡片主体组件，用于放置卡片的主要内容。
          </p>
          <ul style={{ ...docParagraphStyles.normal, paddingLeft: '24px', marginBottom: '16px' }}>
            <li><code>description</code> - 描述文本，显示在内容区域上方</li>
            <li><code>tags</code> - 标签列表，数组格式</li>
            <li><code>children</code> - 主要内容区域</li>
          </ul>
          
          <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '8px', color: 'var(--text-primary)' }}>
            CardFooter
          </h4>
          <p style={{ ...docParagraphStyles.normal, marginBottom: '8px' }}>
            卡片底部组件，通常用于放置操作按钮或附加信息。
          </p>
          <ul style={{ ...docParagraphStyles.normal, paddingLeft: '24px', marginBottom: '16px' }}>
            <li><code>actions</code> - 操作按钮区域，自动对齐到右侧</li>
            <li><code>align</code> - 内容对齐方式：'left' | 'center' | 'right' | 'space-between'</li>
            <li><code>children</code> - 其他底部内容</li>
          </ul>
          
          <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '8px', color: 'var(--text-primary)' }}>
            CardImage
          </h4>
          <p style={{ ...docParagraphStyles.normal, marginBottom: '8px' }}>
            卡片图片组件，用于展示图片内容，支持多种布局方式。
          </p>
          <ul style={{ ...docParagraphStyles.normal, paddingLeft: '24px', marginBottom: '16px' }}>
            <li><code>src</code> - 图片URL地址</li>
            <li><code>alt</code> - 图片替代文本</li>
            <li><code>height</code> - 图片高度，支持数字或字符串</li>
            <li><code>cover</code> - 是否使用覆盖模式（object-fit: cover）</li>
            <li><code>position</code> - 图片位置：'top' | 'bottom' | 'left' | 'right'</li>
            <li><code>fallback</code> - 图片加载失败时显示的备用内容</li>
          </ul>
        </div>
        
        <div style={{ 
          marginTop: '24px', 
          padding: '16px', 
          backgroundColor: 'var(--bg-secondary, #f3f4f6)', 
          borderRadius: '8px',
          borderLeft: '4px solid var(--color-primary, #3b82f6)'
        }}>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <strong>💡 提示：</strong>子组件提供了更细粒度的控制，适合需要自定义布局的场景。如果只是简单使用，推荐直接使用 Card 组件的属性。
          </p>
        </div>
      </div>
    </div>
  )
}

export default CardDocs
