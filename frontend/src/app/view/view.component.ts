import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router'
import {Product} from '../shared/interfaces/product'
import {ProductService} from '../shared/product.service'
import {ProductFormComponent} from '../product-form/product-form.component'
import {NgIf} from '@angular/common'

@Component({
  selector: 'm165-view',
  standalone: true,
  imports: [
    ProductFormComponent,
    NgIf,
    RouterLink
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit {
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
