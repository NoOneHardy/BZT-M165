import {AbstractControl, FormArray, FormControl, FormGroup, isFormControl, ValidatorFn} from '@angular/forms'

export function uniqueKey(array: FormArray<FormGroup<{
  key: FormControl<string>,
  value: FormControl<string>
}>>): ValidatorFn {
  return (control: AbstractControl<string>): { unique_key: true } | null => {
    if (!isFormControl(control)) return null
    if (control.value === '')  return null

    for (const formGroup of array.controls) {
      if (formGroup.controls.key === control) continue

      if (formGroup.controls.key.value === control.value) return {unique_key: true}
    }
    return null
  }
}

export const reservedKeys: ValidatorFn = (control) => {
  const keys = ['id', 'name', 'category', 'price']

  if (!isFormControl(control)) return null
  if (keys.includes(control.value.toLowerCase())) return {reserved_key: true, key: control.value}
  return null
}
