import { forwardRef, ReactNode } from 'react'
import { cn } from '@/utils'
import './Descriptions.css'

export interface DescriptionItem {
  label: ReactNode
  content: ReactNode
  span?: number
  labelStyle?: React.CSSProperties
  contentStyle?: React.CSSProperties
}

export interface DescriptionsProps {
  title?: ReactNode
  extra?: ReactNode
  column?: number
  size?: 'small' | 'middle' | 'large'
  layout?: 'horizontal' | 'vertical'
  colon?: boolean
  labelStyle?: React.CSSProperties
  contentStyle?: React.CSSProperties
  items?: DescriptionItem[]
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
}

const Descriptions = forwardRef<HTMLDivElement, DescriptionsProps>(
  (
    {
      title,
      extra,
      column = 3,
      size = 'middle',
      layout = 'horizontal',
      colon = true,
      labelStyle,
      contentStyle,
      items = [],
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // 渲染表头
    const renderHeader = () => {
      if (!title && !extra) return null

      return (
        <div className="myui-descriptions__header">
          {title && <div className="myui-descriptions__title">{title}</div>}
          {extra && <div className="myui-descriptions__extra">{extra}</div>}
        </div>
      )
    }

    // 渲染表格内容
    const renderTable = () => {
      if (items.length === 0) return null

      const rows: DescriptionItem[][] = []
      let currentRow: DescriptionItem[] = []
      let currentSpan = 0

      items.forEach((item) => {
        const itemSpan = item.span || 1
        
        if (currentSpan + itemSpan > column) {
          rows.push(currentRow)
          currentRow = [item]
          currentSpan = itemSpan
        } else {
          currentRow.push(item)
          currentSpan += itemSpan
        }
      })

      if (currentRow.length > 0) {
        rows.push(currentRow)
      }

      return (
        <table className="myui-descriptions__table">
          <tbody>
            {rows.map((row, rowIndex) => {
              if (layout === 'vertical') {
                // 垂直布局：每个项目单独占一行，标签和内容分两行显示
                return row.map((item, itemIndex) => (
                  <>
                    <tr key={`${rowIndex}-${itemIndex}-label`} className="myui-descriptions__row">
                      <th
                        className="myui-descriptions__label"
                        colSpan={column * 2}
                        style={{ ...labelStyle, ...item.labelStyle }}
                      >
                        {item.label}
                        {colon && ':'}
                      </th>
                    </tr>
                    <tr key={`${rowIndex}-${itemIndex}-content`} className="myui-descriptions__row">
                      <td
                        className="myui-descriptions__content"
                        colSpan={column * 2}
                        style={{ ...contentStyle, ...item.contentStyle }}
                      >
                        {item.content}
                      </td>
                    </tr>
                  </>
                ))
              }

              // 水平布局：标签和内容在同一行
              // 计算当前行已占用的列数
              let usedColumns = 0
              row.forEach(item => {
                usedColumns += item.span || 1
              })
              
              // 需要补齐的列数
              const emptyColumns = column - usedColumns

              return (
                <tr key={rowIndex} className="myui-descriptions__row">
                  {row.map((item, itemIndex) => (
                    <>
                      <th
                        key={`${itemIndex}-label`}
                        className="myui-descriptions__label"
                        style={{ ...labelStyle, ...item.labelStyle }}
                      >
                        {item.label}
                        {colon && ':'}
                      </th>
                      <td
                        key={`${itemIndex}-content`}
                        className="myui-descriptions__content"
                        colSpan={(item.span || 1) * 2 - 1}
                        style={{ ...contentStyle, ...item.contentStyle }}
                      >
                        {item.content}
                      </td>
                    </>
                  ))}
                  {/* 补齐空单元格 */}
                  {emptyColumns > 0 && (
                    <td
                      className="myui-descriptions__content myui-descriptions__content--empty"
                      colSpan={emptyColumns * 2}
                    />
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          'myui-descriptions',
          `myui-descriptions--${size}`,
          `myui-descriptions--${layout}`,
          className
        )}
        style={style}
        {...props}
      >
        {renderHeader()}
        {renderTable()}
        {children}
      </div>
    )
  }
)

Descriptions.displayName = 'Descriptions'

export default Descriptions
