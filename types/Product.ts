export interface Product {
  _id: string
  code: string
  description: string
  name: string
  title?: string
  images?: {
    public_id: string
    secure_url: string
  }
  price?: string
  total?: number
}
