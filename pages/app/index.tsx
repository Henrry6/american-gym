import { FC } from 'react'
import { Typography } from 'antd'

const UserHome: FC = () => {
  return (
    <div className="flex justify-center">
      <div>
        <Typography.Title level={4}>
          Binvenidos a herramientas de construcción
        </Typography.Title>
      </div>
    </div>
  )
}

export default UserHome
