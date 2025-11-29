import React from 'react';
import { cn } from '@/utils';
import './Space.css';

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large' | number | [number, number];
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'end' | 'center' | 'baseline';
  wrap?: boolean;
  split?: React.ReactNode;
  children?: React.ReactNode;
}

const sizeMap = {
  small: 8,
  medium: 16,
  large: 24,
};

export const Space: React.FC<SpaceProps> = ({
  size = 'medium',
  direction = 'horizontal',
  align,
  wrap = false,
  split,
  children,
  className,
  style,
  ...props
}) => {
  const getGapSize = (): [number, number] => {
    if (typeof size === 'number') {
      return [size, size];
    }
    if (Array.isArray(size)) {
      return size;
    }
    const mappedSize = sizeMap[size] || sizeMap.medium;
    return [mappedSize, mappedSize];
  };

  const [horizontalGap, verticalGap] = getGapSize();

  const spaceStyle: React.CSSProperties = {
    ...style,
    '--space-gap-horizontal': `${horizontalGap}px`,
    '--space-gap-vertical': `${verticalGap}px`,
  } as React.CSSProperties;

  const childNodes = React.Children.toArray(children).filter(child => child !== null && child !== undefined);

  if (childNodes.length === 0) {
    return null;
  }

  const items = childNodes.map((child, index) => {
    const key = (child as any)?.key || `space-item-${index}`;
    return (
      <React.Fragment key={key}>
        <div className="myui-space__item">{child}</div>
        {split && index < childNodes.length - 1 && (
          <div className="myui-space__split" key={`${key}-split`}>
            {split}
          </div>
        )}
      </React.Fragment>
    );
  });

  return (
    <div
      className={cn(
        'myui-space',
        `myui-space--${direction}`,
        {
          'myui-space--wrap': wrap,
          [`myui-space--align-${align}`]: align,
        },
        className
      )}
      style={spaceStyle}
      {...props}
    >
      {items}
    </div>
  );
};

Space.displayName = 'Space';
