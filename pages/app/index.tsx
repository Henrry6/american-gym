import { FC } from 'react'
import { Typography } from 'antd'

const UserHome: FC = () => {
  return (
    <div className="flex justify-center">
      <div>
        <Typography.Title level={4}>
          Binvenidos al mejor sistema de gestión de inventarios
        </Typography.Title>
      </div>
    </div>
  )
}

export default UserHome
