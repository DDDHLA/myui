import React, { useState } from 'react'
import VirtualList from './VirtualList'
import { Card } from '../Card'
import { CodeBlock } from '../CodeBlock'
import { PropsTable, type PropItem } from '../PropsTable'
import './VirtualList.css'

const VirtualListDemo: React.FC = () => {
  // 生成10000条数据
  const data = Array.from({ length: 10000 }, (_, index) => ({
    id: index,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    role: index % 3 === 0 ? 'Admin' : index % 3 === 1 ? 'Editor' : 'User'
  }))

  const renderItem = (item: typeof data[0], index: number) => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      width: '100%', 
      padding: '0 16px',
      borderBottom: '1px solid var(--border-color)',
      height: '100%',
      backgroundColor: index % 2 === 0 ? 'var(--bg-secondary)' : 'transparent'
    }}>
      <div style={{ width: 60, fontWeight: 'bold' }}>#{item.id}</div>
      <div style={{ flex: 1, fontWeight: 500 }}>{item.name}</div>
      <div style={{ flex: 1.5, color: 'var(--text-secondary)' }}>{item.email}</div>
      <div style={{ width: 80 }}>
        <span style={{ 
          padding: '2px 8px', 
          borderRadius: '4px', 
          fontSize: '12px',
          backgroundColor: item.role === 'Admin' ? '#e6f7ff' : item.role === 'Editor' ? '#f6ffed' : '#fff7e6',
          color: item.role === 'Admin' ? '#1890ff' : item.role === 'Editor' ? '#52c41a' : '#fa8c16',
          border: '1px solid currentColor'
        }}>
          {item.role}
        </span>
      </div>
    </div>
  )

  return (
    <div className="virtual-list-demo">
      <CodeBlock
        title="基础用法"
        description="渲染10,000条数据，依然保持从容流畅。虚拟列表只渲染可视区域内的元素。"
        code={`import { VirtualList } from '@paidaxinghaha/my-ui-react'

// 生成大数据集
const data = Array.from({ length: 10000 }, (_, index) => ({
  id: index,
  name: \`User \${index + 1}\`,
  role: 'User'
}))

function App() {
  const renderItem = (item, index) => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      height: '100%',
      padding: '0 16px',
      borderBottom: '1px solid #eee'
    }}>
      <span style={{ width: 60 }}>#{item.id}</span>
      <span>{item.name}</span>
    </div>
  )

  return (
    <VirtualList
      height={400}      // 容器高度
      itemHeight={50}   // 每行高度
      data={data}       // 数据源
      renderItem={renderItem} // 渲染函数
    />
  )
}`}
      >
        <Card>
          <div style={{ padding: 24 }}>
            <VirtualList
              height={400}
              itemHeight={50}
              data={data}
              renderItem={renderItem}
            />
            <div style={{ marginTop: 16, textAlign: 'center', color: 'var(--text-secondary)' }}>
              共 {data.length.toLocaleString()} 条数据，当前仅渲染可视区域
            </div>
          </div>
        </Card>
      </CodeBlock>

      <CodeBlock
        title="无限滚动（懒加载）"
        description="结合 onEndReached 属性，实现滚动到底部自动加载更多数据。这才是处理海量数据的最佳实践：后端分页 + 前端虚拟渲染。"
        code={`import { VirtualList } from '@paidaxinghaha/my-ui-react'
import { useState } from 'react'

function App() {
  const [list, setList] = useState(Array.from({ length: 20 }, (_, i) => ({ id: i, name: \`Item \${i}\` })))
  const [loading, setLoading] = useState(false)

  const loadMore = () => {
    if (loading) return
    setLoading(true)
    
    // 模拟网络请求
    setTimeout(() => {
      const more = Array.from({ length: 20 }, (_, i) => ({
        id: list.length + i,
        name: \`Item \${list.length + i}\`
      }))
      setList(prev => [...prev, ...more])
      setLoading(false)
    }, 1000)
  }

  return (
    <VirtualList
      height={400}
      itemHeight={50}
      data={list}
      renderItem={(item) => (
        <div style={{ padding: '0 16px', lineHeight: '50px', borderBottom: '1px solid #eee' }}>
          {item.name}
        </div>
      )}
      onEndReached={loadMore}
    />
  )
}`}
      >
        <Card>
          <div style={{ padding: 24 }}>
            <InfiniteScrollExample />
          </div>
        </Card>
      </CodeBlock>

      <PropsTable
        title="VirtualList Props"
        data={[
          {
            name: 'data',
            type: 'T[]',
            description: '数据源数组',
            required: true,
          },
          {
            name: 'height',
            type: 'number | string',
            description: '列表容器高度',
            required: true,
          },
          {
            name: 'itemHeight',
            type: 'number',
            description: '每一项的固定高度（px）',
            required: true,
          },
          {
            name: 'renderItem',
            type: '(item: T, index: number) => ReactNode',
            description: '列表项渲染函数',
            required: true,
          },
          {
            name: 'onEndReached',
            type: '() => void',
            description: '滚动到底部时的回调函数，用于加载更多数据',
          },
          {
            name: 'threshold',
            type: 'number',
            default: '50',
            description: '触发 onEndReached 的距离阈值（px）',
          },
          {
            name: 'onScroll',
            type: '(e: UIEvent) => void',
            description: '滚动事件回调',
          },
          {
            name: 'className',
            type: 'string',
            description: '自定义类名',
          },
          {
            name: 'style',
            type: 'CSSProperties',
            description: '自定义样式',
          },
        ] as PropItem[]}
      />
    </div>
  )
}

// 提取一个内部组件来演示无限滚动，以便使用 hooks
const InfiniteScrollExample = () => {
  const [list, setList] = useState(
    Array.from({ length: 20 }, (_, i) => ({ id: i, name: `Item ${i}` }))
  )
  const [loading, setLoading] = useState(false)

  const loadMore = () => {
    if (loading) return
    setLoading(true)
    console.log('Fetching more data...')
    
    // 模拟 API 请求
    setTimeout(() => {
      const more = Array.from({ length: 20 }, (_, i) => ({
        id: list.length + i,
        name: `Item ${list.length + i}`
      }))
      setList(prev => [...prev, ...more])
      setLoading(false)
    }, 1000)
  }

  return (
    <div>
      <VirtualList
        height={300}
        itemHeight={50}
        data={list}
        onEndReached={loadMore}
        renderItem={(item, index) => (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            height: '100%', 
            padding: '0 16px',
            borderBottom: '1px solid var(--border-color)',
            backgroundColor: index % 2 === 0 ? 'var(--bg-secondary)' : 'transparent'
          }}>
            <span style={{ fontWeight: 'bold', marginRight: 16 }}>#{item.id}</span>
            <span>{item.name}</span>
          </div>
        )}
      />
      {loading && (
        <div style={{ textAlign: 'center', padding: 8, color: 'var(--primary-color)' }}>
          加载中...
        </div>
      )}
      <div style={{ marginTop: 8, textAlign: 'center', fontSize: 12, color: 'var(--text-secondary)' }}>
        当前已加载 {list.length} 条数据。滚动到底部试试！
      </div>
    </div>
  )
}

export default VirtualListDemo
