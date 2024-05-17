import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router'
import {Product} from '../../shared/interfaces/product'
import {NgIf} from '@angular/common'
import {ProductService} from '../../shared/product.service'

@Component({
  selector: 'm165-details',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private productService = inject(ProductService)

  product?: Product

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) this.productService.get(id).subscribe({
      next: product => this.product = product,
      error: () => this.router.navigateByUrl('/')
    })
  }
}
