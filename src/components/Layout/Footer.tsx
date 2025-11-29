import React, { HTMLAttributes } from 'react';
import { cn } from '@/utils';

const Footer: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className, ...rest } = props;
  const classes = cn('myui-layout-footer', className);
  return <div className={classes} {...rest} />;
};

export default Footer;
