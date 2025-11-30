import { Message, Button } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const MessageDocs = () => {
  const messageProps: PropItem[] = [
    {
      name: 'content',
      type: 'ReactNode',
      description: '提示内容',
      required: true
    },
    {
      name: 'duration',
      type: 'number',
      default: '3000',
      description: '自动关闭的延时，单位秒。设为 0 时不自动关闭。'
    },
    {
      name: 'onClose',
      type: '() => void',
      description: '关闭时触发的回调函数'
    }
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Message 全局提示</h1>
        <p style={docParagraphStyles.lead}>
          全局展示操作反馈信息。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="从顶部出现，3 秒后自动消失。"
        code={`import { Message, Button } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Button onClick={() => Message.info('这是一条普通提示')}>
      普通提示
    </Button>
  )
}`}
      >
        <Button onClick={() => Message.info('这是一条普通提示')}>
          普通提示
        </Button>
      </CodeBlock>

      <CodeBlock
        title="不同类型的提示"
        description="包括成功、失败、警告、普通四种样式。"
        code={`import { Message, Button } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Button onClick={() => Message.success('这是一条成功提示')}>成功</Button>
      <Button onClick={() => Message.error('这是一条错误提示')}>错误</Button>
      <Button onClick={() => Message.warning('这是一条警告提示')}>警告</Button>
      <Button onClick={() => Message.info('这是一条普通提示')}>普通</Button>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button onClick={() => Message.success('这是一条成功提示')}>成功</Button>
          <Button onClick={() => Message.error('这是一条错误提示')}>错误</Button>
          <Button onClick={() => Message.warning('这是一条警告提示')}>警告</Button>
          <Button onClick={() => Message.info('这是一条普通提示')}>普通</Button>
        </div>
      </CodeBlock>

      <CodeBlock
        title="修改延时"
        description="自定义时长，10s 后自动关闭。"
        code={`import { Message, Button } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Button onClick={() => Message.success('这是一条长时提示', 10000)}>
      10s 后关闭
    </Button>
  )
}`}
      >
        <Button onClick={() => Message.success('这是一条长时提示', 10000)}>
          10s 后关闭
        </Button>
      </CodeBlock>

      <CodeBlock
        title="自定义图标"
        description="可以自定义消息的图标。"
        code={`import { Message, Button } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Button onClick={() => Message.info('自定义图标', 3000, <span>🚀</span>)}>
      自定义图标
    </Button>
  )
}`}
      >
        <Button onClick={() => Message.info('自定义图标', 3000, <span>🚀</span>)}>
          自定义图标
        </Button>
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={{ ...docHeadingStyles.h2, marginBottom: '24px' }}>API</h2>
        <p style={{ marginBottom: '16px' }}>
          组件提供了一些静态方法，使用方式和参数如下：
        </p>
        <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
          <li><code>Message.success(content, [duration], [icon])</code></li>
          <li><code>Message.error(content, [duration], [icon])</code></li>
          <li><code>Message.info(content, [duration], [icon])</code></li>
          <li><code>Message.warning(content, [duration], [icon])</code></li>
        </ul>
        <PropsTable data={messageProps} />
      </div>
    </div>
  )
}

export default MessageDocs
