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
  TreeSelectDocs,
  ModalDocs,
  TabsDocs,
  SwitchDocs,
  SliderDocs,
  CalendarDocs,
  MessageDocs,
  AvatarDocs,
  BadgeDocs,
  TagDocs,
  TransferDocs,
  TooltipDocs,
  WatermarkDocs,
  DrawerDocs
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
    path: '/tree-select',
    element: <TreeSelectDocs />
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
  },
  {
    path: '/slider',
    element: <SliderDocs />
  },
  {
    path: '/calendar',
    element: <CalendarDocs />
  },
  {
    path: '/message',
    element: <MessageDocs />
  },
  {
    path: '/avatar',
    element: <AvatarDocs />
  },
  {
    path: '/badge',
    element: <BadgeDocs />
  },
  {
    path: '/tag',
    element: <TagDocs />
  },
  {
    path: '/transfer',
    element: <TransferDocs />
  },
  {
    path: '/tooltip',
    element: <TooltipDocs />
  },
  {
    path: '/watermark',
    element: <WatermarkDocs />
  },
  {
    path: '/drawer',
    element: <DrawerDocs />
  }
]
