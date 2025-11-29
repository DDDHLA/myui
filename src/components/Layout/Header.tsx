import React, { HTMLAttributes } from 'react';
import { cn } from '@/utils';

const Header: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className, ...rest } = props;
  const classes = cn('myui-layout-header', className);
  return <div className={classes} {...rest} />;
};

export default Header;
