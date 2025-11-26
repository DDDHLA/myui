import React, { createContext, useContext, useMemo } from 'react';
import './style.css';

export interface CheckboxProps {
  /** 是否选中 */
  checked?: boolean;
  /** 默认是否选中 */
  defaultChecked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 设置 indeterminate 状态，只负责样式控制 */
  indeterminate?: boolean;
  /** 变化时的回调函数 */
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Checkbox 的值，用于 CheckboxGroup */
  value?: string | number;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 颜色 */
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

interface CheckboxGroupContextValue {
  value: (string | number)[];
  disabled?: boolean;
  onChange: (value: string | number, checked: boolean) => void;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

export const Checkbox: React.FC<CheckboxProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  indeterminate = false,
  onChange,
  value,
  children,
  className = '',
  style,
  size = 'medium',
  color = 'primary',
}) => {
  const groupContext = useContext(CheckboxGroupContext);
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);

  // 如果在 Group 中，使用 Group 的状态
  const checked = groupContext
    ? groupContext.value.includes(value!)
    : controlledChecked !== undefined
    ? controlledChecked
    : uncontrolledChecked;

  const isDisabled = groupContext?.disabled || disabled;
  const checkboxSize = groupContext?.size || size;
  const checkboxColor = groupContext?.color || color;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;

    if (groupContext && value !== undefined) {
      groupContext.onChange(value, newChecked);
    } else {
      if (controlledChecked === undefined) {
        setUncontrolledChecked(newChecked);
      }
      onChange?.(newChecked, e);
    }
  };

  const checkboxClassName = [
    'checkbox',
    `checkbox--${checkboxSize}`,
    `checkbox--${checkboxColor}`,
    checked && 'checkbox--checked',
    isDisabled && 'checkbox--disabled',
    indeterminate && 'checkbox--indeterminate',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={checkboxClassName} style={style}>
      <input
        type="checkbox"
        className="checkbox__input"
        checked={checked}
        disabled={isDisabled}
        onChange={handleChange}
        ref={(input) => {
          if (input) {
            input.indeterminate = indeterminate;
          }
        }}
      />
      <span className="checkbox__inner">
        {indeterminate ? (
          <svg viewBox="0 0 16 16" className="checkbox__icon">
            <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="2" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" className="checkbox__icon">
            <path
              d="M3 8l3 3 7-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {children && <span className="checkbox__label">{children}</span>}
    </label>
  );
};

export interface CheckboxGroupProps {
  /** 指定选中的选项 */
  value?: (string | number)[];
  /** 默认选中的选项 */
  defaultValue?: (string | number)[];
  /** 变化时的回调函数 */
  onChange?: (value: (string | number)[]) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 排列方向 */
  direction?: 'horizontal' | 'vertical';
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 颜色 */
  color?: 'primary' | 'success' | 'warning' | 'danger';
  /** 选项配置（用于快速生成） */
  options?: Array<{
    label: string;
    value: string | number;
    disabled?: boolean;
  }>;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  value: controlledValue,
  defaultValue = [],
  onChange,
  disabled = false,
  children,
  className = '',
  style,
  direction = 'horizontal',
  size = 'medium',
  color = 'primary',
  options,
}) => {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<(string | number)[]>(defaultValue);

  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const handleChange = React.useCallback((itemValue: string | number, checked: boolean) => {
    const newValue = checked
      ? [...value, itemValue]
      : value.filter((v) => v !== itemValue);

    if (controlledValue === undefined) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);
  }, [value, controlledValue, onChange]);

  const contextValue = useMemo<CheckboxGroupContextValue>(
    () => ({
      value,
      disabled,
      onChange: handleChange,
      size,
      color,
    }),
    [value, disabled, handleChange, size, color]
  );

  const groupClassName = [
    'checkbox-group',
    `checkbox-group--${direction}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div className={groupClassName} style={style}>
        {options
          ? options.map((option) => (
              <Checkbox
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </Checkbox>
            ))
          : children}
      </div>
    </CheckboxGroupContext.Provider>
  );
};

Checkbox.displayName = 'Checkbox';
CheckboxGroup.displayName = 'CheckboxGroup';
