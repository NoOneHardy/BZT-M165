import {inject, Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {NewProduct, Product} from './interfaces/product'
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl

  private http = inject(HttpClient)

  getProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}/products`)
  }

  get(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
  }

  search(q: string) {
    return this.http.get<Product[]>(`${this.apiUrl}/search/${q}`)
  }

  create(p: NewProduct) {
    return this.http.post<Product>(`${this.apiUrl}/products`, p)
  }

  edit(id: string, p: Product) {
    return this.http.post<Product>(`${this.apiUrl}/products/${id}`, p)
  }

  delete(id: string) {
    return this.http.delete<Product>(`${this.apiUrl}/products/${id}`)
  }
}
