# MyUI 组件库

🎨 一个现代化的 React 组件库，基于 TypeScript 构建，支持主题切换和响应式设计。

## ✨ 特性

- 🎯 **TypeScript 支持** - 完整的类型定义
- 🎨 **现代化设计** - 基于设计系统的组件
- 🌙 **主题切换** - 支持浅色/深色主题
- 📱 **响应式设计** - 移动端友好
- 🎭 **动画效果** - 基于 Framer Motion
- 🔧 **高度可定制** - CSS 变量支持
- 📦 **Tree Shaking** - 按需加载
- 🧪 **完整测试** - 单元测试覆盖

## 📦 安装

```bash
npm install @myui/components
# 或
yarn add @myui/components
# 或
pnpm add @myui/components
```

## 🚀 快速开始

```tsx
import React from 'react'
import { ThemeProvider, Button, Input, Card } from '@myui/components'
import '@myui/components/dist/style.css'

function App() {
  return (
    <ThemeProvider>
      <div>
        <Card header={<h2>欢迎使用 MyUI</h2>}>
          <Input placeholder="输入一些内容..." />
          <Button variant="primary">点击我</Button>
        </Card>
      </div>
    </ThemeProvider>
  )
}

export default App
```

## 🎨 组件

### Button 按钮

```tsx
import { Button } from '@myui/components'

// 基础用法
<Button variant="primary">主要按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="outline">轮廓按钮</Button>

// 不同尺寸
<Button size="sm">小按钮</Button>
<Button size="md">中按钮</Button>
<Button size="lg">大按钮</Button>

// 带图标
<Button leftIcon={<Icon />}>左图标</Button>
<Button rightIcon={<Icon />}>右图标</Button>

// 加载状态
<Button loading>加载中...</Button>
```

### Input 输入框

```tsx
import { Input } from '@myui/components'

// 基础用法
<Input placeholder="请输入内容" />

// 带标签
<Input label="用户名" placeholder="请输入用户名" />

// 带图标
<Input leftIcon={<SearchIcon />} placeholder="搜索..." />

// 错误状态
<Input error helperText="输入格式不正确" />
```

### Card 卡片

```tsx
import { Card } from '@myui/components'

// 基础用法
<Card>
  <p>卡片内容</p>
</Card>

// 带头部和底部
<Card
  header={<h3>卡片标题</h3>}
  footer={<Button>操作</Button>}
>
  <p>卡片内容</p>
</Card>

// 不同变体
<Card variant="outlined">轮廓卡片</Card>
<Card variant="elevated">阴影卡片</Card>
```

## 🎭 主题

MyUI 支持浅色和深色主题，可以通过 `ThemeProvider` 和 `useTheme` Hook 来管理主题。

```tsx
import { ThemeProvider, useTheme, Button } from '@myui/components'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <Button onClick={toggleTheme}>
      切换到{theme === 'light' ? '深色' : '浅色'}主题
    </Button>
  )
}

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  )
}
```

## 🎨 自定义样式

MyUI 使用 CSS 变量来支持主题定制，你可以覆盖这些变量来自定义样式：

```css
:root {
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --border-radius: 8px;
  --font-family-sans: 'Your Font', sans-serif;
}
```

## 📚 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建组件库
npm run build:lib

# 运行测试
npm test

# 启动 Storybook
npm run storybook
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系

如有问题，请通过 GitHub Issues 联系我们。
