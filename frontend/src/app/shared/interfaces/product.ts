export interface Product {
  _id: string
  name: string
  category: string
  price: number
  image: string
  [key: string]: string | number
}

export interface NewProduct {
  name: string
  category: string
  price: number
  image: string
  [key: string]: string | number
}
