import { Card } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

const InstallationDocs = () => {
  return (
    <div>
      <h1 style={docHeadingStyles.h1}>
        安装
      </h1>
      <p style={{ ...docParagraphStyles.lead, marginBottom: '48px' }}>
        MyUI 支持多种安装方式，选择最适合你的项目的方式。我们推荐使用 npm 或 yarn 进行安装。
      </p>
      
      {/* 环境要求 */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={docHeadingStyles.h2}>环境要求</h2>
        <Card variant="outlined" padding="lg" style={{ marginTop: '24px' }}>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-primary)' }}>Node.js</h4>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>版本 {'>'} = 14.0.0</p>
            </div>
            <div>
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-primary)' }}>React</h4>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>版本 {'>'} = 18.0.0</p>
            </div>
            <div>
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-primary)' }}>React DOM</h4>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>版本 {'>'} = 18.0.0</p>
            </div>
          </div>
        </Card>
      </div>
      
      <CodeBlock
        title="NPM 安装"
        description="推荐使用 npm 包管理器安装 MyUI。"
        code={`npm install @paidaxinghaha/my-ui-react`}
        language="bash"
      >
        <div style={{ padding: '16px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
          <code>npm install @paidaxinghaha/my-ui-react</code>
        </div>
      </CodeBlock>
      
      <CodeBlock
        title="Yarn 安装"
        description="如果你使用 Yarn 作为包管理器。"
        code={`yarn add @paidaxinghaha/my-ui-react`}
        language="bash"
      >
        <div style={{ padding: '16px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
          <code>yarn add @paidaxinghaha/my-ui-react</code>
        </div>
      </CodeBlock>
      
      <CodeBlock
        title="PNPM 安装"
        description="如果你使用 PNPM 作为包管理器。"
        code={`pnpm add @paidaxinghaha/my-ui-react`}
        language="bash"
      >
        <div style={{ padding: '16px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
          <code>pnpm add @paidaxinghaha/my-ui-react</code>
        </div>
      </CodeBlock>
      
      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>导入样式</h2>
        <p style={{ ...docParagraphStyles.normal, marginBottom: '24px' }}>
          安装完成后，需要在你的应用入口文件中导入 MyUI 的样式文件：
        </p>
        
        <CodeBlock
          title="导入全局样式"
          description="在应用的入口文件（如 main.tsx 或 index.tsx）中导入样式。"
          code={`import '@paidaxinghaha/my-ui-react/dist/style.css'`}
        >
          <div style={{ padding: '16px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <code>import '@paidaxinghaha/my-ui-react/dist/style.css'</code>
          </div>
        </CodeBlock>
      </div>
      
      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>注意事项</h2>
        <Card variant="outlined" padding="lg" style={{ marginTop: '24px' }}>
          <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <li>确保你的项目已经安装了 React 18.0.0 或更高版本</li>
            <li>MyUI 使用 CSS 变量实现主题系统，确保你的浏览器支持 CSS 变量</li>
            <li>建议在项目中使用 ThemeProvider 包裹应用以获得完整的主题支持</li>
            <li>如果使用 TypeScript，MyUI 提供了完整的类型定义，无需额外安装</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}

export default InstallationDocs
