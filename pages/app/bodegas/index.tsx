import axios from 'axios'
import { Warehouse } from '@/types/Warehouse'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, message, Popconfirm, Space, Table } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const { Column } = Table

const Warehouses: React.FC = () => {
  const router = useRouter()
  const [warehouses, setWarehouses] = useState<Warehouse[]>([])

  const init = async () => {
    /*
    axios.get('/api/warehouses').then(({ data }) => {
      const warehouses = data.map((item: Warehouse, index: number) => ({
        ...item,
        key: index,
      }))
      setusers(warehouses)
    })*/
    const warehouses = [
      {_id: "1", code: "B1", name:"Bodega Test", dimension:500, address:{sector:"TUMBACO"}}
    ];
    setWarehouses(warehouses);
  }

  useEffect(() => {
    Promise.all([init()])
  }, [])

  const remove = async (id: string) => {
    if (id) {
      await axios.delete(`/api/warehouses/${id}`)
      message.success('Documento eliminado')
      init()
    }
  }
  //<Column title="Dirección" dataIndex="address.sector" key="address.sector" />

  return (
    <>
      <div className="flex justify-end">
        <Button type="primary" className="bg-blue-800" onClick={() => init()}>
          Refrescar
        </Button>
        <Button onClick={() => router.push('/app/bodegas/insert')}>
          Insertar
        </Button>
      </div>
      <Table dataSource={warehouses}>
        <Column title="Código" dataIndex="code" key="code" />
        <Column title="Nombre" dataIndex="name" key="name" />
        <Column title="Dimensión" dataIndex="dimension" key="dimension" />
        <Column
          key="action"
          render={(_: Warehouse, record: Warehouse) => (
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
