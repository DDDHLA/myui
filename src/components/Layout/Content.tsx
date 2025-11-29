import React, { HTMLAttributes } from 'react';
import { cn } from '@/utils';

const Content: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className, ...rest } = props;
  const classes = cn('myui-layout-content', className);
  return <div className={classes} {...rest} />;
};

export default Content;
