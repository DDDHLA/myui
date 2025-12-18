import ParallaxDemo from '@/components/Parallax/ParallaxDemo'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const ParallaxDocs = () => {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Parallax 视差滚动</h1>
        <p style={docParagraphStyles.lead}>
          创建具有深度的滚动效果。支持背景视差和元素视差，可控制移动速度和方向。
        </p>
      </div>

      <ParallaxDemo />
    </div>
  )
}

export default ParallaxDocs
