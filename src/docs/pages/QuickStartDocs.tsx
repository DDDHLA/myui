import { Button, Input, Card } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const QuickStartDocs = () => {
  return (
    <div style={{ marginBottom: '64px' }}>
      <h1 style={docHeadingStyles.h1}>
        快速开始
      </h1>
      <p style={{ ...docParagraphStyles.lead, marginBottom: '48px' }}>
        欢迎使用 MyUI！按照以下步骤快速开始使用我们的组件库。只需几分钟，你就可以在项目中使用 MyUI 的所有组件。
      </p>
      
      {/* 步骤概览 */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={docHeadingStyles.h2}>三步快速开始</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginTop: '24px' }}>
          <Card variant="outlined" padding="lg">
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>1️⃣</div>
            <h3 style={{ margin: '0 0 8px 0', color: 'var(--text-primary)' }}>安装依赖</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>使用 npm、yarn 或 pnpm 安装组件库</p>
          </Card>
          <Card variant="outlined" padding="lg">
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>2️⃣</div>
            <h3 style={{ margin: '0 0 8px 0', color: 'var(--text-primary)' }}>导入组件</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>在项目中导入所需的组件和样式</p>
          </Card>
          <Card variant="outlined" padding="lg">
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>3️⃣</div>
            <h3 style={{ margin: '0 0 8px 0', color: 'var(--text-primary)' }}>开始使用</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>在应用中使用组件，享受开发</p>
          </Card>
        </div>
      </div>
      
      <CodeBlock
        title="安装"
        description="使用 npm 或 yarn 安装 MyUI 组件库。"
        code={`# 使用 npm
npm install @paidaxinghaha/my-ui-react

# 使用 yarn
yarn add @paidaxinghaha/my-ui-react

# 使用 pnpm
pnpm add @paidaxinghaha/my-ui-react`}
        language="bash"
      >
        <div style={{ padding: '16px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
          <code>npm install @paidaxinghaha/my-ui-react</code>
        </div>
      </CodeBlock>
      
      <CodeBlock
        title="基础使用"
        description="在你的 React 应用中导入和使用 MyUI 组件。"
        code={`import React from 'react'
import { ThemeProvider, Button, Input } from '@paidaxinghaha/my-ui-react'
import '@paidaxinghaha/my-ui-react/dist/style.css'

function App() {
  return (
    <ThemeProvider>
      <div style={{ padding: '20px' }}>
        <h1>Hello MyUI!</h1>
        <Input placeholder="输入一些内容..." />
        <Button variant="primary">点击我</Button>
      </div>
    </ThemeProvider>
  )
}

export default App`}
      >
        <div style={{ padding: '20px', border: '1px dashed var(--border-color)', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 16px 0' }}>Hello MyUI!</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px' }}>
            <Input placeholder="输入一些内容..." />
            <Button variant="primary">点击我</Button>
          </div>
        </div>
      </CodeBlock>
      
      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>下一步</h2>
        <div style={{ display: 'grid', gap: '16px', marginTop: '24px' }}>
          <Card variant="outlined" padding="lg">
            <h3 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>📚 浏览组件文档</h3>
            <p style={{ margin: '0 0 16px 0', color: 'var(--text-secondary)' }}>
              查看每个组件的详细文档、API 说明和使用示例，了解如何在项目中使用它们。
            </p>
            <Button variant="primary" size="sm">查看组件</Button>
          </Card>
          
          <Card variant="outlined" padding="lg">
            <h3 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>🎨 自定义主题</h3>
            <p style={{ margin: '0 0 16px 0', color: 'var(--text-secondary)' }}>
              MyUI 支持浅色和深色主题，你也可以通过 CSS 变量自定义主题颜色和样式。
            </p>
            <Button variant="outline" size="sm">了解主题</Button>
          </Card>
          
          <Card variant="outlined" padding="lg">
            <h3 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>💡 最佳实践</h3>
            <p style={{ margin: '0 0 16px 0', color: 'var(--text-secondary)' }}>
              学习如何在实际项目中高效使用 MyUI，包括按需加载、性能优化等技巧。
            </p>
            <Button variant="ghost" size="sm">查看示例</Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default QuickStartDocs
