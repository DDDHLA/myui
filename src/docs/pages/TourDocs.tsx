import { useState } from 'react'
import { Tour, Button } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const TourDocs = () => {
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const [open4, setOpen4] = useState(false)

  const tourProps: PropItem[] = [
    { name: 'open', type: 'boolean', default: 'false', description: '是否打开引导' },
    { name: 'current', type: 'number', default: '0', description: '当前步骤' },
    { name: 'steps', type: 'TourStep[]', default: '[]', description: '引导步骤列表' },
    { name: 'onChange', type: '(current: number) => void', description: '步骤改变时的回调' },
    { name: 'onClose', type: '() => void', description: '关闭引导时的回调' },
    { name: 'onFinish', type: '() => void', description: '完成引导时的回调' },
    { name: 'mask', type: 'boolean', default: 'true', description: '是否显示遮罩' },
    { name: 'maskClosable', type: 'boolean', default: 'true', description: '点击遮罩是否关闭' },
    { name: 'closeIcon', type: 'ReactNode', description: '自定义关闭图标' },
    { name: 'indicatorsRender', type: '(current: number, total: number) => ReactNode', description: '自定义指示器渲染' }
  ]

  const stepProps: PropItem[] = [
    { name: 'target', type: 'string | (() => HTMLElement | null)', description: '目标元素选择器或获取函数' },
    { name: 'title', type: 'ReactNode', description: '步骤标题' },
    { name: 'description', type: 'ReactNode', description: '步骤描述' },
    { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right' | 'center'", default: "'bottom'", description: '弹窗位置' },
    { name: 'cover', type: 'ReactNode', description: '封面图片或内容' },
    { name: 'nextButtonProps', type: 'object', description: '下一步按钮的属性' },
    { name: 'prevButtonProps', type: 'object', description: '上一步按钮的属性' }
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Tour 漫游式引导</h1>
        <p style={docParagraphStyles.lead}>
          用于分步引导用户了解产品功能的气泡组件，常用于新功能介绍。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="Tour 可以指向任何 HTML 元素，通过 target 属性指定目标元素的选择器。"
        code={`import { Tour, Button } from '@paidaxinghaha/my-ui-react'

const [open, setOpen] = useState(false)

{/* 可以是按钮、输入框、卡片等任何元素 */}
<div style={{ display: 'flex', gap: '12px' }}>
  <Button id="tour-demo-1" onClick={() => setOpen(true)}>
    开始引导
  </Button>
  <Button id="tour-demo-2" variant="secondary">
    功能按钮
  </Button>
  <Button id="tour-demo-3" variant="success">
    操作按钮
  </Button>
</div>

<Tour
  open={open}
  onClose={() => setOpen(false)}
  steps={[
    {
      target: '#tour-demo-1',  // 使用 CSS 选择器
      title: '第一步',
      description: '这是第一个引导步骤，介绍这个按钮的功能。'
    },
    {
      target: '#tour-demo-2',
      title: '第二步',
      description: '这是第二个引导步骤，介绍另一个功能。',
      placement: 'top'
    },
    {
      target: '#tour-demo-3',
      title: '第三步',
      description: '这是最后一个步骤，点击完成结束引导。',
      placement: 'left'
    }
  ]}
/>`}
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button id="tour-demo-1" onClick={() => setOpen1(true)}>
            开始引导
          </Button>
          <Button id="tour-demo-2" variant="secondary">
            功能按钮
          </Button>
          <Button id="tour-demo-3" variant="success">
            操作按钮
          </Button>
        </div>

        <Tour
          open={open1}
          onClose={() => setOpen1(false)}
          steps={[
            {
              target: '#tour-demo-1',
              title: '第一步',
              description: '这是第一个引导步骤，介绍这个按钮的功能。'
            },
            {
              target: '#tour-demo-2',
              title: '第二步',
              description: '这是第二个引导步骤，介绍另一个功能。',
              placement: 'top'
            },
            {
              target: '#tour-demo-3',
              title: '第三步',
              description: '这是最后一个步骤，点击完成结束引导。',
              placement: 'left'
            }
          ]}
        />
      </CodeBlock>

      <CodeBlock
        title="不同位置"
        description="通过 placement 属性设置弹窗位置。"
        code={`import { Tour, Button } from '@paidaxinghaha/my-ui-react'

const [open, setOpen] = useState(false)

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', padding: '40px' }}>
  <Button id="tour-placement-1">顶部位置</Button>
  <Button id="tour-placement-2">底部位置</Button>
  <Button id="tour-placement-3">左侧位置</Button>
  <Button id="tour-placement-4">右侧位置</Button>
  <Button onClick={() => setOpen(true)} variant="primary" style={{ gridColumn: '1 / -1' }}>
    查看不同位置
  </Button>
</div>

<Tour
  open={open}
  onClose={() => setOpen(false)}
  steps={[
    {
      target: '#tour-placement-1',
      title: '顶部',
      description: '弹窗显示在目标元素的顶部。',
      placement: 'top'
    },
    {
      target: '#tour-placement-2',
      title: '底部',
      description: '弹窗显示在目标元素的底部。',
      placement: 'bottom'
    },
    {
      target: '#tour-placement-3',
      title: '左侧',
      description: '弹窗显示在目标元素的左侧。',
      placement: 'left'
    },
    {
      target: '#tour-placement-4',
      title: '右侧',
      description: '弹窗显示在目标元素的右侧。',
      placement: 'right'
    }
  ]}
/>`}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', padding: '40px' }}>
          <Button id="tour-placement-1">顶部位置</Button>
          <Button id="tour-placement-2">底部位置</Button>
          <Button id="tour-placement-3">左侧位置</Button>
          <Button id="tour-placement-4">右侧位置</Button>
          <Button onClick={() => setOpen2(true)} variant="primary" style={{ gridColumn: '1 / -1' }}>
            查看不同位置
          </Button>
        </div>

        <Tour
          open={open2}
          onClose={() => setOpen2(false)}
          steps={[
            {
              target: '#tour-placement-1',
              title: '顶部',
              description: '弹窗显示在目标元素的顶部。',
              placement: 'top'
            },
            {
              target: '#tour-placement-2',
              title: '底部',
              description: '弹窗显示在目标元素的底部。',
              placement: 'bottom'
            },
            {
              target: '#tour-placement-3',
              title: '左侧',
              description: '弹窗显示在目标元素的左侧。',
              placement: 'left'
            },
            {
              target: '#tour-placement-4',
              title: '右侧',
              description: '弹窗显示在目标元素的右侧。',
              placement: 'right'
            }
          ]}
        />
      </CodeBlock>

      <CodeBlock
        title="带封面"
        description="使用 cover 属性添加封面图片或内容。"
        code={`import { Tour, Button } from '@paidaxinghaha/my-ui-react'

const [open, setOpen] = useState(false)

<Button id="tour-cover-btn" onClick={() => setOpen(true)}>
  查看带封面的引导
</Button>

<Tour
  open={open}
  onClose={() => setOpen(false)}
  steps={[
    {
      target: '#tour-cover-btn',
      title: '欢迎使用',
      description: '这是一个带封面的引导步骤。',
      cover: (
        <img 
          src="https://via.placeholder.com/360x200" 
          alt="cover" 
          style={{ width: '100%', borderRadius: '8px' }}
        />
      )
    }
  ]}
/>`}
      >
        <div>
          <Button id="tour-cover-btn" onClick={() => setOpen3(true)}>
            查看带封面的引导
          </Button>
        </div>

        <Tour
          open={open3}
          onClose={() => setOpen3(false)}
          steps={[
            {
              target: '#tour-cover-btn',
              title: '欢迎使用 MyUI',
              description: '这是一个现代化的 React 组件库，提供了丰富的组件和优秀的用户体验。',
              cover: (
                <div style={{ 
                  width: '100%', 
                  height: '160px', 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>
                  🎉 MyUI
                </div>
              )
            },
            {
              target: '#tour-cover-btn',
              title: '开始探索',
              description: '让我们一起探索 MyUI 的强大功能吧！',
              placement: 'top'
            }
          ]}
        />
      </CodeBlock>

      <CodeBlock
        title="无遮罩"
        description="设置 mask={false} 可以关闭遮罩层。"
        code={`import { Tour, Button } from '@paidaxinghaha/my-ui-react'

const [open, setOpen] = useState(false)

<Button id="tour-no-mask-btn" onClick={() => setOpen(true)}>
  无遮罩引导
</Button>

<Tour
  open={open}
  onClose={() => setOpen(false)}
  mask={false}
  steps={[
    {
      target: '#tour-no-mask-btn',
      title: '无遮罩模式',
      description: '这个引导没有遮罩层，用户可以自由操作页面。'
    }
  ]}
/>`}
      >
        <div>
          <Button id="tour-no-mask-btn" onClick={() => setOpen4(true)}>
            无遮罩引导
          </Button>
        </div>

        <Tour
          open={open4}
          onClose={() => setOpen4(false)}
          mask={false}
          steps={[
            {
              target: '#tour-no-mask-btn',
              title: '无遮罩模式',
              description: '这个引导没有遮罩层，用户可以自由操作页面其他部分。'
            }
          ]}
        />
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>API</h2>
        
        <h3 style={{ ...docHeadingStyles.h3, marginTop: '24px' }}>Tour Props</h3>
        <PropsTable data={tourProps} />
        
        <h3 style={{ ...docHeadingStyles.h3, marginTop: '32px' }}>TourStep</h3>
        <PropsTable data={stepProps} />
      </div>

      <div style={{ marginTop: '32px', padding: '16px', background: 'var(--bg-secondary, #f9fafb)', borderRadius: '8px' }}>
        <h3 style={{ ...docHeadingStyles.h3, marginTop: 0 }}>使用建议</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary, #6b7280)' }}>
          <li>引导步骤不宜过多，建议控制在 3-5 步</li>
          <li>每个步骤的描述要简洁明了，突出重点</li>
          <li>合理使用 placement 属性，确保弹窗不会遮挡重要内容</li>
          <li>对于首次使用的用户，可以在进入页面时自动触发引导</li>
          <li>提供跳过引导的选项，避免打扰老用户</li>
          <li>可以通过 nextButtonProps 和 prevButtonProps 自定义按钮文字</li>
          <li>使用 placement='center' 可以实现居中显示的引导</li>
        </ul>
      </div>
    </div>
  )
}

export default TourDocs
