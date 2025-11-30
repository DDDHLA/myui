import { Recorder } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const RecorderDocs = () => {

  const recorderProps: PropItem[] = [
    {
      name: 'mode',
      type: "'simple' | 'standard' | 'professional'",
      default: "'standard'",
      description: '组件模式:简洁/标准/专业'
    },
    {
      name: 'maxDuration',
      type: 'number',
      default: '300',
      description: '最大录音时长(秒)'
    },
    {
      name: 'audioFormat',
      type: "'webm' | 'mp3' | 'wav'",
      default: "'webm'",
      description: '音频格式'
    },
    {
      name: 'quality',
      type: "'low' | 'medium' | 'high'",
      default: "'medium'",
      description: '录音质量'
    },
    {
      name: 'visualizerType',
      type: "'waveform' | 'frequency' | 'volume'",
      default: "'waveform'",
      description: '可视化类型'
    },
    {
      name: 'showRecordingList',
      type: 'boolean',
      default: 'true',
      description: '是否显示录音列表'
    },
    {
      name: 'onRecordingComplete',
      type: '(recording: Recording) => void',
      description: '录音完成回调'
    },
    {
      name: 'onRecordingStart',
      type: '() => void',
      description: '录音开始回调'
    },
    {
      name: 'onRecordingPause',
      type: '() => void',
      description: '录音暂停回调'
    },
    {
      name: 'onRecordingResume',
      type: '() => void',
      description: '录音继续回调'
    },
    {
      name: 'onRecordingStop',
      type: '() => void',
      description: '录音停止回调'
    },
    {
      name: 'onError',
      type: '(error: Error) => void',
      description: '错误回调'
    },
    {
      name: 'className',
      type: 'string',
      description: '自定义类名'
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
        <h1 style={docHeadingStyles.h1}>Recorder 录音</h1>
        <p style={docParagraphStyles.lead}>
          功能完整的录音组件,支持录音控制、实时音频可视化、录音管理等功能,提供三种使用模式。
        </p>
      </div>

      <CodeBlock
        title="简洁模式"
        description="只显示录音按钮和时间,适合简单的录音场景。"
        code={`import { Recorder } from '@paidaxinghaha/my-ui-react'

function App() {
  return <Recorder mode="simple" />
}`}
      >
        <Recorder mode="simple" />
      </CodeBlock>

      <CodeBlock
        title="标准模式"
        description="带波形可视化,适合大多数录音场景。"
        code={`import { Recorder } from '@paidaxinghaha/my-ui-react'

function App() {
  return <Recorder mode="standard" />
}`}
      >
        <Recorder mode="standard" />
      </CodeBlock>

      <CodeBlock
        title="专业模式"
        description="完整功能面板,显示高级设置和详细信息。"
        code={`import { Recorder } from '@paidaxinghaha/my-ui-react'

function App() {
  return <Recorder mode="professional" />
}`}
      >
        <Recorder mode="professional" />
      </CodeBlock>

      <CodeBlock
        title="波形可视化"
        description="实时显示音频波形。"
        code={`import { Recorder } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Recorder 
      mode="standard" 
      visualizerType="waveform"
    />
  )
}`}
      >
        <Recorder mode="standard" visualizerType="waveform" />
      </CodeBlock>

      <CodeBlock
        title="频谱可视化"
        description="实时显示音频频谱分析。"
        code={`import { Recorder } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Recorder 
      mode="standard" 
      visualizerType="frequency"
    />
  )
}`}
      >
        <Recorder mode="standard" visualizerType="frequency" />
      </CodeBlock>

      <CodeBlock
        title="音量可视化"
        description="显示动态音量指示器。"
        code={`import { Recorder } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Recorder 
      mode="standard" 
      visualizerType="volume"
    />
  )
}`}
      >
        <Recorder mode="standard" visualizerType="volume" />
      </CodeBlock>

      <CodeBlock
        title="设置最大时长"
        description="限制录音的最大时长,超时自动停止。"
        code={`import { Recorder } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Recorder 
      maxDuration={60}
      onRecordingComplete={(recording) => {
        console.log('录音完成:', recording)
      }}
    />
  )
}`}
      >
        <Recorder 
          maxDuration={60}
          onRecordingComplete={(recording) => {
            console.log('录音完成:', recording)
          }}
        />
      </CodeBlock>

      <CodeBlock
        title="录音质量设置"
        description="设置不同的录音质量:低/中/高。"
        code={`import { Recorder } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <Recorder mode="simple" quality="low" />
      <Recorder mode="simple" quality="medium" />
      <Recorder mode="simple" quality="high" />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>低质量</p>
            <Recorder mode="simple" quality="low" showRecordingList={false} />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>中质量</p>
            <Recorder mode="simple" quality="medium" showRecordingList={false} />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>高质量</p>
            <Recorder mode="simple" quality="high" showRecordingList={false} />
          </div>
        </div>
      </CodeBlock>

      <CodeBlock
        title="录音事件监听"
        description="监听录音的各个阶段事件。"
        code={`import { Recorder } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Recorder
      onRecordingStart={() => console.log('开始录音')}
      onRecordingPause={() => console.log('暂停录音')}
      onRecordingResume={() => console.log('继续录音')}
      onRecordingStop={() => console.log('停止录音')}
      onRecordingComplete={(recording) => {
        console.log('录音完成:', recording)
      }}
      onError={(error) => {
        console.error('录音错误:', error)
      }}
    />
  )
}`}
      >
        <Recorder
          onRecordingStart={() => console.log('开始录音')}
          onRecordingPause={() => console.log('暂停录音')}
          onRecordingResume={() => console.log('继续录音')}
          onRecordingStop={() => console.log('停止录音')}
          onRecordingComplete={(recording) => {
            console.log('录音完成:', recording)
          }}
          onError={(error) => {
            console.error('录音错误:', error)
          }}
        />
      </CodeBlock>

      <CodeBlock
        title="隐藏录音列表"
        description="不显示录音列表,只保留录音控制功能。"
        code={`import { Recorder } from '@paidaxinghaha/my-ui-react'

function App() {
  return <Recorder showRecordingList={false} />
}`}
      >
        <Recorder showRecordingList={false} />
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>使用说明</h2>
        <div style={{ 
          padding: '16px', 
          background: 'var(--color-info-light)', 
          borderRadius: '8px',
          marginBottom: '24px'
        }}>
          <p style={{ margin: 0, color: 'var(--text-primary)' }}>
            <strong>注意:</strong> 录音功能需要浏览器支持 MediaRecorder API 和 Web Audio API,
            并且需要用户授权麦克风权限。建议使用 Chrome、Firefox 或 Edge 浏览器。
          </p>
        </div>

        <h3 style={docHeadingStyles.h3}>录音控制</h3>
        <ul style={{ lineHeight: 1.8, color: 'var(--text-primary)' }}>
          <li>点击录音按钮开始录音</li>
          <li>录音中再次点击按钮暂停录音</li>
          <li>暂停后点击按钮继续录音</li>
          <li>点击停止按钮结束录音</li>
        </ul>

        <h3 style={docHeadingStyles.h3}>录音管理</h3>
        <ul style={{ lineHeight: 1.8, color: 'var(--text-primary)' }}>
          <li>录音列表显示所有已完成的录音</li>
          <li>点击播放按钮预览录音</li>
          <li>点击下载按钮保存录音文件</li>
          <li>双击录音名称或点击编辑按钮重命名</li>
          <li>点击删除按钮移除录音</li>
        </ul>

        <h3 style={docHeadingStyles.h3}>可视化类型</h3>
        <ul style={{ lineHeight: 1.8, color: 'var(--text-primary)' }}>
          <li><strong>waveform</strong> - 实时波形显示,展示音频的时域特征</li>
          <li><strong>frequency</strong> - 频谱分析显示,展示音频的频域特征</li>
          <li><strong>volume</strong> - 音量指示器,展示动态波纹效果</li>
        </ul>

        <h3 style={docHeadingStyles.h3}>录音质量</h3>
        <ul style={{ lineHeight: 1.8, color: 'var(--text-primary)' }}>
          <li><strong>low</strong> - 低质量 (22.05kHz, 64kbps, 单声道)</li>
          <li><strong>medium</strong> - 中质量 (44.1kHz, 128kbps, 立体声)</li>
          <li><strong>high</strong> - 高质量 (48kHz, 256kbps, 立体声)</li>
        </ul>
      </div>

      <PropsTable data={recorderProps} />
    </div>
  )
}

export default RecorderDocs
