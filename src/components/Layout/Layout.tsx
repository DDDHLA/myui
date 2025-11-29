import React, { HTMLAttributes } from 'react'
import { cn } from '@/utils'
import './Layout.css'

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
  hasSider?: boolean
}

const Layout: React.FC<LayoutProps> & {
  Header: React.FC<HTMLAttributes<HTMLDivElement>>
  Footer: React.FC<HTMLAttributes<HTMLDivElement>>
  Sider: React.FC<HTMLAttributes<HTMLDivElement>>
  Content: React.FC<HTMLAttributes<HTMLDivElement>>
} = (props) => {
  const { children, className, hasSider, ...rest } = props
  const cls = cn('myui-layout', className, {
    'myui-layout-has-sider': hasSider,
  })
  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  )
}

// 挂载子组件（从同目录导入）
import Header from './Header'
import Footer from './Footer'
import Sider from './Sider'
import Content from './Content'

Layout.Header = Header
Layout.Footer = Footer
Layout.Sider = Sider
Layout.Content = Content

export { Layout }
export default Layout
