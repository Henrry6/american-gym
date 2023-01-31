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
import { Button, MenuProps, Modal, Space } from 'antd'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import ContextoUsuario, { Modulo, useContextoUsuario } from '@/contexts/User'
import { destruirToken } from '@/assets/utils'
import { useRouter } from 'next/router'

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
  getItem(
    <Link href="/user/products">Estadisticas</Link>,
    '1',
    <PieChartOutlined />
  ),
  getItem(<Link href="/user/products">Ventas</Link>, '2', <DesktopOutlined />),
  getItem('Inventario', 'sub1', <UserOutlined />, [
    getItem(<Link href="/user/products">Productos</Link>, '3'),
    getItem(<Link href="/user/services">Servicios</Link>, '4'),
    getItem(<Link href="/user/kardex">Kardex</Link>, '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [
    getItem('Team 1', '6'),
    getItem('Team 2', '8'),
  ]),
  getItem('Files', '9', <FileOutlined />),
]

const LayoutApp: FC<{ children: ReactNode }> = (props) => {
  const { user } = useContextoUsuario()
  const router = useRouter()
  const routes = router.route.split('/')
  const filterRoutes = routes.filter(
    (x: string) => x !== '' && x !== '_error' && x !== '404'
  )
  // const retorno: Array<Modulo> = []
  console.log(filterRoutes)
  // retorno.push({
  //   key: submoduleName,
  // })
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
          {user?.name}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
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
    <ContextoUsuario>
      <LayoutApp>{props.children}</LayoutApp>
    </ContextoUsuario>
  )
}

export default LayoutAppContex
