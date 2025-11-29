import { Image, Space } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const ImageDocs = () => {
  const imageProps: PropItem[] = [
    {
      name: 'src',
      type: 'string',
      required: true,
      description: '图片地址'
    },
    {
      name: 'alt',
      type: 'string',
      description: '图片描述'
    },
    {
      name: 'width',
      type: 'string | number',
      description: '图片宽度'
    },
    {
      name: 'height',
      type: 'string | number',
      description: '图片高度'
    },
    {
      name: 'preview',
      type: 'boolean',
      default: 'false',
      description: '是否支持预览'
    },
    {
      name: 'placeholder',
      type: 'ReactNode',
      description: '加载占位符'
    },
    {
      name: 'fallback',
      type: 'string',
      description: '加载失败时显示的图片'
    },
    {
      name: 'fit',
      type: "'fill' | 'contain' | 'cover' | 'none' | 'scale-down'",
      default: "'cover'",
      description: '图片填充模式'
    },
    {
      name: 'loading',
      type: "'lazy' | 'eager'",
      default: "'lazy'",
      description: '图片加载方式'
    },
    {
      name: 'onLoad',
      type: '() => void',
      description: '图片加载完成的回调'
    },
    {
      name: 'onError',
      type: '() => void',
      description: '图片加载失败的回调'
    }
  ]

  const basicExample = `import { Image } from '@/components'

function App() {
  return (
    <Image
      src="https://picsum.photos/400/300"
      alt="示例图片"
      width={400}
      height={300}
    />
  )
}`

  const previewExample = `import { Image } from '@/components'

function App() {
  return (
    <Image
      src="https://picsum.photos/400/300"
      alt="可预览的图片"
      width={400}
      height={300}
      preview
    />
  )
}`

  const fallbackExample = `import { Image } from '@/components'

function App() {
  return (
    <Image
      src="https://invalid-url.com/image.jpg"
      fallback="https://via.placeholder.com/400x300?text=Fallback"
      alt="加载失败示例"
      width={400}
      height={300}
    />
  )
}`

  const fitExample = `import { Image, Space } from '@/components'

function App() {
  return (
    <Space direction="vertical">
      <Image
        src="https://picsum.photos/800/400"
        width={200}
        height={200}
        fit="fill"
      />
      <Image
        src="https://picsum.photos/800/400"
        width={200}
        height={200}
        fit="contain"
      />
      <Image
        src="https://picsum.photos/800/400"
        width={200}
        height={200}
        fit="cover"
      />
    </Space>
  )
}`

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Image 图片</h1>
        <p style={docParagraphStyles.lead}>可预览的图片组件。</p>
      </div>

      <h2 style={docHeadingStyles.h2}>何时使用</h2>
      <ul style={docParagraphStyles.normal}>
        <li>需要展示图片时使用。</li>
        <li>加载大图时显示 loading 或加载失败时容错处理。</li>
        <li>支持图片预览、缩放、旋转等操作。</li>
      </ul>

      <CodeBlock
        title="基础用法"
        description="基本的图片展示。"
        code={basicExample}
        language="tsx"
      >
        <Image
          src="https://picsum.photos/400/300"
          alt="示例图片"
          width={400}
          height={300}
        />
      </CodeBlock>

      <CodeBlock
        title="图片预览"
        description="点击图片可以预览，支持缩放、旋转、下载等操作。"
        code={previewExample}
        language="tsx"
      >
        <Space>
          <Image
            src="https://picsum.photos/400/300?random=1"
            alt="可预览的图片 1"
            width={200}
            height={150}
            preview
          />
          <Image
            src="https://picsum.photos/400/300?random=2"
            alt="可预览的图片 2"
            width={200}
            height={150}
            preview
          />
          <Image
            src="https://picsum.photos/400/300?random=3"
            alt="可预览的图片 3"
            width={200}
            height={150}
            preview
          />
        </Space>
      </CodeBlock>

      <CodeBlock
        title="加载失败"
        description="加载失败时显示 fallback 图片。"
        code={fallbackExample}
        language="tsx"
      >
        <Image
          src="https://invalid-url.com/image.jpg"
          fallback="https://via.placeholder.com/400x300?text=Fallback+Image"
          alt="加载失败示例"
          width={400}
          height={300}
        />
      </CodeBlock>

      <CodeBlock
        title="填充模式"
        description="通过 fit 属性设置图片的填充模式。"
        code={fitExample}
        language="tsx"
      >
        <Space>
          <div>
            <p style={{ marginBottom: '8px', textAlign: 'center' }}>fill</p>
            <Image
              src="https://picsum.photos/800/400"
              width={200}
              height={200}
              fit="fill"
            />
          </div>
          <div>
            <p style={{ marginBottom: '8px', textAlign: 'center' }}>contain</p>
            <Image
              src="https://picsum.photos/800/400"
              width={200}
              height={200}
              fit="contain"
            />
          </div>
          <div>
            <p style={{ marginBottom: '8px', textAlign: 'center' }}>cover</p>
            <Image
              src="https://picsum.photos/800/400"
              width={200}
              height={200}
              fit="cover"
            />
          </div>
        </Space>
      </CodeBlock>

      <h2 style={docHeadingStyles.h2}>预览操作</h2>
      <p style={docParagraphStyles.normal}>预览模式下支持以下操作：</p>
      <ul style={docParagraphStyles.normal}>
        <li>鼠标滚轮：缩放图片</li>
        <li>ESC 键：关闭预览</li>
        <li>+/- 键：放大/缩小</li>
        <li>Space 键：重置图片</li>
        <li>工具栏按钮：缩放、旋转、下载</li>
      </ul>

      <h2 style={docHeadingStyles.h2}>API</h2>
      <PropsTable data={imageProps} />
    </div>
  )
}

export default ImageDocs
