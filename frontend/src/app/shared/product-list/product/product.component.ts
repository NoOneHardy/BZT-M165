import {Component, Input} from '@angular/core';
import {DecimalPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {Product} from '../../interfaces/product'
import {RouterLink} from '@angular/router'

@Component({
  selector: 'm165-product',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    RouterLink,
    DecimalPipe
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product?: Product
  @Input() link: string = ''
  @Input() title: string = ''
}
