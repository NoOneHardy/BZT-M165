import {Component, Input} from '@angular/core';
import {Product} from '../interfaces/product'
import {LoaderComponent} from '../loader/loader.component'
import {NgForOf, NgIf} from '@angular/common'
import {ProductComponent} from './product/product.component'

@Component({
  selector: 'm165-product-list',
  standalone: true,
  imports: [
    LoaderComponent,
    NgForOf,
    NgIf,
    ProductComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  @Input() products: Product[] = []
  @Input() url = ''
  @Input() searchValue?: string
  @Input() error = false
  @Input() loading = false
}
