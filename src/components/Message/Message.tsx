import React, { useEffect, useState, useCallback } from 'react';
import './style.css';

export type MessageType = 'success' | 'error' | 'warning' | 'info';

export interface MessageProps {
  id: string;
  type?: MessageType;
  content: React.ReactNode;
  duration?: number;
  onClose?: (id: string) => void;
  icon?: React.ReactNode;
}

const Message: React.FC<MessageProps> = ({
  id,
  type = 'info',
  content,
  duration = 3000,
  onClose,
  icon,
}) => {
  const [visible, setVisible] = useState(true);

  const handleClose = useCallback(() => {
    setVisible(false);
    // Wait for animation to finish before removing from DOM
    setTimeout(() => {
      onClose?.(id);
    }, 300);
  }, [id, onClose]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, handleClose]);

  const getIcon = () => {
    if (icon) return <span className="message-icon">{icon}</span>;

    switch (type) {
      case 'success':
        return <span className="message-icon">✓</span>; // Replace with actual Icon component if available
      case 'error':
        return <span className="message-icon">✕</span>;
      case 'warning':
        return <span className="message-icon">!</span>;
      case 'info':
      default:
        return <span className="message-icon">i</span>;
    }
  };

  return (
    <div className={`message message-${type} ${!visible ? 'message-leaving' : ''}`}>
      {getIcon()}
      <span className="message-content">{content}</span>
    </div>
  );
};

export default Message;
