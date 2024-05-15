import {Component, Input} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Product} from '../shared/interfaces/product'
import {RouterLink} from '@angular/router'

@Component({
  selector: 'm165-product',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product?: Product
  @Input() link: string = ''
}
