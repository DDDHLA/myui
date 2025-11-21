import React, { useState } from 'react';
import './style.css';

export interface TagProps {
  color?: string;
  closable?: boolean;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  visible?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Tag: React.FC<TagProps> = ({
  color,
  closable = false,
  onClose,
  visible: propsVisible,
  icon,
  children,
  className = '',
  style,
}) => {
  const [visible, setVisible] = useState(true);

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClose?.(e);
    if (e.defaultPrevented) return;
    setVisible(false);
  };

  if (propsVisible === false || (!propsVisible && !visible && propsVisible !== undefined)) {
    return null;
  }

  if (!visible && propsVisible === undefined) {
    return null;
  }

  const isPresetColor = (color?: string): boolean => {
    if (!color) return false;
    return /^(blue|green|red|orange|purple|default)$/.test(color);
  };

  const tagStyle = { ...style };
  let tagClassName = 'myui-tag';

  if (isPresetColor(color)) {
    tagClassName += ` myui-tag-${color}`;
  } else if (color) {
    tagStyle.backgroundColor = color;
    tagStyle.borderColor = color;
    tagStyle.color = '#fff';
  } else {
    tagClassName += ' myui-tag-default';
  }

  if (className) {
    tagClassName += ` ${className}`;
  }

  return (
    <span className={tagClassName} style={tagStyle}>
      {icon && <span className="myui-tag-icon">{icon}</span>}
      {children}
      {closable && (
        <span className="myui-tag-close-icon" onClick={handleClose}>
          ✕
        </span>
      )}
    </span>
  );
};

export default Tag;
