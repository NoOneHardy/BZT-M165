export interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
  [key: string]: string | number
}
