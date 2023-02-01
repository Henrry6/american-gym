import axios from 'axios'
import { Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'

const { Column, ColumnGroup } = Table

const Products: React.FC = () => {
  const [products, setusers] = useState<any[]>([])

  useEffect(() => {
    axios.get('api/users').then(({ data }) => {
      setusers(data)
    })
  }, [])
  return (
    <Table dataSource={products}>
      <ColumnGroup title="Name">
        <Column title="First Name" dataIndex="name" key="name" />
        <Column title="Last Name" dataIndex="username" key="username" />
      </ColumnGroup>
      <Column title="Age" dataIndex="age" key="age" />
      <Column title="Address" dataIndex="address" key="address" />
      <Column
        title="Action"
        key="action"
        render={(_: any, record: any) => (
          <Space size="middle">
            <a>Invite {record.lastName}</a>
            <a>Delete</a>
          </Space>
        )}
      />
    </Table>
  )
}

export default Products
