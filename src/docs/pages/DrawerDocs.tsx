import { useState } from 'react';
import { Drawer, Button } from '@/components';
import { CodeBlock } from '@/components/CodeBlock';
import { PropsTable, type PropItem } from '@/components/PropsTable';
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles';

const DrawerDocs = () => {
  const [openRight, setOpenRight] = useState(false);
  const [openLeft, setOpenLeft] = useState(false);
  const [openTop, setOpenTop] = useState(false);
  const [openBottom, setOpenBottom] = useState(false);
  const [openCustom, setOpenCustom] = useState(false);
  const [openNoOptions, setOpenNoOptions] = useState(false);
  const [openInContainer, setOpenInContainer] = useState(false);

  const drawerProps: PropItem[] = [
    { name: 'open', type: 'boolean', description: '是否可见', default: 'false' },
    { name: 'onClose', type: '() => void', description: '关闭时的回调', required: true },
    { name: 'title', type: 'ReactNode', description: '抽屉标题' },
    { name: 'footer', type: 'ReactNode', description: '抽屉底部内容' },
    { name: 'placement', type: "'left' | 'right' | 'top' | 'bottom'", description: '抽屉方向', default: "'right'" },
    { name: 'width', type: 'string | number', description: '宽度 (left/right)', default: '256' },
    { name: 'height', type: 'string | number', description: '高度 (top/bottom)', default: '256' },
    { name: 'mask', type: 'boolean', description: '是否显示蒙层', default: 'true' },
    { name: 'maskClosable', type: 'boolean', description: '点击蒙层是否允许关闭', default: 'true' },
    { name: 'closable', type: 'boolean', description: '是否显示关闭按钮', default: 'true' },
    { name: 'destroyOnClose', type: 'boolean', description: '关闭时销毁抽屉内容', default: 'false' },
    { name: 'children', type: 'ReactNode', description: '抽屉内容' },
    { name: 'className', type: 'string', description: '自定义抽屉类名' },
    { name: 'maskClassName', type: 'string', description: '自定义蒙层类名' },
    { name: 'style', type: 'React.CSSProperties', description: '抽屉样式' },
    { name: 'maskStyle', type: 'React.CSSProperties', description: '蒙层样式' },
    { name: 'zIndex', type: 'number', description: 'z-index 值', default: '1000' },
  ];

  const renderFooter = (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
      <Button onClick={() => setOpenCustom(false)}>Cancel</Button>
      <Button variant="primary" onClick={() => setOpenCustom(false)}>Submit</Button>
    </div>
  );

  return (
    <div>
      <h1 style={docHeadingStyles.h1}>Drawer 抽屉</h1>
      <p style={docParagraphStyles.lead}>屏幕边缘滑出的浮层面板。</p>

      <CodeBlock
        title="基本用法"
        description="从右侧滑出的抽屉，点击按钮打开，点击蒙层或关闭按钮关闭。"
        code={`import { Drawer, Button } from '@myui/components';
import { useState } from 'react';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open Drawer
      </Button>
      <Drawer
        title="Basic Drawer"
        open={open}
        onClose={() => setOpen(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
}`}
      >
        <Button variant="primary" onClick={() => setOpenRight(true)}>
          Open Drawer
        </Button>
        <Drawer
          title="Basic Drawer"
          open={openRight}
          onClose={() => setOpenRight(false)}
        >
          <p>这是一些抽屉内容...</p>
          <p>This is some drawer content...</p>
          <p>You can put any ReactNode here.</p>
        </Drawer>
      </CodeBlock>

      <CodeBlock
        title="不同方向"
        description="支持从上、下、左、右四个方向滑出。"
        code={`import { Drawer, Button } from '@myui/components';
import { useState } from 'react';

function App() {
  const [openRight, setOpenRight] = useState(false);
  const [openLeft, setOpenLeft] = useState(false);
  const [openTop, setOpenTop] = useState(false);
  const [openBottom, setOpenBottom] = useState(false);

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button onClick={() => setOpenTop(true)}>Top</Button>
      <Button onClick={() => setOpenBottom(true)}>Bottom</Button>
      <Button onClick={() => setOpenLeft(true)}>Left</Button>
      <Button onClick={() => setOpenRight(true)}>Right</Button>

      <Drawer title="Top Drawer" placement="top" open={openTop} onClose={() => setOpenTop(false)}>
        <p>This is a top drawer.</p>
      </Drawer>
      <Drawer title="Bottom Drawer" placement="bottom" open={openBottom} onClose={() => setOpenBottom(false)}>
        <p>This is a bottom drawer.</p>
      </Drawer>
      <Drawer title="Left Drawer" placement="left" open={openLeft} onClose={() => setOpenLeft(false)}>
        <p>This is a left drawer.</p>
      </Drawer>
      <Drawer title="Right Drawer" placement="right" open={openRight} onClose={() => setOpenRight(false)}>
        <p>This is a right drawer.</p>
      </Drawer>
    </div>
  );
}`}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button onClick={() => setOpenTop(true)}>Top</Button>
          <Button onClick={() => setOpenBottom(true)}>Bottom</Button>
          <Button onClick={() => setOpenLeft(true)}>Left</Button>
          <Button onClick={() => setOpenRight(true)}>Right</Button>
        </div>
        <Drawer title="Top Drawer" placement="top" open={openTop} onClose={() => setOpenTop(false)}>
          <p>这是从顶部滑出的抽屉。</p>
        </Drawer>
        <Drawer title="Bottom Drawer" placement="bottom" open={openBottom} onClose={() => setOpenBottom(false)}>
          <p>这是从底部滑出的抽屉。</p>
        </Drawer>
        <Drawer title="Left Drawer" placement="left" open={openLeft} onClose={() => setOpenLeft(false)}>
          <p>这是从左侧滑出的抽屉。</p>
        </Drawer>
        <Drawer title="Right Drawer" placement="right" open={openRight} onClose={() => setOpenRight(false)}>
          <p>这是从右侧滑出的抽屉。</p>
        </Drawer>
      </CodeBlock>

      <CodeBlock
        title="自定义尺寸与底部内容"
        description="可以自定义抽屉的宽度或高度，以及添加底部操作区域。"
        code={`import { Drawer, Button } from '@myui/components';
import { useState } from 'react';

function App() {
  const [open, setOpen] = useState(false);

  const footer = (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
      <Button onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={() => setOpen(false)}>Submit</Button>
    </div>
  );

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open Custom Drawer
      </Button>
      <Drawer
        title="Custom Drawer"
        placement="right"
        width={500} // Custom width
        footer={footer} // Custom footer
        open={open}
        onClose={() => setOpen(false)}
      >
        <p>This drawer has a custom width and a footer.</p>
        <p>You can place any content in the footer area.</p>
      </Drawer>
    </>
  );
}`}
      >
        <Button variant="primary" onClick={() => setOpenCustom(true)}>
          Open Custom Drawer
        </Button>
        <Drawer
          title="Custom Drawer"
          placement="right"
          width={500}
          footer={renderFooter}
          open={openCustom}
          onClose={() => setOpenCustom(false)}
        >
          <p>这个抽屉有自定义的宽度和底部内容。</p>
          <p>你可以在底部放置任何操作按钮或信息。</p>
        </Drawer>
      </CodeBlock>

      <CodeBlock
        title="无标题、无蒙层、无关闭按钮"
        description="可以根据需求隐藏标题、蒙层或关闭按钮。"
        code={`import { Drawer, Button } from '@myui/components';
import { useState } from 'react';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open Drawer
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={null} // Hide title
        mask={false} // Hide mask
        closable={false} // Hide close button
      >
        <p>This drawer has no title, no mask, and no close button.</p>
      </Drawer>
    </>
  );
}`}
      >
        <Button onClick={() => setOpenNoOptions(true)}>
          无标题、无蒙层、无关闭按钮
        </Button>
        <Drawer
          open={openNoOptions}
          onClose={() => setOpenNoOptions(false)}
          closable={false}
        >
          <p>这个抽屉没有标题，没有蒙层，也没有关闭按钮。</p>
          <p>你需要通过其他方式关闭它，比如点击内容区域的按钮。</p>
          <Button onClick={() => setOpenNoOptions(false)} style={{ marginTop: '16px' }}>
            关闭抽屉
          </Button>
        </Drawer>
      </CodeBlock>

      <CodeBlock
        title="局部容器抽屉"
        description="抽屉可以在指定的容器内打开，而不是全屏。通过设置 getContainer 属性来指定容器。"
        code={`import { Drawer, Button } from '@myui/components';
import { useState, useRef } from 'react';

function App() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  return (
    <div 
      ref={containerRef}
      style={{ 
        position: 'relative', 
        height: '400px', 
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '16px'
      }}
    >
      <h3>这是一个容器</h3>
      <p>抽屉将在这个容器内打开</p>
      <Button onClick={() => setOpen(true)}>
        打开容器内抽屉
      </Button>
      <Drawer
        title="容器内抽屉"
        placement="right"
        width={300}
        open={open}
        onClose={() => setOpen(false)}
        getContainer={() => containerRef.current}
      >
        <p>这个抽屉在容器内打开，不会覆盖整个页面。</p>
      </Drawer>
    </div>
  );
}`}
      >
        <div
          style={{
            position: 'relative',
            height: '400px',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '16px',
            backgroundColor: 'var(--bg-secondary)'
          }}
        >
          <h3>这是一个容器</h3>
          <p>抽屉将在这个容器内打开</p>
          <Button onClick={() => setOpenInContainer(true)}>
            打开容器内抽屉
          </Button>
          <Drawer
            title="容器内抽屉"
            placement="right"
            width={300}
            open={openInContainer}
            onClose={() => setOpenInContainer(false)}
            getContainer={false}
            style={{ position: 'absolute' }}
          >
            <p>这个抽屉在容器内打开，不会覆盖整个页面。</p>
            <p>它只在当前容器的范围内显示。</p>
          </Drawer>
        </div>
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={{ ...docHeadingStyles.h2, marginBottom: '24px' }}>API</h2>
        <PropsTable data={drawerProps} />
      </div>
    </div>
  );
};

export default DrawerDocs;
