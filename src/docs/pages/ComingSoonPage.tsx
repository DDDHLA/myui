import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

interface ComingSoonPageProps {
  title: string
  description?: string
}

const ComingSoonPage = ({ title, description = '组件正在开发中...' }: ComingSoonPageProps) => {
  return (
    <div>
      <h1 style={docHeadingStyles.h1}>{title}</h1>
      <p style={docParagraphStyles.lead}>{description}</p>
    </div>
  )
}

export default ComingSoonPage
