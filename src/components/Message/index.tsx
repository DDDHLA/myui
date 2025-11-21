import React from 'react';
import { createRoot } from 'react-dom/client';
import MessageContainer, { MessageApi } from './MessageContainer';
import { MessageType } from './Message';

let messageApi: MessageApi | null = null;

const initMessageApi = () => {
  if (messageApi) return;

  const div = document.createElement('div');
  document.body.appendChild(div);
  const root = createRoot(div);

  // Use a ref to access the add method
  // We need to render the component to get the ref
  // This is a bit tricky with createRoot as it's async-ish in terms of ref assignment
  // But for this simple case, we can wrap it in a way to expose the api

  // A simple wrapper to capture the ref
  const Wrapper = () => {
    return <MessageContainer ref={(ref) => { messageApi = ref; }} />;
  };

  root.render(<Wrapper />);
};

const showMessage = (type: MessageType, content: React.ReactNode, duration?: number, icon?: React.ReactNode) => {
  if (!messageApi) {
    initMessageApi();
    // Wait a tick for the ref to be assigned (React 18 rendering is async)
    setTimeout(() => {
      messageApi?.add({ type, content, duration, icon });
    }, 0);
  } else {
    messageApi.add({ type, content, duration, icon });
  }
};

const Message = {
  success: (content: React.ReactNode, duration?: number, icon?: React.ReactNode) => showMessage('success', content, duration, icon),
  error: (content: React.ReactNode, duration?: number, icon?: React.ReactNode) => showMessage('error', content, duration, icon),
  warning: (content: React.ReactNode, duration?: number, icon?: React.ReactNode) => showMessage('warning', content, duration, icon),
  info: (content: React.ReactNode, duration?: number, icon?: React.ReactNode) => showMessage('info', content, duration, icon),
};

export default Message;
