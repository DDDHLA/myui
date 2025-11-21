import React from 'react';
import './style.css';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps {
  src?: string;
  alt?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  size?: AvatarSize;
  shape?: AvatarShape;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  icon,
  children,
  size = 'md',
  shape = 'circle',
  className = '',
  style,
  onClick,
}) => {
  const classes = [
    'myui-avatar',
    `myui-avatar-${size}`,
    `myui-avatar-${shape}`,
    className,
  ].filter(Boolean).join(' ');

  const renderContent = () => {
    if (src) {
      return <img src={src} alt={alt} className="myui-avatar-image" />;
    }
    if (icon) {
      return <span className="myui-avatar-icon">{icon}</span>;
    }
    return children;
  };

  return (
    <span className={classes} style={style} onClick={onClick}>
      {renderContent()}
    </span>
  );
};

export interface AvatarGroupProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  className = '',
  style,
}) => {
  return (
    <div className={`myui-avatar-group ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Avatar;
