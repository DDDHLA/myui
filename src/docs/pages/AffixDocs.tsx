import React, { useState } from "react";
import { Affix, Button } from "@/components";
import { CodeBlock } from "@/components/CodeBlock";
import { PropsTable } from "@/components/PropsTable";
import type { PropItem } from "@/components/PropsTable";
import { docHeadingStyles, docParagraphStyles } from "@/styles/docStyles";

const AffixDocs: React.FC = () => {
  const [affixed, setAffixed] = useState(false);

  const affixProps: PropItem[] = [
    { name: "offsetTop", type: "number", description: "距离窗口顶部达到指定偏移量后触发" },
    { name: "offsetBottom", type: "number", description: "距离窗口底部达到指定偏移量后触发" },
    { name: "target", type: "() => HTMLElement | Window", description: "设置需要监听其滚动事件的元素" },
    { name: "onChange", type: "(affixed: boolean) => void", description: "固定状态改变时触发的回调函数" },
  ];

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={docHeadingStyles.h1}>Affix 固钉</h1>
        <p style={docParagraphStyles.lead}>
          将页面元素钉在可视范围。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="最简单的用法，当页面滚动时，按钮会固定在顶部。"
        code={`<Affix offsetTop={100}>
  <Button variant="primary">固定在顶部 100px</Button>
</Affix>`}
      >
        <Affix offsetTop={100}>
          <Button variant="primary">固定在顶部 100px</Button>
        </Affix>
      </CodeBlock>

      <CodeBlock
        title="固定状态回调"
        description="通过 onChange 回调获取固定状态。"
        code={`const [affixed, setAffixed] = useState(false);

<Affix offsetTop={150} onChange={setAffixed}>
  <Button variant={affixed ? 'primary' : 'secondary'}>
    {affixed ? '已固定' : '未固定'}
  </Button>
</Affix>`}
      >
        <Affix offsetTop={150} onChange={setAffixed}>
          <Button variant={affixed ? "primary" : "secondary"}>
            {affixed ? "已固定" : "未固定"}
          </Button>
        </Affix>
      </CodeBlock>

      <CodeBlock
        title="固定在底部"
        description="使用 offsetBottom 将元素固定在底部。"
        code={`<Affix offsetBottom={100}>
  <Button variant="primary">固定在底部 100px</Button>
</Affix>`}
      >
        <Affix offsetBottom={100}>
          <Button variant="primary">固定在底部 100px</Button>
        </Affix>
      </CodeBlock>

      <div style={{ marginTop: "48px" }}>
        <h2 style={docHeadingStyles.h2}>API</h2>

        <h3 style={docHeadingStyles.h3}>Affix Props</h3>
        <PropsTable data={affixProps} />
      </div>

      <div style={{ marginTop: "32px", padding: "16px", background: "var(--bg-secondary)", borderRadius: "8px" }}>
        <h4 style={{ margin: "0 0 8px 0" }}>注意事项</h4>
        <ul style={{ margin: 0, paddingLeft: "20px", color: "var(--text-secondary)" }}>
          <li>Affix 组件需要在可滚动的容器中才能看到效果</li>
          <li>如果需要在特定容器内固定，可以使用 target 属性指定容器</li>
          <li>offsetTop 和 offsetBottom 不能同时使用</li>
        </ul>
      </div>
    </div>
  );
};

export default AffixDocs;
