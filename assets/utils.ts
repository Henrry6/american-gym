import { Modal } from 'antd'
import axiosBase, { AxiosError } from 'axios'
import { removeCookies, setCookie, getCookie } from 'cookies-next'

/**
 * Obtiene el mensaje de error, ya sera generado por js o como response de axios
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getMensajeError(err: any) {
  const result: string | Blob = err.response?.data
    ? err.response.data?.message || err.response.data
    : err.message
  if (result instanceof Blob) {
    try {
      const error = JSON.parse(await result.text())
      return error.message
    } catch {
      return result.text()
    }
  }
  return result
}

export async function showError(
  err: unknown,
  { title = 'Proceso fallido' } = {}
) {
  const content = await getMensajeError(err as AxiosError)
  console.error(err)
  Modal.error({
    title,
    content,
    okType: 'danger',
  })
}

export async function hashThis(message: string) {
  const msgUint8 = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export const getToken = () => {
  return getCookie('TokenUser', {
    path: '/',
    domain: undefined,
  }) as string
}

export const axios = axiosBase.create({
  baseURL: 'https://henrry-api.herokuapp.com',
})
// Se utiliza de esta forma y no como configuración en el `create` porque por
// alguna razón cuando se creá con `undefined` la funcion `creaeteToken` no
// puede cambiar el header de la instancia
const tokenActual = getToken()
if (tokenActual) {
  axios.defaults.headers.common['Authorization'] = tokenActual
}

export const crearToken = (token: string) => {
  axios.defaults.headers.common['Authorization'] = token
  setCookie('TokenUser', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    domain: undefined,
  })
}

export const destruirToken = () => {
  removeCookies('TokenUser', {
    path: '/',
    domain: undefined,
  })
}

export function nDecimals(number: number, decimals = 2): number {
  const mult = 10 ** decimals
  return Math.round(+(number * mult).toFixed(2)) / mult
}
