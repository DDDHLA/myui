import { useState, useImperativeHandle, forwardRef } from 'react';
import Message, { MessageProps } from './Message';
import './style.css';

export interface MessageApi {
  add: (message: Omit<MessageProps, 'id' | 'onClose'>) => void;
}

const MessageContainer = forwardRef<MessageApi>((_, ref) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  useImperativeHandle(ref, () => ({
    add: (message) => {
      const id = Math.random().toString(36).substring(2, 9);
      setMessages((prev) => [...prev, { ...message, id }]);
    },
  }));

  const remove = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <div className="message-container">
      {messages.map((msg) => (
        <Message key={msg.id} {...msg} onClose={remove} />
      ))}
    </div>
  );
});

export default MessageContainer;
