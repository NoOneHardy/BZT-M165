import {Product} from "./product";

export interface Computer extends Product {
  ram: number
  graphic_card: string
  processor: string
  cooling_system: 'water' | 'air'
}
