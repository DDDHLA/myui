import React from 'react'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles'

// 使用纯 div 模拟布局组件，避免与全局 Layout CSS 冲突
const DemoLayout: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; hasSider?: boolean }> = ({ children, style, hasSider }) => (
  <div style={{ 
    display: 'flex', 
    flexDirection: hasSider ? 'row' : 'column',
    width: '100%',
    ...style 
  }}>
    {children}
  </div>
)

const DemoHeader: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ 
    height: 64, 
    lineHeight: '64px', 
    textAlign: 'center', 
    color: '#fff', 
    backgroundColor: '#7dbcea',
    ...style 
  }}>
    {children}
  </div>
)

const DemoSider: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; width?: number | string }> = ({ children, style, width = 200 }) => (
  <div style={{ 
    width, 
    minWidth: width,
    textAlign: 'center', 
    color: '#fff', 
    backgroundColor: '#3ba0e9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style 
  }}>
    {children}
  </div>
)

const DemoContent: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ 
    flex: 1,
    minHeight: 120, 
    lineHeight: '120px', 
    textAlign: 'center', 
    color: '#fff', 
    backgroundColor: '#108ee9',
    ...style 
  }}>
    {children}
  </div>
)

const DemoFooter: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ 
    height: 64, 
    lineHeight: '64px', 
    textAlign: 'center', 
    color: '#fff', 
    backgroundColor: '#7dbcea',
    ...style 
  }}>
    {children}
  </div>
)

const LayoutDocs = () => {
  const layoutStyle: React.CSSProperties = {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%',
  }

  // API 数据
  const layoutProps: PropItem[] = [
    {
      name: 'className',
      type: 'string',
      description: '容器 className',
    },
    {
      name: 'style',
      type: 'CSSProperties',
      description: '指定样式',
    },
    {
      name: 'hasSider',
      type: 'boolean',
      default: 'false',
      description: '表示子元素里有 Sider，一般不用指定。可用于避免浏览器 SSR 时闪烁',
    },
  ]

  const siderProps: PropItem[] = [
    {
      name: 'width',
      type: 'number | string',
      default: '200',
      description: '宽度',
    },
    {
      name: 'collapsed',
      type: 'boolean',
      default: 'false',
      description: '当前收起状态',
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>Layout 布局</h1>
        <p style={docParagraphStyles.lead}>
          协助进行页面整体布局。
        </p>
        <div style={docParagraphStyles.normal}>
          组件概述：
          <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
            <li><code>Layout</code>：布局容器，其下可嵌套 <code>Header</code> <code>Sider</code> <code>Content</code> <code>Footer</code> 或 <code>Layout</code> 本身，可以放在任何父容器中。</li>
            <li><code>Header</code>：顶部布局，自带默认样式，其下可嵌套任何元素。</li>
            <li><code>Sider</code>：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素。</li>
            <li><code>Content</code>：内容部分，自带默认样式，其下可嵌套任何元素。</li>
            <li><code>Footer</code>：底部布局，自带默认样式，其下可嵌套任何元素。</li>
          </ul>
        </div>
      </div>

      <CodeBlock
        title="上中下布局"
        description="最基本的『上-中-下』布局。一般主页采用的布局。"
        code={`import { Layout, Header, Content, Footer } from '@paidaxinghaha/my-ui-react'

const App = () => (
  <Layout>
    <Header>Header</Header>
    <Content>Content</Content>
    <Footer>Footer</Footer>
  </Layout>
)`}
      >
        <DemoLayout style={layoutStyle}>
          <DemoHeader>Header</DemoHeader>
          <DemoContent>Content</DemoContent>
          <DemoFooter>Footer</DemoFooter>
        </DemoLayout>
      </CodeBlock>

      <CodeBlock
        title="顶部-侧边布局-通栏"
        description="同样拥有顶部导航及侧边栏，区别是两边未留边距，多用于应用型的网站。"
        code={`import { Layout, Header, Sider, Content, Footer } from '@paidaxinghaha/my-ui-react'

const App = () => (
  <Layout>
    <Header>Header</Header>
    <Layout hasSider>
      <Sider width={200}>Sider</Sider>
      <Content>Content</Content>
    </Layout>
    <Footer>Footer</Footer>
  </Layout>
)`}
      >
        <DemoLayout style={layoutStyle}>
          <DemoHeader>Header</DemoHeader>
          <DemoLayout hasSider>
            <DemoSider width={200}>Sider</DemoSider>
            <DemoContent>Content</DemoContent>
          </DemoLayout>
          <DemoFooter>Footer</DemoFooter>
        </DemoLayout>
      </CodeBlock>

      <CodeBlock
        title="顶部-侧边布局（右侧边栏）"
        description="顶部-侧边布局，侧边栏在右侧。"
        code={`import { Layout, Header, Sider, Content, Footer } from '@paidaxinghaha/my-ui-react'

const App = () => (
  <Layout>
    <Header>Header</Header>
    <Layout hasSider>
      <Content>Content</Content>
      <Sider width={200}>Sider</Sider>
    </Layout>
    <Footer>Footer</Footer>
  </Layout>
)`}
      >
        <DemoLayout style={layoutStyle}>
          <DemoHeader>Header</DemoHeader>
          <DemoLayout hasSider>
            <DemoContent>Content</DemoContent>
            <DemoSider width={200}>Sider</DemoSider>
          </DemoLayout>
          <DemoFooter>Footer</DemoFooter>
        </DemoLayout>
      </CodeBlock>

      <CodeBlock
        title="侧边布局"
        description="侧边两列式布局。页面横向空间有限时，侧边导航可收起。侧边导航在页面布局上采用的是左右的结构，一般主导航放置于页面的左侧固定位置，辅助菜单放置于工作区顶部。"
        code={`import { Layout, Header, Sider, Content, Footer } from '@paidaxinghaha/my-ui-react'

const App = () => (
  <Layout hasSider>
    <Sider>Sider</Sider>
    <Layout>
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  </Layout>
)`}
      >
        <DemoLayout style={layoutStyle} hasSider>
          <DemoSider width={200} style={{ minHeight: 248 }}>Sider</DemoSider>
          <DemoLayout>
            <DemoHeader>Header</DemoHeader>
            <DemoContent>Content</DemoContent>
            <DemoFooter>Footer</DemoFooter>
          </DemoLayout>
        </DemoLayout>
      </CodeBlock>

      <CodeBlock
        title="上中下布局（带侧边栏）"
        description="最常用的中后台管理系统布局，顶部固定导航，左侧固定侧边栏。"
        code={`import { Layout, Header, Sider, Content } from '@paidaxinghaha/my-ui-react'

const App = () => (
  <Layout>
    <Header>Header</Header>
    <Layout hasSider>
      <Sider width={200}>Sider</Sider>
      <Content>Content</Content>
    </Layout>
  </Layout>
)`}
      >
        <DemoLayout style={layoutStyle}>
          <DemoHeader>Header</DemoHeader>
          <DemoLayout hasSider>
            <DemoSider width={200}>Sider</DemoSider>
            <DemoContent style={{ minHeight: 200 }}>Content</DemoContent>
          </DemoLayout>
        </DemoLayout>
      </CodeBlock>

      <CodeBlock
        title="固定侧边栏"
        description="当内容较长时，使用固定侧边栏可以提供更好的体验。"
        code={`import { Layout, Header, Sider, Content, Footer } from '@paidaxinghaha/my-ui-react'

const App = () => (
  <Layout hasSider>
    <Sider style={{ 
      overflow: 'auto',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
    }}>
      Sider
    </Sider>
    <Layout style={{ marginLeft: 200 }}>
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  </Layout>
)`}
      >
        <DemoLayout style={{ ...layoutStyle, height: 300 }} hasSider>
          <DemoSider width={200} style={{ minHeight: 300 }}>
            <div style={{ padding: '16px', fontSize: '14px' }}>
              <div style={{ marginBottom: 8 }}>菜单项 1</div>
              <div style={{ marginBottom: 8 }}>菜单项 2</div>
              <div style={{ marginBottom: 8 }}>菜单项 3</div>
              <div style={{ marginBottom: 8 }}>菜单项 4</div>
            </div>
          </DemoSider>
          <DemoLayout>
            <DemoHeader>Header</DemoHeader>
            <DemoContent style={{ minHeight: 168 }}>Content</DemoContent>
            <DemoFooter>Footer</DemoFooter>
          </DemoLayout>
        </DemoLayout>
      </CodeBlock>

      <CodeBlock
        title="三栏布局"
        description="左右两侧边栏，中间内容区域。适用于需要同时展示导航和辅助信息的场景。"
        code={`import { Layout, Header, Sider, Content, Footer } from '@paidaxinghaha/my-ui-react'

const App = () => (
  <Layout>
    <Header>Header</Header>
    <Layout hasSider>
      <Sider width={200}>Left Sider</Sider>
      <Content>Content</Content>
      <Sider width={200}>Right Sider</Sider>
    </Layout>
    <Footer>Footer</Footer>
  </Layout>
)`}
      >
        <DemoLayout style={layoutStyle}>
          <DemoHeader>Header</DemoHeader>
          <DemoLayout hasSider>
            <DemoSider width={150}>Left Sider</DemoSider>
            <DemoContent>Content</DemoContent>
            <DemoSider width={150} style={{ backgroundColor: '#4ba0e9' }}>Right Sider</DemoSider>
          </DemoLayout>
          <DemoFooter>Footer</DemoFooter>
        </DemoLayout>
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={docHeadingStyles.h2}>API</h2>
        
        <h3 style={docHeadingStyles.h3}>Layout</h3>
        <PropsTable data={layoutProps} />
        
        <h3 style={{ ...docHeadingStyles.h3, marginTop: '32px' }}>Sider</h3>
        <PropsTable data={siderProps} />

        <h3 style={{ ...docHeadingStyles.h3, marginTop: '32px' }}>Header, Footer, Content</h3>
        <p style={docParagraphStyles.normal}>
          这三个组件只支持 React 通用的 HTML 属性，如 <code>className</code>, <code>style</code> 等。
        </p>

        <div style={{ 
          marginTop: '32px', 
          padding: '16px', 
          backgroundColor: 'var(--bg-secondary, #f3f4f6)', 
          borderRadius: '8px',
          borderLeft: '4px solid var(--color-primary, #3b82f6)'
        }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', fontWeight: '600' }}>💡 使用提示</h4>
          <ul style={{ margin: 0, paddingLeft: '24px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <li><code>Layout</code> 的子元素只能是 <code>Header</code>、<code>Sider</code>、<code>Content</code>、<code>Footer</code> 或 <code>Layout</code> 本身</li>
            <li>当 <code>Layout</code> 子元素中包含 <code>Sider</code> 时，建议设置 <code>hasSider</code> 属性为 <code>true</code></li>
            <li><code>Sider</code> 支持响应式布局，可以通过 <code>collapsed</code> 属性控制收起状态</li>
            <li>在固定侧边栏场景下，需要给内容区域设置对应的 <code>marginLeft</code></li>
            <li>布局组件默认使用 Flexbox 布局，可以方便地实现各种复杂布局</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default LayoutDocs
