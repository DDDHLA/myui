import { Descriptions, Button } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const DescriptionsDocs = () => {
  const descriptionsProps: PropItem[] = [
    { name: 'title', type: 'ReactNode', description: '描述列表的标题' },
    { name: 'extra', type: 'ReactNode', description: '描述列表的操作区域' },
    { name: 'column', type: 'number', default: '3', description: '一行的列数' },
    { name: 'size', type: "'small' | 'middle' | 'large'", default: "'middle'", description: '设置列表的大小' },
    { name: 'layout', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: '描述布局' },
    { name: 'colon', type: 'boolean', default: 'true', description: '配置 label 后是否显示冒号' },
    { name: 'labelStyle', type: 'CSSProperties', description: '自定义标签样式' },
    { name: 'contentStyle', type: 'CSSProperties', description: '自定义内容样式' },
    { name: 'items', type: 'DescriptionItem[]', description: '描述列表项数据' }
  ]

  const itemProps: PropItem[] = [
    { name: 'label', type: 'ReactNode', description: '内容的描述' },
    { name: 'content', type: 'ReactNode', description: '内容' },
    { name: 'span', type: 'number', default: '1', description: '包含列的数量' },
    { name: 'labelStyle', type: 'CSSProperties', description: '自定义标签样式' },
    { name: 'contentStyle', type: 'CSSProperties', description: '自定义内容样式' }
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Descriptions 描述列表</h1>
        <p style={docParagraphStyles.lead}>
          成组展示多个只读字段，常用于详情页的信息展示。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="简单的描述列表展示。"
        code={`import { Descriptions } from '@myui/components'

<Descriptions
  title="用户信息"
  items={[
    { label: '姓名', content: '张三' },
    { label: '手机号', content: '138-0000-0000' },
    { label: '居住地', content: '浙江省杭州市西湖区' },
    { label: '备注', content: '无', span: 2 },
    { label: '地址', content: '浙江省杭州市西湖区某某街道某某号', span: 3 }
  ]}
/>`}
      >
        <Descriptions
          title="用户信息"
          items={[
            { label: '姓名', content: '张三' },
            { label: '手机号', content: '138-0000-0000' },
            { label: '居住地', content: '浙江省杭州市西湖区' },
            { label: '备注', content: '无', span: 2 },
            { label: '地址', content: '浙江省杭州市西湖区某某街道某某号', span: 3 }
          ]}
        />
      </CodeBlock>

      <CodeBlock
        title="尺寸"
        description="通过 size 属性设置列表大小。"
        code={`<Descriptions
  title="小尺寸"
  size="small"
  items={[
    { label: '姓名', content: '张三' },
    { label: '手机号', content: '138-0000-0000' },
    { label: '居住地', content: '浙江省杭州市西湖区' }
  ]}
/>

<Descriptions
  title="大尺寸"
  size="large"
  items={[
    { label: '姓名', content: '张三' },
    { label: '手机号', content: '138-0000-0000' },
    { label: '居住地', content: '浙江省杭州市西湖区' }
  ]}
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Descriptions
            title="小尺寸"
            size="small"
            items={[
              { label: '姓名', content: '张三' },
              { label: '手机号', content: '138-0000-0000' },
              { label: '居住地', content: '浙江省杭州市西湖区' }
            ]}
          />
          <Descriptions
            title="大尺寸"
            size="large"
            items={[
              { label: '姓名', content: '张三' },
              { label: '手机号', content: '138-0000-0000' },
              { label: '居住地', content: '浙江省杭州市西湖区' }
            ]}
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="垂直布局"
        description="使用 layout='vertical' 设置垂直布局。"
        code={`<Descriptions
  title="用户信息"
  layout="vertical"
  items={[
    { label: '姓名', content: '张三' },
    { label: '手机号', content: '138-0000-0000' },
    { label: '居住地', content: '浙江省杭州市西湖区' },
    { label: '备注', content: '这是一段很长的备注信息，用于测试垂直布局的效果。' },
    { label: '地址', content: '浙江省杭州市西湖区某某街道某某号' }
  ]}
/>`}
      >
        <Descriptions
          title="用户信息"
          layout="vertical"
          items={[
            { label: '姓名', content: '张三' },
            { label: '手机号', content: '138-0000-0000' },
            { label: '居住地', content: '浙江省杭州市西湖区' },
            { label: '备注', content: '这是一段很长的备注信息，用于测试垂直布局的效果。' },
            { label: '地址', content: '浙江省杭州市西湖区某某街道某某号' }
          ]}
        />
      </CodeBlock>

      <CodeBlock
        title="自定义列数"
        description="通过 column 属性自定义一行显示的列数。"
        code={`<Descriptions
  title="两列布局"
  column={2}
  items={[
    { label: '姓名', content: '张三' },
    { label: '手机号', content: '138-0000-0000' },
    { label: '居住地', content: '浙江省杭州市西湖区' },
    { label: '备注', content: '无' }
  ]}
/>

<Descriptions
  title="四列布局"
  column={4}
  items={[
    { label: '姓名', content: '张三' },
    { label: '性别', content: '男' },
    { label: '年龄', content: '28' },
    { label: '职业', content: '工程师' }
  ]}
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Descriptions
            title="两列布局"
            column={2}
            items={[
              { label: '姓名', content: '张三' },
              { label: '手机号', content: '138-0000-0000' },
              { label: '居住地', content: '浙江省杭州市西湖区' },
              { label: '备注', content: '无' }
            ]}
          />
          <Descriptions
            title="四列布局"
            column={4}
            items={[
              { label: '姓名', content: '张三' },
              { label: '性别', content: '男' },
              { label: '年龄', content: '28' },
              { label: '职业', content: '工程师' }
            ]}
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="带操作区域"
        description="使用 extra 属性添加操作区域。"
        code={`<Descriptions
  title="用户信息"
  extra={<Button size="sm">编辑</Button>}
  items={[
    { label: '姓名', content: '张三' },
    { label: '手机号', content: '138-0000-0000' },
    { label: '居住地', content: '浙江省杭州市西湖区' },
    { label: '备注', content: '无' },
    { label: '地址', content: '浙江省杭州市西湖区某某街道某某号', span: 2 }
  ]}
/>`}
      >
        <Descriptions
          title="用户信息"
          extra={<Button size="sm">编辑</Button>}
          items={[
            { label: '姓名', content: '张三' },
            { label: '手机号', content: '138-0000-0000' },
            { label: '居住地', content: '浙江省杭州市西湖区' },
            { label: '备注', content: '无' },
            { label: '地址', content: '浙江省杭州市西湖区某某街道某某号', span: 2 }
          ]}
        />
      </CodeBlock>

      <CodeBlock
        title="复杂内容"
        description="描述列表可以包含复杂的内容。"
        code={`<Descriptions
  title="订单详情"
  items={[
    { label: '订单号', content: '20231201123456' },
    { label: '状态', content: <span style={{ color: '#10b981' }}>已完成</span> },
    { label: '金额', content: <strong style={{ color: '#ef4444', fontSize: '18px' }}>¥ 1,234.56</strong> },
    { label: '创建时间', content: '2023-12-01 12:34:56' },
    { label: '完成时间', content: '2023-12-02 15:20:30' },
    { 
      label: '商品列表', 
      content: (
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>商品A × 2</li>
          <li>商品B × 1</li>
          <li>商品C × 3</li>
        </ul>
      ),
      span: 3
    }
  ]}
/>`}
      >
        <Descriptions
          title="订单详情"
          items={[
            { label: '订单号', content: '20231201123456' },
            { label: '状态', content: <span style={{ color: '#10b981' }}>✓ 已完成</span> },
            { label: '金额', content: <strong style={{ color: '#ef4444', fontSize: '18px' }}>¥ 1,234.56</strong> },
            { label: '创建时间', content: '2023-12-01 12:34:56' },
            { label: '完成时间', content: '2023-12-02 15:20:30' },
            { 
              label: '商品列表', 
              content: (
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  <li>商品A × 2</li>
                  <li>商品B × 1</li>
                  <li>商品C × 3</li>
                </ul>
              ),
              span: 3
            }
          ]}
        />
      </CodeBlock>

      <CodeBlock
        title="无冒号"
        description="使用 colon={false} 隐藏标签后的冒号。"
        code={`<Descriptions
  title="用户信息"
  colon={false}
  items={[
    { label: '姓名', content: '张三' },
    { label: '手机号', content: '138-0000-0000' },
    { label: '居住地', content: '浙江省杭州市西湖区' }
  ]}
/>`}
      >
        <Descriptions
          title="用户信息"
          colon={false}
          items={[
            { label: '姓名', content: '张三' },
            { label: '手机号', content: '138-0000-0000' },
            { label: '居住地', content: '浙江省杭州市西湖区' }
          ]}
        />
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>API</h2>
        
        <h3 style={{ ...docHeadingStyles.h3, marginTop: '24px' }}>Descriptions Props</h3>
        <PropsTable data={descriptionsProps} />
        
        <h3 style={{ ...docHeadingStyles.h3, marginTop: '32px' }}>DescriptionItem</h3>
        <PropsTable data={itemProps} />
      </div>
    </div>
  )
}

export default DescriptionsDocs
