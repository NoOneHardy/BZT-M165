import {Component, inject, OnInit} from '@angular/core'
import {ProductFormComponent} from '../../shared/product-form/product-form.component'
import {NgIf} from '@angular/common'
import {ActivatedRoute, Router, RouterLink} from '@angular/router'
import {ProductService} from '../../shared/product.service'
import {Product} from '../../shared/interfaces/product'
import {ContentComponent} from '../../shared/content/content.component'

@Component({
  selector: 'm165-edit',
  standalone: true,
  imports: [
    ProductFormComponent,
    NgIf,
    RouterLink,
    ContentComponent
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
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
