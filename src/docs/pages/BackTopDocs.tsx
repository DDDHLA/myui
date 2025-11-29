import React from "react";
import { BackTop } from "@/components";
import { CodeBlock } from "@/components/CodeBlock";
import { PropsTable } from "@/components/PropsTable";
import type { PropItem } from "@/components/PropsTable";
import { docHeadingStyles, docParagraphStyles } from "@/styles/docStyles";

const BackTopDocs: React.FC = () => {
  const backTopProps: PropItem[] = [
    { name: "target", type: "() => HTMLElement | Window", description: "设置需要监听其滚动事件的元素" },
    { name: "visibilityHeight", type: "number", default: "400", description: "滚动高度达到此参数值才出现 BackTop" },
    { name: "onClick", type: "(e: MouseEvent) => void", description: "点击按钮的回调函数" },
    { name: "children", type: "ReactNode", description: "自定义内容" },
    { name: "duration", type: "number", default: "450", description: "滚动动画的时长（毫秒）" },
  ];

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={docHeadingStyles.h1}>BackTop 回到顶部</h1>
        <p style={docParagraphStyles.lead}>
          返回页面顶部的操作按钮。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="最简单的用法，滚动页面后会在右下角出现回到顶部按钮。"
        code={`<BackTop />

// 向下滚动页面查看效果`}
      >
        <div style={{ padding: "16px", background: "var(--bg-secondary)", borderRadius: "8px" }}>
          <p style={{ margin: 0, color: "var(--text-secondary)" }}>
            向下滚动页面，当滚动超过 400px 时，右下角会出现回到顶部按钮。
          </p>
        </div>
        <BackTop />
      </CodeBlock>

      <CodeBlock
        title="自定义样式"
        description="可以自定义按钮的样式。"
        code={`<BackTop>
  <div style={{
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#1890ff',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
  }}>
    UP
  </div>
</BackTop>`}
      >
        <div style={{ padding: "16px", background: "var(--bg-secondary)", borderRadius: "8px" }}>
          <p style={{ margin: 0, color: "var(--text-secondary)" }}>
            自定义按钮样式示例（需要滚动页面查看效果）
          </p>
        </div>
      </CodeBlock>

      <CodeBlock
        title="自定义可见高度"
        description="通过 visibilityHeight 设置滚动多少高度后显示按钮。"
        code={`<BackTop visibilityHeight={200} />

// 滚动超过 200px 后显示`}
      >
        <div style={{ padding: "16px", background: "var(--bg-secondary)", borderRadius: "8px" }}>
          <p style={{ margin: 0, color: "var(--text-secondary)" }}>
            设置 visibilityHeight=200，滚动超过 200px 后显示按钮。
          </p>
        </div>
      </CodeBlock>

      <CodeBlock
        title="自定义动画时长"
        description="通过 duration 设置滚动动画的时长。"
        code={`<BackTop duration={1000} />

// 滚动动画持续 1 秒`}
      >
        <div style={{ padding: "16px", background: "var(--bg-secondary)", borderRadius: "8px" }}>
          <p style={{ margin: 0, color: "var(--text-secondary)" }}>
            设置 duration=1000，滚动动画持续 1 秒。
          </p>
        </div>
      </CodeBlock>

      <div style={{ marginTop: "48px" }}>
        <h2 style={docHeadingStyles.h2}>API</h2>

        <h3 style={docHeadingStyles.h3}>BackTop Props</h3>
        <PropsTable data={backTopProps} />
      </div>

      <div style={{ marginTop: "32px", padding: "16px", background: "var(--bg-secondary)", borderRadius: "8px" }}>
        <h4 style={{ margin: "0 0 8px 0" }}>注意事项</h4>
        <ul style={{ margin: 0, paddingLeft: "20px", color: "var(--text-secondary)" }}>
          <li>默认情况下，BackTop 会监听 window 的滚动事件</li>
          <li>如果需要在特定容器内使用，可以通过 target 属性指定容器</li>
          <li>按钮默认固定在页面右下角，可以通过 style 属性自定义位置</li>
        </ul>
      </div>
    </div>
  );
};

export default BackTopDocs;
