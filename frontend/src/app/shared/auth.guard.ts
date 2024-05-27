import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "./user.service";
import {map, take} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  const router = inject(Router)

  return userService.isAdmin.pipe(
    take(1),
    map(isAdmin => {
      if (isAdmin) {
        return true;
      } else {
        alert('Not logged in')
        return router.parseUrl('')
      }
    })
  )
};
