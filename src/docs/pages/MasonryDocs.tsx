import MasonryDemo from '@/components/Masonry/MasonryDemo'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const MasonryDocs = () => {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Masonry 瀑布流布局</h1>
        <p style={docParagraphStyles.lead}>
          瀑布流布局组件，用于展示不同高度的内容项，自动分配到多列中，支持响应式。
        </p>
      </div>

      <MasonryDemo />
    </div>
  )
}

export default MasonryDocs
