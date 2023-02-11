import { Address } from './Address'

export interface Warehouse {
  _id: string
  code: string
  name: String
  dimension?: number
  address: Address
}
