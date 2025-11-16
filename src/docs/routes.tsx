import { RouteObject } from 'react-router-dom'
import {
  OverviewDocs,
  QuickStartDocs,
  InstallationDocs,
  ButtonDocs,
  InputDocs,
  IconDocs,
  CardDocs,
  TableDocs,
  SelectDocs,
  ModalDocs,
  TabsDocs,
  SwitchDocs
} from './pages'

// 路由配置
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <OverviewDocs />
  },
  {
    path: '/overview',
    element: <OverviewDocs />
  },
  {
    path: '/quick-start',
    element: <QuickStartDocs />
  },
  {
    path: '/installation',
    element: <InstallationDocs />
  },
  {
    path: '/button',
    element: <ButtonDocs />
  },
  {
    path: '/input',
    element: <InputDocs />
  },
  {
    path: '/icon',
    element: <IconDocs />
  },
  {
    path: '/select',
    element: <SelectDocs />
  },
  {
    path: '/card',
    element: <CardDocs />
  },
  {
    path: '/table',
    element: <TableDocs />
  },
  {
    path: '/modal',
    element: <ModalDocs />
  },
  {
    path: '/tabs',
    element: <TabsDocs />
  },
  {
    path: '/switch',
    element: <SwitchDocs />
  }
]
