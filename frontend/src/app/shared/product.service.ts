import {inject, Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Product} from './interfaces/product'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3100/api'

  private http = inject(HttpClient)

  getProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}/products`)
  }

  get(id: string | number) {
    return this.http.get<Product>(`${this.apiUrl}/product?id=${id}`)
  }

  search(q: string) {
    return this.http.get<Product[]>(`${this.apiUrl}/search?query=${q}`)
  }
}