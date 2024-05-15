import {Component, inject} from '@angular/core';
import {ProductFormComponent} from '../product-form/product-form.component'
import {ActivatedRoute, Router, RouterLink} from '@angular/router'
import {ProductService} from '../shared/product.service'
import {Product} from '../shared/interfaces/product'
import {NgIf} from '@angular/common'

@Component({
  selector: 'm165-edit',
  standalone: true,
  imports: [
    ProductFormComponent,
    NgIf,
    RouterLink
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
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
