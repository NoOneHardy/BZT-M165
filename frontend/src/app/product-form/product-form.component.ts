import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {Product} from '../shared/interfaces/product'
import {NgForOf, NgIf} from '@angular/common'

@Component({
  selector: 'm165-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  @Input() product?: Product
  @Input() title = 'Neues Produkt'
  @Input() edit = false

  form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ]
    }),
    category: new FormControl<string>({value: '', disabled: !this.edit && this.product != undefined}, {
      nonNullable: true,
      validators: [
        Validators.required,
      ]
    }),
    price: new FormControl<number>({value: 0, disabled: !this.edit && this.product != undefined}, {
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
      key: new FormControl<string>({value: key ? key : '', disabled: !this.edit && this.product != undefined}, {
        nonNullable: true,
        validators: []
      }),
      value: new FormControl<string | number>({value: value ? value : '', disabled: !this.edit && this.product != undefined}, {
        nonNullable: true,
        validators: []
      })
    }))
  }

  onSubmit() {
    this.form.markAllAsTouched()

    if (this.form.invalid) return

    console.log(this.form.getRawValue())
  }

  ngOnInit() {
    if (this.product) {
      if (!this.edit) {
        this.form.controls.name.disable()
        this.form.controls.category.disable()
        this.form.controls.price.disable()
      }
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
}
