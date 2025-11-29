import { useState } from 'react'
import { TypeWriter } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'
import { Button } from '@/components'

const TypeWriterDocs = () => {
  const [key, setKey] = useState(0)

  const typeWriterProps: PropItem[] = [
    {
      name: 'text',
      type: 'string',
      description: '要显示的文本内容',
      required: true
    },
    {
      name: 'speed',
      type: 'number',
      default: '50',
      description: '每个字符的延迟时间（毫秒）'
    },
    {
      name: 'showCursor',
      type: 'boolean',
      default: 'true',
      description: '是否显示光标'
    },
    {
      name: 'cursor',
      type: 'string',
      default: "'|'",
      description: '光标字符'
    },
    {
      name: 'cursorBlinkSpeed',
      type: 'number',
      default: '530',
      description: '光标闪烁速度（毫秒）'
    },
    {
      name: 'onComplete',
      type: '() => void',
      description: '完成后的回调'
    },
    {
      name: 'className',
      type: 'string',
      description: '自定义类名'
    },
    {
      name: 'loop',
      type: 'boolean',
      default: 'false',
      description: '是否循环播放'
    },
    {
      name: 'deleteSpeed',
      type: 'number',
      default: '30',
      description: '循环时删除文字的速度（毫秒）'
    },
    {
      name: 'pauseTime',
      type: 'number',
      default: '1000',
      description: '循环时的暂停时间（毫秒）'
    },
    {
      name: 'startDelay',
      type: 'number',
      default: '0',
      description: '开始前的延迟时间（毫秒）'
    },
    {
      name: 'as',
      type: 'keyof JSX.IntrinsicElements',
      default: "'span'",
      description: 'HTML 标签类型'
    },
    {
      name: 'style',
      type: 'React.CSSProperties',
      description: '自定义样式'
    }
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>TypeWriter 流式输出</h1>
        <p style={docParagraphStyles.lead}>
          一个优雅的打字机效果组件，支持逐字符流式输出文本，适用于 AI 对话、代码演示、产品介绍等场景。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="最简单的用法，显示一段文字的打字效果。"
        code={`import { TypeWriter } from '@myui/components'

function App() {
  return (
    <TypeWriter 
      text="Hello, World! 这是一个流式输出组件。" 
      speed={100}
    />
  )
}`}
      >
        <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <TypeWriter 
            text="Hello, World! 这是一个流式输出组件。" 
            speed={100}
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="不同速度"
        description="通过调整 speed 属性控制打字速度，适应不同场景。"
        code={`import { TypeWriter } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
          慢速（150ms）
        </div>
        <TypeWriter 
          text="慢速打字效果，适合强调重要内容。" 
          speed={150}
        />
      </div>
      <div>
        <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
          中速（50ms）
        </div>
        <TypeWriter 
          text="中速打字效果，默认速度。" 
          speed={50}
        />
      </div>
      <div>
        <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
          快速（20ms）
        </div>
        <TypeWriter 
          text="快速打字效果，适合长文本内容。" 
          speed={20}
        />
      </div>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
              慢速（150ms）
            </div>
            <TypeWriter 
              text="慢速打字效果，适合强调重要内容。" 
              speed={150}
            />
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
              中速（50ms）
            </div>
            <TypeWriter 
              text="中速打字效果，默认速度。" 
              speed={50}
            />
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
              快速（20ms）
            </div>
            <TypeWriter 
              text="快速打字效果，适合长文本内容。" 
              speed={20}
            />
          </div>
        </div>
      </CodeBlock>

      <CodeBlock
        title="自定义光标"
        description="可以自定义光标样式或隐藏光标。"
        code={`import { TypeWriter } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* 默认光标 */}
      <TypeWriter 
        text="使用默认光标样式" 
        speed={80}
      />
      
      {/* 下划线光标 */}
      <TypeWriter 
        text="使用下划线作为光标" 
        speed={80}
        cursor="_"
      />
      
      {/* 方块光标 */}
      <TypeWriter 
        text="使用方块作为光标" 
        speed={80}
        cursor="█"
      />
      
      {/* 无光标 */}
      <TypeWriter 
        text="不显示光标" 
        speed={80}
        showCursor={false}
      />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
              默认光标 |
            </div>
            <TypeWriter 
              text="使用默认光标样式" 
              speed={80}
            />
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
              下划线光标 _
            </div>
            <TypeWriter 
              text="使用下划线作为光标" 
              speed={80}
              cursor="_"
            />
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
              方块光标 █
            </div>
            <TypeWriter 
              text="使用方块作为光标" 
              speed={80}
              cursor="█"
            />
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
              无光标
            </div>
            <TypeWriter 
              text="不显示光标" 
              speed={80}
              showCursor={false}
            />
          </div>
        </div>
      </CodeBlock>

      <CodeBlock
        title="循环播放"
        description="设置 loop 属性后，文字会不断重复播放。"
        code={`import { TypeWriter } from '@myui/components'

function App() {
  return (
    <TypeWriter 
      text="这段文字会不断重复播放，先打字再删除。" 
      speed={60}
      deleteSpeed={30}
      pauseTime={2000}
      loop
    />
  )
}`}
      >
        <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <TypeWriter 
            text="这段文字会不断重复播放，先打字再删除。" 
            speed={60}
            deleteSpeed={30}
            pauseTime={2000}
            loop
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="延迟开始"
        description="可以设置延迟时间，让动画在稍后开始。"
        code={`import { TypeWriter } from '@myui/components'
import { Button } from '@myui/components'
import { useState } from 'react'

function App() {
  const [key, setKey] = useState(0)
  
  return (
    <div>
      <TypeWriter 
        text="这段文字延迟 1 秒后才开始显示。" 
        speed={80}
        startDelay={1000}
        key={key}
      />
      <Button 
        onClick={() => setKey(k => k + 1)} 
        style={{ marginTop: '1rem' }}
        size="sm"
      >
        重新播放
      </Button>
    </div>
  )
}`}
      >
        <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <TypeWriter 
            text="这段文字延迟 1 秒后才开始显示。" 
            speed={80}
            startDelay={1000}
            key={key}
          />
          <Button 
            onClick={() => setKey(k => k + 1)} 
            style={{ marginTop: '1rem' }}
            size="sm"
          >
            重新播放
          </Button>
        </div>
      </CodeBlock>

      <CodeBlock
        title="AI 对话示例"
        description="在 AI 聊天界面中模拟流式输出效果。"
        code={`import { TypeWriter } from '@myui/components'

function App() {
  return (
    <div style={{
      padding: '1.5rem',
      backgroundColor: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      maxWidth: '600px'
    }}>
      <div style={{ 
        marginBottom: '1rem', 
        fontWeight: 'bold', 
        color: '#3b82f6' 
      }}>
        🤖 AI Assistant
      </div>
      <TypeWriter 
        text="你好！我是 AI 助手。我可以帮你解答问题、提供建议，或者只是陪你聊天。有什么我可以帮助你的吗？" 
        speed={40}
        cursor="▋"
      />
    </div>
  )
}`}
      >
        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: '#fff', 
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          maxWidth: '600px'
        }}>
          <div style={{ marginBottom: '1rem', fontWeight: 'bold', color: '#3b82f6' }}>
            🤖 AI Assistant
          </div>
          <TypeWriter 
            text="你好！我是 AI 助手。我可以帮你解答问题、提供建议，或者只是陪你聊天。有什么我可以帮助你的吗？" 
            speed={40}
            cursor="▋"
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="代码输出示例"
        description="模拟代码编辑器的打字效果。"
        code={`import { TypeWriter } from '@myui/components'

function App() {
  const code = \`function hello() {
  console.log('Hello, World!');
  return true;
}\`

  return (
    <div style={{ 
      padding: '1.5rem', 
      backgroundColor: '#1e1e1e', 
      borderRadius: '8px',
      fontFamily: 'Monaco, Consolas, monospace',
      fontSize: '0.875rem',
      color: '#d4d4d4'
    }}>
      <TypeWriter 
        text={code}
        speed={30}
        cursor="█"
        style={{ color: '#d4d4d4', fontFamily: 'inherit' }}
      />
    </div>
  )
}`}
      >
        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: '#1e1e1e', 
          borderRadius: '8px',
          fontFamily: 'Monaco, Consolas, monospace',
          fontSize: '0.875rem',
          color: '#d4d4d4'
        }}>
          <TypeWriter 
            text={`function hello() {
  console.log('Hello, World!');
  return true;
}`}
            speed={30}
            cursor="█"
            style={{ color: '#d4d4d4', fontFamily: 'inherit' }}
          />
        </div>
      </CodeBlock>

      <PropsTable data={typeWriterProps} />
    </div>
  )
}

export default TypeWriterDocs
