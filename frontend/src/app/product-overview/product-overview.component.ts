import { Component } from '@angular/core';
import {ProductComponent} from "../product/product.component";

@Component({
  selector: 'm165-product-overview',
  standalone: true,
  imports: [
    ProductComponent
  ],
  templateUrl: './product-overview.component.html',
  styleUrl: './product-overview.component.css'
})
export class ProductOverviewComponent {

}
