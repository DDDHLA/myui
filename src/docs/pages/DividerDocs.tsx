import { Divider } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const DividerDocs = () => {
  const dividerProps: PropItem[] = [
    {
      name: 'type',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: '分割线类型'
    },
    {
      name: 'dashed',
      type: 'boolean',
      default: 'false',
      description: '是否为虚线'
    },
    {
      name: 'plain',
      type: 'boolean',
      default: 'false',
      description: '文字是否显示为普通正文样式'
    },
    {
      name: 'orientation',
      type: "'left' | 'center' | 'right'",
      default: "'center'",
      description: '分割线文字的位置'
    },
    {
      name: 'orientationMargin',
      type: 'string | number',
      description: '文字距离边缘的距离'
    },
    {
      name: 'children',
      type: 'ReactNode',
      description: '分割线中的文字内容'
    }
  ]

  const basicExample = `import { Divider } from '@/components'

function App() {
  return (
    <div>
      <p>段落内容</p>
      <Divider />
      <p>段落内容</p>
      <Divider dashed />
      <p>段落内容</p>
    </div>
  )
}`

  const withTextExample = `import { Divider } from '@/components'

function App() {
  return (
    <div>
      <p>段落内容</p>
      <Divider>默认居中</Divider>
      <p>段落内容</p>
      <Divider orientation="left">左侧文字</Divider>
      <p>段落内容</p>
      <Divider orientation="right">右侧文字</Divider>
      <p>段落内容</p>
    </div>
  )
}`

  const verticalExample = `import { Divider } from '@/components'

function App() {
  return (
    <div>
      文本
      <Divider type="vertical" />
      <a href="#">链接</a>
      <Divider type="vertical" />
      <a href="#">链接</a>
    </div>
  )
}`

  const plainExample = `import { Divider } from '@/components'

function App() {
  return (
    <div>
      <p>段落内容</p>
      <Divider plain>普通文字</Divider>
      <p>段落内容</p>
    </div>
  )
}`

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Divider 分割线</h1>
        <p style={docParagraphStyles.lead}>区隔内容的分割线。</p>
      </div>

      <h2 style={docHeadingStyles.h2}>何时使用</h2>
      <ul style={docParagraphStyles.normal}>
        <li>对不同章节的文本段落进行分割。</li>
        <li>对行内文字/链接进行分割，例如表格的操作列。</li>
      </ul>

      <CodeBlock
        title="基础用法"
        description="默认为水平分割线，可在中间加入文字。"
        code={basicExample}
        language="tsx"
      >
        <div style={{ width: '100%' }}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <Divider />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <Divider dashed />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </CodeBlock>

      <CodeBlock
        title="带文字的分割线"
        description="分割线中带有文字，可以用 orientation 指定文字位置。"
        code={withTextExample}
        language="tsx"
      >
        <div style={{ width: '100%' }}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <Divider>默认居中</Divider>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <Divider orientation="left">左侧文字</Divider>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <Divider orientation="right">右侧文字</Divider>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </CodeBlock>

      <CodeBlock
        title="垂直分割线"
        description='使用 type="vertical" 设置为行内的垂直分割线。'
        code={verticalExample}
        language="tsx"
      >
        <div>
          文本
          <Divider type="vertical" />
          <a href="#">链接</a>
          <Divider type="vertical" />
          <a href="#">链接</a>
        </div>
      </CodeBlock>

      <CodeBlock
        title="朴素样式"
        description="使用 plain 可以设置为更轻量的分割文字样式。"
        code={plainExample}
        language="tsx"
      >
        <div style={{ width: '100%' }}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <Divider plain>普通文字</Divider>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </CodeBlock>

      <h2 style={docHeadingStyles.h2}>API</h2>
      <PropsTable data={dividerProps} />
    </div>
  )
}

export default DividerDocs
