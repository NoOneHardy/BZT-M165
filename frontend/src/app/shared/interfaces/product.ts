export interface Product {
  id: number
  name: string
  category: string
  price: number
  [key: string]: string | number
}
