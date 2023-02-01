// import axios from 'axios'
import { Users } from '@/types/Users'
import { axios } from '@/assets/utils'
import { useRouter } from 'next/router'
import configs from '@/assets/configs'
import React, { useEffect, useState } from 'react'
import { Button, message, Popconfirm, Space, Table } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const { Column } = Table

const Clients: React.FC = () => {
  const router = useRouter()
  const [clients, setusers] = useState<Users[]>([])

  const init = async () => {
    axios.get(`${configs.hostApi}/users`).then(({ data }) => {
      console.log(data)
      const users = data.map((item: Users, index: number) => ({
        ...item,
        key: index,
      }))
      setusers(users)
    })
  }

  useEffect(() => {
    Promise.all([init()])
  }, [])

  const remove = async (id: string) => {
    if (id) {
      await axios.delete(`${configs.hostApi}/users/${id}`)
      message.success('Documento eliminado')
    }
  }

  return (
    <>
      <div className="flex justify-end">
        <Button type="primary" className="bg-blue-800" onClick={() => init()}>
          Refrescar
        </Button>
        <Button onClick={() => router.push('/app/clientes/insert')}>
          Insertar
        </Button>
      </div>
      <Table dataSource={clients}>
        <Column title="Nombre" dataIndex="name" key="name" />
        <Column title="Usuario" dataIndex="username" key="username" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Celular" dataIndex="cellphone" key="cellphone" />
        <Column title="Ciudad" dataIndex="city" key="city" />
        <Column
          key="action"
          render={(_: Users, record: Users) => (
            <Space size="middle">
              <a href={`${'/app/clientes/'}/${record._id}/edit`}>
                <EditOutlined title="Editar" />
              </a>

              <Popconfirm
                title="¿Eliminar usuario?"
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
