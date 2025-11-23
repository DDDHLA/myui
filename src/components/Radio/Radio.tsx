import React, { createContext, useContext, useMemo } from 'react';
import './style.css';

export interface RadioProps {
  /** 是否选中 */
  checked?: boolean;
  /** 默认是否选中 */
  defaultChecked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 变化时的回调函数 */
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Radio 的值，用于 RadioGroup */
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
  /** name 属性 */
  name?: string;
}

interface RadioGroupContextValue {
  value?: string | number;
  disabled?: boolean;
  onChange: (value: string | number) => void;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'success' | 'warning' | 'danger';
  name?: string;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export const Radio: React.FC<RadioProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  onChange,
  value,
  children,
  className = '',
  style,
  size = 'medium',
  color = 'primary',
  name,
}) => {
  const groupContext = useContext(RadioGroupContext);
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);

  // 如果在 Group 中，使用 Group 的状态
  const checked = groupContext
    ? groupContext.value === value
    : controlledChecked !== undefined
    ? controlledChecked
    : uncontrolledChecked;

  const isDisabled = groupContext?.disabled || disabled;
  const radioSize = groupContext?.size || size;
  const radioColor = groupContext?.color || color;
  const radioName = groupContext?.name || name;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;

    const newChecked = e.target.checked;

    if (groupContext && value !== undefined) {
      groupContext.onChange(value);
    } else {
      if (controlledChecked === undefined) {
        setUncontrolledChecked(newChecked);
      }
      onChange?.(newChecked, e);
    }
  };

  const radioClassName = [
    'radio',
    `radio--${radioSize}`,
    `radio--${radioColor}`,
    checked && 'radio--checked',
    isDisabled && 'radio--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={radioClassName} style={style}>
      <input
        type="radio"
        className="radio__input"
        checked={checked}
        disabled={isDisabled}
        onChange={handleChange}
        name={radioName}
      />
      <span className="radio__inner">
        <span className="radio__dot" />
      </span>
      {children && <span className="radio__label">{children}</span>}
    </label>
  );
};

export interface RadioGroupProps {
  /** 指定选中的选项 */
  value?: string | number;
  /** 默认选中的选项 */
  defaultValue?: string | number;
  /** 变化时的回调函数 */
  onChange?: (value: string | number) => void;
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
  /** name 属性 */
  name?: string;
  /** 选项配置（用于快速生成） */
  options?: Array<{
    label: string;
    value: string | number;
    disabled?: boolean;
  }>;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value: controlledValue,
  defaultValue,
  onChange,
  disabled = false,
  children,
  className = '',
  style,
  direction = 'horizontal',
  size = 'medium',
  color = 'primary',
  name,
  options,
}) => {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | number | undefined>(
    defaultValue
  );

  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const handleChange = (itemValue: string | number) => {
    if (controlledValue === undefined) {
      setUncontrolledValue(itemValue);
    }
    onChange?.(itemValue);
  };

  const contextValue = useMemo<RadioGroupContextValue>(
    () => ({
      value,
      disabled,
      onChange: handleChange,
      size,
      color,
      name,
    }),
    [value, disabled, size, color, name]
  );

  const groupClassName = [
    'radio-group',
    `radio-group--${direction}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div className={groupClassName} style={style}>
        {options
          ? options.map((option) => (
              <Radio
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </Radio>
            ))
          : children}
      </div>
    </RadioGroupContext.Provider>
  );
};

Radio.displayName = 'Radio';
RadioGroup.displayName = 'RadioGroup';
