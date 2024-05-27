import { Component } from '@angular/core';
import {ContentComponent} from '../shared/content/content.component'
import {ProductFormComponent} from '../shared/product-form/product-form.component'

@Component({
  selector: 'm165-new-product',
  standalone: true,
  imports: [
    ContentComponent,
    ProductFormComponent
  ],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {

}
