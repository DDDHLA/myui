import FormDemo from '@/components/Form/FormDemo'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const FormDocs = () => {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Form 表单</h1>
        <p style={docParagraphStyles.lead}>
          表单组件，支持多种布局方式、表单验证、错误提示等功能，配合useForm Hook使用更加便捷。
        </p>
      </div>

      <FormDemo />
    </div>
  )
}

export default FormDocs
