import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {Product} from '../interfaces/product'
import {NgForOf, NgIf} from '@angular/common'
import {ContentComponent} from '../content/content.component'
import {FormFieldComponent} from './form-field/form-field.component'
import {FormErrorComponent} from './form-error/form-error.component'
import {AttributeFormFieldComponent} from './attribute-form-field/attribute-form-field.component'

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
  @Input() title = ''

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
    price: new FormControl<number | null>(null, {
      nonNullable: true,
      validators: [
        Validators.required,
      ]
    }),
    others: new FormArray<FormGroup>([])
  })

  get others() {
    return this.form.controls.others
  }

  addAttribute(key?: string, value?: string | number) {
    this.others.push(new FormGroup({
      key: new FormControl<string>(key ? key : '', {
        nonNullable: true,
        validators: []
      }),
      value: new FormControl<string | number>(value ? value : '', {
        nonNullable: true,
        validators: []
      })
    }))
  }

  onSubmit() {
    this.form.markAllAsTouched()

    if (this.form.invalid) return

    console.log(this.form.getRawValue())
    this.form.reset()
  }

  ngOnInit() {
    if (this.product) {
      this.form.controls.name.setValue(this.product.name)
      this.form.controls.category.setValue(this.product.category)
      this.form.controls.price.setValue(this.product.price)

      for (const key of Object.keys(this.product)) {
        if (!['id', 'name', 'category', 'price', 'image'].includes(key)) {
          this.addAttribute(key, this.product[key])
        }
      }
    }
  }

  showError(controlName: string, error: string): boolean {
    const control = this.form.get(controlName)
    if (!control) return false
    if (control.untouched) return false
    return control.errors && control.errors[error]
  }

  remove(id: number) {
    this.form.controls.others.removeAt(id)
  }
}
