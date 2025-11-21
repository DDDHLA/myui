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
  editable?: boolean;
  onEdit?: (text: string) => void;
  onConfirm?: (text: string) => void;
  onCancel?: () => void;
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
  editable = false,
  onConfirm,
}) => {
  const [visible, setVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(children ? String(children) : '');

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClose?.(e);
    if (e.defaultPrevented) return;
    setVisible(false);
  };

  const handleDoubleClick = () => {
    if (editable) {
      setIsEditing(true);
      setEditText(children ? String(children) : '');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleInputConfirm = () => {
    onConfirm?.(editText);
    setIsEditing(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputConfirm();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(children ? String(children) : '');
    }
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
  
  const renderContent = () => {
    if (isEditing) {
      return (
        <input
          type="text"
          className="myui-tag-input"
          value={editText}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onKeyDown={handleInputKeyDown}
          autoFocus
        />
      );
    }
    return (
      <>
        {icon && <span className="myui-tag-icon">{icon}</span>}
        {children}
        {closable && (
          <span className="myui-tag-close-icon" onClick={handleClose}>
            ✕
          </span>
        )}
      </>
    );
  };

  return (
    <span className={tagClassName} style={tagStyle} onDoubleClick={handleDoubleClick}>
      {renderContent()}
    </span>
  );
};

export default Tag;
