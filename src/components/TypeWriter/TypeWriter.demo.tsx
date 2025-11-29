import { useState } from 'react'
import TypeWriter from './TypeWriter'
import { Button } from '../Button'

const TypeWriterDemo = () => {
  const [key, setKey] = useState(0)

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>TypeWriter 流式输出组件</h1>

      {/* 基础用法 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>基础用法</h2>
        <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <TypeWriter 
            text="Hello, World! 这是一个流式输出组件。" 
            speed={100}
          />
        </div>
      </section>

      {/* 不同速度 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>不同速度</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>慢速（150ms）</div>
            <TypeWriter 
              text="慢速打字效果，适合强调重要内容。" 
              speed={150}
            />
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>中速（50ms）</div>
            <TypeWriter 
              text="中速打字效果，默认速度，平衡流畅度和观感。" 
              speed={50}
            />
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>快速（20ms）</div>
            <TypeWriter 
              text="快速打字效果，适合长文本内容。" 
              speed={20}
            />
          </div>
        </div>
      </section>

      {/* 自定义光标 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>自定义光标</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>默认光标 |</div>
            <TypeWriter 
              text="使用默认光标样式" 
              speed={80}
            />
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>下划线光标 _</div>
            <TypeWriter 
              text="使用下划线作为光标" 
              speed={80}
              cursor="_"
            />
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>方块光标 █</div>
            <TypeWriter 
              text="使用方块作为光标" 
              speed={80}
              cursor="█"
            />
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>无光标</div>
            <TypeWriter 
              text="不显示光标" 
              speed={80}
              showCursor={false}
            />
          </div>
        </div>
      </section>

      {/* 循环播放 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>循环播放</h2>
        <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <TypeWriter 
            text="这段文字会不断重复播放，先打字再删除。" 
            speed={60}
            deleteSpeed={30}
            pauseTime={2000}
            loop
          />
        </div>
      </section>

      {/* 延迟开始 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>延迟开始</h2>
        <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <TypeWriter 
            text="这段文字延迟 1 秒后才开始显示。" 
            speed={80}
            startDelay={1000}
            key={key}
          />
        </div>
        <Button 
          onClick={() => setKey(k => k + 1)} 
          style={{ marginTop: '1rem' }}
          size="sm"
        >
          重新播放
        </Button>
      </section>

      {/* 作为不同元素 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>作为不同 HTML 元素</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <TypeWriter 
              text="这是一个 h3 标题" 
              speed={80}
              as="h3"
              style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}
            />
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <TypeWriter 
              text="这是一个段落文本，可以显示较长的内容。" 
              speed={50}
              as="p"
              style={{ margin: 0 }}
            />
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <TypeWriter 
              text="这是一个 div 块元素" 
              speed={80}
              as="div"
              style={{ padding: '0.5rem', backgroundColor: '#fff', borderRadius: '4px' }}
            />
          </div>
        </div>
      </section>

      {/* 完成回调 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>完成回调</h2>
        <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <TypeWriter 
            text="打字完成后会触发回调函数！" 
            speed={80}
            onComplete={() => alert('打字完成！')}
          />
        </div>
      </section>

      {/* AI 对话示例 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>AI 对话示例</h2>
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
      </section>

      {/* 代码输出示例 */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>代码输出示例</h2>
        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: '#1e1e1e', 
          borderRadius: '8px',
          fontFamily: 'Monaco, Consolas, monospace',
          fontSize: '0.875rem',
          color: '#d4d4d4'
        }}>
          <TypeWriter 
            text={`function hello() {\n  console.log('Hello, World!');\n  return true;\n}`}
            speed={30}
            cursor="█"
            className="code-typewriter"
            style={{ color: '#d4d4d4', fontFamily: 'inherit' }}
          />
        </div>
      </section>
    </div>
  )
}

export default TypeWriterDemo
