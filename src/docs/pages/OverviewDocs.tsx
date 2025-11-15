import { Button, Input, Card, Icon } from '@/components'

const OverviewDocs = () => {
  return (
    <div style={{ marginBottom: '64px' }}>
      {/* 英雄区域 */}
      <div style={{ 
        background: 'var(--bg-glass, rgba(255, 255, 255, 0.1))',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--border-glass, rgba(255, 255, 255, 0.2))',
        borderRadius: '24px',
        padding: '80px 48px',
        marginBottom: '64px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-glass, 0 8px 32px rgba(0, 0, 0, 0.1))'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ 
            fontSize: '4.5rem', 
            fontWeight: '800', 
            margin: '0 0 24px 0', 
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            MyUI
          </h1>
          <p style={{ 
            fontSize: '1.5rem', 
            color: 'var(--text-secondary)', 
            lineHeight: '1.6', 
            margin: '0 0 40px 0',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            现代化的 React 组件库，为你的应用提供高质量的 UI 组件
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" size="lg">
              开始使用
            </Button>
            <Button variant="outline" size="lg">
              查看组件
            </Button>
          </div>
        </div>
        
        {/* 装饰性元素 */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          left: '-50px',
          width: '120px',
          height: '120px',
          background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
          borderRadius: '50%',
          opacity: 0.1,
          filter: 'blur(30px)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-40px',
          right: '-40px',
          width: '100px',
          height: '100px',
          background: 'linear-gradient(45deg, #06b6d4, #3b82f6)',
          borderRadius: '50%',
          opacity: 0.1,
          filter: 'blur(25px)'
        }} />
      </div>

      {/* 特性展示 */}
      <div style={{ marginBottom: '64px' }}>
        <h2 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700', 
          textAlign: 'center', 
          margin: '0 0 48px 0', 
          color: 'var(--text-primary)' 
        }}>
          为什么选择 MyUI？
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '32px' 
        }}>
          <Card variant="elevated" padding="lg" style={{ 
            textAlign: 'center',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
          }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '2rem'
            }}>
              🚀
            </div>
            <h3 style={{ 
              margin: '0 0 16px 0', 
              color: 'var(--text-primary)', 
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>
              现代化设计
            </h3>
            <p style={{ 
              margin: 0, 
              color: 'var(--text-secondary)', 
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              采用最新的设计趋势和最佳实践，提供简洁美观、符合直觉的用户界面组件。
            </p>
          </Card>
          
          <Card variant="elevated" padding="lg" style={{ 
            textAlign: 'center',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
          }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '2rem'
            }}>
              ⚡
            </div>
            <h3 style={{ 
              margin: '0 0 16px 0', 
              color: 'var(--text-primary)', 
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>
              高性能优化
            </h3>
            <p style={{ 
              margin: 0, 
              color: 'var(--text-secondary)', 
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              轻量级实现，优化的渲染性能，Tree Shaking 支持，让你的应用加载更快速。
            </p>
          </Card>
          
          <Card variant="elevated" padding="lg" style={{ 
            textAlign: 'center',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
          }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '2rem'
            }}>
              🔧
            </div>
            <h3 style={{ 
              margin: '0 0 16px 0', 
              color: 'var(--text-primary)', 
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>
              TypeScript 优先
            </h3>
            <p style={{ 
              margin: 0, 
              color: 'var(--text-secondary)', 
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              完整的 TypeScript 类型定义，智能提示和类型检查，提供更好的开发体验。
            </p>
          </Card>
          
          <Card variant="elevated" padding="lg" style={{ 
            textAlign: 'center',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
          }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '2rem'
            }}>
              🌙
            </div>
            <h3 style={{ 
              margin: '0 0 16px 0', 
              color: 'var(--text-primary)', 
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>
              主题系统
            </h3>
            <p style={{ 
              margin: 0, 
              color: 'var(--text-secondary)', 
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              内置浅色和深色主题，支持自定义主题配置，CSS 变量驱动的灵活主题系统。
            </p>
          </Card>
          
          <Card variant="elevated" padding="lg" style={{ 
            textAlign: 'center',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
          }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '2rem'
            }}>
              🎨
            </div>
            <h3 style={{ 
              margin: '0 0 16px 0', 
              color: 'var(--text-primary)', 
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>
              设计系统
            </h3>
            <p style={{ 
              margin: 0, 
              color: 'var(--text-secondary)', 
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              完整的设计系统，统一的间距、颜色、字体规范，确保界面的一致性和美观性。
            </p>
          </Card>
          
          <Card variant="elevated" padding="lg" style={{ 
            textAlign: 'center',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
          }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '2rem'
            }}>
              ♿
            </div>
            <h3 style={{ 
              margin: '0 0 16px 0', 
              color: 'var(--text-primary)', 
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>
              无障碍访问
            </h3>
            <p style={{ 
              margin: 0, 
              color: 'var(--text-secondary)', 
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              遵循 WCAG 标准，支持键盘导航、屏幕阅读器，让每个人都能轻松使用你的应用。
            </p>
          </Card>
        </div>
      </div>

      {/* 组件预览 */}
      <div style={{ marginBottom: '64px' }}>
        <h2 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700', 
          textAlign: 'center', 
          margin: '0 0 48px 0', 
          color: 'var(--text-primary)' 
        }}>
          组件预览
        </h2>
        
        <Card variant="outlined" padding="lg" style={{ 
          background: 'var(--bg-glass, rgba(255, 255, 255, 0.1))',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid var(--border-glass, rgba(255, 255, 255, 0.2))',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-glass, 0 4px 16px rgba(0, 0, 0, 0.1))'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '32px',
            alignItems: 'center',
            justifyItems: 'center'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 16px 0', color: 'var(--text-primary)', fontSize: '1.125rem', fontWeight: '600' }}>按钮组件</h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Button variant="primary" size="sm">Primary</Button>
                <Button variant="outline" size="sm">Outline</Button>
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 16px 0', color: 'var(--text-primary)', fontSize: '1.125rem', fontWeight: '600' }}>输入框组件</h4>
              <Input placeholder="输入一些内容..." size="sm" />
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 16px 0', color: 'var(--text-primary)', fontSize: '1.125rem', fontWeight: '600' }}>图标组件</h4>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <Icon name="home" size="lg" color="primary" />
                <Icon name="user" size="lg" color="success" />
                <Icon name="settings" size="lg" color="warning" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 快速开始 */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700', 
          margin: '0 0 24px 0', 
          color: 'var(--text-primary)' 
        }}>
          准备开始了吗？
        </h2>
        <p style={{ 
          fontSize: '1.25rem', 
          color: 'var(--text-secondary)', 
          lineHeight: '1.6', 
          margin: '0 0 32px 0',
          maxWidth: '500px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          只需几分钟就能在你的项目中集成 MyUI 组件库
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" size="lg">
            查看文档
          </Button>
          <Button variant="outline" size="lg">
            GitHub 仓库
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OverviewDocs
