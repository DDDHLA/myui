import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/utils';
import './style.css';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps {
  open?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  placement?: DrawerPlacement;
  width?: string | number;
  height?: string | number;
  mask?: boolean;
  maskClosable?: boolean;
  closable?: boolean;
  destroyOnClose?: boolean;
  children?: React.ReactNode;
  className?: string;
  maskClassName?: string;
  style?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  zIndex?: number;
  getContainer?: HTMLElement | (() => HTMLElement) | false;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  footer,
  placement = 'right',
  width = 256,
  height = 256,
  mask = true,
  maskClosable = true,
  closable = true,
  destroyOnClose = false,
  children,
  className,
  maskClassName,
  style,
  maskStyle,
  zIndex = 1000,
  getContainer,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : internalOpen;

  const drawerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    if (!isControlled) {
      setInternalOpen(false);
    }
    onClose?.();
  };

  // Lock body scroll only when rendering in body
  useEffect(() => {
    if (currentOpen && (getContainer === undefined || getContainer === document.body)) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [currentOpen, getContainer]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    if (currentOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentOpen, handleClose]);

  const getDrawerVariants = () => {
    switch (placement) {
      case 'left':
        return {
          hidden: { x: '-100%' },
          visible: { x: '0%' },
        };
      case 'right':
        return {
          hidden: { x: '100%' },
          visible: { x: '0%' },
        };
      case 'top':
        return {
          hidden: { y: '-100%' },
          visible: { y: '0%' },
        };
      case 'bottom':
        return {
          hidden: { y: '100%' },
          visible: { y: '0%' },
        };
    }
  };

  const isContainer = getContainer === false || (getContainer && getContainer !== document.body);

  const getDrawerStyle = () => {
    const customStyle: React.CSSProperties = {
      ...style,
      zIndex,
      position: isContainer ? 'absolute' : 'fixed'
    };
    if (placement === 'left' || placement === 'right') {
      customStyle.width = width;
      customStyle.height = '100%';
    } else {
      customStyle.height = height;
      customStyle.width = '100%';
    }
    return customStyle;
  };

  const getMaskStyle = () => ({ ...maskStyle, zIndex: zIndex - 1 });

  const rootStyle: React.CSSProperties = isContainer ? {
    position: 'absolute',
    width: '100%',
    height: '100%'
  } : {};

  const drawerContent = (
    <AnimatePresence>
      {currentOpen && (
        <div className="myui-drawer-root" style={rootStyle}>
          {mask && (
            <motion.div
              className={cn('myui-drawer-mask', maskClassName)}
              style={getMaskStyle()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={maskClosable ? handleClose : undefined}
            />
          )}
          <motion.div
            ref={drawerRef}
            className={cn('myui-drawer', `myui-drawer--${placement}`, className)}
            style={getDrawerStyle()}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={getDrawerVariants()}
            transition={{ type: 'tween', duration: 0.2 }}
          >
            {(title || closable) && (
              <div className="myui-drawer-header">
                {title && <div className="myui-drawer-title">{title}</div>}
                {closable && (
                  <button className="myui-drawer-close-btn" onClick={handleClose}>
                    ×
                  </button>
                )}
              </div>
            )}
            <div className="myui-drawer-body">
              {destroyOnClose ? currentOpen && children : children}
            </div>
            {footer && (
              <div className="myui-drawer-footer">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (typeof window === 'undefined') {
    return null;
  }

  if (getContainer === false) {
    return drawerContent;
  }

  const container = typeof getContainer === 'function' ? getContainer() : getContainer;
  return ReactDOM.createPortal(drawerContent, container || document.body);
};

export default Drawer;
