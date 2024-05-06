import { Routes } from '@angular/router';
import {ProductOverviewComponent} from "./product-overview/product-overview.component";
import {ProductFormComponent} from "./product-form/product-form.component";
import {authGuard} from "./shared/auth.guard";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProductOverviewComponent
  },
  {
    path: 'create',
    component: ProductFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'edit',
    component: ProductOverviewComponent,
    canActivate: [authGuard]
  },
  {
    path: 'edit/:id',
    component: ProductFormComponent,
    canActivate: [authGuard]
  }
];
