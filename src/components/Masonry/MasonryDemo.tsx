import React, { useState } from 'react'
import Masonry from '../Masonry'
import { Card } from '../Card'
import { Button } from '../Button'
import { CodeBlock } from '../CodeBlock'
import { PropsTable } from '../PropsTable'
import type { PropItem } from '../PropsTable'
import './MasonryDemo.css'

const MasonryDemo: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, height: 200, title: '瀑布流项目 1', color: '#667eea' },
    { id: 2, height: 300, title: '瀑布流项目 2', color: '#764ba2' },
    { id: 3, height: 250, title: '瀑布流项目 3', color: '#f093fb' },
    { id: 4, height: 180, title: '瀑布流项目 4', color: '#4facfe' },
    { id: 5, height: 320, title: '瀑布流项目 5', color: '#00f2fe' },
    { id: 6, height: 220, title: '瀑布流项目 6', color: '#43e97b' },
    { id: 7, height: 280, title: '瀑布流项目 7', color: '#38f9d7' },
    { id: 8, height: 190, title: '瀑布流项目 8', color: '#fa709a' },
    { id: 9, height: 260, title: '瀑布流项目 9', color: '#fee140' },
  ])

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      height: Math.floor(Math.random() * 200) + 150,
      title: `瀑布流项目 ${items.length + 1}`,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    }
    setItems([...items, newItem])
  }

  return (
    <div className="masonry-demo">
      <CodeBlock
        title="基础用法"
        description="瀑布流布局自动将不同高度的项目分配到多列中"
        code={`import { Masonry, Button } from '@paidaxinghaha/my-ui-react'
import { useState } from 'react'
import './MasonryDemo.css'

function App() {
  const [items, setItems] = useState([
    { id: 1, height: 200, title: '瀑布流项目 1', color: '#667eea' },
    { id: 2, height: 300, title: '瀑布流项目 2', color: '#764ba2' },
    { id: 3, height: 250, title: '瀑布流项目 3', color: '#f093fb' },
    { id: 4, height: 180, title: '瀑布流项目 4', color: '#4facfe' },
    { id: 5, height: 320, title: '瀑布流项目 5', color: '#00f2fe' },
    { id: 6, height: 220, title: '瀑布流项目 6', color: '#43e97b' },
  ])

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      height: Math.floor(Math.random() * 200) + 150,
      title: \`瀑布流项目 \${items.length + 1}\`,
      color: \`hsl(\${Math.random() * 360}, 70%, 60%)\`,
    }
    setItems([...items, newItem])
  }

  return (
    <div>
      <Button onClick={addItem} style={{ marginBottom: '16px' }}>
        添加项目
      </Button>
      
      <Masonry columns={3} gap={16}>
        {items.map((item) => (
          <div
            key={item.id}
            className="masonry-demo__item"
            style={{
              height: \`\${item.height}px\`,
              background: \`linear-gradient(135deg, \${item.color} 0%, \${item.color}dd 100%)\`,
            }}
          >
            <div className="masonry-demo__item-content">
              <h4>{item.title}</h4>
              <p>高度: {item.height}px</p>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  )
}

/* MasonryDemo.css */
.masonry-demo__item {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.masonry-demo__item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.masonry-demo__item-content {
  padding: 20px;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.masonry-demo__item-content h4 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
}

.masonry-demo__item-content p {
  margin: 0;
  opacity: 0.9;
  font-size: 14px;
}`}
      >
        <div style={{ marginBottom: '16px' }}>
          <Button onClick={addItem}>添加项目</Button>
        </div>
        <Masonry columns={3} gap={16}>
          {items.map((item) => (
            <div
              key={item.id}
              className="masonry-demo__item"
              style={{
                height: `${item.height}px`,
                background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
              }}
            >
              <div className="masonry-demo__item-content">
                <h4>{item.title}</h4>
                <p>高度: {item.height}px</p>
              </div>
            </div>
          ))}
        </Masonry>
      </CodeBlock>

      <CodeBlock
        title="响应式布局"
        description="通过responsive属性配置不同屏幕宽度下的列数"
        code={`import { Masonry, Card } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Masonry
      columns={4}
      gap={20}
      responsive={{
        1200: 4,  // 宽度 >= 1200px 时显示 4 列
        992: 3,   // 宽度 >= 992px 时显示 3 列
        768: 2,   // 宽度 >= 768px 时显示 2 列
        576: 1,   // 宽度 >= 576px 时显示 1 列
      }}
    >
      {items.map((item) => (
        <Card key={item.id} hoverable>
          <div style={{ height: item.height, padding: '20px' }}>
            {item.title}
          </div>
        </Card>
      ))}
    </Masonry>
  )
}`}
      >
        <Masonry
          columns={4}
          gap={20}
          responsive={{
            1200: 4,
            992: 3,
            768: 2,
            576: 1,
          }}
        >
          {items.slice(0, 6).map((item) => (
            <Card key={item.id} hoverable>
              <div
                style={{
                  height: `${item.height}px`,
                  background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  borderRadius: '8px',
                  padding: '20px',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ margin: 0, marginBottom: '8px' }}>{item.title}</h4>
                  <p style={{ margin: 0, opacity: 0.9 }}>自适应列数</p>
                </div>
              </div>
            </Card>
          ))}
        </Masonry>
      </CodeBlock>

      <CodeBlock
        title="不同列数"
        description="可以通过columns属性自定义列数"
        code={`import { Masonry } from '@paidaxinghaha/my-ui-react'
import './MasonryDemo.css'

function App() {
  const items = [
    { id: 1, height: 200, color: '#667eea' },
    { id: 2, height: 300, color: '#764ba2' },
    { id: 3, height: 250, color: '#f093fb' },
    { id: 4, height: 180, color: '#4facfe' },
    { id: 5, height: 320, color: '#00f2fe' },
    // ... 更多项目
  ]

  return (
    <Masonry columns={5} gap={12}>
      {items.map((item) => (
        <div
          key={item.id}
          className="masonry-demo__item masonry-demo__item--small"
          style={{
            height: \`\${item.height * 0.6}px\`,
            background: item.color,
          }}
        >
          <span>{item.id}</span>
        </div>
      ))}
    </Masonry>
  )
}

/* MasonryDemo.css */
.masonry-demo__item {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.masonry-demo__item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.masonry-demo__item--small {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
}`}
      >
        <Masonry columns={5} gap={12}>
          {items.slice(0, 10).map((item) => (
            <div
              key={item.id}
              className="masonry-demo__item masonry-demo__item--small"
              style={{
                height: `${item.height * 0.6}px`,
                background: item.color,
              }}
            >
              <span>{item.id}</span>
            </div>
          ))}
        </Masonry>
      </CodeBlock>

      <PropsTable
        title="Masonry Props"
        data={[
          {
            name: 'children',
            type: 'ReactNode',
            description: '要展示的子元素内容',
            required: true,
          },
          {
            name: 'columns',
            type: 'number',
            default: '3',
            description: '列数',
          },
          {
            name: 'gap',
            type: 'number',
            default: '16',
            description: '项目之间的间距（单位：px）',
          },
          {
            name: 'responsive',
            type: '{ [breakpoint: number]: number }',
            description: '响应式配置，键为断点宽度（px），值为对应的列数。例如：{ 1200: 4, 768: 2 }',
          },
          {
            name: 'className',
            type: 'string',
            description: '自定义类名',
          },
        ] as PropItem[]}
      />
    </div>
  )
}

export default MasonryDemo
