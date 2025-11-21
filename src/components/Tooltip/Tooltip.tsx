import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { cn } from '@/utils';
import './style.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  title: React.ReactNode;
  placement?: TooltipPlacement;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Tooltip: React.FC<TooltipProps> = ({
  title,
  placement = 'top',
  children,
  className,
  style,
}) => {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tooltipElement = tooltipRef.current;
    if (visible && wrapperRef.current && tooltipElement) {
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      
      // We need to render it off-screen first to get its dimensions
      tooltipElement.style.top = '-9999px';
      tooltipElement.style.left = '-9999px';
      tooltipElement.style.visibility = 'hidden';
      tooltipElement.style.display = 'block';

      const tooltipRect = tooltipElement.getBoundingClientRect();
      
      let top = 0, left = 0;

      switch (placement) {
        case 'top':
          top = wrapperRect.top - tooltipRect.height - 8;
          left = wrapperRect.left + (wrapperRect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = wrapperRect.bottom + 8;
          left = wrapperRect.left + (wrapperRect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = wrapperRect.top + (wrapperRect.height - tooltipRect.height) / 2;
          left = wrapperRect.left - tooltipRect.width - 8;
          break;
        case 'right':
          top = wrapperRect.top + (wrapperRect.height - tooltipRect.height) / 2;
          left = wrapperRect.right + 8;
          break;
      }

      tooltipElement.style.top = `${top + window.scrollY}px`;
      tooltipElement.style.left = `${left + window.scrollX}px`;
      tooltipElement.style.visibility = 'visible';

      requestAnimationFrame(() => {
        tooltipElement.classList.add('visible');
      });

    } else if (!visible && tooltipElement) {
      tooltipElement.classList.remove('visible');
    }
  }, [visible, placement]);

  const handleMouseEnter = () => setVisible(true);
  const handleMouseLeave = () => setVisible(false);

  const tooltip = (
    <div
      ref={tooltipRef}
      className={cn('myui-tooltip', `myui-tooltip--${placement}`, className)}
      role="tooltip"
    >
      <div className="myui-tooltip-arrow" />
      <div className="myui-tooltip-inner">{title}</div>
    </div>
  );

  return (
    <>
      <div 
        ref={wrapperRef}
        className="myui-tooltip-wrapper" 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        style={style}
      >
        {children}
      </div>
      {ReactDOM.createPortal(tooltip, document.body)}
    </>
  );
};

export default Tooltip;
