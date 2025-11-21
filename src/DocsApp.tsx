// Force re-evaluation
import { BrowserRouter, useRoutes, useNavigate, useLocation } from 'react-router-dom'
import { ThemeProvider } from './components'
import { Layout } from './components/Layout'
import { routes } from './docs/routes'

const DocsAppContent = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  // 从路径获取当前页面
  const getCurrentPage = () => {
    const path = location.pathname
    if (path === '/' || path === '/overview') return 'overview'
    return path.substring(1) // 移除开头的 '/'
  }

  const handlePageChange = (page: string) => {
    navigate(`/${page}`)
  }

  const routeElement = useRoutes(routes)

  return (
    <Layout currentPage={getCurrentPage()} onPageChange={handlePageChange}>
      {routeElement}
    </Layout>
  )
}

const DocsApp = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <DocsAppContent />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default DocsApp
