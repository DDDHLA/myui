import React, { useState } from 'react';
import { Popover } from '../Popover';
import { Button } from '../Button';
import type { PopconfirmProps } from '@/types';
import './Popconfirm.css';

export const Popconfirm: React.FC<PopconfirmProps> = ({
  title = '确定要执行此操作吗?',
  description,
  icon,
  okText = '确定',
  cancelText = '取消',
  okButtonProps,
  cancelButtonProps,
  onConfirm,
  onCancel,
  placement = 'top',
  disabled = false,
  children,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!onConfirm) {
      setOpen(false);
      return;
    }

    try {
      setLoading(true);
      const result = onConfirm();
      
      // 如果返回 Promise,等待完成
      if (result instanceof Promise) {
        await result;
      }
      
      setOpen(false);
    } catch (error) {
      console.error('Popconfirm onConfirm error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  const defaultIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="myui-popconfirm-icon"
    >
      <path
        d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 5V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 11H8.00667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const content = (
    <div className="myui-popconfirm-content">
      <div className="myui-popconfirm-message">
        <div className="myui-popconfirm-message-icon">
          {icon !== undefined ? icon : defaultIcon}
        </div>
        <div className="myui-popconfirm-message-text">
          {title && <div className="myui-popconfirm-title">{title}</div>}
          {description && (
            <div className="myui-popconfirm-description">{description}</div>
          )}
        </div>
      </div>
      <div className="myui-popconfirm-buttons">
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCancel}
          disabled={loading}
          {...cancelButtonProps}
        >
          {cancelText}
        </Button>
        <Button
          size="sm"
          variant="primary"
          onClick={handleConfirm}
          loading={loading}
          {...okButtonProps}
        >
          {okText}
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      placement={placement}
      open={open}
      onOpenChange={setOpen}
      disabled={disabled}
      className={className}
    >
      {children}
    </Popover>
  );
};

Popconfirm.displayName = 'Popconfirm';

export default Popconfirm;
