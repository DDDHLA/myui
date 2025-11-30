import React from 'react';
import { cn } from '@/utils';
import './Divider.css';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'horizontal' | 'vertical';
  dashed?: boolean;
  plain?: boolean;
  orientation?: 'left' | 'center' | 'right';
  orientationMargin?: string | number;
  children?: React.ReactNode;
}

export const Divider: React.FC<DividerProps> = ({
  type = 'horizontal',
  dashed = false,
  plain = false,
  orientation = 'center',
  orientationMargin,
  children,
  className,
  style,
  ...props
}) => {
  const hasChildren = children !== undefined && children !== null;

  const dividerStyle: React.CSSProperties & { '--divider-orientation-margin'?: string | number } = {
    ...style,
  };

  if (orientationMargin !== undefined && hasChildren) {
    if (orientation === 'left') {
      dividerStyle['--divider-orientation-margin'] =
        typeof orientationMargin === 'number' ? `${orientationMargin}px` : orientationMargin;
    } else if (orientation === 'right') {
      dividerStyle['--divider-orientation-margin'] =
        typeof orientationMargin === 'number' ? `${orientationMargin}px` : orientationMargin;
    }
  }

  return (
    <div
      className={cn(
        'myui-divider',
        `myui-divider--${type}`,
        {
          'myui-divider--dashed': dashed,
          'myui-divider--with-text': hasChildren,
          'myui-divider--plain': plain,
          [`myui-divider--text-${orientation}`]: hasChildren && orientation,
        },
        className
      )}
      style={dividerStyle}
      role="separator"
      {...props}
    >
      {hasChildren && type === 'horizontal' ? (
        <>
          <span className="myui-divider__text">{children}</span>
        </>
      ) : null}
    </div>
  );
};

Divider.displayName = 'Divider';
