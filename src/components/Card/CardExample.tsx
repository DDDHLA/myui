import Card from './Card'
import { CardHeader, CardBody, CardFooter, CardImage } from './'
import Button from '../Button/Button'

export const CardExample = () => {
  return (
    <div style={{ padding: '20px', display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
      
      {/* 基础卡片 */}
      <Card variant="default" padding="md">
        <h3>基础卡片</h3>
        <p>这是一个基础的卡片组件，包含默认的样式。</p>
      </Card>
      
      {/* 带标题和副标题 */}
      <Card 
        variant="outlined" 
        cardTitle="卡片标题"
        subtitle="这是副标题"
        description="卡片描述信息，用于提供更多上下文"
      >
        <p>卡片主体内容</p>
      </Card>
      
      {/* 带图片的卡片 */}
      <Card 
        variant="elevated"
        image="https://via.placeholder.com/400x200"
        imageAlt="示例图片"
        cardTitle="带图片的卡片"
        description="图片在顶部的卡片布局"
        hoverable
      >
        <p>内容区域</p>
      </Card>
      
      {/* 带操作按钮 */}
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
      
      {/* 带标签的卡片 */}
      <Card
        variant="outlined"
        cardTitle="产品特性"
        tags={['React', 'TypeScript', 'CSS']}
        badge={<span>新</span>}
      >
        <p>展示标签和徽章的卡片</p>
      </Card>
      
      {/* 可折叠卡片 */}
      <Card
        variant="default"
        cardTitle="可折叠内容"
        collapsible
        defaultCollapsed={false}
      >
        <p>这是可以展开和折叠的内容。</p>
        <p>点击右上角的按钮可以折叠此卡片。</p>
      </Card>
      
      {/* 水平布局（图片在左） */}
      <Card
        variant="elevated"
        image="https://via.placeholder.com/200x150"
        imagePosition="left"
        cardTitle="水平布局"
        description="图片在左侧的布局"
        style={{ gridColumn: 'span 2' }}
      >
        <p>这是一个水平布局的卡片，图片显示在左侧。</p>
      </Card>
      
      {/* 渐变背景卡片 */}
      <Card
        variant="gradient"
        cardTitle="渐变卡片"
        description="具有渐变背景的卡片"
        hoverable
      >
        <p>渐变背景让卡片更有视觉冲击力</p>
      </Card>
      
      {/* 加载状态 */}
      <Card
        variant="default"
        cardTitle="加载中..."
        loading
      >
        <p>内容正在加载</p>
      </Card>
      
      {/* 选中状态 */}
      <Card
        variant="outlined"
        cardTitle="选中状态"
        selected
        clickable
        onClick={() => console.log('Card clicked')}
      >
        <p>这个卡片处于选中状态</p>
      </Card>
      
      {/* 禁用状态 */}
      <Card
        variant="default"
        cardTitle="禁用卡片"
        disabled
        clickable
      >
        <p>这个卡片已被禁用</p>
      </Card>
      
      {/* 使用子组件组合 */}
      <div style={{ gridColumn: 'span 2' }}>
        <Card variant="elevated" padding="none">
          <CardImage 
            src="https://via.placeholder.com/600x200" 
            height={200}
            cover
          />
          <CardHeader 
            title="使用子组件"
            subtitle="更灵活的组合方式"
            badge={<span style={{ background: 'red', color: 'white', padding: '2px 8px', borderRadius: '4px' }}>热门</span>}
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
      </div>
      
      {/* 不同圆角和阴影 */}
      <Card
        variant="default"
        shadow="none"
        borderRadius="none"
        bordered
        cardTitle="无阴影方角"
      >
        <p>自定义圆角和阴影效果</p>
      </Card>
      
      <Card
        variant="default"
        shadow="xl"
        borderRadius="xl"
        cardTitle="大阴影大圆角"
        hoverable
      >
        <p>更柔和的视觉效果</p>
      </Card>
      
    </div>
  )
}

export default CardExample
