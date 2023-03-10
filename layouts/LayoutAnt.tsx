import {
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
  WindowsOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { destruirToken } from '@/assets/utils'
import React, { FC, ReactNode, useState } from 'react'
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

function getItems(typeUser: string) {
  const items: MenuItem[] = [
    getItem(<Link href="/app">home</Link>, '1', <HomeOutlined />),
    ...(typeUser === 'administrador'
      ? [
          getItem('Admin', 'sub1', <WindowsOutlined />, [
            getItem(<Link href="/app/admin/usuarios">Usuarios</Link>, '6'),
          ]),
        ]
      : []),
    getItem('Inventario', 'sub2', <DesktopOutlined />, [
      getItem(<Link href="/app/productos">Productos</Link>, '3'),
      getItem(<Link href="/app/bodegas">Bodegas</Link>, '4'),
    ]),
    getItem('Comprobantes', 'sub3', <ProfileOutlined />, [
      getItem(
        <Link href="/app/salesNotes">Notas de ventas</Link>,
        '9',
        <FileOutlined />
      ),
    ]),
    getItem(<Link href="/app/clientes">Clientes</Link>, '2', <UserOutlined />),
  ]
  return items
}

const LayoutApp: FC<{ children: ReactNode }> = (props) => {
  // const [user, setUser] = useState<User>({} as User)
  const { user } = useContextoUsuario()
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
          {user?.username}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={getItems(user?.type || 'administrador')}
        />
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
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©2023 Created by Developers
        </Footer>
      </Layout>
    </Layout>
  )
}

const LayoutAppContex: FC<{ children: ReactNode }> = (props) => {
  return (
    <ContextoUsuario>
      <LayoutApp>{props.children}</LayoutApp>
    </ContextoUsuario>
  )
}

export default LayoutAppContex
