import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { cn } from '@/utils';
import type { PopoverProps } from '@/types';
import './Popover.css';

export const Popover: React.FC<PopoverProps> = ({
  title,
  content,
  trigger = 'hover',
  placement = 'top',
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  children,
  className,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (disabled) return;
      
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [disabled, isControlled, onOpenChange]
  );

  // 定位计算
  useEffect(() => {
    const popoverElement = popoverRef.current;
    if (open && wrapperRef.current && popoverElement) {
      const wrapperRect = wrapperRef.current.getBoundingClientRect();

      // 先渲染到屏幕外以获取尺寸
      popoverElement.style.top = '-9999px';
      popoverElement.style.left = '-9999px';
      popoverElement.style.visibility = 'hidden';
      popoverElement.style.display = 'block';

      const popoverRect = popoverElement.getBoundingClientRect();

      let top = 0,
        left = 0;

      const gap = 12; // 与触发元素的间距

      switch (placement) {
        case 'top':
          top = wrapperRect.top - popoverRect.height - gap;
          left = wrapperRect.left + (wrapperRect.width - popoverRect.width) / 2;
          break;
        case 'bottom':
          top = wrapperRect.bottom + gap;
          left = wrapperRect.left + (wrapperRect.width - popoverRect.width) / 2;
          break;
        case 'left':
          top = wrapperRect.top + (wrapperRect.height - popoverRect.height) / 2;
          left = wrapperRect.left - popoverRect.width - gap;
          break;
        case 'right':
          top = wrapperRect.top + (wrapperRect.height - popoverRect.height) / 2;
          left = wrapperRect.right + gap;
          break;
      }

      popoverElement.style.top = `${top + window.scrollY}px`;
      popoverElement.style.left = `${left + window.scrollX}px`;
      popoverElement.style.visibility = 'visible';

      requestAnimationFrame(() => {
        popoverElement.classList.add('myui-popover--visible');
      });
    } else if (!open && popoverElement) {
      popoverElement.classList.remove('myui-popover--visible');
    }
  }, [open, placement]);

  // 点击外部关闭
  useEffect(() => {
    if (trigger !== 'click' || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [trigger, open, setOpen]);

  // 事件处理
  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      timeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, 100);
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      setOpen(!open);
    }
  };

  const handleFocus = () => {
    if (trigger === 'focus') {
      setOpen(true);
    }
  };

  const handleBlur = () => {
    if (trigger === 'focus') {
      setOpen(false);
    }
  };

  const popover = (
    <div
      ref={popoverRef}
      className={cn(
        'myui-popover',
        `myui-popover--${placement}`,
        className
      )}
      role="tooltip"
      onMouseEnter={trigger === 'hover' ? handleMouseEnter : undefined}
      onMouseLeave={trigger === 'hover' ? handleMouseLeave : undefined}
    >
      <div className="myui-popover-arrow" />
      <div className="myui-popover-inner">
        {title && <div className="myui-popover-title">{title}</div>}
        <div className="myui-popover-content">{content}</div>
      </div>
    </div>
  );

  return (
    <>
      <div
        ref={wrapperRef}
        className={cn('myui-popover-wrapper', {
          'myui-popover-wrapper--disabled': disabled,
        })}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {children}
      </div>
      {ReactDOM.createPortal(popover, document.body)}
    </>
  );
};

Popover.displayName = 'Popover';

export default Popover;
