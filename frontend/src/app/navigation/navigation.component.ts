import {Component, inject, OnInit} from '@angular/core';
import {NavPointComponent} from "./nav-point/nav-point.component";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'm165-navigation',
  standalone: true,
  imports: [
    NavPointComponent,
    NgIf,
    RouterLink
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {
  isAdmin: boolean = false

  private userService = inject(UserService)

  ngOnInit() {
    this.userService.isAdmin.subscribe(isAdmin => {
      this.isAdmin = isAdmin
    })
  }

  logout() {
    this.userService.logout()
  }

  login() {
    this.userService.login()
  }
}
