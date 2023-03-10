import { Address } from './Address'

export interface Cellar {
  _id: string
  code: string
  name: string
  dimension?: number
  address: Address
}
