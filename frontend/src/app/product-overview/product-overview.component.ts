import {Component, inject, Input, OnInit} from '@angular/core'
import {ProductService} from '../shared/product.service'
import {ProductComponent} from '../product/product.component'
import {NgForOf, NgIf} from '@angular/common'
import {SearchComponent} from '../shared/search/search.component'
import {Product} from '../shared/interfaces/product'
import {Observer} from 'rxjs'

@Component({
  selector: 'm165-product-overview',
  standalone: true,
  imports: [
    ProductComponent,
    NgForOf,
    SearchComponent,
    NgIf
  ],
  templateUrl: './product-overview.component.html',
  styleUrl: './product-overview.component.css'
})
export class ProductOverviewComponent implements OnInit {
  @Input() edit = false

  private productsService = inject(ProductService)

  protected products: Product[] = []
  protected error = false
  protected searchValue?: string
  protected url: string = '/view'

  private productObserver: Observer<Product[]> = {
    next: products => {
      this.error = false
      this.products = products
    },
    error: () => this.onError(),
    complete: () => {}
  }

  ngOnInit() {
    this.productsService.getProducts().subscribe(this.productObserver)
    this.url = this.edit ? '/edit/' : '/view/'
  }

  search(value: string) {
    this.searchValue = value
    this.productsService.search(value).subscribe(this.productObserver)
  }

  onError() {
    this.error = true
  }
}
