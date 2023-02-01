import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd'
import configs from '@/assets/configs'
import axios from 'axios'

const { Column, ColumnGroup } = Table

const Products: React.FC = () => {
  const [products, setusers] = useState<any[]>([])

  useEffect(() => {
    axios.get(`${configs.hostApi}/users`).then(({ data }) => {
      console.log(data)
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
