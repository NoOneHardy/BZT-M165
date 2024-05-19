import {Component, inject, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {Product} from '../interfaces/product'
import {NgForOf, NgIf} from '@angular/common'
import {ContentComponent} from '../content/content.component'
import {FormFieldComponent} from './form-field/form-field.component'
import {FormErrorComponent} from './form-error/form-error.component'
import {AttributeFormFieldComponent} from './attribute-form-field/attribute-form-field.component'
import {reservedKeys, uniqueKey} from '../validators'
import {ProductService} from '../product.service'
import {Router} from '@angular/router'

@Component({
  selector: 'm165-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    ContentComponent,
    FormFieldComponent,
    FormErrorComponent,
    AttributeFormFieldComponent
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  @Input() product?: Product
  @Input() disabled: boolean = false

  private productService = inject(ProductService)
  private router = inject(Router)

  form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ]
    }),
    category: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ]
    }),
    price: new FormControl<number>(0, {
      nonNullable: true,
      validators: [
        Validators.required,
      ]
    }),
    image: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/http(s)?:\/\/.+\..+/)
      ]
    }),
    others: new FormArray<FormGroup<{ key: FormControl<string>, value: FormControl<string> }>>([])
  })

  get others() {
    return this.form.controls.others
  }

  addAttribute(key?: string, value?: string) {
    this.others.push(new FormGroup({
      key: new FormControl<string>({value: key ? key : '', disabled: this.disabled}, {
        nonNullable: true,
        validators: [
          uniqueKey(this.others),
          reservedKeys
        ]
      }),
      value: new FormControl<string>({value: value ? value : '', disabled: this.disabled}, {
        nonNullable: true
      })
    }))
  }

  onSubmit() {
    this.form.markAllAsTouched()

    if (this.form.invalid) return

    const formValue = this.form.getRawValue()
    const product: Product = {
      id: this.product ? this.product.id : '',
      name: formValue.name,
      category: formValue.category,
      price: formValue.price,
      image: formValue.image
    }

    for (const attribute of formValue.others) {
      if (attribute.key === '' || attribute.value === '') continue

      product[attribute.key] = attribute.value
    }

    if (this.product) {
      this.productService.edit(this.product.id, product).subscribe(() => this.handleRequest('edit'))
    } else {
      this.productService.create(product).subscribe(() => this.handleRequest('view'))
    }
  }

  handleRequest(url: string) {
    this.router.navigateByUrl(`/${url}`).then()
  }

  ngOnInit() {
    if (this.product) {
      this.form.controls.name.setValue(this.product.name)
      this.form.controls.category.setValue(this.product.category)
      this.form.controls.price.setValue(this.product.price)

      for (const key of Object.keys(this.product)) {
        if (!['id', 'name', 'category', 'price', 'image'].includes(key)) {
          this.addAttribute(key, this.product[key].toString())
        }
      }

      if (this.disabled) {
        this.form.controls.name.disable()
        this.form.controls.category.disable()
        this.form.controls.price.disable()
      }
    }
  }

  showError(controlName: string, error: string): boolean {
    const control = this.form.get(controlName)
    if (!control) return false
    if (control.untouched) return false
    return control.errors && control.errors[error]
  }

  showAttributeError(i: number, controlName: string, error: string): boolean {
    const control = this.others.controls[i].get(controlName)
    if (!control) return false
    if (control.untouched) return false
    return control.errors && control.errors[error]
  }

  remove(id: number) {
    this.form.controls.others.removeAt(id)
  }
}
