import React, { useEffect } from 'react';
import { cn } from '@/utils';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';
export type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface NotificationProps {
  id?: string;
  key?: string;
  type?: NotificationType;
  title?: React.ReactNode;
  description?: React.ReactNode;
  message?: React.ReactNode;
  icon?: React.ReactNode;
  showIcon?: boolean;
  duration?: number;
  closable?: boolean;
  onClose?: () => void;
  btn?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const defaultIcons = {
  success: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
      <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        fill="currentColor"
        opacity="0.2"
      />
      <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  error: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
      <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

export const Notification: React.FC<NotificationProps> = ({
  id: _id,
  type = 'info',
  title,
  description,
  message,
  icon,
  showIcon = true,
  duration = 4500,
  closable = true,
  onClose,
  btn,
  onClick,
  className,
  style,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const displayIcon = icon || defaultIcons[type];
  const displayContent = message || description;

  return (
    <div
      className={cn(
        'myui-notification',
        `myui-notification--${type}`,
        className
      )}
      style={style}
      onClick={onClick}
      role="alert"
    >
      {showIcon && (
        <div className="myui-notification__icon">
          {displayIcon}
        </div>
      )}

      <div className="myui-notification__content">
        {title && <div className="myui-notification__title">{title}</div>}
        {displayContent && <div className="myui-notification__description">{displayContent}</div>}
        {btn && <div className="myui-notification__btn">{btn}</div>}
      </div>

      {closable && (
        <button
          className="myui-notification__close"
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
          aria-label="Close"
        >
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
