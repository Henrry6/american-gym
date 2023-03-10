import axios from 'axios'
import { useRouter } from 'next/router'
import { Cellar } from '@/types/Cellars'
import React, { useEffect, useState } from 'react'
import { Button, message, Popconfirm, Space, Table, Typography } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const { Column } = Table

const Warehouses: React.FC = () => {
  const router = useRouter()
  const [cellars, setCellars] = useState<Cellar[]>([])

  const init = async () => {
    axios.get('/api/cellars').then(({ data }) => {
      const dataCellars = data.map((item: Cellar, index: number) => ({
        ...item,
        key: index,
      }))
      setCellars(dataCellars)
    })
  }

  useEffect(() => {
    Promise.all([init()])
  }, [])

  const remove = async (id: string) => {
    if (id) {
      await axios.delete(`/api/cellars/${id}`)
      message.success('Documento eliminado')
      init()
    }
  }

  return (
    <>
      <Space className="flex justify-between mb-4">
        <Typography.Title level={3}>Bodegas</Typography.Title>
        <Space>
          <Button type="primary" className="bg-blue-800" onClick={() => init()}>
            Refrescar
          </Button>
          <Button onClick={() => router.push('/app/bodegas/insert')}>
            Insertar
          </Button>
        </Space>
      </Space>
      <Table dataSource={cellars}>
        <Column title="Código" dataIndex="code" key="code" />
        <Column title="Nombre" dataIndex="name" key="name" />
        <Column title="Dimensión" dataIndex="dimension" key="dimension" />
        <Column
          key="action"
          render={(_: Cellar, record: Cellar) => (
            <Space size="middle">
              <a href={`${'/app/bodegas/'}/${record._id}/edit`}>
                <EditOutlined title="Editar" />
              </a>

              <Popconfirm
                title="¿Eliminar bodegas?"
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

export default Warehouses
