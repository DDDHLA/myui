import React, { useState, useRef, useEffect } from 'react';
import './style.css';

export interface DropdownMenuItem {
  /** 菜单项的键值 */
  key: string;
  /** 菜单项显示的文本 */
  label: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否分割线 */
  divider?: boolean;
  /** 子菜单 */
  children?: DropdownMenuItem[];
}

export interface DropdownProps {
  /** 下拉菜单选项 */
  menu: DropdownMenuItem[];
  /** 触发器 */
  children: React.ReactNode;
  /** 点击菜单项时的回调 */
  onSelect?: (key: string, item: DropdownMenuItem) => void;
  /** 触发方式 */
  trigger?: 'hover' | 'click';
  /** 弹出位置 */
  placement?: 'bottom' | 'bottomLeft' | 'bottomRight' | 'top' | 'topLeft' | 'topRight';
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Dropdown: React.FC<DropdownProps> = ({
  menu,
  children,
  onSelect,
  trigger = 'hover',
  placement = 'bottomLeft',
  disabled = false,
  className = '',
  style,
}) => {
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // 处理点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setVisible(false);
      }
    };

    if (visible && trigger === 'click') {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [visible, trigger]);

  const handleMouseEnter = () => {
    if (disabled || trigger !== 'hover') return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setVisible(true);
  };

  const handleMouseLeave = () => {
    if (disabled || trigger !== 'hover') return;
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 200);
  };

  const handleClick = () => {
    if (disabled || trigger !== 'click') return;
    setVisible(!visible);
  };

  const handleMenuItemClick = (item: DropdownMenuItem) => {
    if (item.disabled || item.divider) return;
    onSelect?.(item.key, item);
    setVisible(false);
  };

  const renderMenuItem = (item: DropdownMenuItem, index: number) => {
    if (item.divider) {
      return <div key={`divider-${index}`} className="dropdown-menu__divider" />;
    }

    const itemClassName = [
      'dropdown-menu__item',
      item.disabled && 'dropdown-menu__item--disabled',
      item.children && 'dropdown-menu__item--has-children',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        key={item.key}
        className={itemClassName}
        onClick={() => handleMenuItemClick(item)}
      >
        {item.icon && <span className="dropdown-menu__item-icon">{item.icon}</span>}
        <span className="dropdown-menu__item-label">{item.label}</span>
        {item.children && (
          <span className="dropdown-menu__item-arrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        )}
        {item.children && (
          <div className="dropdown-menu dropdown-menu--submenu">
            {item.children.map((subItem, subIndex) => renderMenuItem(subItem, subIndex))}
          </div>
        )}
      </div>
    );
  };

  const dropdownClassName = [
    'dropdown',
    visible && 'dropdown--visible',
    disabled && 'dropdown--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={dropdownRef}
      className={dropdownClassName}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="dropdown__trigger" onClick={handleClick}>
        {children}
      </div>
      {visible && (
        <div className={`dropdown-menu dropdown-menu--${placement}`}>
          {menu.map((item, index) => renderMenuItem(item, index))}
        </div>
      )}
    </div>
  );
};

Dropdown.displayName = 'Dropdown';
