import { useState } from 'react';
import { Pagination } from '@/components';
import { CodeBlock } from '@/components/CodeBlock';
import { PropsTable } from '@/components/PropsTable';
import type { PropItem } from '@/components/PropsTable';
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles';

const PaginationDocs = () => {
  const [current1, setCurrent1] = useState(1);
  const [current2, setCurrent2] = useState(1);
  const [current3, setCurrent3] = useState(1);
  const [current4, setCurrent4] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const paginationProps: PropItem[] = [
    {
      name: 'current',
      type: 'number',
      description: '当前页码',
      required: false,
    },
    {
      name: 'defaultCurrent',
      type: 'number',
      default: '1',
      description: '默认当前页码',
      required: false,
    },
    {
      name: 'total',
      type: 'number',
      description: '总条目数',
      required: true,
    },
    {
      name: 'pageSize',
      type: 'number',
      description: '每页条数',
      required: false,
    },
    {
      name: 'defaultPageSize',
      type: 'number',
      default: '10',
      description: '默认每页条数',
      required: false,
    },
    {
      name: 'onChange',
      type: '(page: number, pageSize: number) => void',
      description: '页码改变的回调',
      required: false,
    },
    {
      name: 'onShowSizeChange',
      type: '(current: number, size: number) => void',
      description: '每页条数改变的回调',
      required: false,
    },
    {
      name: 'pageSizeOptions',
      type: 'number[]',
      default: '[10, 20, 50, 100]',
      description: '指定每页可以显示多少条',
      required: false,
    },
    {
      name: 'showTotal',
      type: 'boolean | ((total: number, range: [number, number]) => ReactNode)',
      default: 'false',
      description: '是否显示总数',
      required: false,
    },
    {
      name: 'showQuickJumper',
      type: 'boolean',
      default: 'false',
      description: '是否显示快速跳转',
      required: false,
    },
    {
      name: 'showSizeChanger',
      type: 'boolean',
      default: 'false',
      description: '是否可以改变 pageSize',
      required: false,
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: '是否禁用',
      required: false,
    },
    {
      name: 'hideOnSinglePage',
      type: 'boolean',
      default: 'false',
      description: '是否隐藏只有一页时的分页器',
      required: false,
    },
    {
      name: 'simple',
      type: 'boolean',
      default: 'false',
      description: '简单分页模式',
      required: false,
    },
    {
      name: 'size',
      type: "'default' | 'small'",
      default: "'default'",
      description: '当为 small 时，是迷你版',
      required: false,
    },
    {
      name: 'prevText',
      type: 'ReactNode',
      description: '自定义上一页按钮文本',
      required: false,
    },
    {
      name: 'nextText',
      type: 'ReactNode',
      description: '自定义下一页按钮文本',
      required: false,
    },
    {
      name: 'itemRender',
      type: '(page, type, element) => ReactNode',
      description: '自定义页码渲染',
      required: false,
    },
    {
      name: 'showLessItems',
      type: 'boolean',
      default: 'false',
      description: '是否显示较少页面内容',
      required: false,
    },
    {
      name: 'align',
      type: "'left' | 'center' | 'right'",
      default: "'left'",
      description: '对齐方式',
      required: false,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Pagination 分页</h1>
        <p style={docParagraphStyles.lead}>
          采用分页的形式分隔长列表，每次只加载一个页面。
        </p>
      </div>

      <CodeBlock
        title="基本用法"
        description="基础分页组件。"
        code={`import { Pagination } from '@myui/components'

function App() {
  return <Pagination total={50} />
}`}
      >
        <Pagination total={50} />
      </CodeBlock>

      <CodeBlock
        title="更多分页"
        description="更多分页。"
        code={`import { Pagination } from '@myui/components'

function App() {
  return <Pagination total={500} />
}`}
      >
        <Pagination total={500} />
      </CodeBlock>

      <CodeBlock
        title="改变每页显示条目数"
        description="改变每页显示条目数。"
        code={`import { useState } from 'react'
import { Pagination } from '@myui/components'

function App() {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  return (
    <Pagination
      total={500}
      current={current}
      pageSize={pageSize}
      showSizeChanger
      showQuickJumper
      showTotal
      onChange={(page, size) => {
        setCurrent(page)
        setPageSize(size)
      }}
    />
  )
}`}
      >
        <Pagination
          total={500}
          current={current1}
          pageSize={pageSize}
          showSizeChanger
          showQuickJumper
          showTotal
          onChange={(page, size) => {
            setCurrent1(page);
            setPageSize(size);
          }}
        />
      </CodeBlock>

      <CodeBlock
        title="自定义总数显示"
        description="通过 showTotal 自定义总数显示。"
        code={`import { Pagination } from '@myui/components'

function App() {
  return (
    <Pagination
      total={500}
      showTotal={(total, range) =>
        \`第 \${range[0]}-\${range[1]} 条，共 \${total} 条\`
      }
    />
  )
}`}
      >
        <Pagination
          total={500}
          showTotal={(total, range) =>
            `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
          }
        />
      </CodeBlock>

      <CodeBlock
        title="迷你分页"
        description="使用 size='small' 设置迷你分页。"
        code={`import { Pagination } from '@myui/components'

function App() {
  return (
    <>
      <Pagination size="small" total={50} />
      <Pagination
        size="small"
        total={500}
        showSizeChanger
        showQuickJumper
      />
    </>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Pagination size="small" total={50} />
          <Pagination
            size="small"
            total={500}
            showSizeChanger
            showQuickJumper
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="简单分页"
        description="简单的翻页。"
        code={`import { Pagination } from '@myui/components'

function App() {
  return <Pagination simple total={500} />
}`}
      >
        <Pagination simple total={500} />
      </CodeBlock>

      <CodeBlock
        title="受控的页码"
        description="通过 current 和 onChange 受控页码。"
        code={`import { useState } from 'react'
import { Pagination } from '@myui/components'

function App() {
  const [current, setCurrent] = useState(1)

  return (
    <div>
      <p>当前页: {current}</p>
      <Pagination
        current={current}
        total={500}
        onChange={(page) => setCurrent(page)}
      />
    </div>
  )
}`}
      >
        <div>
          <p style={{ marginBottom: '16px' }}>当前页: {current2}</p>
          <Pagination
            current={current2}
            total={500}
            onChange={(page) => setCurrent2(page)}
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="禁用状态"
        description="禁用分页。"
        code={`import { Pagination } from '@myui/components'

function App() {
  return (
    <Pagination
      total={500}
      disabled
      showSizeChanger
      showQuickJumper
    />
  )
}`}
      >
        <Pagination total={500} disabled showSizeChanger showQuickJumper />
      </CodeBlock>

      <CodeBlock
        title="对齐方式"
        description="通过 align 设置对齐方式。"
        code={`import { Pagination } from '@myui/components'

function App() {
  return (
    <>
      <Pagination total={500} align="left" showTotal />
      <Pagination total={500} align="center" showTotal />
      <Pagination total={500} align="right" showTotal />
    </>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Pagination total={500} align="left" showTotal />
          <Pagination total={500} align="center" showTotal />
          <Pagination total={500} align="right" showTotal />
        </div>
      </CodeBlock>

      <CodeBlock
        title="自定义按钮文本"
        description="自定义上一页和下一页的文本。"
        code={`import { Pagination } from '@myui/components'

function App() {
  return (
    <Pagination
      total={500}
      prevText="上一页"
      nextText="下一页"
    />
  )
}`}
      >
        <Pagination total={500} prevText="上一页" nextText="下一页" />
      </CodeBlock>

      <CodeBlock
        title="显示较少页面内容"
        description="通过 showLessItems 显示较少的页面内容。"
        code={`import { Pagination } from '@myui/components'

function App() {
  return (
    <>
      <Pagination total={500} />
      <Pagination total={500} showLessItems />
    </>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ marginBottom: '8px', color: '#666' }}>默认显示:</p>
            <Pagination total={500} />
          </div>
          <div>
            <p style={{ marginBottom: '8px', color: '#666' }}>显示较少:</p>
            <Pagination total={500} showLessItems />
          </div>
        </div>
      </CodeBlock>

      <CodeBlock
        title="完整功能"
        description="展示所有功能组合使用。"
        code={`import { useState } from 'react'
import { Pagination } from '@myui/components'

function App() {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  return (
    <Pagination
      total={500}
      current={current}
      pageSize={pageSize}
      showSizeChanger
      showQuickJumper
      showTotal={(total, range) =>
        \`第 \${range[0]}-\${range[1]} 条，共 \${total} 条\`
      }
      pageSizeOptions={[10, 20, 50, 100]}
      onChange={(page, size) => {
        setCurrent(page)
        setPageSize(size)
      }}
      onShowSizeChange={(current, size) => {
        console.log('Size changed:', current, size)
      }}
    />
  )
}`}
      >
        <Pagination
          total={500}
          current={current3}
          pageSize={pageSize}
          showSizeChanger
          showQuickJumper
          showTotal={(total, range) =>
            `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
          }
          pageSizeOptions={[10, 20, 50, 100]}
          onChange={(page, size) => {
            setCurrent3(page);
            setPageSize(size);
          }}
          onShowSizeChange={(current, size) => {
            console.log('Size changed:', current, size);
          }}
        />
      </CodeBlock>

      <CodeBlock
        title="自定义渲染页码"
        description="通过 itemRender 自定义页码的渲染。"
        code={`import { Pagination } from '@myui/components'

function App() {
  return (
    <Pagination
      total={500}
      itemRender={(page, type, element) => {
        if (type === 'prev') {
          return <button style={{
            padding: '4px 12px',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            background: '#fff',
            cursor: 'pointer'
          }}>Previous</button>
        }
        if (type === 'next') {
          return <button style={{
            padding: '4px 12px',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            background: '#fff',
            cursor: 'pointer'
          }}>Next</button>
        }
        return element
      }}
    />
  )
}`}
      >
        <Pagination
          total={500}
          itemRender={(_page, type, element) => {
            if (type === 'prev') {
              return (
                <button
                  style={{
                    padding: '4px 12px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '4px',
                    background: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  Previous
                </button>
              );
            }
            if (type === 'next') {
              return (
                <button
                  style={{
                    padding: '4px 12px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '4px',
                    background: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  Next
                </button>
              );
            }
            return element;
          }}
        />
      </CodeBlock>

      <CodeBlock
        title="隐藏单页分页器"
        description="通过 hideOnSinglePage 隐藏只有一页时的分页器。"
        code={`import { Pagination } from '@myui/components'

function App() {
  return (
    <>
      <p>总数为 5，每页 10 条（只有一页）:</p>
      <Pagination total={5} hideOnSinglePage />
      <p style={{ marginTop: '16px' }}>总数为 50，每页 10 条（多页）:</p>
      <Pagination total={50} hideOnSinglePage />
    </>
  )
}`}
      >
        <div>
          <p style={{ marginBottom: '8px', color: '#666' }}>
            总数为 5，每页 10 条（只有一页，已隐藏）:
          </p>
          <Pagination total={5} hideOnSinglePage />
          <p style={{ marginTop: '16px', marginBottom: '8px', color: '#666' }}>
            总数为 50，每页 10 条（多页，显示）:
          </p>
          <Pagination total={50} hideOnSinglePage />
        </div>
      </CodeBlock>

      <CodeBlock
        title="响应式分页"
        description="分页组件支持响应式布局，在小屏幕下自动调整。"
        code={`import { Pagination } from '@myui/components'

function App() {
  return (
    <Pagination
      total={500}
      showSizeChanger
      showQuickJumper
      showTotal={(total, range) =>
        \`第 \${range[0]}-\${range[1]} 条，共 \${total} 条\`
      }
    />
  )
}`}
      >
        <Pagination
          total={500}
          current={current4}
          onChange={(page) => setCurrent4(page)}
          showSizeChanger
          showQuickJumper
          showTotal={(total, range) =>
            `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
          }
        />
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={{ ...docHeadingStyles.h2, marginBottom: '24px' }}>API</h2>
        <h3 style={{ ...docHeadingStyles.h3, marginBottom: '16px' }}>
          Pagination
        </h3>
        <PropsTable data={paginationProps} />
      </div>
    </div>
  );
};

export default PaginationDocs;
