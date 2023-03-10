import { FC } from 'react'
import { Typography } from 'antd'

const UserHome: FC = () => {
  return (
    <div className="flex justify-center items-center h-1/2">
      <div>
        <Typography.Title level={4}>
          Binvenidos al mejor sistema de gestión de inventarios
        </Typography.Title>
        <div className="text-center flex flex-col items-center">
          <img
            src="/static/logoinicio.jpg"
            width={500}
            alt="x"
            style={{ height: '150px' }}
          />
          {/* <Typography.Title level={5}>{title}</Typography.Title> */}
        </div>
      </div>
    </div>
  )
}

export default UserHome
