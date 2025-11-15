import { useState } from 'react'
import { Table, Button } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import type { TableColumn } from '@/types'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const TableDocs = () => {
  // 示例数据
  interface User extends Record<string, unknown> {
    id: number
    name: string
    age: number
    email: string
    status: 'active' | 'inactive'
    role: string
  }

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

  const sampleData: User[] = [
    { id: 1, name: '张三', age: 28, email: 'zhangsan@example.com', status: 'active', role: '管理员' },
    { id: 2, name: '李四', age: 32, email: 'lisi@example.com', status: 'active', role: '开发者' },
    { id: 3, name: '王五', age: 25, email: 'wangwu@example.com', status: 'inactive', role: '设计师' },
    { id: 4, name: '赵六', age: 30, email: 'zhaoliu@example.com', status: 'active', role: '测试' },
    { id: 5, name: '钱七', age: 27, email: 'qianqi@example.com', status: 'active', role: '产品' },
  ]

  const basicColumns: TableColumn<User>[] = [
    {
      key: 'name',
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      key: 'age',
      title: '年龄',
      dataIndex: 'age',
      width: 100,
      align: 'center',
    },
    {
      key: 'email',
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      key: 'role',
      title: '角色',
      dataIndex: 'role',
      width: 120,
    },
  ]

  const advancedColumns: TableColumn<User>[] = [
    {
      key: 'name',
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      key: 'age',
      title: '年龄',
      dataIndex: 'age',
      width: 100,
      align: 'center',
      sortable: true,
    },
    {
      key: 'email',
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      width: 100,
      align: 'center',
      render: (value: unknown) => {
        const status = value as 'active' | 'inactive'
        return (
          <span style={{
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '500',
            backgroundColor: status === 'active' ? '#dcfce7' : '#fee2e2',
            color: status === 'active' ? '#166534' : '#991b1b',
          }}>
            {status === 'active' ? '活跃' : '停用'}
          </span>
        )
      },
    },
    {
      key: 'action',
      title: '操作',
      width: 200,
      align: 'center',
      render: () => (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <Button size="sm" variant="link">编辑</Button>
          <Button size="sm" variant="link" style={{ color: '#dc2626' }}>删除</Button>
        </div>
      ),
    },
  ]

  const tableProps: PropItem[] = [
    {
      name: 'columns',
      type: 'TableColumn[]',
      description: '表格列的配置',
      required: true
    },
    {
      name: 'dataSource',
      type: 'T[]',
      description: '数据数组',
      required: true
    },
    {
      name: 'rowKey',
      type: 'string | (record: T) => string',
      default: "'id'",
      description: '表格行的唯一标识符'
    },
    {
      name: 'bordered',
      type: 'boolean',
      default: 'false',
      description: '是否显示边框'
    },
    {
      name: 'striped',
      type: 'boolean',
      default: 'false',
      description: '是否显示斑马纹'
    },
    {
      name: 'hoverable',
      type: 'boolean',
      default: 'true',
      description: '鼠标悬停时是否高亮'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: '表格尺寸'
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: '是否显示加载状态'
    },
    {
      name: 'empty',
      type: 'ReactNode',
      description: '空状态时显示的内容'
    },
    {
      name: 'pagination',
      type: 'boolean | PaginationConfig',
      default: 'false',
      description: '分页配置'
    },
    {
      name: 'rowSelection',
      type: 'RowSelectionConfig',
      description: '行选择配置'
    },
    {
      name: 'onSort',
      type: '(column: string, order: SortOrder) => void',
      description: '排序回调函数'
    },
    {
      name: 'scroll',
      type: '{ x?: string | number, y?: string | number }',
      description: '滚动配置'
    },
  ]

  const columnProps: PropItem[] = [
    {
      name: 'key',
      type: 'string',
      description: '列的唯一标识',
      required: true
    },
    {
      name: 'title',
      type: 'ReactNode',
      description: '列标题',
      required: true
    },
    {
      name: 'dataIndex',
      type: 'string',
      description: '数据字段名'
    },
    {
      name: 'width',
      type: 'string | number',
      description: '列宽度'
    },
    {
      name: 'align',
      type: "'left' | 'center' | 'right'",
      default: "'left'",
      description: '对齐方式'
    },
    {
      name: 'sortable',
      type: 'boolean',
      default: 'false',
      description: '是否可排序'
    },
    {
      name: 'render',
      type: '(value, record, index) => ReactNode',
      description: '自定义渲染函数'
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Table 表格</h1>
        <p style={docParagraphStyles.lead}>
          表格组件用于展示结构化的数据，支持排序、筛选、分页等功能。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="最简单的表格用法，展示基本数据。"
        code={`import { Table } from '@myui/components'

const columns = [
  { key: 'name', title: '姓名', dataIndex: 'name', width: 120 },
  { key: 'age', title: '年龄', dataIndex: 'age', width: 100, align: 'center' },
  { key: 'email', title: '邮箱', dataIndex: 'email' },
  { key: 'role', title: '角色', dataIndex: 'role', width: 120 },
]

const data = [
  { id: 1, name: '张三', age: 28, email: 'zhangsan@example.com', role: '管理员' },
  { id: 2, name: '李四', age: 32, email: 'lisi@example.com', role: '开发者' },
  { id: 3, name: '王五', age: 25, email: 'wangwu@example.com', role: '设计师' },
]

function App() {
  return <Table columns={columns} dataSource={data} />
}`}
      >
        <Table columns={basicColumns} dataSource={sampleData.slice(0, 3)} />
      </CodeBlock>

      <CodeBlock
        title="不同尺寸"
        description="提供三种尺寸：sm（小）、md（中）、lg（大）。"
        code={`import { Table } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Table size="sm" columns={columns} dataSource={data} />
      <Table size="md" columns={columns} dataSource={data} />
      <Table size="lg" columns={columns} dataSource={data} />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#6b7280' }}>小尺寸 (sm)</h4>
            <Table size="sm" columns={basicColumns} dataSource={sampleData.slice(0, 2)} />
          </div>
          <div>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#6b7280' }}>中尺寸 (md - 默认)</h4>
            <Table size="md" columns={basicColumns} dataSource={sampleData.slice(0, 2)} />
          </div>
          <div>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#6b7280' }}>大尺寸 (lg)</h4>
            <Table size="lg" columns={basicColumns} dataSource={sampleData.slice(0, 2)} />
          </div>
        </div>
      </CodeBlock>

      <CodeBlock
        title="边框和斑马纹"
        description="通过 bordered 和 striped 属性控制样式。"
        code={`import { Table } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Table bordered columns={columns} dataSource={data} />
      <Table striped columns={columns} dataSource={data} />
      <Table bordered striped columns={columns} dataSource={data} />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#6b7280' }}>带边框</h4>
            <Table bordered columns={basicColumns} dataSource={sampleData.slice(0, 3)} />
          </div>
          <div>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#6b7280' }}>斑马纹</h4>
            <Table striped columns={basicColumns} dataSource={sampleData.slice(0, 3)} />
          </div>
        </div>
      </CodeBlock>

      <CodeBlock
        title="自定义渲染和排序"
        description="使用 render 函数自定义单元格内容，使用 sortable 属性启用排序。"
        code={`import { Table, Button } from '@myui/components'

const columns = [
  { key: 'name', title: '姓名', dataIndex: 'name' },
  { 
    key: 'age', 
    title: '年龄', 
    dataIndex: 'age', 
    sortable: true,
    align: 'center'
  },
  {
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    render: (value) => (
      <span style={{ 
        padding: '4px 12px',
        borderRadius: '12px',
        backgroundColor: value === 'active' ? '#dcfce7' : '#fee2e2',
        color: value === 'active' ? '#166534' : '#991b1b',
      }}>
        {value === 'active' ? '活跃' : '停用'}
      </span>
    ),
  },
  {
    key: 'action',
    title: '操作',
    render: () => (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button size="sm" variant="link">编辑</Button>
        <Button size="sm" variant="link">删除</Button>
      </div>
    ),
  },
]

function App() {
  return <Table columns={columns} dataSource={data} />
}`}
      >
        <Table columns={advancedColumns} dataSource={sampleData} />
      </CodeBlock>

      <CodeBlock
        title="分页"
        description="使用 pagination 属性开启分页功能。"
        code={`import { Table } from '@myui/components'

function App() {
  return (
    <Table 
      columns={columns} 
      dataSource={data}
      pagination={{
        pageSize: 3,
        showSizeChanger: true,
      }}
    />
  )
}`}
      >
        <Table 
          columns={basicColumns} 
          dataSource={sampleData}
          pagination={{
            pageSize: 3,
            showSizeChanger: true,
          }}
        />
      </CodeBlock>

      <CodeBlock
        title="行选择"
        description="通过 rowSelection 属性启用行选择功能。"
        code={`import { Table } from '@myui/components'
import { useState } from 'react'

function App() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  
  return (
    <div>
      <p>已选择: {selectedRowKeys.length} 项</p>
      <Table 
        columns={columns} 
        dataSource={data}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
      />
    </div>
  )
}`}
      >
        <div>
          <p style={{ marginBottom: '12px', color: '#6b7280' }}>
            已选择: <strong>{selectedRowKeys.length}</strong> 项
          </p>
          <Table 
            columns={basicColumns} 
            dataSource={sampleData}
            rowSelection={{
              selectedRowKeys,
              onChange: (keys) => setSelectedRowKeys(keys as string[]),
            }}
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="加载状态"
        description="使用 loading 属性显示加载状态。"
        code={`import { Table } from '@myui/components'

function App() {
  return <Table columns={columns} dataSource={data} loading />
}`}
      >
        <Table columns={basicColumns} dataSource={sampleData} loading />
      </CodeBlock>

      <CodeBlock
        title="空状态"
        description="当数据为空时显示空状态提示。"
        code={`import { Table } from '@myui/components'

function App() {
  return <Table columns={columns} dataSource={[]} />
}`}
      >
        <Table columns={basicColumns} dataSource={[]} />
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>API</h2>
        
        <h3 style={docHeadingStyles.h3}>Table Props</h3>
        <PropsTable data={tableProps} />
        
        <h3 style={{ ...docHeadingStyles.h3, marginTop: '32px' }}>TableColumn Props</h3>
        <p style={docParagraphStyles.normal}>
          列配置的属性说明：
        </p>
        <PropsTable data={columnProps} />

        <div style={{ 
          marginTop: '32px', 
          padding: '16px', 
          backgroundColor: 'var(--bg-secondary, #f3f4f6)', 
          borderRadius: '8px',
          borderLeft: '4px solid var(--color-primary, #3b82f6)'
        }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', fontWeight: '600' }}>💡 使用提示</h4>
          <ul style={{ margin: 0, paddingLeft: '24px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <li>使用 <code>rowKey</code> 确保每行数据有唯一标识，这对于选择和更新非常重要</li>
            <li>通过 <code>render</code> 函数可以完全自定义单元格内容，支持任意 React 元素</li>
            <li>启用 <code>sortable</code> 时，建议配合 <code>onSort</code> 回调实现服务端排序</li>
            <li>分页功能建议与后端接口配合，实现真实的分页查询</li>
            <li>表格较宽时，使用 <code>scroll</code> 属性实现横向滚动</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TableDocs
