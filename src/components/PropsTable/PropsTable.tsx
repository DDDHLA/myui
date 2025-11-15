import { cn } from '@/utils'
import './PropsTable.css'

export interface PropItem {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

interface PropsTableProps {
  title?: string
  data: PropItem[]
  className?: string
}

export function PropsTable({ title = 'API', data, className }: PropsTableProps) {
  return (
    <div className={cn('myui-props-table', className)}>
      <h3 className="myui-props-table__title">{title}</h3>
      <div className="myui-props-table__wrapper">
        <table className="myui-props-table__table">
          <thead>
            <tr>
              <th>属性</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            {data.map((prop, index) => (
              <tr key={index}>
                <td>
                  <code className="myui-props-table__prop-name">
                    {prop.name}
                    {prop.required && (
                      <span className="myui-props-table__required">*</span>
                    )}
                  </code>
                </td>
                <td className="myui-props-table__description">
                  {prop.description}
                </td>
                <td>
                  <code className="myui-props-table__type">{prop.type}</code>
                </td>
                <td>
                  {prop.default ? (
                    <code className="myui-props-table__default">{prop.default}</code>
                  ) : (
                    <span className="myui-props-table__no-default">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PropsTable
