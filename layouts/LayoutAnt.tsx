import React, { FC, ReactNode, useState } from 'react'
import {
  DesktopOutlined,
  FileOutlined,
  LogoutOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { destruirToken } from '@/assets/utils'
import { Button, MenuProps, Modal, Space } from 'antd'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import ContextoUsuario, { useContextoUsuario } from '@/contexts/User'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem(<Link href="/app">home</Link>, '1', <PieChartOutlined />),
  getItem(<Link href="/app/clientes">Usuarios</Link>, '2', <UserOutlined />),
  getItem('Inventario', 'sub1', <DesktopOutlined />, [
    getItem(<Link href="/app/productos">Productos</Link>, '3'),
    getItem(<Link href="/app/bodegas">Bodegas</Link>, '4'),
    //getItem(<Link href="/app/servicios">Servicios</Link>, '4'),
    //getItem(<Link href="/app/kardex">Kardex</Link>, '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [
    getItem('Team 1', '6'),
    getItem('Team 2', '8'),
  ]),
  getItem('Files', '9', <FileOutlined />),
]

const LayoutApp: FC<{ children: ReactNode }> = (props) => {
  // const { user } = useContextoUsuario()
  const router = useRouter()
  const routes = router.route.split('/')
  const filterRoutes = routes.filter(
    (x: string) => x !== '' && x !== '_error' && x !== '404'
  )
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          className="flex justify-center text-lg font-semibold text-white"
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* {user?.name} */}
          'HENRRY'
        </div>
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="m-2 flex justify-end "
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Space size="middle" className="mr-6">
            <Button
              className="flex items-center justify-center"
              icon={<LogoutOutlined title="Salir" />}
              onClick={() => {
                Modal.confirm({
                  title: 'Cerrar sesión',
                  icon: null,
                  content: '¿Estás seguro que deseas cerrar la sesión?',
                  okType: 'danger',
                  onOk: () => {
                    destruirToken()
                    location.href = '/login'
                  },
                })
              }}
            />
          </Space>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {filterRoutes.map((x: string, index: number) => (
              <Breadcrumb.Item key={'route' + index}>{x}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

const LayoutAppContex: FC<{ children: ReactNode }> = (props) => {
  return (
    //   <ContextoUsuario>
    //   </ContextoUsuario>
    <LayoutApp>{props.children}</LayoutApp>
  )
}

export default LayoutAppContex
