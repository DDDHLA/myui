import { Card, CardHeader, CardBody, CardFooter, CardImage } from './components/Card'
import { Button } from './components/Button'

function CardDemo() {
  return (
    <div style={{ padding: '40px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '40px' }}>Card 组件功能展示</h1>
      
      <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
        
        {/* 基础卡片 */}
        <Card variant="default" padding="md">
          <h3>基础卡片</h3>
          <p>这是一个基础的卡片组件，使用默认样式。</p>
        </Card>
        
        {/* 带标题和描述 */}
        <Card 
          variant="outlined" 
          cardTitle="功能丰富的卡片"
          subtitle="支持多种配置选项"
          description="这个卡片展示了标题、副标题和描述文本的组合使用"
          hoverable
        >
          <p>卡片主体内容区域，可以放置任何内容。</p>
        </Card>
        
        {/* 带图片的卡片 */}
        <Card 
          variant="elevated"
          image="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=200&fit=crop"
          imageAlt="编程"
          cardTitle="带图片的卡片"
          description="展示图片与内容的组合"
          shadow="lg"
          hoverable
        >
          <p>支持图片展示，可设置图片位置和高度。</p>
        </Card>
        
        {/* 带操作按钮的卡片 */}
        <Card 
          variant="default"
          cardTitle="交互式卡片"
          description="包含操作按钮，支持用户交互"
          actions={
            <>
              <Button size="sm" variant="ghost">取消</Button>
              <Button size="sm" variant="primary">确认</Button>
            </>
          }
        >
          <p>在卡片底部添加操作按钮，方便用户进行操作。</p>
        </Card>
        
        {/* 带标签和徽章 */}
        <Card
          variant="outlined"
          cardTitle="技术栈"
          subtitle="前端开发技术"
          tags={['React', 'TypeScript', 'Vite', 'CSS3']}
          badge={<span style={{ fontSize: '12px' }}>推荐</span>}
          hoverable
        >
          <p>展示标签和徽章，适合分类和标记。</p>
        </Card>
        
        {/* 可折叠卡片 */}
        <Card
          variant="default"
          cardTitle="可折叠内容"
          subtitle="点击右侧按钮展开/折叠"
          collapsible
          defaultCollapsed={false}
        >
          <p>这是可以展开和折叠的内容区域。</p>
          <p>适合展示详细信息或长内容。</p>
          <ul>
            <li>支持动画过渡</li>
            <li>保存折叠状态</li>
            <li>可控制初始状态</li>
          </ul>
        </Card>
        
        {/* 渐变背景卡片 */}
        <Card
          variant="gradient"
          cardTitle="渐变卡片"
          subtitle="视觉效果突出"
          description="使用渐变背景创造独特的视觉效果"
          hoverable
          shadow="xl"
        >
          <p>渐变背景让卡片更有层次感和视觉冲击力。</p>
        </Card>
        
        {/* 水平布局卡片 */}
        <Card
          variant="elevated"
          image="https://images.unsplash.com/photo-1517180102446-f3f6ece1c9d8?w=300&h=200&fit=crop"
          imagePosition="left"
          imageHeight={180}
          cardTitle="水平布局"
          description="图片在左侧的布局方式"
          style={{ gridColumn: 'span 2' }}
        >
          <p>水平布局适合展示带有预览图的内容，如文章列表、产品展示等。</p>
        </Card>
        
        {/* 加载状态 */}
        <Card
          variant="default"
          cardTitle="加载状态示例"
          loading
        >
          <p>内容正在加载中...</p>
        </Card>
        
        {/* 选中状态 */}
        <Card
          variant="outlined"
          cardTitle="可选择卡片"
          description="点击选中此卡片"
          selected
          clickable
          onClick={() => alert('卡片被点击了！')}
        >
          <p>支持选中状态，可用于多选场景。</p>
        </Card>
        
        {/* 禁用状态 */}
        <Card
          variant="default"
          cardTitle="禁用的卡片"
          description="此卡片已被禁用"
          disabled
          clickable
        >
          <p>禁用状态下不可交互。</p>
        </Card>
        
        {/* 使用子组件的复杂卡片 */}
        <div style={{ gridColumn: '1 / -1' }}>
          <Card variant="elevated" padding="none" shadow="xl" borderRadius="xl">
            <CardImage 
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=300&fit=crop" 
              height={250}
              cover
            />
            <CardHeader 
              title={<span style={{ fontSize: '24px' }}>使用子组件构建</span>}
              subtitle="更灵活的组合方式"
              badge={
                <span style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                  color: 'white', 
                  padding: '4px 12px', 
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  精选
                </span>
              }
            />
            <CardBody 
              description="通过 CardHeader、CardBody、CardFooter 和 CardImage 子组件，你可以更灵活地构建自定义布局的卡片。每个子组件都支持独立的样式和属性配置。"
              tags={['组件化', '模块化', '灵活配置', '自定义样式']}
            >
              <div style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
                <div>
                  <h4 style={{ margin: '0 0 8px 0' }}>特性亮点：</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    <li>完整的 TypeScript 类型支持</li>
                    <li>丰富的配置选项和变体</li>
                    <li>响应式设计，适配各种屏幕</li>
                    <li>支持主题定制</li>
                  </ul>
                </div>
              </div>
            </CardBody>
            <CardFooter 
              actions={
                <>
                  <Button size="sm" variant="ghost">查看文档</Button>
                  <Button size="sm" variant="primary">开始使用</Button>
                </>
              }
            >
              <span style={{ color: '#666', fontSize: '14px' }}>更新于 2024年</span>
            </CardFooter>
          </Card>
        </div>
        
        {/* 不同样式组合展示 */}
        <Card
          variant="filled"
          shadow="none"
          borderRadius="sm"
          bordered
          cardTitle="填充样式 + 小圆角"
        >
          <p>组合不同的样式属性。</p>
        </Card>
        
        <Card
          variant="default"
          shadow="xl"
          borderRadius="xl"
          cardTitle="超大阴影 + 大圆角"
          hoverable
        >
          <p>创造独特的视觉效果。</p>
        </Card>
        
        <Card
          variant="outlined"
          shadow="sm"
          borderRadius="md"
          cardTitle="轮廓样式 + 中等圆角"
          hoverable
        >
          <p>简洁清爽的设计风格。</p>
        </Card>
        
      </div>
    </div>
  )
}

export default CardDemo
