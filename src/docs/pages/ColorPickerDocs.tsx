import ColorPickerDemo from '@/components/ColorPicker/ColorPickerDemo'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const ColorPickerDocs = () => {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>ColorPicker 颜色选择器</h1>
        <p style={docParagraphStyles.lead}>
          用于选择颜色的输入组件，支持色板选择、饱和度/亮度调节、HEX输入以及预设颜色功能。
        </p>
      </div>

      <ColorPickerDemo />
    </div>
  )
}

export default ColorPickerDocs
