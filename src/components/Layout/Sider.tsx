import React, { HTMLAttributes } from 'react';
import { cn } from '@/utils';

export interface SiderProps extends HTMLAttributes<HTMLDivElement> {
  width?: number | string;
  collapsed?: boolean;
}

const Sider: React.FC<SiderProps> = (props) => {
  const { className, width, collapsed, style, ...rest } = props;
  const classes = cn('myui-layout-sidebar', className, {
    'myui-layout-sidebar--collapsed': collapsed,
  });
  
  const divStyle = {
    ...style,
    ...(width ? { width, minWidth: width, maxWidth: width } : {}),
  };

  return <div className={classes} style={divStyle} {...rest} />;
};

export default Sider;
