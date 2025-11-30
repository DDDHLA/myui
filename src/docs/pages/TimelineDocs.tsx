import { Timeline, TimelineItem } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const TimelineDocs = () => {
  const timelineProps: PropItem[] = [
    { name: 'items', type: 'TimelineItemProps[]', description: '时间轴项数组' },
    { name: 'mode', type: "'left' | 'right' | 'alternate'", default: "'left'", description: '时间轴模式' },
    { name: 'reverse', type: 'boolean', default: 'false', description: '是否倒序' },
    { name: 'pending', type: 'ReactNode', description: '待处理项内容' },
    { name: 'pendingDot', type: 'ReactNode', description: '待处理项图标' }
  ]

  const itemProps: PropItem[] = [
    { name: 'color', type: "'primary' | 'success' | 'warning' | 'danger' | 'gray' | string", default: "'primary'", description: '节点颜色' },
    { name: 'dot', type: 'ReactNode', description: '自定义节点图标' },
    { name: 'label', type: 'ReactNode', description: '标签内容' },
    { name: 'children', type: 'ReactNode', description: '节点内容' },
    { name: 'pending', type: 'boolean', default: 'false', description: '是否为待处理状态' }
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Timeline 时间轴</h1>
        <p style={docParagraphStyles.lead}>
          垂直展示的时间流信息，适用于时间线、步骤流程等场景。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="简单的时间轴展示。"
        code={`import { Timeline, TimelineItem } from '@paidaxinghaha/my-ui-react'

<Timeline>
  <TimelineItem>创建服务现场 2015-09-01</TimelineItem>
  <TimelineItem>初步排除网络异常 2015-09-01</TimelineItem>
  <TimelineItem>技术测试异常 2015-09-01</TimelineItem>
  <TimelineItem>网络异常正在修复 2015-09-01</TimelineItem>
</Timeline>`}
      >
        <Timeline>
          <TimelineItem>创建服务现场 2015-09-01</TimelineItem>
          <TimelineItem>初步排除网络异常 2015-09-01</TimelineItem>
          <TimelineItem>技术测试异常 2015-09-01</TimelineItem>
          <TimelineItem>网络异常正在修复 2015-09-01</TimelineItem>
        </Timeline>
      </CodeBlock>

      <CodeBlock
        title="颜色"
        description="使用不同颜色区分节点状态。"
        code={`<Timeline>
  <TimelineItem color="success">已完成 - 成功</TimelineItem>
  <TimelineItem color="primary">进行中 - 处理</TimelineItem>
  <TimelineItem color="warning">待审核 - 警告</TimelineItem>
  <TimelineItem color="danger">已拒绝 - 危险</TimelineItem>
  <TimelineItem color="gray">已取消 - 灰色</TimelineItem>
  <TimelineItem color="#722ed1">自定义颜色</TimelineItem>
</Timeline>`}
      >
        <Timeline>
          <TimelineItem color="success">已完成 - 成功</TimelineItem>
          <TimelineItem color="primary">进行中 - 处理</TimelineItem>
          <TimelineItem color="warning">待审核 - 警告</TimelineItem>
          <TimelineItem color="danger">已拒绝 - 危险</TimelineItem>
          <TimelineItem color="gray">已取消 - 灰色</TimelineItem>
          <TimelineItem color="#722ed1">自定义颜色</TimelineItem>
        </Timeline>
      </CodeBlock>

      <CodeBlock
        title="待处理"
        description="当有事件正在进行时，可以使用 pending 属性。"
        code={`<Timeline pending="加载中...">
  <TimelineItem>创建服务现场 2015-09-01</TimelineItem>
  <TimelineItem>初步排除网络异常 2015-09-01</TimelineItem>
  <TimelineItem>技术测试异常 2015-09-01</TimelineItem>
</Timeline>`}
      >
        <Timeline pending="加载中...">
          <TimelineItem>创建服务现场 2015-09-01</TimelineItem>
          <TimelineItem>初步排除网络异常 2015-09-01</TimelineItem>
          <TimelineItem>技术测试异常 2015-09-01</TimelineItem>
        </Timeline>
      </CodeBlock>

      <CodeBlock
        title="自定义图标"
        description="使用自定义图标作为节点。"
        code={`<Timeline>
  <TimelineItem dot={<span>📝</span>}>创建订单</TimelineItem>
  <TimelineItem dot={<span>💳</span>}>完成支付</TimelineItem>
  <TimelineItem dot={<span>📦</span>}>商品发货</TimelineItem>
  <TimelineItem dot={<span>✅</span>}>确认收货</TimelineItem>
</Timeline>`}
      >
        <Timeline>
          <TimelineItem dot={<span style={{ fontSize: '16px' }}>📝</span>}>创建订单</TimelineItem>
          <TimelineItem dot={<span style={{ fontSize: '16px' }}>💳</span>}>完成支付</TimelineItem>
          <TimelineItem dot={<span style={{ fontSize: '16px' }}>📦</span>}>商品发货</TimelineItem>
          <TimelineItem dot={<span style={{ fontSize: '16px' }}>✅</span>}>确认收货</TimelineItem>
        </Timeline>
      </CodeBlock>

      <CodeBlock
        title="右侧模式"
        description="时间轴内容显示在右侧。"
        code={`<Timeline mode="right">
  <TimelineItem>2015-09-01 创建</TimelineItem>
  <TimelineItem>2015-09-02 审核</TimelineItem>
  <TimelineItem>2015-09-03 完成</TimelineItem>
</Timeline>`}
      >
        <Timeline mode="right">
          <TimelineItem>2015-09-01 创建</TimelineItem>
          <TimelineItem>2015-09-02 审核</TimelineItem>
          <TimelineItem>2015-09-03 完成</TimelineItem>
        </Timeline>
      </CodeBlock>

      <CodeBlock
        title="交替模式"
        description="内容在时间轴两侧交替出现。"
        code={`<Timeline mode="alternate">
  <TimelineItem>2015-09-01 创建服务</TimelineItem>
  <TimelineItem color="success">2015-09-02 通过审核</TimelineItem>
  <TimelineItem>2015-09-03 开始处理</TimelineItem>
  <TimelineItem color="danger">2015-09-04 遇到问题</TimelineItem>
  <TimelineItem color="success">2015-09-05 问题解决</TimelineItem>
</Timeline>`}
      >
        <Timeline mode="alternate">
          <TimelineItem>2015-09-01 创建服务</TimelineItem>
          <TimelineItem color="success">2015-09-02 通过审核</TimelineItem>
          <TimelineItem>2015-09-03 开始处理</TimelineItem>
          <TimelineItem color="danger">2015-09-04 遇到问题</TimelineItem>
          <TimelineItem color="success">2015-09-05 问题解决</TimelineItem>
        </Timeline>
      </CodeBlock>

      <CodeBlock
        title="带标签"
        description="使用 label 属性添加时间标签。"
        code={`<Timeline mode="left">
  <TimelineItem label="2015-09-01">创建服务现场</TimelineItem>
  <TimelineItem label="2015-09-02">排除网络异常</TimelineItem>
  <TimelineItem label="2015-09-03">完成修复</TimelineItem>
</Timeline>`}
      >
        <Timeline mode="left">
          <TimelineItem label="2015-09-01">创建服务现场</TimelineItem>
          <TimelineItem label="2015-09-02">排除网络异常</TimelineItem>
          <TimelineItem label="2015-09-03">完成修复</TimelineItem>
        </Timeline>
      </CodeBlock>

      <CodeBlock
        title="使用 items 属性"
        description="通过 items 属性配置时间轴。"
        code={`<Timeline 
  items={[
    { children: '创建服务 2015-09-01', color: 'success' },
    { children: '处理中 2015-09-02' },
    { children: '待审核 2015-09-03', color: 'warning' },
    { children: '完成 2015-09-04', color: 'success' }
  ]} 
/>`}
      >
        <Timeline 
          items={[
            { children: '创建服务 2015-09-01', color: 'success' },
            { children: '处理中 2015-09-02' },
            { children: '待审核 2015-09-03', color: 'warning' },
            { children: '完成 2015-09-04', color: 'success' }
          ]} 
        />
      </CodeBlock>

      <CodeBlock
        title="倒序"
        description="使用 reverse 属性倒序显示。"
        code={`<Timeline reverse>
  <TimelineItem>最早的事件</TimelineItem>
  <TimelineItem>中间的事件</TimelineItem>
  <TimelineItem>最新的事件</TimelineItem>
</Timeline>`}
      >
        <Timeline reverse>
          <TimelineItem>最早的事件</TimelineItem>
          <TimelineItem>中间的事件</TimelineItem>
          <TimelineItem>最新的事件</TimelineItem>
        </Timeline>
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>API</h2>
        
        <h3 style={{ ...docHeadingStyles.h3, marginTop: '24px' }}>Timeline Props</h3>
        <PropsTable data={timelineProps} />
        
        <h3 style={{ ...docHeadingStyles.h3, marginTop: '32px' }}>TimelineItem Props</h3>
        <PropsTable data={itemProps} />
      </div>
    </div>
  )
}

export default TimelineDocs
