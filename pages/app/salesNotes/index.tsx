import axios from 'axios'
import { Product } from '@/types/Product'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, message, Popconfirm, Space, Table, Typography } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const { Column } = Table

const SalesNotes: React.FC = () => {
  const router = useRouter()
  const [products, setusers] = useState<Product[]>([])

  const init = async () => {
    axios.get('/api/salesNotes').then(({ data }) => {
      const products = data.map((item: Product, index: number) => ({
        ...item,
        key: index,
      }))
      setusers(products)
    })
  }

  useEffect(() => {
    Promise.all([init()])
  }, [])

  const remove = async (id: string) => {
    if (id) {
      await axios.delete(`/api/salesNotes/${id}`)
      message.success('Documento eliminado')
      init()
    }
  }

  return (
    <>
      <Space className="flex justify-between mb-4">
        <Typography.Title level={3}>Notas de ventas</Typography.Title>
        <Space>
          <Button type="primary" className="bg-blue-800" onClick={() => init()}>
            Refrescar
          </Button>
          <Button onClick={() => router.push('/app/salesNotes/insert')}>
            Insertar
          </Button>
        </Space>
      </Space>
      <Table dataSource={products}>
        <Column
          title="Nº comprobante"
          dataIndex="invoice_number"
          key="invoice_number"
        />
        <Column
          title="Razon social"
          dataIndex="client"
          key="client"
          render={(_: Product, record: any) => record.cliente?.name}
        />
        <Column
          title="Forma de pago"
          dataIndex="code"
          key="code"
          render={(_: Product, record: any) => record.forma_pago}
        />
        <Column title="Total" dataIndex="total" key="total" />
        <Column
          key="action"
          render={(_: Product, record: Product) => (
            <Space size="middle">
              <a href={`${'/app/salesNotes/'}/${record._id}/edit`}>
                <EditOutlined title="Editar" />
              </a>

              <Popconfirm
                title="¿Eliminar comprobante?"
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

export default SalesNotes
