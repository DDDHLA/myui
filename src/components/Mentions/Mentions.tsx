import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import './style.css';

export interface MentionOption {
  value: string;
  label: string;
  avatar?: string;
  disabled?: boolean;
  [key: string]: unknown;
}

export interface MentionsProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSelect?: (option: MentionOption, prefix: string) => void;
  onSearch?: (text: string, prefix: string) => void;
  options?: MentionOption[];
  prefix?: string | string[];
  split?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  maxLength?: number;
  className?: string;
  style?: React.CSSProperties;
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  notFoundContent?: React.ReactNode;
  placement?: 'top' | 'bottom';
  filterOption?: (input: string, option: MentionOption) => boolean;
  renderOption?: (option: MentionOption) => React.ReactNode;
  autoFocus?: boolean;
}

export interface MentionsRef {
  focus: () => void;
  blur: () => void;
}

export const Mentions = forwardRef<MentionsRef, MentionsProps>(({
  value: controlledValue,
  defaultValue = '',
  onChange,
  onSelect,
  onSearch,
  options = [],
  prefix = '@',
  split = ' ',
  placeholder = '请输入...',
  disabled = false,
  readOnly = false,
  rows = 3,
  maxLength,
  className = '',
  style,
  size = 'medium',
  loading = false,
  notFoundContent = '无匹配结果',
  placement = 'bottom',
  filterOption,
  renderOption,
  autoFocus = false,
}, ref) => {
  const [value, setValue] = useState(controlledValue ?? defaultValue);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [mentionPrefix, setMentionPrefix] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => textareaRef.current?.focus(),
    blur: () => textareaRef.current?.blur(),
  }));

  // 同步受控值
  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  // 获取前缀数组
  const prefixArray = Array.isArray(prefix) ? prefix : [prefix];

  // 默认过滤函数
  const defaultFilterOption = (input: string, option: MentionOption) => {
    return option.label.toLowerCase().includes(input.toLowerCase()) ||
           option.value.toLowerCase().includes(input.toLowerCase());
  };

  const filterFunc = filterOption || defaultFilterOption;

  // 过滤选项
  const filteredOptions = options.filter(option => 
    !option.disabled && filterFunc(searchText, option)
  );

  // 计算光标位置的坐标
  const calculateDropdownPosition = () => {
    if (!textareaRef.current || !measureRef.current) return;

    const textarea = textareaRef.current;
    const textBeforeCursor = value.substring(0, cursorPosition);
    
    // 创建临时元素来测量文本位置
    measureRef.current.textContent = textBeforeCursor;
    
    const scrollTop = textarea.scrollTop;
    
    // 简化的位置计算
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
    const lines = textBeforeCursor.split('\n').length;
    
    setDropdownPosition({
      top: (lines - 1) * lineHeight - scrollTop,
      left: 0,
    });
  };

  // 检测提及触发
  const checkMentionTrigger = (text: string, position: number) => {
    const textBeforeCursor = text.substring(0, position);
    
    for (const p of prefixArray) {
      const lastPrefixIndex = textBeforeCursor.lastIndexOf(p);
      
      if (lastPrefixIndex !== -1) {
        const textAfterPrefix = textBeforeCursor.substring(lastPrefixIndex + p.length);
        
        // 检查前缀后是否有分隔符
        if (!textAfterPrefix.includes(split) && !textAfterPrefix.includes('\n')) {
          setMentionPrefix(p);
          setSearchText(textAfterPrefix);
          setShowDropdown(true);
          setActiveIndex(0);
          onSearch?.(textAfterPrefix, p);
          calculateDropdownPosition();
          return;
        }
      }
    }
    
    setShowDropdown(false);
  };

  // 处理输入变化
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const newPosition = e.target.selectionStart || 0;
    
    setValue(newValue);
    setCursorPosition(newPosition);
    onChange?.(newValue);
    
    checkMentionTrigger(newValue, newPosition);
  };

  // 处理选择
  const handleSelect = (option: MentionOption) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const textBeforeCursor = value.substring(0, cursorPosition);
    const textAfterCursor = value.substring(cursorPosition);
    
    // 找到提及开始位置
    const lastPrefixIndex = textBeforeCursor.lastIndexOf(mentionPrefix);
    
    if (lastPrefixIndex !== -1) {
      const beforeMention = value.substring(0, lastPrefixIndex);
      const mentionText = `${mentionPrefix}${option.label}${split}`;
      const newValue = beforeMention + mentionText + textAfterCursor;
      const newPosition = beforeMention.length + mentionText.length;
      
      setValue(newValue);
      onChange?.(newValue);
      onSelect?.(option, mentionPrefix);
      setShowDropdown(false);
      
      // 设置光标位置
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(newPosition, newPosition);
      }, 0);
    }
  };

  // 键盘事件处理
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!showDropdown || filteredOptions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        if (showDropdown) {
          e.preventDefault();
          handleSelect(filteredOptions[activeIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowDropdown(false);
        break;
    }
  };

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        textareaRef.current &&
        !textareaRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 滚动活动项到可见区域
  useEffect(() => {
    if (showDropdown && dropdownRef.current) {
      const activeElement = dropdownRef.current.querySelector('.myui-mentions-option--active');
      activeElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex, showDropdown]);

  // 渲染选项
  const renderOptionContent = (option: MentionOption) => {
    if (renderOption) {
      return renderOption(option);
    }

    return (
      <div className="myui-mentions-option-content">
        {option.avatar && (
          <img 
            src={option.avatar} 
            alt={option.label}
            className="myui-mentions-option-avatar"
          />
        )}
        <span className="myui-mentions-option-label">{option.label}</span>
      </div>
    );
  };

  const containerClassName = [
    'myui-mentions',
    `myui-mentions--${size}`,
    disabled && 'myui-mentions--disabled',
    readOnly && 'myui-mentions--readonly',
    showDropdown && 'myui-mentions--active',
    className,
  ].filter(Boolean).join(' ');

  const dropdownClassName = [
    'myui-mentions-dropdown',
    `myui-mentions-dropdown--${placement}`,
    showDropdown && 'myui-mentions-dropdown--visible',
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClassName} style={style}>
      <textarea
        ref={textareaRef}
        className="myui-mentions-input"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        maxLength={maxLength}
        autoFocus={autoFocus}
      />
      
      {/* 用于测量文本位置的隐藏元素 */}
      <div ref={measureRef} className="myui-mentions-measure" />

      {/* 下拉选项列表 */}
      {showDropdown && (
        <div 
          ref={dropdownRef}
          className={dropdownClassName}
          style={{
            top: placement === 'bottom' ? dropdownPosition.top + 24 : 'auto',
            bottom: placement === 'top' ? 'auto' : 'auto',
          }}
        >
          {loading ? (
            <div className="myui-mentions-loading">
              <span className="myui-mentions-loading-icon">⏳</span>
              <span>加载中...</span>
            </div>
          ) : filteredOptions.length > 0 ? (
            <div className="myui-mentions-options">
              {filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  className={[
                    'myui-mentions-option',
                    index === activeIndex && 'myui-mentions-option--active',
                  ].filter(Boolean).join(' ')}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {renderOptionContent(option)}
                </div>
              ))}
            </div>
          ) : (
            <div className="myui-mentions-empty">
              {notFoundContent}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

Mentions.displayName = 'Mentions';

export default Mentions;
