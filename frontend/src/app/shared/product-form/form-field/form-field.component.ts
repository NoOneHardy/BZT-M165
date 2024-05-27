import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'm165-form-field',
  standalone: true,
  imports: [],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css'
})
export class FormFieldComponent implements AfterViewInit {
  ngAfterViewInit() {
    document.querySelectorAll('input').forEach(input => {
      input.placeholder = ""
      input.autocomplete = "off"
    })
  }
}
