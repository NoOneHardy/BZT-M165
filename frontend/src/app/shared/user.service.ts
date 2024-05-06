import {inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private admin = new BehaviorSubject<boolean>(false)
  private router = inject(Router)

  get isAdmin() {
    return this.admin.asObservable()
  }

  login() {
    this.admin.next(true)
  }

  logout() {
    this.admin.next(false)
    this.router.navigateByUrl('').then()
  }

  constructor() { }
}
