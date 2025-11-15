import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { cn } from '@/utils'
import { SelectProps, SelectOption } from '@/types'
import './Select.css'

const Select = ({
  value: controlledValue,
  defaultValue,
  onChange,
  options,
  placeholder = '请选择',
  multiple = false,
  searchable = false,
  clearable = false,
  disabled = false,
  loading = false,
  size = 'md',
  error = false,
  notFoundContent = '暂无数据',
  maxTagCount,
  maxTagPlaceholder,
  onSearch,
  onClear,
  onDropdownVisibleChange,
  className,
  ...props
}: SelectProps) => {
  const [internalValue, setInternalValue] = useState<string | number | (string | number)[]>(
    defaultValue || (multiple ? [] : '')
  )
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })
  
  const selectRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const value = controlledValue !== undefined ? controlledValue : internalValue

  // 过滤选项
  const filteredOptions = useMemo(() => {
    if (!searchValue) return options
    
    return options.filter(option => 
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [options, searchValue])

  // 分组选项
  const groupedOptions = useMemo(() => {
    const groups: { [key: string]: SelectOption[] } = {}
    const ungrouped: SelectOption[] = []

    filteredOptions.forEach(option => {
      if (option.group) {
        if (!groups[option.group]) {
          groups[option.group] = []
        }
        groups[option.group].push(option)
      } else {
        ungrouped.push(option)
      }
    })

    return { groups, ungrouped }
  }, [filteredOptions])

  // 获取选中的选项
  const selectedOptions = useMemo(() => {
    if (multiple && Array.isArray(value)) {
      return options.filter(opt => value.includes(opt.value))
    }
    return options.filter(opt => opt.value === value)
  }, [value, options, multiple])

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
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width
      })
    }
  }, [isOpen])

  // 处理下拉框可见性改变
  useEffect(() => {
    onDropdownVisibleChange?.(isOpen)
    if (isOpen) {
      updateDropdownPosition()
      // 监听滚动和窗口大小变化
      const handleResize = () => updateDropdownPosition()
      window.addEventListener('scroll', handleResize, true)
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('scroll', handleResize, true)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [isOpen, onDropdownVisibleChange, updateDropdownPosition])

  // 处理选择
  const handleSelect = useCallback((option: SelectOption) => {
    if (option.disabled) return

    let newValue: string | number | (string | number)[]

    if (multiple) {
      const currentValues = Array.isArray(value) ? value : []
      if (currentValues.includes(option.value)) {
        newValue = currentValues.filter(v => v !== option.value)
      } else {
        newValue = [...currentValues, option.value]
      }
    } else {
      newValue = option.value
      setIsOpen(false)
      setSearchValue('')
    }

    setInternalValue(newValue)
    onChange?.(newValue)
  }, [value, multiple, onChange])

  // 处理清空
  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    const newValue = multiple ? [] : ''
    setInternalValue(newValue)
    onChange?.(newValue)
    onClear?.()
    setSearchValue('')
  }, [multiple, onChange, onClear])

  // 处理搜索
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchValue(newValue)
    onSearch?.(newValue)
    setFocusedIndex(-1)
  }, [onSearch])

  // 处理键盘导航
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return

    switch (e.key) {
      case 'Enter':
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          handleSelect(filteredOptions[focusedIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setSearchValue('')
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else {
          setFocusedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          )
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (isOpen) {
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          )
        }
        break
      case 'Backspace':
        if (multiple && !searchValue && Array.isArray(value) && value.length > 0) {
          const newValue = value.slice(0, -1)
          setInternalValue(newValue)
          onChange?.(newValue)
        }
        break
    }
  }, [disabled, isOpen, focusedIndex, filteredOptions, handleSelect, multiple, searchValue, value, onChange])

  // 移除标签
  const handleRemoveTag = useCallback((optionValue: string | number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (Array.isArray(value)) {
      const newValue = value.filter(v => v !== optionValue)
      setInternalValue(newValue)
      onChange?.(newValue)
    }
  }, [value, onChange])

  // 渲染选中的值
  const renderValue = () => {
    if (loading) {
      return <span className="myui-select__placeholder">加载中...</span>
    }

    if (selectedOptions.length === 0) {
      return <span className="myui-select__placeholder">{placeholder}</span>
    }

    if (multiple && Array.isArray(value)) {
      const displayTags = maxTagCount && selectedOptions.length > maxTagCount
        ? selectedOptions.slice(0, maxTagCount)
        : selectedOptions

      return (
        <div className="myui-select__tags">
          {displayTags.map(option => (
            <span key={option.value} className="myui-select__tag">
              {option.label}
              <span 
                className="myui-select__tag-close"
                onClick={(e) => handleRemoveTag(option.value, e)}
              >
                ×
              </span>
            </span>
          ))}
          {maxTagCount && selectedOptions.length > maxTagCount && (
            <span className="myui-select__tag myui-select__tag--more">
              {maxTagPlaceholder 
                ? maxTagPlaceholder(selectedOptions.slice(maxTagCount).map(opt => opt.value))
                : `+${selectedOptions.length - maxTagCount}`
              }
            </span>
          )}
        </div>
      )
    }

    return <span className="myui-select__value">{selectedOptions[0]?.label}</span>
  }

  // 渲染选项
  const renderOptions = () => {
    if (loading) {
      return (
        <div className="myui-select__loading">
          <div className="myui-select__spinner" />
          <span>加载中...</span>
        </div>
      )
    }

    if (filteredOptions.length === 0) {
      return (
        <div className="myui-select__empty">
          {notFoundContent}
        </div>
      )
    }

    const renderOptionList = (optionList: SelectOption[], startIndex: number = 0) => (
      optionList.map((option, index) => {
        const isSelected = multiple
          ? Array.isArray(value) && value.includes(option.value)
          : value === option.value
        const isFocused = startIndex + index === focusedIndex

        return (
          <div
            key={option.value}
            className={cn(
              'myui-select__option',
              isSelected && 'myui-select__option--selected',
              isFocused && 'myui-select__option--focused',
              option.disabled && 'myui-select__option--disabled'
            )}
            onClick={() => handleSelect(option)}
          >
            {multiple && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => {}}
                className="myui-select__checkbox"
              />
            )}
            <span>{option.label}</span>
          </div>
        )
      })
    )

    const { groups, ungrouped } = groupedOptions

    return (
      <div className="myui-select__options">
        {ungrouped.length > 0 && renderOptionList(ungrouped)}
        {Object.entries(groups).map(([groupName, groupOptions]) => (
          <div key={groupName} className="myui-select__group">
            <div className="myui-select__group-title">{groupName}</div>
            {renderOptionList(groupOptions)}
          </div>
        ))}
      </div>
    )
  }

  const showClear = clearable && !disabled && selectedOptions.length > 0 && !loading

  return (
    <div
      ref={selectRef}
      className={cn(
        'myui-select',
        `myui-select--${size}`,
        isOpen && 'myui-select--open',
        disabled && 'myui-select--disabled',
        error && 'myui-select--error',
        className
      )}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <div
        className="myui-select__selector"
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {searchable && isOpen ? (
          <input
            ref={inputRef}
            type="text"
            className="myui-select__search"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder={placeholder}
            autoFocus
          />
        ) : (
          renderValue()
        )}
        
        <div className="myui-select__actions">
          {showClear && (
            <span className="myui-select__clear" onClick={handleClear}>
              ×
            </span>
          )}
          <span className={cn('myui-select__arrow', isOpen && 'myui-select__arrow--open')}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
      </div>

      {isOpen && (
        <div 
          ref={dropdownRef} 
          className="myui-select__dropdown"
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            width: dropdownPosition.width
          }}
        >
          {renderOptions()}
        </div>
      )}
    </div>
  )
}

Select.displayName = 'Select'

export default Select
