import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgIf} from "@angular/common";
import {NavigationComponent} from "./navigation/navigation.component";

@Component({
  selector: 'm165-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, RouterLink, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
