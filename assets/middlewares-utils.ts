import axios from 'axios'
import dayjs from 'dayjs'
import { NextRouter } from 'next/router'

/**
 * Obtiene los datos de la sesión activa del usuario normal o de administrador.
 * @param tipo El tipo de usuario del cual se quiere obtener la sesión
 * @returns Los datos de inicio de sesión, si no se pudo obtener los datos
 * retorna null
 */
export const obtenerDatosSesion = async () => {
  console.debug('obteniendo datos de sesión')
  try {
    const { data } = await axios.get('/api/auth/user')
    return data
  } catch (err) {
    return null
  }
}

/**
 * Verifica que la fecha de caducidad del token estén en rango de la fecha
 * actual.
 */
export const validarToken = (data: {
  sessionStartDate: string
  sessionEndDate: string
}): boolean => {
  const ahora = dayjs()
  if (!data.sessionStartDate || !data.sessionEndDate) {
    return false
  }
  return (
    ahora.diff(data.sessionStartDate, 'hours') >= 0 &&
    ahora.diff(data.sessionEndDate, 'hours') <= 0
  )
}

/**
 * Redirecciona al login de UpConta, tomando el cuenta la ruta actual para poder
 * redireccionar.
 */
export const redireccionarLogin = (router: NextRouter) => {
  let nuevoPath = '/login'
  if (router.asPath !== '/') {
    const params = new URLSearchParams({ redirect: router.asPath })
    nuevoPath = nuevoPath + '?' + params.toString()
  }
  console.debug('redireccionando a', nuevoPath)
  router.replace(nuevoPath)
}
