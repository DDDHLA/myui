import VirtualListDemo from '@/components/VirtualList/VirtualListDemo'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const VirtualListDocs = () => {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>VirtualList 虚拟列表</h1>
        <p style={docParagraphStyles.lead}>
          高性能的长列表组件，仅渲染可视区域内的元素，轻松应对万级数据渲染。支持固定高度的列表项。
        </p>
      </div>

      <VirtualListDemo />
    </div>
  )
}

export default VirtualListDocs
