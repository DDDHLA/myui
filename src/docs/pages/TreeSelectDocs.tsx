import { useState } from 'react'
import { TreeSelect } from '@/components/TreeSelect'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import type { TreeNode } from '@/types'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const TreeSelectDocs = () => {
  const [singleValue, setSingleValue] = useState<string | number>('')
  const [multipleValue, setMultipleValue] = useState<(string | number)[]>([])
  const [checkableValue, setCheckableValue] = useState<(string | number)[]>([])
  const [searchableValue, setSearchableValue] = useState<string | number>('')
  const [asyncValue, setAsyncValue] = useState<string | number>('')
  const [expandedKeys, setExpandedKeys] = useState<(string | number)[]>([])

  // 基础树数据
  const basicTreeData: TreeNode[] = [
    {
      key: '0',
      label: '根节点',
      value: '0',
      children: [
        {
          key: '0-0',
          label: '子节点 0-0',
          value: '0-0',
          children: [
            { key: '0-0-0', label: '叶子节点 0-0-0', value: '0-0-0' },
            { key: '0-0-1', label: '叶子节点 0-0-1', value: '0-0-1' },
          ],
        },
        {
          key: '0-1',
          label: '子节点 0-1',
          value: '0-1',
          children: [
            { key: '0-1-0', label: '叶子节点 0-1-0', value: '0-1-0' },
            { key: '0-1-1', label: '叶子节点 0-1-1', value: '0-1-1' },
          ],
        },
      ],
    },
    {
      key: '1',
      label: '根节点 2',
      value: '1',
      children: [
        { key: '1-0', label: '叶子节点 1-0', value: '1-0' },
        { key: '1-1', label: '叶子节点 1-1', value: '1-1' },
      ],
    },
  ]

  // 部门树数据
  const departmentTreeData: TreeNode[] = [
    {
      key: 'company',
      label: '总公司',
      value: 'company',
      icon: '🏢',
      children: [
        {
          key: 'tech',
          label: '技术部',
          value: 'tech',
          icon: '💻',
          children: [
            { key: 'frontend', label: '前端团队', value: 'frontend', icon: '🎨' },
            { key: 'backend', label: '后端团队', value: 'backend', icon: '⚙️' },
            { key: 'mobile', label: '移动端团队', value: 'mobile', icon: '📱' },
          ],
        },
        {
          key: 'product',
          label: '产品部',
          value: 'product',
          icon: '📋',
          children: [
            { key: 'pm', label: '产品经理', value: 'pm', icon: '👔' },
            { key: 'design', label: '设计师', value: 'design', icon: '🎨' },
          ],
        },
        {
          key: 'hr',
          label: '人力资源部',
          value: 'hr',
          icon: '👥',
        },
      ],
    },
  ]

  // 城市树数据
  const cityTreeData: TreeNode[] = [
    {
      key: 'china',
      label: '中国',
      value: 'china',
      children: [
        {
          key: 'beijing',
          label: '北京',
          value: 'beijing',
          children: [
            { key: 'chaoyang', label: '朝阳区', value: 'chaoyang' },
            { key: 'haidian', label: '海淀区', value: 'haidian' },
          ],
        },
        {
          key: 'shanghai',
          label: '上海',
          value: 'shanghai',
          children: [
            { key: 'pudong', label: '浦东新区', value: 'pudong' },
            { key: 'huangpu', label: '黄浦区', value: 'huangpu' },
          ],
        },
        {
          key: 'guangdong',
          label: '广东省',
          value: 'guangdong',
          children: [
            { key: 'guangzhou', label: '广州市', value: 'guangzhou' },
            { key: 'shenzhen', label: '深圳市', value: 'shenzhen' },
          ],
        },
      ],
    },
  ]

  // 禁用节点的树数据
  const disabledTreeData: TreeNode[] = [
    {
      key: '0',
      label: '根节点',
      value: '0',
      children: [
        {
          key: '0-0',
          label: '子节点（禁用）',
          value: '0-0',
          disabled: true,
          children: [
            { key: '0-0-0', label: '叶子节点', value: '0-0-0' },
          ],
        },
        {
          key: '0-1',
          label: '子节点',
          value: '0-1',
          children: [
            { key: '0-1-0', label: '叶子节点', value: '0-1-0' },
            { key: '0-1-1', label: '叶子节点（禁用）', value: '0-1-1', disabled: true },
          ],
        },
      ],
    },
  ]

  // 异步加载的树数据
  const [asyncTreeData, setAsyncTreeData] = useState<TreeNode[]>([
    { key: '0', label: '根节点 1', value: '0', isLeaf: false },
    { key: '1', label: '根节点 2', value: '1', isLeaf: false },
    { key: '2', label: '叶子节点', value: '2', isLeaf: true },
  ])

  const loadAsyncData = async (node: TreeNode) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setAsyncTreeData((prevData) => {
          const updateNode = (nodes: TreeNode[]): TreeNode[] => {
            return nodes.map((n) => {
              if (n.key === node.key) {
                return {
                  ...n,
                  children: [
                    {
                      key: `${node.key}-0`,
                      label: `${node.label} - 子节点 1`,
                      value: `${node.key}-0`,
                      isLeaf: false,
                    },
                    {
                      key: `${node.key}-1`,
                      label: `${node.label} - 子节点 2`,
                      value: `${node.key}-1`,
                      isLeaf: true,
                    },
                  ],
                }
              }
              if (n.children) {
                return { ...n, children: updateNode(n.children) }
              }
              return n
            })
          }
          return updateNode(prevData)
        })
        resolve()
      }, 1000)
    })
  }

  const treeSelectProps: PropItem[] = [
    {
      name: 'value',
      type: 'string | number | (string | number)[]',
      description: '选中的值（受控）',
    },
    {
      name: 'defaultValue',
      type: 'string | number | (string | number)[]',
      description: '默认选中的值（非受控）',
    },
    {
      name: 'onChange',
      type: '(value, selectedNodes) => void',
      description: '值改变时的回调',
    },
    {
      name: 'treeData',
      type: 'TreeNode[]',
      description: '树形数据',
      required: true,
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "'请选择'",
      description: '占位符文本',
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description: '是否多选',
    },
    {
      name: 'checkable',
      type: 'boolean',
      default: 'false',
      description: '是否显示复选框',
    },
    {
      name: 'searchable',
      type: 'boolean',
      default: 'false',
      description: '是否可搜索',
    },
    {
      name: 'clearable',
      type: 'boolean',
      default: 'false',
      description: '是否可清空',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: '是否禁用',
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: '是否加载中',
    },
    {
      name: 'defaultExpandAll',
      type: 'boolean',
      default: 'false',
      description: '是否默认展开所有节点',
    },
    {
      name: 'defaultExpandedKeys',
      type: '(string | number)[]',
      default: '[]',
      description: '默认展开的节点',
    },
    {
      name: 'expandedKeys',
      type: '(string | number)[]',
      description: '受控展开的节点',
    },
    {
      name: 'onExpand',
      type: '(expandedKeys) => void',
      description: '展开/收起节点时的回调',
    },
    {
      name: 'checkStrictly',
      type: 'boolean',
      default: 'false',
      description: '父子节点是否关联（checkable 模式）',
    },
    {
      name: 'showIcon',
      type: 'boolean',
      default: 'true',
      description: '是否显示节点图标',
    },
    {
      name: 'loadData',
      type: '(node) => Promise<void>',
      description: '异步加载子节点数据',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: '组件尺寸',
    },
    {
      name: 'error',
      type: 'boolean',
      default: 'false',
      description: '是否显示错误状态',
    },
    {
      name: 'maxTagCount',
      type: 'number',
      description: '多选时最多显示的标签数量',
    },
    {
      name: 'treeHeight',
      type: 'number',
      default: '256',
      description: '树的最大高度（px）',
    },
    {
      name: 'notFoundContent',
      type: 'ReactNode',
      default: "'暂无数据'",
      description: '无数据时的提示内容',
    },
    {
      name: 'onSelect',
      type: '(value, node) => void',
      description: '选择节点时的回调',
    },
  ]

  const treeNodeProps: PropItem[] = [
    {
      name: 'key',
      type: 'string | number',
      description: '节点的唯一标识',
      required: true,
    },
    {
      name: 'label',
      type: 'string',
      description: '节点显示的标签',
      required: true,
    },
    {
      name: 'value',
      type: 'string | number',
      description: '节点的值',
      required: true,
    },
    {
      name: 'children',
      type: 'TreeNode[]',
      description: '子节点数组',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: '是否禁用该节点',
    },
    {
      name: 'isLeaf',
      type: 'boolean',
      description: '是否为叶子节点（用于异步加载）',
    },
    {
      name: 'icon',
      type: 'ReactNode',
      description: '节点图标',
    },
    {
      name: 'selectable',
      type: 'boolean',
      default: 'true',
      description: '是否可选择',
    },
    {
      name: 'checkable',
      type: 'boolean',
      description: '是否显示复选框',
    },
    {
      name: 'disableCheckbox',
      type: 'boolean',
      default: 'false',
      description: '是否禁用复选框',
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>TreeSelect 树选择</h1>
        <p style={docParagraphStyles.lead}>
          树形选择器，用于在树形结构中进行选择。支持单选、多选、复选框、搜索、异步加载等功能。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="最简单的树选择器用法。"
        code={`import { TreeSelect } from '@myui/components'

const treeData = [
  {
    key: '0',
    label: '根节点',
    value: '0',
    children: [
      {
        key: '0-0',
        label: '子节点 0-0',
        value: '0-0',
        children: [
          { key: '0-0-0', label: '叶子节点', value: '0-0-0' },
        ],
      },
    ],
  },
]

function App() {
  return (
    <TreeSelect
      treeData={treeData}
      placeholder="请选择"
    />
  )
}`}
      >
        <div style={{ maxWidth: '400px' }}>
          <TreeSelect treeData={basicTreeData} placeholder="请选择" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="受控模式"
        description="通过 value 和 onChange 控制选中的值。"
        code={`import { TreeSelect } from '@myui/components'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState('')

  return (
    <div>
      <TreeSelect
        value={value}
        onChange={setValue}
        treeData={treeData}
      />
      <p>当前选中: {value}</p>
    </div>
  )
}`}
      >
        <div style={{ maxWidth: '400px' }}>
          <TreeSelect
            value={singleValue}
            onChange={(val) => setSingleValue(val as string | number)}
            treeData={basicTreeData}
            placeholder="请选择"
          />
          <p style={{ marginTop: '12px', color: '#6b7280' }}>
            当前选中: <strong>{singleValue || '无'}</strong>
          </p>
        </div>
      </CodeBlock>

      <CodeBlock
        title="不同尺寸"
        description="提供三种尺寸：sm（小）、md（中）、lg（大）。"
        code={`import { TreeSelect } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TreeSelect size="sm" treeData={treeData} placeholder="小尺寸" />
      <TreeSelect size="md" treeData={treeData} placeholder="中尺寸(默认)" />
      <TreeSelect size="lg" treeData={treeData} placeholder="大尺寸" />
    </div>
  )
}`}
      >
        <div
          style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <TreeSelect size="sm" treeData={basicTreeData} placeholder="小尺寸" />
          <TreeSelect size="md" treeData={basicTreeData} placeholder="中尺寸(默认)" />
          <TreeSelect size="lg" treeData={basicTreeData} placeholder="大尺寸" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="复选框模式"
        description="设置 checkable 属性启用复选框，支持父子节点关联。"
        code={`import { TreeSelect } from '@myui/components'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState([])

  return (
    <div>
      <TreeSelect
        checkable
        value={value}
        onChange={setValue}
        treeData={treeData}
        placeholder="请选择（支持复选）"
      />
      <p>已选择 {value.length} 项</p>
    </div>
  )
}`}
      >
        <div style={{ maxWidth: '400px' }}>
          <TreeSelect
            checkable
            value={checkableValue}
            onChange={(val) => setCheckableValue(val as (string | number)[])}
            treeData={departmentTreeData}
            placeholder="请选择部门（支持复选）"
          />
          <p style={{ marginTop: '12px', color: '#6b7280' }}>
            已选择 <strong>{checkableValue.length}</strong> 项
          </p>
        </div>
      </CodeBlock>

      <CodeBlock
        title="多选模式"
        description="设置 multiple 属性启用多选功能。"
        code={`import { TreeSelect } from '@myui/components'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState([])

  return (
    <TreeSelect
      multiple
      value={value}
      onChange={setValue}
      treeData={treeData}
      placeholder="请选择（可多选）"
    />
  )
}`}
      >
        <div style={{ maxWidth: '400px' }}>
          <TreeSelect
            multiple
            value={multipleValue}
            onChange={(val) => setMultipleValue(val as (string | number)[])}
            treeData={cityTreeData}
            placeholder="请选择城市（可多选）"
          />
          <p style={{ marginTop: '12px', color: '#6b7280' }}>
            已选择 <strong>{multipleValue.length}</strong> 项
          </p>
        </div>
      </CodeBlock>

      <CodeBlock
        title="可搜索"
        description="设置 searchable 属性启用搜索功能，自动展开包含搜索结果的节点。"
        code={`import { TreeSelect } from '@myui/components'

function App() {
  return (
    <TreeSelect
      searchable
      treeData={treeData}
      placeholder="搜索节点"
    />
  )
}`}
      >
        <div style={{ maxWidth: '400px' }}>
          <TreeSelect
            searchable
            value={searchableValue}
            onChange={(val) => setSearchableValue(val as string | number)}
            treeData={cityTreeData}
            placeholder="搜索城市"
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="可清空"
        description="设置 clearable 属性显示清空按钮。"
        code={`import { TreeSelect } from '@myui/components'

function App() {
  return (
    <TreeSelect
      clearable
      treeData={treeData}
      placeholder="可清空选择"
    />
  )
}`}
      >
        <div style={{ maxWidth: '400px' }}>
          <TreeSelect clearable treeData={basicTreeData} placeholder="可清空选择" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="默认展开"
        description="使用 defaultExpandAll 或 defaultExpandedKeys 控制默认展开的节点。"
        code={`import { TreeSelect } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TreeSelect
        defaultExpandAll
        treeData={treeData}
        placeholder="默认展开所有节点"
      />
      <TreeSelect
        defaultExpandedKeys={['0']}
        treeData={treeData}
        placeholder="默认展开指定节点"
      />
    </div>
  )
}`}
      >
        <div
          style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <TreeSelect
            defaultExpandAll
            treeData={basicTreeData}
            placeholder="默认展开所有节点"
          />
          <TreeSelect
            defaultExpandedKeys={['0']}
            treeData={basicTreeData}
            placeholder="默认展开指定节点"
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="受控展开"
        description="通过 expandedKeys 和 onExpand 控制节点的展开状态。"
        code={`import { TreeSelect } from '@myui/components'
import { useState } from 'react'

function App() {
  const [expandedKeys, setExpandedKeys] = useState(['0'])

  return (
    <TreeSelect
      expandedKeys={expandedKeys}
      onExpand={setExpandedKeys}
      treeData={treeData}
      placeholder="受控展开"
    />
  )
}`}
      >
        <div style={{ maxWidth: '400px' }}>
          <TreeSelect
            expandedKeys={expandedKeys}
            onExpand={setExpandedKeys}
            treeData={basicTreeData}
            placeholder="受控展开"
          />
          <p style={{ marginTop: '12px', color: '#6b7280' }}>
            已展开节点: <strong>{expandedKeys.join(', ') || '无'}</strong>
          </p>
        </div>
      </CodeBlock>

      <CodeBlock
        title="禁用状态"
        description="通过 disabled 属性禁用选择器或禁用某个节点。"
        code={`import { TreeSelect } from '@myui/components'

const treeData = [
  {
    key: '0',
    label: '根节点',
    value: '0',
    children: [
      {
        key: '0-0',
        label: '子节点（禁用）',
        value: '0-0',
        disabled: true,
      },
    ],
  },
]

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TreeSelect treeData={treeData} placeholder="禁用某个节点" />
      <TreeSelect disabled treeData={treeData} placeholder="禁用整个选择器" />
    </div>
  )
}`}
      >
        <div
          style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <TreeSelect treeData={disabledTreeData} placeholder="禁用某个节点" />
          <TreeSelect disabled treeData={basicTreeData} placeholder="禁用整个选择器" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="自定义图标"
        description="通过节点的 icon 属性自定义节点图标。"
        code={`import { TreeSelect } from '@myui/components'

const treeData = [
  {
    key: 'company',
    label: '总公司',
    value: 'company',
    icon: '🏢',
    children: [
      {
        key: 'tech',
        label: '技术部',
        value: 'tech',
        icon: '💻',
        children: [
          { key: 'frontend', label: '前端团队', value: 'frontend', icon: '🎨' },
          { key: 'backend', label: '后端团队', value: 'backend', icon: '⚙️' },
        ],
      },
    ],
  },
]

function App() {
  return (
    <TreeSelect
      treeData={treeData}
      placeholder="选择部门"
      defaultExpandAll
    />
  )
}`}
      >
        <div style={{ maxWidth: '400px' }}>
          <TreeSelect
            treeData={departmentTreeData}
            placeholder="选择部门"
            defaultExpandAll
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="异步加载"
        description="使用 loadData 属性实现子节点的异步加载。"
        code={`import { TreeSelect } from '@myui/components'
import { useState } from 'react'

function App() {
  const [treeData, setTreeData] = useState([
    { key: '0', label: '根节点 1', value: '0', isLeaf: false },
    { key: '1', label: '根节点 2', value: '1', isLeaf: false },
  ])

  const loadData = async (node) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setTreeData((prevData) => {
          // 更新节点，添加子节点
          return updateTreeData(prevData, node.key)
        })
        resolve()
      }, 1000)
    })
  }

  return (
    <TreeSelect
      treeData={treeData}
      loadData={loadData}
      placeholder="点击展开异步加载子节点"
    />
  )
}`}
      >
        <div style={{ maxWidth: '400px' }}>
          <TreeSelect
            value={asyncValue}
            onChange={(val) => setAsyncValue(val as string | number)}
            treeData={asyncTreeData}
            loadData={loadAsyncData}
            placeholder="点击展开异步加载子节点"
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="父子不关联"
        description="设置 checkStrictly 为 true，父子节点选中状态互不影响。"
        code={`import { TreeSelect } from '@myui/components'

function App() {
  return (
    <TreeSelect
      checkable
      checkStrictly
      treeData={treeData}
      placeholder="父子节点不关联"
    />
  )
}`}
      >
        <div style={{ maxWidth: '400px' }}>
          <TreeSelect
            checkable
            checkStrictly
            treeData={departmentTreeData}
            placeholder="父子节点不关联"
            defaultExpandAll
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="限制标签数量"
        description="多选模式下，使用 maxTagCount 限制显示的标签数量。"
        code={`import { TreeSelect } from '@myui/components'

function App() {
  return (
    <TreeSelect
      checkable
      maxTagCount={2}
      defaultValue={['frontend', 'backend', 'mobile']}
      treeData={treeData}
      placeholder="最多显示2个标签"
    />
  )
}`}
      >
        <div style={{ maxWidth: '400px' }}>
          <TreeSelect
            checkable
            maxTagCount={2}
            defaultValue={['frontend', 'backend', 'mobile']}
            treeData={departmentTreeData}
            placeholder="最多显示2个标签"
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="错误状态"
        description="使用 error 属性显示错误状态。"
        code={`import { TreeSelect } from '@myui/components'

function App() {
  return (
    <TreeSelect
      error
      treeData={treeData}
      placeholder="错误状态"
    />
  )
}`}
      >
        <div style={{ maxWidth: '400px' }}>
          <TreeSelect error treeData={basicTreeData} placeholder="错误状态" />
        </div>
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>API</h2>

        <h3 style={docHeadingStyles.h3}>TreeSelect Props</h3>
        <PropsTable data={treeSelectProps} />

        <h3 style={{ ...docHeadingStyles.h3, marginTop: '32px' }}>TreeNode</h3>
        <p style={docParagraphStyles.normal}>树节点对象的属性说明：</p>
        <PropsTable data={treeNodeProps} />

        <div
          style={{
            marginTop: '32px',
            padding: '16px',
            backgroundColor: 'var(--bg-secondary, #f3f4f6)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--color-primary, #3b82f6)',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', fontWeight: '600' }}>
            💡 使用提示
          </h4>
          <ul
            style={{
              margin: 0,
              paddingLeft: '24px',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
            }}
          >
            <li>使用受控模式（value + onChange）以便更好地管理状态</li>
            <li>checkable 模式下，默认父子节点关联，可通过 checkStrictly 取消关联</li>
            <li>searchable 属性会自动展开包含搜索结果的节点</li>
            <li>异步加载时，节点需要设置 isLeaf 属性来区分是否为叶子节点</li>
            <li>使用 icon 属性可以为每个节点添加自定义图标</li>
            <li>支持大数据量场景，可通过 treeHeight 限制树的高度</li>
            <li>键盘导航：Enter 选择，Esc 关闭，点击展开图标切换节点</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TreeSelectDocs
