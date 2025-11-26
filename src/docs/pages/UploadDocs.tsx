import React from 'react'
import { Upload, Button } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { UploadFile } from '@/components/Upload/Upload.types'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const UploadDocs = () => {
  const [fileList1, setFileList1] = React.useState<UploadFile[]>([])
  const [fileList2, setFileList2] = React.useState<UploadFile[]>([])
  const [fileList3, setFileList3] = React.useState<UploadFile[]>([])

  const uploadProps: PropItem[] = [
    {
      name: 'accept',
      type: 'string',
      description: '接受上传的文件类型(如:image/*,.pdf)'
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description: '是否支持多选文件'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: '是否禁用'
    },
    {
      name: 'listType',
      type: "'text' | 'picture' | 'picture-card'",
      default: "'text'",
      description: '上传列表的内建样式'
    },
    {
      name: 'maxCount',
      type: 'number',
      description: '最大允许上传数量'
    },
    {
      name: 'maxSize',
      type: 'number',
      description: '文件大小限制(MB)'
    },
    {
      name: 'showUploadList',
      type: 'boolean',
      default: 'true',
      description: '是否显示上传列表'
    },
    {
      name: 'drag',
      type: 'boolean',
      default: 'false',
      description: '是否开启拖拽上传'
    },
    {
      name: 'dragText',
      type: 'string',
      default: "'点击或拖拽文件到此区域上传'",
      description: '拖拽区域提示文字'
    },
    {
      name: 'beforeUpload',
      type: '(file, fileList) => boolean | Promise',
      description: '上传文件之前的钩子'
    },
    {
      name: 'onChange',
      type: '(file, fileList) => void',
      description: '文件状态改变的回调'
    },
    {
      name: 'onPreview',
      type: '(file) => void',
      description: '点击文件链接或预览图标时的回调'
    },
    {
      name: 'onRemove',
      type: '(file) => boolean | Promise',
      description: '文件移除时的回调'
    },
    {
      name: 'onSuccess',
      type: '(response, file) => void',
      description: '上传成功的回调'
    },
    {
      name: 'onError',
      type: '(error, file) => void',
      description: '上传失败的回调'
    },
    {
      name: 'onProgress',
      type: '(percent, file) => void',
      description: '上传进度的回调'
    }
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Upload 上传</h1>
        <p style={docParagraphStyles.lead}>
          文件选择上传和拖拽上传控件,支持多种上传模式和文件验证。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="点击按钮选择文件上传。"
        code={`import { Upload, Button } from '@myui/components'

function App() {
  return (
    <Upload>
      <Button>点击上传</Button>
    </Upload>
  )
}`}
      >
        <Upload>
          <Button>点击上传</Button>
        </Upload>
      </CodeBlock>

      <CodeBlock
        title="拖拽上传"
        description="支持拖拽文件到指定区域上传。"
        code={`import { Upload } from '@myui/components'

function App() {
  return <Upload drag multiple />
}`}
      >
        <Upload drag multiple />
      </CodeBlock>

      <CodeBlock
        title="多文件上传"
        description="设置 multiple 属性支持多文件选择。"
        code={`import { Upload, Button } from '@myui/components'
import { useState } from 'react'

function App() {
  const [fileList, setFileList] = useState([])

  return (
    <Upload
      multiple
      fileList={fileList}
      onChange={(file, list) => setFileList(list)}
    >
      <Button>选择多个文件</Button>
    </Upload>
  )
}`}
      >
        <Upload
          multiple
          fileList={fileList1}
          onChange={(_file, list) => setFileList1(list)}
        >
          <Button>选择多个文件</Button>
        </Upload>
      </CodeBlock>

      <CodeBlock
        title="文件类型限制"
        description="通过 accept 属性限制上传文件类型。"
        code={`import { Upload, Button } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Upload accept="image/*">
        <Button>只能上传图片</Button>
      </Upload>
      <Upload accept=".pdf,.doc,.docx">
        <Button>只能上传文档</Button>
      </Upload>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Upload accept="image/*">
            <Button>只能上传图片</Button>
          </Upload>
          <Upload accept=".pdf,.doc,.docx">
            <Button>只能上传文档</Button>
          </Upload>
        </div>
      </CodeBlock>

      <CodeBlock
        title="文件大小和数量限制"
        description="通过 maxSize 和 maxCount 属性限制文件大小和数量。"
        code={`import { Upload, Button } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Upload maxSize={2}>
        <Button>最大2MB</Button>
      </Upload>
      <Upload multiple maxCount={3}>
        <Button>最多3个文件</Button>
      </Upload>
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Upload maxSize={2}>
            <Button>最大2MB</Button>
          </Upload>
          <Upload multiple maxCount={3}>
            <Button>最多3个文件</Button>
          </Upload>
        </div>
      </CodeBlock>

      <CodeBlock
        title="图片列表样式"
        description="设置 listType='picture' 显示缩略图列表。"
        code={`import { Upload, Button } from '@myui/components'
import { useState } from 'react'

function App() {
  const [fileList, setFileList] = useState([])

  return (
    <Upload
      listType="picture"
      accept="image/*"
      multiple
      fileList={fileList}
      onChange={(file, list) => setFileList(list)}
      onPreview={(file) => file.thumbUrl && window.open(file.thumbUrl)}
    >
      <Button>上传图片</Button>
    </Upload>
  )
}`}
      >
        <Upload
          listType="picture"
          accept="image/*"
          multiple
          fileList={fileList2}
          onChange={(_file, list) => setFileList2(list)}
          onPreview={(file) => file.thumbUrl && window.open(file.thumbUrl)}
        >
          <Button>上传图片</Button>
        </Upload>
      </CodeBlock>

      <CodeBlock
        title="照片墙"
        description="设置 listType='picture-card' 使用照片墙样式。"
        code={`import { Upload } from '@myui/components'
import { useState } from 'react'

function App() {
  const [fileList, setFileList] = useState([])

  return (
    <Upload
      listType="picture-card"
      accept="image/*"
      multiple
      maxCount={6}
      fileList={fileList}
      onChange={(file, list) => setFileList(list)}
      onPreview={(file) => file.thumbUrl && window.open(file.thumbUrl)}
    />
  )
}`}
      >
        <Upload
          listType="picture-card"
          accept="image/*"
          multiple
          maxCount={6}
          fileList={fileList3}
          onChange={(_file, list) => setFileList3(list)}
          onPreview={(file) => file.thumbUrl && window.open(file.thumbUrl)}
        />
      </CodeBlock>

      <CodeBlock
        title="自定义上传前校验"
        description="使用 beforeUpload 在上传前进行校验。"
        code={`import { Upload, Button } from '@myui/components'

function App() {
  return (
    <Upload
      beforeUpload={(file) => {
        const isImage = file.type.startsWith('image/')
        if (!isImage) {
          alert('只能上传图片!')
          return false
        }
        return true
      }}
    >
      <Button>只能上传图片</Button>
    </Upload>
  )
}`}
      >
        <Upload
          beforeUpload={(file) => {
            const isImage = file.type.startsWith('image/')
            if (!isImage) {
              alert('只能上传图片!')
              return false
            }
            return true
          }}
        >
          <Button>只能上传图片</Button>
        </Upload>
      </CodeBlock>

      <CodeBlock
        title="禁用状态"
        description="设置 disabled 禁用上传功能。"
        code={`import { Upload, Button } from '@myui/components'

function App() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Upload disabled>
        <Button disabled>禁用上传</Button>
      </Upload>
      <Upload drag disabled />
    </div>
  )
}`}
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Upload disabled>
            <Button disabled>禁用上传</Button>
          </Upload>
          <Upload drag disabled />
        </div>
      </CodeBlock>

      <PropsTable data={uploadProps} />
    </div>
  )
}

export default UploadDocs
