import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../interfaces/product'
import {ProductService} from '../product.service'
import {Controller} from '../interfaces/controller'
import {SearchComponent} from '../search/search.component'
import {ProductListComponent} from '../product-list/product-list.component'

@Component({
  selector: 'm165-product-view',
  standalone: true,
  imports: [
    SearchComponent,
    ProductListComponent
  ],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent implements OnInit, OnDestroy {
  @Input() url: string = ''

  private productsService = inject(ProductService)
  private productController: Controller = {
    observer: {
      next: products => {
        this.error = false
        this.loading = false
        this.products = products
      },
      error: () => this.onError(),
      complete: () => this.loading = false
    }
  }

  protected products: Product[] = []
  protected error = false
  protected loading = false
  protected searchValue?: string

  ngOnInit() {
    this.loading = true
    this.productController.sub = this.productsService.getProducts().subscribe(this.productController.observer)
  }

  ngOnDestroy() {
    this.productController.sub?.unsubscribe()
  }

  search(value: string) {
    this.searchValue = value
    this.productsService.search(value).subscribe(this.productController.observer)
  }

  onError() {
    this.loading = false
    this.error = true
  }
}
