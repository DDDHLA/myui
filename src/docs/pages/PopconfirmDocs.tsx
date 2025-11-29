import { Popconfirm, Button, Message } from '@/components';
import { CodeBlock } from '@/components/CodeBlock';
import { PropsTable, type PropItem } from '@/components/PropsTable';
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles';

const PopconfirmDocs = () => {
  const popconfirmProps: PropItem[] = [
    { name: 'title', type: 'ReactNode', description: '确认框标题', default: "'确定要执行此操作吗?'" },
    { name: 'description', type: 'ReactNode', description: '确认框描述' },
    { name: 'icon', type: 'ReactNode', description: '自定义图标' },
    { name: 'okText', type: 'string', description: '确认按钮文字', default: "'确定'" },
    { name: 'cancelText', type: 'string', description: '取消按钮文字', default: "'取消'" },
    { name: 'okButtonProps', type: 'ButtonProps', description: '确认按钮的属性' },
    { name: 'cancelButtonProps', type: 'ButtonProps', description: '取消按钮的属性' },
    { name: 'onConfirm', type: '() => void | Promise<void>', description: '确认回调' },
    { name: 'onCancel', type: '() => void', description: '取消回调' },
    { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", description: '气泡位置', default: "'top'" },
    { name: 'disabled', type: 'boolean', description: '是否禁用', default: 'false' },
    { name: 'children', type: 'ReactNode', description: '触发元素', required: true },
    { name: 'className', type: 'string', description: '自定义类名' },
  ];

  const handleConfirm = () => {
    Message.success('操作已确认');
  };

  const handleCancel = () => {
    Message.info('操作已取消');
  };

  const handleAsyncConfirm = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        Message.success('异步操作完成');
        resolve();
      }, 2000);
    });
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    marginBottom: '16px',
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Popconfirm 气泡确认框</h1>
        <p style={docParagraphStyles.lead}>
          点击元素,弹出气泡式的确认框。用于需要用户确认的操作场景,如删除、提交等。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="最简单的用法,点击按钮弹出确认框。"
        code={`import { Popconfirm, Button, Message } from '@myui/components';

const handleConfirm = () => {
  Message.success('操作已确认');
};

<Popconfirm
  title="确定要删除这条记录吗?"
  onConfirm={handleConfirm}
>
  <Button variant="danger">删除</Button>
</Popconfirm>`}
      >
        <div style={containerStyle}>
          <Popconfirm
            title="确定要删除这条记录吗?"
            onConfirm={handleConfirm}
          >
            <Button variant="danger">删除</Button>
          </Popconfirm>
        </div>
      </CodeBlock>

      <CodeBlock
        title="带描述信息"
        description="可以添加描述信息,提供更多上下文。"
        code={`import { Popconfirm, Button } from '@myui/components';

<Popconfirm
  title="确定要删除这条记录吗?"
  description="删除后将无法恢复,请谨慎操作。"
  onConfirm={handleConfirm}
>
  <Button variant="danger">删除</Button>
</Popconfirm>`}
      >
        <div style={containerStyle}>
          <Popconfirm
            title="确定要删除这条记录吗?"
            description="删除后将无法恢复,请谨慎操作。"
            onConfirm={handleConfirm}
          >
            <Button variant="danger">删除</Button>
          </Popconfirm>
        </div>
      </CodeBlock>

      <CodeBlock
        title="不同位置"
        description="支持上、下、左、右四个方向。"
        code={`import { Popconfirm, Button } from '@myui/components';

<Popconfirm placement="top" title="确定吗?" onConfirm={handleConfirm}>
  <Button>Top</Button>
</Popconfirm>

<Popconfirm placement="bottom" title="确定吗?" onConfirm={handleConfirm}>
  <Button>Bottom</Button>
</Popconfirm>

<Popconfirm placement="left" title="确定吗?" onConfirm={handleConfirm}>
  <Button>Left</Button>
</Popconfirm>

<Popconfirm placement="right" title="确定吗?" onConfirm={handleConfirm}>
  <Button>Right</Button>
</Popconfirm>`}
      >
        <div style={containerStyle}>
          <Popconfirm placement="top" title="确定吗?" onConfirm={handleConfirm}>
            <Button>Top</Button>
          </Popconfirm>
          <Popconfirm placement="bottom" title="确定吗?" onConfirm={handleConfirm}>
            <Button>Bottom</Button>
          </Popconfirm>
          <Popconfirm placement="left" title="确定吗?" onConfirm={handleConfirm}>
            <Button>Left</Button>
          </Popconfirm>
          <Popconfirm placement="right" title="确定吗?" onConfirm={handleConfirm}>
            <Button>Right</Button>
          </Popconfirm>
        </div>
      </CodeBlock>

      <CodeBlock
        title="自定义按钮文字"
        description="可以自定义确认和取消按钮的文字。"
        code={`import { Popconfirm, Button } from '@myui/components';

<Popconfirm
  title="确定要提交表单吗?"
  okText="提交"
  cancelText="再想想"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
>
  <Button variant="primary">提交表单</Button>
</Popconfirm>`}
      >
        <div style={containerStyle}>
          <Popconfirm
            title="确定要提交表单吗?"
            okText="提交"
            cancelText="再想想"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          >
            <Button variant="primary">提交表单</Button>
          </Popconfirm>
        </div>
      </CodeBlock>

      <CodeBlock
        title="自定义图标"
        description="可以自定义确认框的图标。"
        code={`import { Popconfirm, Button } from '@myui/components';

const customIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1L10.5 6H15L11 9.5L12.5 15L8 11.5L3.5 15L5 9.5L1 6H5.5L8 1Z" />
  </svg>
);

<Popconfirm
  title="确定要收藏吗?"
  icon={customIcon}
  onConfirm={handleConfirm}
>
  <Button>收藏</Button>
</Popconfirm>`}
      >
        <div style={containerStyle}>
          <Popconfirm
            title="确定要收藏吗?"
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                style={{ color: '#f59e0b' }}
              >
                <path d="M8 1L10.5 6H15L11 9.5L12.5 15L8 11.5L3.5 15L5 9.5L1 6H5.5L8 1Z" />
              </svg>
            }
            onConfirm={handleConfirm}
          >
            <Button>收藏</Button>
          </Popconfirm>
        </div>
      </CodeBlock>

      <CodeBlock
        title="异步确认"
        description="onConfirm 可以返回 Promise,确认按钮会显示 loading 状态。"
        code={`import { Popconfirm, Button, Message } from '@myui/components';

const handleAsyncConfirm = async () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      Message.success('异步操作完成');
      resolve();
    }, 2000);
  });
};

<Popconfirm
  title="确定要执行此操作吗?"
  description="这是一个异步操作,需要等待 2 秒。"
  onConfirm={handleAsyncConfirm}
>
  <Button variant="primary">异步确认</Button>
</Popconfirm>`}
      >
        <div style={containerStyle}>
          <Popconfirm
            title="确定要执行此操作吗?"
            description="这是一个异步操作,需要等待 2 秒。"
            onConfirm={handleAsyncConfirm}
          >
            <Button variant="primary">异步确认</Button>
          </Popconfirm>
        </div>
      </CodeBlock>

      <CodeBlock
        title="自定义按钮属性"
        description="可以通过 okButtonProps 和 cancelButtonProps 自定义按钮属性。"
        code={`import { Popconfirm, Button } from '@myui/components';

<Popconfirm
  title="确定要删除吗?"
  onConfirm={handleConfirm}
  okButtonProps={{ variant: 'danger' }}
  cancelButtonProps={{ variant: 'outline' }}
>
  <Button>自定义按钮</Button>
</Popconfirm>`}
      >
        <div style={containerStyle}>
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={handleConfirm}
            okButtonProps={{ variant: 'danger' }}
            cancelButtonProps={{ variant: 'outline' }}
          >
            <Button>自定义按钮</Button>
          </Popconfirm>
        </div>
      </CodeBlock>

      <CodeBlock
        title="禁用状态"
        description="设置 disabled 禁用确认框。"
        code={`import { Popconfirm, Button } from '@myui/components';

<Popconfirm title="确定吗?" disabled>
  <Button>禁用的确认框</Button>
</Popconfirm>`}
      >
        <div style={containerStyle}>
          <Popconfirm title="确定吗?" disabled>
            <Button>禁用的确认框</Button>
          </Popconfirm>
        </div>
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={{ ...docHeadingStyles.h2, marginBottom: '24px' }}>API</h2>
        <PropsTable data={popconfirmProps} />

        <div
          style={{
            marginTop: '32px',
            padding: '16px',
            backgroundColor: 'var(--bg-secondary, #f3f4f6)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--color-primary, #3b82f6)',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', fontWeight: '600' }}>
            💡 使用提示
          </h4>
          <ul
            style={{
              margin: 0,
              paddingLeft: '24px',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
            }}
          >
            <li>Popconfirm 适用于需要用户二次确认的操作,如删除、提交等</li>
            <li>onConfirm 返回 Promise 时,确认按钮会自动显示 loading 状态</li>
            <li>异步操作完成后,确认框会自动关闭</li>
            <li>点击取消按钮或外部区域会关闭确认框</li>
            <li>可以通过 okButtonProps 和 cancelButtonProps 自定义按钮样式</li>
            <li>支持暗色主题,会自动适配当前主题</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PopconfirmDocs;
