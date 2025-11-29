import React from "react";
import { Statistic, Countdown } from "@/components";
import { CodeBlock } from "@/components/CodeBlock";
import { PropsTable } from "@/components/PropsTable";
import type { PropItem } from "@/components/PropsTable";
import { docHeadingStyles, docParagraphStyles } from "@/styles/docStyles";

const StatisticDocs: React.FC = () => {
  const statisticProps: PropItem[] = [
    { name: "title", type: "ReactNode", description: "标题" },
    { name: "value", type: "number | string", description: "数值", required: true },
    { name: "precision", type: "number", description: "精度（小数位数）" },
    { name: "prefix", type: "ReactNode", description: "前缀" },
    { name: "suffix", type: "ReactNode", description: "后缀" },
    { name: "groupSeparator", type: "boolean", default: "true", description: "是否显示千分位分隔符" },
    { name: "separator", type: "string", default: "','", description: "自定义分隔符" },
    { name: "decimalSeparator", type: "string", default: "'.'", description: "小数点符号" },
    { name: "valueStyle", type: "CSSProperties", description: "数值样式" },
    { name: "loading", type: "boolean", default: "false", description: "是否加载中" },
    { name: "trend", type: "'up' | 'down'", description: "趋势" },
    { name: "trendColor", type: "boolean", default: "true", description: "趋势颜色" },
    { name: "animation", type: "boolean", default: "false", description: "是否开启动画" },
    { name: "animationDuration", type: "number", default: "1000", description: "动画时长（毫秒）" },
  ];

  const countdownProps: PropItem[] = [
    { name: "title", type: "ReactNode", description: "标题" },
    { name: "value", type: "number | Date", description: "目标时间（时间戳或 Date 对象）", required: true },
    { name: "format", type: "string", default: "'HH:mm:ss'", description: "格式化字符串" },
    { name: "prefix", type: "ReactNode", description: "前缀" },
    { name: "suffix", type: "ReactNode", description: "后缀" },
    { name: "valueStyle", type: "CSSProperties", description: "数值样式" },
    { name: "onFinish", type: "() => void", description: "倒计时完成回调" },
    { name: "onChange", type: "(value: number) => void", description: "倒计时变化回调" },
  ];

  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={docHeadingStyles.h1}>Statistic 统计数值</h1>
        <p style={docParagraphStyles.lead}>
          展示统计数值。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="简单的展示。"
        code={`<div style={{ display: 'flex', gap: '48px' }}>
  <Statistic title="活跃用户" value={112893} />
  <Statistic title="账户余额（CNY）" value={112893.64} precision={2} />
</div>`}
      >
        <div style={{ display: "flex", gap: "48px" }}>
          <Statistic title="活跃用户" value={112893} />
          <Statistic title="账户余额（CNY）" value={112893.64} precision={2} />
        </div>
      </CodeBlock>

      <CodeBlock
        title="前缀和后缀"
        description="通过前缀和后缀添加内容。"
        code={`<div style={{ display: 'flex', gap: '48px' }}>
  <Statistic title="反馈" value={1128} prefix="👍" />
  <Statistic title="销售额" value={93} suffix="%" />
  <Statistic title="价格" value={99.99} prefix="¥" suffix="元" />
</div>`}
      >
        <div style={{ display: "flex", gap: "48px" }}>
          <Statistic title="反馈" value={1128} prefix="👍" />
          <Statistic title="销售额" value={93} suffix="%" />
          <Statistic title="价格" value={99.99} prefix="¥" suffix="元" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="趋势"
        description="展示数值的趋势。"
        code={`<div style={{ display: 'flex', gap: '48px' }}>
  <Statistic title="增长率" value={11.28} precision={2} suffix="%" trend="up" />
  <Statistic title="下降率" value={9.3} precision={2} suffix="%" trend="down" />
</div>`}
      >
        <div style={{ display: "flex", gap: "48px" }}>
          <Statistic title="增长率" value={11.28} precision={2} suffix="%" trend="up" />
          <Statistic title="下降率" value={9.3} precision={2} suffix="%" trend="down" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="自定义样式"
        description="通过 valueStyle 自定义数值样式。"
        code={`<Statistic
  title="账户余额"
  value={112893}
  valueStyle={{ color: '#3b82f6', fontSize: '48px' }}
/>`}
      >
        <Statistic
          title="账户余额"
          value={112893}
          valueStyle={{ color: "#3b82f6", fontSize: "48px" }}
        />
      </CodeBlock>

      <CodeBlock
        title="加载状态"
        description="数据加载中的状态。"
        code={`<div style={{ display: 'flex', gap: '48px' }}>
  <Statistic title="活跃用户" value={112893} loading />
  <Statistic title="账户余额" value={112893} />
</div>`}
      >
        <div style={{ display: "flex", gap: "48px" }}>
          <Statistic title="活跃用户" value={112893} loading />
          <Statistic title="账户余额" value={112893} />
        </div>
      </CodeBlock>

      <CodeBlock
        title="数值动画"
        description="开启数值增长动画。"
        code={`<div style={{ display: 'flex', gap: '48px' }}>
  <Statistic title="活跃用户" value={112893} animation />
  <Statistic title="账户余额" value={112893.64} precision={2} animation animationDuration={2000} />
</div>`}
      >
        <div style={{ display: "flex", gap: "48px" }}>
          <Statistic title="活跃用户" value={112893} animation />
          <Statistic title="账户余额" value={112893.64} precision={2} animation animationDuration={2000} />
        </div>
      </CodeBlock>

      <CodeBlock
        title="倒计时"
        description="倒计时组件。"
        code={`const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

<div style={{ display: 'flex', gap: '48px' }}>
  <Countdown title="倒计时" value={deadline} />
  <Countdown title="带天数" value={deadline} format="D 天 HH:mm:ss" />
</div>`}
      >
        <div style={{ display: "flex", gap: "48px" }}>
          <Countdown title="倒计时" value={deadline} />
          <Countdown title="带天数" value={deadline} format="D 天 HH:mm:ss" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="自定义分隔符"
        description="自定义千分位和小数点分隔符。"
        code={`<div style={{ display: 'flex', gap: '48px' }}>
  <Statistic title="默认分隔符" value={1234567.89} precision={2} />
  <Statistic title="空格分隔" value={1234567.89} precision={2} separator=" " />
  <Statistic title="无分隔符" value={1234567.89} precision={2} groupSeparator={false} />
</div>`}
      >
        <div style={{ display: "flex", gap: "48px" }}>
          <Statistic title="默认分隔符" value={1234567.89} precision={2} />
          <Statistic title="空格分隔" value={1234567.89} precision={2} separator=" " />
          <Statistic title="无分隔符" value={1234567.89} precision={2} groupSeparator={false} />
        </div>
      </CodeBlock>

      <div style={{ marginTop: "48px" }}>
        <h2 style={docHeadingStyles.h2}>API</h2>

        <h3 style={docHeadingStyles.h3}>Statistic Props</h3>
        <PropsTable data={statisticProps} />

        <h3 style={{ ...docHeadingStyles.h3, marginTop: "32px" }}>Countdown Props</h3>
        <PropsTable data={countdownProps} />
      </div>
    </div>
  );
};

export default StatisticDocs;
