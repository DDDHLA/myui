import { Button, Space, notification } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const NotificationDocs = () => {
  const notificationProps: PropItem[] = [
    {
      name: 'type',
      type: "'success' | 'info' | 'warning' | 'error'",
      default: "'info'",
      description: '通知类型'
    },
    {
      name: 'title',
      type: 'ReactNode',
      description: '通知标题'
    },
    {
      name: 'description',
      type: 'ReactNode',
      description: '通知内容'
    },
    {
      name: 'message',
      type: 'ReactNode',
      description: '通知内容（简化用法）'
    },
    {
      name: 'icon',
      type: 'ReactNode',
      description: '自定义图标'
    },
    {
      name: 'showIcon',
      type: 'boolean',
      default: 'true',
      description: '是否显示图标'
    },
    {
      name: 'placement',
      type: "'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'",
      default: "'topRight'",
      description: '通知位置'
    },
    {
      name: 'duration',
      type: 'number',
      default: '4500',
      description: '自动关闭的延时（毫秒），设为 0 则不自动关闭'
    },
    {
      name: 'closable',
      type: 'boolean',
      default: 'true',
      description: '是否显示关闭按钮'
    },
    {
      name: 'onClose',
      type: '() => void',
      description: '关闭时的回调'
    },
    {
      name: 'btn',
      type: 'ReactNode',
      description: '自定义操作按钮'
    },
    {
      name: 'onClick',
      type: '() => void',
      description: '点击通知时的回调'
    }
  ]

  const basicExample = `import { Button, notification } from '@/components'

function App() {
  const openNotification = () => {
    notification.open({
      title: '通知标题',
      description: '这是通知的详细内容，可以是任意的 React 节点。',
    })
  }

  return (
    <Button onClick={openNotification}>
      打开通知
    </Button>
  )
}`

  const typeExample = `import { Button, Space, notification } from '@/components'

function App() {
  return (
    <Space>
      <Button onClick={() => notification.success({
        title: '成功',
        description: '这是一条成功的通知消息'
      })}>
        Success
      </Button>
      
      <Button onClick={() => notification.info({
        title: '信息',
        description: '这是一条普通的通知消息'
      })}>
        Info
      </Button>
      
      <Button onClick={() => notification.warning({
        title: '警告',
        description: '这是一条警告的通知消息'
      })}>
        Warning
      </Button>
      
      <Button onClick={() => notification.error({
        title: '错误',
        description: '这是一条错误的通知消息'
      })}>
        Error
      </Button>
    </Space>
  )
}`

  const placementExample = `import { Button, Space, notification } from '@/components'

function App() {
  const openNotification = (placement) => {
    notification.config({ placement })
    notification.info({
      title: \`位置: \${placement}\`,
      description: '通知从这个位置弹出'
    })
  }

  return (
    <Space>
      <Button onClick={() => openNotification('topLeft')}>
        Top Left
      </Button>
      <Button onClick={() => openNotification('topRight')}>
        Top Right
      </Button>
      <Button onClick={() => openNotification('bottomLeft')}>
        Bottom Left
      </Button>
      <Button onClick={() => openNotification('bottomRight')}>
        Bottom Right
      </Button>
    </Space>
  )
}`

  const customExample = `import { Button, notification } from '@/components'

function App() {
  const openNotification = () => {
    notification.open({
      title: '自定义通知',
      description: '这是一条带有自定义按钮的通知',
      btn: (
        <Button size="small" onClick={() => {
          console.log('点击了自定义按钮')
          notification.destroy()
        }}>
          确认
        </Button>
      ),
      duration: 0, // 不自动关闭
    })
  }

  return (
    <Button onClick={openNotification}>
      自定义按钮
    </Button>
  )
}`

  const durationExample = `import { Button, Space, notification } from '@/components'

function App() {
  return (
    <Space>
      <Button onClick={() => notification.info({
        title: '快速关闭',
        description: '1秒后自动关闭',
        duration: 1000
      })}>
        1秒关闭
      </Button>
      
      <Button onClick={() => notification.info({
        title: '不自动关闭',
        description: '需要手动关闭',
        duration: 0
      })}>
        不自动关闭
      </Button>
    </Space>
  )
}`

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Notification 通知</h1>
        <p style={docParagraphStyles.lead}>全局展示通知提醒信息。</p>
      </div>

      <h2 style={docHeadingStyles.h2}>何时使用</h2>
      <ul style={docParagraphStyles.normal}>
        <li>在系统四个角显示通知提醒信息。经常用于以下情况：</li>
        <li>较为复杂的通知内容。</li>
        <li>带有交互的通知，给出用户下一步的行动点。</li>
        <li>系统主动推送。</li>
      </ul>

      <CodeBlock
        title="基础用法"
        description="最简单的用法，4.5 秒后自动关闭。"
        code={basicExample}
        language="tsx"
      >
        <div style={{ width: '100%' }}>
          <Button onClick={() => notification.open({
            title: '通知标题',
            description: '这是通知的详细内容，可以是任意的 React 节点。',
          })}>
            打开通知
          </Button>
        </div>
      </CodeBlock>

      <CodeBlock
        title="不同类型"
        description="通知有 4 种不同的类型：success、info、warning、error。"
        code={typeExample}
        language="tsx"
      >
        <Space>
          <Button onClick={() => notification.success({
            title: '成功',
            description: '这是一条成功的通知消息'
          })}>
            Success
          </Button>

          <Button onClick={() => notification.info({
            title: '信息',
            description: '这是一条普通的通知消息'
          })}>
            Info
          </Button>

          <Button onClick={() => notification.warning({
            title: '警告',
            description: '这是一条警告的通知消息'
          })}>
            Warning
          </Button>

          <Button onClick={() => notification.error({
            title: '错误',
            description: '这是一条错误的通知消息'
          })}>
            Error
          </Button>
        </Space>
      </CodeBlock>

      <CodeBlock
        title="位置"
        description="通知可以从四个角弹出。"
        code={placementExample}
        language="tsx"
      >
        <Space wrap>
          <Button onClick={() => {
            notification.config({ placement: 'topLeft' })
            notification.info({
              title: '位置: Top Left',
              description: '通知从左上角弹出'
            })
          }}>
            Top Left
          </Button>
          <Button onClick={() => {
            notification.config({ placement: 'topRight' })
            notification.info({
              title: '位置: Top Right',
              description: '通知从右上角弹出'
            })
          }}>
            Top Right
          </Button>
          <Button onClick={() => {
            notification.config({ placement: 'bottomLeft' })
            notification.info({
              title: '位置: Bottom Left',
              description: '通知从左下角弹出'
            })
          }}>
            Bottom Left
          </Button>
          <Button onClick={() => {
            notification.config({ placement: 'bottomRight' })
            notification.info({
              title: '位置: Bottom Right',
              description: '通知从右下角弹出'
            })
          }}>
            Bottom Right
          </Button>
        </Space>
      </CodeBlock>

      <CodeBlock
        title="自定义按钮"
        description="可以自定义操作按钮。"
        code={customExample}
        language="tsx"
      >
        <div style={{ width: '100%' }}>
          <Button onClick={() => notification.open({
            title: '自定义通知',
            description: '这是一条带有自定义按钮的通知',
            btn: (
              <Button size="sm" onClick={() => {
                console.log('点击了自定义按钮')
                notification.destroy()
              }}>
                确认
              </Button>
            ),
            duration: 0,
          })}>
            自定义按钮
          </Button>
        </div>
      </CodeBlock>

      <CodeBlock
        title="自动关闭时间"
        description="自定义通知框自动关闭的延时，默认 4.5s，取消自动关闭只要将该值设为 0 即可。"
        code={durationExample}
        language="tsx"
      >
        <Space>
          <Button onClick={() => notification.info({
            title: '快速关闭',
            description: '1秒后自动关闭',
            duration: 1000
          })}>
            1秒关闭
          </Button>

          <Button onClick={() => notification.info({
            title: '不自动关闭',
            description: '需要手动关闭',
            duration: 0
          })}>
            不自动关闭
          </Button>
        </Space>
      </CodeBlock>

      <h2 style={docHeadingStyles.h2}>API</h2>
      <h3 style={docHeadingStyles.h3}>notification 方法</h3>
      <ul style={docParagraphStyles.normal}>
        <li><code>notification.success(config)</code></li>
        <li><code>notification.error(config)</code></li>
        <li><code>notification.info(config)</code></li>
        <li><code>notification.warning(config)</code></li>
        <li><code>notification.open(config)</code></li>
        <li><code>notification.close(key)</code> - 关闭指定的通知</li>
        <li><code>notification.destroy()</code> - 关闭所有通知</li>
        <li><code>notification.config(options)</code> - 全局配置</li>
      </ul>

      <h3 style={docHeadingStyles.h3}>Config 参数</h3>
      <PropsTable data={notificationProps} />
    </div>
  )
}

export default NotificationDocs
