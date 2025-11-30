# TypeWriter 流式输出组件

一个优雅的打字机效果组件，支持逐字符流式输出文本，适用于 AI 对话、代码演示、产品介绍等场景。

## 特性

- 🎯 **流畅动画** - 逐字符打字效果，模拟真实打字场景
- ⚡ **高性能** - 基于 React Hooks 和 Framer Motion，性能优秀
- 🎨 **高度自定义** - 支持自定义速度、光标样式、HTML 元素等
- 🔄 **循环播放** - 支持循环模式，可自动删除并重新播放
- ⏱️ **完整控制** - 支持延迟开始、完成回调等
- 📱 **响应式** - 自适应各种容器尺寸
- ♿ **可访问性** - 符合无障碍标准

## 基础用法

```tsx
import { TypeWriter } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <TypeWriter 
      text="Hello, World! 这是一个流式输出组件。" 
      speed={100}
    />
  )
}
```

## API

### TypeWriterProps

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| text | 要显示的文本内容 | `string` | - |
| speed | 每个字符的延迟时间（毫秒） | `number` | `50` |
| showCursor | 是否显示光标 | `boolean` | `true` |
| cursor | 光标字符 | `string` | `\|` |
| cursorBlinkSpeed | 光标闪烁速度（毫秒） | `number` | `530` |
| onComplete | 完成后的回调 | `() => void` | - |
| className | 自定义类名 | `string` | - |
| loop | 是否循环播放 | `boolean` | `false` |
| deleteSpeed | 循环时删除文字的速度（毫秒） | `number` | `30` |
| pauseTime | 循环时的暂停时间（毫秒） | `number` | `1000` |
| startDelay | 开始前的延迟时间（毫秒） | `number` | `0` |
| as | HTML 标签类型 | `keyof JSX.IntrinsicElements` | `'span'` |
| style | 自定义样式 | `React.CSSProperties` | - |

## 使用示例

### 不同速度

```tsx
<TypeWriter 
  text="慢速打字效果" 
  speed={150}
/>

<TypeWriter 
  text="快速打字效果" 
  speed={20}
/>
```

### 自定义光标

```tsx
<TypeWriter 
  text="下划线光标" 
  cursor="_"
/>

<TypeWriter 
  text="方块光标" 
  cursor="█"
/>

<TypeWriter 
  text="无光标" 
  showCursor={false}
/>
```

### 循环播放

```tsx
<TypeWriter 
  text="这段文字会不断重复播放" 
  speed={60}
  deleteSpeed={30}
  pauseTime={2000}
  loop
/>
```

### 延迟开始

```tsx
<TypeWriter 
  text="延迟 1 秒后开始显示" 
  startDelay={1000}
/>
```

### 作为不同元素

```tsx
<TypeWriter 
  text="这是一个标题" 
  as="h1"
  style={{ fontSize: '2rem', fontWeight: 'bold' }}
/>

<TypeWriter 
  text="这是一个段落" 
  as="p"
/>
```

### AI 对话示例

```tsx
<div style={{ 
  padding: '1.5rem', 
  backgroundColor: '#fff',
  borderRadius: '8px'
}}>
  <div style={{ fontWeight: 'bold', color: '#3b82f6' }}>
    🤖 AI Assistant
  </div>
  <TypeWriter 
    text="你好！我是 AI 助手。有什么我可以帮助你的吗？" 
    speed={40}
    cursor="▋"
  />
</div>
```

### 代码输出

```tsx
<div style={{ 
  padding: '1.5rem', 
  backgroundColor: '#1e1e1e',
  borderRadius: '8px',
  fontFamily: 'Monaco, Consolas, monospace',
  color: '#d4d4d4'
}}>
  <TypeWriter 
    text={`function hello() {\n  console.log('Hello, World!');\n  return true;\n}`}
    speed={30}
    cursor="█"
    style={{ color: '#d4d4d4', fontFamily: 'inherit' }}
  />
</div>
```

### 完成回调

```tsx
<TypeWriter 
  text="打字完成后会触发回调" 
  onComplete={() => {
    console.log('打字完成！')
    // 执行其他操作
  }}
/>
```

## 样式定制

组件使用 CSS 变量，可以通过覆盖变量来定制样式：

```css
.myui-typewriter {
  --font-family-sans: 'Your Custom Font';
  --font-size-base: 1.2rem;
  --color-text: #333;
}
```

## 使用场景

- ✨ AI 聊天对话界面
- 💻 代码演示和教程
- 📝 产品介绍和欢迎页
- 🎬 动态标题和口号
- 📱 加载状态提示
- 🎨 创意文本展示

## 注意事项

1. 组件会在 `text` 属性变化时重新开始打字效果
2. 使用 `key` 属性可以强制重新渲染组件
3. 循环模式下，`onComplete` 会在每次完成时触发
4. 建议根据文本长度调整 `speed` 以获得最佳体验
