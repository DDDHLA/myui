import React, { useState } from 'react';
import './style.css';

export interface AlertProps {
  /** 标题 */
  title?: React.ReactNode;
  /** 内容 */
  message?: React.ReactNode;
  /** 类型 */
  type?: 'success' | 'info' | 'warning' | 'error';
  /** 是否显示图标 */
  showIcon?: boolean;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 是否可关闭 */
  closable?: boolean;
  /** 关闭时的回调 */
  onClose?: () => void;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 辅助操作 */
  action?: React.ReactNode;
}

const defaultIcons = {
  success: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  info: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
      <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        fill="currentColor"
        opacity="0.2"
      />
      <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
      <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

export const Alert: React.FC<AlertProps> = ({
  title,
  message,
  type = 'info',
  showIcon = true,
  icon,
  closable = false,
  onClose,
  children,
  className = '',
  style,
  bordered = true,
  action,
}) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  if (!visible) return null;

  const alertClassName = [
    'alert',
    `alert--${type}`,
    showIcon && 'alert--with-icon',
    !bordered && 'alert--borderless',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const displayIcon = icon || defaultIcons[type];
  const displayMessage = message || children;

  return (
    <div className={alertClassName} style={style} role="alert">
      {showIcon && <div className="alert__icon">{displayIcon}</div>}
      <div className="alert__content">
        {title && <div className="alert__title">{title}</div>}
        {displayMessage && <div className="alert__message">{displayMessage}</div>}
      </div>
      {action && <div className="alert__action">{action}</div>}
      {closable && (
        <button className="alert__close" onClick={handleClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

Alert.displayName = 'Alert';
