import AnimatedNumberDemo from '@/components/AnimatedNumber/AnimatedNumberDemo'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const AnimatedNumberDocs = () => {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>AnimatedNumber 数字滚动</h1>
        <p style={docParagraphStyles.lead}>
          数字滚动动画组件，适用于数据统计、实时更新等场景，支持千分位分隔符、前缀、后缀等配置。
        </p>
      </div>

      <AnimatedNumberDemo />
    </div>
  )
}

export default AnimatedNumberDocs
