import React, { useState, useMemo, useCallback } from 'react'
import { cn } from '@/utils'
import { TableProps, TableColumn, SortOrder } from '@/types'
import './Table.css'

function Table<T extends Record<string, unknown>>({
  columns,
  dataSource,
  rowKey = 'id',
  className,
  bordered = false,
  striped = false,
  hoverable = true,
  size = 'md',
  loading = false,
  empty,
  pagination,
  sortOrder: externalSortOrder,
  sortColumn: externalSortColumn,
  onSort,
  rowSelection,
  onRow,
  scroll,
  ...props
}: TableProps<T>) {
  const [internalSortOrder, setInternalSortOrder] = useState<SortOrder>(null)
  const [internalSortColumn, setInternalSortColumn] = useState<string>('')
  const [selectedKeys, setSelectedKeys] = useState<string[]>(rowSelection?.selectedRowKeys || [])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const sortOrder = externalSortOrder !== undefined ? externalSortOrder : internalSortOrder
  const sortColumn = externalSortColumn !== undefined ? externalSortColumn : internalSortColumn

  // 获取行的key
  const getRowKey = useCallback((record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record)
    }
    return record[rowKey] !== undefined ? String(record[rowKey]) : String(index)
  }, [rowKey])

  // 排序处理
  const handleSort = useCallback((column: TableColumn<T>) => {
    if (!column.sortable) return

    const columnKey = column.dataIndex || column.key
    let newOrder: SortOrder = 'ascend'

    if (sortColumn === columnKey) {
      if (sortOrder === 'ascend') {
        newOrder = 'descend'
      } else if (sortOrder === 'descend') {
        newOrder = null
      }
    }

    setInternalSortOrder(newOrder)
    setInternalSortColumn(columnKey)
    onSort?.(columnKey, newOrder)
  }, [sortColumn, sortOrder, onSort])

  // 排序后的数据
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortOrder) return dataSource

    return [...dataSource].sort((a, b) => {
      const aValue = a[sortColumn] as unknown
      const bValue = b[sortColumn] as unknown

      if (aValue === bValue) return 0

      // 处理 null/undefined 值
      if (aValue == null) return 1
      if (bValue == null) return -1

      // 尝试转换为可比较的值
      const aNum = typeof aValue === 'number' ? aValue : Number(aValue)
      const bNum = typeof bValue === 'number' ? bValue : Number(bValue)
      
      if (!isNaN(aNum) && !isNaN(bNum)) {
        const compareResult = aNum > bNum ? 1 : -1
        return sortOrder === 'ascend' ? compareResult : -compareResult
      }

      // 字符串比较
      const aStr = String(aValue)
      const bStr = String(bValue)
      const compareResult = aStr > bStr ? 1 : -1
      return sortOrder === 'ascend' ? compareResult : -compareResult
    })
  }, [dataSource, sortColumn, sortOrder])

  // 分页后的数据
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData

    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    return sortedData.slice(start, end)
  }, [sortedData, pagination, currentPage, pageSize])

  // 选择处理
  const handleSelectAll = useCallback((checked: boolean) => {
    const newSelectedKeys = checked
      ? paginatedData.map((record, index) => getRowKey(record, index))
      : []
    
    setSelectedKeys(newSelectedKeys)
    rowSelection?.onChange?.(newSelectedKeys, checked ? paginatedData : [])
  }, [paginatedData, getRowKey, rowSelection])

  const handleSelectRow = useCallback((record: T, index: number, checked: boolean) => {
    const key = getRowKey(record, index)
    const newSelectedKeys = checked
      ? [...selectedKeys, key]
      : selectedKeys.filter(k => k !== key)
    
    setSelectedKeys(newSelectedKeys)
    
    const selectedRows = paginatedData.filter((r, i) => 
      newSelectedKeys.includes(getRowKey(r, i))
    )
    rowSelection?.onChange?.(newSelectedKeys, selectedRows)
  }, [selectedKeys, paginatedData, getRowKey, rowSelection])

  // 分页处理
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    if (typeof pagination === 'object') {
      pagination.onChange?.(page, pageSize)
    }
  }, [pagination, pageSize])

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize)
    setCurrentPage(1)
    if (typeof pagination === 'object') {
      pagination.onShowSizeChange?.(1, newPageSize)
    }
  }, [pagination])

  // 渲染表头
  const renderHeader = () => {
    const allColumns: TableColumn<T>[] = []

    // 添加选择列
    if (rowSelection) {
      allColumns.push({
        key: '__selection__',
        title: rowSelection.type !== 'radio' ? (
          <input
            type="checkbox"
            checked={selectedKeys.length === paginatedData.length && paginatedData.length > 0}
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="myui-table__checkbox"
          />
        ) : '',
        width: rowSelection.columnWidth || 50,
        align: 'center',
      })
    }

    allColumns.push(...columns)

    return (
      <thead className="myui-table__thead">
        <tr>
          {allColumns.map((column) => (
            <th
              key={column.key}
              className={cn(
                'myui-table__th',
                column.align && `myui-table__th--${column.align}`,
                column.sortable && 'myui-table__th--sortable',
                column.fixed && `myui-table__th--fixed-${column.fixed}`
              )}
              style={{ width: column.width }}
              onClick={() => column.sortable && handleSort(column)}
            >
              <div className="myui-table__th-content">
                {column.title}
                {column.sortable && (
                  <span className="myui-table__sort-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 4l-8 8h16l-8-8z"
                        fill={sortColumn === (column.dataIndex || column.key) && sortOrder === 'ascend' ? 'currentColor' : '#d1d5db'}
                      />
                      <path
                        d="M12 20l8-8H4l8 8z"
                        fill={sortColumn === (column.dataIndex || column.key) && sortOrder === 'descend' ? 'currentColor' : '#d1d5db'}
                      />
                    </svg>
                  </span>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
    )
  }

  // 渲染表体
  const renderBody = () => {
    if (loading) {
      return (
        <tbody>
          <tr>
            <td colSpan={columns.length + (rowSelection ? 1 : 0)} className="myui-table__loading">
              <div className="myui-table__loading-content">
                <div className="myui-table__spinner" />
                <span>加载中...</span>
              </div>
            </td>
          </tr>
        </tbody>
      )
    }

    if (paginatedData.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={columns.length + (rowSelection ? 1 : 0)} className="myui-table__empty">
              {empty || (
                <div className="myui-table__empty-content">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <rect x="8" y="16" width="48" height="40" rx="2" stroke="currentColor" strokeWidth="2" />
                    <line x1="16" y1="24" x2="48" y2="24" stroke="currentColor" strokeWidth="2" />
                    <line x1="16" y1="32" x2="48" y2="32" stroke="currentColor" strokeWidth="2" />
                    <line x1="16" y1="40" x2="36" y2="40" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <p>暂无数据</p>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      )
    }

    return (
      <tbody className="myui-table__tbody">
        {paginatedData.map((record, index) => {
          const key = getRowKey(record, index)
          const isSelected = selectedKeys.includes(key)
          const rowProps = onRow?.(record, index) || {}

          return (
            <tr
              key={key}
              className={cn(
                'myui-table__tr',
                isSelected && 'myui-table__tr--selected'
              )}
              {...rowProps}
            >
              {rowSelection && (
                <td className="myui-table__td myui-table__td--center">
                  <input
                    type={rowSelection.type || 'checkbox'}
                    checked={isSelected}
                    onChange={(e) => handleSelectRow(record, index, e.target.checked)}
                    className="myui-table__checkbox"
                  />
                </td>
              )}
              {columns.map((column) => {
                const value = column.dataIndex ? record[column.dataIndex] : undefined
                const content = column.render
                  ? column.render(value, record, index)
                  : (value as React.ReactNode)

                return (
                  <td
                    key={column.key}
                    className={cn(
                      'myui-table__td',
                      column.align && `myui-table__td--${column.align}`,
                      column.fixed && `myui-table__td--fixed-${column.fixed}`
                    )}
                  >
                    {content}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    )
  }

  // 渲染分页
  const renderPagination = () => {
    if (!pagination) return null

    const paginationConfig = typeof pagination === 'object' ? pagination : {}
    const total = paginationConfig.total || sortedData.length
    const current = paginationConfig.current || currentPage
    const size = paginationConfig.pageSize || pageSize
    const totalPages = Math.ceil(total / size)

    if (totalPages <= 1) return null

    return (
      <div className="myui-table__pagination">
        <button
          className="myui-table__pagination-btn"
          disabled={current === 1}
          onClick={() => handlePageChange(current - 1)}
        >
          上一页
        </button>
        <span className="myui-table__pagination-info">
          第 {current} / {totalPages} 页，共 {total} 条
        </span>
        <button
          className="myui-table__pagination-btn"
          disabled={current === totalPages}
          onClick={() => handlePageChange(current + 1)}
        >
          下一页
        </button>
        {paginationConfig.showSizeChanger && (
          <select
            className="myui-table__pagination-size"
            value={size}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          >
            <option value={10}>10 条/页</option>
            <option value={20}>20 条/页</option>
            <option value={50}>50 条/页</option>
            <option value={100}>100 条/页</option>
          </select>
        )}
      </div>
    )
  }

  return (
    <div className={cn('myui-table-wrapper', className)} {...props}>
      <div
        className={cn(
          'myui-table-container',
          scroll && 'myui-table-container--scroll'
        )}
        style={{
          overflowX: scroll?.x ? 'auto' : undefined,
          maxHeight: scroll?.y,
        }}
      >
        <table
          className={cn(
            'myui-table',
            `myui-table--${size}`,
            bordered && 'myui-table--bordered',
            striped && 'myui-table--striped',
            hoverable && 'myui-table--hoverable'
          )}
        >
          {renderHeader()}
          {renderBody()}
        </table>
      </div>
      {renderPagination()}
    </div>
  )
}

Table.displayName = 'Table'

export default Table
