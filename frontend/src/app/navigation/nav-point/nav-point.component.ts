import {Component, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'm165-nav-point',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav-point.component.html',
  styleUrl: './nav-point.component.css'
})
export class NavPointComponent {
  @Input() icon?: string
  @Input() route?: string
  @Input() name?: string
  @Input() absolute: boolean = true
}
