import {Component, Input} from '@angular/core';
import {Product} from "../shared/interfaces/product";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'm165-product',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product?: Product
}
