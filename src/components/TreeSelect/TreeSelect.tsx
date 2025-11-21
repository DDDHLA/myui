import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils'
import { TreeSelectProps, TreeNode } from '@/types'
import './TreeSelect.css'

const TreeSelect = ({
  value: controlledValue,
  defaultValue,
  onChange,
  treeData,
  placeholder = '请选择',
  multiple = false,
  checkable = false,
  searchable = false,
  clearable = false,
  disabled = false,
  loading = false,
  showCheckedStrategy = 'all',
  defaultExpandAll = false,
  defaultExpandedKeys = [],
  expandedKeys: controlledExpandedKeys,
  onExpand,
  autoExpandParent = true,
  checkStrictly = false,
  showLine = false,
  showIcon = true,
  filterTreeNode,
  treeNodeFilterProp = 'label',
  loadData,
  size = 'md',
  error = false,
  maxTagCount,
  maxTagPlaceholder,
  treeHeight = 256,
  onSearch,
  onClear,
  onDropdownVisibleChange,
  onSelect,
  notFoundContent = '暂无数据',
  virtual = false,
  className,
  ...props
}: TreeSelectProps) => {
  const [internalValue, setInternalValue] = useState<string | number | (string | number)[]>(
    defaultValue || (multiple || checkable ? [] : '')
  )
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [expandedKeys, setExpandedKeys] = useState<(string | number)[]>(
    controlledExpandedKeys || defaultExpandedKeys
  )
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })
  const [loadingKeys, setLoadingKeys] = useState<Set<string | number>>(new Set())

  const selectRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const value = controlledValue !== undefined ? controlledValue : internalValue
  const currentExpandedKeys =
    controlledExpandedKeys !== undefined ? controlledExpandedKeys : expandedKeys

  // 获取所有节点的扁平化列表
  const flattenTreeData = useCallback((nodes: TreeNode[], parentKey?: string | number): Map<string | number, TreeNode & { parent?: string | number; level: number }> => {
    const map = new Map()
    const traverse = (nodes: TreeNode[], level = 0, parentKey?: string | number) => {
      nodes.forEach((node) => {
        map.set(node.key, { ...node, parent: parentKey, level })
        if (node.children) {
          traverse(node.children, level + 1, node.key)
        }
      })
    }
    traverse(nodes)
    return map
  }, [])

  const flatNodes = useMemo(() => flattenTreeData(treeData), [treeData, flattenTreeData])

  // 获取所有子节点的 keys
  const getChildKeys = useCallback(
    (key: string | number): (string | number)[] => {
      const keys: (string | number)[] = []
      const node = flatNodes.get(key)
      if (node?.children) {
        const traverse = (children: TreeNode[]) => {
          children.forEach((child) => {
            keys.push(child.key)
            if (child.children) {
              traverse(child.children)
            }
          })
        }
        traverse(node.children)
      }
      return keys
    },
    [flatNodes]
  )

  // 获取所有父节点的 keys
  const getParentKeys = useCallback(
    (key: string | number): (string | number)[] => {
      const keys: (string | number)[] = []
      let currentKey: string | number | undefined = key
      while (currentKey) {
        const node = flatNodes.get(currentKey)
        if (node?.parent) {
          keys.push(node.parent)
          currentKey = node.parent
        } else {
          break
        }
      }
      return keys
    },
    [flatNodes]
  )

  // 初始化展开所有节点
  useEffect(() => {
    if (defaultExpandAll && currentExpandedKeys.length === 0) {
      const allKeys = Array.from(flatNodes.keys())
      setExpandedKeys(allKeys)
    }
  }, [defaultExpandAll, flatNodes])

  // 搜索过滤
  const filteredTreeData = useMemo(() => {
    if (!searchValue) return treeData

    const filter = (nodes: TreeNode[]): TreeNode[] => {
      return nodes
        .map((node) => {
          const matches = filterTreeNode
            ? filterTreeNode(searchValue, node)
            : node[treeNodeFilterProp as keyof TreeNode]
                ?.toString()
                .toLowerCase()
                .includes(searchValue.toLowerCase())

          const filteredChildren = node.children ? filter(node.children) : []

          if (matches || filteredChildren.length > 0) {
            return {
              ...node,
              children: filteredChildren.length > 0 ? filteredChildren : node.children,
            }
          }
          return null
        })
        .filter(Boolean) as TreeNode[]
    }

    return filter(treeData)
  }, [treeData, searchValue, filterTreeNode, treeNodeFilterProp])

  // 自动展开搜索结果的父节点
  useEffect(() => {
    if (searchValue && autoExpandParent) {
      const keysToExpand = new Set<string | number>()
      const traverse = (nodes: TreeNode[]) => {
        nodes.forEach((node) => {
          if (node.children && node.children.length > 0) {
            keysToExpand.add(node.key)
            traverse(node.children)
          }
        })
      }
      traverse(filteredTreeData)
      setExpandedKeys(Array.from(keysToExpand))
    }
  }, [searchValue, autoExpandParent, filteredTreeData])

  // 获取选中的节点
  const selectedNodes = useMemo(() => {
    const values = Array.isArray(value) ? value : [value]
    return values
      .map((v) => flatNodes.get(v))
      .filter(Boolean) as TreeNode[]
  }, [value, flatNodes])

  // 处理点击外部
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchValue('')
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // 计算下拉框位置
  const updateDropdownPosition = useCallback(() => {
    if (selectRef.current && isOpen) {
      const rect = selectRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top

      const dropdownHeight = Math.min(treeHeight + 8, 400)
      const shouldOpenUpward = spaceBelow < dropdownHeight && spaceAbove > spaceBelow

      setDropdownPosition({
        top: shouldOpenUpward ? rect.top - dropdownHeight - 4 : rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      })
    }
  }, [isOpen, treeHeight])

  // 处理下拉框可见性改变
  useEffect(() => {
    onDropdownVisibleChange?.(isOpen)
    if (isOpen) {
      updateDropdownPosition()
      const handleResize = () => updateDropdownPosition()
      window.addEventListener('scroll', handleResize, true)
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('scroll', handleResize, true)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [isOpen, onDropdownVisibleChange, updateDropdownPosition])

  // 处理节点展开/折叠
  const handleExpand = useCallback(
    async (key: string | number, node: TreeNode) => {
      const isExpanded = currentExpandedKeys.includes(key)
      let newExpandedKeys: (string | number)[]

      if (isExpanded) {
        newExpandedKeys = currentExpandedKeys.filter((k) => k !== key)
      } else {
        newExpandedKeys = [...currentExpandedKeys, key]

        // 异步加载子节点
        if (loadData && !node.children && !node.isLeaf) {
          setLoadingKeys((prev) => new Set(prev).add(key))
          try {
            await loadData(node)
          } finally {
            setLoadingKeys((prev) => {
              const next = new Set(prev)
              next.delete(key)
              return next
            })
          }
        }
      }

      if (controlledExpandedKeys === undefined) {
        setExpandedKeys(newExpandedKeys)
      }
      onExpand?.(newExpandedKeys)
    },
    [currentExpandedKeys, loadData, controlledExpandedKeys, onExpand]
  )

  // 处理节点选择（用于单选模式）
  const handleSelect = useCallback(
    (node: TreeNode) => {
      if (node.disabled || node.selectable === false) return
      if (checkable || multiple) return // checkable 或 multiple 模式下不使用此方法

      const newValue = node.value

      if (!multiple) {
        setInternalValue(newValue)
        onChange?.(newValue, node)
        onSelect?.(newValue, node)
        setIsOpen(false)
        setSearchValue('')
      }
    },
    [checkable, multiple, onChange, onSelect]
  )

  // 处理节点勾选（用于多选/checkable模式）
  const handleCheck = useCallback(
    (node: TreeNode, checked: boolean) => {
      if (node.disabled || node.disableCheckbox) return

      let newValue: (string | number)[]
      const currentValues = Array.isArray(value) ? value : []

      if (checkStrictly) {
        // 父子不关联
        if (checked) {
          newValue = [...currentValues, node.value]
        } else {
          newValue = currentValues.filter((v) => v !== node.value)
        }
      } else {
        // 父子关联
        const childKeys = getChildKeys(node.key)
        const allRelatedKeys = [node.key, ...childKeys]

        if (checked) {
          // 选中节点及其所有子节点
          const keysToAdd = allRelatedKeys.filter((k) => {
            const n = flatNodes.get(k)
            return n && !n.disabled && n.checkable !== false
          })
          newValue = [...new Set([...currentValues, ...keysToAdd.map((k) => flatNodes.get(k)!.value)])]

          // 检查是否需要选中父节点
          const parentKeys = getParentKeys(node.key)
          parentKeys.forEach((parentKey) => {
            const parentNode = flatNodes.get(parentKey)
            if (parentNode) {
              const allChildren = getChildKeys(parentKey)
              const allChildrenChecked = allChildren.every((childKey) => {
                const childNode = flatNodes.get(childKey)
                return (
                  childNode &&
                  (newValue.includes(childNode.value) ||
                    childNode.disabled ||
                    childNode.checkable === false)
                )
              })
              if (allChildrenChecked) {
                newValue.push(parentNode.value)
              }
            }
          })
        } else {
          // 取消选中节点及其所有子节点和父节点
          const keysToRemove = allRelatedKeys.map((k) => flatNodes.get(k)!.value)
          const parentKeys = getParentKeys(node.key)
          const parentValues = parentKeys.map((k) => flatNodes.get(k)!.value)

          newValue = currentValues.filter(
            (v) => !keysToRemove.includes(v) && !parentValues.includes(v)
          )
        }
      }

      // 去重
      newValue = [...new Set(newValue)]

      setInternalValue(newValue)

      const selectedNodes = newValue
        .map((v) => Array.from(flatNodes.values()).find((n) => n.value === v))
        .filter(Boolean) as TreeNode[]

      onChange?.(newValue, selectedNodes)
    },
    [
      value,
      checkStrictly,
      getChildKeys,
      getParentKeys,
      flatNodes,
      onChange,
    ]
  )

  // 处理清空
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      const newValue = multiple || checkable ? [] : ''
      setInternalValue(newValue)
      onChange?.(newValue, multiple || checkable ? [] : undefined)
      onClear?.()
      setSearchValue('')
    },
    [multiple, checkable, onChange, onClear]
  )

  // 处理搜索
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setSearchValue(newValue)
      onSearch?.(newValue)
    },
    [onSearch]
  )

  // 移除标签
  const handleRemoveTag = useCallback(
    (nodeValue: string | number, e: React.MouseEvent) => {
      e.stopPropagation()
      if (Array.isArray(value)) {
        const node = Array.from(flatNodes.values()).find((n) => n.value === nodeValue)
        if (node) {
          handleCheck(node, false)
        }
      }
    },
    [value, flatNodes, handleCheck]
  )

  // 渲染选中的值
  const renderValue = () => {
    if (loading) {
      return <span className="myui-tree-select__placeholder">加载中...</span>
    }

    if (selectedNodes.length === 0) {
      return <span className="myui-tree-select__placeholder">{placeholder}</span>
    }

    if (multiple || checkable) {
      const displayTags =
        maxTagCount && selectedNodes.length > maxTagCount
          ? selectedNodes.slice(0, maxTagCount)
          : selectedNodes

      return (
        <div className="myui-tree-select__tags">
          {displayTags.map((node) => (
            <span key={node.value} className="myui-tree-select__tag">
              {node.label}
              <span
                className="myui-tree-select__tag-close"
                onClick={(e) => handleRemoveTag(node.value, e)}
              >
                ×
              </span>
            </span>
          ))}
          {maxTagCount && selectedNodes.length > maxTagCount && (
            <span className="myui-tree-select__tag myui-tree-select__tag--more">
              {maxTagPlaceholder
                ? maxTagPlaceholder(selectedNodes.slice(maxTagCount).map((n) => n.value))
                : `+${selectedNodes.length - maxTagCount}`}
            </span>
          )}
        </div>
      )
    }

    return <span className="myui-tree-select__value">{selectedNodes[0]?.label}</span>
  }

  // 渲染树节点
  const renderTreeNode = (node: TreeNode, level: number = 0): React.ReactNode => {
    const isExpanded = currentExpandedKeys.includes(node.key)
    const isSelected = Array.isArray(value)
      ? value.includes(node.value)
      : value === node.value
    const hasChildren = node.children && node.children.length > 0
    const isLoading = loadingKeys.has(node.key)

    // 计算半选状态（仅在父子关联且有子节点时）
    const isIndeterminate = (() => {
      if (checkStrictly || !hasChildren || !Array.isArray(value)) return false

      const childKeys = getChildKeys(node.key)
      if (childKeys.length === 0) return false;
      
      const checkedChildCount = childKeys.filter((k) => {
        const childNode = flatNodes.get(k)
        return childNode && value.includes(childNode.value)
      }).length

      return checkedChildCount > 0 && checkedChildCount < childKeys.length
    })();

    return (
      <div key={node.key} className="myui-tree-select__tree-node-wrapper">
        <div
          className={cn('myui-tree-select__tree-node', {
            'myui-tree-select__tree-node--selected': isSelected && !checkable,
            'myui-tree-select__tree-node--disabled': node.disabled,
          })}
          style={{ paddingLeft: `${level * 24 + 8}px` }}
        >
          {/* 展开/折叠图标 */}
          {(hasChildren || (loadData && !node.isLeaf)) && (
            <span
              className={cn('myui-tree-select__expand-icon', {
                'myui-tree-select__expand-icon--expanded': isExpanded,
                'myui-tree-select__expand-icon--loading': isLoading,
              })}
              onClick={(e) => {
                e.stopPropagation()
                handleExpand(node.key, node)
              }}
            >
              {isLoading ? (
                <svg className="myui-tree-select__spinner" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="6" />
                </svg>
              ) : (
                <svg viewBox="0 0 16 16" width="16" height="16">
                  <path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              )}
            </span>
          )}

          {/* 占位 */}
          {!hasChildren && !loadData && (
            <span className="myui-tree-select__expand-icon myui-tree-select__expand-icon--leaf" />
          )}

          {/* 复选框 */}
          {(checkable || multiple) && !node.disableCheckbox && (
            <label
              className={cn('myui-tree-select__checkbox', {
                'myui-tree-select__checkbox--checked': isSelected,
                'myui-tree-select__checkbox--indeterminate': isIndeterminate,
                'myui-tree-select__checkbox--disabled': node.disabled,
              })}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                checked={isSelected}
                disabled={node.disabled}
                onChange={(e) => handleCheck(node, e.target.checked)}
              />
              <span className="myui-tree-select__checkbox-inner">
                {isIndeterminate ? (
                  <svg viewBox="0 0 16 16" width="10" height="10">
                    <path d="M3 8h10" stroke="currentColor" strokeWidth="2" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" width="10" height="10">
                    <path
                      d="M3 8l3 3 7-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                )}
              </span>
            </label>
          )}

          {/* 图标 */}
          {showIcon && node.icon && (
            <span className="myui-tree-select__node-icon">{node.icon}</span>
          )}

          {/* 标签 */}
          <span
            className="myui-tree-select__node-label"
            onClick={() => !checkable && handleSelect(node)}
          >
            {node.label}
          </span>
        </div>

        {/* 子节点 */}
        <AnimatePresence>
          {isExpanded && hasChildren && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden' }}
            >
              {node.children!.map((child) => renderTreeNode(child, level + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // 渲染树
  const renderTree = () => {
    if (loading) {
      return (
        <div className="myui-tree-select__loading">
          <div className="myui-tree-select__spinner-wrapper">
            <svg className="myui-tree-select__spinner" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="6" />
            </svg>
          </div>
          <span>加载中...</span>
        </div>
      )
    }

    if (filteredTreeData.length === 0) {
      return <div className="myui-tree-select__empty">{notFoundContent}</div>
    }

    return (
      <div className="myui-tree-select__tree" style={{ maxHeight: treeHeight }}>
        {filteredTreeData.map((node) => renderTreeNode(node))}
      </div>
    )
  }

  const showClear = clearable && !disabled && selectedNodes.length > 0 && !loading

  return (
    <div
      ref={selectRef}
      className={cn(
        'myui-tree-select',
        `myui-tree-select--${size}`,
        isOpen && 'myui-tree-select--open',
        disabled && 'myui-tree-select--disabled',
        error && 'myui-tree-select--error',
        className
      )}
      {...props}
    >
      <div
        className="myui-tree-select__selector"
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {searchable && isOpen ? (
          <input
            ref={inputRef}
            type="text"
            className="myui-tree-select__search"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder={placeholder}
            autoFocus
          />
        ) : (
          renderValue()
        )}

        <div className="myui-tree-select__actions">
          {showClear && (
            <span className="myui-tree-select__clear" onClick={handleClear}>
              ×
            </span>
          )}
          <span
            className={cn(
              'myui-tree-select__arrow',
              isOpen && 'myui-tree-select__arrow--open'
            )}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            className="myui-tree-select__dropdown"
            style={{
              position: 'fixed',
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderTree()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

TreeSelect.displayName = 'TreeSelect'

export default TreeSelect
