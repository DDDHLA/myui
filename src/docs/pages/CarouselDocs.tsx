import React, { useRef } from "react";
import { Carousel, type CarouselRef } from "@/components";
import { CodeBlock } from "@/components/CodeBlock";
import { PropsTable } from "@/components/PropsTable";
import type { PropItem } from "@/components/PropsTable";
import { docHeadingStyles, docParagraphStyles } from "@/styles/docStyles";

const CarouselDocs: React.FC = () => {
  const carouselRef = useRef<CarouselRef>(null);

  const carouselProps: PropItem[] = [
    { name: "children", type: "ReactNode", description: "轮播内容" },
    { name: "autoplay", type: "boolean", default: "false", description: "是否自动播放" },
    { name: "autoplaySpeed", type: "number", default: "3000", description: "自动播放间隔（毫秒）" },
    { name: "dots", type: "boolean", default: "true", description: "是否显示指示点" },
    { name: "dotPosition", type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", description: "指示点位置" },
    { name: "arrows", type: "boolean", default: "false", description: "是否显示箭头" },
    { name: "effect", type: "'slide' | 'fade'", default: "'slide'", description: "切换效果" },
    { name: "infinite", type: "boolean", default: "true", description: "是否无限循环" },
    { name: "speed", type: "number", default: "300", description: "动画速度（毫秒）" },
    { name: "initialSlide", type: "number", default: "0", description: "初始索引" },
    { name: "vertical", type: "boolean", default: "false", description: "是否垂直显示" },
    { name: "beforeChange", type: "(current: number, next: number) => void", description: "切换前回调" },
    { name: "afterChange", type: "(current: number) => void", description: "切换后回调" },
  ];

  const refMethods: PropItem[] = [
    { name: "goTo", type: "(index: number) => void", description: "切换到指定索引" },
    { name: "next", type: "() => void", description: "切换到下一张" },
    { name: "prev", type: "() => void", description: "切换到上一张" },
    { name: "pause", type: "() => void", description: "暂停自动播放" },
    { name: "resume", type: "() => void", description: "恢复自动播放" },
  ];

  const slideStyle: React.CSSProperties = {
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff",
  };

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={docHeadingStyles.h1}>Carousel 走马灯</h1>
        <p style={docParagraphStyles.lead}>
          旋转木马，一组轮播的区域。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="最简单的用法。"
        code={`<Carousel>
  <div style={{ background: '#3b82f6', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px' }}>1</div>
  <div style={{ background: '#10b981', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px' }}>2</div>
  <div style={{ background: '#f59e0b', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px' }}>3</div>
  <div style={{ background: '#ef4444', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px' }}>4</div>
</Carousel>`}
      >
        <Carousel>
          <div style={{ ...slideStyle, background: "#3b82f6" }}>1</div>
          <div style={{ ...slideStyle, background: "#10b981" }}>2</div>
          <div style={{ ...slideStyle, background: "#f59e0b" }}>3</div>
          <div style={{ ...slideStyle, background: "#ef4444" }}>4</div>
        </Carousel>
      </CodeBlock>

      <CodeBlock
        title="自动播放"
        description="设置 autoplay 属性可以自动轮播。"
        code={`<Carousel autoplay autoplaySpeed={2000}>
  <div style={{ background: '#3b82f6', height: '200px' }}>1</div>
  <div style={{ background: '#10b981', height: '200px' }}>2</div>
  <div style={{ background: '#f59e0b', height: '200px' }}>3</div>
</Carousel>`}
      >
        <Carousel autoplay autoplaySpeed={2000}>
          <div style={{ ...slideStyle, background: "#3b82f6" }}>1</div>
          <div style={{ ...slideStyle, background: "#10b981" }}>2</div>
          <div style={{ ...slideStyle, background: "#f59e0b" }}>3</div>
        </Carousel>
      </CodeBlock>

      <CodeBlock
        title="显示箭头"
        description="设置 arrows 属性显示切换箭头。"
        code={`<Carousel arrows>
  <div style={{ background: '#3b82f6', height: '200px' }}>1</div>
  <div style={{ background: '#10b981', height: '200px' }}>2</div>
  <div style={{ background: '#f59e0b', height: '200px' }}>3</div>
</Carousel>`}
      >
        <Carousel arrows>
          <div style={{ ...slideStyle, background: "#3b82f6" }}>1</div>
          <div style={{ ...slideStyle, background: "#10b981" }}>2</div>
          <div style={{ ...slideStyle, background: "#f59e0b" }}>3</div>
        </Carousel>
      </CodeBlock>

      <CodeBlock
        title="淡入淡出效果"
        description="设置 effect='fade' 使用淡入淡出切换效果。"
        code={`<Carousel effect="fade" arrows>
  <div style={{ background: '#3b82f6', height: '200px' }}>1</div>
  <div style={{ background: '#10b981', height: '200px' }}>2</div>
  <div style={{ background: '#f59e0b', height: '200px' }}>3</div>
</Carousel>`}
      >
        <Carousel effect="fade" arrows>
          <div style={{ ...slideStyle, background: "#3b82f6" }}>1</div>
          <div style={{ ...slideStyle, background: "#10b981" }}>2</div>
          <div style={{ ...slideStyle, background: "#f59e0b" }}>3</div>
        </Carousel>
      </CodeBlock>

      <CodeBlock
        title="指示点位置"
        description="通过 dotPosition 设置指示点的位置。"
        code={`<Carousel dotPosition="right" arrows>
  <div style={{ background: '#3b82f6', height: '200px' }}>1</div>
  <div style={{ background: '#10b981', height: '200px' }}>2</div>
  <div style={{ background: '#f59e0b', height: '200px' }}>3</div>
</Carousel>`}
      >
        <Carousel dotPosition="right" arrows>
          <div style={{ ...slideStyle, background: "#3b82f6" }}>1</div>
          <div style={{ ...slideStyle, background: "#10b981" }}>2</div>
          <div style={{ ...slideStyle, background: "#f59e0b" }}>3</div>
        </Carousel>
      </CodeBlock>

      <CodeBlock
        title="无限循环滚动"
        description="设置 infinite 属性后,可以从最后一页顺滑地滑动到第一页,没有跳跃感。试试点击右箭头多次,观察从第4页到第1页的过渡效果。"
        code={`<Carousel infinite arrows autoplay autoplaySpeed={2500}>
  <div style={{ background: '#3b82f6', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px' }}>第 1 页</div>
  <div style={{ background: '#10b981', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px' }}>第 2 页</div>
  <div style={{ background: '#f59e0b', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px' }}>第 3 页</div>
  <div style={{ background: '#ef4444', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px' }}>第 4 页</div>
</Carousel>`}
      >
        <Carousel infinite arrows autoplay autoplaySpeed={2500}>
          <div style={{ ...slideStyle, background: "#3b82f6" }}>第 1 页</div>
          <div style={{ ...slideStyle, background: "#10b981" }}>第 2 页</div>
          <div style={{ ...slideStyle, background: "#f59e0b" }}>第 3 页</div>
          <div style={{ ...slideStyle, background: "#ef4444" }}>第 4 页</div>
        </Carousel>
      </CodeBlock>

      <CodeBlock
        title="方法调用"
        description="通过 ref 调用组件方法控制轮播。"
        code={`const carouselRef = useRef<CarouselRef>(null);

<div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
  <button onClick={() => carouselRef.current?.prev()}>上一张</button>
  <button onClick={() => carouselRef.current?.next()}>下一张</button>
  <button onClick={() => carouselRef.current?.goTo(2)}>跳转到第3张</button>
</div>
<Carousel ref={carouselRef} arrows>
  <div style={{ background: '#3b82f6', height: '200px' }}>1</div>
  <div style={{ background: '#10b981', height: '200px' }}>2</div>
  <div style={{ background: '#f59e0b', height: '200px' }}>3</div>
</Carousel>`}
      >
        <div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
          <button
            onClick={() => carouselRef.current?.prev()}
            style={{
              padding: "8px 16px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            上一张
          </button>
          <button
            onClick={() => carouselRef.current?.next()}
            style={{
              padding: "8px 16px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            下一张
          </button>
          <button
            onClick={() => carouselRef.current?.goTo(2)}
            style={{
              padding: "8px 16px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            跳转到第3张
          </button>
        </div>
        <Carousel ref={carouselRef} arrows>
          <div style={{ ...slideStyle, background: "#3b82f6" }}>1</div>
          <div style={{ ...slideStyle, background: "#10b981" }}>2</div>
          <div style={{ ...slideStyle, background: "#f59e0b" }}>3</div>
        </Carousel>
      </CodeBlock>

      <div style={{ marginTop: "48px" }}>
        <h2 style={docHeadingStyles.h2}>API</h2>

        <h3 style={docHeadingStyles.h3}>Carousel Props</h3>
        <PropsTable data={carouselProps} />

        <h3 style={{ ...docHeadingStyles.h3, marginTop: "32px" }}>Ref Methods</h3>
        <PropsTable data={refMethods} />
      </div>
    </div>
  );
};

export default CarouselDocs;
