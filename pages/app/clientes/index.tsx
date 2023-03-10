import axios from 'axios'
import { User } from '@/types/User'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, message, Popconfirm, Space, Table, Typography } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const { Column } = Table

const Clients: React.FC = () => {
  const router = useRouter()
  const [clients, setClients] = useState<User[]>([])

  const init = async () => {
    axios.get('/api/clients').then(({ data }) => {
      const users = data.data.map((item: User, index: number) => ({
        ...item,
        key: index,
      }))
      setClients(users)
    })
  }

  useEffect(() => {
    Promise.all([init()])
  }, [])

  const remove = async (id: string) => {
    if (id) {
      await axios.delete(`/api/clients/${id}`)
      message.success('Documento eliminado')
      init()
    }
  }

  return (
    <>
      <Space className="flex justify-between mb-4">
        <Typography.Title level={3}>Clientes</Typography.Title>
        <Space>
          <Button type="primary" className="bg-blue-800" onClick={() => init()}>
            Refrescar
          </Button>
          <Button onClick={() => router.push('/app/clientes/insert')}>
            Insertar
          </Button>
        </Space>
      </Space>
      <Table dataSource={clients}>
        <Column
          title="Identificación"
          dataIndex="identification_card"
          key="identificacion"
        />
        <Column title="Nombre" dataIndex="name" key="name" />
        <Column title="Apellido" dataIndex="last_name" key="last_name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Estado" dataIndex="state" key="estado" />
        <Column
          key="action"
          render={(_: User, record: User) => (
            <Space size="middle">
              <a href={`${'/app/clientes/'}/${record._id}/edit`}>
                <EditOutlined title="Editar" />
              </a>

              <Popconfirm
                title="¿Eliminar cliente?"
                okButtonProps={{
                  type: 'default',
                }}
                onConfirm={() => remove(record._id)}
              >
                <DeleteOutlined title="Eliminar" />
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </>
  )
}

export default Clients
