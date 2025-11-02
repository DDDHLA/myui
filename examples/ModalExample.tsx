import React, { useState } from 'react';
import { Modal } from '../src/components/Modal';

const ModalExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Modal 组件示例</h1>
      <button onClick={() => setIsModalOpen(true)}>
        打开 Modal
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="示例 Modal"
      >
        <p>这是一个 Modal 组件的示例内容。</p>
        <p>你可以在这里放置任何内容，比如表单、文本或其他组件。</p>
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button onClick={() => setIsModalOpen(false)}>
            关闭
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalExample;