import React, { useState } from 'react'
import Upload from './Upload'
import { UploadFile } from './Upload.types'
import { Button } from '../index'
import CodeBlock from '../CodeBlock'
import PropsTable from '../PropsTable'

const UploadDemo: React.FC = () => {
  const [fileList1, setFileList1] = useState<UploadFile[]>([])
  const [fileList2, setFileList2] = useState<UploadFile[]>([])
  const [fileList3, setFileList3] = useState<UploadFile[]>([])

  const uploadProps = [
    { name: 'accept', type: 'string', default: '-', description: '接受上传的文件类型（如：image/*,.pdf）' },
    { name: 'multiple', type: 'boolean', default: 'false', description: '是否支持多选文件' },
    { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
    { name: 'listType', type: "'text' | 'picture' | 'picture-card'", default: "'text'", description: '上传列表的内建样式' },
    { name: 'maxCount', type: 'number', default: '-', description: '最大允许上传数量' },
    { name: 'maxSize', type: 'number', default: '-', description: '文件大小限制（MB）' },
    { name: 'showUploadList', type: 'boolean', default: 'true', description: '是否显示上传列表' },
    { name: 'drag', type: 'boolean', default: 'false', description: '是否开启拖拽上传' },
    { name: 'dragText', type: 'string', default: "'点击或拖拽文件到此区域上传'", description: '拖拽区域提示文字' },
    { name: 'beforeUpload', type: '(file, fileList) => boolean | Promise', default: '-', description: '上传文件之前的钩子' },
    { name: 'onChange', type: '(file, fileList) => void', default: '-', description: '文件状态改变的回调' },
    { name: 'onPreview', type: '(file) => void', default: '-', description: '点击文件链接或预览图标时的回调' },
    { name: 'onRemove', type: '(file) => boolean | Promise', default: '-', description: '文件移除时的回调' },
    { name: 'onSuccess', type: '(response, file) => void', default: '-', description: '上传成功的回调' },
    { name: 'onError', type: '(error, file) => void', default: '-', description: '上传失败的回调' },
    { name: 'onProgress', type: '(percent, file) => void', default: '-', description: '上传进度的回调' },
  ]

  return (
    <div className="docs-content">
      <h1>Upload 上传</h1>
      <p className="docs-description">文件选择上传和拖拽上传控件，支持多种上传模式和文件验证。</p>

      {/* 基础用法 */}
      <section className="docs-section">
        <h2>基础用法</h2>
        <p>点击按钮选择文件上传。</p>
        <div className="docs-example">
          <Upload>
            <Button>点击上传</Button>
          </Upload>
        </div>
        <CodeBlock language="tsx" code={`import { Upload, Button } from '@/components';

<Upload>
  <Button>点击上传</Button>
</Upload>`} />
      </section>

      {/* 拖拽上传 */}
      <section className="docs-section">
        <h2>拖拽上传</h2>
        <p>支持拖拽文件到指定区域上传。</p>
        <div className="docs-example">
          <Upload drag multiple />
        </div>
        <CodeBlock language="tsx" code={`<Upload drag multiple />`} />
      </section>

      {/* 多文件上传 */}
      <section className="docs-section">
        <h2>多文件上传</h2>
        <p>设置 <code>multiple</code> 属性支持多文件选择。</p>
        <div className="docs-example">
          <Upload multiple fileList={fileList1} onChange={(_file, list) => setFileList1(list)}>
            <Button>选择多个文件</Button>
          </Upload>
        </div>
        <CodeBlock language="tsx" code={`const [fileList, setFileList] = useState<UploadFile[]>([]);

<Upload
  multiple
  fileList={fileList}
  onChange={(_file, list) => setFileList(list)}
>
  <Button>选择多个文件</Button>
</Upload>`} />
      </section>

      {/* 文件类型限制 */}
      <section className="docs-section">
        <h2>文件类型限制</h2>
        <p>通过 <code>accept</code> 属性限制上传文件类型。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Upload accept="image/*"><Button>只能上传图片</Button></Upload>
            <Upload accept=".pdf,.doc,.docx"><Button>只能上传文档</Button></Upload>
          </div>
        </div>
        <CodeBlock language="tsx" code={`<Upload accept="image/*">
  <Button>只能上传图片</Button>
</Upload>

<Upload accept=".pdf,.doc,.docx">
  <Button>只能上传文档</Button>
</Upload>`} />
      </section>

      {/* 文件大小和数量限制 */}
      <section className="docs-section">
        <h2>文件大小和数量限制</h2>
        <p>通过 <code>maxSize</code> 和 <code>maxCount</code> 属性限制文件大小和数量。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Upload maxSize={2}><Button>最大2MB</Button></Upload>
            <Upload multiple maxCount={3}><Button>最多3个文件</Button></Upload>
          </div>
        </div>
        <CodeBlock language="tsx" code={`<Upload maxSize={2}>
  <Button>最大2MB</Button>
</Upload>

<Upload multiple maxCount={3}>
  <Button>最多3个文件</Button>
</Upload>`} />
      </section>

      {/* 图片列表样式 */}
      <section className="docs-section">
        <h2>图片列表样式</h2>
        <p>设置 <code>listType="picture"</code> 显示缩略图列表。</p>
        <div className="docs-example">
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
        </div>
        <CodeBlock language="tsx" code={`<Upload
  listType="picture"
  accept="image/*"
  multiple
  fileList={fileList}
  onChange={(_file, list) => setFileList(list)}
  onPreview={(file) => file.thumbUrl && window.open(file.thumbUrl)}
>
  <Button>上传图片</Button>
</Upload>`} />
      </section>

      {/* 照片墙 */}
      <section className="docs-section">
        <h2>照片墙</h2>
        <p>设置 <code>listType="picture-card"</code> 使用照片墙样式。</p>
        <div className="docs-example">
          <Upload
            listType="picture-card"
            accept="image/*"
            multiple
            maxCount={6}
            fileList={fileList3}
            onChange={(_file, list) => setFileList3(list)}
            onPreview={(file) => file.thumbUrl && window.open(file.thumbUrl)}
          />
        </div>
        <CodeBlock language="tsx" code={`<Upload
  listType="picture-card"
  accept="image/*"
  multiple
  maxCount={6}
  fileList={fileList}
  onChange={(_file, list) => setFileList(list)}
/>`} />
      </section>

      {/* 自定义上传前校验 */}
      <section className="docs-section">
        <h2>自定义上传前校验</h2>
        <p>使用 <code>beforeUpload</code> 在上传前进行校验。</p>
        <div className="docs-example">
          <Upload
            beforeUpload={(file) => {
              const isImage = file.type.startsWith('image/')
              if (!isImage) { alert('只能上传图片!'); return false }
              return true
            }}
          >
            <Button>只能上传图片</Button>
          </Upload>
        </div>
        <CodeBlock language="tsx" code={`<Upload
  beforeUpload={(file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      alert('只能上传图片!');
      return false;
    }
    return true;
  }}
>
  <Button>只能上传图片</Button>
</Upload>`} />
      </section>

      {/* 禁用状态 */}
      <section className="docs-section">
        <h2>禁用状态</h2>
        <p>设置 <code>disabled</code> 禁用上传功能。</p>
        <div className="docs-example">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Upload disabled><Button disabled>禁用上传</Button></Upload>
            <Upload drag disabled />
          </div>
        </div>
        <CodeBlock language="tsx" code={`<Upload disabled>
  <Button disabled>禁用上传</Button>
</Upload>

<Upload drag disabled />`} />
      </section>

      {/* 事件回调 */}
      <section className="docs-section">
        <h2>事件回调</h2>
        <p>监听上传的各个阶段，打开控制台查看日志。</p>
        <div className="docs-example">
          <Upload
            onChange={(file, list) => console.log('onChange:', file, list)}
            onSuccess={(res, file) => console.log('onSuccess:', res, file)}
            onProgress={(percent, file) => console.log('onProgress:', percent, file)}
            onRemove={(file) => { console.log('onRemove:', file); return true }}
          >
            <Button>上传并查看控制台</Button>
          </Upload>
        </div>
        <CodeBlock language="tsx" code={`<Upload
  onChange={(file, list) => console.log('onChange:', file, list)}
  onSuccess={(response, file) => console.log('onSuccess:', response, file)}
  onProgress={(percent, file) => console.log('onProgress:', percent, file)}
  onRemove={(file) => {
    console.log('onRemove:', file);
    return window.confirm('确定删除?');
  }}
>
  <Button>上传并查看控制台</Button>
</Upload>`} />
      </section>

      {/* API */}
      <section className="docs-section">
        <h2>API</h2>
        <h3>Upload Props</h3>
        <PropsTable data={uploadProps} />
      </section>
    </div>
  )
}

export default UploadDemo
