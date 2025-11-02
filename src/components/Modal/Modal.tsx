import React, { ReactNode, useEffect, useState } from 'react';
import './Modal.css';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalPosition = 'center' | 'top';

export interface ModalProps {
  /** 是否显示弹窗 */
  isOpen: boolean;
  /** 关闭回调 */
  onClose: () => void;
  /** 标题 */
  title?: ReactNode;
  /** 内容 */
  children: ReactNode;
  /** 底部内容 */
  footer?: ReactNode;
  /** 弹窗尺寸 */
  size?: ModalSize;
  /** 弹窗位置 */
  position?: ModalPosition;
  /** 自定义宽度 */
  width?: string | number;
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 点击遮罩层是否关闭 */
  maskClosable?: boolean;
  /** 按 Esc 键是否关闭 */
  keyboard?: boolean;
  /** 是否全屏 */
  fullscreen?: boolean;
  /** 关闭时销毁子元素 */
  destroyOnClose?: boolean;
  /** 确认按钮文字 */
  okText?: string;
  /** 取消按钮文字 */
  cancelText?: string;
  /** 点击确认按钮回调 */
  onOk?: () => void | Promise<void>;
  /** 点击取消按钮回调 */
  onCancel?: () => void;
  /** 确认按钮加载状态 */
  confirmLoading?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义遮罩层类名 */
  overlayClassName?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** z-index */
  zIndex?: number;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  size = 'md',
  position = 'center',
  width,
  closable = true,
  maskClosable = true,
  keyboard = true,
  fullscreen = false,
  destroyOnClose = false,
  okText = '确定',
  cancelText = '取消',
  onOk,
  onCancel,
  confirmLoading = false,
  className = '',
  overlayClassName = '',
  style,
  zIndex = 1000,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  // 处理动画
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // 延迟添加动画类，确保过渡效果
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      // 等待动画完成后卸载组件
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // 处理 Escape 键关闭弹窗
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && keyboard) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // 防止背景滚动
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, keyboard]);

  // 处理遮罩层点击
  const handleOverlayClick = () => {
    if (maskClosable) {
      onClose();
    }
  };

  // 处理取消
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  // 处理确认
  const handleOk = async () => {
    if (onOk) {
      const result = onOk();
      if (result instanceof Promise) {
        try {
          await result;
          onClose();
        } catch (error) {
          // 如果 Promise 被拒绝，不关闭弹窗
          console.error('Modal onOk error:', error);
        }
      } else {
        onClose();
      }
    } else {
      onClose();
    }
  };

  // 如果设置了 destroyOnClose 且弹窗未打开，不渲染
  if (destroyOnClose && !shouldRender) {
    return null;
  }

  if (!shouldRender) return null;

  // 计算宽度
  const getWidth = () => {
    if (fullscreen) return '100%';
    if (width) return typeof width === 'number' ? `${width}px` : width;
    return undefined;
  };

  // 默认 footer
  const renderFooter = () => {
    if (footer === null) return null;
    if (footer !== undefined) return <div className="modal-footer">{footer}</div>;
    if (!onOk && !onCancel) return null;

    return (
      <div className="modal-footer">
        <button 
          className="modal-btn modal-btn-cancel" 
          onClick={handleCancel}
          disabled={confirmLoading}
        >
          {cancelText}
        </button>
        {onOk && (
          <button 
            className="modal-btn modal-btn-ok" 
            onClick={handleOk}
            disabled={confirmLoading}
          >
            {confirmLoading ? (
              <>
                <span className="modal-btn-loading"></span>
                加载中...
              </>
            ) : okText}
          </button>
        )}
      </div>
    );
  };

  return (
    <div 
      className={`modal-overlay ${overlayClassName} ${isAnimating ? 'modal-overlay-open' : ''}`}
      onClick={handleOverlayClick}
      style={{ zIndex }}
    >
      <div 
        className={`modal-content modal-${size} modal-${position} ${fullscreen ? 'modal-fullscreen' : ''} ${className} ${isAnimating ? 'modal-content-open' : ''}`}
        onClick={(e) => e.stopPropagation()}
        style={{ ...style, width: getWidth() }}
      >
        {(title || closable) && (
          <div className="modal-header">
            {title && <div className="modal-title">{title}</div>}
            {closable && (
              <button className="modal-close" onClick={onClose}>
                ×
              </button>
            )}
          </div>
        )}
        <div className="modal-body">
          {children}
        </div>
        {renderFooter()}
      </div>
    </div>
  );
};

export default Modal;