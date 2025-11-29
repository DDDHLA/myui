import React, { useState } from "react";
import { Collapse } from "@/components";
import { CodeBlock } from "@/components/CodeBlock";
import { PropsTable } from "@/components/PropsTable";
import type { PropItem } from "@/components/PropsTable";
import { docHeadingStyles, docParagraphStyles } from "@/styles/docStyles";

const { Panel } = Collapse;

const CollapseDocs: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string[]>(["1"]);

  const collapseProps: PropItem[] = [
    { name: "activeKey", type: "string | string[]", description: "当前激活的面板 key" },
    { name: "defaultActiveKey", type: "string | string[]", description: "默认激活的面板 key" },
    { name: "accordion", type: "boolean", default: "false", description: "手风琴模式（每次只展开一个）" },
    { name: "bordered", type: "boolean", default: "true", description: "是否显示边框" },
    { name: "ghost", type: "boolean", default: "false", description: "幽灵模式（无边框背景）" },
    { name: "expandIcon", type: "ReactNode | ((props) => ReactNode)", description: "自定义展开图标" },
    { name: "expandIconPosition", type: "'start' | 'end'", default: "'start'", description: "展开图标位置" },
    { name: "size", type: "'small' | 'default' | 'large'", default: "'default'", description: "尺寸" },
    { name: "collapsible", type: "'header' | 'icon' | 'disabled'", default: "'header'", description: "可折叠触发区域" },
    { name: "onChange", type: "(activeKey: string | string[]) => void", description: "切换回调" },
  ];

  const panelProps: PropItem[] = [
    { name: "panelKey", type: "string", description: "面板唯一标识", required: true },
    { name: "header", type: "ReactNode", description: "面板标题", required: true },
    { name: "disabled", type: "boolean", default: "false", description: "是否禁用" },
    { name: "showArrow", type: "boolean", default: "true", description: "是否显示箭头" },
    { name: "expandIcon", type: "ReactNode | ((props) => ReactNode)", description: "自定义展开图标" },
    { name: "extra", type: "ReactNode", description: "额外内容（显示在标题右侧）" },
    { name: "forceRender", type: "boolean", default: "false", description: "强制渲染内容（即使未展开）" },
    { name: "collapsible", type: "'header' | 'icon' | 'disabled'", description: "可折叠触发区域" },
  ];

  const text = `
    这是一段示例文本。折叠面板可以用来收纳较长的内容，让页面更加整洁。
    用户可以点击面板标题来展开或收起内容。
  `;

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={docHeadingStyles.h1}>Collapse 折叠面板</h1>
        <p style={docParagraphStyles.lead}>
          可以折叠/展开的内容区域。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="可以同时展开多个面板。"
        code={`<Collapse defaultActiveKey={['1']}>
  <Collapse.Panel panelKey="1" header="面板标题 1">
    <p>这是面板 1 的内容</p>
  </Collapse.Panel>
  <Collapse.Panel panelKey="2" header="面板标题 2">
    <p>这是面板 2 的内容</p>
  </Collapse.Panel>
  <Collapse.Panel panelKey="3" header="面板标题 3">
    <p>这是面板 3 的内容</p>
  </Collapse.Panel>
</Collapse>`}
      >
        <Collapse defaultActiveKey={["1"]}>
          <Panel panelKey="1" header="面板标题 1">
            <p>{text}</p>
          </Panel>
          <Panel panelKey="2" header="面板标题 2">
            <p>{text}</p>
          </Panel>
          <Panel panelKey="3" header="面板标题 3">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </CodeBlock>

      <CodeBlock
        title="手风琴模式"
        description="每次只能展开一个面板。"
        code={`<Collapse accordion defaultActiveKey="1">
  <Collapse.Panel panelKey="1" header="面板标题 1">
    <p>这是面板 1 的内容</p>
  </Collapse.Panel>
  <Collapse.Panel panelKey="2" header="面板标题 2">
    <p>这是面板 2 的内容</p>
  </Collapse.Panel>
  <Collapse.Panel panelKey="3" header="面板标题 3">
    <p>这是面板 3 的内容</p>
  </Collapse.Panel>
</Collapse>`}
      >
        <Collapse accordion defaultActiveKey="1">
          <Panel panelKey="1" header="面板标题 1">
            <p>{text}</p>
          </Panel>
          <Panel panelKey="2" header="面板标题 2">
            <p>{text}</p>
          </Panel>
          <Panel panelKey="3" header="面板标题 3">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </CodeBlock>

      <CodeBlock
        title="无边框"
        description="设置 bordered={false} 去除边框。"
        code={`<Collapse bordered={false} defaultActiveKey={['1']}>
  <Collapse.Panel panelKey="1" header="面板标题 1">
    <p>这是面板 1 的内容</p>
  </Collapse.Panel>
  <Collapse.Panel panelKey="2" header="面板标题 2">
    <p>这是面板 2 的内容</p>
  </Collapse.Panel>
</Collapse>`}
      >
        <Collapse bordered={false} defaultActiveKey={["1"]}>
          <Panel panelKey="1" header="面板标题 1">
            <p>{text}</p>
          </Panel>
          <Panel panelKey="2" header="面板标题 2">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </CodeBlock>

      <CodeBlock
        title="幽灵模式"
        description="设置 ghost 属性使用透明背景。"
        code={`<Collapse ghost defaultActiveKey={['1']}>
  <Collapse.Panel panelKey="1" header="面板标题 1">
    <p>这是面板 1 的内容</p>
  </Collapse.Panel>
  <Collapse.Panel panelKey="2" header="面板标题 2">
    <p>这是面板 2 的内容</p>
  </Collapse.Panel>
</Collapse>`}
      >
        <Collapse ghost defaultActiveKey={["1"]}>
          <Panel panelKey="1" header="面板标题 1">
            <p>{text}</p>
          </Panel>
          <Panel panelKey="2" header="面板标题 2">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </CodeBlock>

      <CodeBlock
        title="不同尺寸"
        description="提供三种尺寸：small、default、large。"
        code={`<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
  <Collapse size="small" defaultActiveKey={['1']}>
    <Collapse.Panel panelKey="1" header="小尺寸">
      <p>小尺寸内容</p>
    </Collapse.Panel>
  </Collapse>
  <Collapse size="default" defaultActiveKey={['1']}>
    <Collapse.Panel panelKey="1" header="默认尺寸">
      <p>默认尺寸内容</p>
    </Collapse.Panel>
  </Collapse>
  <Collapse size="large" defaultActiveKey={['1']}>
    <Collapse.Panel panelKey="1" header="大尺寸">
      <p>大尺寸内容</p>
    </Collapse.Panel>
  </Collapse>
</div>`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <Collapse size="small" defaultActiveKey={["1"]}>
            <Panel panelKey="1" header="小尺寸">
              <p>小尺寸内容</p>
            </Panel>
          </Collapse>
          <Collapse size="default" defaultActiveKey={["1"]}>
            <Panel panelKey="1" header="默认尺寸">
              <p>默认尺寸内容</p>
            </Panel>
          </Collapse>
          <Collapse size="large" defaultActiveKey={["1"]}>
            <Panel panelKey="1" header="大尺寸">
              <p>大尺寸内容</p>
            </Panel>
          </Collapse>
        </div>
      </CodeBlock>

      <CodeBlock
        title="图标位置"
        description="设置 expandIconPosition 改变图标位置。"
        code={`<Collapse expandIconPosition="end" defaultActiveKey={['1']}>
  <Collapse.Panel panelKey="1" header="面板标题 1">
    <p>这是面板 1 的内容</p>
  </Collapse.Panel>
  <Collapse.Panel panelKey="2" header="面板标题 2">
    <p>这是面板 2 的内容</p>
  </Collapse.Panel>
</Collapse>`}
      >
        <Collapse expandIconPosition="end" defaultActiveKey={["1"]}>
          <Panel panelKey="1" header="面板标题 1">
            <p>{text}</p>
          </Panel>
          <Panel panelKey="2" header="面板标题 2">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </CodeBlock>

      <CodeBlock
        title="额外内容"
        description="通过 extra 属性在标题右侧添加额外内容。"
        code={`<Collapse defaultActiveKey={['1']}>
  <Collapse.Panel panelKey="1" header="面板标题 1" extra={<span style={{ color: '#3b82f6' }}>更多</span>}>
    <p>这是面板 1 的内容</p>
  </Collapse.Panel>
  <Collapse.Panel panelKey="2" header="面板标题 2" extra={<span style={{ color: '#10b981' }}>详情</span>}>
    <p>这是面板 2 的内容</p>
  </Collapse.Panel>
</Collapse>`}
      >
        <Collapse defaultActiveKey={["1"]}>
          <Panel panelKey="1" header="面板标题 1" extra={<span style={{ color: "#3b82f6" }}>更多</span>}>
            <p>{text}</p>
          </Panel>
          <Panel panelKey="2" header="面板标题 2" extra={<span style={{ color: "#10b981" }}>详情</span>}>
            <p>{text}</p>
          </Panel>
        </Collapse>
      </CodeBlock>

      <CodeBlock
        title="禁用面板"
        description="设置 disabled 禁用特定面板。"
        code={`<Collapse defaultActiveKey={['1']}>
  <Collapse.Panel panelKey="1" header="可用面板">
    <p>这是可用面板的内容</p>
  </Collapse.Panel>
  <Collapse.Panel panelKey="2" header="禁用面板" disabled>
    <p>这是禁用面板的内容</p>
  </Collapse.Panel>
</Collapse>`}
      >
        <Collapse defaultActiveKey={["1"]}>
          <Panel panelKey="1" header="可用面板">
            <p>{text}</p>
          </Panel>
          <Panel panelKey="2" header="禁用面板" disabled>
            <p>{text}</p>
          </Panel>
        </Collapse>
      </CodeBlock>

      <CodeBlock
        title="受控模式"
        description="通过 activeKey 和 onChange 实现受控模式。"
        code={`const [activeKey, setActiveKey] = useState(['1']);

<Collapse activeKey={activeKey} onChange={(keys) => setActiveKey(keys as string[])}>
  <Collapse.Panel panelKey="1" header="面板标题 1">
    <p>这是面板 1 的内容</p>
  </Collapse.Panel>
  <Collapse.Panel panelKey="2" header="面板标题 2">
    <p>这是面板 2 的内容</p>
  </Collapse.Panel>
</Collapse>
<p>当前激活: {activeKey.join(', ') || '无'}</p>`}
      >
        <Collapse activeKey={activeKey} onChange={(keys) => setActiveKey(keys as string[])}>
          <Panel panelKey="1" header="面板标题 1">
            <p>{text}</p>
          </Panel>
          <Panel panelKey="2" header="面板标题 2">
            <p>{text}</p>
          </Panel>
        </Collapse>
        <p style={{ marginTop: "16px" }}>当前激活: {activeKey.join(", ") || "无"}</p>
      </CodeBlock>

      <div style={{ marginTop: "48px" }}>
        <h2 style={docHeadingStyles.h2}>API</h2>

        <h3 style={docHeadingStyles.h3}>Collapse Props</h3>
        <PropsTable data={collapseProps} />

        <h3 style={{ ...docHeadingStyles.h3, marginTop: "32px" }}>Collapse.Panel Props</h3>
        <PropsTable data={panelProps} />
      </div>
    </div>
  );
};

export default CollapseDocs;
