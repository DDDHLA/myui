import React from 'react';
import { Message } from '../index';
import { Button } from '../Button';

const MessageDemo: React.FC = () => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold">Message Global Prompt</h2>
      <div className="flex gap-2">
        <Button onClick={() => Message.success('Success Message')}>Success</Button>
        <Button onClick={() => Message.error('Error Message')}>Error</Button>
        <Button onClick={() => Message.warning('Warning Message')}>Warning</Button>
        <Button onClick={() => Message.info('Info Message')}>Info</Button>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => Message.success('This message lasts 10 seconds', 10000)}>Long Duration (10s)</Button>
      </div>
    </div>
  );
};

export default MessageDemo;
