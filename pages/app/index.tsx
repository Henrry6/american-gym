import { useContextoUsuario } from '@/contexts/User'
import { FC } from 'react'

const UserHome: FC = () => {
  const user = useContextoUsuario()
  console.log(user)
  return (
    <>
      <p>Binvenido</p>
    </>
  )
}

export default UserHome
