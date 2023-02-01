import { useRouter } from 'next/router'
import { showError } from '@/assets/utils'
import {
  obtenerDatosSesion,
  redireccionarLogin,
} from '@/assets/middlewares-utils'
import React, {
  Dispatch,
  useState,
  ReactNode,
  useEffect,
  useContext,
  FunctionComponent,
} from 'react'

type Comprobantes = {
  totalTimbres?: number
  totalTimbresOcupados?: number
}

export interface UserInfo {
  user: string
  name: string
  username: string
  businessModules: Array<{
    activationDate: string
    key: string
    operationDate: string
  }>
  configs: {
    monthsBlocked: string[]
    useTestEnviroment: boolean
    vouchers: {
      nDecimals: number
    }
    pac: {
      usuario?: string
      fechaContrato?: Date
      fechaContratoTest?: Date
    }
    comprobantes: Comprobantes
    nDecimals: number
  }
  hasSignature: boolean
  createdAt: string
  modules?: Array<{
    icon: string
    key: string
    label: string
    operationDate: string
    submodules: Array<{
      key?: string
      label: string
      permisos?: string
      items?: Array<{
        key: string
        label: string
        permisos: string
      }>
    }>
  }>
  id: string
  sessionEndDate: string
  sessionStartDate: string
  userType: 'admin' | 'user'
  esAdmin: boolean
}

export interface Modulo {
  key: string
  label: string
  to: string
  permisos?: {
    leer: boolean
    escribir: boolean
    eliminar: boolean
    anular: boolean
  }
}

export interface UserContexto {
  user?: UserInfo
  setUser: Dispatch<UserInfo>
  // memos
  getDatosSesion: () => Promise<void>
  getModuloDesdePath: () => Modulo[]
}

const UserContexto = React.createContext<UserContexto>(null as never)

export function useContextoUsuario() {
  return useContext(UserContexto)
}

const ContextoUsuario: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)
  const [user, setUser] = useState<UserInfo | undefined>()
  // const usuarioEsAdmin = useMemo(
  //   () => business?.userType === 'admin',
  //   [business?.userType]
  // )

  const getModuloDesdePath = (): Array<Modulo> => {
    const [, moduleName, submoduleName, optionName] = router.route.split('/')
    const modulo = user?.modules?.find((item) => item.key === moduleName)
    const retorno: Array<Modulo> = []
    if (modulo) {
      let mainPath = '/' + modulo.key
      retorno.push({ key: modulo.key, label: modulo.label, to: mainPath })
      for (const submodulo of modulo.submodules) {
        if (submodulo.key && submodulo.key === submoduleName) {
          mainPath = `${mainPath}/${submodulo!.key}`
          retorno.push({
            key: submodulo.key,
            label: submodulo.label,
            to: mainPath,
          })
          break
        } else {
          const encontrado = submodulo?.items?.find(
            (item) => item.key === submoduleName
          )
          if (encontrado) {
            mainPath = `${mainPath}/${encontrado!.key}`
            retorno.push({
              key: encontrado.key,
              label: encontrado.label,
              to: mainPath,
            })
            break
          }
        }
      }
      if (optionName) {
        mainPath = `${mainPath}/${optionName}`
        let options = optionName
        switch (optionName) {
          case 'insert':
            options = 'Insertar'
            break
          case 'bulk-load':
            options = 'Carga masiva'
            break
          default:
            options = 'Editar'
        }
        retorno.push({
          key: optionName,
          label: options,
          to: mainPath,
        })
      }
    }
    return retorno
  }

  // const getConfigs = async () => {
  //   try {
  //     return await axios.get('/api/v3/businesses/me/configurations', {
  //       params: { fields: 'comprobantes nDecimals' },
  //     })
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const getDatosSesion = async () => {
    try {
      const data = await obtenerDatosSesion()
      if (data) {
        setUser(data)
        setIsReady(true)
      } else {
        redireccionarLogin(router)
      }
    } catch (err) {
      showError(err)
    }
  }

  useEffect(() => {
    // es el mismo que getDatosSesion
    obtenerDatosSesion()
      .then((data) => {
        if (data) {
          setUser(data)
          setIsReady(true)
        } else {
          redireccionarLogin(router)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <UserContexto.Provider
      value={{
        user,
        setUser,
        // memos
        getModuloDesdePath,
        getDatosSesion,
      }}
    >
      {!isReady ? null : children}
    </UserContexto.Provider>
  )
}

export default ContextoUsuario
