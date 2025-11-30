import { useState } from 'react'
import { Modal } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const ModalDocs = () => {
  const [basicOpen, setBasicOpen] = useState(false)
  const [sizeOpen, setSizeOpen] = useState(false)
  const [currentSize, setCurrentSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md')
  const [positionOpen, setPositionOpen] = useState(false)
  const [noHeaderOpen, setNoHeaderOpen] = useState(false)
  const [customFooterOpen, setCustomFooterOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [loadingOpen, setLoadingOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fullscreenOpen, setFullscreenOpen] = useState(false)
  const [nestedOpen, setNestedOpen] = useState(false)
  const [nestedOpen2, setNestedOpen2] = useState(false)

  const handleOk = () => {
    return new Promise<void>((resolve) => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        resolve()
      }, 2000)
    })
  }

  const modalProps: PropItem[] = [
    {
      name: 'isOpen',
      type: 'boolean',
      description: '是否显示弹窗',
      required: true
    },
    {
      name: 'onClose',
      type: '() => void',
      description: '关闭弹窗的回调',
      required: true
    },
    {
      name: 'title',
      type: 'ReactNode',
      description: '弹窗标题'
    },
    {
      name: 'children',
      type: 'ReactNode',
      description: '弹窗内容',
      required: true
    },
    {
      name: 'footer',
      type: 'ReactNode',
      description: '底部内容，传 null 可隐藏默认按钮'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
      default: "'md'",
      description: '弹窗尺寸'
    },
    {
      name: 'position',
      type: "'center' | 'top'",
      default: "'center'",
      description: '弹窗位置'
    },
    {
      name: 'width',
      type: 'string | number',
      description: '自定义宽度'
    },
    {
      name: 'closable',
      type: 'boolean',
      default: 'true',
      description: '是否显示关闭按钮'
    },
    {
      name: 'maskClosable',
      type: 'boolean',
      default: 'true',
      description: '点击遮罩层是否关闭'
    },
    {
      name: 'keyboard',
      type: 'boolean',
      default: 'true',
      description: '按 Esc 键是否关闭'
    },
    {
      name: 'fullscreen',
      type: 'boolean',
      default: 'false',
      description: '是否全屏显示'
    },
    {
      name: 'destroyOnClose',
      type: 'boolean',
      default: 'false',
      description: '关闭时销毁子元素'
    },
    {
      name: 'okText',
      type: 'string',
      default: "'确定'",
      description: '确认按钮文字'
    },
    {
      name: 'cancelText',
      type: 'string',
      default: "'取消'",
      description: '取消按钮文字'
    },
    {
      name: 'onOk',
      type: '() => void | Promise<void>',
      description: '点击确认按钮的回调，支持异步'
    },
    {
      name: 'onCancel',
      type: '() => void',
      description: '点击取消按钮的回调'
    },
    {
      name: 'confirmLoading',
      type: 'boolean',
      default: 'false',
      description: '确认按钮加载状态'
    },
    {
      name: 'className',
      type: 'string',
      description: '自定义类名'
    },
    {
      name: 'overlayClassName',
      type: 'string',
      description: '自定义遮罩层类名'
    },
    {
      name: 'style',
      type: 'React.CSSProperties',
      description: '自定义样式'
    },
    {
      name: 'zIndex',
      type: 'number',
      default: '1000',
      description: 'z-index 层级'
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Modal 弹窗</h1>
        <p style={docParagraphStyles.lead}>
          模态对话框，在当前页面打开一个浮层，承载相关操作。支持多种尺寸、自定义内容、异步操作等功能。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="最简单的弹窗用法，点击按钮打开弹窗。"
        code={`import { Modal } from '@paidaxinghaha/my-ui-react'
import { useState } from 'react'

function App() {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <button onClick={() => setOpen(true)}>打开弹窗</button>
      <Modal 
        isOpen={open}
        onClose={() => setOpen(false)}
        title="基础弹窗"
      >
        <p>这是弹窗的内容</p>
        <p>可以放置任何你想要的内容</p>
      </Modal>
    </>
  )
}`}
      >
        <button 
          onClick={() => setBasicOpen(true)}
          style={{
            padding: '8px 16px',
            background: '#1677ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          打开基础弹窗
        </button>
        <Modal 
          isOpen={basicOpen}
          onClose={() => setBasicOpen(false)}
          title="基础弹窗"
        >
          <p>这是弹窗的内容</p>
          <p>可以放置任何你想要的内容</p>
        </Modal>
      </CodeBlock>

      <CodeBlock
        title="不同尺寸"
        description="提供 sm、md、lg、xl、full 五种尺寸。"
        code={`import { Modal } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <>
      <Modal isOpen={open} size="sm" title="小尺寸">...</Modal>
      <Modal isOpen={open} size="md" title="中等尺寸(默认)">...</Modal>
      <Modal isOpen={open} size="lg" title="大尺寸">...</Modal>
      <Modal isOpen={open} size="xl" title="超大尺寸">...</Modal>
    </>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <button 
              key={size}
              onClick={() => {
                setCurrentSize(size)
                setSizeOpen(true)
              }}
              style={{
                padding: '8px 16px',
                background: '#1677ff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {size.toUpperCase()} 尺寸
            </button>
          ))}
        </div>
        <Modal 
          isOpen={sizeOpen}
          onClose={() => setSizeOpen(false)}
          title={`${currentSize.toUpperCase()} 尺寸弹窗`}
          size={currentSize}
        >
          <p>这是一个 {currentSize} 尺寸的弹窗</p>
          <p>不同尺寸适用于不同的场景</p>
        </Modal>
      </CodeBlock>

      <CodeBlock
        title="弹窗位置"
        description="可以设置弹窗在屏幕中的位置，支持居中和顶部。"
        code={`import { Modal } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <>
      <Modal isOpen={open} position="center">居中显示</Modal>
      <Modal isOpen={open} position="top">顶部显示</Modal>
    </>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setPositionOpen(true)}
            style={{
              padding: '8px 16px',
              background: '#1677ff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            顶部显示
          </button>
        </div>
        <Modal 
          isOpen={positionOpen}
          onClose={() => setPositionOpen(false)}
          title="顶部显示的弹窗"
          position="top"
        >
          <p>这个弹窗显示在页面顶部</p>
        </Modal>
      </CodeBlock>

      <CodeBlock
        title="自定义底部"
        description="通过 footer 属性自定义底部内容，传 null 可以隐藏底部。"
        code={`import { Modal } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Modal 
      isOpen={open}
      onClose={() => setOpen(false)}
      title="自定义底部"
      footer={
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => setOpen(false)}>我知道了</button>
        </div>
      }
    >
      <p>自定义底部内容</p>
    </Modal>
  )
}`}
      >
        <button 
          onClick={() => setCustomFooterOpen(true)}
          style={{
            padding: '8px 16px',
            background: '#1677ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          自定义底部
        </button>
        <Modal 
          isOpen={customFooterOpen}
          onClose={() => setCustomFooterOpen(false)}
          title="自定义底部"
          footer={
            <div style={{ textAlign: 'center' }}>
              <button 
                onClick={() => setCustomFooterOpen(false)}
                style={{
                  padding: '8px 24px',
                  background: '#1677ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                我知道了
              </button>
            </div>
          }
        >
          <p>这是一个自定义底部内容的弹窗</p>
        </Modal>
      </CodeBlock>

      <CodeBlock
        title="无标题和底部"
        description="省略 title 和设置 footer={null} 可以隐藏标题栏和底部。"
        code={`import { Modal } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Modal 
      isOpen={open}
      onClose={() => setOpen(false)}
      footer={null}
    >
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>这是一个简洁的弹窗</h3>
        <p>没有标题栏和底部按钮</p>
      </div>
    </Modal>
  )
}`}
      >
        <button 
          onClick={() => setNoHeaderOpen(true)}
          style={{
            padding: '8px 16px',
            background: '#1677ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          无标题和底部
        </button>
        <Modal 
          isOpen={noHeaderOpen}
          onClose={() => setNoHeaderOpen(false)}
          footer={null}
        >
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h3 style={{ marginTop: 0 }}>这是一个简洁的弹窗</h3>
            <p>没有标题栏和底部按钮</p>
            <button 
              onClick={() => setNoHeaderOpen(false)}
              style={{
                padding: '8px 24px',
                background: '#1677ff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '12px'
              }}
            >
              关闭
            </button>
          </div>
        </Modal>
      </CodeBlock>

      <CodeBlock
        title="确认对话框"
        description="使用 onOk 和 onCancel 创建确认对话框。"
        code={`import { Modal } from '@paidaxinghaha/my-ui-react'

function App() {
  const handleOk = () => {
    console.log('确认操作')
  }
  
  return (
    <Modal 
      isOpen={open}
      onClose={() => setOpen(false)}
      title="确认删除"
      onOk={handleOk}
      okText="删除"
      cancelText="取消"
    >
      <p>确定要删除这条记录吗？此操作不可恢复。</p>
    </Modal>
  )
}`}
      >
        <button 
          onClick={() => setConfirmOpen(true)}
          style={{
            padding: '8px 16px',
            background: '#ff4d4f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          删除
        </button>
        <Modal 
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          title="确认删除"
          onOk={() => {
            console.log('确认删除')
            setConfirmOpen(false)
          }}
          okText="删除"
          cancelText="取消"
        >
          <p>确定要删除这条记录吗？此操作不可恢复。</p>
        </Modal>
      </CodeBlock>

      <CodeBlock
        title="异步操作"
        description="onOk 支持返回 Promise，点击确认按钮会显示加载状态。"
        code={`import { Modal } from '@paidaxinghaha/my-ui-react'
import { useState } from 'react'

function App() {
  const [loading, setLoading] = useState(false)
  
  const handleOk = () => {
    return new Promise((resolve) => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        resolve()
      }, 2000)
    })
  }
  
  return (
    <Modal 
      isOpen={open}
      onClose={() => setOpen(false)}
      title="提交表单"
      onOk={handleOk}
      confirmLoading={loading}
    >
      <p>点击确定按钮会模拟异步提交</p>
    </Modal>
  )
}`}
      >
        <button 
          onClick={() => setLoadingOpen(true)}
          style={{
            padding: '8px 16px',
            background: '#1677ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          异步操作
        </button>
        <Modal 
          isOpen={loadingOpen}
          onClose={() => setLoadingOpen(false)}
          title="提交表单"
          onOk={handleOk}
          confirmLoading={loading}
        >
          <p>点击确定按钮会模拟 2 秒的异步提交</p>
          <p>提交期间按钮会显示加载状态</p>
        </Modal>
      </CodeBlock>

      <CodeBlock
        title="全屏模式"
        description="设置 fullscreen 属性可以让弹窗全屏显示。"
        code={`import { Modal } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Modal 
      isOpen={open}
      onClose={() => setOpen(false)}
      title="全屏弹窗"
      fullscreen
    >
      <p>这是一个全屏显示的弹窗</p>
    </Modal>
  )
}`}
      >
        <button 
          onClick={() => setFullscreenOpen(true)}
          style={{
            padding: '8px 16px',
            background: '#1677ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          全屏弹窗
        </button>
        <Modal 
          isOpen={fullscreenOpen}
          onClose={() => setFullscreenOpen(false)}
          title="全屏弹窗"
          fullscreen
        >
          <div>
            <p>这是一个全屏显示的弹窗</p>
            <p>适合展示大量内容或复杂表单</p>
            <div style={{ height: '500px', background: '#f5f5f5', marginTop: '20px', padding: '20px' }}>
              <h3>大量内容区域</h3>
              <p>可以滚动查看</p>
            </div>
          </div>
        </Modal>
      </CodeBlock>

      <CodeBlock
        title="嵌套弹窗"
        description="弹窗内可以打开另一个弹窗。"
        code={`import { Modal } from '@paidaxinghaha/my-ui-react'
import { useState } from 'react'

function App() {
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  
  return (
    <>
      <button onClick={() => setOpen1(true)}>打开弹窗</button>
      <Modal 
        isOpen={open1}
        onClose={() => setOpen1(false)}
        title="第一层弹窗"
      >
        <p>这是第一层弹窗</p>
        <button onClick={() => setOpen2(true)}>打开嵌套弹窗</button>
        
        <Modal 
          isOpen={open2}
          onClose={() => setOpen2(false)}
          title="第二层弹窗"
          zIndex={1100}
        >
          <p>这是嵌套的第二层弹窗</p>
        </Modal>
      </Modal>
    </>
  )
}`}
      >
        <button 
          onClick={() => setNestedOpen(true)}
          style={{
            padding: '8px 16px',
            background: '#1677ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          嵌套弹窗
        </button>
        <Modal 
          isOpen={nestedOpen}
          onClose={() => setNestedOpen(false)}
          title="第一层弹窗"
        >
          <p>这是第一层弹窗</p>
          <button 
            onClick={() => setNestedOpen2(true)}
            style={{
              padding: '8px 16px',
              background: '#1677ff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '12px'
            }}
          >
            打开嵌套弹窗
          </button>
          
          <Modal 
            isOpen={nestedOpen2}
            onClose={() => setNestedOpen2(false)}
            title="第二层弹窗"
            zIndex={1100}
            size="sm"
          >
            <p>这是嵌套的第二层弹窗</p>
          </Modal>
        </Modal>
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>API</h2>
        <PropsTable data={modalProps} />
      </div>

      <div style={{ marginTop: '32px', padding: '16px', background: '#f0f9ff', borderRadius: '8px', borderLeft: '4px solid #1677ff' }}>
        <h3 style={{ marginTop: 0, color: '#1677ff' }}>注意事项</h3>
        <ul style={{ marginBottom: 0, paddingLeft: '20px' }}>
          <li>弹窗打开时会自动阻止页面滚动</li>
          <li>按 ESC 键可以关闭弹窗（可通过 keyboard 属性控制）</li>
          <li>点击遮罩层可以关闭弹窗（可通过 maskClosable 属性控制）</li>
          <li>嵌套弹窗时注意设置不同的 zIndex 值</li>
          <li>onOk 返回 Promise 时，如果 Promise 被拒绝，弹窗不会自动关闭</li>
        </ul>
      </div>
    </div>
  )
}

export default ModalDocs
